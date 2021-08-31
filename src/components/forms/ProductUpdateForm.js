import React from 'react'
import { Select } from 'antd'

const { Option } = Select
const ProductUpdateForm = ({ values,
    handleChange, handleSubmit,
    handleCategoryChange, setValues,
    arrayOfSubs, setArrayOfSubs, showSub,
    subOptions, categories, selectedCategory }) => {
    const { title, description, price, category, subs, shipping, quantity, images, colors, brands, color, brand } = values


    return (
        <>
            <form onSubmit={handleSubmit} >
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        className="form-control"
                        onChange={handleChange}
                        value={title}
                        name="title" />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <input
                        type="text"
                        className="form-control"
                        onChange={handleChange}
                        value={description}
                        name="description" />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input
                        type="number"
                        className="form-control"
                        onChange={handleChange}
                        value={price}
                        name="price" />
                </div>
                <div className="form-group">
                    <label>Shipping</label>
                    <select
                        value={shipping}
                        name="shipping" className="form-control" onChange={handleChange}>
                        <option selected>Select yes or no</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Quantity</label>
                    <input
                        type="number"
                        className="form-control"
                        onChange={handleChange}
                        value={quantity}
                        name="quantity" />
                </div>
                <div className="form-group">
                    <label>Colors</label>
                    <select value={color} name="color" className="form-control" onChange={handleChange}>
                        <option selected>Select any color</option>
                        {colors.map(c => (<option key={c} value={c}>{c}</option>))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Brands</label>
                    <select value={brand} name="brand" className="form-control" onChange={handleChange}>
                        <option selected>Select one brand</option>
                        {brands.map(b => (<option key={b} value={b}>{b}</option>))}
                    </select>
                </div>

                <div className="form-group">
                    <label>categories</label>
                    <select
                        value={selectedCategory ? selectedCategory : category._id}
                        name="category"
                        className="form-control"
                        onChange={handleCategoryChange}>

                        {categories.map(c => (<option key={c._id} value={c._id}>{c.name}</option>))}
                    </select>
                </div>
                <div className="form-group">
                    <label>subcategories</label>
                    <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        className="form-control"
                        placeholder="pleaseSelect"
                        value={arrayOfSubs}

                        onChange={value => setArrayOfSubs(value)}>
                        {subOptions.length && subOptions.map(s => (
                            <Option key={s._id} value={s._id}>{s.name}</Option>
                        ))}

                    </Select>
                    {console.log(subs)}

                </div>


                <button type="submit" className="btn btn-warning">Submit</button>

            </form>

        </>
    )
}
export default ProductUpdateForm