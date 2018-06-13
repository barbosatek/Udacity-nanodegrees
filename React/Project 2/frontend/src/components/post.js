import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as action from '../actions/post'
import { loadPostComments } from '../actions/post'

class Post extends Component {
    state = {
        post: this.props.post,
        comments: []
    }

    componentWillMount() {
        this.props.dispatch(loadPostComments(this.props.post.id));
        this.setState({post: this.props.post});
    }

  render() {
    const { store } = this.props;

    return (
        <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{this.state.post.title}</h5>
                <small>{this.state.post.author}</small>
            </div>
            <p className="mb-1">{this.state.post.body}</p>
            {Object.keys(store.comments).map((key, index) =>
                {
                    return store.comments[key].parentId == this.state.post.id && !store.comments[key].deleted && 
                    <small>{store.comments[key].body}</small>
                }
            )}
        </a>
    );
  }
}

function mapStateToProps(store) {
  return {
      store: {
        comments: store.comments
      }
    }
}

export default connect(mapStateToProps)(Post);
