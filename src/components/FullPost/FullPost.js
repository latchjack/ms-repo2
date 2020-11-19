import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
  state = {
    loadedPost: null
  }

  componentDidUpdate() {
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
    }

    if (this.props.id) {
      axios.get('https://jsonplaceholder.typicode.com/posts/' + this.props.id)
        .then(response => {
          // console.log(response);
          this.setState({ loadedPost: response.data })
        });
    }
  }

  render () {
    let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
    if (this.props.id) {
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
            <button className="Delete">Delete</button>
          </div>
        </div>
      );
    }
    return post;
  }
}

export default FullPost;