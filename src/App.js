import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Blog from './containers/Blog/Blog';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Blog />
        </div>
      </BrowserRouter>
    );
  }
}

/*
|=============================================
| If the domain that you're hosting your app is
| a subdomain for example, www.example.com/my-app
| you have to set the basename attribute in the 
| BrowserRouter component. Otherwise when trying
| to navigate around the app your routes will not
| be appended to the address correctly.
|
| You will be directed to...
| www.example.com/posts
|
| Instead of...
| www.example.com/my-app/posts
|
| <BrowserRouter basename="/my-app">
|   <div className="App">
|     <Blog />
|   </div>
| </BrowserRouter>
|=============================================
*/

export default App;
