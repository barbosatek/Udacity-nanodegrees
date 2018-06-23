import React, { Component } from 'react';
import { connect } from 'react-redux'
import Post from './post'
import FormModal from './formModal'
import * as action from '../actions/post'

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      category: props.category,
      postForm: {
        title: '',
        author: '',
        body: ''
      }
    }

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEditPost = this.handleEditPost.bind(this);
    this.props.loadPosts()
  }

  handleEditPost(post) {
    var id = post.id;
    return this.props.updatePost({
        id: post.id,
        title: post.title,
        body: post.body
    }).then(() => {
      return this.props.store.posts[id]
    })
}

  handleAuthorChange(value) {
    this.setState(prevState => ({
      postForm: {
        ...prevState.postForm,
        author: value
      }
    }));
  }

  handleBodyChange(value) {
    this.setState(prevState => ({
      postForm: {
        ...prevState.postForm,
        body: value
      }
    }));
  }

  handleTitleChange(value) {
    this.setState(prevState => ({
      postForm: {
        ...prevState.postForm,
        title: value
      }
    }));
  }

  componentWillReceiveProps(nextProps) {
    var posts = nextProps.store.posts
    this.setState(state => {
      state.posts = posts;
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    
    this.props.createPost({
        title: this.state.postForm.title,
        author: this.state.postForm.author,
        body: this.state.postForm.body,
        category: this.state.category
    }).then(() => {
      this.setState(
        {
          postForm: {
            body: '',
            title: '',
            author: ''
          }
        }
      );
    })
}

  render() {
    return (
      <div className="">
        {this.state.posts && Object.keys(this.state.posts).map((key, index) => {
          return !this.state.posts[key].deleted &&
            <div key={this.state.posts[key].id}>
              <Post post={this.state.posts[key]}></Post>
              <FormModal
                form={this.state.posts[key]}
                title={'Edit Post'} 
                editableFields={['title', 'body']}
                onSubmit={(p) => this.handleEditPost(p)}></FormModal>
            </div>
        }
        )}
        <div className="card">
          <div className="w-100 justify-content-between">
          <div className="card-header">
            <h5 className="mb-1">New Post</h5></div>
            <div className="card-body">
            <form>
              <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Title</label>
                <input value={this.state.postForm.title} onChange={(e) => this.handleTitleChange(e.target.value)} type="text" className="form-control" id="exampleFormControlInput1" placeholder="Title" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlInput2">Author</label>
                <input value={this.state.postForm.author} onChange={(e) => this.handleAuthorChange(e.target.value)} type="text" className="form-control" id="exampleFormControlInput2" placeholder="Author" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">Post</label>
                <textarea value={this.state.postForm.body} onChange={(e) => this.handleBodyChange(e.target.value)} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
              </div>
              <button onClick={(e) => this.handleSubmit(e)} type="submit" className="btn btn-primary">Save</button>
            </form>
            </div></div>
          </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadPosts: (data) => dispatch(action.loadPosts()),
    createPost: (data) => dispatch(action.createPost(data.title, data.author, data.body, data.category)),
    updatePost: (data) => dispatch(action.updatePost(data.id, data.title, data.body))
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
