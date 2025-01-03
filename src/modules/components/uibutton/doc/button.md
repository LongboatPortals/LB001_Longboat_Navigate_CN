<script setup>
import '~/tokens/variables.css';
import Button from '~/uibutton/src/UiButton.vue';

const buttonPlaygroundCode = '<Button  class="ux-btn ux-btn--primary">Click me</Button>';
</script>

# Button component

## Description

Button component

## Props

<Props :of="Button"></Props>

## Example

<Playground 
  :code="buttonPlaygroundCode"
  :components="{ Button }">
</Playground>
