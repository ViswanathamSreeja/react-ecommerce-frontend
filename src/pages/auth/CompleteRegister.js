import React, { useState, useEffect } from 'react'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'

import { createOrUpdateUser } from '../../functions/auth'
//sending token to backend

const CompleteRegister = ({ history }) => {
    const dispatch = useDispatch()
    //  const { user } = useSelector((state) => ({ ...state }))
    const [value, setValue] = useState("")
    const [password, setPassword] = useState('')

    useEffect(() => {
        setValue(window.localStorage.getItem("emailForRegistration"))

    }, [])

    const HandleSubmit = async (e) => {
        e.preventDefault();
        if (!value || !password) {
            toast.error("email and password is required")
            return
        }
        if (password.length < 6) {
            toast.error("password length must be more than 6 characters")
            return
        }
        try {
            const result = await auth.signInWithEmailLink(value, window.location.href)
            console.log(result)

            if (result.user.emailVerified) {
                window.localStorage.removeItem('emailForRegistration')
                //remove mail from local storage
                let user = auth.currentUser
                await user.updatePassword(password)
                const idTokenResult = await user.getIdTokenResult()
                console.log("idTokenResult", idTokenResult)
                //get userid from token
                createOrUpdateUser(idTokenResult.token)           //calling func
                    .then(res => {
                        dispatch({
                            type: "LOGGED_IN_USER",
                            payload: {
                                name: res.data.name,
                                email: res.data.email,
                                token: idTokenResult.token,
                                role: res.data.role,
                                _id: res.data._id,


                            }
                        });
                    })
                    .catch(e => console.log("err", e.message))

                //reduxstore
                history.push("/")
                //redirect
            }

        }
        catch (e) {
            toast.error(e)
        }

    }
    const CompleteRegisterForm = () =>
        <form onSubmit={HandleSubmit} >
            <input
                type="email"
                className="form-control"
                value={value}
                disabled
            />
            <input type="password"
                className='form-control mt-2'
                placeholder='Enter ur pswd'
                onChange={e => setPassword(e.target.value)}
            />
            <button type="submit" className="btn btn-primary mt-2">CompleteRegistration</button>
        </form>

    return (

        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register</h4>

                    {CompleteRegisterForm()}
                </div>
            </div>
        </div>

    )
}
export default CompleteRegister