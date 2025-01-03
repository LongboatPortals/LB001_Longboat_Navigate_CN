<template>
<div class="ui-alert">

    <div class="ui-alert__content">
        <header class="ui-alert__header">
            <!-- @slot Use this slot to provide title in header -->
            <!--
                triggered on click
                @event closeAlertEvent
            -->
            <span class="ui-alert__close-btn" @click="$emit('closeAlertEvent')">&times;</span>
            <!--
            <span class="ui-alert__status-icon-wrapper">
                <img class="ui-alert__status-icon" :src="alertIcon" />
            </span>
            -->
        </header>

        <div class="ui-alert__body">
            <div class="ui-alert__title"><slot name="title"></slot></div>
            <!-- @slot Use this slot to provide content of modal-->
            <slot name="body"></slot>
        </div>

    </div>

</div>
</template>

<script setup>

/**
 * Props for Alert Layout
 */
defineProps({
    /**
     * Icon URL to be displayed in the alert
     */
    alertIcon: {
        type: String,
        required: false
    }
});

defineEmits(['closeAlertEvent']);
</script>

<style lang="scss">
@import "@/assets/styles/colors.scss";
.ui-alert {

    &__header {
        position: relative;
        background: #4e5157;
        padding: 40px;
        color: white;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
    }

     &__title {
        font-size: 30px;
        margin: 0;
        margin-top: 12px;
        margin-bottom: 12px;
        text-align: center;
        color: $primary-color;
    }

    &__status-icon-wrapper{
        width: 80px;
        height: 80px;
        background-color: $primary-color;
        position: absolute;
        left: 50%;
        margin-left: -40px;
        bottom: -40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
    }

    &__content {
        background-color: #fefefe;
        max-width: 700px;
        margin: 15% auto;
        // padding: 20px;
        width: 80%;
        border-radius: 8px;
    }

    &__close-btn {
        position: absolute;
        top: 0;
        right: 8px;
        color: white;
        font-size: 28px;
        font-weight: bold;
        padding: 8px 16px;

        &:hover,
        &focus {
            color: black;
            text-decoration: none;
            cursor: pointer;
        }
    }

    &__body {
        text-align: center;
        padding: 16px;
        margin-top: 0;
        max-width: 600px;
        margin: auto;
        font-size: 18px;
        letter-spacing: 0.5px;
        font-weight: 400;
        margin-top: 0;
        margin-bottom: 21px;
        line-height: 1.5;

        @media screen and (min-width: 767px) {
            padding: 24px 32px;
        }
    }
}
</style>
