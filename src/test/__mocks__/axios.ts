const mockAxios = jest.genMockFromModule('axios');

// @ts-ignore
mockAxios.create = jest.fn(() => mockAxios);

/* eslint-disable-next-line import/no-unused-modules */
export default mockAxios;
