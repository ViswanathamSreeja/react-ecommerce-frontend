import React, { useState } from 'react'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'



const Register = ({ history }) => {
    const [value, setValue] = useState("")
    const { user } = useSelector(state => ({ ...state }))
    useEffect(() => {
        if (user && user.token) history.push("/")
    }, [user, history])
    const HandleSubmit = async (e) => {
        e.preventDefault();
        const config = {
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp: true,
        }
        await auth.sendSignInLinkToEmail(value, config)
        toast.success(`Email is sent to ${value} to complete registered`);

        window.localStorage.setItem('emailForRegistration', value)

        setValue("")

    }
    const RegisterForm = () =>
        <form onSubmit={HandleSubmit} >
            <input
                type="email"
                className="form-control"
                value={value}
                placeholder="your mail"
                onChange={e => setValue(e.target.value)
                }
                autoFocus
            />
            <button type="submit" className="btn btn-primary mt-2">Register</button>
        </form>

    return (

        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register</h4>

                    {RegisterForm()}
                </div>
            </div>
        </div>

    )
}
export default Register