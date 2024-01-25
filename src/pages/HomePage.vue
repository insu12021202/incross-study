<template>
    <div class="home-wrapper">
        <span class="material-symbols-outlined movie-icon"> movie </span>
        <span class="title">Movie Search Service</span>
        <button class="get-started-btn" @click="onMoveSearch">
            Get Started <span class="material-symbols-outlined arrow-icon"> arrow_right_alt </span>
        </button>
    </div>
</template>

<script>
import router from '@/router';

export default {
    methods: {
        onMoveSearch() {
            router.push('/search');
        },
    },
};
</script>

<style scoped>
.home-wrapper {
    height: calc(100vh - 94px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.home-wrapper .title {
    font-weight: 600;
    font-size: 18px;
    margin-top: -30px;
}
.home-wrapper .movie-icon {
    font-size: 300px;
}
.arrow-icon {
    color: #476582;
    font-size: 16px;
}
.get-started-btn {
    display: flex;
    align-items: center;
    gap: 5px;
    background-color: #f1f1f1;
    color: #476582;
    padding: 7px 12px;
    border-radius: 10px;
    margin-top: 10px;
}
.get-started-btn:hover {
    background-color: #e0e0e0;
}
</style>
