<template>
    <v-app>
        <div>헤더</div>
        <RouterView> </RouterView>
    </v-app>
</template>

<script>
import { RouterView } from 'vue-router';
export default {
    components: {
        RouterView,
    },
    data() {
        return {};
    },
    methods: {},
};
</script>
