import React from "react"
import { Drawer, Button } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import toshiba from "../../images/toshiba.jpg"

const SideDrawer = () => {
    const dispatch = useDispatch()
    const { drawer, cart } = useSelector(state => ({ ...state }))
    const imageStyle = {
        width: "100px",
        height: "50px",
        objectFit: 'cover'

    }
    return <Drawer
        title={`Cart / ${cart.length} products`}
        placement="right"
        // cloasable={false}
        onClose={() => {
            dispatch({
                type: "SET_VISIBLE",
                payload: false,
            })
        }} visible={drawer} >

        {cart.map(c => (
            <div key={c._id} className="row">
                <div className='col'>
                    {console.log("cart images=", c)}
                    {c.images[0] ? (
                        <>
                            <img src={c.images[0].url} style={imageStyle} />
                            <p className="text-center text-light bg-secondary">{c.title} X {c.count}</p>
                        </>
                    ) : (
                        <>
                            <img src={toshiba} style={imageStyle} />
                            <p className="text-center text-light bg-secondary">{c.title} X {c.count}</p>

                        </>)}
                </div>

            </div>))}
        <Link to="/cart">
            <button
                onClick={() =>
                    dispatch({
                        type: "SET_VISIBLE",
                        payload: false,
                    })
                } className="btn btn-primary text-center btn-raised btn-block">
                Go to Cart
            </button>  </Link >
    </Drawer >
}
export default SideDrawer