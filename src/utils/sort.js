export const sortArrayByKey = (games, key) => {
  if (!games) return
  return games.sort((a, b) => {
    const keyA = a[key].toLowerCase()
    const keyB = b[key].toLowerCase()
    if (keyA < keyB) return -1
    if (keyA > keyB) return 1
    return 0
  })
}
