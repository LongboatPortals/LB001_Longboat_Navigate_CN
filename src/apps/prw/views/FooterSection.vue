<template>
<section class="prw-footer-section" role="contentinfo">
    <div class="ui-max-width">
        <img class="ui-footer__logo" :src="getLogoUrl(logo.name, logo.extension )" alt="Footer Study Logo"/>
        <ul class='ui-footer__link-group' aria-label="Footer of the study site">
            <li class=""><a id="pd-prw-footer-nav-1" href='#js-about' v-smooth-scroll>{{t('prw.nav_one')}}</a></li>
            <li class=""><a id="pd-prw-footer-nav-2" href='#js-timeline' v-smooth-scroll>{{t('prw.nav_two')}}</a></li>
            <li class=""><a id="pd-prw-footer-nav-3" href='#js-center' v-smooth-scroll>{{t('prw.nav_five')}}</a></li>
            <li class=""><a id="pd-prw-footer-nav-4" href='#js-eligible' @click="emitEligibilityBtnEvent()">{{t('prw.nav_four')}}</a></li>
            <li class=""><a id="pd-prw-footer-nav-5" href='#js-faqs' v-smooth-scroll>{{t('prw.nav_six')}}</a></li>
           <!--<li class=""><a href='#js-share' v-smooth-scroll>{{t('prw.nav_six')}}</a></li> --> 
        </ul>
    </div>
    <copyright-label class="copyright">
        <privacy-policy-link aria-label="Opens new page for Privacy Policy" id="pd-prw-footer-privacy-link" :locale="$i18n.locale">{{t("c_privacy")}}</privacy-policy-link>
    </copyright-label>
</section>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n'
import { logoPath } from '@/config.js';
import CopyrightLabel from '@/modules/components/copyrightlabel/src/CopyrightLabel.vue';
import PrivacyPolicyLink from '@/modules/components/privacypolicylink/src/PrivacyPolicyLink.vue';

const emit = defineEmits(['eligibilityBtnEvent']);

const { t } = useI18n()

// Declare component references
const logo = ref(logoPath);

// Method to get logo URL
const getLogoUrl = (name, ext) => {
  return new URL(`../../../assets/images/${name}.${ext}`, import.meta.url).href;
};

const emitEligibilityBtnEvent = () => {
    emit('eligibilityBtnEvent')
    };
</script>

<style lang="scss">
.prw-footer-section {
    background-color: white;
    padding: 40px 0 0;

    .ui-footer {
        &__link-group {
            display: flex;
            flex-wrap: wrap;
            padding: 0;
            justify-content: center;
    
            @media screen and (min-width: 767px) {}
    
            li {
                list-style: none;
            }
    
            a {
                color: #8a8a8a;
                text-decoration: none;
                padding: 4px 16px;
                font-size: 1rem;
            }
        }
    
        &__logo {
            width: 50%;
            display: block;
            margin: 0 auto 30px;
    
            @media screen and (min-width: 767px) {
                width: 30%;
            }
        }
    }
    
    .copyright {
        display: block;
        margin-top: 40px;
        padding: 16px;
        background: #4E5157;
        color: white;
        text-align: center;
        font-size: 0.85rem;

        .ux-copyright-link {
            color: white;
            text-decoration: none;
        }
    }

}
</style>
