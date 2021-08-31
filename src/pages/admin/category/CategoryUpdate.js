import React from 'react'
import { useState, useEffect } from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import { getCategory, updateCategory } from '../../../functions/category'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import CategoryForm from '../../../components/forms/Categoryform'
const CategoryUpdate = ({ history, match }) => {
    const [name, setName] = useState()
    const [loading, setLoading] = useState(false)
    const { user } = useSelector(state => ({ ...state }))
    useEffect(() => {
        getCategory(match.params.slug)
            .then(c => setName(c.data.name))
    }, [match.params.slug])

    const HandleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        updateCategory(match.params.slug, { name }, user.token)
            .then(res => {
                setLoading(false)
                setName("")
                toast.success(`${res.data.name} updated successfully`)
                history.push("/Admin/Category")
            })
            .catch(err => {
                setLoading(false)
                toast.error(`falied to update ${err.message}`)
            })

    }


    /*  const Editform = () => (
         <form onSubmit={handlesubmit}>
             <div classname="form-group">
                 <input type="text"
                     className="form-control mb-2"
                     value={name}
                     onChange={e => setName(e.target.value)}
                     autoFocus
                     required />
                 <button type="submit" className="btn btn-sm btn-warning">Submit</button>
             </div>
 
         </form >
 
     ) */

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
                            loading ? (<h4 className="text-danger">Loading....</h4>) : (<h4>Update Category</h4>)
                        }

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
export default CategoryUpdate