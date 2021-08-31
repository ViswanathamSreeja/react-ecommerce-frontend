import React from "react"
import ModalImage from "react-modal-image"
import toshiba from "../../images/toshiba.jpg"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { CheckCircleOutlined, CloseOutlined, CloseCircleOutlined } from "@ant-design/icons"
const ProductCardInCheckout = ({ p }) => {
    const colors = ["Red", "Brown", "Black", "White", "Green", "Yellow", "Orange"]
    const dispatch = useDispatch()
    const handleColorChange = (e) => {
        console.log(e.target.value)
        let cart = []
        if (typeof window !== undefined) {
            //take item from localstorage
            if (localStorage.getItem("cart")) {
                cart = JSON.parse(localStorage.getItem("cart"))
            }
            //update color
            cart.map((product, i) => {
                if (product._id === p._id)
                    cart[i].color = e.target.value
            })
            //sendback to localStorage
            localStorage.setItem("cart", JSON.stringify(cart))
            dispatch({
                type: "ADD_TO_CART",
                payload: cart,
            })
        }


    }
    const HandleQuantityChange = (e) => {
        let count = e.target.value < 1 ? 1 : e.target.value;
        console.log(e.target.value)
        if (count > p.quantity) {
            toast.error(`sorry max available quantity is ${p.quantity}`)
            return
        }
        let cart = []
        if (typeof window !== undefined) {
            //take item from localstorage
            if (localStorage.getItem("cart")) {
                cart = JSON.parse(localStorage.getItem("cart"))
            }
            //update color
            cart.map((product, i) => {
                if (product._id === p._id)
                    cart[i].count = count
            })
            //sendback to localStorage
            localStorage.setItem("cart", JSON.stringify(cart))
            dispatch({
                type: "ADD_TO_CART",
                payload: cart,
            })
        }


    }
    const handleDelete = () => {

        let cart = []
        if (typeof window !== undefined) {
            //take item from localstorage
            if (localStorage.getItem("cart")) {
                cart = JSON.parse(localStorage.getItem("cart"))
            }
            //update cart
            cart.map((product, i) => {
                if (product._id === p._id)
                    cart.splice(i, 1)
            })
            //sendback to localStorage
            localStorage.setItem("cart", JSON.stringify(cart))
            dispatch({
                type: "ADD_TO_CART",
                payload: cart,
            })

        }


    }
    return (
        <tbody>
            <tr>
                <td>
                    <div style={{ width: "100px" }}>{p.images.length ? (<ModalImage small={p.images[0].url} large={p.images[0].url} />)
                        : (<ModalImage small={toshiba} large={toshiba} />)}</div>
                </td>
                <td>{p.title}</td>
                <td>Rs {p.price}</td>
                <td>{p.brand}</td>
                <td><select
                    onChange={handleColorChange}
                    name="color"
                    className="form-control">
                    {p.color ? <option>{p.color}</option> : <option>select</option>}
                    {colors.filter(c => c !== p.color).map(c => <option key={c} value={c}>{c}</option>)}</select></td>
                <td className="text-center">
                    <input
                        type="number"
                        className="form-control"
                        value={p.count}
                        onChange={HandleQuantityChange} /></td>
                <td className="text-center">
                    {p.shipping === "Yes" ? <CheckCircleOutlined className="text-success" /> :
                        <CloseCircleOutlined className="text-danger" />}
                </td>
                <td className="text-center"><CloseOutlined onClick={handleDelete}
                    className="text-danger pointer" />
                </td>
            </tr>
        </tbody>
    )
}
export default ProductCardInCheckout
