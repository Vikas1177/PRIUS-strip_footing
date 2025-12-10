import { Link } from "react-router-dom"
import SVGLogo from "../../assets/SVG_Logo.svg"

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 shadow-md">
        <Link to="/" className="flex items-center gap-2">
            <img src={SVGLogo} alt="logo" className="h-10 w-10" />
            <span className="text-xl font-bold">STRIP</span>
        </Link>

        <button className="px-4 py-2 border rounded hover:bg-gray-200">
            Login
        </button>
    </header>
  )
}

export default Header
