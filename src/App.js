import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { checkAuth } from './functions/auth';
import Layout from './containers/Layout';
import Loading from './pages/Loading/Loading';
import Login from './pages/auth/Login/Login';
import Register from './pages/auth/Register/Register';
import UserHome from './pages/UserHome';

const ROUTES = {
  noAuth: [
    {path: '/login', component: Login},
    {path: '/register', component: Register},
    {path: '/', component: () => (<h1>Regular Home</h1>)}
  ],
  authed: [
    {path: '/entry/:id', component: ({match}) =>(<h1>{match.params.id}</h1>)},
    {path: '/', component: UserHome }
  ]
};

export default function App() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  
  useEffect(() => {
    checkAuth()
      .then(res => {
        console.log(res);
        dispatch({type: 'AUTH_SUCCESS', payload: res.data});
      })
      .catch(err => {
        console.log(err.response);
        dispatch({type: 'AUTH_FALSE'});
      })
  }, []);

  const setRoutes = routeArray => 
    routeArray.map(r => <Route path={r.path} component={r.component} key={r.path} exact/>);

  return <>
    {
      auth === null 
      ? <Loading variant='opaque' color='secondary'/>
      : <Layout>
          <Switch>
            {setRoutes(auth ? ROUTES.authed : ROUTES.noAuth)}
            <Redirect to='/'/>
          </Switch>  
        </Layout>
    }
  </>
};

// refactor appbar
// global no connection
// uni-cookies

// Side bar links (user)

