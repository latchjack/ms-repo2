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
    | Instead of setting state to response.data we set it to updatedPosts
    | to hardcode the Author field to the data as the backend doesn't
    | provide this field.
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
        this.setState({ posts: response.data })
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