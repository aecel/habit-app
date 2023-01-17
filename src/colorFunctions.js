import ShadeGenerator from "shade-generator"

const rgbaStringToArray = (rgba) => {
  const rgbaArray = rgba
    .substring(5, rgba.length - 1)
    .replace(/ /g, "")
    .split(",")

  return rgbaArray
}

const luminance = (rgbaString) => {
  const rgbArray = rgbaStringToArray(rgbaString)
  const r = rgbArray[0]
  const g = rgbArray[1]
  const b = rgbArray[2]
  var a = [r, g, b].map((v) => {
    v /= 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  })
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
}

const contrast = (rgb1, rgb2) => {
  var lum1 = luminance(rgb1)
  var lum2 = luminance(rgb2)
  var brightest = Math.max(lum1, lum2)
  var darkest = Math.min(lum1, lum2)
  return (brightest + 0.05) / (darkest + 0.05)
}

const componentToHex = (c) => {
  var hex = c.toString(16)
  return hex.length === 1 ? "0" + hex : hex
}

const rgbToHex = (r, g, b) => {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b)
}

const hexToRgb = (hex) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

const getShadesArray = (hex) => {
  const colorMap = ShadeGenerator.hue(hex).shadesMap("rgba")
  const arrayMap = Object.entries(colorMap)
  let i = 0
  let fewColorsArray = []

  // colorsArray has 19 shades
  // fewColorsArray whittles it down to 7 shades, these colors have higher contrast difference levels
  const colorsArray = arrayMap.map((value) => {
    if (i % 3 === 0) {
      fewColorsArray.push(value[1])
    }
    i++

    return value[1]
  })

  // rgbArray changes format from rgba to rgb
  const rgbArray = fewColorsArray.map((color) => {
    const rgbOnly = color.substring(0, color.length - 4) + ")"
    return rgbOnly
  })
  //   console.log(contrast(rgbArray[0], rgbArray[1]))

  // finalArray gets rid of the first and last colors
  // they are too close to white and black
  // finalArray has 5 shades
  let finalArray = rgbArray.slice(1, rgbArray.length - 1)
  // finalArray.reverse()
  return finalArray
}

const getGoldColorArray = () => {
  return getShadesArray("#FFD700")
}

const getGreenColorArray = () => {
  return getShadesArray("#06EB2C")
}

export {
  contrast,
  rgbToHex,
  hexToRgb,
  getShadesArray,
  getGoldColorArray,
  getGreenColorArray,
}
