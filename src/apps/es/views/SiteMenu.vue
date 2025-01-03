<template>
<div ref='ui-mn-wrapper' id='js-ui-mn-wrapper' class="ui-mn-wrapper">
    <a href= '#js-survey'  class="skip" tabindex="0" >Skip to main content</a>
    <div class="ui-header-max-width">
        <div class='ui-mn-outer'>

            <a id="pd-es-home" href="#js-home" aria-label="Survey logo" >
                <img class="ui-mn-logo " :src="getLogoUrl(logo.name, logo.extension )" aria-label="logo" alt="Survey logo"/>
            </a>

            <div class="ui-mn-options">
                <lang-dropdown id="pd-es-lang" :options="locales" :selectedOption="activeLocaleInDropdown" class="lang-dropdown show-in-mobile" @optionChange="onLocaleOptionSelection" aria-label="Dropdown for selecting language"></lang-dropdown>
            </div>

        </div>
    </div>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { logoPath, dropdownLocales } from '@/config.js';
import * as i18n_utils from '@/modules/components/i18n/src/utils';
import * as utils from '@/modules/components/common/src/utils';

const { t, locale } = useI18n();

// Reactive data
const activeLocaleInDropdown = ref(locale.value);
const locales = ref(getLocaleOptions());
const logo = logoPath;

// Functions
function getLogoUrl(name, ext) {
    return new URL(`../../../assets/images/${name}.${ext}`, import.meta.url).href;
}

function getLocaleOptions() {
    let result = i18n_utils.getSupportedLocales(dropdownLocales, i18n_utils.localelist);
    return result.map(item => utils.renameKeys(item, { code: "value", name: "text" }));
}

function onLocaleOptionSelection(selectedLocale) {
    utils.setHtmlElementLangAttribute(selectedLocale);
    utils.addLocaleToHtmlElementClass("lang-" + selectedLocale);
    utils.setCurrentLocale(selectedLocale);
    utils.updateLocaleCodeInURL(selectedLocale);
    utils.setPageTitle(t('survey.site_title'));
    activeLocaleInDropdown.value = selectedLocale;
}

// Lifecycle hook
onMounted(() => {
    utils.setPageTitle(t('survey.site_title'));
});
</script>

<style lang="scss" scoped>
@import "../assets/styles/_settings.scss";

$menu-bg-color: #fff !default;

.ui-mn-wrapper {
    background-color: $menu-bg-color;
    width: 100%;
    z-index: 9;
    position: fixed;
    top: 0;
    box-shadow: -6px 5px 5px 0px rgba(0, 0, 0, 0.05);
    padding: 16px;
    transition: all .5s ease;
    box-sizing: border-box;

    @media screen and (max-width: 767px) {
            padding: 8px 16px;
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
    
    .lang-dropdown {
        //display: none;
        background-color: #F5F5F5;
        
    
        @media screen and (min-width: 800px) {
            //display: inherit;
            margin-right: 2em;
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
    left: 165px;
    top: 65px;
    padding: 8px 5px;
    text-align: center;
  }
  } 
</style>
