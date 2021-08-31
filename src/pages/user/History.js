import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import UserNav from "../../components/nav/UserNav"
import { getUserOrders } from "../../functions/user"
import { useSelector, useDispatch } from "react-redux"
import { Document, View, StyleSheet, Page, Text, PDFDownloadLink, PDFViewer } from "@react-pdf/renderer"
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons"
import { toast } from 'react-toastify'
import ShowPaymentInfo from "../../components/cards/ShowPaymentInfo"
import Invoice from "../../components/order/Invoice"
const History = () => {
    const [orders, setOrders] = useState([])

    const { user } = useSelector(state => ({ ...state }))
    useEffect(() => {
        loadUserOrders()
    }, [])
    const loadUserOrders = () =>
        getUserOrders(user.token)
            .then(res => {

                console.log(JSON.stringify(res.data, null, 4))
                setOrders(res.data)

            })
            .catch(err => console.log(err))

    const showOrderInTable = (order) =>
        <table className="table table-bordered">
            <thead className="thead-light">
                <tr>
                    <th scope="col">
                        Title
                    </th>
                    <th scope="col">
                        Price
                    </th>  <th scope="col">
                        Brand
                    </th>  <th scope="col">
                        Color
                    </th>  <th scope="col">
                        Count
                    </th>  <th scope="col">
                        Shipping
                    </th>
                </tr>
            </thead>
            <tbody>
                {order.products.map((p, i) => (
                    < tr key={i} >
                        <td><b>{p.product.title}</b></td>
                        <td>{p.product.price}</td>
                        <td>{p.product.brand}</td>
                        <td>{p.color}</td>
                        <td>{p.count}</td>
                        <td>
                            <b>{p.product.shipping === "Yes"
                                ? (<CheckCircleOutlined className="text-success" />) :
                                (<CloseCircleOutlined className="text-succcess" />)}
                            </b>
                        </td>

                    </tr>
                ))
                }
            </tbody>

        </table >
    const showDownloadLink = (order) => (
        <PDFDownloadLink document={
            <Invoice order={order} />

        } fileName="invoice.pdf"

            className="btn btn-sm btn-block btn-outline-primary">
            Download Invoice
        </PDFDownloadLink>
    )

    const showEachOrders = () =>
        orders.reverse().map((order, i) => (
            <div key={i} className="m-5 p-3 card">
                <ShowPaymentInfo order={order} />
                <p>Payment Information</p>
                {showOrderInTable(order)}
                <div className="row">
                    <div className="col">
                        {showDownloadLink(order)
                        }
                    </div>
                </div>

            </div>
        ))


    return (
        <>
            <div className="row">
                < div className="col" >
                    <UserNav />
                </div >
            </div>
            <div className="row">
                <div className="container-fluid p-5">
                    <div className="col text-center">
                        <h4>
                            {orders.length > 0 ? "Your orders" : "oops no orders"}
                        </h4>
                        {
                            showEachOrders()
                        }
                    </div>
                </div>
            </div>


        </>
    )
}
export default History