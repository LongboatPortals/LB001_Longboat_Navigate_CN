<template>
    <div id="js-body-wrap" class="body-wrap">
        <header class="options-wrap">
            <a href='#js-video-wrapper' class="skip">Skip to main content</a>
            <ui-button class="ux-btn ux-btn--outline [ mt-2 md:mt-0 md:mr-8 ]" @click="logout">
                {{ $t("cn.log_out_btn") }}
            </ui-button>
            <lang-dropdown class="cn-lang-dropdown" :options="locales" :selectedOption="activeLocaleInDropdown"
                @optionChange="onLocaleOptionSelection" aria-label="Dropdown for selecting language"
                tabindex="0"></lang-dropdown>
        </header>

        <main>
            <div class="banner">
                <div class="banner__image-wrapper">
                    <!--<img class="banner__image" :src="require(`../assets/images/${logoSrc}`)" alt="logo" />-->
                    <img class="banner__image" :src="getLogoUrl(logo.name, logo.extension)" alt="logo" />
                </div>
                <div class="banner__text-wrapper">
                    <div>
                        <h4 class="banner__text-heading" role="heading" aria-label="heading for welcome text"
                            v-html="$t('cn.welcome_text_heading')" tabindex="0"></h4>
                    </div>
                    <div>
                        <p class="banner__text" role="heading" aria-label="heading about the page" aria-level="1"
                            v-html="$t('cn.welcome_text')" tabindex="0"></p>
                    </div>
                </div>
            </div>

            <div id="js-video-wrapper" class="video-wrapper">
                <slot></slot>
                <!--
            <p class="extra-text"  v-html="$t('cn.welcome_text_alt')"></p>
            <p class="hu-text"  v-html="$t('cn.more_text')"></p>
            -->
                <p class="extra-text" v-if="isExtraTextAvailable()" v-html="$t('cn.welcome_text_alt')" role="heading"
                    aria-label="Note heading" aria-level="2" tabindex="0"></p>
            </div>
        </main>

        <footer>
            <copyright-footer class="consent-copyright"><privacy-policy-link :locale="$i18n.locale">{{
                $t("cn.c_privacy") }}</privacy-policy-link></copyright-footer>
        </footer>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import * as utils from '@/modules/components/common/src/utils';
import * as i18n_utils from '@/modules/components/i18n/src/utils';
import { processLogout } from '@/modules/auth/plugins/auth';
import { logoPath, dropdownLocales } from '@/config.js';

// Initialize vue-router and vue-i18n instances
const router = useRouter();
const { t, locale } = useI18n();

// Use defineEmits to define the emit function
const emit = defineEmits(['dropdownLocaleChangeEvent']);

// Reactive properties
const activeLocaleInDropdown = ref(locale.value);
const locales = ref(getLocaleOptions());
const logo = logoPath;

// Helper Functions
function getLocaleOptions() {
    let result = i18n_utils.getSupportedLocales(dropdownLocales, i18n_utils.localelist);
    let mappedResult = [];
    for (let i = 0; i < result.length; i++) {
        mappedResult[i] = utils.renameKeys(result[i], { code: 'value', name: 'text' });
    }
    return mappedResult;
}

function getLogoUrl(name, ext) {
    return new URL(`../../../assets/images/${name}.${ext}`, import.meta.url).href;
}

function isExtraTextAvailable() {
    return t('cn.welcome_text_alt') !== 'cn.welcome_text_alt';
}

function onLocaleOptionSelection(newLocale) {
    locale.value = newLocale;
    utils.setHtmlElementLangAttribute(newLocale);
    utils.addLocaleToHtmlElementClass("lang-" + newLocale);
    utils.setPageTitle(t('cn.site_title'));
    utils.setCurrentLocale({ global: { locale } }, newLocale); // Pass i18n instance
    utils.updateLocaleCodeInURL(router, newLocale); // Pass router instance
    emit('dropdownLocaleChangeEvent');
}

function logout() {
    processLogout(utils.redirectTo(router, '/login'));
}

onMounted(() => {
    // Set page title on mount
    utils.setPageTitle(t('cn.site_title'));
});
</script>

<style lang="scss">
@import "../assets/styles/settings.scss";

/* ================= Mobile-first styles  ===================== */

