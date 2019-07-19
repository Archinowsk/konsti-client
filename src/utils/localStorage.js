/* @flow */
import type { LocalStorageState } from 'flow/redux.flow'

export const loadSession = (): Object | void => {
  try {
    const serializedState = localStorage.getItem('state')
    if (
      (serializedState !== null || serializedState !== '') &&
      typeof serializedState === 'string'
    ) {
      return JSON.parse(serializedState)
    }
  } catch (error) {
    console.error(error)
  }
}

export const saveSession = (state: LocalStorageState): void => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (error) {
    console.error(error)
  }
}

export const clearSession = (): void => {
  try {
    localStorage.removeItem('state')
  } catch (error) {
    console.error(error)
  }
}
