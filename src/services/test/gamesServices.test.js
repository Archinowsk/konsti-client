// @flow
import mockAxios from 'axios';
import { getGames, postGamesUpdate } from '../gamesServices';

describe('gamesServices', () => {
  it('GET games from server', async () => {
    mockAxios.get.mockImplementation(() =>
      Promise.resolve({
        status: 200,
        data: 'test response',
      })
    );

    const response = await getGames();

    expect(response).toEqual('test response');
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(`/games`);
  });

  it('POST games update to server', async () => {
    mockAxios.post.mockImplementation(() => {
      return Promise.resolve({
        status: 200,
        data: 'test response',
      });
    });

    const response = await postGamesUpdate();

    expect(response).toEqual('test response');
    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(mockAxios.post).toHaveBeenCalledWith(`/games`);
  });
});
