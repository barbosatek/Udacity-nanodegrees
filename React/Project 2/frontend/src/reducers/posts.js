import {
    LOAD_ALL_POSTS,
    CREATE_POST,
    DELETE_POST,
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
        return mapArrayToObject(action.posts, 'id')
      case CREATE_POST:
        return {
          ...state,
          [action.post.id]: action.post
        }
      case DELETE_POST:
        delete state[action.post.id]
        return {
          ...state
        }
      default:
        return state
    }
  }
  
  export default posts
  