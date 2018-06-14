import * as Api from '../deps/api'
import {
    LOAD_ALL_CAT
  } from './types'

export const loadCategories = function() {
    return function (dispatch) {
      return Api.GetCategories()
        .then((res) => {return(res.json())})
        .then(function(data) {
          return dispatch({
            type: LOAD_ALL_CAT,
            categories: data.categories
          })
        }
      )
    }
  }

  
