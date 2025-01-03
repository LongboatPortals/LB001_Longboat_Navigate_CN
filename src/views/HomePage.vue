<template>
    <home></home>
</template>

<script>

//import Home from '@/apps/es/views/Home.vue';
import {appType} from '@/config.js';
import { defineAsyncComponent } from 'vue'
export default {
    components: {
        Home: defineAsyncComponent(() => import(`@/apps/${appType}/views/HomePage.vue`))
    },
};
</script>

<style lang="scss">

</style>
