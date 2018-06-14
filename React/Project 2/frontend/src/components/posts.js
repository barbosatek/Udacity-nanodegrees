import React, { Component } from 'react';
import { connect } from 'react-redux'
import Post from './post'
import PostModal from './postModal'

class Posts extends Component {
  render() {
    const { store } = this.props;

    return (
      <div className="list-group">
        {Object.keys(store.posts).map((key, index) =>
          {
            return !store.posts[key].deleted && 
            <div>
              <Post post={store.posts[key]}  key={store.posts[key].id}></Post>
              <PostModal post={store.posts[key]}  key={store.posts[key].id}></PostModal>
            </div>
          }
        )}
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
      store: {
        ...store
      }
    }
}


export default connect(mapStateToProps)(Posts);
