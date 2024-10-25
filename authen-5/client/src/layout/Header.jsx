import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div >
            <nav className="flex gap-5 justify-center items-center">
                <Link to={'/'}>Home</Link>
                <Link to={'/register'}>Register</Link>
                <Link to={'/login'}>Login</Link>
            </nav>
        </div>
    );
};

export default Header;