import Button from '~/uibutton/src/UiButton.vue';
import '~/tokens/variables.css';
import '~/tokens/color-light.css';

export const atext = () => ({
  components: { Button },
  template: `<Button type='a' href='/today' class='ux-btn ux-btn--primary'>Atext</Button>`,
});

export const text = () => ({
  components: { Button },
  template: `<Button class='ux-btn'>Text</Button>`,
});

export const text_disabled = () => ({
  components: { Button },
  template: `<Button class='ux-btn' disabled>Text</Button>`,
});

export const outline = () => ({
  components: { Button },
  template: `<Button class='ux-btn ux-btn--outline'>Outline</Button>`,
});

export const outline_disabled = () => ({
  components: { Button },
  template: `<Button class='ux-btn ux-btn--outline' disabled>Outline</Button>`,
});

export const primary = () => ({
  components: { Button },
  template: `<Button class='ux-btn ux-btn--primary'>Primary</Button>`,
});

export const primary_disabled = () => ({
  components: { Button },
  template: `<Button class='ux-btn ux-btn--primary' disabled>Primary</Button>`,
});

// Sizes
export const primary_tiny = () => ({
  components: { Button },
  template: `<Button class='ux-btn ux-btn--primary ux-btn--tiny'>Primary</Button>`,
});

export const primary_small = () => ({
  components: { Button },
  template: `<Button class='ux-btn ux-btn--primary ux-btn--small'>Primary</Button>`,
});

export const primary_medium = () => ({
  components: { Button },
  template: `<Button class='ux-btn ux-btn--primary ux-btn--medium'>Primary</Button>`,
});

export const primary_large = () => ({
  components: { Button },
  template: `<Button class='ux-btn ux-btn--primary ux-btn--large'>Primary</Button>`,
});

export const primary_x_large = () => ({
  components: { Button },
  template: `<Button class='ux-btn ux-btn--primary ux-btn--x-large'>Primary</Button>`,
});

export const secondary = () => ({
  components: { Button },
  template: `<Button class='ux-btn ux-btn--secondary'>Secondary</Button>`,
});

export const secondary_disabled = () => ({
  components: { Button },
  template: `<Button class='ux-btn ux-btn--secondary' disabled>Secondary</Button>`,
});

export const tertiary = () => ({
  components: { Button },
  template: `<Button class='ux-btn ux-btn--tertiary'>Tertiary</Button>`,
});

export const tertiary_disabled = () => ({
  components: { Button },
  template: `<Button class='ux-btn ux-btn--tertiary' disabled>Tertiary</Button>`,
});
