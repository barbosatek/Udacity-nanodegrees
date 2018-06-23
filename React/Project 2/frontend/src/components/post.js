import React, { Component } from 'react';
import { connect } from 'react-redux'
import FormModal from './formModal'
import * as action from '../actions/post'
import * as commentsActions from '../actions/comments'

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: this.props.post,
            comments: []
        }
    
        this.handleEditComment = this.handleEditComment.bind(this);
      }

    componentWillMount() {
        this.props.loadComments(this.props.post.id)
    }

    vote(option){
        this.props.vote({
            id: this.state.post.id,
            option
        })
    }

    handleEditComment(comment){
        var id = comment.id;
        return this.props.updateComment({
            id: comment.id,
            body: comment.body
        }).then(() => {
          return this.props.store.comments[id]
        })
    }

    deletePost(){
        this.props.deletePost(this.state.post.id)
    }

    componentWillReceiveProps(nextProps) {
        var post = nextProps.post;
        this.setState(state => {
            state.post = post;
        })
    }

  render() {
    const { store } = this.props;

    return (
        <div className="card">
            <div className="card-header d-flex w-100 justify-content-between">
                <h5>{this.state.post.title} <button type="button" className="btn btn-link btn-sm" onClick={(e) => this.vote("upVote")}>
                    <span className="oi oi-thumb-up"></span>
                </button>
                    <button type="button" className="btn btn-link btn-sm" onClick={(e) => this.vote("downVote")}>
                        <span className="oi oi-thumb-down"></span>
                    </button></h5>

                <small>
                    <div className="btn-group-sm" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-link" data-toggle="modal" data-target={`#modal-${this.state.post.id}`}>
                            <span className="oi oi-pencil"></span>
                        </button>
                        <button type="button" className="btn btn-link">
                            <span className="oi oi-trash" onClick={() => this.deletePost()}></span>
                        </button>
                    </div>
                </small>
            </div>
            <div className="card-body">
                <blockquote className="blockquote mb-0">
                    <header className="blockquote-footer">By <cite title="Source Title">{this.state.post.author}, {this.state.post.voteScore} votes.</cite></header>
                    <p>{this.state.post.body}</p>
                </blockquote>
                <button className="btn btn-link" type="button" data-toggle="collapse" data-target={`#${this.state.post.id}`} aria-expanded="false" aria-controls="collapseExample">
                    Comments
                    </button>
            </div>

            <div className="collapse" id={`${this.state.post.id}`}>
            {Object.keys(store.comments).map((key, index) =>
                {
                    return store.comments[key].parentId === this.state.post.id && !store.comments[key].deleted && 
                        <div className="card card-body" key={store.comments[key].id}>
                            <div className="d-flex w-100 justify-content-between">
                                <p className="mb-1">{store.comments[key].body}</p>
                                <small>
                                    <div className="btn-group-sm" role="group" aria-label="Basic example">
                                        <button type="button" className="btn btn-link"
                                            data-toggle="modal"
                                            data-target={`#modal-${store.comments[key].id}`}>
                                            <span className="oi oi-pencil"></span>
                                        </button>
                                    </div>
                                </small>
                            </div>
                        <FormModal
                            form={store.comments[key]}
                            title={'Edit Comment'}
                            editableFields={['body']}
                            onSubmit={(c) => { return this.handleEditComment(c)}}></FormModal>
                        </div>
                }
            )}
            </div>
        </div>
    );
  }
}

function mapDispatchToProps (dispatch) {
    return {
        vote: (data) => dispatch(action.updatePostVote(data.id, data.option)),
        loadComments: (data) => dispatch(action.loadPostComments(data)),
        deletePost: (data) => dispatch(action.deletePost(data)),
        updateComment: (data) => dispatch(commentsActions.updateComment(data.id, data.body))
    }
  }

function mapStateToProps(store) {
  return {
      store: {
        ...store
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
