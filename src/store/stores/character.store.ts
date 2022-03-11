import characterService from '../../services/character.service';
import { Commit, State, StoreMutation } from '../../types/interfaces';

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
  getCharacters(state: State, { results, info }: StoreMutation) {
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
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
  modules: {},
};
