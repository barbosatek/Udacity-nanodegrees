export const GetCategories = () => fetch(
    "http://localhost:3001/categories",
    { headers: { 'Authorization': 'test' }}
  )
  
  export const GetPosts = () => fetch(
    "http://localhost:3001/posts",
    { headers: { 'Authorization': 'test' }}
  )
  