import React from "react"

const AdminNav = () => {

    return (
        <>

            < nav className="navbar navbar-expand-md bg-dark navbar-dark py-0" >

                <a className="navbar-brand" href="#">All</a>


                <button className="navbar-toggler" type="button" data-toggle="collapse" aria-expanded="false" data-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>


                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/Admin/Dashboard">DASHBOARD</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/Admin/Product">PRODUCT</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/Admin/Products">PRODUCTS</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/Admin/Category">CATEGORY</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/Admin/Sub">SUB CATEGORY</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="/Admin/Coupon">COUPON</a>
                        </li>
                    </ul>
                </div>
            </nav >
        </>

    )
}

export default AdminNav