.body-wrap {
    @include body-wrap-bg;
    padding: 0 16px 10px;
    position: relative;

    .footer-wrapper {
        max-width: 1260px;
        padding: 1000px 40px 50px;
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
        bottom: 0;
    }

    .options-wrap {
        position: absolute;
        top: 24px;
        left: 0;
        right: 0;
        display: flex;
        justify-content: space-between;
        margin: auto;
        transition: all 0.5s;
        z-index: 99;
        padding: 0 16px;
        flex-wrap: wrap;
        align-items: flex-start;
        //align-items: stretch;
        flex-direction: column-reverse; // for 500px screens and below

        @media screen and (max-width: 500px) {
            align-items: stretch;
        }


        .lang-dropdown {
            width: 100%; // for 500px screens and below
            text-align: center;
            padding-right: 1em;
            margin-bottom: 8px;
            /*
            @media screen and (min-width: 500px) {
                width: initial;
                text-align: left;
                padding-right: 2.5em;
                margin-bottom: 0;
            }
            */
        }
    }

    .cn-lang-dropdown {

        @media screen and (max-width: 500px) {
            text-align: center;
        }
    }



    .banner {
        display: flex;
        flex-direction: column;
        padding: 140px 0 0;

        &__text-wrapper {
            border-bottom-right-radius: 12px;
            padding: 10px 0;
            @include banner__text-wrapper;

            div {
                overflow: hidden;
            }
        }

        &__text-heading {
            color: $primary-color;
            text-align: left;
            font-size: 1.5rem;
            font-weight: 400;
            line-height: 1.5;
            margin-top: 0;
            margin-bottom: 20px;
        }

        &__text {
            color: $text-color;
            text-align: initial;
            text-align: left;
        }

        &__image {
            @include consent-page__logo;
        }

        &__image-wrapper {

            @media screen and (max-width: 800px) {
                text-align: center;
            }
        }
    }


    .extra-text,
    .hu-text {
        text-align: left;
        margin-bottom: 100px;
    }

    .hu-text {
        display: none;
    }





    /* ================= Screen size 500px and above styles  ===================== */

    @media screen and (min-width: 500px) {
        .options-wrap {
            flex-direction: row;
            align-items: stretch;

            .lang-dropdown {
                width: initial;
                text-align: left;
                padding-right: 2.5em;
                margin-bottom: 0;
            }

            .logout-btn {
                width: initial;
            }

            .ux-select {
                background-position: calc(100% - 19px) calc(1em + 2px), calc(100% - 14px) calc(1em + 2px), calc(100% - -106.5em) -44.5em;
            }
        }
    }


    /* ================= Screen size 1000px and above styles  ===================== */

    @media screen and (min-width: 1000px) {
        .options-wrap {
            justify-content: flex-end;
            top: 24px;
            right: 40px;

            .logout-btn {
                margin-right: 30px;
                min-width: 150px;
            }
        }


        .video-wrapper {
            max-width: 800px;
            margin: auto;
            position: relative;
            top: -100px;
        }

        .banner {
            flex-direction: row;
            max-width: 1250px;
            margin: auto;
            padding: 0;

            &__image-wrapper,
            &__text-wrapper {
                padding-top: 200px;
                padding-bottom: 200px;
            }

            &__image-wrapper {
                overflow: hidden;
                width: 57%;
                position: relative;
                right: -5px;
                display: flex;
                flex-direction: column;
                //padding-top: 200px;
                align-items: center;
                justify-content: center;
            }

            &__text-wrapper {
                width: 43%;
                top: 0;
                left: -5px;
                padding-left: 100px;
                padding-right: 100px;
                //background: rgb(255 255 255 / 51%);
                box-shadow: $box-shadow;
            }

            &__text-heading {
                font-size: 2.25rem;
                margin-bottom: 32px;
            }

            &__text {
                max-width: 480px;
                margin: auto;
                font-size: 1.5rem;
            }
        }

        .extra-text {
            font-size: 1.5rem;
        }
    }


    /*-- ==========================================================================
                                    ANIMATION ⬇
==========================================================================  */

    .animate {
        .options-wrap {
            opacity: 0;
            transform: translateY(-300px);
        }

        .banner {
            &__text-wrapper {
                opacity: 0;
                transform: translateY(-850px);
            }

            &__text-heading,
            &__text {
                opacity: 0;
                transform: translateX(-500px);
            }

            &__image {
                opacity: 0;
                transform: translateX(500px);
            }
        }
    }

    .scroll-animate {
        & .js-scroll {
            opacity: 0;
            transform: translateY(50%);
            //background-color: #DADADA;
            transition: all 1s;
            transition-timing-function: cubic-bezier(0.25, 1, 0.5, 1);
        }

        & .js-scroll.scrolled {
            opacity: 1;
            transform: translateY(0);
            //background-color: aquamarine;
        }
    }

    .banner {
        &__image {
            opacity: 1;
            transform: translateX(0);
            transition: all 1s;
            transition-timing-function: ease-in-out;
            transition-delay: 0.5s;
        }

        &__text-heading,
        &__text {
            transform: translateX(0px);
            transition: all 1s;
            transition-timing-function: ease-in-out;
            transition-delay: 0.5s;
        }

        &__text-wrapper {
            opacity: 1;
            transform: translateY(0);
            transition: all 0.5s;
            transition-timing-function: ease-in-out;
        }
    }

    .options-wrap {
        opacity: 1;
        transform: translateY(0);
        transition: all 0.5s;
        transition-timing-function: ease-in-out;
        //transition-delay: 0.5s;
    }

    footer {
        text-align: center;
        margin-bottom: 30px;
        font-size: 14px;

        @media screen and (min-width: 1000px) {
            position: absolute;
            left: 0;
            bottom: 0;
            right: 30px;
            left: auto;
        }
    }

    .video__title {
        margin: 0;
        margin-bottom: 12px;
        font-weight: bold;
        font-size: 1.25rem;
        line-height: 140%;
        color: #4e5157;
        width: 100%;
        text-align: left;
        margin-bottom: 12px;
    }

    .video__subtitle {
        font-weight: 400;
        line-height: 130%;
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
    font-weight: 700;

}

.skip:focus {
    left: 45%;
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
        left: 175px;
        top: 84px;
        padding: 8px 5px;
        text-align: center;
    }
}
</style>
