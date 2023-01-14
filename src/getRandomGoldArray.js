import ShadeGenerator from "shade-generator"

const getRandomGoldArray = () => {
  const colorMap = ShadeGenerator.hue("#ffd700").shadesMap("hex")
  const colorArray = Object.entries(colorMap).map((value) => {
    return value[1]
  })
  return colorArray
}

export default getRandomGoldArray
