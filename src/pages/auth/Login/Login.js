import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import Form from './Form';
import { signUserIn } from '../../../functions/auth';

const Login = ({history}) => {
  const [ values, setValues ] = useState({email: '', password: ''});
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(null);
  const [ cookies, setCookie ] = useCookies();
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
        setLoading(false);
        setCookie('token', res.data.token);
        dispatch({type: 'AUTH_SUCCESS', payload: {userId: res.data.userId, email: res.data.email}});
        history.push('/');
      })
      .catch(err => {
        setLoading(false);
        setError({message: err.response.data.message});
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

export default Login;