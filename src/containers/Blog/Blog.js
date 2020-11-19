import React, { Component } from 'react';
import axios from 'axios';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
  state = {
    posts: [],
    selectedPostId: null
  }

  componentDidMount() {
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
    axios.get('https://jsonplaceholder.typicode.com/posts')
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
      });
  }

  postSelectedHandler = (id) => {
    /*
    |==============================================================
    | This takes the post.id argument and sets it to state
    |==============================================================
    */
    this.setState({ selectedPostId: id })
  }

  render() {
    const posts = this.state.posts.map(post => {
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
      return <Post 
        key={post.id} 
        title={post.title} 
        author={post.author} 
        clicked={() => this.postSelectedHandler(post.id)}
      />
    });
    return (
      <div>
        <section className="Posts">
          {posts}
        </section>
        <section>
          {/* 
          |==============================================================
          | The post.id is passed down to the FullPost component, so that 
          | inside the component we can listen to us getting a new id and
          | then fetch the data for that id.
          | 
          | 
          | 
          | 
          |============================================================== 
          */}
          <FullPost id={this.state.selectedPostId} />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;