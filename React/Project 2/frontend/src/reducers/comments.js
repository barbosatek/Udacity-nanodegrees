import {
    LOAD_POST_COMTS,
  } from '../actions/types'

  import {mapArrayToObject} from '../deps/util'
  
  export function comments(state = {}, action) {
    switch (action.type) {
      case LOAD_POST_COMTS:
        return {...state,
        ...mapArrayToObject(action.comments, 'id')}
      default:
        return state
    }
  }
  
  export default comments
  