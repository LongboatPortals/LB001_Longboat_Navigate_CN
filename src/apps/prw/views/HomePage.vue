<template>
  <div>
    <site-menu @localeHasChangedEvent="reloadSections" @eligibilityBtnEvent="onEligibilityBtnEvent"></site-menu>
    <site-banner id="js-home" @eligibilityBtnEvent="onEligibilityBtnEvent"></site-banner>
    <about-study id="js-about"></about-study>
    <study-info></study-info>
    <timeline-section id="js-timeline"></timeline-section>
    <modal-layout v-if="isEligibilityFormVisible || isClosing">
      <eligibility-section :class="eligibilityAnimationClass" id="js-eligible"
        @closeEligibilityFormEvent="closeEligibilityForm" :key="eligSecKey"
        @gMapInFormConsentEnabledEvent="reloadMap"></eligibility-section>
    </modal-layout>
    <study-center-map id="js-center" :key="mapKey"></study-center-map>
    <faq-section id="js-faqs"></faq-section>
    <share-study id=""></share-study>
    <ui-footer @eligibilityBtnEvent="onEligibilityBtnEvent" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import SiteMenu from './SiteMenu.vue'
import SiteBanner from './SiteBanner2.vue'
import AboutStudy from './AboutStudy.vue'
import StudyInfo from './StudyInfo2.vue'
import TimelineSection from './TimelineSection.vue'
import ModalLayout from '@/modules/components/layout/ModalLayout.vue'
import EligibilitySection from '../patientConnect/EligibilitySection.vue'
import StudyCenterMap from './StudyCenter.vue'
import FaqSection from './FaqSection.vue'
import ShareStudy from './ShareStudy.vue'
import UiFooter from './FooterSection.vue'

// Reactive state
const { t } = useI18n()
const mapKey = ref('hgjjf')
const eligSecKey = ref('bklof')
const isEligibilityFormVisible = ref(false)
const isClosing = ref(false)

// Methods
const reloadMap = () => {
  mapKey.value = mapKey.value + new Date().getSeconds()
}

const reloadEligibilitySection = () => {
  eligSecKey.value = eligSecKey.value + new Date().getSeconds()
}

const reloadSections = () => {
  reloadMap()
  reloadEligibilitySection()
}

const eligibilityAnimationClass = computed(() => {
  return isEligibilityFormVisible.value ? 'slideupp' : isClosing.value ? 'slidedown' : ''
})

const lockBackgroundScroll = () => {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

  // Add padding to body equal to the scrollbar width
  document.body.style.paddingRight = `${scrollbarWidth}px`;

  // Hide overflow on the body (disable scrolling)
  document.body.style.overflow = 'hidden';

}


const unlockBackgroundScroll = () => {
  // Reset the padding when overflow is set back to auto
  document.body.style.paddingRight = '';

  // Restore scrolling
  document.body.style.overflow = 'auto';
}


const onEligibilityBtnEvent = () => {
  isEligibilityFormVisible.value = true
  lockBackgroundScroll();
  isClosing.value = false
}

const closeEligibilityForm = () => {
  isClosing.value = true
  isEligibilityFormVisible.value = false
  setTimeout(() => {

    unlockBackgroundScroll();
    isClosing.value = false // Reset closing state
  }, 500) // Delay to match the animation duration
}

// Lifecycle hook
onMounted(() => {
  document.title = t('prw.site_title')
})
</script>

<style lang="scss">
.ux-cta-btn {
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.eligibility-section {
  border-radius: 5px;
  height: 100%;
  width: 100%;

  @media screen and (min-width: 768px) {
    height: 80%;
    width: 70%;
  }


}

.slideupp {
  position: relative;
  animation: slideUpp 0.5s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
}

@keyframes slideUpp {
  0% {
    transform: translateY(100%);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
}


.slidedown {
  position: relative;
  animation: slideDown 0.5s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
}

@keyframes slideDown {
  0% {
    transform: translateY(0);
    opacity: 1;
  }

  100% {
    transform: translateY(100%);
    opacity: 0;
  }
}
</style>