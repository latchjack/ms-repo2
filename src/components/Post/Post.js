import React from 'react';

import './Post.css';

const post = (props) => (
  <article className="Post" onClick={props.clicked}>
    <h1>{props.title}</h1>
    <div className="Info">
      <div className="Author">{props.author}</div>
    </div>
  </article>
);

/*
|=====================================================
| The routing related props are not passed down the
| component tree. 
| 
| There are a few ways we can hand the router props
| down.
| 1. As an attribute in the Post component inside the
| Posts component..
| <Post
|   key={post.id}
|   title={post.title}
|   author={post.author}
|   {...this.props} ** this line here
|   clicked={() => this.postSelectedHandler(post.id)}
| />
|
| 2. Targetting the specific property...
| <Post
|   key={post.id}
|   title={post.title}
|   author={post.author}
|   match={this.props.match} ** this line here
|   clicked={() => this.postSelectedHandler(post.id)}
| />
|
| 3. By using the withRouter hoc, which comes included
| with react-router-dom, we are able to pass the props
| of history, location, match with the component rendered
| using the Route. 
| import { withRouter } from 'react-router-dom';
| export default withRouter(post);
|=====================================================
*/

export default post;