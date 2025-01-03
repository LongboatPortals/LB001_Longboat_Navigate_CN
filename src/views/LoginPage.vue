<template>
  <login-page
    :siteTitle = "t('login_site_title')"
    :loginPasswordInputPlaceholder = "t('login_password')"
    @onLocaleOptionSelectionEvent="onLocaleOptionSelectionEvent($event)"
    @onLoginSuccess="processLoginSuccess($event)"
    @onLoginFailure="processLoginFailure()"
  >
  <template #login_welcome_title>{{ t('login_welcome_title') }}</template>
  <template #login_welcome_text_html>{{ t('login_welcome_text_html') }}</template>
  <template #password_error_message>{{ t('password_error_message') }}</template>
  <template #login_button_text>{{ t('login_button') }}</template>
  <template #privacy-policy-link><privacy-policy-link :locale="t('c_locale_code')">{{t("c_privacy")}}</privacy-policy-link></template>
</login-page>

</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import * as utils from '@/modules/components/common/src/utils';
import LoginPage from '@/modules/auth/views/LoginPage.vue';
import PrivacyPolicyLink from '@/modules/components/privacypolicylink/src/PrivacyPolicyLink.vue';

// Initialize Vue I18n and Vue Router
const { t } = useI18n();
const router = useRouter();

// Methods
function processLoginSuccess({ pathAfterLogin }) {
  utils.redirectTo(router, pathAfterLogin); // Pass router instance
}

function processLoginFailure() {
  console.log('Login failure');
}

function onLocaleOptionSelectionEvent() {
  utils.setPageTitle(t('login_site_title'));
}
</script>

<style lang="scss">
//@import "@/assets/styles/login.scss";
</style>
