import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import './Blog.css';
// import axios from 'axios';
// import axios from '../../axios';
import Posts from '../Blog/Posts/Posts';
import NewPost from '../Blog/NewPost/NewPost';
import FullPost from '../Blog/FullPost/FullPost';

class Blog extends Component {

  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li><NavLink 
                    to="/" 
                    exact
                    activeClassName="my-active"
                    activeStyle={{
                      color: 'fa923f',
                      textDecoration: 'underline'
                    }} // this works like styled components
                  >Home</NavLink></li>
              <li><NavLink to={{
                pathname: '/new-post',
                hash: '#submit',
                search: '?quick-submit=true'
              }}>New Post</NavLink></li>
            </ul>
          </nav>
        </header>
        {/* <Route path="/" exact render={() => <h1>Home</h1>} /> */}
        <Switch>
          <Route path="/" exact component={Posts} />
          <Route path="/new-post" component={NewPost} />
          <Route path="/:id" exact component={FullPost} />
        </Switch>
      </div>
    );
  }
}

/*
|========================================================= 
| The /:id parameter in the Route's path is able to use any name
| you choose. It'll allow react-router to dynamically navigate 
| to the id of the post/page without us having to make a Route
| to each individual post. This can be '/:anything'.
|
| The Switch component tells react-router to only render one
| component at a time. It will render the first component that
| matches the path in the 'to' attribute.
|=========================================================
*/

/*
|========================================================= 
| Absolute vs Relative paths
|=========================================================
| An ab is always appended to your domain e.g. if you
| are serving this app from example.com and you want to
| navigate to example.com/new-post, it would always attach
| '/new-post' right after the domain name. So if you were
| at example.com/posts, it would become example.com/new-posts
| whereas a relative path would make it example.com/posts/new-post.
|
| 
| The 'to' attribute of the Link component always generates an
| absolute path. You need to build the path dynamically if you
| want to generate a relative path.
| Examples...
|
| ABSOLUTE:
| <li><NavLink to={{
|    pathname: '/new-post',
|    hash: '#submit',
|    search: '?quick-submit=true'
| }}>New Post</NavLink></li>
|
| RELATIVE:
| <li><NavLink to={{
|    pathname: this.props.match.url + '/new-post',
|    hash: '#submit',
|    search: '?quick-submit=true'
| }}>New Post</NavLink></li>
|=========================================================
*/

export default Blog;