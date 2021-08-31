import React from 'react'
import { Link } from 'react-router-dom'
import { getCategories } from '../../functions/category'
import { useState } from 'react'
import { useEffect } from 'react'
const CategoryList = () => {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState([])
    useEffect(() => {
        setLoading(true)
        getCategories().then(res => {
            setCategories(res.data)
            setLoading(false)
        })
    }, [])
    const showCategories = () => (
        categories.map(c =>
            <div
                key={c._id}
                className="col btn btn-outline-secondary btn-block btn-lg btn-raised m-3"
            >
                <Link style={{ color: 'rgb(204, 51, 0)' }} to={`/category/${c.slug}`} className=''>{c.name}</Link>
            </div >)

    )

    return (
        <div className="container">
            <div className="row">
                {
                    loading ? (<h4>Loading.....</h4>) : showCategories()
                }
            </div>
        </div>
    )
}
export default CategoryList