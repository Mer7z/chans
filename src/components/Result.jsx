import React from 'react'

function Result({siteLink, subject, quote, replies, imageReplies, board}) {
  let quoteSub = quote.length > 50 ? quote.substring(0, 50) + '...' : quote
  quoteSub = quoteSub.replace('<span class="quote">&gt;', '>')
  quoteSub = quoteSub.replace('</span>', '')
  quoteSub = quoteSub.replace('&gt;', '>')
  return (
    <div className='result-card'>
      <a href={siteLink} className='thread-link' >
        <p className='result-link'>{siteLink}</p>
      </a>
      <a href={siteLink}>
        <h3 className='result-title'>{subject ? subject + ' -' : null} {quoteSub} - /{board}/</h3>
      </a>
      <p className='result-info'>Replies: {replies} | Images: {imageReplies}</p>
    </div>
  )
}

export default Result