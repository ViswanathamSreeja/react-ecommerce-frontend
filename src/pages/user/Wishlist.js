import React from "react"
import { useState, useEffect } from "react"
import UserNav from "../../components/nav/UserNav"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getWishlist } from "../../functions/user"
import { DeleteOutlined } from "@ant-design/icons"
import { removeWishlist } from "../../functions/user"

const Wishlist = () => {
    const { user } = useSelector(state => ({ ...state }))
    const [wishlist, setWishlist] = useState([])
    useEffect(() => {
        loadAllWishlist()
    }, [])
    const loadAllWishlist = () => {
        getWishlist(user.token).then(res => {

            setWishlist(res.data.wishlist)
            console.log(wishlist)
        })

    }
    const handleRemove = (productId) => {
        removeWishlist(productId, user.token).then(res => {
            loadAllWishlist()
        })

    }
    return (
        <>
            <div className="row">
                < div className="col" >
                    <UserNav />
                </div >
            </div>
            <div className="row">
                <div className="container">
                    <h4>Wishlist</h4>
                    {
                        wishlist.map(p => (
                            <div key={p._id} className="alert alert-secondary">
                                <Link to={`/product/${p.slug}`}>{p.title}</Link>
                                <span onClick={() => handleRemove(p._id)} className="btn btn-sm float-right">
                                    <DeleteOutlined className="text-danger" />
                                </span>
                            </div>
                        ))
                    }
                </div>
            </div >
        </ >

    )
}
export default Wishlist