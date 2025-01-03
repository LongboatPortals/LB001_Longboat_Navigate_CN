<template>
  <select class="ux-select" @change="emitOptionChangeEvent($event)">
    <slot name="before" />
    <option
      :selected="isSelected(option.value, selectedOption)"
      :value="option.value"
      v-for="option in options"
      :key="option.value"
    >
      {{ option.text }}
    </option>
    <!-- @slot Use this slot to manually add the <option> tag -->
    <slot />
  </select>
</template>

<script setup>

/**
 * The list/select box component
 */
const props = defineProps({
  /**
   * Specifies the list of options to be displayed in the list/selection box
   */
  options: {
    type: Array,
    required: false,
  },

  /**
   * Specifies which one of the options in the list is in view or selected
   */
  selectedOption: {
    type: String,
    default: 'en',
    required: false,
  },
});

const emit = defineEmits(['optionChange']);

const isSelected = (localeValue) => {
  return localeValue === props.selectedOption;
};

const emitOptionChangeEvent = (event) => {
  emit('optionChange', event.target.value);
};
</script>

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
