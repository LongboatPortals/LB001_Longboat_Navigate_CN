<template>
  <a
    class="ux-copyright-link" target="_blank" aria-label="Opens new page for privacy policy"
    :href="'https://app.longboat.com/gateway/privacy?locale=' + props.locale"
  >
    <!-- @slot Use this slot to provide content of the link-->
    <slot></slot>
  </a>
</template>

<script setup>

/**
 * Displays privacy policy link for Longboat Apps
 */
const props = defineProps({
  /**
   * Locale for this privacy policy link
   */
  locale: {
    type: String,
    required: false,
    default: 'en',
  },
});
</script>

<style lang="scss">
$ux-privacy-policy-link-text-color-default: #0f76ab !default;
$ux-privacy-policy-link-text-color-visited: #0f76ab !default;
$ux-privacy-policy-link-text-color-onhover: #333 !default;
$ux-privacy-policy-link-text-color-onactive: #333 !default;
$ux-privacy-policy-link-text-color-onfocus: #333 !default;

.ux-copyright-link {
  text-decoration: none;
  color: var(
    --ux-privacy-policy-link-text-color-default,
    $ux-privacy-policy-link-text-color-default
  );

  &:visited {
    color: var(
      --ux-privacy-policy-link-text-color-visited,
      $ux-privacy-policy-link-text-color-visited
    );
  }

  &:focus {
    color: var(
      --ux-privacy-policy-link-text-color-onhover,
      $ux-privacy-policy-link-text-color-onhover
    );
  }

  &:active {
    color: var(
      --ux-privacy-policy-link-text-color-onactive,
      $ux-privacy-policy-link-text-color-onactive
    );
  }
  &:hover {
    color: var(
      --ux-privacy-policy-link-text-color-onfocus,
      $ux-privacy-policy-link-text-color-onfocus
    );
  }

  &:active,
  &:hover,
  &:focus,
  &:visited {
    text-decoration: none;
  }

  &:hover {
    text-decoration: underline;
  }
}
</style>
