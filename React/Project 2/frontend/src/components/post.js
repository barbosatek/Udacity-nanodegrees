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
        <div>
            <p>{this.state.post.title}</p>
            <p>{this.state.post.author}</p>
            <p>{this.state.post.body}</p>
            <ul>
                {Object.keys(store.comments).map((key, index) =>
                    {
                        return store.comments[key].parentId == this.state.post.id && !store.comments[key].deleted && 
                        <li className="nav-item" key={store.comments[key].id}>
                        <p>{store.comments[key].body}</p>
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
        comments: store.comments
      }
    }
}

export default connect(mapStateToProps)(Post);
