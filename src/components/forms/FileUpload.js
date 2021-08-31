import axios from 'axios'
import React from 'react'
import { Avatar, Badge } from 'antd'
import { useState } from 'react'
import Resizer from 'react-image-file-resizer'
import { useSelector } from 'react-redux'
const FileUpload = ({ values, setValues, setLoading }) => {
    const { user } = useSelector(state => ({ ...state }))
    const fileUploadAndResize = (e) => {
        console.log(e.target.files)
        //resize file
        let files = e.target.files;
        let allUploadedFiles = values.images
        if (files) {
            setLoading(true)
            for (let i = 0; i < files.length; i++) {
                Resizer.imageFileResizer(files[i],
                    720, 720, "JPEG", 100, 0, (uri) => {
                        //console.log(uri)
                        axios.post(`${process.env.REACT_APP_API}/uploadimages`, { img: uri }, {
                            headers: {
                                authtoken: user ? user.token : ""
                            }
                        })
                            .then(res => {
                                console.log("img data:", res)
                                setLoading(false)
                                allUploadedFiles.push(res.data)
                                setValues({ ...values, images: allUploadedFiles })
                            })
                            .catch(err => {
                                setLoading(false)
                                console.log("cloudinary upload err", err.message)

                            })
                    }, "base64")
            }
        }
        //send to server to upload in cloudinary
        //set url to image in parent component - product create
    }
    const handleImageRemove = (public_id) => {
        setLoading(true)
        axios.post(`${process.env.REACT_APP_API}/removeimage`, { public_id }, {
            headers: {
                authtoken: user ? user.token : ""
            }
        })
            .then(res => {
                setLoading(false)
                const { images } = values
                let filteredImages = images.filter(img => img.public_id !== public_id)
                setValues({ ...values, images: filteredImages })
            })
            .catch(err => {
                console.log(err)
                setLoading(false)

            })


    }
    return (
        <>
            <div className="row">

                {values.images &&
                    values.images.map(img => (
                        <Badge key={img.public_id}
                            count="X"

                            onClick={() => handleImageRemove(img.public_id)}
                            style={{ cursor: "pointer" }}>
                            <Avatar src={img.url} className="m-3" shape="square" size={60} />

                        </Badge>
                        // console.log("img url ", img.url)

                    ))
                }

            </div>
            <div className="row">
                <label className="btn btn-primary"> Choose File
                    <input
                        type="file"
                        hidden
                        multiple
                        accept="images/*"
                        onChange={fileUploadAndResize} />
                </label>
            </div>
        </>

    )
}
export default FileUpload