const apiUrl = "https://chans-searcher.onrender.com"

export default async function fetchApi(board, q){
  const response = await fetch(`${apiUrl}${board}?q=${encodeURIComponent(q)}`)
  return response.json()
}