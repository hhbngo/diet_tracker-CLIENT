import axios from 'axios';

export const signUserUp = async(creds) => {
    return await axios.put(`${process.env.REACT_APP_API}/auth/create-user`, creds);
}

export const signUserIn = async(creds) => {
    return await axios.post(`${process.env.REACT_APP_API}/auth/sign-in`, creds);
}

export const checkAuth = async() => {
    return await axios.post(`${process.env.REACT_APP_API}/auth/isAuth`, {}, {
        headers: {
            authorization: `Bearer ${window.localStorage.getItem('token')}`
        }
    })
};