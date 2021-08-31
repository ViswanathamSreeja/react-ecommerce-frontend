import axios from 'axios'

export const createOrUpdateUser = async (authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/create-or-update-user`, {}, {
        headers: {
            authtoken,
        },
    })

}
export const currentUser = async (authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/currentUser`, {}, {
        headers: {
            authtoken,
        },
    })

}

export const currentAdmin = async (authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/currentAdmin`, {}, {
        headers: {
            authtoken,
        },
    })

}



