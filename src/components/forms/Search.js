import React from 'react'
import { useHistory } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { SearchOutlined } from '@ant-design/icons'
const Search = () => {
    let dispatch = useDispatch()
    /*  const { search } = useSelector(state => ({ ...state }))
     const { text } = search */
    const { text } = useSelector(state => ({ ...state }))
    const history = useHistory()
    const handleChange = (e) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: e.target.value },
        })

    }
    const handleSubmit = (e) => {
        e.preventDefault()
        history.push(`/shop?${text}`)
    }
    return (
        //my = horizontal margin
        <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
            <input
                onChange={handleChange}
                type="search"
                className="form-control mr-sm-2"
                value={text}
                placeholder="search"
                autofocus

            />

            <SearchOutlined onClick={handleSubmit} style={{ cursor: "pointer" }} />
        </form>

    )
}
export default Search