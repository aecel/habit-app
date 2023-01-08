const getArrayTotal = (array) => {
  return array.reduce((total, currentValue) => total + currentValue, 0)
}

export default getArrayTotal