import React, { Component } from "react";
// import axios from "axios";

import axios from "../../axios";

import Post from "../../components/Post/Post";
import FullPost from "../../components/FullPost/FullPost";
import NewPost from "../../components/NewPost/NewPost";
import "./Blog.css";

class Blog extends Component {
  state = {
    posts: [],
    selectedPostId: null,
    caughtError: false,
  };

  componentDidMount() {
    // let post = await axios.get("https://jsonplaceholder.typicode.com/posts");
    // console.log("Data aya", post);

    axios
      .get("/posts")
      .then((res) => {
        const posts = res.data.slice(0, 4);
        const updatedPosts = posts.map((post) => {
          return {
            ...post,
            //   title: "Pemdora",
            author: "Toruk Makto",
          };
        });
        this.setState({ posts: updatedPosts });
      })
      .catch((e) => {
        this.setState({ caughtError: true });
        console.log("error", e);
      });
  }
  postSelectedHandler = (id) => {
    this.setState({ selectedPostId: id });
  };

  render() {
    let posts = <p style={{ textAlign: "center" }}>SOmething Went Wrong!</p>;

    if (!this.state.caughtError) {
      posts = this.state.posts.map((post) => {
        return (
          <Post
            key={post.id}
            title={post.title}
            author={post.author}
            clicked={() => this.postSelectedHandler(post.id)}
          />
        );
      });
    }

    return (
      <div>
        <section className="Posts">{posts}</section>
        <section>
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
