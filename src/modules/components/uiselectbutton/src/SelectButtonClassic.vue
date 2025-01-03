<template>
    <span class="ui-selectBtn-classic">
        <!--
    triggered when button is selected
    @event choiceChange
  -->
        <input class="radio__input" type="radio" :id="label" :name="groupName" :value="value"
            :data-english-value="englishValue" @change="$emit('choiceChange', { value, englishValue })">
        <label class="radio__label" :for="label">
            <!-- @slot Use this slot to provide content of the button -->
            <slot></slot>
        </label>
    </span>
</template>

<script setup>

/**
 * @type {Object} Props for Select/Choice Button component
 */
defineProps({
    /** 
     * Value of option
     * @type {string}
     */
    value: {
        type: String,
        required: true
    },

    /** 
     * English value (tooltip or alternative text)
     * @type {string}
     */
    englishValue: {
        type: String,
        required: true
    },

    /** 
     * Label for the button
     * @type {string}
     */
    label: {
        type: String,
        required: true
    },

    /** 
     * Group name to associate radio buttons
     * @type {string}
     */
    groupName: {
        type: String,
        required: true
    }
});

defineEmits(['choiceChange']);
</script>

<style lang="scss">
.ui-selectBtn-classic {
    .radio__input {
        opacity: 0;
        position: fixed;
        width: 0;
    }

    .radio__label {
        display: inline-block;
        background-color: #A8B1BD;
        color: white;
        padding: 0px 12px;
        font-family: sans-serif, Arial;
        font-size: 16px;
        border: 2px solid transparent;
        border-radius: 4px;
        //margin: 0 8px;
        cursor: pointer;
    }

    .radio__input:checked+.radio__label {
        background-color: #39a8e3;
        // border-color: #4c4;
    }

    .radio__input:focus+.radio__label {
        border: 2px dashed #39a8e3;
    }

    .radio__label:hover {
        background-color: #39a8e3;
    }
}
</style>

<!--
<docs lang="md">
Use this to display a choice button

## Examples

```jsx
<select-btn label='bread' groupName='none'></select-btn>
```

</docs>
-->