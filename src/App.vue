<template>
    <v-app>
        <header-component />
        <v-container>
            <router-view> </router-view>
        </v-container>
    </v-app>
</template>

<script>
import { RouterView } from 'vue-router';
import HeaderComponent from './components/HeaderComponent.vue';
export default {
    components: {
        RouterView,
        HeaderComponent,
    },
    data() {
        return {};
    },
    methods: {},
};
</script>
