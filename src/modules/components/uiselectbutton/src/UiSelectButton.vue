<template>
  <!--
      triggered when button is selected
      @event choiceChange
    -->
  <label class="radio-wrapper">
      <input class="radio__input" type="radio" :id="label" :name="groupName" :value="value" :data-english-value="englishValue" :data-choice-id="choiceId" @change="$emit('choiceChange', {value, englishValue})" >
      <!-- @slot Use this slot to provide content of the button -->
      <span class="radio__label" :for="label" role="radio" aria-checked="mixed"  tabindex="0" aria-label="radio button for selecting options">
          <slot></slot>
      </span>
  </label>
  </template>
  
  <script setup>

/**
 * Props for Select/Choice Button
 */
defineProps({
  /** 
   * Value of the option 
   */
  value: {
    type: String,
    required: true
  },

  /** 
   * English value (tooltip or alternative text) 
   */
  englishValue: {
    type: String,
    required: true
  },

  /** 
   * ID of the choice, e.g., 1 (Strongly Agree), 2 (Disagree), 3 (Neither Agree nor Disagree), 4 (Agree), 5 (Strongly Agree)
   */
  choiceId: {
    type: Number,
    required: true
  },

  /** 
   * Label for the button 
   */
  label: {
    type: String,
    required: true
  },

  /** 
   * Group name to associate radio buttons 
   */
  groupName: {
    type: String,
    required: true
  }
});

defineEmits(['choiceChange']);
</script>
  
  <style lang="scss">
  $ux-selectBtn-bg-color-default: none !default;
  $ux-selectBtn-bg-color-onActive: #d3effa !default;
  $ux-selectBtn-bg-color-onHover: #d3effa !default;
  $ux-selectBtn-text-color-default: #4e5157 !default;
  $ux-selectBtn-text-color-onActive: #4e5157 !default;
  $ux-selectBtn-text-color-onHover: #4e5157 !default;
  $ux-selectBtnRadio-border-radius: 7px !default;
  $ux-selectBtnRadio-border-color: #dedede !default;
  $ux-selectBtnRadio-checked-bg-color: #165172 !default;


  .radio-wrapper {
      background-color: var(  --ux-selectBtn-bg-color-default,  $ux-selectBtn-bg-color-default);
      padding: 4px 4px;
      display: inherit;
      cursor: pointer;
  
      &--active{
          background-color: var(  --ux-selectBtn-bg-color-onActive,  $ux-selectBtn-bg-color-onActive);
      }
  
      &:hover {
          background-color: var(  --ux-selectBtn-bg-color-onHover,  $ux-selectBtn-bg-color-onHover);
      }

      .radio__input {
        -ms-transform: scale(1.2);
        /* IE 9 */
        -webkit-transform: scale(1.2);
        /* Chrome, Safari, Opera */
        transform: scale(1.2);
        box-shadow: none !important;
    
        display: flex;
        align-items: center;
        justify-content: center;
    
        &:after {
            background-color: white;
        }
    
        &:checked:after {
            width: 7px;
            height: 7px;
            border-radius: var(  --ux-selectBtnRadio-border-radius,  $ux-selectBtnRadio-border-radius);
            border: 1px solid var(  --ux-selectBtnRadio-border-color,  $ux-selectBtnRadio-border-color);
            background-color: var(   --ux-selectBtnRadio-checked-bg-color,   $ux-selectBtnRadio-checked-bg-color);
            content: '';
            display: inline-block;
            visibility: visible;
        }
    }
    
    .radio__label {
        margin-left: 12px;
        cursor: pointer;
    }
      
  }
  

  </style>
  
  

<style lang="scss">
$ux-select-border-color: #dedede !default;
$ux-select-border-radius: 5px !default;
$ux-select-bg-color: white !default;
$ux-select-text-color: black !default;
$ux-select-padding: 0.7em 3.5em 0.7em 1em !default;
$ux-select-caret-color: black !default;

.ux-select {
  border: 1px solid var(--ux-select-border-color, $ux-select-border-color);
  border-radius: var(--ux-select-border-radius, $ux-select-border-radius);
  background: var(--ux-select-bg-color, $ux-select-bg-color);
  color: var(--ux-select-text-color, $ux-select-text-color);
  padding: var(--ux-select-padding, $ux-select-padding);
  appearance: none;
  background-image: linear-gradient(
      45deg,
      transparent 50%,
      var(--ux-select-caret-color, $ux-select-caret-color) 50%
    ),
    linear-gradient(
      135deg,
      var(--ux-select-caret-color, $ux-select-caret-color) 50%,
      transparent 50%
    );
  background-position: calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px), calc(100% - 2.5em) 0.5em;
  background-size: 5px 5px, 5px 5px, 1px 1.5em;
  background-repeat: no-repeat;

  /* IE11 hide hacks*/
  &::-ms-expand {
    display: none;
  }
}
</style>
