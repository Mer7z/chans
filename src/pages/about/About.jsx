import React from 'react'

function About() {
  return (
    <div id='about' style={{backgroundColor: "var(--bg-dark)", height: "100vh", padding: "30px"}}>
      <h1 style={{fontFamily: "'Josefin Sans'", fontWeight: "bold",color: "var(--green)", width: "max-content", margin: "20px auto"}}>About</h1>
      <div className='about-content'>
        <p>
          ChanS. is a search engine for 4chan. It uses an api to scrap 4chan catalogs and get threads info. <br/><br/> This site is not official and was made just for fun, if need to know more about 4chan go to <a href="https://www.4chan.org/faq" target="_blank">4chan's FAQ</a>.
        </p>
      </div>
      <div className='about-footer'>
        <span>Made by <a href="https://github.com/Mer7z">Mer7z</a> - 2022</span>
      </div>
    </div>
  )
}

export default About