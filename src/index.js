import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

/*
|==============================================================
| Handling errors locally is sensible, because you may want to 
| handle each error's response differently, depending on which 
| component the error occurs in.
| 
| Sometimes you may want to handle these errors globally. This 
| is so that, for any http request that is sent/received from 
| any component, you're able to do something in return.
|
| To do this, we can use axios's interceptors functions. We can
| define these globally. So that it will fire with every request
| we/the user sends or receives. This is useful for sending common
| headers, i.e authorisation headers, responses or a way to 
| globally handle errors. 
|
| This is currently the most global file in this app, as this is
| the file where we start our React file as it is mounted to the 
| DOM in the index.html file, using the ReactDOM.render function.
|==============================================================
*/

/*
|============================================================
| When we use the interceptors we must make sure to return the
| request, otherwise we end up blocking it. If we don't return
| it here, we get the "Something went wrong!" paragraph in our
| application.
| You can edit the request before returning it, that would be
| how we can add headers etc to it.
| We can add a console log message to pick up any errors.
| We should also add the Promise.reject, so we can forward it to
| our request written in the components, where we will be able 
| to handle the error with our catch method. This is great for
| if we have local task that show the error on the UI (to the 
| user) but also want to log it in a log file which we would send
| to a server.
|============================================================
*/
axios.interceptors.request.use(request => {
  console.log(request);
  // we can edit the request here, before returning it
  return request;
}, error =>{
  console.log(error);
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  console.log(response);
  // we can edit the response here, before returning it
  return response;
}, error =>{
  console.log(error);
  return Promise.reject(error);
})

/*
|============================================================
| You can remove an interceptor by using the function below.
| You store a reference to the interceptor in a variable and
| call 'eject' with that reference as the argument.
|
| e.g.
| const myInterceptor = axios.interceptors.request.use(function() {
|   *Your code here*
| });
| axios.interceptors.request.eject(myInterceptor);
|============================================================
*/



ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
