import React, { useState, useEffect, useRef } from 'react'
import { useLocation, Link } from 'react-router-dom'
import Logo from '../../components/Logo'
import SearchBar from '../../components/Searchbar'
import Result from '../../components/Result'
import './browser.css'
import fetchApi from '../../fetchApi'

function Browser() {
  const { state } = useLocation();
  const [old, setOld] = useState([])
  const [results, setResults] = useState([])
  const [status, setStatus] = useState("")
  
  const setInitialState = () =>{
    if(state.board && state.search){
      if(old.length === 0){
        setOld({search: state.search, board: state.board})
      }
    }
  }
  
  useEffect(()=>{
    setInitialState()
    if(state.search && state.board){
      setResults([])
      setStatus("Loading")
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
      if(old.search !== state.search || old.board !== state.board){
        const array = await fetchApi(state.board, state.search)
        setOld({search: state.search, board: state.board})
        let sortedRes = sort(array);
        setResults(sortedRes);
      }
    } catch (e){
      console.log(e)
      setStatus("Couldn't connect to the server")
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
        <SearchBar oldB={state.board} oldS={state.search} />
      </div>
      <div className='nav ms-auto me-3'>
        <ul className='navbar-nav'>
          <li><Link to="/about">About</Link></li>
        </ul>
      </div>
    </div>
      <Results results={results} status={status} />
    </div>
  )
}

export default Browser

function Results({results, status}){

  const StatusMsg = ()=>{
    return (
      <div className='status-msg'>
        {
        status === "Loading" ? (
          <img src="https://c.tenor.com/I6kN-6X7nhAAAAAi/loading-buffering.gif" alt="buffering" />
        ) : (
          <h3>{status}</h3>
        )
      }
      </div>
    )
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