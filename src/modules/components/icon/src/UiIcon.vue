<template>
  <i
    class="ux-icon"
    :style="`--icon: url('https://api.iconify.design/${props.icon}.svg'); width:${props.iconSize}; height:${iconSize}`"
  role="none"></i>
</template>

<script setup>

/**
 * A simple component to display icons from https://iconify.design/
 */
const props = defineProps({
  /**
   * Icon string
   * @example logos:vue
   * @example logos:vitejs
   */
  icon: {
    type: String,
    required: true,
  },

  /**
   * Icon size
   */
  iconSize: {
    type: String,
    required: false,
    default: '2rem',
  },
});
</script>

<style lang="scss">
$ux-icon-size: (
  width: 2rem,
  height: 2rem,
) !default;
$ux-icon-color: black !default;

.ux-icon {
  display: inline-block;
  width: map-get($ux-icon-size, width);
  height: map-get($ux-icon-size, height);
  // min-width: 100%;
  // min-height: 100%;
  background: $ux-icon-color;
  mask: var(--icon) center / contain no-repeat;
  -webkit-mask: var(--icon) center / contain no-repeat;
}
</style>
