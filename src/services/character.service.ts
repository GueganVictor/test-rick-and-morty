import { APIParams } from './../types/interfaces';
import axios, { AxiosResponse } from 'axios';
import { ICharacter } from '../types/character';

const serviceInstance = axios.create({
  baseURL: 'https://rickandmortyapi.com/api/character/',
  headers: { Accept: 'application/json' },
  timeout: 10000,
});

export default {
  getProjects(params: APIParams): Promise<AxiosResponse<ICharacter[]>> {
    return serviceInstance.get('', { params });
  },
  getProject(_id: string): Promise<AxiosResponse<ICharacter>> {
    return serviceInstance.get(`${_id}`);
  },
};
