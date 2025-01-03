<template>
    <div ref="uiPrwMnWrapper" id="js-ui-prw-mn-wrapper" class="ui-prw-mn-wrapper">
        <a href= '#js-about'  class="skip" tabindex="0" >Skip to main content</a>
      <div class="ui-header-max-width">
        <div class="ui-mn-outer">
          <a id="pd-prw-homelogo" href="#js-home" aria-label="Study logo" @click.self="closeMenuPanel()">
            <img class="ui-mn-logo" :src="getLogoUrl(logo.name, logo.extension)" alt="Study logo" />
          </a>
  
          <div class="ui-mn-options">
            <ui-abutton class="ux-cta-btn ui-cta-btn ux-btn ux-btn--tertiary" type="a" @click="emitEligibilityBtnEvent">{{ $t('prw.cta-btn') }}</ui-abutton>
            <lang-dropdown id="pd-prw-dropdown" class="ui-mn-dropdown" aria-label="Dropdown for selecting language"
              :options="locales" :selectedOption="activeLocaleInDropdown" @optionChange="onLocaleOptionSelection">
            </lang-dropdown>
  
            <div class="ui-menu-wrapper" @click="openMenuPanel" tabindex="0">
              <div ref="uiMnHamburger" id="js-ui-mn-hamburger" class="ui-mn-hamburger">
                <span></span>
              </div>
              <div class="menu-text" role="group" tabindex="0">{{ $t('prw.menu') }}</div>
            </div>
          </div>
        </div>
        <div class="underlay" @click="processUnderlayClick()"></div>
        <div class="overlay">
          <div ref="uiMnListWrapper" id="js-ui-mn-list-wrapper" class="ui-mn-list-wrapper">
            <div ref="uiMnCloseBtn" id="js-ui-mn-close-btn" class="ui-mn-close-btn" @click="closeMenuPanel">
              <i class="fa-solid fa-xmark" aria-hidden="true"></i>
              <div class="close-menu-text">Close</div>
            </div>
            <ul class="ui-mn-list">
              <li class="ui-mn-list-item">
                <lang-dropdown :options="locales" :selectedOption="activeLocaleInDropdown" class="lang-dropdown show-in-mobile"
                  @optionChange="onLocaleOptionSelection">
                </lang-dropdown>
              </li>
              <li class="reveal ui-mn-list-item">
                <a href="#js-home" class="reveal__content" @click.self="closeMenuPanel()" v-smooth-scroll>
                  <i class="ti ti-home" role="none"></i>
                </a>
              </li>
              <li class="reveal ui-mn-list-item"><a href="#js-about" class="reveal__content" @click="closeMenuPanel()" v-smooth-scroll>{{ $t('prw.nav_one') }}</a></li>
              <li class="reveal ui-mn-list-item"><a href="#js-timeline" class="reveal__content" @click="closeMenuPanel()" v-smooth-scroll>{{ $t('prw.nav_two') }}</a></li>
              <li class="reveal ui-mn-list-item"><a href="#js-eligible" class="reveal__content" @click="closeMenuPanel(); emitEligibilityBtnEvent()">{{ $t('prw.nav_four') }}</a></li>
              <li class="reveal ui-mn-list-item"><a href="#js-center" class="reveal__content" @click="closeMenuPanel()" v-smooth-scroll>{{ $t('prw.nav_five') }}</a></li>
              <li class="reveal ui-mn-list-item"><a href="#js-faqs" class="reveal__content" @click="closeMenuPanel()" v-smooth-scroll>{{ $t('prw.nav_six') }}</a></li>
              <li class="ui-mn-list-item">
                <ui-abutton class="ux-cta-btn ui-cta-btn ux-btn ux-btn--tertiary show-in-mobile reveal__content" type="a" @click="closeMenuPanel()">{{ $t('prw.cta-btn') }}</ui-abutton>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  import { useI18n } from 'vue-i18n'
  import * as utils from "@/modules/components/common/src/utils";
  import * as i18n_utils from "@/modules/components/i18n/src/utils";
  import { logoPath, dropdownLocales } from "@/config.js";
  import UiAbutton from '@/modules/components/uibutton/src/UiButton.vue'
  import { router } from '@/routes'
  
  // Declare the events you want to emit
  const emit = defineEmits(['eligibilityBtnEvent', 'localeHasChangedEvent']);

  // Reactive state
  const { locale, t } = useI18n()
  const activeLocaleInDropdown = ref(locale)
  const locales = ref([])
  const logo = ref(logoPath)
  
  // Refs for DOM elements
  const uiMnListWrapper = ref(null)
  const uiPrwMnWrapper = ref(null)
  
  // Functions
  const getLogoUrl = (name, ext) => {
    return new URL(`../../../assets/images/${name}.${ext}`, import.meta.url).href
  }
  
  const getLocaleOptions = () => {
    let result = i18n_utils.getSupportedLocales(dropdownLocales, i18n_utils.localelist)
    return result.map(localeObj => utils.renameKeys(localeObj, { code: "value", name: "text" }))
  }
  
  const getScrollTop = () => window.pageYOffset || document.documentElement.scrollTop
  
  const openMenuPanel = () => {
    uiMnListWrapper.value.classList.add('dl-open')
    document.querySelector('ul.ui-mn-list').classList.add('js-animate')
    addUnderlay()
  }
  
  const closeMenuPanel = () => {
    uiMnListWrapper.value.classList.remove('dl-open')
    document.querySelector('ul.ui-mn-list').classList.remove('js-animate')
    removeUnderlay()
  }
  
  const processScroll = () => {
    if (getScrollTop() > 20) {
      uiPrwMnWrapper.value.classList.add('ui-scroll')
    } else {
      uiPrwMnWrapper.value.classList.remove('ui-scroll')
    }
  }
  
  const registerEvent = () => {
    window.addEventListener('scroll', processScroll)
  }
  
  const removeEvent = () => {
    window.removeEventListener('scroll', processScroll)
  }
  
  const emitEligibilityBtnEvent = () => {
    emit('eligibilityBtnEvent')
  }
  
  const onLocaleOptionSelection = (_locale) => {
    utils.setHtmlElementLangAttribute(_locale)
    utils.addLocaleToHtmlElementClass("lang-" + _locale);
    locale.value = _locale
    router.push({ path: window.location.pathname, query: { lang: _locale } })
    utils.setPageTitle(t('prw.site_title'))
    emit('localeHasChangedEvent')
  }
  
  const processUnderlayClick = () => closeMenuPanel()
  
  const removeUnderlay = () => {
    document.querySelector('.underlay').classList.remove('show')
  }
  
  const addUnderlay = () => {
    document.querySelector('.underlay').classList.add('show')
  }
  
  // Lifecycle hooks
  onMounted(() => {
    locales.value = getLocaleOptions()
    registerEvent()
  })
  
  onUnmounted(() => {
    removeEvent()
  })
  </script>

