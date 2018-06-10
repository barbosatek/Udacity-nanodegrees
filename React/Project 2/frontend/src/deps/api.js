export const GetCategories = () => fetch(
    "http://localhost:3001/categories",
    { headers: { 'Authorization': 'test' }}
  )
  