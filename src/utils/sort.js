/* @flow */
export const sortArrayByKey = <T: Object>(
  array: Array<T>,
  key1: string,
  key2?: string
): Array<T> => {
  if (!array) return []

  if (key2) {
    return array.sort((a, b) => {
      const keyA = a[key1].toLowerCase() + a[key2].toLowerCase()
      const keyB = b[key1].toLowerCase() + b[key2].toLowerCase()
      if (keyA < keyB) return -1
      if (keyA > keyB) return 1
      return 0
    })
  }

  return array.sort((a, b) => {
    const keyA = a[key1].toLowerCase()
    const keyB = b[key1].toLowerCase()
    if (keyA < keyB) return -1
    if (keyA > keyB) return 1
    return 0
  })
}
