/* ================= UI CONTROL LOGIC ================= */

/**
 * Handles the sidebar behavior for both mobile (overlay) and desktop (collapse)
 */
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const isMobile = window.innerWidth <= 900;

    if (isMobile) {
        // MOBILE → dropdown overlay toggle
        sidebar.classList.toggle('open');
        document.body.classList.toggle('sidebar-open');
    } else {
        // DESKTOP → side collapse toggle
        sidebar.classList.toggle('collapsed');
    }
}

/**
 * Handles switching between "Load & Foundation" and "Soil Parameters" tabs
 */
function openTab(evt, tabId) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');
    evt.currentTarget.classList.add('active');
}

/**
 * Resets the form inputs and restores the output section to its default "Empty" state
 */
function resetOutput() {
    const outputBody = document.getElementById("output-body");
    const form = document.getElementById("paramForm");
    
    if (form) form.reset(); // Reset input fields
    
    if (outputBody) {
        outputBody.innerHTML = `
            <div class="state-empty">
                <i class="fa-solid fa-calculator"></i>
                <p>No calculation yet</p>
                <small>Enter parameters above and click Calculate</small>
            </div>
        `;
    }
}

/* ================= DATA ACQUISITION ================= */

function getVal(id) { 
    return parseFloat(document.getElementById(id).value); 
}

// Keeping original naming for calculation internal calls
function getphi() { return getVal("friction"); }
function getcohesion() { return getVal("cohesion"); }
function getdrydensity() { return getVal("density"); }
function getwidth() { return getVal("width"); }
function getdepth() { return getVal("depth"); }
function getgroundwater() { return getVal("ground-watertable"); }

/* ================= MATHEMATICAL FUNCTIONS ================= */

function tan(phi) {
    return Math.tan((phi * Math.PI) / 180);
}

function sin(phi) {
    return Math.sin((phi * Math.PI) / 180);
}

function cos(phi) {
    return Math.cos((phi * Math.PI) / 180);
}

function kp() {
    let phi = getphi();
    let kpnum = 1 + sin(phi);
    let kpden = 1 - sin(phi);
    return kpnum / kpden;
}

function a() {
    let phi = getphi();
    let abrac = ((0.75 * Math.PI) - (phi * Math.PI / 360));
    return Math.pow(Math.E, abrac * tan(phi));
}

function Ny() {
    let phi = getphi();
    let kpval = kp();
    let cosval = cos(phi);
    let Nybrac = (kpval / Math.pow(cosval, 2)) - 1;
    return 0.5 * Nybrac * tan(phi);
}

function Nq() {
    const phi = getphi();
    let aval = a();
    let Nqnum = Math.pow(aval, 2);
    let Nqdenbrac = 45 + (phi / 2);
    let Nqden = 2 * Math.pow(cos(Nqdenbrac), 2);
    return Nqnum / Nqden;
}

function Nc() {
    let phi = getphi();
    let Nqval = Nq();
    return cos(phi) * (Nqval - 1);
}

/* ================= BEARING CAPACITY CALCULATIONS ================= */

function Qv() {
    let phi = getphi();
    let cohesion = getcohesion();
    let width = getwidth();
    let drydensity = getdrydensity();
    let groundwater = getgroundwater();
    let Ncval = Nc();
    let Nqval = Nq();
    let Nyval = Ny();
    let depth = getdepth();

    let Qv_result = 0;

    // Condition 1: Water table is deep
    if (groundwater >= (depth + width)) {
        Qv_result = (cohesion * Ncval) + (drydensity * depth * Nqval) + (0.5 * drydensity * width * Nyval);
    }
    // Condition 2: Water table is between foundation level and wedge depth
    else if ((groundwater > depth) && (groundwater < (depth + width))) {
        let term3 = 0.5 * Nyval * ((drydensity * (groundwater - depth)) + ((drydensity - 9.81) * (depth + width - groundwater)));
        Qv_result = (cohesion * Ncval) + (drydensity * depth * Nqval) + term3;
    }
    // Condition 3: Water table is at or above foundation level
    else if (groundwater <= depth) {
        let term2 = ((drydensity * groundwater) + ((drydensity - 9.81) * (depth - groundwater))) * Nqval;
        let term3 = 0.5 * (drydensity - 9.81) * width * Nyval;
        Qv_result = (cohesion * Ncval) + term2 + term3;
    }
    else {
        return 0;
    }

    // Preserve original rounding logic: floor to 3 decimal places
    return Math.floor(Qv_result * 1000) / 1000;
}

/* ================= EXECUTION LOGIC ================= */

function calculate() {
    const phi = getphi();
    const cohesion = getcohesion();
    const width = getwidth();
    const depth = getdepth();
    const gw = getgroundwater();
    const gamma = getdrydensity();
    const dead = getVal("dead-load");
    const live = getVal("live-load");

    const outputBody = document.getElementById("output-body");

    // 1. VALIDATION CHECK
    if (isNaN(phi) || isNaN(depth) || isNaN(gamma) || isNaN(width) || isNaN(gw) || isNaN(cohesion) || isNaN(dead) || isNaN(live)) {
        outputBody.innerHTML = `
            <div class="state-error">
                <i class="fa-solid fa-circle-exclamation"></i>
                <h4>Input Error</h4>
                <p>Please enter valid values for all fields.</p>
            </div>
        `;
        return;
    }

    // 2. CALCULATION EXECUTION
    const Qvval = Qv();
    const Qnuval = Qvval - (gamma * depth);
    const Qnsval = Qnuval / 2.5;
    const Qsval = Qnsval + (gamma * depth);

    // 3. SUCCESS OUTPUT
    outputBody.innerHTML = `
        <div class="state-success">
            <div class="result-item">
                <span class="result-label">Ult. Bearing Capacity (Qnu)</span>
                <span class="result-value">${Qnuval.toFixed(3)} kN/m²</span>
            </div>
            <div class="result-item">
                <span class="result-label">Safe Bearing Capacity (Qns)</span>
                <span class="result-value">${Qnsval.toFixed(3)} kN/m²</span>
            </div>
            <div class="result-item">
                <span class="result-label">Safe Load (Qs)</span>
                <span class="result-value">${Qsval.toFixed(3)} kN/m²</span>
            </div>
            <div class="result-item">
                <span class="result-label">Vertical Load (Qv)</span>
                <span class="result-value">${Qvval.toFixed(3)} kN/m²</span>
            </div>
            <p class="result-note">Note: FOS is taken as 2.5</p>
        </div>
    `;
}