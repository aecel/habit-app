const getRandomGreen = () => {
  const min = 50
  const max = 250
  const green = Math.floor(Math.random() * (max - min + 1)) + min
  //   return "rgb(0,250,0)"
  return `rgb(0,${green},0)`
}

export default getRandomGreen
