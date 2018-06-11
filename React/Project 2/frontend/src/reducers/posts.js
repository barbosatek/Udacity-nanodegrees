import {
    LOAD_ALL_POSTS,
  } from '../actions/types'
  
  export function posts(state = {}, action) {
    switch (action.type) {
      case LOAD_ALL_POSTS:
        return action.posts
      default:
        return state
    }
  }
  
  export default posts
  