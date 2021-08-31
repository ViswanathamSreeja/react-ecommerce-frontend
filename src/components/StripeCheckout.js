import React, { useEffect } from "react"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { useSelector, useDispatch } from "react-redux"
import { createPaymentIntent } from "../functions/stripe"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Card } from 'antd'
import { CheckOutlined, DollarOutlined } from '@ant-design/icons';
import toshiba from "../images/toshiba.jpg"
import { createOrder, emptyUserCart } from "../functions/user"


const StripeCheckout = ({ history }) => {

    const dispatch = useDispatch()
    const stripe = useStripe()
    const elements = useElements()
    const { user, coupon } = useSelector(state => ({ ...state }))
    const [succeded, setSucceded] = useState(false)
    const [error, setError] = useState(null)
    const [processing, setProcessing] = useState("")
    const [disabled, setDisabled] = useState(true)
    const [clientSecret, setClientSecret] = useState(false)
    const [cartTotal, setCartTotal] = useState(0)
    const [totalAfterDiscount, setTotalAfterDiscount] = useState(0)
    const [payable, setPayable] = useState(0)

    useEffect(() => {
        createPaymentIntent(user.token, coupon).then(res => {
            console.log("createpaymentintent", res.data)
            setClientSecret(res.data.clientSecret)
            setCartTotal(res.data.cartTotal)
            setTotalAfterDiscount(res.data.totalAfterDiscount)
            setPayable(res.data.payable)

        })

    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault()
        setProcessing(true)
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: e.target.name.value,
                },
            },
        })
        if (payload.error) {
            setError(`Payment failed ${payload.error.message}`)
            console.log(payload.error.message)
            setProcessing(false)
        }
        else {
            //get result after suuccessful payment
            //create order and save in db
            createOrder(payload, user.token)
                .then(res => {
                    if (res.data.ok) {
                        //empty cart from local storage
                        if (typeof window !== "undefined") localStorage.removeItem("cart")
                    }
                    //empty from redux
                    dispatch({
                        type: "ADD_TO_CART",
                        payload: []
                    })
                    //reset coupon
                    dispatch({
                        type: "APPLIED_COUPON",
                        payload: false,
                    })
                    //empty cart from database
                    emptyUserCart(user.token)
                })
            //empty csart redux store and localstorage
            console.log(JSON.stringify(payload, null, 4))
            setProcessing(false)
            setSucceded(true)

        }
    }
    const handleChange = async (e) => {
        //checks for any changes in the card element
        //display errors
        setDisabled(e.empty)
        //disable paybutton if error
        setError(e.error ? e.error.message : "")//show error


    }
    const cartStyle = {
        style: {
            base: {
                color: "#32325d",
                fontFamily: "Arial, sans-serif",
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: "#32325d",
                },
            },
            invalid: {
                color: "#fa755a",
                iconColor: "#fa755a",
            },
        },
    };
    return (
        <>
            {
                !succeded && <div>
                    {coupon && totalAfterDiscount !== undefined ? (
                        <p className="alert alert-success">
                            Coupon Applied  {`Total After Discount : Rs ${totalAfterDiscount}`}
                        </p>
                    ) : (<p className="alert alert-danger">
                        No Coupon Applied
                    </p>)}
                </div>}

            <div className="text-center pb-5">
                <Card
                    cover={<img
                        style={{ height: "200px", objectFit: "cover", marginBottom: "-50px" }}
                        src={toshiba}
                    />}
                    actions={[
                        <>
                            <DollarOutlined className="text-info" />
                            <br />
                            Total: Rs {cartTotal}
                        </>,
                        <>
                            <CheckOutlined className="text-info" />
                            <br />
                            Total Payable : Rs {(payable / 100).toFixed(2)}
                        </>
                    ]}>
                </Card>
            </div>

            <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
                <CardElement id="cart-element" options={cartStyle}
                    onChange={handleChange} />
                <button className="stripe-button"
                    disabled={processing || disabled || succeded}>
                    <span id="button-text">
                        {processing ? <div className='spinner id="spinner'></div> : "Pay"}
                    </span>
                </button>
                <br />
                <div className="card-error text-danger" role="alert">{error}</div>
                <p className={succeded ? "result-message" : "result-message hidden"}>Payment Succssful
                    { }
                    <Link to="/user/history">View purchase history</Link></p>

            </form>

        </>
    )

}
export default StripeCheckout