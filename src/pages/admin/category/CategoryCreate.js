import React, { useState } from "react"
import AdminNav from "../../../components/nav/AdminNav"
import { createCategory, removeCategory } from "../../../functions/category"
import { getCategories } from "../../../functions/category"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import { useEffect } from "react"
import { Link } from 'react-router-dom'
import CategoryForm from "../../../components/forms/Categoryform"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import LocalSearch from "../../../components/forms/LocalSearch"

const CategoryCreate = () => {

    const [name, setName] = useState()
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])
    const { user } = useSelector(state => ({ ...state }))

    //step1
    const [keyword, setKeyword] = useState("")
    useEffect(() => {
        loadCategories()

    }, [])
    const loadCategories = () => getCategories().then((c) => setCategories(c.data))


    const HandleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        createCategory({ name }, user.token)
            .then(res => {
                setLoading(false)
                setName("")
                loadCategories()
                toast.success(`${res.data.name} category created successfully`)
            })
            .catch(err => {
                setLoading(false)
                console.log(err.message)
                toast.error(err.message)

            })

    }
    const HandleRemove = async (slug) => {

        if (window.confirm("Delete?")) {
            setLoading(true)
            removeCategory(slug, user.token)
                .then(res => {
                    setLoading(false)
                    loadCategories()
                    toast.success(`${res.data.name}  deleted successfully`)
                })
                .catch(err => {
                    setLoading(false)
                    toast.error(`falied to delete ${err.message}`)

                })
        }
    }
    /* 
        const createform = () => (
            <form onSubmit={HandleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control mt-2"
                        value={name}
                        placeholder="Category Name"
                        onChange={e => setName(e.target.value)}
                        autoFocus
                        required
                    />
                    <button type="submit" className="btn btn-info mt-2">Create</button>
                </div>
            </form>
        ) */
    //step3


    //step4

    const searched = (keyword) => c => (c).name.toLowerCase().includes(keyword)


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
                        {
                            loading ? (<h4 className="text-danger">Loading....</h4>) : (<h4>Create a Category</h4>)
                        }


                        < CategoryForm
                            HandleSubmit={HandleSubmit}
                            name={name}
                            setName={setName}
                        />
                        <LocalSearch
                            keyword={keyword}
                            setKeyword={setKeyword} />
                        <hr />

                        {
                            /*  step5 */
                            categories.filter(searched(keyword)).map(c => (
                                <div className="alert alert-secondary" key={c._id}>
                                    {c.name}
                                    <span
                                        onClick={() => HandleRemove(c.slug)}
                                        className="btn btn-sm float-right text-danger"><DeleteOutlined /></span>
                                    <Link to={`/Admin/Create/${c.slug}`}>
                                        <span
                                            className="btn btn-sm float-right text-danger"><EditOutlined /></span></Link>
                                </div>
                            ))
                        }

                    </div>
                </div>

            </div>
        </>
    )
}
export default CategoryCreate