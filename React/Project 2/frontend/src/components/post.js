import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as action from '../actions/post'

class Post extends Component {
    state = {
        post: this.props.post,
        comments: []
    }

    componentWillMount() {
        this.props.dispatch(action.loadPostComments(this.props.post.id));
        this.setState({post: this.props.post});
    }

    voteUp = (post) => {
        post.voteScore += 1;
        this.props.dispatch(action.updatePostVote(post, "upVote"))
    }

  render() {
    const { store } = this.props;

    return (
        <a href={`#${this.state.post.id}`} className="list-group-item list-group-item-action flex-column align-items-start">
            
            {/* Title and Vote buttons */}
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{this.state.post.title}</h5>
                <small>
                    <div className="btn-group-sm" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-light btn-sm" onClick={(e) => this.voteUp(this.state.post, {option: "upVote"})}>
                            <span className="oi oi-thumb-up"></span>
                        </button>
                        <button type="button" className="btn btn-light btn-sm">
                            <span className="oi oi-thumb-down"></span>
                        </button>
                    </div>
                </small>
            </div>

            {/* Author and VoteScore */}
            <div className="d-flex w-100 justify-content-between">
                <p>By {this.state.post.author}</p>
                <small>{this.state.post.voteScore} votes.</small>
            </div>

            {/* Body and Edit/Delete buttons */}
            <div className="d-flex w-100 justify-content-between">
                <p className="mb-1">{this.state.post.body}</p>
                <small>
                <div className="btn-group-sm" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-link">
                            <span className="oi oi-pencil"></span>
                        </button>
                        <button type="button" className="btn btn-link">
                            <span className="oi oi-trash"></span>
                        </button>
                    </div>
                </small>
            </div>

            {/* Author and VoteScore */}
            <div className="d-flex w-100 justify-content-between">
                <p>
                    <button className="btn btn-link" type="button" data-toggle="collapse" data-target={`#${this.state.post.id}`} aria-expanded="false" aria-controls="collapseExample">
                    Comments
                    </button>
                </p>
            </div>
            
            <div className="collapse" id={`${this.state.post.id}`}>
            {Object.keys(store.comments).map((key, index) =>
                {
                    return store.comments[key].parentId === this.state.post.id && !store.comments[key].deleted && 
                        <div className="card card-body" key={store.comments[key].id}>
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
