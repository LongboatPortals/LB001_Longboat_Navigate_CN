<template>
  <a v-if="type == 'a'">
    <slot />
  </a>
  <button v-else :disabled="isDisabled" @click="$emit('click')">
   <!-- <button v-else :disabled="isDisabled" @click="$emit('click',$event)"> -->
    <slot />
  </button>
</template>

<script setup>

/**
 * The button component
 */
defineProps({
  /**
   * Specifies if the button is disabled or not
   * @values true, false
   */
  isDisabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  /**
   * Type of the button
   * Can be 'a' for anchor or 'btn' for button
   */
  type: {
    type: String,
    required: false,
    default: 'btn',
  },
});
</script>

<style lang="scss">
$ux-btn-transition: 0.3s !default;
$ux-btn-border-radius: 5px !default;
$ux-btn-color-primary: #2ed13b !default;
$ux-btn-color-secondary: #fd3b37 !default;
$ux-btn-color-tertiary: #cc17c6 !default;
$ux-btn-color-disabled: #aeb8c0 !default;
$ux-btn-color-white: #fff !default;
$ux-btn-border-width: 1px !default;
$ux-btn-box-shadow: 0px 1px 2px 1px rgba(0, 0, 0, 0.1) !default;
$ux-btn-box-shadow-hover: 0px 2px 3px 2px rgba(0, 0, 0, 0.2) !default;

/**
Button Size
 */
$ux-btn-size-tiny-padding: 4px 16px !default;
$ux-btn-size-small-padding: 6px 20px !default;
$ux-btn-size-medium-padding: 10px 24px !default;
$ux-btn-size-large-padding: 12px 28px !default;
$ux-btn-size-x-large-padding: 14px 32px !default;

$ux-btn-size-tiny-text-size: 0.7rem !default;
$ux-btn-size-small-text-size: 0.9rem !default;
$ux-btn-size-medium-text-size: 1rem !default;
$ux-btn-size-large-text-size: 1.2rem !default;
$ux-btn-size-x-large-text-size: 1.4rem !default;

/**
Button themes/colors/styles
*/
//Default/Text button
$ux-btn-theme-text-default-text-color: $ux-btn-color-primary !default;
$ux-btn-theme-text-disabled-text-color: $ux-btn-color-disabled !default;
$ux-btn-theme-text-onhover-text-color: color.adjust($ux-btn-color-primary, $lightness: -15%) !default;
$ux-btn-theme-text-onfocus-text-color: color.adjust($ux-btn-color-primary, $lightness: -15%) !default;
$ux-btn-theme-text-onactive-text-color: color.adjust($ux-btn-color-primary, $lightness: -15%) !default;

$ux-btn-theme-text-default-border-color: transparent !default;
$ux-btn-theme-text-disabled-border-color: transparent !default;
$ux-btn-theme-text-onhover-border-color: transparent !default;
$ux-btn-theme-text-onfocus-border-color: color.adjust($ux-btn-color-primary, $lightness: -15%) !default;
$ux-btn-theme-text-onactive-border-color: color.adjust($ux-btn-color-primary, $lightness: -15%) !default;

$ux-btn-theme-text-default-bg-color: none !default;
$ux-btn-theme-text-disabled-bg-color: none !default;
$ux-btn-theme-text-onhover-bg-color: none !default;
$ux-btn-theme-text-onfocus-bg-color: none !default;
$ux-btn-theme-text-onactive-bg-color: none !default;

//Outline/Bordered button
$ux-btn-theme-outline-default-text-color: $ux-btn-color-primary !default;
$ux-btn-theme-outline-disabled-text-color: color.adjust(black, $lightness: 70%) !default;
$ux-btn-theme-outline-onhover-text-color: white !default;
$ux-btn-theme-outline-onfocus-text-color: color.adjust($ux-btn-color-primary, $lightness: -20%) !default;
$ux-btn-theme-outline-onactive-text-color: color.adjust($ux-btn-color-primary, $lightness: -20%) !default;

$ux-btn-theme-outline-default-border-color: $ux-btn-color-primary !default;
$ux-btn-theme-outline-disabled-border-color: $ux-btn-color-disabled !default;
$ux-btn-theme-outline-onhover-border-color: transparent !default;
$ux-btn-theme-outline-onfocus-border-color: color.adjust($ux-btn-color-primary, $lightness: -20%) !default;
$ux-btn-theme-outline-onactive-border-color: color.adjust($ux-btn-color-primary, $lightness: -20%) !default;

