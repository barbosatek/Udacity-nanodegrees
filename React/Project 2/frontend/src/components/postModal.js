import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as action from '../actions/post'

class PostModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: this.props.post
        }

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTitleChange(value) {
        this.setState(prevState => ({
            post: {
                ...prevState.post,
                title: value
            }
        }));
    }

    handleBodyChange(value) {
        this.setState(prevState => ({
            post: {
                ...prevState.post,
                body: value
            }
        }));
    }

    handleSubmit(event) {
        event.preventDefault();

        this.props.update({
            id: this.state.post.id,
            title: this.state.post.title,
            body: this.state.post.body
        }).then(() => {
            this.setState((state, props) => {
                return {post: this.props.store.posts[this.state.post.id]};
            })
        })
    }
    
  render() {
    return (
        <div className="modal fade" id={`modal-${this.state.post.id}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <form onSubmit={this.handleSubmit}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Edit Post
                        </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">Title</label>
                                <input onChange={(e) => {this.handleTitleChange(e.target.value)}} type="test" className="form-control" id="exampleFormControlInput1" value={this.state.post.title} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlSelect1">Body</label>
                                <textarea value={this.state.post.body} onChange={(e) => this.handleBodyChange(e.target.value)} className="form-control" id="exampleFormControlTextarea1" rows="3">
                                    
                                </textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button onClick={this.handleSubmit} type="button" className="btn btn-primary" data-dismiss="modal">Save changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
  }
}

function mapDispatchToProps (dispatch) {
    return {
        update: (data) => dispatch(action.updatePost(data.id, data.title, data.body))
    }
  }

function mapStateToProps(store) {
  return {
      store: {
        ...store
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);
