/* @flow */
export const sortArrayByKey = <T: Object>(
  array: Array<T>,
  key1: string,
  key2?: string
): Array<T> => {
  if (!array || !key1) return []

  if (key1.includes('.')) {
    return sortArrayByNestedKey(array, key1)
  }

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

export const sortArrayByNestedKey = <T: Object>(
  array: Array<T>,
  key1: string
): Array<T> => {
  if (!array || !key1) return []

  const splitKey = key1.split('.')
  const firstKey = splitKey[0]
  const secondKey = splitKey[1]

  return array.sort((a, b) => {
    const keyA = a[firstKey][secondKey].toLowerCase()
    const keyB = b[firstKey][secondKey].toLowerCase()
    if (keyA < keyB) return -1
    if (keyA > keyB) return 1
    return 0
  })
}
