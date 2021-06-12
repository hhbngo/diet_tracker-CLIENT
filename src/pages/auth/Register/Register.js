import React, { useState } from 'react';
import Form from './Form';
import { signUserUp } from '../../../functions/auth';

const INITIAL_VALUES = {email: '', password: '', confirmPassword: ''};

export default function Register() {
  const [ values, setValues ] = useState(INITIAL_VALUES);
  const [ loading, setLoading ] = useState(false);
  const [ alert, setAlert ] = useState(null);

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAlert(null);
    if (values.password.length < 6) 
      {return setAlert({status: 'error', message: 'Password must be atleast 6 characters'});}
    if (values.password !== values.confirmPassword)
      {return setAlert({status: 'error', message: 'Passwords do not match!'});}
    setLoading(true);
    signUserUp(values)
      .then(res => {
        setLoading(false);
        setValues(INITIAL_VALUES);
        setAlert({status: 'success', message: 'Account created succesfully. Proceed to Sign In'});
      })
      .catch(err => {
        setLoading(false);
        err.response 
        ? setAlert({status: 'error', message: err.response.data.message})
        : setAlert({status: 'error', message: 'Unable to connect to server, try again later'})
      });
  };

  return (
    <Form 
      handleChange={handleChange} 
      handleSubmit={handleSubmit}
      loading={loading}
      alert={alert}
      values={values}
    />
  );
};