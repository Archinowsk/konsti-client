/* @flow */
import type { LocalStorageState } from 'flow/redux.flow'

export const loadSession = () => {
  try {
    const serializedState = localStorage.getItem('state')
    if (
      serializedState === null ||
      serializedState === '' ||
      typeof serializedState !== 'string'
    ) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (error) {
    console.error(error)
    return undefined
  }
}

export const saveSession = (state: LocalStorageState) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (error) {
    console.error(error)
  }
}

export const clearSession = () => {
  try {
    localStorage.setItem('state', '')
  } catch (error) {
    console.error(error)
  }
}
