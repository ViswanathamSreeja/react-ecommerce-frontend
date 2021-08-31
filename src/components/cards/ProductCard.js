import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import toshiba from "../../images/toshiba.jpg"
import { Link } from 'react-router-dom'
import { showAverage } from '../../functions/rating'
import { Card, Tooltip } from 'antd'
import _ from "lodash"
const { Meta } = Card
const ProductCard = ({ p }) => {
    const { images, title, description, slug, price } = p
    const [tooltip, setTooltip] = useState("Click to add")
    const { user, cart } = useSelector(state => ({ ...state }))
    const dispatch = useDispatch()
    const handleAddToCart = () => {
        //create cart array
        let cart = []
        if (typeof window !== undefined) {
            //get the cart from local storage
            if (localStorage.getItem("cart")) {
                cart = JSON.parse(localStorage.getItem("cart")) //json to js
            }

            //push item to cart
            cart.push({
                ...p
                , count: 1,
            })
            //remove duplicates
            const unique = _.uniqWith(cart, _.isEqual)

            //save to localStorage
            localStorage.setItem("cart", JSON.stringify(unique));   //converting js to json

            setTooltip("item added")
            //add to redux
            dispatch({
                type: "ADD_TO_CART",
                payload: unique,
            })
            dispatch({
                type: "SET_VISIBLE",
                payload: true,
            })
        }
    }

    return (
        <>
            {p && p.ratings && p.ratings.length > 0 ?
                (showAverage(p)) : (<div className='text-center pt-1 pb-3 text-danger'>No rating yet</div>)}

            <Card
                // style={{ backgroundColor: '#0d0d0d', color: "whitesmoke" }}
                cover={
                    <img
                        src={images && images.length ? images[0].url : toshiba}
                        style={{ height: 150, objectFit: "cover" }}
                        className="p-2"

                    />
                }
                actions={[
                    <Link to={`/product/${slug}`} > <EyeOutlined className="text-danger" /><br />View Product
                    </Link>,
                    <Tooltip title={tooltip}>
                        <a onClick={handleAddToCart} disabled={p.quantity < 1 && true}>
                            <ShoppingCartOutlined className="text-danger" />
                            <br />
                            {p.quantity < 1 ? "Out of stock" : "Add to Cart"}
                        </a>
                    </Tooltip>

                ]}
            >
                <Meta title={`${title} - Rs${price}`}
                    description={`${description && description.substring(0, 20)}....`} />
            </Card>
        </>)
}
export default ProductCard