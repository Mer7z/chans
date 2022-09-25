import React from 'react'

function Result({siteLink, subject, quote, replies, imageReplies, board, author, img}) {
  let quoteSub = quote.length > 50 ? quote.substring(0, 50) + '...' : quote
  quoteSub = quoteSub.replace('<span class="quote">&gt;', '>')
  quoteSub = quoteSub.replace('</span>', '')
  quoteSub = quoteSub.replace('&gt;', '>')
  return (
    <div className='result-card'>
      <a href={siteLink} target='_blank' className='thread-link' >
        <p className='result-link'>{siteLink}</p>
      </a>
      <div className='result-flex d-flex'>
        <div className='result-info-container'>
          <a href={siteLink} target='_blank'>
            <h3 className='result-title'>{subject ? subject + ' -' : null} {quoteSub} - /{board}/</h3>
          </a>
          <p className='result-author'>{author}</p>
          <p className='result-info'>Replies: {replies} | Images: {imageReplies}</p>
        </div>
      </div>
    </div>
  )
}

export default Result