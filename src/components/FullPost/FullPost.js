import axios from "axios";
import React, { Component } from "react";

import "./FullPost.css";

class FullPost extends Component {
  state = {
    completePost: null,
  };

  componentDidUpdate() {
    console.log("Id", this.props.id);
    if (this.props.id) {
      if (
        !this.state.completePost ||
        (this.state.completePost &&
          this.state.completePost.id !== this.props.id)
      ) {
        axios.get("/posts/" + this.props.id).then((res) => {
          console.log("Complete post", res);
          this.setState({
            completePost: res.data,
          });
        });
      }
    }
  }

  deletePostHandeler = () => {
    axios.delete("/posts/" + this.props.id).then((res) => {
      console.log("res delete", res);
    });
  };

  render() {
    let post = <p style={{ textAlign: "center" }}>Please select a Post!</p>;

    if (this.props.id) {
      post = <p style={{ textAlign: "center" }}>Please select a Post!</p>;
    }
    if (this.state.completePost) {
      post = (
        <div className="FullPost">
          <h1>{this.state.completePost.title}</h1>
          <p>{this.state.completePost.body}</p>
          <div className="Edit">
            <button onClick={this.deletePostHandeler} className="Delete">
              Delete
            </button>
          </div>
        </div>
      );
    }
    return post;
  }
}

export default FullPost;
