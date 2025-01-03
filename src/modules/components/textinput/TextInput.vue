<template>
<div class="input-wrapper">
    <label class="ui-input__label" :for="name">
        <!-- @slot Use this slot to provide label of input -->
        <slot name="label"></slot>
    </label>
    <input class="ui-input" aria-label="Text box field"  :type="inputType" :id="name" :name="name" v-bind:value="value" v-on:input="$emit('inputEvent', $event.target.value)" @keyup="$emit('keyupEvent', $event)" :placeholder="placeholder">
    <!--<input class="ui-input" :type="inputType" :id="name" :name="name"  :value="inputValue" @input="$emit('input', $event.target.value)" @keyup="$emit('keyupEvent', $event)" :placeholder="placeholder">-->
    <div role="alert" class="input-alert-error">
        
        <!-- @slot Use this slot to provide error message  -->
        <slot name="error-msg"></slot>
    </div>
</div>
</template>

<script setup>

/**
 * Props for Text Input component
 */
defineProps({
    /**
     * Bound value for the input
     */
    value: {
        type: String,
        required: false,
    },

    /** 
     * Validator function for input
     */
    validator: {
        type: Function,
        required: false
    },

    /** 
     * Placeholder text for the input field
     */
    placeholder: {
        type: String,
        required: true
    },

    /** 
     * Name attribute for the input field
     */
    name: {
        type: String,
        required: false
    },

    /** 
     * Type of the input (default is "text")
     */
    inputType: {
        type: String,
        default: "text",
        required: false,
    }
});

defineEmits(['inputEvent', 'keyupEvent']);
</script>

<style lang="scss">
.input-wrapper{
 text-align: left;
}
.ui-input {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;

    background: #fcfcfc;
    border: 1px solid #BABABA;
    box-sizing: border-box;
    border-radius: 4px;

    &:focus{
        outline: none;
       // background: #F8F8F8;
        border: 1px solid #007EA3;
        box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.15);
    }

    &__label{
        color:#007EA3;
    }
}

.input-alert-error {
    color: #B91C1C;
    font-style: italic;
    letter-spacing: 0.5px;
}

.input-error-icon{
 margin-right: 8px;
}
</style>

<!--
<docs lang="md">
Use this to display a text input

## Examples

```jsx
<text-input placeholder='Joe' name='firstname'>
    <template slot='label'>Your name</template>
    <template slot='error-msg'>Please provide a valid name</template>
</text-input>
```

</docs>
-->