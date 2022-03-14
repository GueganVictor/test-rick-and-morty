import { APIParams } from '../types/interfaces';
import axios, { AxiosResponse } from 'axios';
import { ICharacter } from '../types/character';

const serviceInstance = axios.create({
  baseURL: 'https://rickandmortyapi.com/api/character/',
  headers: { Accept: 'application/json' },
  timeout: 10000,
});

export default {
  /**
   * Retrieves characters from API
   * @param params Query parameters
   * @returns Promise containing the list of all characters and data information
   */
  getCharacters(params: APIParams): Promise<AxiosResponse<ICharacter[]>> {
    return serviceInstance.get('', { params });
  },
  /**
   * Retrieves character by id from API
   * @param _id id of desired character
   * @returns Promise containing the character
   */
  getCharacter(_id: number): Promise<AxiosResponse<ICharacter>> {
    return serviceInstance.get(`${_id}`);
  },
};
