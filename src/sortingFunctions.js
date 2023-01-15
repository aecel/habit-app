const ascendingSort = (a, b) => {
  return a - b
}

const descendingSort = (a, b) => {
  return b - a
}

const sortAscending = (array) => {
  return array.sort(ascendingSort)
}

const sortDescending = (array) => {
  return array.sort(descendingSort)
}

const sortAscendingByProp = (array, prop) => {
  return array.sort((a, b) => {
    return a[prop] - b[prop]
  })
}

const sortDescendingByProp = (array, prop) => {
  return array.sort((a, b) => {
    return b[prop] - a[prop]
  })
}

export {
  sortAscending,
  sortDescending,
  sortAscendingByProp,
  sortDescendingByProp,
}
