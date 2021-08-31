import React, { useState } from "react"
import AdminNav from "../../../components/nav/AdminNav"
import { updateSub, removeSub, getSub, getSubs } from "../../../functions/sub"
import { getCategories } from "../../../functions/category"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import { useEffect } from "react"
import { Link } from 'react-router-dom'
import CategoryForm from "../../../components/forms/Categoryform"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import LocalSearch from "../../../components/forms/LocalSearch"

const SubUpdate = ({ history, match }) => {

    const [name, setName] = useState()
    const [loading, setLoading] = useState(false)
    const [category, setCategory] = useState("")
    const [categories, setCategories] = useState([])
    const [sub, setSub] = useState('')
    const [parent, setParent] = useState("")
    const { user } = useSelector(state => ({ ...state }))

    //step1
    const [keyword, setKeyword] = useState("")
    useEffect(() => {
        loadCategories()
        loadSub()

    }, [])
    const loadCategories = () => getCategories().then((c) => setCategories(c.data))
    const loadSub = () => getSub(match.params.slug).then(s => {
        setSub(s.data.name)
        setParent(s.data.parent)
    })


    const HandleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        updateSub(match.params.slug, { name, parent }, user.token)
            .then(res => {
                setLoading(false)
                setName("")
                history.push('/Admin/Sub')
                toast.success(`${res.data.name} updated successfully`)
            })
            .catch(err => {
                setLoading(false)
                console.log(err.message)

                toast.error(err.message)

            })



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
                            loading ? (<h4 className="text-danger">Loading....</h4>) : (<h4>Update Sub Category</h4>)
                        }
                        <div className="form-group">
                            <label className="mr-2">Category</label>
                            <select class="form-select" aria-label="Default select example" onChange={e => setParent(e.target.value)}>
                                <option className="selected">Please select a category</option>  {
                                    categories.length && categories.map(c => <option key={c._id} value={c._id}
                                        selected={c._id === parent}>{c.name}</option>)
                                }

                            </select>
                        </div>


                        < CategoryForm
                            HandleSubmit={HandleSubmit}
                            name={name}
                            setName={setName}
                        />

                    </div>
                </div>

            </div>
        </>
    )
}
export default SubUpdate