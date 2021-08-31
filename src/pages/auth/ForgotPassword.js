import React from "react"
import { useEffect, useState } from "react"
import { auth } from "../../firebase"
import { toast } from "react-toastify"
import { useSelector } from "react-redux"
const ForgotPassword = ({ history }) => {
    const [value, setValue] = useState()
    const [loading, setLoading] = useState(false)
    const { user } = useSelector(state => ({ ...state }))
    useEffect(() => {
        if (user && user.token) history.push("/")
    }, [user, history])
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const config = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
            handleCodeInApp: true,
        }
        await auth.sendPasswordResetEmail(value, config)
            .then(() => {
                setValue("")
                setLoading("false")
                toast.success("Check your email for password reset link")

            })
            .catch((err) => {
                setLoading(false)
                toast.error(err.message)

            })

    }
    return (
        <div className="container col-md-6 offset-md-3 p-5">
            {loading ? (< h4 className="text-danger">Loading.......</h4>) : (<h4>Forgot Password</h4>)}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Your Email"
                    className="form-control mt-2"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    autoFocus />
                <button className="btn btn-danger mt-2" disabled={!value}>Submit</button>

            </form>
        </div>

    )

}
export default ForgotPassword


