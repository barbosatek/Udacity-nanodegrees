import * as Api from '../deps/api'
import {
    LOAD_ALL_CAT,
    LOAD_ALL_POSTS
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

  export const loadPosts = function() {
    return function (dispatch) {
      return Api.GetPosts()
        .then((res) => {return(res.json())})
        .then(function(data) {
          return dispatch({
            type: LOAD_ALL_POSTS,
            posts: data
          })
        }
      )
    }
  }
