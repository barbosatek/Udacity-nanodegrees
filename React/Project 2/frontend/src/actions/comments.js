import * as Api from '../deps/api'
import {
    UPDATE_COMMENT,
    DELETE_COMMENT,
    CREATE_COMMENT,
  } from './types'

  export const deleteComment = (id) => {
    return function(dispatch){
      return Api.deleteComment(id)
      .then((res) => {return(res.json())})
      .then((data) => {
        return dispatch({
          type: DELETE_COMMENT,
          comment: data
        });
      });
    }
  }

  export const updateComment = (id, body) => {
    return function(dispatch){
      return Api.updateComment(id, body)
      .then((res) => {return(res.json())})
      .then((data) => {
        return dispatch({
          type: UPDATE_COMMENT,
          comment: data
        });
      });
    }
  }

  export const createComment = (author, body, parentId) => {
    return function(dispatch){
      return Api.createComment(author, body, parentId)
      .then((res) => {return(res.json())})
      .then((data) => {
        return dispatch({
          type: CREATE_COMMENT,
          comment: data
        });
      });
    }
  }