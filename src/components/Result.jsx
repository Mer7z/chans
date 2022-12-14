import React from 'react'

function Result({siteLink, subject, quote, replies, imageReplies, board, author, img}) {
  let quoteSub = quote
  quoteSub = quoteSub.replace('<span class="quote">', '')
  quoteSub = quoteSub.replace('</span>')
  quoteSub = quoteSub.length > 50 ? quoteSub.substring(0, 50) + '...' : quoteSub
  let sub = subject ? subject + ' - ' : ''
  const header = `${sub}${quoteSub} - /${board}/`
  return (
    <div className='result-card'>
      <a href={siteLink} target='_blank' className='thread-link' >
        <p className='result-link'>{siteLink}</p>
      </a>
      <div className='result-flex d-flex'>
        <div className='result-info-container'>
          <a href={siteLink} target='_blank'>
            <h3 dangerouslySetInnerHTML={{__html: header}} className='result-title'></h3>
          </a>
          <p className='result-author'>{author}</p>
          <p className='result-info'>Replies: {replies} | Images: {imageReplies}</p>
        </div>
      </div>
    </div>
  )
}

export default Result