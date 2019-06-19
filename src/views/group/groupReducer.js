/* @flow */
import {
  SUBMIT_UPDATE_GROUP,
  SUBMIT_UPDATE_GROUP_MEMBERS,
  SUBMIT_LEAVE_GROUP,
} from 'views/group/groupActions'
import type { GroupState } from 'flow/redux.flow'

const initialState = {
  playerGroup: '0',
  groupMembers: [],
}

export const groupReducer = (
  state: GroupState = initialState,
  action: Function
) => {
  switch (action.type) {
    case SUBMIT_UPDATE_GROUP:
      return {
        ...state,
        playerGroup: action.playerGroup,
      }
    case SUBMIT_UPDATE_GROUP_MEMBERS:
      return {
        ...state,
        groupMembers: action.groupMembers,
      }
    case SUBMIT_LEAVE_GROUP:
      return { ...state, playerGroup: '0', groupMembers: [] }
    default:
      return state
  }
}
