import React from 'react'
import { useState } from 'react'
import { getProduct, productStar } from '../functions/product'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import SingleProduct from '../components/cards/SingleProduct'
import { getRelatedProducts } from '../functions/product'
import ProductCard from '../components/cards/ProductCard'
const Product = ({ match }) => {
    const [product, SetProduct] = useState({})
    const [related, setRelated] = useState([])
    const [star, setStar] = useState(0)
    const { slug } = match.params
    const { user } = useSelector(state => ({ ...state }))
    useEffect(() => {
        loadSingleProduct()
    }, [slug])


    useEffect(() => {
        if (user && product.ratings) {
            let existingRatingObject = product.ratings.find(ele => ele.postedBy + '' === user._id + '')
            existingRatingObject && setStar(existingRatingObject.star)
        }
    })
    const loadSingleProduct = () => {
        //get data of selected product
        getProduct(slug).then(res => {
            SetProduct(res.data)
            //get data of related products

            getRelatedProducts(res.data._id).then(res => setRelated(res.data))

        })

    }
    const onStarClick = (newRating, name) => {

        setStar(newRating)
        productStar(name, newRating, user.token)
            .then(res => {
                loadSingleProduct()
            })
    }


    return (
        <>
            <div className="container-fluid">
                <div className="row pt-5">
                    <SingleProduct
                        product={product}
                        onStarClick={onStarClick}
                        star={star}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col text-center pt-5 pb-5">
                    <h4 className="jumbotron  mt-5 mb-5 p-3 display-5">Related Products
                    </h4>
                </div>
            </div>
            <div className="row pb-5">{
                related.length ? related.map((r) =>
                    <div key={r._id} className="col-md-4">
                        <div className="container-fluid"><ProductCard
                            p={r} />
                        </div>
                    </div>) :
                    (
                        <div className="text-center col">
                            "No related products found"
                        </div>
                    )}
            </div>
        </>

    )

}
export default Product