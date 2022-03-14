import { ICharacter } from '../../types/character';
import characterService from '../../services/character.service';
import { CharactersQueryResult, Commit, State } from '../../types/interfaces';

const state: State = {
  characters: [],
  loading: false,
  info: {},
  error: null,
};

const mutations = {
  /**
   * Initialize the loading state and resets errors
   * @param state State of the store
   */
  initCharacterRequest(state: State) {
    state.loading = true;
    state.error = false;
  },
  /**
   * Add requested characters and infos, resets loading and error
   * @param state State of the store
   * @param QueryResult Characters and API infos
   */
  getCharactersSuccess(state: State, { results, info }: CharactersQueryResult) {
    state.characters = [...results];
    state.info = info;
    state.loading = false;
    state.error = false;
  },
  /**
   * When request returns an error sets the state to error
   * and empty character list
   * @param state State of the store
   * @param error Error returned by the API
   */
  getCharactersError(state: State, error: unknown) {
    state.characters = [];
    state.info = {};
    state.loading = false;
    state.error = error;
  },
  /**
   * Add or replace selected character to the character list
   * @param state State of the store
   * @param character Retrieved character
   */
  getCharacterSuccess(state: State, character: ICharacter) {
    const charIndex = state.characters.findIndex((x) => x.id === character.id);
    if (charIndex === -1) state.characters.push(character);
    else state.characters[charIndex] = character;
    state.loading = false;
    state.error = false;
  },
  /**
   * When request returns an error sets the state to error
   * and empty character list
   * @param state State of the store
   * @param error Error returned by the API
   */
  getCharacterError(state: State, error: unknown) {
    state.loading = false;
    state.error = error;
  },
};

const actions = {
  /**
   * Fetch characters data from service and commit to store
   * @param commit Commit store function
   * @param filter Query filter
   */
  async fetchCharacters({ commit }: Commit, filter: any) {
    commit('initCharacterRequest');
    try {
      const characters = await characterService.getCharacters(filter);
      commit('getCharactersSuccess', characters.data);
    } catch (error) {
      commit('getCharactersError', error);
    }
  },
  /**
   * Fetch character data by id from service and commit to store
   * @param commit Commit store function
   * @param data id of the character
   */
  async fetchCharacterById({ commit }: Commit, data: { id: number }) {
    commit('initCharacterRequest');
    try {
      const char = await characterService.getCharacter(data.id);
      commit('getCharacterSuccess', char.data);
    } catch (error) {
      commit('getCharacterError', error);
    }
  },
};

const getters = {
  /**
   * Returns targeted character from store
   * @param state State of the store
   * @returns targeted character
   */
  getStoredCharacterById: (state: State) => (id: number) =>
    state.characters.find((x) => x.id === id),
};

export default {
  state,
  mutations,
  actions,
  getters,
  modules: {},
};
