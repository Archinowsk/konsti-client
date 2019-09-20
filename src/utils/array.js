// @flow

export const moveArrayItem = <T>(
  arr: $ReadOnlyArray<T>,
  from: number,
  to: number
): $ReadOnlyArray<T> => {
  return arr.reduce((prev, current, index, self) => {
    if (from === to) {
      prev.push(current)
    }
    if (index === from) {
      return prev
    }
    if (from < to) {
      prev.push(current)
    }
    if (index === to) {
      prev.push(self[from])
    }
    if (from > to) {
      prev.push(current)
    }
    return prev
  }, [])
}

export const insertByIndex = <T>(
  arr: $ReadOnlyArray<T>,
  newItem: T,
  insertAt: number
): $ReadOnlyArray<T> => [
  ...arr.slice(0, insertAt),
  newItem,
  ...arr.slice(insertAt),
]
