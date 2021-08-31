import React, { useState } from "react"
import AdminNav from "../../../components/nav/AdminNav"
import { createSub, removeSub, getSub, getSubs } from "../../../functions/sub"
import { getCategories } from "../../../functions/category"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import { useEffect } from "react"
import { Link } from 'react-router-dom'
import CategoryForm from "../../../components/forms/Categoryform"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import LocalSearch from "../../../components/forms/LocalSearch"

const SubCreate = () => {

    const [name, setName] = useState()
    const [loading, setLoading] = useState(false)
    const [category, setCategory] = useState("")
    const [categories, setCategories] = useState([])
    const [subs, setSubs] = useState([])
    const { user } = useSelector(state => ({ ...state }))

    //step1
    const [keyword, setKeyword] = useState("")
    useEffect(() => {
        loadCategories()
        loadSubs()

    }, [])
    const loadCategories = () => getCategories().then((c) => setCategories(c.data))
    const loadSubs = () => getSubs().then(s => setSubs(s.data))


    const HandleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        createSub({ name, parent: category }, user.token)
            .then(res => {
                setLoading(false)
                setName("")
                loadSubs()
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
            removeSub(slug, user.token)
                .then(res => {
                    setLoading(false)
                    loadSubs()
                    toast.success(`${res.data.name} deleted successfully`)
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
                            loading ? (<h4 className="text-danger">Loading....</h4>) : (<h4>Create a Sub Category</h4>)
                        }
                        <div className="form-group">
                            <label className="mr-2">Category</label>
                            <select class="form-select" aria-label="Default select example" onChange={e => setCategory(e.target.value)}>
                                <option className="selected">Please select a category</option>  {
                                    categories.length && categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)
                                }

                            </select>
                        </div>

                        {JSON.stringify(category)}
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
                            subs.filter(searched(keyword)).map(s => (
                                <div className="alert alert-secondary" key={s._id}>
                                    {s.name}
                                    <span
                                        onClick={() => HandleRemove(s.slug)}
                                        className="btn btn-sm float-right text-danger"><DeleteOutlined /></span>
                                    <Link to={`/Admin/Sub/${s.slug}`}>
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
export default SubCreate