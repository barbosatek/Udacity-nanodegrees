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

  export const updatePost = (id, title, body) => {
    return fetch(
      `http://localhost:3001/posts/${id}`,
      {
        headers: { 'Authorization': 'test', 'Content-Type': 'application/json' }, method: "PUT",
        body: JSON.stringify({title: title, body: body})
      }
    )
  }