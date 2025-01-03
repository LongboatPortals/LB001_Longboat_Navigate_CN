<template>
    <div>
        <h1>PC Lab</h1>
        <p>PC Lab is a web application that allows you to create and manage your own personal computer lab.</p>
        <a class="ux-btn ux-btn--primary" @click="showMessage">Exhibit 1</a>
        <a class="ux-btn ux-btn--primary" @click="showMessage">Exhibit 2</a>
    </div>
</template>
<script>
export default {
    name: 'PCLab',
    data() {
        return {
            message: 'Welcome to PC Lab!'
        }
    },
    methods: {
        showMessage() {
            alert(this.message);
        }
    }
}
</script>
<style lang="scss" scoped>

</style>