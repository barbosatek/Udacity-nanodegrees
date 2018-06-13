import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Post from './post'

class Posts extends Component {
  render() {
    const { store } = this.props;

    return (
      <div>
        <ul>
        {Object.keys(store.posts).map((key, index) =>
          {
            return !store.posts[key].deleted && 
            <li className="nav-item" key={store.posts[key].id}>
              <Post post={store.posts[key]}></Post>
          </li>
          }
        )}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
      store: {
          posts: store.posts
      }
    }
}

export default connect(mapStateToProps)(Posts);
