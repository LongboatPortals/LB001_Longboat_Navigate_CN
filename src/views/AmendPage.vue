<template>
    <amend></amend>
</template>

<script>
import {appType} from '@/config.js';
import { defineAsyncComponent } from 'vue'
export default {
    components: {
        Amend: defineAsyncComponent(() => import(`@/apps/${appType}/views/AmendPage.vue`))
    },
};
</script>

<style lang="scss">

</style>
