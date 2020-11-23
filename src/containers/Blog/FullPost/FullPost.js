import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
  state = {
    loadedPost: null
  }

  /* 
  |==============================================
  | Updating state from componentDidUpdate can cause an infinite loop.
  | The component would fetch data > set state > re-render > repeat, 
  | continuouly sending http requests.
  | Changed componentDidUpdate to componentDidMount because now we're
  | not updating it, it is getting adding or removed from the DOM.
  | Now we access the id of the post by using this.props.match.params.id
  |==============================================
  */
  componentDidMount() {
    console.log(this.props)
    if (this.props.match.params.id) {
      /* 
      |==============================================
      | We need to make sure we only send the http request and update
      | the state, if a new post is loaded. This stops uneccessary 
      | re-rendering.
      | 1. This nested If check inside the outer one, checks to see if
      | the loadedPost state returns as True.
      | 2. If we don't have the state of loadedPost OR if we do have it
      | but it has a different id, then we load the new id.
      | 3. Check if the loadedPost and the post id is not the same id 
      | we got via props, which means we wouldn't need to fetch new data
      | as it's the same id. We only want to fetch and re-render new data.
      | TLDR; we go ahead and make the request if we have no loadedPost
      | or if we do have one, but the id doesn't match the one we currently
      | have stored in state.
      |==============================================
      */
      if(!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)) {
        axios.get('/posts/' + this.props.match.params.id)
        .then(response => {
          // console.log(response);
          this.setState({ loadedPost: response.data })
        });
      };
    };
  };

  deletePostHandler = () => {
    /*
    |=====================================
    | The delete method requires the same url as
    | the get method. No other information is
    | needed for it, as it has everything it needs.
    |=====================================
    */
    axios.delete('/posts/' + this.props.id)
      .then(response => {
        console.log(response);
      });
  }

  render () {
    let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
    /*
    |==============================================
    | Without this first if statement, the page will
    | give out an error as the post will still be null.
    | This is because react immediately, attempts to
    | render the component with the props. However, the 
    | data fetching is asynchronous so it won't be ready
    | at the time the render is ready. So by adding the
    | If statement, we can display the paragraph with
    | "Loading!" until our data is ready when it has
    | been set to state.
    |==============================================
    */
    if (this.props.id) {
      post = <p style={{textAlign: 'center'}}>Loading!</p>;
    };
    /*
    |==============================================
    | The If below is a boolean. It will render the 
    | post if the loadedPost's state is True. 
    |==============================================
    */
    if (this.state.loadedPost) {
      post = (
        <div className="FullPost">
          {/* 
          |==============================================
          | React will try to render this h1 and p tag before
          | state has received the response data from the
          | axios request. The If statement above will stop
          | the error from happening at the initial render.
          | This is because the state is still set to null
          | at the time this renders
          |==============================================
          */}
          <h1>{this.state.loadedPost.title}</h1>
          <p>{this.state.loadedPost.body}</p>
          <div className="Edit">
            <button 
              className="Delete" 
              onClick={this.deletePostHandler}
            >
              Delete
            </button>
          </div>
        </div>
      );
    };
    return post;
  }
}

export default FullPost;