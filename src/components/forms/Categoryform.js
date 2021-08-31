import React from 'react'

const CategoryForm = ({ HandleSubmit, name, setName }) => (
    <form onSubmit={HandleSubmit}>
        <div className="form-group">
            <input
                type="text"
                className="form-control mt-2"
                value={name}
                placeholder="Category Name"
                onChange={e => setName(e.target.value)}
                autoFocus
                required
            />
            <button type="submit" className="btn btn-info mt-2">Save</button>
        </div>
    </form>
)

export default CategoryForm
