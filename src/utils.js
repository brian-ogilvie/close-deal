const getAverage = (arr, decPlaces) => {
  return (arr.reduce((acc, curr) => {
      return acc + Number(curr)
    }, 0) / arr.length).toFixed(decPlaces)
}

module.exports = { getAverage }