import React from 'react'
import './Stars.css'

const Stars = ({stars, size}) => {
  const starsClassName = `Stars Stars--${size}`
  let allStars = ''
  for (let i = 1; i<=5; i++) {
    if (i<=Math.round(Number(stars))) {
      allStars += '⭐️'
    } else {
      allStars += '✪'
    }
  }
  return (
    <div className={starsClassName}>
      {allStars}
    </div>
  )
}

export default Stars