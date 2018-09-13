/* @flow */

// import { SUBMIT_UPDATE_GROUP } from 'views/group/groupActions'
// import { SUBMIT_LEAVE_GROUP } from 'views/group/groupActions'

const initialState = {
  playerGroup: '0',
  groupMembers: [],
}

const groupReducer = (state: Object = initialState, action: Function) => {
  switch (action.type) {
    /*
    case SUBMIT_UPDATE_GROUP:
      return { ...state, playerGroup: action.playerGroup }
    */
    /*
    case SUBMIT_LEAVE_GROUP:
      return { ...state, playerGroup: '0', groupMembers: [] }
    */
    default:
      return state
  }
}

export default groupReducer
