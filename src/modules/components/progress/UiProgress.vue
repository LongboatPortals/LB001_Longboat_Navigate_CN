<template>
<div class="ui-progress">
    <div class="ui-progress__indicator" :style="{width:progressWidth + '%'}"></div>
</div>
</template>

<script setup>

/**
 * Props for Progress component
 */
defineProps({
    /**
     * Width of the progress indicator in percentage
     */
    progressWidth: {
        type: Number,
        required: false,
        default: 50
    },
    
    value: {
        type: Boolean,
        required: false
    }
});
</script>

<style lang="scss">
$progress-bg-color: #49BBEB !default;
$progress-border-color: #92d400 !default;
$progress-indicator-bg-color: #92d400 !default;
$progress-border-radius: 16px !default;


.ui-progress {
    background-color: $progress-bg-color;
    border-radius: $progress-border-radius;
    border: 1px solid $progress-border-color;
    

    &__indicator {
        height: 8px;
        border-radius: $progress-border-radius;
    }

    &__indicator {
        background-color: $progress-indicator-bg-color;
        transition: all 0.8s;
        //width: 50%;
    }

}
</style>
