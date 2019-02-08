const getAverage = (arr, decPlaces) => {
  if (arr.length === 0) {return 0;}
  return (arr.reduce((acc, curr) => {
      return acc + Number(curr)
    }, 0) / arr.length).toFixed(decPlaces)
}

const months = 'January, February, March, April, May, June, July, August, September, October, November, December'.split(', ')

const parseDate = str => {
  const date = new Date(str)
  const month = months[date.getMonth()]
  const day = date.getDate()
  const year = date.getFullYear()
  return `${month} ${day}, ${year}`
}

module.exports = { getAverage, parseDate }