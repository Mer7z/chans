import React, { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import Logo from '../../components/Logo'
import SearchBar from '../../components/Searchbar'
import Result from '../../components/Result'
import './browser.css'
import fetchApi from '../../fetchApi'

function Browser() {
  const { state } = useLocation();
  const [board, setBoard] = useState('');
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([])
  const [status, setStatus] = useState("Loading")
  var load = true;
  const onSearch = (b, q) =>{
    setBoard(b)
    setSearch(q)
    setStatus("Loading")
    load = false
  }

  useEffect(()=>{
    if(load){
      setBoard(state.board)
      setSearch(state.search)
      load = false;
    }
  }, [])

  return (
    <div id='browser'>
      <div className='navbar navbar-expand-lg'>
      <div className='browser-logo ms-3'>
        <a href="/" className='navbar-brand'>
          <Logo/>
        </a>
      </div>
      <div className="browser-search ms-4 me-auto">
        <SearchBar onSearch={onSearch} />
      </div>
      <div className='nav ms-auto me-3'>
        <ul className='navbar-nav'>
          <li><a href="/about" className="nav-link">About</a></li>
        </ul>
      </div>
    </div>
      <Results board={board} search={search} results={results} setResults={setResults} status={status} setStatus={setStatus} />
    </div>
  )
}

export default Browser

function Results({board, search, results, setResults, status, setStatus}){
  
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
  
  

  const fetchResults = async () =>{
    const array = await fetchApi(board, search)
    let sortedRes = sort(array);
    setResults(sortedRes);
  }

  useEffect(()=>{
    fetchResults().then(()=>setStatus("No Results")).catch(()=>setStatus("Server Error"));
  })

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