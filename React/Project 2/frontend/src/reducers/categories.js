import {
    LOAD_ALL_CAT,
  } from '../actions/types'
  
  export function categories(state = {}, action) {
    switch (action.type) {
      case LOAD_ALL_CAT:
        return action.categories
      default:
        return state
    }
  }
  
  export default categories
  