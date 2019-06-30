/* @flow */
import { postGroup, getGroup } from 'services/groupService'
import type { GroupData, GroupMember } from 'flow/group.flow'

export const SUBMIT_UPDATE_GROUP = 'SUBMIT_UPDATE_GROUP'
export const SUBMIT_LEAVE_GROUP = 'SUBMIT_LEAVE_GROUP'
export const SUBMIT_UPDATE_GROUP_MEMBERS = 'SUBMIT_UPDATE_GROUP_MEMBERS'

export const submitJoinGroup = (groupData: GroupData) => {
  return async (dispatch: Function) => {
    let response = null
    try {
      response = await postGroup(groupData)
    } catch (error) {
      console.log(`postGroup error:`, error)
    }

    if (response && response.error) {
      return Promise.reject(response)
    }
    if (response && response.status === 'success') {
      dispatch(submitGetGroup(groupData.groupCode))
      dispatch(submitUpdateGroupAsync(groupData.groupCode))
    }

    return response
  }
}

export const submitCreateGroup = (groupData: GroupData) => {
  return async (dispatch: Function) => {
    let response = null
    try {
      response = await postGroup(groupData)
    } catch (error) {
      console.log(`postGroup error:`, error)
    }

    if (response && response.error) {
      return Promise.reject(response)
    }
    if (response && response.status === 'success') {
      dispatch(submitGetGroup(groupData.groupCode))
      dispatch(submitUpdateGroupAsync(groupData.groupCode))
    }

    return response
  }
}

const submitUpdateGroupAsync = (groupCode: string) => {
  return {
    type: SUBMIT_UPDATE_GROUP,
    playerGroup: groupCode,
  }
}

export const submitGetGroup = (groupCode: string) => {
  return async (dispatch: Function) => {
    let response = null
    try {
      response = await getGroup(groupCode)
    } catch (error) {
      console.log(`postGroup error:`, error)
    }

    if (response && response.error) {
      return Promise.reject(response)
    }
    if (response && response.status === 'success') {
      dispatch(submitGetGroupAsync(response.results))
    }

    return response
  }
}

const submitGetGroupAsync = (groupMembers: $ReadOnlyArray<GroupMember>) => {
  return {
    type: SUBMIT_UPDATE_GROUP_MEMBERS,
    groupMembers,
  }
}

export const submitLeaveGroup = (groupData: GroupData) => {
  return async (dispatch: Function) => {
    let response = null
    try {
      response = await postGroup(groupData)
    } catch (error) {
      console.log(`postGroup error:`, error)
    }

    if (response && response.error) {
      return Promise.reject(response)
    }
    if (response && response.status === 'success') {
      dispatch(submitLeaveGroupAsync())
    }

    return response
  }
}

const submitLeaveGroupAsync = () => {
  return {
    type: SUBMIT_LEAVE_GROUP,
  }
}
