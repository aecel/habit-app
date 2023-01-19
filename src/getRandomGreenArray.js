const getRandomGreen = () => {
  const min = 50
  const max = 250
  const green = Math.floor(Math.random() * (max - min + 1)) + min
  //   return "rgb(0,250,0)"
  return green
}

// returns an array like this:
// ["rgb(0,green1,0)","rgb(0,green2,0)"...]
// where the previous green and the current green has at least a difference of 50
// for better contrast
const getRandomGreenArray = (length) => {
  const green1 = getRandomGreen()
  let greenArray = [`rgb(0,${green1},0`]
  let prevGreen = green1
  for (let i = 1; i < length; i++) {
    let currGreen = getRandomGreen()
    let diffGreen = Math.abs(prevGreen - currGreen)

    let count = 0
    while (diffGreen < 50 && count <= 100) {
      currGreen = getRandomGreen()
      diffGreen = Math.abs(prevGreen - currGreen)
      count++
    }

    greenArray.push(`rgb(0,${currGreen},0`)
    prevGreen = currGreen
  }

  return greenArray
}

export default getRandomGreenArray
