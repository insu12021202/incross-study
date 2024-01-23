<template>
    <v-row>
        <v-col cols="9">
            <!-- Text Input -->
            <v-text-field v-model="title" outlined clearable @keypress.enter="searchMovies">
                <template v-slot:prepend-inner>
                    <v-icon>search</v-icon>
                </template>
                <template v-slot:append>
                    <!-- Loading Component -->
                    <v-progress-circular v-if="loading" size="24" color="primary" indeterminate></v-progress-circular>
                </template> </v-text-field
        ></v-col>
        <v-col cols="3">
            <!-- Filter Input -->
            <v-select label="types" :items="filterTypes" v-model="type" @change="searchMovies"></v-select
        ></v-col>
    </v-row>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    data() {
        return {
            filterTypes: ['All', 'Movie', 'Series', 'Episode'],
        };
    },
    computed: {
        title: {
            get() {
                return this.$store.state.movie.title;
            },
            set(title) {
                this.$store.commit('movie/updateState', { title });
            },
        },
        type: {
            get() {
                return this.$store.state.movie.type;
            },
            set(type) {
                this.$store.commit('movie/updateState', { type });
            },
        },
        loading() {
            return this.$store.state.movie.loading;
        },
    },
    methods: {
        ...mapActions('movie', ['searchMovies']),
    },
};
</script>
<style scoped></style>
