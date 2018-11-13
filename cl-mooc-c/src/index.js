import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import reducer from './reducers';
import { BrowserRouter } from 'react-router-dom';



// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ;
// const store = createStore(
//   reducer,
//   composeEnhancer(applyMiddleware(reduxPromise))
//   );

const store = createStore(
  reducer,
  applyMiddleware(reduxPromise)
  );

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>, 
  document.querySelector('#root')
  );
