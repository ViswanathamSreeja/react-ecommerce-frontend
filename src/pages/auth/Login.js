import React, { useState, useEffect } from 'react'
import { auth, googleAuthProvider } from '../../firebase'
import { toast } from 'react-toastify'
import { Button } from 'antd'
import { MailOutlined, GoogleCircleFilled } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { createOrUpdateUser } from '../../functions/auth'
//sending token to bakend


const Login = ({ history }) => {
    const [value, setValue] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const { user } = useSelector(state => ({ ...state }))
    useEffect(() => {
        let intended = history.location.state
        if (intended) {
            return
        } else {
            if (user && user.token) history.push("/")
        }
    }, [user, history])
    const dispatch = useDispatch()
    //role based redirect 
    const roleBasedRedirect = (res) => {
        //check if intended
        let intended = history.location.state
        if (intended) {
            history.push(intended.from)
        }
        else {
            if (res.data.role === 'admin') {
                history.push("/Admin/Dashboard")
            }
            else {
                history.push("/User/History")
            }
        }
    }
    const HandleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const result = await auth.signInWithEmailAndPassword(value, password)
            const { user } = result
            const idTokenResult = await user.getIdTokenResult()

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
                    roleBasedRedirect(res)
                })
                .catch(e => console.log("err", e.message))


            history.push("/")

        }
        catch (e) {
            setLoading(false)
            toast.error(e.message)
        }



    }
    const GoogleLogin = async () => {

        auth.signInWithPopup(googleAuthProvider)
            .then(async (result) => {
                const { user } = result
                const idTokenResult = await user.getIdTokenResult()
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
                        roleBasedRedirect(res)
                    })
                // history.push("/")

            })
            .catch(err => {
                console.log(err)
                toast.error(err.message)
            })
    }

    const LoginForm = () => (
        <form onSubmit={HandleSubmit} >
            <input
                type="email"
                className="form-control"
                value={value}
                placeholder="Your mailid"
                onChange={e => setValue(e.target.value)
                }
                autoFocus
            />
            <input
                type="password"
                className="form-control mt-2"
                value={password}
                placeholder="Your password"
                onChange={e => setPassword(e.target.value)}


            />
            <Button
                onClick={HandleSubmit}
                type="primary mt-4"
                icon={<MailOutlined />}
                block
                shape="round"
                size="large"
                disabled={!value || password.length < 6}>SigninWithEmail/Password</Button>
            <Button
                onClick={GoogleLogin}
                type="danger mt-2"
                icon={<GoogleCircleFilled />}
                block
                shape="round"
                size="large"
            >LogininWithGoogle</Button>
            <Link to="/forgot/password" className="float-right text-danger mt-1">Forgot Password</Link>


        </form>
    )

    return (

        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {
                        loading ? (<h4 className="text-danger">Loading....</h4>) : (<h4>Login</h4>)
                    }


                    {LoginForm()}
                </div>
            </div>
        </div>

    )
}
export default Login