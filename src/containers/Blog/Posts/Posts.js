import React, { Component } from 'react';
import Post from '../../../components/Post/Post';
import { Route } from 'react-router-dom';
import FullPost from '../FullPost/FullPost';
import './Posts.module.css';
// import { Link } from 'react-router-dom';
import axios from '../../../axios';
/*
|==============================================================
| Here we import axios from the axios.js file. 
| Remember that afer the word import these are just variable names
| We could called this axiosInstance if we'd like
| (import axiosInstance from '../../axios';).
|==============================================================
*/

class Posts extends Component {
  state = {
    posts: []
  }

  componentDidMount() {
    console.log(this.props);
    /*
    |==============================================================
    | To control the amount of posts we render on the screen at once,
    | we used the slice method to control the desired amount (0 > 4).
    | This way the fetch method will still fetch all of the posts,
    | but it will only store four of them in the posts array, which
    | is then mapped over in the updatedPosts arrow function below it.
    |
    | Next, instead of setting state to response.data, we set it to 
    | updatedPosts to hardcode the Author field to the data, as the 
    | backend doesn't provide this field. First we spread the mapped
    | post and then we added the author field with the name 'Max'.
    |==============================================================
    */
    axios.get('/posts')
      .then(response => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map(post => {
          return {
            ...post,
            author: 'Max'
          }
        });
        /*
        |==============================================================
        | Here I've set state to the updatedPosts constant as mentioned
        | above. Usually I would set this to 'response.data' which would
        | store all of the fetched data into state. This way using the
        | functions above I'm able to manipulate the data first before
        | storing it into state.
        |==============================================================
        */
        this.setState({ posts: updatedPosts })
        // console.log(response);
        // console.log(response.data);
      })
    .catch(err => {
      console.log(err);
      // this.setState({ error: true });
    })
  }

  postSelectedHandler = (id) => {
    // this.props.history.push({pathname: '/' + id});
    this.props.history.push('/' + id);
    /*
    |==============================================================
    | Programmatic Navigation - We use the history object we received
    | via the props to navigate around (go forward or backwards).
    | Inside the push method you can enter either a string or an object
    | to navigate to, just like you can with the 'to' attribute in the
    | Link and NavLink component.
    |==============================================================
    | This takes the post.id argument and sets it to state inside
    | selectedPostId. This will allow us to render the post in the
    | FullPost component later on.
    |==============================================================
    */
    // this.setState({ selectedPostId: id });
  }

  render() {
    let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>
    if (!this.state.error) {
      posts = this.state.posts.map(post => {
        /*
        |==============================================================
        | Here we pass props down to the Post component.
        | key - gives each post its own unique key (required by react).
        | title - allows the variable title in the Post component
        | author - hardcoded above and passes it in component to render.
        | clicked - es6 function will take the post id as an argument 
        | and pass it to the postSelectHandler to run function on that 
        | particular post.
        |==============================================================
        */
        return (
          // <Link to={'/posts/' + post.id} key={post.id}>
            <Post
              title={post.title} 
              author={post.author} 
              clicked={() => this.postSelectedHandler(post.id)}
            />
          // </Link>
        );
      });
    }

    /*
    |======================================================
    | Below is a nested route. This is how we can load a 
    | component inside of another component which is loaded
    | via routing.
    |======================================================
    */

    return(
      <div>
        <section className="Posts">
          {posts}
        </section>
        <Route path="/:id" exact component={FullPost} />
      </div>
    )
  }
}

export default Posts;