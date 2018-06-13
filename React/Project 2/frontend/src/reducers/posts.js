import {
    LOAD_ALL_POSTS,
  } from '../actions/types'

  import {mapArrayToObject} from '../deps/util'
  
  export function posts(state = {}, action) {
    switch (action.type) {
      case LOAD_ALL_POSTS:
        return mapArrayToObject(action.posts, 'id')
      default:
        return state
    }
  }
  
  export default posts
  