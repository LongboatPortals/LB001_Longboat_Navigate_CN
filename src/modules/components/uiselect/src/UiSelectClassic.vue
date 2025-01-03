<template>
<div class="dropdown">
    <!-- @slot Use this slot to provide label for dropdown -->
    <label class="dropdown__label" :for='labelFor'>
        <slot name="label"></slot>
    </label>
    <select :id='labelFor' :aria-label='ariaLabel' :name="selectName" class="dropdown__select"  v-bind:value="value" v-on:change="$emit('change', $event)" >
        <option value> <slot name="select-text">-- Select --</slot></option>
        <option :value="option.id" v-for="option in options" :key="option.name">
            {{ option.name }}
        </option>
    </select>
    <div role="alert" class="dropdown-alert-error">
        <!-- @slot Use this slot to provide error message  -->
        <slot name="error-msg"></slot>
    </div>
</div>
</template>

<script setup>

/**
 * Props for Dropdown Component
 */
defineProps({
    /** 
     * Bound value for the select element
     */
    value: {
        type: String,
        required: false,
    },

    /** 
     * Accessible label for the dropdown
     */
    ariaLabel: {
        type: String,
        required: true
    },

    /** 
     * Label `for` attribute, tied to the select element
     */
    labelFor: {
        type: String,
        required: true
    },

    /** 
     * Array of options for the dropdown
     */
    options: {
        type: Array,
        required: true
    },

    /** 
     * Name attribute for the select element
     */
    selectName: {
        type: String,
        required: false,
    }
});

defineEmits(['change']);
</script>


<style lang="scss">
.dropdown {

    &__label {
        display: block;
        margin-bottom: 8px;
        color: #007EA3;
    }

    &__select {
        border: 1px solid #dedede;
        border-radius: 5px;
        background: #fcfcfc;
        margin: 8px 0;
        padding: 10px 3.5em 10px 1em;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background-image: linear-gradient(45deg, transparent 50%, #909090 50%),
            linear-gradient(135deg, #8f8f8f 50%, transparent 50%);
        background-position: calc(100% - 20px) calc(1em + 2px),
            calc(100% - 15px) calc(1em + 2px), calc(100% - 2.5em) 0.5em;
        background-size: 5px 5px, 5px 5px, 1px 1.5em;
        background-repeat: no-repeat;
        width: 100%;
        border: 1px solid #BABABA;

        /* IE11 hide hacks*/
        &::-ms-expand {
            display: none;
        }
    }

    &-alert-error {
        color: #B91C1C;
        font-style: italic;
        letter-spacing: 0.5px;
    }

    &-error-icon {
        margin-right: 8px;
    }

}
</style>

<!--
<docs lang="md">
Note that this component emits the 'change' event and the 'HTMLSelectElement' object is returned after that event

</docs>
-->