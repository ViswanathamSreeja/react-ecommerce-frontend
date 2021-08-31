import React from 'react'
import ProductCardInCheckout from '../components/cards/ProductCardInCheckout'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { userCart } from '../functions/user'
const Cart = () => {
    const { cart, user } = useSelector(state => ({ ...state }))
    const history = useHistory()
    const dispatch = useDispatch()
    const getTotal = () => {
        return cart.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price
        }, 0)
    }
    const showItems = () => (
        <table className="table table-bordered">
            <thead className="thead-light">
                <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Title</th>

                    <th scope="col">Price</th>
                    <th scope="col">Brand</th>
                    <th scope="col">Color</th>

                    <th scope="col">Count</th>
                    <th scope="col">Shipping</th>
                    <th scope="col">Remove</th>

                </tr>
            </thead>
            {
                cart.map(p => (
                    <ProductCardInCheckout key={p._id} p={p} />
                ))
            }
        </table>
    )
    const saveOrdertoDB = () => {
        userCart(cart, user.token)
            .then(res => {
                //  console.log("cart post", res.data)
                if (res.data.ok) history.push("/checkout")
            })
            .catch(err => console.log("cart save err", err))

    }
    const saveCashOrdertoDB = () => {
        dispatch({
            type: "COD",
            payload: true,
        })
        userCart(cart, user.token)
            .then(res => {
                //  console.log("cart post", res.data)
                if (res.data.ok) history.push("/checkout")
            })
            .catch(err => console.log("cart save err", err))



    }
    return (
        <div className="container-fluid">
            <div className="row">
                <h4>Cart/{cart.length} items</h4>
            </div>
            <div className="row">
                <div className="col-md-8">
                    {!cart.length ?
                        (<p>No products added to your cart <Link to="/shop">Continue Shopping</Link></p>)
                        : (showItems())}
                </div>
                <div className="col md-4">
                    <h4>Order Summary</h4>
                    <hr />
                    <p>Products</p>
                    {
                        cart.map((c, i) => (
                            <div key={i}>
                                <p>{c.title} x {c.count} = Rs {c.price * c.count}</p>
                            </div>
                        ))
                    }
                    <hr />
                    Total : <b>Rs {getTotal()}</b>
                    <hr />
                    {user ? (
                        <><button
                            onClick={saveOrdertoDB}
                            className="btn btn-sm btn-outline-danger mt-2"
                            disabled={!cart.length}>Proceed to Checkout</button>
                            <br />
                            <button
                                onClick={saveCashOrdertoDB}
                                className="btn btn-sm btn-outline-danger mt-2"
                                disabled={!cart.length}>Cash On Delivery</button>

                        </>)
                        : (<button className="btn btn-sm btn-outline-primary mt-2">
                            <Link to={{
                                pathname: "/Login",
                                state: { from: "cart" }
                            }}>Login to CheckOut</Link>
                        </button>)}
                </div>
            </div>
        </div>
    )

}
export default Cart