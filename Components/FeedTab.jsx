import React from 'react'
import "./FeedTab"
function FeedTab({number}) {
  return (
    <div className="feedtab">
    <span className="feedtab-text">Show all {number} posts </span>
    </div>
  )
}

export default FeedTab
