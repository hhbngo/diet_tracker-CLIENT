import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Form from './Form';
import { signUserIn } from '../../../functions/auth';

export default function Login({history}) {
  const [ values, setValues ] = useState({email: '', password: ''});
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(null);
  const dispatch = useDispatch();
  
  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    signUserIn(values)
      .then(res => {
        const { userId, email, token } = res.data;
        localStorage.setItem('token', token);
        setLoading(false);
        dispatch({type: 'AUTH_SUCCESS', payload: {userId, email}});
        history.push('/');
      })
      .catch(err => {
        setLoading(false);
        err.response 
        ? setError({message: err.response.data.message})
        : setError({message: 'Unable to connect to server, try again later'})
      })
  };

  return (
    <Form 
      handleChange={handleChange} 
      handleSubmit={handleSubmit}
      loading={loading}
      error={error}
    />
  );
}