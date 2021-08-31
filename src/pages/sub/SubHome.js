import React from 'react'
import { Link } from 'react-router-dom'
import { getSub } from '../../functions/sub'
import ProductCard from '../../components/cards/ProductCard'
import { useState } from 'react'
import { useEffect } from 'react'
const SubHome = ({ match }) => {
    const [products, setProducts] = useState([])
    const [sub, setSub] = useState({})
    const [loading, setLoading] = useState(false)
    const { slug } = match.params
    useEffect(() => {
        setLoading(true)
        getSub(slug).then(res => {
            setLoading(false)
            // console.log(res.data.category)
            setSub(res.data.sub)
            setProducts(res.data.products)

        })
    }, [])
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        {
                            loading ? (<h4 className="jumbotron text-center p-3 mt-5 mb-5 display-4">Loading..........</h4>)
                                : (
                                    <h4 className="jumbotron text-center p-3 mt-5 mb-5 display-4">
                                        {products.length} products in {sub.name} sub
                                    </h4>
                                )
                        }
                    </div>
                </div>
                <div className="row">
                    {products.map((p) => (
                        <div className="col" key={p._id}>
                            <ProductCard p={p} />
                        </div>
                    ))
                    }
                </div>
            </div>
        </>
    )
}
export default SubHome