import React from "react"
import UserNav from "../../components/nav/UserNav"
import { auth } from "../../firebase"
import { useState } from "react"
import { toast } from "react-toastify"


const Password = () => {
    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        await auth.currentUser.updatePassword(password)
            .then(() => {
                setLoading(false)
                toast.success("password Updated")
                setPassword("")
            })
            .catch(err => {
                setLoading(false)
                toast.error(err.message)
            })


    }
    const pswdUpdateForm = () => (


        <form onSubmit={handleSubmit}>


            <input
                type="password"
                className="form-control"
                value={password}
                placeholder="Enter New Password"
                onChange={e => setPassword(e.target.value)}

                disabled={loading}
            />
            <button
                className="btn btn-primary mt-3"
                disabled={!password || loading || password.length < 6}>Update</button>


        </form>


    )
    return (
        <>
            <div className="row">
                < div className="col" >
                    <UserNav />
                </div>
            </div>
            <div className="row">
                <div className="container p-5">
                    <div className="row">
                        <div className="col-md-6 offset-md-3">

                            {loading ? (<h4 className="text-danger">Loading........</h4>) : (<h4>Update Password</h4>)}
                            {pswdUpdateForm()}
                        </div>
                    </div>
                </div>

            </div >
        </>
    )
}
export default Password