import LocaleSwitcher from "@/modules/components/uiselect/src/UiSelect.vue";
import UiButtonVue from "@/modules/components/uibutton/src/UiButton.vue";
import CopyrightLabel from "@/modules/components/copyrightlabel/src/CopyrightLabel.vue";
import PrivacyPolicyLink from '@/modules/components/privacypolicylink/src/PrivacyPolicyLink.vue';
import { createApp } from 'vue'
import App from '@/App.vue'
import { createI18n } from 'vue-i18n'
import router from '@/routes'
import { isDefaultStyle, dropdownLocales, logoPath, defaultLocale, passwords, cookieExpiryTimeInMins, isLoginPageAnimationEnabled } from '@/config.js'
//import LbpAuth from '@pd-ui-master/login-module/config';
import LbpAuth from '@/modules/auth/config';
import '@/assets/styles/tailwind.css'
import '@/modules/components/tokens/variables.css';


//import '@/apps/prw/main.js'
import VueSmoothScroll from 'vue3-smooth-scroll'

//install/import pendo and wistia
import '@/modules/pendo/pendo.js';
//import '@/modules/wistia/wistia.js';

import messages from '@intlify/unplugin-vue-i18n/messages'



export const $app = createApp(App)


// Gobal component registration
$app.component('ui-button', UiButtonVue)
$app.component('lang-dropdown', LocaleSwitcher)
$app.component('copyright-footer', CopyrightLabel)
$app.component('privacy-policy-link', PrivacyPolicyLink)






export let i18n = createI18n({
    // legacy: false,
    globalInjection: true,
    allowComposition: true,
    locale: import.meta.env.VITE_APP_I18N_LOCALE || defaultLocale,
    //fallbackLocale: defaultLocale,
    silentTranslationWarn: true,
    messages,
})




$app.use(i18n)
$app.use(router)
$app.use(VueSmoothScroll)
$app.use(LbpAuth, {
        isLoginPageAnimationEnabled: isLoginPageAnimationEnabled,
        isDefaultStyle: isDefaultStyle,
        logoPath: logoPath,
        defaultLocale: defaultLocale,
        dropdownLocales: dropdownLocales,
        "passwords": passwords,
        "cookieExpiryTimeInMins": cookieExpiryTimeInMins
    })
    /*
    app.use(JapanAuth, {
        isLoginPageAnimationEnabled: isLoginPageAnimationEnabled,
        isDefaultStyle: isDefaultStyle,
        logoPath: logoPath,
        defaultLocale: defaultLocale,
        dropdownLocales: japanDropdownLocales,
        "passwords": japanPasswords,
        "cookieExpiryTimeInMins": cookieExpiryTimeInMins
    })
    */



// Conditionally wait for the router to be ready only in non-test environments
if (import.meta.env.MODE !== 'test') {
    router.isReady().then(() => {
        $app.mount('#app')
    });
  } else {
    $app.mount('#app');
  }


  /*
router.isReady().then(() => {
    $app.mount('#app')
})
    */