$ux-btn-theme-outline-default-bg-color: none !default;
$ux-btn-theme-outline-disabled-bg-color: none !default;
$ux-btn-theme-outline-onhover-bg-color: $ux-btn-color-primary !default;
$ux-btn-theme-outline-onfocus-bg-color: $ux-btn-color-primary !default;
$ux-btn-theme-outline-onactive-bg-color: $ux-btn-color-primary !default;

//Primary button
$ux-btn-theme-primary-default-text-color: white !default;
$ux-btn-theme-primary-disabled-text-color: $ux-btn-color-white !default;
$ux-btn-theme-primary-onhover-text-color: white !default;
$ux-btn-theme-primary-onfocus-text-color: white !default;
$ux-btn-theme-primary-onactive-text-color: white !default;

$ux-btn-theme-primary-default-border-color: transparent !default;
$ux-btn-theme-primary-disabled-border-color: transparent !default;
$ux-btn-theme-primary-onhover-border-color: transparent !default;
$ux-btn-theme-primary-onfocus-border-color: transparent !default;
$ux-btn-theme-primary-onactive-border-color: transparent !default;

$ux-btn-theme-primary-default-bg-color: $ux-btn-color-primary !default;
$ux-btn-theme-primary-disabled-bg-color: color.adjust(black, $lightness: 70%) !default;
$ux-btn-theme-primary-onhover-bg-color: color.adjust($ux-btn-color-primary, $lightness: -15%) !default;
$ux-btn-theme-primary-onfocus-bg-color: color.adjust($ux-btn-color-primary, $lightness: -15%) !default;
$ux-btn-theme-primary-onactive-bg-color: color.adjust($ux-btn-color-primary, $lightness: -15%) !default;

//Secondary button
$ux-btn-theme-secondary-default-text-color: white !default;
$ux-btn-theme-secondary-disabled-text-color: $ux-btn-color-white !default;
$ux-btn-theme-secondary-onhover-text-color: white !default;
$ux-btn-theme-secondary-onfocus-text-color: white !default;
$ux-btn-theme-secondary-onactive-text-color: white !default;

$ux-btn-theme-secondary-default-border-color: transparent !default;
$ux-btn-theme-secondary-disabled-border-color: transparent !default;
$ux-btn-theme-secondary-onhover-border-color: transparent !default;
$ux-btn-theme-secondary-onfocus-border-color: transparent !default;
$ux-btn-theme-secondary-onactive-border-color: transparent !default;

$ux-btn-theme-secondary-default-bg-color: $ux-btn-color-secondary !default;
$ux-btn-theme-secondary-disabled-bg-color: color.adjust(black, $lightness: 70%) !default;
$ux-btn-theme-secondary-onhover-bg-color: color.adjust($ux-btn-color-secondary, $lightness: -15%) !default;
$ux-btn-theme-secondary-onfocus-bg-color: color.adjust($ux-btn-color-secondary, $lightness: -15%) !default;
$ux-btn-theme-secondary-onactive-bg-color: color.adjust($ux-btn-color-secondary, $lightness: -15%) !default;

//Tertiary button
$ux-btn-theme-tertiary-default-text-color: white !default;
$ux-btn-theme-tertiary-disabled-text-color: $ux-btn-color-white !default;
$ux-btn-theme-tertiary-onhover-text-color: white !default;
$ux-btn-theme-tertiary-onfocus-text-color: white !default;
$ux-btn-theme-tertiary-onactive-text-color: white !default;

$ux-btn-theme-tertiary-default-border-color: transparent !default;
$ux-btn-theme-tertiary-disabled-border-color: transparent !default;
$ux-btn-theme-tertiary-onhover-border-color: transparent !default;
$ux-btn-theme-tertiary-onfocus-border-color: transparent !default;
$ux-btn-theme-tertiary-onactive-border-color: transparent !default;

$ux-btn-theme-tertiary-default-bg-color: $ux-btn-color-tertiary !default;
$ux-btn-theme-tertiary-disabled-bg-color: color.adjust(black, $lightness: 70%) !default;
$ux-btn-theme-tertiary-onhover-bg-color: color.adjust($ux-btn-color-tertiary, $lightness: -15%) !default;
$ux-btn-theme-tertiary-onfocus-bg-color: color.adjust($ux-btn-color-tertiary, $lightness: -15%) !default;
$ux-btn-theme-tertiary-onactive-bg-color: color.adjust($ux-btn-color-tertiary, $lightness: -15%) !default;

/**
  -----------------------
  BUTTON STYLES
  ----------------------
 */
