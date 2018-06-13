import {
    LOAD_ALL_CAT,
  } from '../actions/types'

  import {mapArrayToObject} from '../deps/util'
  
  export function categories(state = {}, action) {
    switch (action.type) {
      case LOAD_ALL_CAT:
        return mapArrayToObject(action.categories,'name')
      default:
        return state
    }
  }
  
  export default categories
  