<script setup>
import Icon from '~/icon/src/Icon.vue';

const iconPlaygroundCode = '<Icon icon="logos:vue"></Icon>';
const handleError = (e) => console.error(e);

</script>

# Icon component

## Description

<Description :of="Icon"></Description>

## Props

<Props :of="Icon"></Props>

## Example

<Playground 
  :code="iconPlaygroundCode"
  :components="{ Icon }">
</Playground>
