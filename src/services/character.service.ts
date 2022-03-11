import axios, { AxiosResponse } from 'axios';
import { ICharacter } from '../types/character';

const serviceInstance = axios.create({
  baseURL: 'https://rickandmortyapi.com/api/character/',
  headers: { Accept: 'application/json' },
  timeout: 10000,
});

export default {
  getProjects(): Promise<AxiosResponse<ICharacter[]>> {
    return serviceInstance.get('');
  },
  getProject(_id: string): Promise<AxiosResponse<ICharacter>> {
    return serviceInstance.get(`${_id}`);
  },
};
