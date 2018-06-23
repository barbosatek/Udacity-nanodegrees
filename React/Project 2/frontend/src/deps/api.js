const uuidv1 = require('uuid/v1');

export const GetCategories = () => fetch(
    "http://localhost:3001/categories",
    { headers: { 'Authorization': 'test' }}
  )
  
  export const GetPosts = () => fetch(
    "http://localhost:3001/posts",
    { headers: { 'Authorization': 'test' }}
  )
  
  export const GetPostComments = (id) => fetch(
    `http://localhost:3001/posts/${id}/comments`,
    { headers: { 'Authorization': 'test' }}
  )

  export const updatePostVote = (id, option) => {
    return fetch(
      `http://localhost:3001/posts/${id}`,
      {
        headers: { 'Authorization': 'test', 'Content-Type': 'application/json' }, method: "POST",
        body: JSON.stringify({option: option})
      }
    )
  }

  export const deletePost = (id) => {
    return fetch(
      `http://localhost:3001/posts/${id}`,
      {
        headers: { 'Authorization': 'test', 'Content-Type': 'application/json' }, method: "DELETE"
      }
    )
  }

  export const updatePost = (id, title, body) => {
    return fetch(
      `http://localhost:3001/posts/${id}`,
      {
        headers: { 'Authorization': 'test', 'Content-Type': 'application/json' }, method: "PUT",
        body: JSON.stringify({title: title, body: body})
      }
    )
  }

  export const createPost = (title, author, body, category) => {
    return fetch(
      `http://localhost:3001/posts`,
      {
        headers: { 'Authorization': 'test', 'Content-Type': 'application/json' }, method: "POST",
        body: JSON.stringify({
          id: uuidv1(),
          title: title,
          author: author,
          category: category,
          timestamp: Date.now(),
          body: body})
      }
    )
  }

  export const updateComment = (id, body) => {
    return fetch(
      `http://localhost:3001/comments/${id}`,
      {
        headers: { 'Authorization': 'test', 'Content-Type': 'application/json' }, method: "PUT",
        body: JSON.stringify({
          timestamp: Date.now(),
          body: body})
      }
    )
  }

  export const deleteComment = (id) => {
    return fetch(
      `http://localhost:3001/comments/${id}`,
      {
        headers: { 'Authorization': 'test', 'Content-Type': 'application/json' },
        method: "DELETE"
      }
    )
  }
  
  export const createComment = (author, body, parentId) => {
    return fetch(
      "http://localhost:3001/comments",
      {
        headers: { 'Authorization': 'test', 'Content-Type': 'application/json' }, method: "POST",
        body: JSON.stringify({
          id: uuidv1(),
          author: author,
          parentId: parentId,
          timestamp: Date.now(),
          body: body})
      }
    )
  }