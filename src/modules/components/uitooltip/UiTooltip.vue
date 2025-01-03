<template>
<div class="ui-tooltip">
    <slot name="component"></slot>
    <span v-if="isVisible" class="ui-tooltiptext"><slot name="alert-text"></slot></span>
</div>
</template>

<script setup>

defineProps({
    isVisible: {
        type: Boolean,
        required: false,
        default: false,
    }
});
</script>

<style lang="scss">
.ui-tooltip {
    position: relative;
    display: inline-block;
}

.ui-tooltip .ui-tooltiptext {
   // visibility: hidden;
    width: 120px;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    bottom: 150%;
    left: 50%;
    margin-left: -60px;
}

.ui-tooltip .ui-tooltiptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: black transparent transparent transparent;
}

/*
.ui-tooltip:hover .ui-tooltiptext {
    visibility: visible;
}
*/
</style>
