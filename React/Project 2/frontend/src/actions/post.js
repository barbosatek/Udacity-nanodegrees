import * as Api from '../deps/api'
import {
    LOAD_POST_COMTS,
    LOAD_ALL_POSTS,
    CREATE_POST,
    DELETE_POST,
    UPDATE_POST
  } from './types'

  export const updatePost = (id, title, body) => {
    return function(dispatch){
      return Api.updatePost(id, title, body)
      .then((res) => {return(res.json())})
      .then((data) => {
        return dispatch({
          type: UPDATE_POST,
          post: data
        });
      });
    }
  }

  export const createPost = (title, author, body, category) => {
    return function(dispatch){
      return Api.createPost(title, author, body, category)
      .then((res) => {return(res.json())})
      .then((data) => {
        return dispatch({
          type: CREATE_POST,
          post: data
        });
      });
    }
  }

  export const updatePostVote = (id, option) => {
    return function(dispatch){
      return Api.updatePostVote(id, option)
      .then((res) => {return(res.json())})
      .then((data) => {
        return dispatch({
          type: UPDATE_POST,
          post: data
        });
      });
    }
  }

  export const deletePost = (id) => {
    return function(dispatch){
      return Api.deletePost(id)
      .then((res) => {return(res.json())})
      .then((data) => {
        return dispatch({
          type: DELETE_POST,
          post: data
        });
      });
    }
  }
  
export const loadPostComments = function(id) {
    return function (dispatch) {
      return Api.GetPostComments(id)
        .then((res) => {return(res.json())})
        .then(function(data) {
          return dispatch({
            type: LOAD_POST_COMTS,
            comments: data
          })
        }
      )
    }
  }

  export const loadPosts = function() {
    return function (dispatch) {
      return Api.GetPosts()
        .then((res) => {return(res.json())})
        .then(function(data) {
          return dispatch({
            type: LOAD_ALL_POSTS,
            posts: data
          })
        }
      )
    }
  }