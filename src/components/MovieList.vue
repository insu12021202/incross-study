<template>
    <div>
        <!-- 검색 결과 개수 -->
        <p class="result_number"><b>Result:</b> {{ totalResults }}</p>
        <!-- 검색 결과 Grid  -->
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
        <!-- 검색 결과 footer -->
        <div class="footer-wrapper">
            <!-- 검색 결과 없음 알림 문구 -->
            <div class="no-result" v-if="noResults">검색 결과가 존재하지 않습니다.</div>
            <!-- 로딩 컴포넌트 -->
            <v-progress-circular v-if="loading" size="24" color="primary" indeterminate></v-progress-circular>
        </div>
        <!-- to-top 버튼 -->
        <v-icon size="50" v-show="isToTopVisible" @click="scrollToTop" class="to-top">expand_less</v-icon>
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
    data() {
        return {
            isToTopVisible: false,
        };
    },
    computed: {
        ...mapState('movie', ['movies', 'loading', 'noResults', 'page', 'totalResults']),
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
            this.isToTopVisible = window.scrollY > 200;

            let bottomOfWindow =
                document.documentElement.scrollTop + window.innerHeight >= document.documentElement.offsetHeight;

            if (bottomOfWindow && !this.isLastPage) {
                this.fetchMovies();
            }
        },
        scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
    },
};
</script>

<style scoped>
.no_img {
    height: 100%;
    background-color: lightgray;
}
.result_number {
    margin-bottom: 10px;
    text-align: right;
}
.footer-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100px;
}
.to-top {
    width: 50px;
    height: 50px;
    background-color: white;
    border-radius: 50%;
    position: fixed;
    bottom: 20px;
    right: 20px;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
}
</style>
