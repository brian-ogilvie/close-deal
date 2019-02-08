import React from 'react'
import './Stars.css'

const Stars = ({stars, size, inline}) => {
  let starsClassName = 'Stars'
  if (size) {starsClassName += ` Stars--${size}`}
  if (inline) {starsClassName += ` Stars--${inline}`}
  const lastGoldStar = Math.round(Number(stars))
  let goldStars = ''
  for (let i = 1; i <= lastGoldStar; i ++) {
    goldStars += '⭐️'
  }
  let blackStars = ''
  if (lastGoldStar < 5) {
    for (let i = 1; i <= 5 - lastGoldStar; i++) {
      blackStars += '✪'
    }
  }
  return (
    <div className={starsClassName}>
      {goldStars}<span className="Stars__black">{blackStars}</span>
    </div>
  )
}

export default Stars