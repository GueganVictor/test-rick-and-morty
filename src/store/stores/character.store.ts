import characterService from '../../services/character.service';
import { Commit, State, StoreMutation } from '../../types/interfaces';

const state: State = {
  characters: [],
  loading: false,
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
  fetchCharacters({ commit }: Commit, filter: any) {
    commit('initCharacterRequest');
    characterService
      .getProjects(filter)
      .then((response) => {
        commit('getCharacters', response.data);
      })
      .catch((error) => {
        commit('getCharactersError', error);
      });
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
