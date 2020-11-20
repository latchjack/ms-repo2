import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

/*
|============================================================
| The axios defaults function allows us to make some changes to
| our application and requests too.
|============================================================
| By adding this baseURL we can shorten our URL in our requests.
| The URL we are sending and receiving all of our requests from
| is always the same (https://jsonplaceholder.typicode.com).
| When we do a GET or POST request, we add /posts to the end of
| the URL. To save use from using the long format address in our 
| Blog, FullPost and NewPost components, we can define the baseURL
| like below.
| As the index.js file is our Global file it will append the
| baseURL to any of our requests made in our other components.
|
| Thereby allowing use to use...
|
| axios.post('https://jsonplaceholder.typicode.com/posts', data)
| axios.get('https://jsonplaceholder.typicode.com/posts') 
|
| instead of...
|
| axios.post('/posts', data)
| axios.get('/posts')
|============================================================
| We can also set:
| + Common headers
| + Headers for a specific request i.e post requests
| ---The example below is setting our content type for our posts
| ---to application/json (which is just for the example as it's the default)
|============================================================
*/
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com'

axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';


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
