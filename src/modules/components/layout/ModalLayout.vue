<template>
<div class="ui-modal">

    <!-- @slot Use this slot to provide content -->
    <slot></slot>

</div>
</template>

<script setup></script>

<style lang="scss">
.ui-modal {
    position: fixed;
    z-index: 99999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
   // overflow: auto;
    background-color: rgba(0, 0, 0, 0.35);
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
