import {useRef, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { FaSearch } from "react-icons/fa"

function SearchBar({oldS, oldB}){
  const searchBar = useRef(null)
  const boardSelect = useRef(null)
  useEffect(()=>{
    if(searchBar){
      const input = searchBar.current
      input.addEventListener('focus',(e)=>{
        const parent = e.target.parentElement.parentElement
        parent.classList.add('focus')
      });
      input.addEventListener('blur',(e)=>{
        const parent = e.target.parentElement.parentElement
        parent.classList.remove('focus')
      });
    }
  })
  useEffect(()=>{
    if(oldS && oldB){
      searchBar.current.value = oldS
      for( const child of boardSelect.current.children){
        if(child.value === oldB){
          child.setAttribute('selected', 'selected')
        }
      }
    } 
  }, [])

  const navigate = useNavigate()
  const handdlePost = (e) =>{
    e.preventDefault()
    if(searchBar.current.value){
      navigate('/search', {state: {board: boardSelect.current.value, search: searchBar.current.value}})
    }
  }

  return(
    <div className='search-bar container-fluid d-flex'>
      <form onSubmit={handdlePost}>
      <select ref={boardSelect} name="board" id="board">
        <option value="all">all</option>
        <option value="a">a</option>
        <option value="b">b</option>
        <option value="c">c</option>
        <option value="d">d</option>
        <option value="e">e</option>
        <option value="g">g</option>
        <option value="gif">gif</option>
        <option value="h">hr</option>
        <option value="k">k</option>
        <option value="m">m</option>
        <option value="o">o</option>
        <option value="p">p</option>
        <option value="r">r</option>
        <option value="s">s</option>
        <option value="t">t</option>
        <option value="u">u</option>
        <option value="v">v</option>
        <option value="vg">vg</option>
        <option value="vm">vm</option>
        <option value="vmg">vmg</option>
        <option value="vr">vr</option>
        <option value="vrgp">vrgp</option>
        <option value="vst">vst</option>
        <option value="w">w</option>
        <option value="wg">wg</option>
        <option value="i">i</option>
        <option value="ic">ic</option>
        <option value="r9k">r9k</option>
        <option value="s4s">s4s</option>
        <option value="vip">vip</option>
        <option value="qa">qa</option>
        <option value="cm">cm</option>
        <option value="hm">hm</option>
        <option value="lgbt">lgbt</option>
        <option value="y">y</option>
        <option value="3">3</option>
        <option value="aco">aco</option>
        <option value="adv">adv</option>
        <option value="an">an</option>
        <option value="bant">bant</option>
        <option value="biz">biz</option>
        <option value="cgl">cgl</option>
        <option value="ck">ck</option>
        <option value="co">co</option>
        <option value="diy">diy</option>
        <option value="fa">fa</option>
        <option value="fit">fit</option>
        <option value="gd">gd</option>
        <option value="hc">hc</option>
        <option value="his">his</option>
        <option value="int">int</option>
        <option value="jp">jp</option>
        <option value="lit">lit</option>
        <option value="mlp">mlp</option>
        <option value="mu">mu</option>
        <option value="n">n</option>
        <option value="news">news</option>
        <option value="out">out</option>
        <option value="po">po</option>
        <option value="pol">pol</option>
        <option value="pw">pw</option>
        <option value="qst">qst</option>
        <option value="sci">sci</option>
        <option value="soc">soc</option>
        <option value="sp">sp</option>
        <option value="tg">tg</option>
        <option value="toy">toy</option>
        <option value="trv">trv</option>
        <option value="tv">tv</option>
        <option value="vp">vp</option>
        <option value="vt">vt</option>
        <option value="wsg">wsg</option>
        <option value="wsr">wsr</option>
        <option value="x">x</option>
        <option value="xs">xs</option>
      </select>
        <input ref={searchBar} type="search" name='q' id="search-bar" placeholder="Search in 4chan" autoComplete='off' />
      <button className='btn' id='search-btn'>
        <FaSearch />
      </button>
      </form>
    </div>
  )
}

export default SearchBar