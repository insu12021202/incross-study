<template>
    <v-container>
        <search-bar />
        <movie-list />
    </v-container>
</template>

<script>
import SearchBar from '@/components/SearchBar';
import MovieList from '@/components/MovieList';
import store from '@/store';

export default {
    components: { SearchBar, MovieList },
    destroyed() {
        store.commit('movie/initState');
    },
};
</script>
