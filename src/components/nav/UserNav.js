import React from 'react'
import { Link } from 'react-router-dom';

const UserNav = () => {


    return (
        <>

            {/*  <nav className="navbar bg-light">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/User/History" className="nav-link">History</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/User/Password" className="nav-link">Update Password</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/User/Wishlist" className="nav-link">Whishlist</Link>
                    </li>
                </ul>
            </nav> */}

            < nav className="navbar navbar-expand-md bg-dark navbar-dark py-0" >

                <a className="navbar-brand" href="#">All</a>


                <button className="navbar-toggler" type="button" data-toggle="collapse" aria-expanded="false" data-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>


                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/User/History">History</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/User/Password">Update Password</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/User/Wishlist">Wishlist</a>
                        </li>
                    </ul>
                </div>
            </nav >
        </>

    )

}

export default UserNav