<template>
  <div class="ui-faqs-item" ref="uiFaq" :id="'pd-prw-faq-' + faqId">
    <div class="ui-faqs-title" @click="toggleOpenClose">
      <slot name="heading"></slot>
      <button class="ui-faqs-btn" role="button" aria-label="faq button for opening the faqs">
        <i class="fa-solid fa-angle-down" aria-hidden="true"></i>
      </button>
    </div>
    <div class="ui-faqs-body" ref="uiFaqBody">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref} from 'vue';
import { toggle } from 'slidetoggle';

/**
 * Props for FAQ Item component
 */
defineProps({
  faqId: {
    type: Number,
    required: true
  }
});

const uiFaq = ref(null);
const uiFaqBody = ref(null);

function toggleOpenClose() {
  if (uiFaq.value && uiFaqBody.value) {
    uiFaq.value.classList.toggle('__open');
    toggle(uiFaqBody.value, {
      milliseconds: 300,
      transitionFunction: 'ease-in'
    });
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/colors.scss';

.ui-faqs-btn:focus,
.ui-faqs-item.__open .ui-faqs-btn {
  background-color: #4e5157;
}

.ui-faqs-item {
  margin-bottom: 16px;
  transition: all 0.3s ease;
  border-bottom: 1px solid #39a8e3;
}

.ui-faqs-item:hover {
  // cursor: pointer;
}

.ui-faqs-item.__open {
  // Apply styles for open state
}

.ui-faqs-title {
  padding: 20px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.25rem;
}

.ui-faqs-body {
  padding: 4px 32px 32px;
  text-align: left;
  display: none;
  overflow: hidden;
}

.ui-faqs-body.__open {
  display: block;
}

.ui-faqs-btn {
  width: 22px;
  min-width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50% !important;
  border: 0 !important;
  font-size: 1rem;
  padding: 0 !important;
  transition: all 0.3s ease !important;
  margin-left: 16px;
  cursor: pointer !important;

  i {
    line-height: inherit;
    color: #fff;
    transition: transform 0.3s ease;
  }
}

/* This will rotate the icon when the FAQ item is open */
.ui-faqs-item.__open .ui-faqs-btn i {
  transform: rotate(180deg);
}

.ui-faqs-item.__open .ui-faqs-btn {
  background-color: $tertiary-color;
}

.ui-faqs-item.__open .ui-faqs-title {
  color: $tertiary-color;
}

@media screen and (max-width: 767px) {
  .ui-faqs-title {
    padding: 20px 8px;
  }

  .ui-faqs-body {
    padding: 4px 8px 8px 24px;
  }
}
</style>
