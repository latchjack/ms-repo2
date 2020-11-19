import React, { Component } from 'react';
import axios from 'axios';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
  state = {
    posts: []
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
  render() {
    const posts = this.state.posts.map(post => {
      return <Post key={post.id} title={post.title} author={post.author} />
    });
    return (
      <div>
        <section className="Posts">
          {posts}
        </section>
        <section>
          <FullPost />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;