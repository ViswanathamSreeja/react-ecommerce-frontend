import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import ProductCard from '../cards/ProductCard'
import LoadingCard from '../cards/LoadingCard'
import { getProducts } from '../../functions/product'
import { getProductsCount } from '../../functions/product'
import { Pagination } from 'antd'


const BestSellers = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [productCount, setProductCount] = useState(0)
    const [page, setPage] = useState(1)

    useEffect(() => {
        loadProducts();
    }, [page])
    useEffect(() => {
        getProductsCount().then(res => setProductCount(res.data))
    }, [])
    /*  useEffect(() => {
         let isSubscribed = true
         getProductsCount().then(res => {
             if (isSubscribed) {
                 setProductCount(res.data)
             }
         }
             // setProductCount(res.data))
         )
             .catch(err => {
                 console.log(err.message)
             })
         return () => isSubscribed = false
     }, []) */
    const loadProducts = () => {
        setLoading(true)
        getProducts('sold', "desc", page)
            .then(res => {
                setLoading(false)
                setProducts(res.data)
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })

    }

    return (
        <>
            <div>
                {loading ? <LoadingCard count={3} /> :
                    (<div className="row">
                        {products.map(p => (
                            <div key={p._id} className="col-md-4">
                                <ProductCard p={p} />
                            </div>
                        ))}
                    </div>
                    )}
            </div>
            <div className="row">
                <div className="col-md-4 offset-md-4 text-center pt-5 p-3 ">
                    <Pagination current={page} total={(productCount / 3) * 10}
                        onChange={value => setPage(value)} />

                </div>
            </div>
        </>




    )
}
export default BestSellers