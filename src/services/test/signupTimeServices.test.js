// @flow
import mockAxios from 'axios'
import { postSignupTime } from '../signuptimeServices'

describe('signuptimeServices', () => {
  it('POST signup to server', async () => {
    mockAxios.post.mockImplementation(() => {
      return Promise.resolve({
        status: 200,
        data: 'test response',
      })
    })

    const signupTime = '2019-07-26T13:00:00Z'

    const response = await postSignupTime(signupTime)

    expect(response).toEqual('test response')
    expect(mockAxios.post).toHaveBeenCalledTimes(1)
    expect(mockAxios.post).toHaveBeenCalledWith(`/signuptime`, { signupTime })
  })
})
