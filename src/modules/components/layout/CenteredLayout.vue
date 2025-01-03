<template>
    <div class="centered-layout">
        <!-- @slot @slot Use this slot to provide content of the layout -->
        <slot></slot>
    </div>
</template>

<script setup>
</script>

<style lang="scss">
.centered-layout{
    display: flex;
    justify-content: center;
}
</style>