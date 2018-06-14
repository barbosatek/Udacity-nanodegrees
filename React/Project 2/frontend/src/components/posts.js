import React, { Component } from 'react';
import { connect } from 'react-redux'
import Post from './post'
import PostModal from './postModal'
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
    this.props.loadPosts()
  }

  handleAuthorChange(event) {
    var value = event.target.value;
    this.setState(state => {
      state.postForm.author = value
    });
  }

  handleBodyChange(event) {
    var value = event.target.value;
    this.setState(state => {
      state.postForm.body = value
    });
  }

  handleTitleChange(event) {
    var value = event.target.value;
    this.setState(state => {
      state.postForm.title = value
    });
  }

  componentWillReceiveProps(nextProps) {
    this.state.posts = nextProps.store.posts;
  }

  handleSubmit(event) {
    event.preventDefault();
    
    this.props.createPost({
        title: this.state.postForm.title,
        author: this.state.postForm.author,
        body: this.state.postForm.body,
        category: this.state.category
    }).then(() => {
        this.setState(state => {
          state.postForm.title = ''
          state.postForm.author = ''
          state.postForm.body = ''
        })
    })
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
        <a href="#new-post" className="list-group-item list-group-item-action flex-column align-items-start">
          <div className="w-100 justify-content-between">
            <h5 className="mb-1">New Post</h5>
            <form>
              <div className="form-group">
                <label for="exampleFormControlInput1">Title</label>
                <input onChange={this.handleTitleChange} type="text" className="form-control" id="exampleFormControlInput1" placeholder="Title" />
              </div>
              <div className="form-group">
                <label for="exampleFormControlInput2">Author</label>
                <input onChange={this.handleAuthorChange} type="text" className="form-control" id="exampleFormControlInput2" placeholder="Author" />
              </div>
              <div className="form-group">
                <label for="exampleFormControlTextarea1">Post</label>
                <textarea onChange={this.handleBodyChange} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
              </div>
              <button onClick={this.handleSubmit} type="submit" class="btn btn-primary">Save</button>
            </form>
          </div>
        </a>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadPosts: (data) => dispatch(action.loadPosts()),
    createPost: (data) => dispatch(action.createPost(data.title, data.author, data.body, data.category))
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
