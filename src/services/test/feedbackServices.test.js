// @flow
import mockAxios from 'axios'
import { postFeedback } from '../feedbackServices'

describe('feedbackServices', () => {
  it('POST feedback to server', async () => {
    mockAxios.post.mockImplementation(() => {
      return Promise.resolve({
        status: 200,
        data: 'test response',
      })
    })

    const feedbackData = {
      feedback: 'test feedback',
      gameId: '123',
    }

    const response = await postFeedback(feedbackData)

    expect(response).toEqual('test response')
    expect(mockAxios.post).toHaveBeenCalledTimes(1)
    expect(mockAxios.post).toHaveBeenCalledWith(`/feedback`, { feedbackData })
  })
})
