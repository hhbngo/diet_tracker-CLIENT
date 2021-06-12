import axios from 'axios';

export const createEntrie = () => {
    return axios.put(`${process.env.REACT_APP_API}/entrie/create-entrie`, {}, {
        headers: {
            authorization: `Bearer ${window.localStorage.getItem('token')}`
        }
    })
};

export const getEntries = (page) => {
    return axios.get(`${process.env.REACT_APP_API}/entrie/get-entries/${page}`, {
        headers: {
            authorization: `Bearer ${window.localStorage.getItem('token')}`
        }
    })
};