<template>
    <div class="ui-studyCenter">
        <div id="js-map-wrapper" class="map-wrapper">
            <div class="map-details-wrapper">
                <div class="map-details">
                    <div class="ui-max-width">
                        <div class="ui-studyCenter-flex-wrap">
                            <div class="ui-studyCenter-flex-item __image">
                                <fas-svg></fas-svg>
                            </div>
                            <div class="ui-studyCenter-flex-item __content">
                                <ui-head :SubHeadAlign="'__left'">
                                    <template #head>
                                        <h3 v-html="t('prw.smap_head')"></h3>
                                    </template>
                                    <template #subhead>
                                        {{ t("prw.smap_p") }}
                                    </template>
                                </ui-head>
                                <div class="ui-sdc">
                                    <text-input ref="ui_url" class="ui-sdc__input"
                                        :placeholder="t('prw.find_a_site_input_placeholder')" :value="searchTerm"
                                        @inputEvent="setSearchInputValue" @keyupEvent="processEnterKey"></text-input>
                                    <ui-button id="searchSiteBtn" style="line-height: 0;"
                                        class="ux-btn ux-btn--primary" @click="setMapSearchAddress(searchTerm)">{{
                                            t("prw.find_a_site_btn") }}</ui-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <GoogleMap class="google-map" :googleMapApiKey="googleMapApiKey" :sites="mapSites"
                :googleMapOptions="googleMapOptions" :search-term="mapSearchTerm"
                @siteSearchNotFoundEvent="isSiteSearchErrorAlertVisible = true"></GoogleMap>
        </div>

        <modal-layout v-if="isSiteSearchErrorAlertVisible">
            <alert-layout :alertIcon="getImageUrl('eligble-icon.png')"
                @closeAlertEvent="isSiteSearchErrorAlertVisible = false">
                <template #title>{{ t("prw.smap_alert") }}</template>
                <template #body>{{ t("prw.smap_alert_p") }}</template>
            </alert-layout>
        </modal-layout>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { getSites, googleMapApiKey as _googleMapApiKey, gMapOptions as _gMapOptions } from "@/apps/prw/config";
import UiHead from "@/modules/components/head-tab/UiHeading.vue";
import UiButton from "@/modules/components/uibutton/src/UiButton.vue";
import ModalLayout from "@/modules/components/layout/ModalLayout.vue";
import AlertLayout from "@/modules/components/layout/AlertLayout.vue";
import TextInput from "@/modules/components/textinput/TextInput.vue";
import FasSvg from '@/modules/icons/svgs/FindAStudy.vue';
import GoogleMap from '../views/GoogleMap.vue';

// Use vue-i18n for localization
const { t } = useI18n();

// State variables
const isSiteSearchErrorAlertVisible = ref(false);
const searchTerm = ref("");
const mapSearchTerm = ref("");
const searchBtnElm = ref(null);
const googleMapApiKey = _googleMapApiKey;
const googleMapOptions = _gMapOptions;
const mapSites = getSites;

// Methods
const setMapSearchAddress = (searchTermValue) => {
    mapSearchTerm.value = searchTermValue;
};

const getImageUrl = (image) => {
    return new URL(`../assets/images/${image}`, import.meta.url).href;
};

const setSearchInputValue = (value) => {
    searchTerm.value = value;
};

const processEnterKey = (event) => {
    if (event.keyCode === 13) {
        event.preventDefault();
        searchBtnElm.value.click();
    }
};

// Lifecycle hook
onMounted(() => {
    searchBtnElm.value = document.getElementById('searchSiteBtn');  // Manually assign the element if needed
});
</script>

<style lang="scss">
@import "../assets/styles/_settings.scss";

.ui-studyCenter {
    .map-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
        //padding: 40px 0;

        @media only screen and (min-width: 1025px) {
            flex-direction: row;
        }

        .ui-studyCenter-flex-wrap {
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            flex-wrap: wrap;
            // flex-direction: column;

            @media only screen and (min-width: 750px) {
                //flex-direction: row;
            }

            .ui-studyCenter-flex-item.__image {
                width: 30%;
                //max-width: 100px;

                @media only screen and (min-width: 750px) {
                    width: 20%;
                    // max-width: 100%;
                }

                @media only screen and (min-width: 1025px) {
                    width: 25%;
                    // max-width: 100%;
                }
            }

            .ui-studyCenter-flex-item.__content {
                // width: 100%;

                @media only screen and (min-width: 750px) {
                    // width: 75%;
                }
            }
        }

        .map-details-wrapper {
            padding: 24px 16px;
            background: rgb(1, 81, 114);
            background: linear-gradient(0deg, rgba(1, 81, 114, 1) 0%, rgba(1, 126, 163, 1) 100%);

            @media only screen and (min-width: 1025px) {
                width: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .map-details {

                .ui-head,
                .ui-subhead {
                    color: white;
                    margin: 0;
                }

                .ui-head h3 {
                    margin: 0;
                }
            }

        }

        .google-map {
            height: 500px;

            @media only screen and (min-width: 1025px) {
                width: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }



    .ui-sdc {
        border: 2px solid #dfdfdf;
        display: flex;
        padding: 4px;
        border-radius: 4px;
        justify-content: space-between;
        max-width: 550px;
        height: 50px;
        box-sizing: border-box;
        margin-top: 12px;
        background: white;

        @media only screen and (max-width: 767px) {
            width: 100%;
        }

        .input-wrapper {
            flex: 1;

            @media only screen and (max-width: 767px) {}
        }

        &__input {
            input {
                margin: 0;
                border: none;
                box-shadow: none;
                font-size: 16px;
                background: none;
                padding: 8px 16px;

                @media only screen and (max-width: 1023px) {
                    //padding: 12px 2px;
                }

                &:focus {
                    outline: none;
                    border: none;
                    box-shadow: none;
                }
            }
        }
    }
}
</style>