import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import './Blog.css';
import Posts from './Posts/Posts';

// import NewPost from './NewPost/NewPost';
import asyncComponent from '../../hoc/asyncComponent';
const AsyncNewPost = asyncComponent(() => {
  return import('./NewPost/NewPost');
});

/*
|=======================================
| When you import the components like above
| you're telling Webpack that these components
| are dependancies of the component it is rendering.
| To lazy load you have to change the way you
| import the component.
| To do this we import the asyncComponent we made.
| The asyncComponent function requires an
| argument (importComponent in its component).
| So we assign it to the AsyncNewPost constant and
| then tell it to import the NewPost component.
| This way, the NewPost component will only be 
| downloaded and rendered when the asyncComponent is 
| executed, will only happen when the AsyncNewPost
| const is rendered. Which is only when the user 
| navigates to /new-post.
|=======================================
*/

class Blog extends Component {
  state = {
    auth: false
  }

  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li><NavLink 
                    to="/posts/" 
                    exact
                    activeClassName="my-active"
                    activeStyle={{
                      color: 'fa923f',
                      textDecoration: 'underline'
                    }} // this works like styled components
                  >Posts</NavLink></li>
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
          {this.state.auth ? <Route path="/new-post" component={AsyncNewPost} /> : null}
          <Route path="/posts" component={Posts} />
          <Route render={() => <h1>Page not found</h1>} />
          {/* <Redirect from="/" to="/posts" /> */}
          {/* <Route path="/" component={Posts} /> */}
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
|
| The Redirect component allows us to redirect a user from one
| route to another route. 
| <Redirect from="/" to="/posts" />
| If the user lands on "/" we redirect them to "/posts".
| You can't use the Redirect component along with the 404 Route
| ( <Route render={() => <h1>Page not found</h1>} /> ) as the 
| 'from="/"' acts as a 'catch-all' and would redirect the use to
| the /posts endpoint instead of displaying the Not Found h1.
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