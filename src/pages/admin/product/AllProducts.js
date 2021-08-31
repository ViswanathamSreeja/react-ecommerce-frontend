import React from 'react'
import { useSelector } from 'react-redux'
import AdminNav from "../../../components/nav/AdminNav"
import { useEffect } from 'react'
import { useState } from 'react'
import { getProductsById } from '../../../functions/product'
import AdminProductCard from '../../../components/cards/AdminProductCard'
import { removeProduct } from '../../../functions/product'
import { toast } from 'react-toastify'
const AllProducts = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const { user } = useSelector(state => ({ ...state }))
    useEffect(() => {
        loadAllProducts()
    }, [])
    const loadAllProducts = () => {
        setLoading(true)
        getProductsById(20)
            .then(res => {
                setProducts(res.data)
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
                console.log(err.message)
            })
    }
    const handleRemove = (slug) => {
        setLoading(true)
        if (window.confirm('Delete?')) {
            removeProduct(slug, user.token)
                .then(res => {
                    loadAllProducts()
                    setLoading(false)
                    toast.error(`${res.data.title} is deleted`)
                })
                .catch(err => {
                    setLoading(false)
                    toast.error(err.message)
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
                    <div className="col">
                        {loading ? <h4>Loading......</h4> : <h4>Products</h4>}

                        <div className="row">
                            {products.map(product => (
                                <div className="col-md-3 pb-3"
                                    key={product._id}>
                                    <AdminProductCard
                                        product={product}
                                        handleRemove={handleRemove}
                                    />
                                </div>

                            ))}
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default AllProducts