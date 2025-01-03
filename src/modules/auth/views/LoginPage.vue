<template>
    <div id="ui-login-wrapper">
        <header class="lang-dropdown-wrapper">
            <lang-dropdown aria-label="Dropdown for language selection" class="login-lang-dropdown" :options="locales"
                :selectedOption="activeLocaleInDropdown" @optionChange="onLocaleOptionSelection"></lang-dropdown>
        </header>

        <main id="js-login" class="login">
            <div class="login__logo-wrapper" alt="Background image of login page" role="img"
                aria-label="Background image of login page" :class="{ 'login__logo-wrapper--bg': !isDefaultStyle }">
                <img v-if="isDefaultStyle" class="login__logo" :src="getLogoUrl(logo.name, logo.extension)" alt="" />
            </div>

            <div class="login__form-wrapper">
                <div class="login__form">
                    <img v-if="!isDefaultStyle" class="login__form-logo" :src="getLogoUrl(logo.name, logo.extension)"
                        alt="Login study logo" />
                    <h1 class="login__form-heading">
                        <slot name="login_welcome_title" />
                    </h1>
                    <p class="login__form-text">
                        <slot name="login_welcome_text_html" />
                    </p>
                    <form class="login-form" @submit.prevent="login">
                        <label aria-label="Enter Password" class="login__password-input-label">
                            <input class="login__password-input" aria-label="Text box for entering password"
                                :class="{ 'login__password-input--error': passwordError }"
                                :placeholder="props.loginPasswordInputPlaceholder" type="password" name="password"
                                v-model.trim="password" @input="resetPasswordErrorStatus" />
                        </label>
                        <div role="alert" class="d-login-alert-error" v-if="passwordError">
                            <i class="login-error-icon fas fa-exclamation-circle"></i>
                            <slot name="password_error_message" />
                        </div>
                        <ui-button id="pd-login-btn" type="button" class="ux-btn ux-btn--primary login-button"
                            @click="login">
                            <slot name="login_button_text" />
                        </ui-button>
                    </form>
                </div>
                <copyright-label class="login-copyright">
                    <slot name="privacy-policy-link" />
                </copyright-label>
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute} from 'vue-router';
import { useI18n } from 'vue-i18n';
import * as i18n_utils from "@/modules/components/i18n/src/utils";
import * as utils from "@/modules/components/common/src/utils";
import { processLogin } from '../plugins/auth';
import { Config } from '../config';
import LangDropdown from "@/modules/components/uiselect/src/UiSelect.vue";
import UiButton from "@/modules/components/uibutton/src/UiButton.vue";
import CopyrightLabel from "@/modules/components/copyrightlabel/src/CopyrightLabel.vue";

// Emitting events
const emit = defineEmits(['onLoginSuccess', 'onLoginFailure', 'onLocaleOptionSelectionEvent']);

// Initialize vue-router and vue-i18n instances
const router = useRouter();
const route = useRoute();
const { locale } = useI18n();

// Reactive variables
const passwordError = ref(false);
const password = ref(null);
const isDefaultStyle = Config.isDefaultStyle;
const activeLocaleInDropdown = ref(locale.value);
const locales = ref(getLocaleOptions());
const logo = Config.logoPath;

// Define props
const props = defineProps({
  siteTitle: {
    type: String,
    default: 'Login',
  },
  loginPasswordInputPlaceholder: {
    type: String,
    default: 'Enter Password',
  },
});

// Methods
function getLogoUrl(name, ext) {
    return new URL(`../../../assets/images/${name}.${ext}`, import.meta.url).href;
}

function configurePageAnimation() {
    function playAnimation(idElement, elementSelector) {
        let waitTimeInSecs = 15;
        setTimeout(() => {
            const element = document.getElementById(idElement);
            element.classList.remove(elementSelector);
        }, waitTimeInSecs * 60);
    }

    if (Config.isLoginPageAnimationEnabled && screen.width > 1000) {
        const element = document.getElementById("app");
        element.classList.add("animate");
        playAnimation("app", "animate");
    }
}

function login() {
    const onLoginSuccess = (pathAfterLogin) => {
        passwordError.value = false;
        emit('onLoginSuccess', { pathAfterLogin });
    };

    const onLoginFailure = () => {
        passwordError.value = true;
        emit('onLoginFailure');
    };

    processLogin(password.value, onLoginSuccess, onLoginFailure);
}

function resetPasswordErrorStatus() {
    passwordError.value = false;
}

function onLocaleOptionSelection(newLocale) {
    utils.setHtmlElementLangAttribute(newLocale);
    utils.addLocaleToHtmlElementClass("lang-" + newLocale);
    utils.setPageTitle(props.siteTitle);
    utils.setCurrentLocale({ global: { locale } }, newLocale); // Pass i18n instance
    utils.updateLocaleCodeInURL(router, newLocale); // Pass router instance
    emit('onLocaleOptionSelectionEvent');
}

function getLocaleOptions() {
    let result = i18n_utils.getSupportedLocales(Config.dropdownLocales, i18n_utils.localelist);
    return result.map(locale => utils.renameKeys(locale, { code: 'value', name: 'text' }));
}

// Lifecycle hook
onMounted(() => {
    activeLocaleInDropdown.value = route.query.lang; //new URLSearchParams(window.location.search).get('lang')
    configurePageAnimation();
    utils.resizeOverlay('js-login');
    if (Config.isPageAnimationEnabled && screen.width > 1000) {
        utils.configurePageAnimation('app', 'animate');
    }
    utils.setPageTitle(props.siteTitle);
});
</script>

<style lang="scss">
@import "../assets/styles/login.scss";
</style>