.ux-btn {
  // Default/Text Button
  color: var(--ux-btn-theme-text-default-text-color,
      $ux-btn-theme-text-default-text-color );
  background: var(--ux-btn--theme-text-onhover-bg-color,
      $ux-btn-theme-text-default-bg-color );
  border: solid var(--ux-btn-border-width, $ux-btn-border-width) var(--ux-btn-theme-text-default-border-color,
      $ux-btn-theme-text-default-border-color );

  padding: var(--ux-btn-size-medium-padding, $ux-btn-size-medium-padding);
  font-size: var(--ux-btn-size-medium-text-size, $ux-btn-size-medium-text-size);
  border-radius: var(--ux-btn-border-radius, $ux-btn-border-radius);
  cursor: pointer;
  transition: all var(--ux-btn-transition, $ux-btn-transition) ease;

  &:disabled {
    color: var(--ux-btn-theme-text-disabled-text-color,
        $ux-btn-theme-text-disabled-text-color );
    border: solid var(--ux-btn-border-width, $ux-btn-border-width) var(--ux-btn-theme-text-disabled-border-color,
        $ux-btn-theme-text-disabled-border-color );
    background: var(--ux-btn-theme-text-disabled-bg-color,
        $ux-btn-theme-text-disabled-bg-color );
    cursor: not-allowed;

    &:hover {
      color: var(--ux-btn-theme-text-disabled-text-color,
          $ux-btn-theme-text-disabled-text-color );
      border: solid var(--ux-btn-border-width, $ux-btn-border-width) var(--ux-btn-theme-text-disabled-border-color,
          $ux-btn-theme-text-disabled-border-color );
      background: var(--ux-btn-theme-text-disabled-bg-color,
          $ux-btn-theme-text-disabled-bg-color );
    }
  }

  &:hover {
    color: var(--ux-btn-theme-text-onhover-text-color,
        $ux-btn-theme-text-onhover-text-color );
    border: solid var(--ux-btn-border-width, $ux-btn-border-width) var(--ux-btn-theme-text-onhover-border-color,
        $ux-btn-theme-text-onhover-border-color );
    background: $ux-btn-theme-text-onhover-bg-color;
  }

  &:active {
    color: var(--ux-btn-theme-text-onactive-text-color,
        $ux-btn-theme-text-onactive-text-color );
    border: solid var(--ux-btn-border-width, $ux-btn-border-width) var(--ux-btn-theme-text-onactive-border-color,
        $ux-btn-theme-text-onactive-border-color );
    background: var(--ux-btn-theme-text-onactive-bg-color,
        $ux-btn-theme-text-onactive-bg-color );
  }

  // Outline/Bordered Button
  &--outline {
    color: var(--ux-btn-theme-outline-default-text-color,
        $ux-btn-theme-outline-default-text-color );
    background: var(--ux-btn-theme-outline-default-bg-color,
        $ux-btn-theme-outline-default-bg-color );
    border: solid var(--ux-btn-border-width, $ux-btn-border-width) var(--ux-btn-theme-outline-default-border-color,
        $ux-btn-theme-outline-default-border-color );
    box-shadow: var(--ux-btn-box-shadow-default, $ux-btn-box-shadow);

    &:disabled {
      color: var(--ux-btn-theme-outline-disabled-text-color,
          $ux-btn-theme-outline-disabled-text-color );
      border: solid var(--ux-btn-border-width, $ux-btn-border-width) var(--ux-btn-theme-outline-disabled-border-color,
          $ux-btn-theme-outline-disabled-border-color );
      background: var(--ux-btn-theme-outline-disabled-bg-color,
          $ux-btn-theme-outline-disabled-bg-color );
      cursor: not-allowed;

      &:hover {
        color: var(--ux-btn-theme-outline-disabled-text-color,
            $ux-btn-theme-outline-disabled-text-color );
        border: solid var(--ux-btn-border-width, $ux-btn-border-width) var(--ux-btn-theme-outline-disabled-border-color,
            $ux-btn-theme-outline-disabled-border-color );
        background: var(--ux-btn-theme-outline-disabled-bg-color,
            $ux-btn-theme-outline-disabled-bg-color );
      }
    }

    &:hover {
      color: var(--ux-btn-theme-outline-onhover-text-color,
          $ux-btn-theme-outline-onhover-text-color );
      border: solid var(--ux-btn-border-width, $ux-btn-border-width) var(--ux-btn-theme-outline-onhover-border-color,
          $ux-btn-theme-outline-onhover-border-color );
      background: var(--ux-btn-theme-outline-onhover-bg-color,
          $ux-btn-theme-outline-onhover-bg-color );
    }

    &:active {
      color: var(--ux-btn-theme-outline-onactive-text-color,
          $ux-btn-theme-outline-onactive-text-color );
      border: solid var(--ux-btn-border-width, $ux-btn-border-width) var(--ux-btn-theme-outline-onactive-border-color,
          $ux-btn-theme-outline-onactive-border-color );
      background: var(--ux-btn-theme-outline-onactive-bg-color,
          $ux-btn-theme-outline-onactive-bg-color );
    }
  }

  // Primary Button
  &--primary {
    color: var(--ux-btn-theme-primary-default-text-color,
        $ux-btn-theme-primary-default-text-color );
    background: var(--ux-btn-theme-primary-default-bg-color,
        $ux-btn-theme-primary-default-bg-color );
    border: solid var(--ux-btn-border-width, $ux-btn-border-width) var(--ux-btn-theme-primary-default-border-color,
        $ux-btn-theme-primary-default-border-color );
    box-shadow: var(--ux-btn-box-shadow-default, $ux-btn-box-shadow);

    &:disabled {
      color: var(--ux-btn-theme-primary-disabled-text-color,
          $ux-btn-theme-primary-disabled-text-color );
      border: solid var(--ux-btn-border-width, $ux-btn-border-width) var(--ux-btn-theme-primary-disabled-border-color,
          $ux-btn-theme-primary-disabled-border-color );
      background: var(--ux-btn-theme-primary-disabled-bg-color,
          $ux-btn-theme-primary-disabled-bg-color );
      cursor: not-allowed;

      &:hover {
        color: var(--ux-btn-theme-primary-disabled-text-color,
            $ux-btn-theme-primary-disabled-text-color );
        border: solid var(--ux-btn-border-width, $ux-btn-border-width) var(--ux-btn-theme-primary-disabled-border-color,
            $ux-btn-theme-primary-disabled-border-color );
        background: var(--ux-btn-theme-primary-disabled-bg-color,
            $ux-btn-theme-primary-disabled-bg-color );
      }
    }

    &:hover {
      color: var(--ux-btn-theme-primary-onhover-text-color,
          $ux-btn-theme-primary-onhover-text-color );
      border: solid var(--ux-btn-border-width, $ux-btn-border-width) var(--ux-btn-theme-primary-onhover-border-color,
          $ux-btn-theme-primary-onhover-border-color );
      background: var(--ux-btn-theme-primary-onhover-bg-color,
          $ux-btn-theme-primary-onhover-bg-color );
    }

    &:active {
      color: var(--ux-btn-theme-primary-onactive-text-color,
          $ux-btn-theme-primary-onactive-text-color );
      border: solid var(--ux-btn-border-width, $ux-btn-border-width) var(--ux-btn-theme-primary-onactive-border-color,
          $ux-btn-theme-primary-onactive-border-color );
      background: var(--ux-btn-theme-primary-onactive-bg-color,
          $ux-btn-theme-primary-onactive-bg-color );
    }
  }

  // Secondary Button
  &--secondary {
    color: var(--ux-btn-theme-secondary-default-text-color,
        $ux-btn-theme-secondary-default-text-color );
    background: var(--ux-btn-theme-secondary-default-bg-color,
        $ux-btn-theme-secondary-default-bg-color );
    border: solid var(--ux-btn-border-width, $ux-btn-border-width) var(--ux-btn-theme-secondary-default-border-color,
        $ux-btn-theme-secondary-default-border-color );
    box-shadow: var(--ux-btn-box-shadow-default, $ux-btn-box-shadow);

    &:disabled {
      color: var(--ux-btn-theme-secondary-disabled-text-color,
          $ux-btn-theme-secondary-disabled-text-color );
      border: solid var(--ux-btn-border-width, $ux-btn-border-width) var(--ux-btn-theme-secondary-disabled-border-color,
          $ux-btn-theme-secondary-disabled-border-color );
      background: var(--ux-btn-theme-secondary-disabled-bg-color,
          $ux-btn-theme-secondary-disabled-bg-color );
      cursor: not-allowed;

      &:hover {
        color: var(--ux-btn-theme-secondary-disabled-text-color,
            $ux-btn-theme-secondary-disabled-text-color );
        border: solid var(--ux-btn-border-width, $ux-btn-border-width) var(--ux-btn-theme-secondary-disabled-border-color,
            $ux-btn-theme-secondary-disabled-border-color );
        background: var(--ux-btn-theme-secondary-disabled-bg-color,
            $ux-btn-theme-secondary-disabled-bg-color );
      }
    }

    &:hover {
      color: var(--ux-btn-theme-secondary-onhover-text-color,
          $ux-btn-theme-secondary-onhover-text-color );
      border: solid var(--ux-btn-border-width, $ux-btn-border-width) var(--ux-btn-theme-secondary-onhover-border-color,
          $ux-btn-theme-secondary-onhover-border-color );
      background: var(--ux-btn-theme-secondary-onhover-bg-color,
          $ux-btn-theme-secondary-onhover-bg-color );
    }

    &:active {
      color: var(--ux-btn-theme-secondary-onactive-text-color,
          $ux-btn-theme-secondary-onactive-text-color );
      border: solid var(--ux-btn-border-width, $ux-btn-border-width) var(--ux-btn-theme-secondary-onactive-border-color,
          $ux-btn-theme-secondary-onactive-border-color );
      background: var(--ux-btn-theme-secondary-onactive-bg-color,
          $ux-btn-theme-secondary-onactive-bg-color );
    }
  }

  // Tertiary Button
  &--tertiary {
    color: var(--ux-btn-theme-tertiary-default-text-color,
        $ux-btn-theme-tertiary-default-text-color );
    background: var(--ux-btn-theme-tertiary-default-bg-color,
        $ux-btn-theme-tertiary-default-bg-color );
    border: solid var(--ux-btn-border-width, $ux-btn-border-width) var(--ux-btn-theme-tertiary-default-border-color,
        $ux-btn-theme-tertiary-default-border-color );
    box-shadow: var(--ux-btn-box-shadow-default, $ux-btn-box-shadow);

    &:disabled {
      color: var(--ux-btn-theme-tertiary-disabled-text-color,
          $ux-btn-theme-tertiary-disabled-text-color );
      border: solid var(--ux-btn-border-width, $ux-btn-border-width) var(--ux-btn-theme-tertiary-disabled-border-color,
          $ux-btn-theme-tertiary-disabled-border-color );
      background: var(--ux-btn-theme-tertiary-disabled-bg-color,
          $ux-btn-theme-tertiary-disabled-bg-color );
      cursor: not-allowed;

      &:hover {
        color: var(--ux-btn-theme-tertiary-disabled-text-color,
            $ux-btn-theme-tertiary-disabled-text-color );
        border: solid var(--ux-btn-border-width, $ux-btn-border-width) var(--ux-btn-theme-tertiary-disabled-border-color,
            $ux-btn-theme-tertiary-disabled-border-color );
        background: var(--ux-btn-theme-tertiary-disabled-bg-color,
            $ux-btn-theme-tertiary-disabled-bg-color );
      }
    }

    &:hover {
      color: var(--ux-btn-theme-tertiary-onhover-text-color,
          $ux-btn-theme-tertiary-onhover-text-color );
      border: solid var(--ux-btn-border-width, $ux-btn-border-width) var(--ux-btn-theme-tertiary-onhover-border-color,
          $ux-btn-theme-tertiary-onhover-border-color );
      background: var(--ux-btn-theme-tertiary-onhover-bg-color,
          $ux-btn-theme-tertiary-onhover-bg-color );
    }

    &:active {
      color: var(--ux-btn-theme-tertiary-onactive-text-color,
          $ux-btn-theme-tertiary-onactive-text-color );
      border: solid var(--ux-btn-border-width, $ux-btn-border-width) var(--ux-btn-theme-tertiary-onactive-border-color,
          $ux-btn-theme-tertiary-onactive-border-color );
      background: var(--ux-btn-theme-tertiary-onactive-bg-color,
          $ux-btn-theme-tertiary-onactive-bg-color );
    }
  }

  /**
      SIZES
  */
  &--tiny {
    padding: var(--ux-btn-size-tiny-padding, $ux-btn-size-tiny-padding);
    font-size: var(--ux-btn-size-tiny-text-size, $ux-btn-size-tiny-text-size);
  }

  &--small {
    padding: var(--ux-btn-size-small-padding, $ux-btn-size-small-padding);
    font-size: var(--ux-btn-size-small-text-size, $ux-btn-size-small-text-size);
  }

  &--medium {
    padding: var(--ux-btn-size-medium-padding, $ux-btn-size-medium-padding);
    font-size: var(--ux-btn-size-medium-text-size,
        $ux-btn-size-medium-text-size );
  }

  &--large {
    padding: var(--ux-btn-size-large-padding, $ux-btn-size-large-padding);
    font-size: var(--ux-btn-size-large-text-size, $ux-btn-size-large-text-size);
  }

  &--x-large {
    padding: var(--ux-btn-size-x-large-padding, $ux-btn-size-x-large-padding);
    font-size: var(--ux-btn-size-x-large-text-size,
        $ux-btn-size-x-large-text-size );
  }
}

a.ux-btn {
  text-decoration: none;
}
</style>
