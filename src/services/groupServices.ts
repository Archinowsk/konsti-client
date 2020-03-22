import { api } from 'utils/api';
import { GroupData } from 'typings/group.typings';

export const postGroup = async (groupData: GroupData): Promise<void> => {
  let response;
  try {
    response = await api.post('/group', { groupData });
  } catch (error) {
    if (error.message === 'Network Error') {
      console.log('Network error: no connection to server');
    } else {
      console.log(`postGroup error:`, error);
    }
  }

  if ((response && response.status !== 200) || (response && !response.data)) {
    console.log('Response status !== 200, reject');
    return await Promise.reject(response);
  }

  if (response) {
    return response.data;
  }
};

export const getGroup = async (groupCode: string): Promise<void> => {
  let response;
  try {
    // response = await api.get('/group', { groupData })
    response = await api.get('/group', {
      params: {
        groupCode,
      },
    });
  } catch (error) {
    if (error.message === 'Network Error') {
      console.log('Network error: no connection to server');
    } else {
      console.log(`getGroup error:`, error);
    }
  }

  if ((response && response.status !== 200) || (response && !response.data)) {
    console.log('Response status !== 200, reject');
    return await Promise.reject(response);
  }

  if (response) {
    return response.data;
  }
};
