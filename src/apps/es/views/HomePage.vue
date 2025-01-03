<template>
    <div class="es-body-wrapper">
        <site-menu @dropdownLocaleChangeEvent="reloadSurvey"></site-menu>
        <site-banner id="js-home"></site-banner>
        <ui-survey id="js-survey" :key="mapKey"></ui-survey>
        <footer>
            <copyright-footer class="copyright"><privacy-policy-link
                    :locale="$i18n.locale">{{ t("c_privacy") }}</privacy-policy-link></copyright-footer>
        </footer>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

import SiteMenu from './SiteMenu.vue';
import UiSurvey from './UiSurvey.vue';
import SiteBanner from './SiteBanner.vue';

// Setup i18n
const { t } = useI18n();

// Reactive key for survey reload
const mapKey = ref(Date.now());

// Function to reload the survey by updating the key
const reloadSurvey = () => {
  mapKey.value = Date.now();
  
};

// Set the page title when the component is mounted
onMounted(() => {
  document.title = t('survey.site_title');
});
</script>

<style lang="scss">
.es-body-wrapper {
    footer {
        text-align: center;
        margin-bottom: 30px;
        font-size: 0.85rem;
    }

    .copyright {
        padding: 16px;
        background: #4E5157;
        color: white;
        text-align: center;
        display: block;

        .ux-copyright-link {
            color: white;
            text-decoration: none;
        }
    }
}
</style>
