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
        <a href="#" data-toggle="collapse" href="#collapseExample" className="list-group-item list-group-item-action flex-column align-items-start">
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{this.state.post.title}</h5>
                <small>
                    <div className="btn-group-sm" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-light btn-sm">
                            <span className="oi oi-thumb-up"></span>
                        </button>
                        <button type="button" className="btn btn-light btn-sm">
                            <span className="oi oi-thumb-down"></span>
                        </button>
                        <button type="button" className="btn btn-link">
                            <span className="oi oi-pencil"></span>
                        </button>
                    </div>
                </small>
            </div>
            <div className="d-flex w-100 justify-content-between">
                <p>By {this.state.post.author}</p>
                <small>{this.state.post.voteScore} votes.</small>
            </div>
            <p className="mb-1">{this.state.post.body}</p>
            <div className="collapse" id="collapseExample">
            {Object.keys(store.comments).map((key, index) =>
                {
                    return store.comments[key].parentId == this.state.post.id && !store.comments[key].deleted && 
                        <div className="card card-body">
                            {store.comments[key].body}
                        </div>
                }
            )}
            </div>
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
