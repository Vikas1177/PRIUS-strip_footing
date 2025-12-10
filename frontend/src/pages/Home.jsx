import Footer from "../components/Common/Footer"
import Header from "../components/Common/Header"

import MainContent from "../components/Home/MainContent";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <MainContent />
      </div>
      <Footer />
    </div>
  );
}

