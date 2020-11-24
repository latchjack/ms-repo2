import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import './NewPost.css';

class NewPost extends Component {
  state = {
    title: '',
    content: '',
    author: 'Max',
    submitted: false
  }

  componentDidMount() {
    /*
    |=====================================
    | You can add user authentication here if you
    | wanted the NewPost component to redirect the
    | user back to the Home/Posts component if 
    | they're not authenticated.
    |
    | this.props.history.replace('/posts/');
    |=====================================
    */
    console.log(this.props);
  }

  postDataHandler = () => {
    /*
    |=====================================
    | Axios will send our data object in a 
    | json format to store on the server. 
    |=====================================
    */
    const data = {
      title: this.state.title,
      body: this.state.body,
      author: this.state.author
    };
    /*
    |=====================================
    | Here we pass the data object to the POST url.
    | This runs asynchronously.
    | 
    | To make the page redirect to the posts page
    | after submitting a post we can either use
    | this.setState({ submitted: true })
    | or
    | this.props.history.push('/posts')
    | The main difference is the push method adds
    | the last page to the stack, so you can navigate
    | back to it with the browser's back button.
    | Whereas redirect replaces the current page, so
    | if you click the back button, you can go back but
    | it wont be back but it skips the last page.
    | If you want to replicate this method but still use
    | the history method you can do so by writing...
    | this.props.history.replace('/posts')
    |=====================================
    */
    axios.post('/posts', data)
      .then(response => {
        console.log(response);
        // this.setState({ submitted: true }) or...
        this.props.history.push('/posts');
      });
  }

  render () {
    let redirect = null;
    if (this.state.submitted) {
      redirect = <Redirect to="/posts" />
    }
    return (
      <div className="NewPost">
        {redirect}
        <h1>Add a Post</h1>
        <label>Title</label>
        <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
        <label>Content</label>
        <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
        <label>Author</label>
        <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
          <option value="Max">Max</option>
          <option value="Manu">Manu</option>
        </select>
        <button onClick={this.postDataHandler}>Add Post</button>
      </div>
    );
  }
}

export default NewPost;