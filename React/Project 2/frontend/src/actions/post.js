import * as Api from '../deps/api'
import {
    LOAD_POST_COMTS,
    UPDATE_POST
  } from './types'

  export const updatePostVote = (post, option) => {
    Api.updatePostVote(post.id, option)
  
    return {
      type: UPDATE_POST,
      post
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
