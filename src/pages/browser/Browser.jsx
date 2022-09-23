import React, { useState, useEffect, useRef } from 'react'
import Logo from '../../components/Logo'
import SearchBar from '../../components/Searchbar'
import Result from '../../components/Result'
import './browser.css'
import fetchApi from '../../fetchApi'

function Browser() {
  return (
    <div id='browser'>
      <Navbar/>
      <Results/>
    </div>
  )
}

export default Browser

function Navbar(){
  return(
    <div className='navbar navbar-expand-lg'>
      <div className='browser-logo ms-3'>
        <a href="/" className='navbar-brand'>
          <Logo/>
        </a>
      </div>
      <div className="browser-search ms-4 me-auto">
        <SearchBar/>
      </div>
      <div className='nav ms-auto me-3'>
        <ul className='navbar-nav'>
          <li><a href="/about" className="nav-link">About</a></li>
        </ul>
      </div>
    </div>
  )
}

function Results(){
  const [results, setResults] = useState([])
  
  const params = new URLSearchParams(window.location.search)
  const search = params.get('q')
  const board = params.get('board')


  const sort = (array) => {
    var newArr = array;
    for (let i = 0; i < newArr.length; i++) {
      for (let j = 0; j < newArr.length; j++) {
        if(!(j+1 >= newArr.length)){
          const rep = newArr[j].replies ? newArr[j].replies : 0;
          const nextRep = newArr[j+1].replies ? newArr[j+1].replies : 0;
          if(rep < nextRep){
            const temp = newArr[j];
            newArr[j] = newArr[j+1];
            newArr[j+1] = temp;
          }
        }
      }
    }
    return newArr;
  }
  
  const getPages = (array) =>{
    let count = 1
    let start = true;
    while(start){
      const resultArr = paginate(array, count)
      if(resultArr.length > 0){
        count++
      } else {
        start = false;
      }
    }
    return count;
  }
  
  const fetchResults = async () =>{
    const array = await fetchApi(board, search)
    let sortedRes = sort(array);
    setResults(sortedRes);
  }
  const [status, setStatus] = useState("Loading")

  useEffect(()=>{
    fetchResults().then(()=>setStatus("No Results")).catch(()=>setStatus("Server Error"));
  }, [])

  const StatusMsg = ()=>{
    return <h3>{status}</h3>
  }

  return (
    <>
    <div id="results">
      {
        results.length > 0 ?
        results.map(
          (res, i) =>(
            <Result
              key={i}
              siteLink={res.link}
              subject={res.sub}
              quote={res.teaser}
              replies={res.replies}
              imageReplies={res.imgReplies}
              board={res.board}
            />
          )
        ) :
        <div className='no-results'>
          <StatusMsg/>
        </div>
      }
    </div>
    </>
  )

}