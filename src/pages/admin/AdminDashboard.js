import React, { useState, useEffect } from 'react'
import AdminNav from "../../components/nav/AdminNav"
import { getOrders, changeStatus } from '../../functions/admin'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import Order from '../../components/order/Order'

const AdminDashboard = () => {
    const [orders, setOrders] = useState([])
    const { user } = useSelector(state => ({ ...state }))
    useEffect(() => {
        loadOrders()
    }, [])
    const loadOrders = () => {
        getOrders(user.token).then(res => {
            console.log("data is", JSON.stringify(res.data, null, 4))
            setOrders(res.data)
        })
    }
    const handleStatusChange = (orderId, orderStatus) => {
        changeStatus(orderId, orderStatus, user.token).then(res => {
            toast.success("status updated")
            loadOrders()
        })
    }
    return (
        <>

            <div className="row">
                <div className="col">
                    <AdminNav />
                </div>

            </div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4> AdminDashboard</h4>
                        <Order orders={orders} handleStatusChange={handleStatusChange} />
                    </div>
                </div>
            </div>

        </>
    )
}

export default AdminDashboard