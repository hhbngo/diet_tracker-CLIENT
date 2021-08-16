import axios from 'axios';

export const signUserUp = (creds) => {
  return axios.put(`${process.env.REACT_APP_API}/auth/create-user`, creds);
};

export const signUserIn = (creds) => {
  return axios.post(`${process.env.REACT_APP_API}/auth/sign-in`, creds);
};

export const checkAuth = () => {
  const expiresIn = window.localStorage.getItem('expiresIn');
  const expiredToken = new Date(expiresIn).getTime() < new Date().getTime();
  if (expiredToken) return Promise.reject('Expired token');
  return axios.post(
    `${process.env.REACT_APP_API}/auth/isAuth`,
    {},
    {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem('token')}`,
      },
    }
  );
};
