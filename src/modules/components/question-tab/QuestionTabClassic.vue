<template>
<div class="question-tab-classic" :class="{'question-tab-classic--active': isActive}">
    <!-- <div class="question-tab-classic__indicator"></div> -->
    <div class="question-tab-classic__textarea">
        <!-- @slot Use this slot to provide the question -->
        <slot name="left"></slot>

        <!-- @slot Use this slot to provide select options for the question -->
        <slot name="right"></slot>
    </div>
    <hr class="question-tab-classic__hr" />
</div>
</template>

<script setup>

/**
 * Props for Question Tab component
 */
defineProps({
    /**
     * Determines if the tab is active
     */
    isActive: {
        type: Boolean,
        required: false,
        default: false
    }
});
</script>

<style lang="scss">
$survey-question-divider-color: #005172 !default;

.question-tab-classic {

    &__hr {
        margin: 24px 0;
        border-color: $survey-question-divider-color;
        border-width: 0.5px;
    }

    &:last-child:before {
        height: 40px;
    }

    &__textarea {
        display: flex;

        @media only screen and (max-width: 1023px) {
            // padding: 16px;
        }
    }

    &:last-child .question-tab-classic__textarea {
        margin-bottom: 0;
    }

}
</style>
