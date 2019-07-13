/* @flow */
import { postGroup, getGroup } from 'services/groupService'
import type { GroupData, GroupMember } from 'flow/group.flow'

export const SUBMIT_UPDATE_GROUP_CODE = 'SUBMIT_UPDATE_GROUP_CODE'
export const SUBMIT_LEAVE_GROUP = 'SUBMIT_LEAVE_GROUP'
export const SUBMIT_UPDATE_GROUP_MEMBERS = 'SUBMIT_UPDATE_GROUP_MEMBERS'

export const submitJoinGroup = (groupData: GroupData): Object => {
  return async (dispatch: Function): Promise<any> => {
    let joinGroupResponse = null
    try {
      joinGroupResponse = await postGroup(groupData)
    } catch (error) {
      console.log(`postGroup error:`, error)
    }

    if (joinGroupResponse && joinGroupResponse.error) {
      return Promise.reject(joinGroupResponse)
    }
    if (joinGroupResponse && joinGroupResponse.status === 'success') {
      dispatch(submitGetGroup(joinGroupResponse.groupCode))
      dispatch(submitUpdateGroupCodeAsync(joinGroupResponse.groupCode))
    }

    return joinGroupResponse
  }
}

export const submitCreateGroup = (groupData: GroupData): Object => {
  return async (dispatch: Function): Promise<any> => {
    let createGroupResponse = null
    try {
      createGroupResponse = await postGroup(groupData)
    } catch (error) {
      console.log(`postGroup error:`, error)
    }

    if (createGroupResponse && createGroupResponse.error) {
      return Promise.reject(createGroupResponse)
    }
    if (createGroupResponse && createGroupResponse.status === 'success') {
      dispatch(submitGetGroup(createGroupResponse.groupCode))
      dispatch(submitUpdateGroupCodeAsync(createGroupResponse.groupCode))
    }

    return createGroupResponse
  }
}

const submitUpdateGroupCodeAsync = (groupCode: string): Object => {
  return {
    type: SUBMIT_UPDATE_GROUP_CODE,
    groupCode,
  }
}

export const submitGetGroup = (groupCode: string): Object => {
  return async (dispatch: Function): Promise<any> => {
    let getGroupResponse = null
    try {
      getGroupResponse = await getGroup(groupCode)
    } catch (error) {
      console.log(`postGroup error:`, error)
    }

    if (getGroupResponse && getGroupResponse.error) {
      return Promise.reject(getGroupResponse)
    }
    if (getGroupResponse && getGroupResponse.status === 'success') {
      dispatch(submitGetGroupAsync(getGroupResponse.results))
    }

    return getGroupResponse
  }
}

const submitGetGroupAsync = (
  groupMembers: $ReadOnlyArray<GroupMember>
): Object => {
  return {
    type: SUBMIT_UPDATE_GROUP_MEMBERS,
    groupMembers,
  }
}

export const submitLeaveGroup = (groupData: GroupData): Object => {
  return async (dispatch: Function): Promise<any> => {
    let leaveGroupResponse = null
    try {
      leaveGroupResponse = await postGroup(groupData)
    } catch (error) {
      console.log(`postGroup error:`, error)
    }

    if (leaveGroupResponse && leaveGroupResponse.error) {
      return Promise.reject(leaveGroupResponse)
    }
    if (leaveGroupResponse && leaveGroupResponse.status === 'success') {
      dispatch(submitLeaveGroupAsync(leaveGroupResponse.groupCode))
    }

    return leaveGroupResponse
  }
}

const submitLeaveGroupAsync = (groupCode: string): Object => {
  return {
    type: SUBMIT_LEAVE_GROUP,
    groupCode,
  }
}
