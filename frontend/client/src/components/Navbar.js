import { Link, NavLink} from "react-router-dom";
import { useSelector, useDispatch} from "react-redux";
import {logout} from "../features/user";
import React from "react";
const Navbar = () => {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(state => state.user);
    const authLinks = (
        <>
            <li className='nav-item'>
                <NavLink className='nav-link' to='/dashboard'>
                    Dashboard
                </NavLink>
            </li>
            <li className='nav-item'>
				<a className='nav-link' href='#!' onClick={() => dispatch(logout())}>
					Logout
				</a>
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
                                <NavLink className='nav-link' to='/crypto'>
                                    Crypto
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