<template>
    <div class="leftee-layout">
        <!-- @slot @slot Use this slot to provide content of the layout -->
        <slot></slot>
    </div>
</template>

<script setup></script>

<style lang="scss">
.leftee-layout{
    display: flex;
    justify-content: left;
}
</style>