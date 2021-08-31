import React from 'react'
import { Link } from 'react-router-dom'
import { getSubs } from '../../functions/sub'
import { useState } from 'react'
import { useEffect } from 'react'
const SubList = () => {
    const [subs, setSubs] = useState([])
    const [loading, setLoading] = useState([])
    useEffect(() => {
        setLoading(true)
        getSubs().then(res => {
            setSubs(res.data)
            setLoading(false)
        })
    }, [])
    const showSubs = () => (
        subs.map(s =>
            <div
                key={s._id}
                className="col btn btn-outline-secondary btn-block btn-lg btn-raised m-3">
                <Link style={{ color: 'rgb(204, 51, 0)' }} to={`/sub/${s.slug}`} className=''>{s.name}</Link>
            </div>)

    )

    return (
        <div className="container">
            <div className="row">
                {
                    loading ? (<h4>Loading.....</h4>) : showSubs()
                }
            </div>
        </div>
    )
}
export default SubList