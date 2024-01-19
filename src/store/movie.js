import axios from 'axios';

export default {
    namespaced: true,
    state: () => ({
        title: '',
        type: 'movie',
        loading: false,
        movies: [],
        noResults: null,
    }),
    getters: {},
    mutations: {
        updateState(state, payload) {
            Object.keys(payload).forEach((key) => {
                state[key] = payload[key];
            });
        },
        pushIntoMovies(state, newMovies) {
            state.movies.push(...newMovies);
        },
    },
    actions: {
        async fetchMovies({ state, commit }, page) {
            try {
                const res = await axios.get(
                    `http://www.omdbapi.com/?i=tt3896198&apikey=95aa07e&s=${state.title}&type=${state.type}&page=${page}`
                );
                if (res.data.Response === 'True') {
                    commit('updateState', { noResults: false });
                    commit('pushIntoMovies', res.data.Search);
                    return res.data;
                } else {
                    commit('updateState', { noResults: true });
                    return;
                }
            } catch (err) {
                return err;
            } finally {
                commit('updateState', { loading: false });
            }
        },
        async searchMovies({ commit, dispatch }) {
            commit('updateState', { movies: [], loading: true });
            const data = await dispatch('fetchMovies', 1);
            if (data) {
                const lastPage = Math.ceil(parseInt(data.totalResults) / 10);
                // 최대 40개까지 fetch
                for (let i = 2; i < lastPage; i++) {
                    if (i > 4) break;
                    else {
                        await dispatch('fetchMovies', i);
                    }
                }
            }
        },
    },
};
