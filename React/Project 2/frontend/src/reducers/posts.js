import {
    LOAD_ALL_POSTS,
    UPDATE_POST
  } from '../actions/types'

  import {mapArrayToObject} from '../deps/util'
  
  export function posts(state = {}, action) {
    switch (action.type) {
      case LOAD_ALL_POSTS:
        return mapArrayToObject(action.posts, 'id')
      case UPDATE_POST:
        return {
          ...state,
          [action.post.id]: action.post
        }
      default:
        return state
    }
  }
  
  export default posts
  