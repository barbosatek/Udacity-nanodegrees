import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Post from './post'

class Posts extends Component {
  render() {
    const { store } = this.props;

    return (
      <div className="list-group">
        {Object.keys(store.posts).map((key, index) =>
          {
            return !store.posts[key].deleted && 
            <Post post={store.posts[key]}  key={store.posts[key].id}></Post>
          }
        )}
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
