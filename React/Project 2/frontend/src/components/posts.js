import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Posts extends Component {
  render() {
    const { store } = this.props;

    return (
      <div>
        <ul>
        {store.posts.map((post) =>
          {
            return !post.deleted && 
            <li className="nav-item" key={post.id}>
              <div>
                <p>{post.title}</p>
                <p>{post.author}</p>
                <p>{post.body}</p>
              </div>
          </li>
          }
        )}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(store) {
  console.log(store)
  return {
      store: {
          posts: [...store.posts]
      }
    }
}

export default connect(mapStateToProps)(Posts);
