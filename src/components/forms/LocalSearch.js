import React from 'react'
const LocalSearch = ({ keyword, setKeyword }) => {

    const handleSearchChange = (e) => {
        e.preventDefault()
        setKeyword(e.target.value.toLowerCase())

    }


    return (
        <form>
            <input
                type="search"
                className="form-control"
                placeholder="Search"
                value={keyword}
                onChange={handleSearchChange} />

        </form>
    )
}
export default LocalSearch