// @flow
import mockAxios from 'axios'
import { getGames } from '../gamesServices'

it('Get games from server', async () => {
  mockAxios.get.mockImplementation(() =>
    Promise.resolve({
      status: 200,
      data: 'test game',
    })
  )

  const games = await getGames()

  expect(games).toEqual('test game')
  expect(mockAxios.get).toHaveBeenCalledTimes(1)
  expect(mockAxios.get).toHaveBeenCalledWith(`/games`)
})
