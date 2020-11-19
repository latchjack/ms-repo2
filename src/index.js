import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

/*
|==============================================================
| This is the most global file in our app, as this is where it all is exported from. 
| So we add this here so that it can ,... any requests made with axios in our app.
|==============================================================
*/
axios.interceptors

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