<style lang="scss" scoped>
@import "../assets/styles/_settings.scss";

.ui-prw-mn-wrapper {

    .underlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1;
        display: none;

        &.show{
            display: block;
        }
        
    }

    /*
            .overlay{
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.5);
                z-index: 1;
                display: none;
            }
            */
    background-color: #fff;
    width: 100%;
    z-index: 9;
    position: fixed;
    top: 0;
    box-shadow: -6px 5px 5px 0px rgba(0, 0, 0, 0.05);
    padding: 16px;
    transition: all .5s ease;
    box-sizing: border-box;

    .ux-select {
        margin: 0;
        //margin-right: 12px;

        @media screen and (min-width: 767px) {
            margin-right: 24px;
        }


        @media screen and (min-width: 821px) {
            margin-right: 24px;
            margin-left: 24px;
        }
    }

    .ui-mn-hamburger span,
    .ui-mn-hamburger span:after,
    .ui-mn-hamburger span:before {
        background: $menu-hamburger-color;
    }

    .ui-mn-list-wrapper {
        background-color: color.adjust($menu-panel-bg, $lightness: 10%);
    }

    .ui-mn-close-btn {
        //border: 3px solid #fff;
        color: #fff;
    }

    .ui-mn-list-item a {
        color: #fff;
        text-decoration: none;
        transition: .3s;
    }

    .ui-mn-list-item a:hover {
        color: $menu-item-onhover;
    }

    .ui-mn-outer {
        width: 100%;
        overflow: hidden;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .ui-mn-logo {
        max-height: 60px;
        transition: all .4s ease;
        width: 150px;

        @media screen and (min-width: 767px) {
            width: 200px;
        }
    }

    /*STICKY*/
    &.ui-scroll {
        padding: 8px 16px;
    }

    &.ui-scroll .ui-mn-logo {
        width: 150px;
    }

    /*STICKY*/
    .ui-mn-hamburger {
        height: 28px;
        width: 28px;
        outline: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        padding: 8px 0;
    }

    .ui-mn-hamburger span,
    .ui-mn-hamburger span::before,
    .ui-mn-hamburger span::after {
        position: absolute;
        content: "";
        height: 2.5px;
        border-radius: 20px;
        transition-duration: .3s;
        transition-timing-function: cubic-bezier(0.77, 0, 0.175, 1);
    }

    .ui-mn-hamburger span::before {
        top: -8px;
        width: 28px;
    }

    .ui-mn-hamburger span {
        width: 20px;
    }

    .ui-mn-hamburger span::after {
        top: 8px;
        width: 28px;
    }

    .ui-mn-options {
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: initial;

        @media screen and (min-width: 767px) {
           // min-width: 300px;
        }

        @media screen and (min-width: 1052px) {
           // min-width: 420px;
        }
    }

    /*HAMBURGER*/

    /*LANGUAGE SELECT*/
    .ui-mn-lang-select.__sm {
        display: none;
    }

    .ui-mn-lang-select.__lg {
        display: block;
    }

    select.ui-mn-lang-select {
        display: block;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
        letter-spacing: 0.01em;
        text-align: left;
        color: #4e5157;
        padding: 8px 16px;
        background: #fff;
        border: 1px solid #e8e8e8;
        box-sizing: border-box;
        border-radius: 5px;
        width: 200px;
        margin-bottom: 0;
        height: auto;
    }

    /*LANGUAGE SELECT*/

    /*OPEN MENU*/
    .ui-mn-list-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        width: 100%;
        position: fixed;
        z-index: 1;
        top: 0;
        right: 0;
        overflow-x: hidden;
        opacity: 0;
        padding: 20px;
        transform: translateX(100%);
        transition-property: all;
        transition: 0.3s;
        transition-timing-function: cubic-bezier(.4, 0, .2, 1);

        @media screen and (min-width: 767px) {
            width: 50%; 
        }
    }

    .ui-mn-list-wrapper.dl-open {
        //width: 550px;
        opacity: 1;
        transform: translateX(0%);
    }

    /*
            .dl-navbar-inner-wrapper {
                position: relative;
                display: flex;
                align-items: flex-end;
                flex-direction: column;
            }
            */

    .ui-mn-close-btn {
        //border-radius: 50%;
        // width: 40px;
        // height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        //font-size: 16px;
        cursor: pointer;
        // margin-top: 16px;
        // margin-right: 12px;
        margin-bottom: 16px;
        align-self: flex-end;
        letter-spacing: 1px;
        text-transform: uppercase;
        font-weight: 600;

        i {
            font-size: 32px;
           // margin-right: 8px;
        }
    }

    ul.ui-mn-list {
        //padding: 32px;
        padding: 0;
        // width: 450px;

    }

    .ui-mn-list-item {
        display: flex;
        font-size: 2em;
        font-weight: 600;
        // line-height: 38px;
        // text-align: right;
        letter-spacing: 1.2px;
        margin-bottom: 28px;
        -webkit-transition: all 0.3s ease-in-out;
        -o-transition: all 0.3s ease-in-out;
        transition: all 0.3s ease-in-out;
        list-style: none;
        //text-transform: uppercase;
    }

    @media screen and (max-width: 767px) {

        padding: 8px 16px;

        &.ui-scroll {
            padding: 4px 16px;
        }

        .ui-mn-hamburger {
            padding: 16px 0 16px;
        }

        .ui-mn-lang-select.__sm {
            display: block;
            width: 100%;
            margin-bottom: 8px;
        }

        .ui-mn-lang-select.__lg {
            display: none;
        }

        .ui-mn-list-item {
            font-size: 1.5em;
            line-height: 30px;
            //justify-content: flex-end;
        }
    }

    /*OPEN MENU*/

    a>* {
        pointer-events: none;
    }

    .lang-dropdown{
        display: none;
        background-color: #F5F5F5;
        margin-right: 2em;

        &.show-in-mobile {
            margin-right: 0;
            display: inherit;

            @media screen and (min-width: 500px) {
                display: none;
            }
        }

        @media screen and (min-width: 500px) {
            display: inherit;
        }
    }
    .menu-text {
        // display: none;
        letter-spacing: 1px;
        text-transform: uppercase;
        font-weight: 600;
        margin-left: 8px;
    }

    .ui-mn-dropdown {
        margin-right: 20px;
        display: none;
        font-weight: 500;
        letter-spacing: 1px;
        box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;

        @media screen and (min-width: 500px) {
            display: inherit;
        }
    }

    .ui-cta-btn {
        display: none;
        box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
        padding: 5px 24px;

        &.show-in-mobile {
            display: inherit;

            @media screen and (min-width: 821px) {
                display: none;
            }
        }

        @media screen and (min-width: 821px) {
            display: inherit;
        }
    }


}
</style>
<style lang="scss">
.ui-menu-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    z-index: 1;
    transition: all 0.3s ease;
    //margin-right: 16px;

    .menu-text {
        display: none;
        font-size: 16px;

        @media screen and (min-width: 767px) {
            display: block;
        }
    }
}

