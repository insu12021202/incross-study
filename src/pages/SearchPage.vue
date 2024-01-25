<template>
    <v-container>
        <search-bar />
        <movie-list />
    </v-container>
</template>

<script>
import SearchBar from '@/components/SearchBar';
import MovieList from '@/components/MovieList';
export default { components: { SearchBar, MovieList } };
</script>
