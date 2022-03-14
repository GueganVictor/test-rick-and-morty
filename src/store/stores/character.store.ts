import { ICharacter } from './../../types/character';
import characterService from '../../services/character.service';
import { CharactersQueryResult, Commit, State } from '../../types/interfaces';

const state: State = {
  characters: [],
  loading: false,
  info: {},
  error: null,
};

const mutations = {
  initCharacterRequest(state: State) {
    state.loading = true;
    state.error = false;
  },
  getCharacters(state: State, { results, info }: CharactersQueryResult) {
    state.characters = [...results];
    state.info = info;
    state.loading = false;
    state.error = false;
  },
  getCharactersError(state: State, error: unknown) {
    state.characters = [];
    state.loading = false;
    state.error = error;
  },
  getCharacter(state: State, char: ICharacter) {
    const charIndex = state.characters.findIndex((x) => char.id);
    if (charIndex === -1) state.characters.push(char);
    else state.characters[charIndex] = char;
    state.loading = false;
    state.error = false;
  },
  getCharacterError(state: State, error: unknown) {
    state.characters = [];
    state.loading = false;
    state.error = error;
  },
};

const actions = {
  async fetchCharacters({ commit }: Commit, filter: any) {
    commit('initCharacterRequest');
    try {
      const characters = await characterService.getProjects(filter);
      commit('getCharacters', characters.data);
    } catch (error) {
      commit('getCharactersError', error);
    }
  },
  async fetchCharacterById({ commit }: Commit, data: { id: number }) {
    commit('initCharacterRequest');
    try {
      const char = await characterService.getProject(data.id);
      commit('getCharacter', char.data);
    } catch (error) {
      commit('getCharacterError', error);
    }
  },
};

const getters = {
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
