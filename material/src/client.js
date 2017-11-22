import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router, Route, hashHistory, IndexRedirect, Redirect } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import reducers from './reducers';
import thunk from "redux-thunk";

import PathSelector from './routes/PathSelector';


const middleware = routerMiddleware(hashHistory);
const store = createStore(
  reducers,
  applyMiddleware(thunk)
);

const history = syncHistoryWithStore(hashHistory, store);

const rootRoute = {
  childRoutes: [{
    path: '/',
    component: require('./containers/App'),
    indexRoute: {
      onEnter: (nextState, replace) => {
        replace('/root');
      }
    },
    childRoutes: [
      require('./routes/app'),
      require('./routes/404'),
      require('./routes/500'),
      require('./routes/confirmEmail'),
      require('./routes/forgotPassword'),
      require('./routes/login'),
      require('./routes/signUp'),
      require('./routes/root'),
      {
        path: '*',
        indexRoute: { onEnter: (nextState, replace) => replace('/404') },
      }
    ]
  }]
};

render(
  <PathSelector history={history} rootRoute={rootRoute} store={store}/>,
  document.getElementById('app-container')
);
