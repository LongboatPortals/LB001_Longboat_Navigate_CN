<script setup>
import WistiaVideo from '~/wistiavideo/src/WistiaVideo.vue';
</script>

# WistiaVideo component

## Description

Wistia Video component

## Props

<Props :of="WistiaVideo"></Props>

## Example

```html
<WistiaVideo :videoID="swtft1u3p5">
  <template #icon>
    <Icon icon="fa-solid:play-circle" iconSize="50px" />
  </template>
  <template #info>
    <h3>Video title</h3>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </p>
  </template>
</WistiaVideo>
```
