export const sortArrayByKey = (games, key1, key2) => {
  if (!games) return

  if (key2) {
    return games.sort((a, b) => {
      const keyA = a[key1].toLowerCase() + a[key2].toLowerCase()
      const keyB = b[key1].toLowerCase() + b[key2].toLowerCase()
      if (keyA < keyB) return -1
      if (keyA > keyB) return 1
      return 0
    })
  }

  return games.sort((a, b) => {
    const keyA = a[key1].toLowerCase()
    const keyB = b[key1].toLowerCase()
    if (keyA < keyB) return -1
    if (keyA > keyB) return 1
    return 0
  })
}
