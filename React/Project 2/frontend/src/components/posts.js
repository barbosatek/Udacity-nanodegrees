import React, { Component } from 'react';
import { connect } from 'react-redux'
import Post from './post'
import PostModal from './postModal'
import * as action from '../actions/index'

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }

    this.props.loadPosts()
  }


  componentWillReceiveProps(nextProps) {
    this.state.posts = nextProps.store.posts;
  }

  render() {
    const { store } = this.props;

    return (
      <div className="list-group">
        {this.state.posts && Object.keys(this.state.posts).map((key, index) => {
          return !this.state.posts[key].deleted &&
            <div>
              <Post post={this.state.posts[key]} key={this.state.posts[key].id}></Post>
              <PostModal post={this.state.posts[key]} key={this.state.posts[key].id}></PostModal>
            </div>
        }
        )}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadPosts: (data) => dispatch(action.loadPosts())
  }
}

function mapStateToProps(store) {
  return {
    store: {
      ...store
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Posts);
