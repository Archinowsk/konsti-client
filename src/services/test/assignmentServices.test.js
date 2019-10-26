// @flow
import mockAxios from 'axios'
import { postPlayerAssignment } from '../assignmentServices'

describe('playersServices', () => {
  it('POST player assignment to server', async () => {
    mockAxios.post.mockImplementation(() => {
      return Promise.resolve({
        status: 200,
        data: 'test response',
      })
    })

    const signupTime = '2019-07-26T13:00:00Z'

    const response = await postPlayerAssignment(signupTime)

    expect(response).toEqual('test response')
    expect(mockAxios.post).toHaveBeenCalledTimes(1)
    expect(mockAxios.post).toHaveBeenCalledWith(`/assignment`, {
      startingTime: signupTime,
    })
  })
})
