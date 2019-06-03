/* @flow */
import { postGroup, getGroup } from 'services/groupService'

export const SUBMIT_UPDATE_GROUP = 'SUBMIT_UPDATE_GROUP'
export const SUBMIT_LEAVE_GROUP = 'SUBMIT_LEAVE_GROUP'
export const SUBMIT_UPDATE_GROUP_MEMBERS = 'SUBMIT_UPDATE_GROUP_MEMBERS'

const submitJoinGroupAsync = ({ playerGroup }) => {
  return {
    type: SUBMIT_UPDATE_GROUP,
    playerGroup,
  }
}

export const submitJoinGroup = (groupData: Object) => {
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
      dispatch(submitJoinGroupAsync({ playerGroup: groupData.groupCode }))
    }

    return response
  }
}

const submitCreateGroupAsync = ({ playerGroup }) => {
  return {
    type: SUBMIT_UPDATE_GROUP,
    playerGroup,
  }
}

export const submitCreateGroup = (groupData: Object) => {
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
      dispatch(submitCreateGroupAsync({ playerGroup: groupData.groupCode }))
    }

    return response
  }
}

const submitGetGroupAsync = ({ groupMembers }) => {
  return {
    type: SUBMIT_UPDATE_GROUP_MEMBERS,
    groupMembers,
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
      dispatch(submitGetGroupAsync({ groupMembers: response.results }))
    }

    return response
  }
}

const submitLeaveGroupAsync = () => {
  return {
    type: SUBMIT_LEAVE_GROUP,
  }
}

export const submitLeaveGroup = (groupData: Object) => {
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
