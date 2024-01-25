import axios from 'axios';

export default {
    namespaced: true,
    state: () => ({
        title: '',
        type: 'All',
        loading: false,
        movies: [],
        page: 1,
        totalResults: 0,
        lastPage: null,
        noResults: null,
    }),
    getters: {
        isLastPage(state) {
            return state.page >= state.lastPage;
        },
        typeValue(state) {
            switch (state.type) {
                case 'All':
                    return '';
                case 'Movie':
                    return 'movie';
                case 'Series':
                    return 'series';
                case 'Episode':
                    return 'episode';
            }
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
        initState(state) {
            state.title = '';
            state.movies = [];
            state.type = 'All';
            state.loading = false;
            state.page = 1;
            state.totalResults = 0;
            state.lastPage = null;
            state.noResults = null;
        },
    },
    actions: {
        async fetchMovies({ state, commit, getters }) {
            commit('updateState', { loading: true });
            try {
                const res = await axios.get(
                    `https://www.omdbapi.com/?i=tt3896198&apikey=95aa07e&s=${state.title}&type=${getters.typeValue}&page=${state.page}`
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
                const totalResults = data.totalResults;
                commit('updateState', { lastPage, totalResults });
            } else {
                commit('updateState', { totalResults: 0 });
            }
        },
    },
};
