import axios from 'axios';

export default {
    namespaced: true,
    state: () => ({
        title: '',
        type: 'movie',
        loading: false,
        movies: [],
        page: 1,
        lastPage: null,
        noResults: null,
    }),
    getters: {
        isLastPage(state) {
            return state.page >= state.lastPage;
        },
    },
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
        async fetchMovies({ state, commit }) {
            commit('updateState', { loading: true });
            try {
                const res = await axios.get(
                    `http://www.omdbapi.com/?i=tt3896198&apikey=95aa07e&s=${state.title}&type=${state.type}&page=${state.page}`
                );
                if (res.data.Search) {
                    commit('updateState', { noResults: false, page: state.page + 1 });
                    commit('pushIntoMovies', res.data.Search);
                    return res.data;
                } else {
                    commit('updateState', { noResults: true });
                    return;
                }
            } catch (err) {
                console.log(err);
            } finally {
                commit('updateState', { loading: false });
            }
        },
        async searchMovies({ state, commit, dispatch }) {
            commit('updateState', { movies: [], page: 1, loading: true });
            const data = await dispatch('fetchMovies', state.page);
            if (data) {
                const lastPage = Math.ceil(parseInt(data.totalResults) / 10);
                commit('updateState', { lastPage });
            }
        },
    },
};
