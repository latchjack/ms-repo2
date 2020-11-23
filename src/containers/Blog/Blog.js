import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './Blog.css';
// import axios from 'axios';
// import axios from '../../axios';
import Posts from '../Blog/Posts/Posts';
import NewPost from '../Blog/NewPost/NewPost';

class Blog extends Component {

  

  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to={{
                pathname: this.props.match.url + '/new-post',
                hash: '#submit',
                search: '?quick-submit=true'
              }}>New Post</Link></li>
            </ul>
          </nav>
        </header>
        {/* <Route path="/" exact render={() => <h1>Home</h1>} /> */}
        <Route path="/" exact component={Posts} />
        <Route path="/new-post" component={NewPost} />
      </div>
    );
  }
}

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
| <li><Link to={{
|    pathname: '/new-post',
|    hash: '#submit',
|    search: '?quick-submit=true'
| }}>New Post</Link></li>
|
| RELATIVE:
| <li><Link to={{
|    pathname: this.props.match.url + '/new-post',
|    hash: '#submit',
|    search: '?quick-submit=true'
| }}>New Post</Link></li>
|
|=========================================================
*/

export default Blog;