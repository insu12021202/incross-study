<template>
    <div class="header-wrapper">
        <div class="logo"><span class="material-symbols-outlined movie-icon"> movie </span>MOVIE</div>
        <div class="menu-wrapper">
            <router-link to="/"> Home </router-link>
            <router-link to="/search"> Search </router-link>
        </div>
    </div>
</template>

<script>
import { RouterLink } from 'vue-router';
export default {
    components: {
        RouterLink,
    },
};
</script>

<style scoped>
.header-wrapper {
    height: 70px;
    border-bottom: 2px solid rgb(228, 228, 228);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    padding: 20px;
}
.logo {
    font-weight: 600;
    font-size: 30px;
    margin-right: 30px;
    display: flex;
    align-items: center;
    gap: 5px;
}
.logo .movie-icon {
    font-size: 30px;
}
.header-wrapper .menu-wrapper {
    display: flex;
    gap: 30px;
}
.header-wrapper .menu-wrapper a {
    height: 100%;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: black;
    font-weight: 600;
    font-size: 18px;
}
</style>
