import React, { useState, useEffect, useRef } from 'react'
import { useLocation, Link } from 'react-router-dom'
import Logo from '../../components/Logo'
import SearchBar from '../../components/Searchbar'
import Result from '../../components/Result'
import './browser.css'
import fetchApi from '../../fetchApi'

function Browser() {
  const { state } = useLocation();
  var board = ""
  var search = ""
  const [old, setOld] = useState([])
  const [results, setResults] = useState([])
  const [status, setStatus] = useState("Loading")
  
  const onSearch = (b, q) =>{
    board = b
    search = q
    setStatus("Loading")
  }

  const handler = (b, q) =>{
    board = b
    search = q
  }

  const setInitialState = () =>{
    if(state.board && state.search){
      board = state.board
      search = state.search
      if(old.length === 0){
        setOld({search, board})
      }
    }
  }

  useEffect(()=>{
    setInitialState()
    if(search && board){
      fetchResults()
      console.log('Fetching...')
    }
  }, [state])

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
    try{
      if(old.search !== search || old.board !== board){
        setResults([])
        const array = await fetchApi(board, search)
        setOld({search, board})
        let sortedRes = sort(array);
        setResults(sortedRes);
      }
    } catch (e){
      console.log(e)
      setStatus('Server Error')
      return
    }

    setStatus('No results')
 
  }

  return (
    <div id='browser'>
      <div className='navbar navbar-expand-lg'>
      <div className='browser-logo ms-3'>
          <Link to="/">
            <Logo/>
          </Link>
      </div>
      <div className="browser-search ms-4 me-auto">
        <SearchBar onSearch={onSearch} oldB={state.board} oldS={state.search} stateHanddler={handler} />
      </div>
      <div className='nav ms-auto me-3'>
        <ul className='navbar-nav'>
          <li><Link to="/about">About</Link></li>
        </ul>
      </div>
    </div>
      <Results board={board} search={search} results={results} setResults={setResults} status={status} setStatus={setStatus} />
    </div>
  )
}

export default Browser

function Results({board, search, results, setResults, status, setStatus}){

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
              author={res.author}
              img={res.imgurl}
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