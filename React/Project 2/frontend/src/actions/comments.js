import * as Api from '../deps/api'
import {
    UPDATE_COMMENT,
    DELETE_COMMENT
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