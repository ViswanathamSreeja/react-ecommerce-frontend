import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import ProductListItems from './ProductListItems';
import RatingModal from '../modal/RatingModal';
import { showAverage } from '../../functions/rating';
import { Link } from 'react-router-dom'
import toshiba from '../../images/toshiba.jpg'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel'
import StarRating from "react-star-ratings"
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Card, Tabs, Tooltip } from 'antd'
import { addToWishlist } from '../../functions/user';
import _ from "lodash"
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';

const { TabPane } = Tabs
const SingleProduct = ({ product, onStarClick, star }) => {
    const [tooltip, setTooltip] = useState("Click to add")
    const { user, cart } = useSelector(state => ({ ...state }))
    const history = useHistory()
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
                ...product
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
    const { title, images, description, _id } = product
    const handleAddToWishlist = (e) => {
        e.preventDefault()
        addToWishlist(_id, user.token)
            .then(res => {
                toast.success("Added to wishllist")
                history.push("/user/wishlist")
            })
    }
    return (
        <>
            <div className="col-md-7">
                {images && images.length ?
                    <Carousel showArrows={true} autoPlay infiniteLoop >
                        {images && images.map(i => <img src={i.url} key={i.public_id} />)}
                    </Carousel> :
                    <Card
                        cover={
                            <img src={toshiba} className="mb-3 card-image" />
                        } >

                    </Card>
                }
                <div className="card-container">
                    <Tabs type="card">
                        <TabPane tab="Description" key="1">
                            {description && description}
                        </TabPane>
                        <TabPane tab="More" key="2">
                            Call us on XXXXX XXXXX for more information of the product
                        </TabPane>
                    </Tabs>
                </div>

            </div>

            <div className="col-md-5">
                <h1 className="bg-info p-3">{title}</h1>
                {product && product.ratings && product.ratings.length > 0 ?
                    showAverage(product) : <div className='text-center pt-1 pb-3 text-danger'><b>No rating yet</b></div>}

                <Card
                    actions={[
                        <Tooltip title={tooltip}>
                            <a onClick={handleAddToCart}>
                                <ShoppingCartOutlined className="text-danger" />
                                <br />Add to Cart
                            </a>
                        </Tooltip>,
                        <Link onClick={handleAddToWishlist}><HeartOutlined className="text-info" /><br />
                            Add to Whishlist</Link>,
                        <RatingModal>
                            <StarRating
                                name={_id}
                                NoOfStars={5}
                                rating={star}
                                changeRating={onStarClick}
                                isSelectable={true}
                                starRatedColor="red"

                            />
                        </RatingModal>

                    ]}>
                    <ProductListItems product={product} />
                </Card>
            </div>
        </>
    )

}
export default SingleProduct