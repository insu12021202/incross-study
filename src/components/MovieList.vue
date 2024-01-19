<template>
    <v-row v-masonry item-selector=".item">
        <v-col v-for="(movie, idx) in movies" :key="idx" v-masonry-tile class="item" cols="12" lg="3" md="3" sm="6">
            <v-card>
                <v-img :src="poster(movie.Poster)" :alt="movie.Title" :height="height(movie.Poster)">
                    <template v-slot:placeholder>
                        <div class="no_img"></div>
                    </template>
                </v-img>
                <v-card-title>{{ movie.Title }}</v-card-title>
                <v-card-subtitle>{{ movie.Year }}</v-card-subtitle>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    computed: {
        movies() {
            return this.$store.state.movie.movies;
        },
    },
    methods: {
        poster(url) {
            return url === 'N/A' ? '' : url;
        },
        height(url) {
            return url === 'N/A' ? 100 : 300;
        },
    },
};
</script>

<style scoped>
.no_img {
    height: 100%;
    background-color: lightgray;
}
</style>
