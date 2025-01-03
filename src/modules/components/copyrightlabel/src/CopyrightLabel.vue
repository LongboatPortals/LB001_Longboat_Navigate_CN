<template>
  <span class="ux-copyright-label">
    {{ copyrightText }}
    <slot />
  </span>
</template>

<script setup>
import { computed } from 'vue';
import { ref } from 'vue';

const currentYear = ref(new Date().getFullYear());

const copyrightText = computed(() => {
  return `Copyright © ${currentYear.value} Advarra, Inc. |`;
});
</script>

<style lang="scss">
$ux-copyright-label-text-color:  #0f76ab!default;

.ux-copyright-label {
  color: var(--ux-copyright-label-text-color, $ux-copyright-label-text-color);
  margin: 0;
  padding: 0;
}
</style>
