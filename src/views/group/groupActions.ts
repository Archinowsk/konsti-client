import { postGroup, getGroup } from 'services/groupServices';
import { GroupData, GroupMember } from 'typings/group.typings';

export const SUBMIT_UPDATE_GROUP_CODE = 'SUBMIT_UPDATE_GROUP_CODE';
export const SUBMIT_LEAVE_GROUP = 'SUBMIT_LEAVE_GROUP';
export const SUBMIT_UPDATE_GROUP_MEMBERS = 'SUBMIT_UPDATE_GROUP_MEMBERS';

export const submitJoinGroup = (groupData: GroupData): any => {
  return async (dispatch: Function): Promise<unknown> => {
    let joinGroupResponse;
    try {
      joinGroupResponse = await postGroup(groupData);
    } catch (error) {
      console.log(`postGroup error:`, error);
    }

    if (joinGroupResponse?.error) {
      return await Promise.reject(joinGroupResponse);
    }
    if (joinGroupResponse && joinGroupResponse.status === 'success') {
      dispatch(submitGetGroup(joinGroupResponse.groupCode));
      dispatch(submitUpdateGroupCodeAsync(joinGroupResponse.groupCode));
    }

    return joinGroupResponse;
  };
};

export const submitCreateGroup = (groupData: GroupData): any => {
  return async (dispatch: Function): Promise<unknown> => {
    let createGroupResponse;
    try {
      createGroupResponse = await postGroup(groupData);
    } catch (error) {
      console.log(`postGroup error:`, error);
    }

    if (createGroupResponse?.error) {
      return await Promise.reject(createGroupResponse);
    }
    if (createGroupResponse && createGroupResponse.status === 'success') {
      dispatch(submitGetGroup(createGroupResponse.groupCode));
      dispatch(submitUpdateGroupCodeAsync(createGroupResponse.groupCode));
    }

    return createGroupResponse;
  };
};

const submitUpdateGroupCodeAsync = (groupCode: string): any => {
  return {
    type: SUBMIT_UPDATE_GROUP_CODE,
    groupCode,
  };
};

export const submitGetGroup = (groupCode: string): any => {
  return async (dispatch: Function): Promise<unknown> => {
    let getGroupResponse;
    try {
      getGroupResponse = await getGroup(groupCode);
    } catch (error) {
      console.log(`postGroup error:`, error);
    }

    if (getGroupResponse?.error) {
      return await Promise.reject(getGroupResponse);
    }
    if (getGroupResponse && getGroupResponse.status === 'success') {
      dispatch(submitGetGroupAsync(getGroupResponse.results));
    }

    return getGroupResponse;
  };
};

const submitGetGroupAsync = (groupMembers: readonly GroupMember[]): any => {
  return {
    type: SUBMIT_UPDATE_GROUP_MEMBERS,
    groupMembers,
  };
};

export const submitLeaveGroup = (groupData: GroupData): any => {
  return async (dispatch: Function): Promise<unknown> => {
    let leaveGroupResponse;
    try {
      leaveGroupResponse = await postGroup(groupData);
    } catch (error) {
      console.log(`postGroup error:`, error);
    }

    if (leaveGroupResponse?.error) {
      return await Promise.reject(leaveGroupResponse);
    }
    if (leaveGroupResponse && leaveGroupResponse.status === 'success') {
      dispatch(submitLeaveGroupAsync(leaveGroupResponse.groupCode));
    }

    return leaveGroupResponse;
  };
};

const submitLeaveGroupAsync = (groupCode: string): any => {
  return {
    type: SUBMIT_LEAVE_GROUP,
    groupCode,
  };
};
