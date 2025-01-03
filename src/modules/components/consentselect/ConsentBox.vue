<template>
    <div>
        <label class="ui-custom-checkbox">
            <slot></slot>
            <input type="checkbox" :checked="value" @change="onConsentBoxChecked($event.target.checked)">
            <span class="checkmark" aria-checked="mixed" role="checkbox" aria-label="Checkbox for ticking the box"></span>
        </label>
        <div role="alert" class="consent-alert-error">
            <slot name="error-msg"></slot>
        </div>
    </div>
</template>

<script setup>

defineProps({
    value: {
        type: Boolean,
        required: false,
    }
});

const emit = defineEmits(['onConsentBoxChecked']);

function onConsentBoxChecked(checked) {
    emit('onConsentBoxChecked', checked);
}
</script>

<style lang="scss">
.ui-custom-checkbox {
    display: block;
    position: relative;
    padding-left: 29px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    max-width: 1000px;
    margin: auto;
    margin-bottom: 16px;
}

.ui-custom-checkbox input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}

.checkmark {
    position: absolute;
    top: 4px;
    left: 0;
    height: 15px;
    width: 15px;
    /*border: 2px solid #72bf90;*/
    border: 1px solid #505050;
    // border-radius: 20px;
}

.ui-custom-checkbox:hover input~.checkmark {
    /*background-color: #efef;*/
    background-color: white;
}

.ui-custom-checkbox input:checked~.checkmark {
    background-color: #39a8e3;
    border: 2px solid #39a8e3;
}

.checkmark:after {
    content: "";
    position: absolute;
    display: none;
}

.ui-custom-checkbox input:checked~.checkmark:after {
    display: block;
}

.ui-custom-checkbox .checkmark:after {
    left: 5px;
    top: 1px;
    width: 2px;
    height: 7px;
    border: solid white;
    border-width: 0px 2px 2px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
}

.consent-alert-error {
    color: #B91C1C;
    font-style: italic;
    letter-spacing: 0.5px;
}

.consent-error-icon {
    margin-right: 8px;
}
</style>
