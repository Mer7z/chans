const apiUrl = "https://chan-searcher.herokuapp.com/"

export default async function fetchApi(board, q){
  const response = await fetch(apiUrl + board + '?q=' + q)
  return response.json()
}