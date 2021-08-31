import React from 'react'
import { Link } from 'react-router-dom'

import toshiba from "../../images/toshiba.jpg"
import { EditOutlined } from '@ant-design/icons'
import { DeleteOutlined } from '@ant-design/icons'
import { Card } from 'antd'
const { Meta } = Card



const AdminProductCard = ({ product, handleRemove }) => {
    //destructure
    const { title, description, images, slug } = product
    return (
        <>
            <Card
                // style={{ backgroundColor: '#0d0d0d', color: "whitesmoke" }}
                cover={
                    <img
                        src={images && images.length ? images[0].url : toshiba}
                        style={{ height: 240, objectFit: "cover" }}
                        className="p-2"

                    />
                }
                actions={[
                    <Link to={`/Admin/Product/${slug}`} > <EditOutlined className="text-warning" />
                    </Link>,
                    <DeleteOutlined className="text-warning" onClick={() => handleRemove(slug)} />
                ]}
            >
                <Meta title={title} description={`${description && description.substring(0, 20)}....`} />
            </Card>
        </>
    )

}
export default AdminProductCard