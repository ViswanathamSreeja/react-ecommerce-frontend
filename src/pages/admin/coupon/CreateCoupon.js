import React from "react"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { toast } from "react-toastify"
import DatePicker from "react-datepicker"
import { getCoupons, createCoupon, removeCoupon } from "../../../functions/coupon"
import "react-datepicker/dist/react-datepicker.css"
import AdminNav from "../../../components/nav/AdminNav"
import { DeleteOutlined } from "@ant-design/icons"
const CreateCoupon = () => {
    const [name, setName] = useState("")
    const [expiry, setExpiry] = useState("")
    const [discount, setDiscount] = useState("")
    const [loading, setLoading] = useState(false)
    const [coupons, setCoupons] = useState([])
    const { user } = useSelector(state => ({ ...state }))
    useEffect(() => {
        loadAllCoupons()
    }, [])
    const loadAllCoupons = () => {
        getCoupons().then(res => setCoupons(res.data))


    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        //      console.log(name, expiry, discount)
        createCoupon({ name, expiry, discount }, user.token)
            .then(res => {
                loadAllCoupons()
                setLoading(false)
                setName("")
                setExpiry("")
                setDiscount("")
                toast.success("coupon created")
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })

    }
    const handleRemove = (couponId) => {
        if (window.confirm("Delete?")) {
            setLoading(true)
            removeCoupon(couponId, user.token)
                .then(res => {
                    loadAllCoupons()
                    setLoading(false)
                    toast.error(`coupon deleted ${res.data.name}`)
                })
                .catch(err => {
                    console.log(err)
                    setLoading(false)
                })
        }

    }

    return (
        <>
            <div className="row">
                <div className="col">
                    <AdminNav />
                </div>

            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <h4>Coupon</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="text-muted">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    autoFocus
                                    required />
                            </div>
                            <div className="form-group">
                                <label className="text-muted">Discount</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={discount}
                                    onChange={e => setDiscount(e.target.value)}
                                    required />
                            </div>
                            <div className="form-group">
                                <label className="text-muted">Expiry</label>

                                <DatePicker
                                    type="text"
                                    selected={new Date()}
                                    className="form-control"
                                    value={expiry}
                                    onChange={date => setExpiry(date)}
                                    autoFocus
                                    required
                                />

                            </div>
                            <button className="btn btn-primary">save</button>

                        </form>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <h4>{coupons.length} coupons</h4>
                        <table className="table table-bordered">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Expiry</th>
                                    <th scope="col">Discount</th>
                                    <th scope="col">Action</th>

                                </tr>
                            </thead>
                            <tbody>
                                {coupons.map(c => (
                                    <tr key={c._id}>
                                        <td>{c.name}</td>
                                        <td>{new Date(c.expiry).toLocaleDateString()}</td>
                                        <td>{c.discount}</td>
                                        <td>{<DeleteOutlined
                                            className="text-danger pointer"
                                            onClick={() => handleRemove(c._id)} />}</td>

                                    </tr>))}
                            </tbody>
                        </table>
                    </div>


                </div>
            </div>
        </>
    )
}
export default CreateCoupon