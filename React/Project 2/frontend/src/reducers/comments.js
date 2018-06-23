import {
    LOAD_POST_COMTS,
    UPDATE_COMMENT,
    DELETE_COMMENT,
  } from '../actions/types'

  import {mapArrayToObject} from '../deps/util'
  
  export function comments(state = {}, action) {
    switch (action.type) {
      case LOAD_POST_COMTS:
        return {...state,
        ...mapArrayToObject(action.comments, 'id')}
      case UPDATE_COMMENT:
        return {
          ...state,
          [action.comment.id]: action.comment
        }
      case DELETE_COMMENT:
        delete state[action.comment.id]
        return {
          ...state
        }
      default:
        return state
    }
  }
  
  export default comments
  