.close-menu-text{
    display: none;
    font-size: 16px;
    margin-left: 8px;
    @media screen and (min-width: 767px) {
        display: block;
    }

}
.js-animate {
    .reveal {
        overflow: hidden;
    }

    .reveal__content {
        width: max-content;
        white-space: nowrap;
        margin: 0;
        line-height: 117%;
    }

    .reveal {
        animation-delay: 0;
    }

    .reveal:nth-child(2) .reveal__content {
        animation-delay: 0.05s;
    }

    .reveal:nth-child(3) .reveal__content {
        animation-delay: 0.075s;
    }

    .reveal:nth-child(4) .reveal__content {
        animation-delay: 0.1s;
    }

    .reveal:nth-child(5) .reveal__content {
        animation-delay: 0.125s;
    }

    .reveal:nth-child(6) .reveal__content {
        animation-delay: 0.15s;
    }

    .reveal:nth-child(7) .reveal__content {
        animation-delay: 0.175s;
    }

    .reveal__content {
        animation: slide-up 0.85s cubic-bezier(0.65, 0, 0.35, 1) both;
    }

    @keyframes slide-up {
        from {
            transform: translateY(100%);
        }

        to {
            transform: translateY(0);
        }
    }
}
.skip {
  position: absolute;
  left: -100%;
  z-index: 1000;
  padding: var(--ux-btn-size-medium-padding, 5px 15px);
  align-items: center;
  background: var(--ux-btn-theme-tertiary-default-bg-color);
  margin-left: 4%;
  margin-top: 5px;
  color: white;
  opacity: 0;
  text-decoration: none;
  font-weight:  700;

}
.skip:focus {
  left: 40%;
  transform: translateX(-50%);
  opacity: 1;
}
@media (max-width: 600px) {
  .skip {
    left: -100%;
    padding: 12px;
    font-size: 14px;
  }
  .skip:focus {
    left: 235px;
    padding: 8px 5px;
    text-align: center;
  }
  }
</style>
