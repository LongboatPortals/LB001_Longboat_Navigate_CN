<template>
<div id="app" role="main">
    <router-view />
    <aside>
        <cookie-modal>
            <template #body-content> {{ t("c_text") }} <br />
                <span v-html="t('c_text_two')"></span>
                <privacy-policy-link aria-label="Opens new page for privacy Policy" id="pd-cookie-privacy" class="privacy-link" :locale="$t('c_locale_code')"> {{ $t("c_privacy") }}
                </privacy-policy-link>
            </template>
            <template #accept-btn-text>{{ t('c_accept') }}</template>
            <template #reject-btn-text>{{ t('c_nocookie') }}</template>
        </cookie-modal>
    </aside>
</div>
</template>

<script setup>
    import { onMounted } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { useRoute} from 'vue-router';
    import CookieModal from "@/modules/components/consentmodal/src/CookieModal.vue";
    import PrivacyPolicyLink from "@/modules/components/privacypolicylink/src/PrivacyPolicyLink.vue";
    import * as utils from "@/modules/components/common/src/utils";
    
    // Setup for Vue I18n
    const { t, locale} = useI18n();
    const route = useRoute();
    
    
    // Lifecycle Hooks
    onMounted(() => {
      locale.value = route.query.lang;
      utils.setHtmlElementLangAttribute(locale.value);
      utils.addLocaleToHtmlElementClass("lang-" + locale.value);
    });
</script>


<style lang="scss">
@import "@/assets/styles/app.scss";
</style>
