// @flow
import mockAxios from 'axios'
import { postSignup } from '../signupServices'

describe('signupServices', () => {
  it('POST signup to server', async () => {
    mockAxios.post.mockImplementation(() => {
      return Promise.resolve({
        status: 200,
        data: 'test response',
      })
    })

    const signupData = {
      username: 'test username',
      selectedGames: [],
      signupTime: '2019-07-26T13:00:00Z',
    }

    const response = await postSignup(signupData)

    expect(response).toEqual('test response')
    expect(mockAxios.post).toHaveBeenCalledTimes(1)
    expect(mockAxios.post).toHaveBeenCalledWith(`/signup`, { signupData })
  })
})
