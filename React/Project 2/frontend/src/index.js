import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'
import * as action from './actions'
import { Provider } from 'react-redux'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

store.dispatch(action.loadCategories())

ReactDOM.render(
<Provider store={store}>
<BrowserRouter><App /></BrowserRouter>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
