import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { checkAuth } from './functions/auth';
import Layout from './containers/Layout';
import Loading from './pages/Loading/Loading';
import Landing from './pages/Landing';
import Login from './pages/auth/Login/Login';
import Register from './pages/auth/Register/Register';
import UserHome from './pages/UserHome';
import EntryPage from './pages/EntryPage';
import { logout } from './store/actions/auth';

const ROUTES = {
  noAuth: [
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/', component: Landing },
  ],
  authed: [
    { path: '/entry/:id', component: EntryPage },
    { path: '/', component: UserHome },
  ],
};

export default function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!window.localStorage.getItem('token')) {
      return dispatch(logout());
    }
    checkAuth()
      .then((res) => {
        dispatch({ type: 'AUTH_SUCCESS', payload: res.data });
      })
      .catch((err) => {
        dispatch(logout());
      });
  }, []);

  const setRoutes = (routeArray) =>
    routeArray.map((r) => (
      <Route path={r.path} component={r.component} key={r.path} exact />
    ));

  return (
    <>
      {auth === null ? (
        <Loading variant="opaque" color="secondary" />
      ) : (
        <Layout>
          <Switch>
            {setRoutes(auth ? ROUTES.authed : ROUTES.noAuth)}
            <Redirect to="/" />
          </Switch>
        </Layout>
      )}
    </>
  );
}

// refactor appbar
// Side bar links (user)
