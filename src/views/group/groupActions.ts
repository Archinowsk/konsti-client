import { postGroup, getGroup } from 'services/groupServices';
import { GroupData, GroupMember } from 'typings/group.typings';

export const SUBMIT_UPDATE_GROUP_CODE = 'SUBMIT_UPDATE_GROUP_CODE';
export const SUBMIT_LEAVE_GROUP = 'SUBMIT_LEAVE_GROUP';
export const SUBMIT_UPDATE_GROUP_MEMBERS = 'SUBMIT_UPDATE_GROUP_MEMBERS';

export const submitJoinGroup = (groupData: GroupData): any => {
  return async (dispatch: Function): Promise<unknown> => {
    const joinGroupResponse = await postGroup(groupData);

    if (joinGroupResponse?.status === 'error') {
      return await Promise.reject(joinGroupResponse);
    }

    if (joinGroupResponse?.status === 'success') {
      dispatch(submitGetGroup(joinGroupResponse.groupCode));
      dispatch(submitUpdateGroupCodeAsync(joinGroupResponse.groupCode));
    }

    return joinGroupResponse;
  };
};

export const submitCreateGroup = (groupData: GroupData): any => {
  return async (dispatch: Function): Promise<unknown> => {
    const createGroupResponse = await postGroup(groupData);

    if (createGroupResponse?.status === 'error') {
      return await Promise.reject(createGroupResponse);
    }

    if (createGroupResponse?.status === 'success') {
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
    const getGroupResponse = await getGroup(groupCode);

    if (getGroupResponse?.status === 'error') {
      return await Promise.reject(getGroupResponse);
    }

    if (getGroupResponse?.status === 'success') {
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
    const leaveGroupResponse = await postGroup(groupData);

    if (leaveGroupResponse?.status === 'error') {
      return await Promise.reject(leaveGroupResponse);
    }

    if (leaveGroupResponse?.status === 'success') {
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
