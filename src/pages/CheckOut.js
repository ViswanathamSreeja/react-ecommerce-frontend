import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { emptyUserCart } from "../functions/user"
import { getUserCart } from "../functions/user"
import { saveUserAddress } from "../functions/user"
import ReactQuill from 'react-quill'
import "react-quill/dist/quill.snow.css"
import { applyCoupon } from "../functions/coupon"
import { createCashOrderForUser } from "../functions/user"
const CheckOut = ({ history }) => {
    const [products, setProducts] = useState([])
    const [total, setTotal] = useState(0)
    const [address, setAddress] = useState("")
    const [addressSaved, setAddressSaved] = useState(false)
    const [coupon, setCoupon] = useState("")
    const [totalAfterDiscount, setTotalAfterDiscount] = useState(0)
    const [discounterr, setDiscounterr] = useState("")
    const { user, COD } = useSelector(state => ({ ...state }))
    const couponTrueOrFalse = useSelector(state => state.coupon)

    const dispatch = useDispatch()
    useEffect(() => {
        getUserCart(user.token).then(res => {
            console.log("user cart", res)
            setProducts(res.data.products)
            setTotal(res.data.cartTotal)
        })

    }, [])
    const saveAddressToDB = () => {
        //  console.log(address)
        saveUserAddress(address, user.token)
            .then(res => {
                console.log("saved")
                setAddressSaved(true)
                toast.success("Address has been saved")
            })

    }
    const emptyCart = () => {
        //remove from 3 places
        //remove from localstorage
        if (typeof window !== "undefined")
            localStorage.removeItem("cart")
        //remove from redux
        dispatch({
            type: "ADD_TO_CART",
            payload: []
        })
        //remove from backend
        emptyUserCart(user.token)
            .then(res => {
                setProducts([])
                setTotal(0)
                setCoupon("")
                setTotalAfterDiscount(0)
                toast.success("cart is empty continue shopping")
            })
    }
    const showAddress = () => (
        <>
            <ReactQuill theme="snow" value={address} onChange={setAddress}></ReactQuill>
            <button onClick={saveAddressToDB} className="btn btn-primary mt-2">Save</button>

        </>
    )
    const showProductSummary = () => (
        products.map((p, i) => (
            <div key={i}>
                <p>   {p.product.title} ({p.color}) X {p.count}={" Rs "}{p.product.price * p.count}</p>
            </div>
        ))
    )
    const applyDiscountCoupon = () => {
        // console.log("coupon to backend", coupon)
        applyCoupon(user.token, coupon)
            .then(res => {
                //   console.log("coupon applied", res.data)
                if (res.data) {
                    setTotalAfterDiscount(res.data)
                    dispatch({
                        type: "APPLIED_COUPON",
                        payload: true
                    })

                    //push totalafterdiscount to redux
                }
                if (res.data.err) {
                    setDiscounterr(res.data.err)
                    dispatch({
                        type: "APPLIED_COUPON",
                        payload: false
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    const showApplyCoupon = () => (
        <>
            <input
                type="text"
                onChange={e => {
                    setCoupon(e.target.value)
                    setDiscounterr("")
                }}
                className="form-control"
                value={coupon} />
            <button className="btn btn-primary mt-2" onClick={applyDiscountCoupon}>Apply</button>
        </>
    )


    const createCashOrder = () => {
        createCashOrderForUser(user.token, COD, couponTrueOrFalse).then(res => {
            console.log("data is ", res)
            //remove from 3 places
            //remove from localstorage
            if (res.data.ok) {
                if (typeof window !== "undefined")
                    localStorage.removeItem("cart")
                //remove from redux
                dispatch({
                    type: "ADD_TO_CART",
                    payload: []
                })
                //remove from backend
                emptyUserCart(user.token)
                    .then(res => {
                        setProducts([])
                        setTotal(0)
                        setCoupon("")
                        setTotalAfterDiscount(0)
                        toast.success("cart is empty continue shopping")
                    })
                //redirect
                setTimeout(() => {
                    history.push("/User/History")
                }, 1000)
            }
        })
    }
    return (
        <div className="row">
            <div className="div col-md-6">
                <h4>Delivery Address</h4>
                <br />
                <br />
                {showAddress()}
                <hr />
                <h4>Got Coupon?</h4>
                <br />
                {showApplyCoupon()}
                <br />
                {discounterr && <p className="text-danger p-2">{discounterr}</p>}
            </div>
            <div className="div col-md-6">
                <h4>Order Summary</h4>

                <p>products {products.length}</p>
                <hr />
                {showProductSummary()}
                <hr />
                <p>Products</p>
                <hr />
                <p>List of products</p>
                <hr />
                <p>Cart total: Rs {total}</p>
                {totalAfterDiscount > 0 && (
                    <p className="bg-success p-2 text-center">Discount applied : Total Payable : Rs {totalAfterDiscount}</p>
                )}
                <div className="row">
                    <div className="col-md-6">
                        {COD ? (<button className="btn btn-primary mb-2"
                            disabled={!addressSaved}
                            onClick={createCashOrder}>
                            Place Order
                        </button>) :
                            (<button className="btn btn-primary mb-2"
                                disabled={!addressSaved}
                                onClick={() => history.push("/payment")}>Place Order</button>
                            )
                        }
                    </div>

                    <div className="col-md-6">
                        <button disabled={!products.length} onClick={emptyCart} className="btn btn-primary">Empty Cart</button>
                    </div>

                </div>
            </div>

        </div>
    )

}
export default CheckOut