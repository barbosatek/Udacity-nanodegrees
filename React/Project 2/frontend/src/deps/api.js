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
    { headers: { 'Authorization': '8675309' }}
  )