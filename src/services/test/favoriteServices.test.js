// @flow
import mockAxios from 'axios';
import { postFavorite } from '../favoriteServices';

describe('favoriteServices', () => {
  it('POST favorited games to server', async () => {
    mockAxios.post.mockImplementation(() => {
      return Promise.resolve({
        status: 200,
        data: 'test response',
      });
    });

    const favoriteData = {
      username: 'test username',
      favoritedGames: [],
    };

    const response = await postFavorite(favoriteData);

    expect(response).toEqual('test response');
    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(mockAxios.post).toHaveBeenCalledWith(`/favorite`, { favoriteData });
  });
});
