import { Link, NavLink} from "react-router-dom";
import { useSelector} from "react-redux";
import React from "react";
const Navbar = () => {
    const { isAuthenticated } = useSelector(state => state.user);
    const authLinks = (
        <>
            <li className='nav-item'>
                <NavLink className='nav-link' to='/dashboard'>
                    Dashboard
                </NavLink>
            </li>

        </>

    )
    const guestLinks =(
        <>
            <li className='nav-item'>
                <NavLink className='nav-link' to='/login'>
                    Login
                </NavLink>
            </li>

            <li className='nav-item'>
                <NavLink className='nav-link' to='/register'>
                    Register
                </NavLink>
            </li>
        </>
    )
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className='navbar-brand' to ='/'>
                    Exchanges
                </Link>

                <button className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <ul className='navbar-nav'>
                            <li className='nav-item'>
                                <NavLink className='nav-link' to='/'>
                                    Home
                                </NavLink>
                            </li>
                            {isAuthenticated ? authLinks : guestLinks}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}
export default Navbar;