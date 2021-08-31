import React from 'react'
import { Modal, Button } from 'antd'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { StarOutlined } from '@ant-design/icons'
import { toast } from "react-toastify"
import { useHistory } from 'react-router'
import { useParams } from 'react-router'
const RatingModal = ({ children }) => {
    const [modalVisible, setModalVisible] = useState(false)
    const { user } = useSelector(state => ({ ...state }))
    const { slug } = useParams()
    const history = useHistory()
    const handleLogin = () => {
        if (user && user.token)
            setModalVisible(true)
        else {
            history.push(
                {
                    pathname: "/Login",
                    state: { from: `/product/${slug}` }
                }
            )
        }
    }
    return (
        <>
            <div
                onClick={handleLogin}
            >
                <StarOutlined className="text-danger" /> <br />
                {user ? "Leave Rating" : "Login to review"}
            </div>
            <Modal
                title="Leave your rating"
                centered
                visible={modalVisible}
                onOk={() => {
                    setModalVisible(false)
                    toast.success("Thanks for your rating")

                }}
                onCancel={() => {
                    setModalVisible(false)
                }}>
                {children}
            </Modal>
        </>
    )
}
export default RatingModal