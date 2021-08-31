import React, { useState } from 'react'
import { useEffect } from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import { useSelector } from 'react-redux'
import { createProduct } from '../../../functions/product'
import { toast } from 'react-toastify'
import ProductCreateForm from '../../../components/forms/ProductCreateForm'
import { getCategories, getCategorySubs } from '../../../functions/category'
import FileUpload from '../../../components/forms/FileUpload'
import { LoadingOutlined } from '@ant-design/icons'
const ProductCreate = () => {

    const { user } = useSelector(state => ({ ...state }))
    useEffect(() => {
        loadCategories()
    }, [])
    const loadCategories = () => getCategories().then(c => setValues({ ...values, categories: c.data }))
    const initialState = {
        title: 'bunny',
        description: "thotakurakatta",
        price: "9",
        categories: [],
        category: "",
        subs: [],
        shipping: 'yes',
        quantity: "9",
        images: [],
        colors: ["Red", "Brown", "Black", "White", "Green", "Yellow", "Orange"],
        brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "Asus"],
        color: "Red",
        brand: ""


    }
    const [values, setValues] = useState(initialState)
    const [subOptions, setSubOptions] = useState([])
    const [showSub, setShowSub] = useState(false)
    const [loading, setLoading] = useState(false)
    //destructure

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })


    }
    const handleCategoryChange = (e) => {
        e.preventDefault()

        setValues({ ...values, subs: [], category: e.target.value })
        getCategorySubs(e.target.value)
            .then(res => {
                setSubOptions(res.data)

            })
            .catch(err => {
                console.log(err.message)
            })
        setShowSub(true)

    }
    const handleSubmit = (e) => {
        e.preventDefault()
        createProduct(values, user.token)
            .then((res) => {
                console.log(res)
                window.alert(`${res.data.title} create`)
                window.location.reload()
            })
            .catch(err => {
                console.log(err.message)
                toast.error(err.message)
            })
    }

    return (
        <>
            <div className="row">
                <div className="col">
                    <AdminNav />
                </div>

            </div>
            <div className="container p-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        {loading ? <LoadingOutlined className="text-danger h1" /> : <h4>Product Create</h4>}
                        <hr />
                        <div className="p-3">
                            <FileUpload
                                values={values}
                                setValues={setValues}
                                setLoading={setLoading}
                            />
                        </div>
                        <ProductCreateForm
                            handleSubmit={handleSubmit}
                            handleChange={handleChange}
                            handleCategoryChange={handleCategoryChange}
                            values={values}
                            subOptions={subOptions}
                            showSub={showSub}
                            setValues={setValues} />
                    </div>
                </div>
            </div>
        </>
    )
}
export default ProductCreate