import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import Spinner from './comps/Spinner'
import TryAgain from './comps/TryAgain'
import * as serviceWorker from './serviceWorker';

import JavascriptTimeAgo from 'javascript-time-ago'
// The desired locales.
import en from 'javascript-time-ago/locale/en'
import { useEffect } from 'react';

import { Provider, useDispatch, useSelector } from 'react-redux'
import { login } from 'store/authSlice'
import store from 'store/'

import App from 'pages/App'
import './styles/main.scss';
// Initialize the desired locales.
JavascriptTimeAgo.locale(en)

// const App = React.lazy(() => import('./pages/App'))
const Landing = React.lazy(() => import('./pages/Landing'))

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<Spinner />}>
      <Root />
    </Suspense>
  </Provider>,
  document.getElementById('root')
);
function Root() {
  const { status, isAuthenticated, user } = useSelector(state => state.auth)
  const dispatch = useDispatch();
  useEffect(() => {
    // console.log(document.cookie)
    dispatch(login());
    // eslint-disable-next-line
  }, [])
  if (status === "loading")
    return <Spinner />
  else if (status === "error")
    return <TryAgain fn={() => { dispatch(login()) }} message='Something went wrong, check you connection and try again' />
  else if (isAuthenticated && user)
    return <App />
  return <Landing />
}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
