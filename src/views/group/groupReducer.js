/* @flow */

// import { SUBMIT_UPDATE_GROUP } from 'views/group/groupActions'

const initialState = {
  playerGroup: '',
}

const groupReducer = (state: Object = initialState, action: Function) => {
  switch (action.type) {
    /*
    case SUBMIT_UPDATE_GROUP:
      return { ...state, playerGroup: action.playerGroup }
    */
    default:
      return state
  }
}

export default groupReducer
