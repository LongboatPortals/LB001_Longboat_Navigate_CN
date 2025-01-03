<template>
    <div>
        <h2 class="ui-head">
            <slot name="head"></slot>
        </h2>
        <p class="ui-subhead" :class="subHeadAlign">
            <slot name="subhead"></slot>
        </p>
    </div>
</template>

<script setup>

defineProps({
    subHeadAlign: {
        type: String,
        default: ""
    }
});
</script>

<style lang="scss">
.ui-head {
    margin: 16px 0;
    padding: 0; 
    font-size: 1.5rem;
    // text-align: center;
}

.ui-subhead {
    margin: 8px auto 32px auto;
    padding: 0;
    max-width: 650px;
    text-align: left;
    @media screen and (min-width: 767px) {
        text-align: center;
        &.__left{
            text-align: left;
        }
    }
}
</style>
