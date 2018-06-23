import * as Api from '../deps/api'
import {
    UPDATE_COMMENT
  } from './types'

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