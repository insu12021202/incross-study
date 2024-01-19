<template>
    <div>
        <v-row v-masonry item-selector=".item">
            <v-col v-for="(movie, idx) in movies" :key="idx" v-masonry-tile class="item" cols="12" lg="3" md="3" sm="6">
                <v-card>
                    <v-img :src="poster(movie.Poster)" :alt="movie.Title" :height="height(movie.Poster)">
                        <template v-slot:placeholder>
                            <div class="no_img"></div>
                        </template>
                    </v-img>
                    <v-card-title>{{ movie.Title }}</v-card-title>
                    <v-card-subtitle>{{ movie.Type }} ({{ movie.Year }})</v-card-subtitle>
                </v-card>
            </v-col>
        </v-row>
        <div class="footer-wrapper">
            <v-progress-circular v-if="loading" size="24" color="primary" indeterminate></v-progress-circular>
            <div class="no-result" v-if="noResults">검색 결과가 없습니다.</div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
export default {
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    computed: {
        ...mapState('movie', ['movies', 'loading', 'noResults', 'page']),
        ...mapGetters('movie', ['isLastPage']),
    },
    methods: {
        ...mapActions('movie', ['fetchMovies']),
        poster(url) {
            return url === 'N/A' ? '' : url;
        },
        height(url) {
            return url === 'N/A' ? 100 : 300;
        },
        handleScroll() {
            let bottomOfWindow =
                document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
            if (bottomOfWindow && !this.isLastPage) {
                this.fetchMovies();
            }
        },
    },
};
</script>

<style scoped>
.no_img {
    height: 100%;
    background-color: lightgray;
}
.footer-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100px;
}
</style>
