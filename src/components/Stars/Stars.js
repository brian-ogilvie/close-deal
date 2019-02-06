import React from 'react'
import './Stars.css'

const Stars = ({stars}) => {
  let allStars = ''
  for (let i = 1; i<=5; i++) {
    if (i<=Math.round(Number(stars))) {
      allStars += '⭐️'
    } else {
      allStars += '✪'
    }
  }
  return (
    <div className="Stars">
      {allStars}
    </div>
  )
}

export default Stars