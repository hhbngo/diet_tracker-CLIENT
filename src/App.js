import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { checkAuth } from './functions/auth';

import Layout from './containers/Layout';
import Loading from './pages/Loading/Loading';
import Login from './pages/auth/Login/Login';
import Register from './pages/auth/Register/Register';

const App = () => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [ cookies, setCookie, removeCookie ] = useCookies();

  useEffect(() => {
    checkAuth(cookies.token)
      .then(res => {
        console.log(res);
        dispatch({type: 'AUTH_SUCCESS', payload: res.data});
      })
      .catch(err => {
        console.log(err.response);
        removeCookie('token');
        dispatch({type: 'AUTH_FALSE'});
      })
  }, []);

  const setRoutes = () => {
    if (auth) {
      return [
        <Route key='home' path='/' render={() => <h1>USER Home</h1>}/>
      ]
    } else {
      return [
        <Route key='login' path='/login' component={Login}/>,
        <Route key='register' path='/register' component={Register} />,
        <Route key='home' path='/' render={() => <h1>Home</h1>}/>
      ]
    };
  }

  return <>
    {
      auth === null ? 
      <Loading variant='opaque' color='secondary'/>
      : 
      <Layout>
        <Switch>
          {setRoutes()}
        </Switch>  
      </Layout>
    }
  </>
};

export default App;


// log out

// user protected routes
// Side bar links (user)


// refactor appbar