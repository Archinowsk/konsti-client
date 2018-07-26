/* @flow */
import { postGroup } from 'services/groupService'

export const submitJoinGroup = async (groupData: Object) => {
  console.log('submitGroupJoinGroup')
  console.log(groupData)

  let response = null
  try {
    response = await postGroup(groupData)
  } catch (error) {
    console.log(`postGroup error: ${error}`)
  }

  if (response) {
    return response.data
  }

  /*
  return async (dispatch: Function) => {
    let response = null
    try {
      response = await postGroup(groupData)
    } catch (error) {
      console.log(`postGroup error: ${error}`)
    }


    if (response && response.error) {
      return Promise.reject(response)
    }
    if (response && response.status === 'success') {
      dispatch(submitSignupTimeAsync({ signupTime: signupTime }))
    }


    console.log(response)

    return response
  }
  */
}

export const submitAddMember = async (groupData: Object) => {
  console.log('submitAddMember')
  console.log(groupData)

  let response = null
  try {
    response = await postGroup(groupData)
  } catch (error) {
    console.log(`postGroup error: ${error}`)
  }

  if (response) {
    return response.data
  }
}
