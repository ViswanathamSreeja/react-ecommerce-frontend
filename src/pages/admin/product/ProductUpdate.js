import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import ProductUpdateForm from '../../../components/forms/ProductUpdateForm'
import AdminNav from '../../../components/nav/AdminNav'
import { getProduct, updateProduct } from '../../../functions/product'
import { getCategories } from '../../../functions/category'
import { getCategorySubs } from '../../../functions/category'
import FileUpload from '../../../components/forms/FileUpload'
import { LoadingOutlined } from '@ant-design/icons'


const ProductUpdate = ({ match, history }) => {
    const { user } = useSelector(state => ({ ...state }))
    const { slug } = match.params
    const initialState = {
        title: '',
        description: "",
        price: "",

        category: "",
        subs: [],
        shipping: '',
        quantity: "",
        images: [],
        colors: ["Red", "Brown", "Black", "White", "Green", "Yellow", "Orange"],
        brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "Asus"],
        color: "",
        brand: ""


    }
    const [values, setValues] = useState(initialState)
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])
    const [arrayOfSubs, setArrayOfSubs] = useState([])
    const [subOptions, setSubOptions] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("")

    useEffect(() => {
        loadProduct();
        loadCategories();
    }, [])
    const loadCategories = () =>
        getCategories().then(c => {

            setCategories(c.data)
        })
            .catch(err => {
                console.log(`error is ${err}`)

            })


    const loadProduct = () => {
        getProduct(slug)
            .then(p => {
                // 1 load single product
                setValues({ ...values, ...p.data })
                //2 load single product category subs
                getCategorySubs(p.data.category._id)
                    .then(res => {
                        setSubOptions(res.data)
                    })
                //3 prepare array of subids
                let arr = []
                p.data.subs.map(s => {
                    arr.push(s._id)
                })
                console.log("arrays", arr)
                setArrayOfSubs(prev => arr) //required to work ant design select

            })
            .catch(err => {
                toast.error(err.message)
            })
    }
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })


    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        //add categories and subcategories to values as they are sperate
        values.subs = arrayOfSubs;
        values.category = selectedCategory ? selectedCategory : values.category;
        updateProduct(slug, values, user.token)
            .then(res => {
                setLoading(false)
                toast.success("Product updated")
                history.push("/Admin/Products")
                console.log("data is ", res.data)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
                toast.error(err.message)
            })

    }
    const handleCategoryChange = (e) => {
        e.preventDefault()

        setValues({ ...values, subs: [] })

        setSelectedCategory(e.target.value)

        getCategorySubs(e.target.value)
            .then(res => {
                setSubOptions(res.data)

            })
            .catch(err => {
                console.log(err.message)
            })
        //   setShowSub(true)
        //if user clicks orginal category then show its subcategories in default
        if (values.category._id === e.target.value) {
            loadProduct()
        }
        //clear the old subcategory ids
        setArrayOfSubs([])

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

                        {/* {JSON.stringify(values)} */}
                        <hr />
                        <div className="p-3">
                            <FileUpload
                                values={values}
                                setValues={setValues}
                                setLoading={setLoading}
                            />
                        </div>
                        <ProductUpdateForm
                            handleSubmit={handleSubmit}
                            handleChange={handleChange}
                            values={values}
                            setValues={setValues}
                            subOptions={subOptions}
                            categories={categories}
                            handleCategoryChange={handleCategoryChange}
                            arrayOfSubs={arrayOfSubs}
                            setArrayOfSubs={setArrayOfSubs}
                            selectedCategory={selectedCategory}

                        />
                    </div>
                </div>
            </div>


        </>

    )
}
export default ProductUpdate

