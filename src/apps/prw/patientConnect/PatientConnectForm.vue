<template>
    <div class="ui-pc" style="height: 100%">
        <!-- Display Success Message Inline -->
        <template v-if="isFormSubmissionSuccessAlertVisible">
            <div class="" style="display: flex; align-items: center;">
                <ui-head class="txt-center">
                    <template #head>
                        <success-svg class="alert-icon" style="width: 200px"></success-svg>
                        {{ $t('prw.pc_success_h') }}
                    </template>
                    <template #subhead>{{ $t('prw.pc_success') }}</template>
                </ui-head>
            </div>
        </template>

        <!-- Display Error Message Inline -->
        <template v-if="isFormSubmissionErrorAlertVisible">
            <div class="" style="display: flex; align-items: center;">
                <ui-head class="txt-center">
                    <template #head>
                        <failure-svg class="alert-icon" style="width: 200px"></failure-svg>
                        {{ $t('prw.pc_errorh1') }}
                    </template>
                    <template #subhead>
                        {{ $t('prw.pc_errorp') }}
                        <p v-html="$t('prw.pc_errorp1')"></p>
                    </template>
                </ui-head>
            </div>
        </template>

        <div v-if="!isFormSubmissionSuccessAlertVisible && !isFormSubmissionErrorAlertVisible">
            <div class="ui-max-width ui-pc__content" style="height: 100%">
                <div id="js-ui-pc-body" class="ui-pc__body">


                    <elig-svg style="width: 100px;"></elig-svg>
                    <p class="ui-pc__title">{{ $t("prw.pc_heading") }}</p>
                    <p class="ui-pc__intro-text" v-html="$t('prw.pc_intro_text')"></p>

                    <div class="ui-pc__form-wrapper">
                        <div v-if="loading" class="spinner-overlay">
                            <div class="spinner"></div>
                        </div>


                        <transition name="fade" mode="out-in">
                            <div v-if="currentStep === 2">
                                <div class="underline-wrapper">
                                    <h2 class="ui-pc__form-title-alt">{{ $t("prw.pc_form_title2") }}</h2>
                                    <button @click="goToStep(1)" class="ux-btn ux-btn--primary">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            class="icon icon-tabler icon-tabler-arrow-left" width="24" height="24"
                                            viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                            stroke-linecap="round" stroke-linejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <line x1="5" y1="12" x2="11" y2="18"></line>
                                            <line x1="5" y1="12" x2="11" y2="6"></line>
                                        </svg>
                                        {{ $t("prw.pc_change_selected_site") }}
                                    </button>
                                </div>

                                <p>{{ $t('prw.pc_siteSelectedInstruction') }}</p>

                                <div id="js-selected-site-details" ref="selectedSiteDetails">
                                    <div class="selected-site-details" v-if="selectedSite !== null">
                                        <div class="selected-site-details__icon">
                                            <site-svg style="width: 80px;"></site-svg>
                                        </div>
                                        <div class="selected-site-details__text">
                                            <h3 class="gm-heading">{{ selectedSite.name }}</h3>
                                            <div id="bodyContent">
                                                <p>{{ selectedSite.address }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <form id="patient-connect-form" class="ui-pc__form"
                                    @submit.prevent="submitForm(form, eligibilityForm)">
                                    <h2 class="ui-pc__form-title">{{ $t("prw.pc_form_title1") }}</h2>

                                    <div class="two-col-flex">
                                        <text-input id="pd-pc-name-input" class="ui-pc__form-input"
                                            :placeholder="$t('prw.pc_name_placeholder')" name="name" :value="form.name"
                                            @inputEvent="onNameInput">
                                            <template #label><b>{{ $t("prw.pc_name") }}</b></template>
                                            <template v-if="v$.form.name.$error" #error-msg>
                                                <i class="input-error-icon fas fa-exclamation-circle"></i>
                                                {{ $t("prw.pc_name_error") }}
                                            </template>
                                        </text-input>

                                        <text-input id="pd-pc-number-input" class="ui-pc__form-input" inputType="tel"
                                            :placeholder="$t('prw.pc_tel_placeholder')" name="phone" :value="form.sms"
                                            @inputEvent="onSmsInput">
                                            <template #label><b>{{ $t("prw.pc_tel") }}</b></template>
                                            <template v-if="v$.form.sms.$error" #error-msg>
                                                <i class="input-error-icon fas fa-exclamation-circle"></i>
                                                {{ $t("prw.pc_tel_error") }}
                                            </template>
                                        </text-input>
                                    </div>

                                    <div class="two-col-flex">
                                        <text-input id="pd-pc-email-input" class="ui-pc__form-input" inputType="email"
                                            :placeholder="$t('prw.pc_email_placeholder')" name="email"
                                            :value="form.email" @inputEvent="onEmailInput">
                                            <template #label><b v-html="$t('prw.pc_email')"></b></template>
                                            <template v-if="v$.form.email.$error" #error-msg>
                                                <i class="input-error-icon fas fa-exclamation-circle"></i>
                                                {{ $t("prw.pc_email_error") }}
                                            </template>
                                        </text-input>

                                        <div id="pd-pc-contact-time" class="dropdown ui-pc__form-input">
                                            <label class="dropdown__label" for="locations"><b>{{
                                                $t('prw.pc_preferred_contact_time') }}</b></label>
                                            <select id="locations" aria-label="Select location" class="dropdown__select"
                                                v-model="form.preferredContactTime"
                                                @change="onPreferredContactTimeSelect">
                                                <option value="select">{{ $t('prw.pc_preferred_contact_time') }}
                                                </option>
                                                <option value="morning">{{ $t('prw.pc_morning') }}</option>
                                                <option value="afternoon">{{ $t('prw.pc_afternoon') }}</option>
                                                <option value="evening">{{ $t('prw.pc_evening') }}</option>
                                            </select>
                                            <div class="input-alert-error" v-if="v$.form.preferredContactTime.$error">
                                                <i class="input-error-icon fas fa-exclamation-circle"></i>
                                                {{ $t("prw.pc_preferred_contact_time_error") }}
                                            </div>
                                        </div>
                                    </div>

                                    <div class="ui-pc__consent-text" v-html="$t('prw.pc_consent_text')"></div>
                                    <consent-box id="pd-pc-consent" :value="form.consent"
                                        @onConsentBoxChecked="onConsentChecked">
                                        <span v-html='$t("prw.pc_consent_agree")'></span>
                                        <template v-if="v$.form.consent.$error" #error-msg>
                                            <i class="consent-error-icon fas fa-exclamation-circle"></i>
                                            {{ $t("prw.pc_consent_error") }}
                                        </template>
                                    </consent-box>

                                    <centered-layout class="submit-btn-layout">
                                        <ui-button id="pd-pc-submit-btn" :isDisabled="v$.form.$invalid"
                                            class="ux-btn ux-btn--primary">
                                            {{ $t("prw.pc_submit") }}
                                        </ui-button>
                                    </centered-layout>

                                    <div v-if="loading" class="spinner-overlay">
                                        <div class="spinner"></div>
                                    </div>
                                </form>
                            </div>
                        </transition>

                        <transition name="fade" mode="out-in">
                            <div v-if="currentStep === 1">
                                <h2 class="ui-pc__form-title">{{ $t("prw.pc_form_title2") }}</h2>
                                <p>{{ $t('prw.pc_siteSelectInstruction') }}</p>

                                <div class="toggle-button-wrapper">
                                    <button class="ux-btn ux-btn--primary toggle-button"
                                        :class="{ 'fixed-button': isButtonOutOfView }" @click="toggleViewAndScroll"
                                        ref="toggleButton">
                                        <template v-if="isMapView">
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                class="icon icon-tabler icon-tabler-list" width="24" height="24"
                                                viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                                stroke-linecap="round" stroke-linejoin="round"
                                                style="margin-right: 8px;">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <line x1="9" y1="6" x2="20" y2="6" />
                                                <line x1="9" y1="12" x2="20" y2="12" />
                                                <line x1="9" y1="18" x2="20" y2="18" />
                                                <line x1="5" y1="6" x2="5" y2="6.01" />
                                                <line x1="5" y1="12" x2="5" y2="12.01" />
                                                <line x1="5" y1="18" x2="5" y2="18.01" />
                                            </svg>
                                            {{ $t("prw.pc_listView_label") }}
                                        </template>
                                        <template v-else>
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                class="icon icon-tabler icon-tabler-map" width="24" height="24"
                                                viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                                stroke-linecap="round" stroke-linejoin="round"
                                                style="margin-right: 8px;">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <polyline points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21 3 6" />
                                                <line x1="9" y1="3" x2="9" y2="18" />
                                                <line x1="15" y1="6" x2="15" y2="21" />
                                            </svg>
                                            {{ $t("prw.pc_mapView_label") }}
                                        </template>
                                    </button>
                                </div>

                                <!-- Display the list of sites -->
                                <div v-if="!isMapView" class="list-view" ref="listSection">
                                    <div class="ui-pc-studyCenter">
                                        <div class="ui-pc-studyCenter__listView">
                                            <div class="search-container">
                                            <select-dropdown id="country-dropdown" class="ui-pc__form-input"
                                                :value="form.country" @change="onCountrySelect"
                                                :options="formattedCountries" labelFor="country-dropdown"
                                                ariaLabel="Select location">
                                                <template #select-text>{{ $t("prw.pc_all_sites") }}</template>
                                            </select-dropdown>
                                            <div class="search-input-wrapper">
                                                <input
                                                    type="text"
                                                    class="ui-input search-input"
                                                    v-model="searchQuery"
                                                    :placeholder="$t('prw.pc_search_placeholder')"
                                                    aria-label="Search sites"
                                                />
                                                <button
                                                    v-if="searchQuery"
                                                    @click="clearSearch"
                                                    class="cancel-button"
                                                    aria-label="Clear search"
                                                >
                                                    x
                                                </button>
                                            </div>
                                        </div>

                                            <div class="table-container">
                                                <table class="responsive-table">
                                                    <tbody>
                                                        <tr v-for="(site, sIndex) in filteredSites" :key="'site' + sIndex"
                                                            @click.prevent="populateSite(site, $event)">
                                                            <td class="site-title-cell" style="width:60%">
                                                                <i class="fa-solid fa-location-dot [ mr-2 ]"></i>
                                                                {{ site.name }}
                                                            </td>
                                                            <td>{{ site.address }}</td>
                                                            <td class="arrow-cell">
                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                    class="icon icon-tabler icon-tabler-arrow-right hover-arrow"
                                                                    width="24" height="24" viewBox="0 0 24 24"
                                                                    stroke-width="2" stroke="currentColor" fill="none"
                                                                    stroke-linecap="round" stroke-linejoin="round">
                                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none">
                                                                    </path>
                                                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                                                    <line x1="13" y1="18" x2="19" y2="12"></line>
                                                                    <line x1="13" y1="6" x2="19" y2="12"></line>
                                                                </svg>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Display the map view -->
                                <div v-if="isMapView" class="map-view">
                                    <GoogleMap :googleMapApiKey="googleMapApiKey" :sites="getSites"
                                        :googleMapOptions="gMapOptions" :showSearchInput="true" class="mini-map"
                                        @mapSiteSelectEvent="populateSite"></GoogleMap>
                                </div>
                            </div>
                        </transition>

                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n'
import { patientConnectUrl, patientConnectHeaders } from "./config.js";
import { getSites, googleMapApiKey, gMapOptions } from "@/apps/prw/config";
import UiButton from '@/modules/components/uibutton/src/UiButton.vue';
import CenteredLayout from '@/modules/components/layout/CenteredLayout.vue';
import TextInput from "@/modules/components/textinput/TextInput.vue";
import ConsentBox from "@/modules/components/consentselect/ConsentBox.vue";
import SelectDropdown from "@/modules/components/uiselect/src/UiSelectClassic.vue";
import UiHead from '@/modules/components/head-tab/UiHeading.vue'
import { useVuelidate } from '@vuelidate/core';
import successSvg from '@/modules/icons/svgs/SuccessSvg.vue';
import failureSvg from '@/modules/icons/svgs/FailureSvg.vue';
import siteSvg from '@/modules/icons/svgs/SelectedSite.vue';
import eligSvg from '@/modules/icons/svgs/amiEligible.vue';
import GoogleMap from '../views/GoogleMap.vue';
import { required, email, sameAs } from '@vuelidate/validators';
import { phoneNumber } from './validators';
import countries from './sites/data.js';
import axios from "axios";


// Custom validator to check if the selected value is not "select"
const notSelect = value => {
    return value !== 'select';
};
const { locale } = useI18n()

const { eligibilityForm } = defineProps({
    eligibilityForm: {
        type: Array,
        required: true,
    }
});


const form = reactive({
    name: '',
    sms: '',
    email: '',
    site: null,
    country: null,
    preferredContactTime: 'select',
    consent: null,
});

const currentStep = ref(1);
const selectedSite = ref(null);
const sites = ref([]);
const isMapView = ref(false);
const isButtonOutOfView = ref(false);
const loading = ref(false);
const isFormSubmissionSuccessAlertVisible = ref(false);
const isFormSubmissionErrorAlertVisible = ref(false);
const searchQuery = ref('');

// Computed property for filtering sites based on search query
const filteredSites = computed(() => {
    if (!searchQuery.value) return sites.value;
    const query = searchQuery.value.toLowerCase();
    return sites.value.filter(site =>
        site.name.toLowerCase().includes(query) || site.address.toLowerCase().includes(query)
    );
});


// Method to clear the search input and reset the displayed list
const clearSearch = () => {
    searchQuery.value = '';
};

const v$ = useVuelidate({
    form: {
        name: { required },
        sms: { required, phoneNumber },
        email: { email },
        site: { required },
        preferredContactTime: { required, notSelect },
        consent: { sameAs: sameAs(true) },
    },
}, { form });



const formattedCountries = computed(() => countries.map(country => ({
    name: country.name,
    id: country.name,
})));

const goToStep = step => {
    currentStep.value = step;

    // Scroll to the top when showing step 2 (eligibility section)
    if (step === 2) {
        // Ensure a slight delay for smooth transition before scrolling
        setTimeout(() => {
            const element = document.getElementById("js-ui-pc-body");
            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }, 100);
    }
};

const toggleViewAndScroll = () => {
    isMapView.value = !isMapView.value;

    // Scroll to the map section when the map view is enabled
    if (isMapView.value) {
        setTimeout(() => {
            const mapSection = document.querySelector(".map-view");
            if (mapSection) {
                mapSection.scrollIntoView({ behavior: "smooth" });
            }
        }, 100); // Small delay to ensure transition
    } else {
        // Scroll to the list section when the list view is enabled
        setTimeout(() => {
            const listSection = document.querySelector(".list-view");
            if (listSection) {
                listSection.scrollIntoView({ behavior: "smooth" });
            }
        }, 100);
    }
};


const onCountrySelect = event => {
    form.country = event.target.value;
    const selectedCountryId = event.target.selectedIndex;
    sites.value = selectedCountryId !== 0 ? countries[selectedCountryId - 1].states : extractAllSites(countries);
    form.site = '';
};



const populateSite = async site => {
    loading.value = true;
    await new Promise(resolve => setTimeout(resolve, 1000));
    selectedSite.value = { ...site };
    form.site = String(site.id);
    goToStep(2);
    loading.value = false;
};

const extractAllSites = countries => {
    return countries.reduce((acc, country) => acc.concat(country.states), []);
};

function getUtmSource() {
    let urlVars = getUrlVars();
    var utmSource = urlVars["utm_source"];
    var utmMedium = urlVars["utm_medium"];
    var utmCampaign = urlVars["utm_campaign"];
    var utmId = urlVars["utm_id"];
    var utmContent = urlVars["utm_content"];

    var sources = sieveUtmProp('utm_source=', utmSource) +
        sieveUtmProp('utm_medium=', utmMedium) +
        sieveUtmProp('utm_campaign=', utmCampaign) +
        sieveUtmProp('utm_id=', utmId) +
        sieveUtmProp('utm_content=', utmContent);

    return sources;

    // Check if a UTM property is undefined or has a value
    function sieveUtmProp(fieldProp, fieldValue) {
        if (fieldValue !== undefined) {
            return ' ' + fieldProp + fieldValue + ',';
        }
        return '';
    }

    // Get URL variables
    function getUrlVars() {
        let vars = {};
        window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
            vars[key] = value;
        });
        return vars;
    }
}

function getFormQueAndAnswerField(eligibilityForm) {

    var queAndAnswer = []

    eligibilityForm.forEach((formFields, index) => {
        queAndAnswer.push({
            question_id: index + 1,
            question_text: formFields.field_name,
            question_answer: formFields.field_data
        });
    })
    return queAndAnswer
}

function getPatientConnectUrl() {
    const isPatientConnectLocal = import.meta.env.VITE_APP_BYPASS_CORS;
    return isPatientConnectLocal === "false" ? patientConnectUrl.absolutePath : patientConnectUrl.rel;
}

// Post form data
async function submitForm(form, eligibilityForm) {
    const isFormInvalid = v$.value.form.$invalid;

    if (isFormInvalid) {
        console.log("form is invalid");
        return;
    }

    // Set loading to true when submission starts
    loading.value = true;

    console.log("form is valid");

    let formData = {
        language: locale.value,
        name: form.name,
        sms: form.sms,
        email: form.email,
        site: form.site,
        source: getUtmSource(),
        questions: getFormQueAndAnswerField(eligibilityForm),
    };

    console.log("this is the form data: ", JSON.stringify(formData));

    axios.post(getPatientConnectUrl(), formData, {
        headers: patientConnectHeaders
    })
        .then(res => {
            console.log("this is the response: ", res);
            isFormSubmissionSuccessAlertVisible.value = true; 
            isFormSubmissionErrorAlertVisible.value = false; 
        })
        .catch(error => {
            console.log("error just occurred: ", error);
            isFormSubmissionSuccessAlertVisible.value = false;
            isFormSubmissionErrorAlertVisible.value = true;
        })
        .finally(() => {
            // Always perform this action
            // Set loading to false when submission ends (whether success or failure)
            loading.value = false;

        });
}


const onPreferredContactTimeSelect = () => {
    v$.value.form.preferredContactTime.$touch();
};


function onNameInput(value) {
    form.name = value;
    v$.value.form.name.$touch();
}

function onSmsInput(value) {
    form.sms = value;
    v$.value.form.sms.$touch();
}

function onEmailInput(value) {
    form.email = value;
    v$.value.form.email.$touch();
}

function onConsentChecked(value) {
    form.consent = value;
    v$.value.form.consent.$touch();
}


onMounted(() => {
    sites.value = extractAllSites(countries);
});
</script>


<style lang="scss">
@import "../assets/styles/_settings.scss";

.ui-pc {
    background-color: white;
    display: flex;
    justify-content: center;

    &__form-input {
        width: 100%;

        @media only screen and (min-width: 676px) {
            width: 50%;
            margin-bottom: 24px;
        }
    }

    &__find-study-form-tabBtns {
        display: flex;
        justify-content: center;
        margin-bottom: 16px;
    }

    &__consent-text {
        margin: auto;
        margin-top: 46px;
        line-height: 1.5;

        ul {
            list-style-type: circle;
            margin: 0;
            padding: 0 12px;
        }

        li {
            font-size: 12px;
            margin-bottom: 0;
        }

        &,
        ul,
        li {
            font-size: 14px;
            line-height: 1.6;
        }
    }

    &__header {
        position: relative;
    }

    &__status {
        width: 80px;
        height: 80px;
        background-color: #92d400;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        margin: 0 auto;
        bottom: -40px;
    }

    &__title {
        font-size: 30px;
        margin-top: 12px;
        margin-bottom: 12px;
        text-align: center;
        color: #6e6e6e;
        text-transform: capitalize;
        font-weight: 600;
        letter-spacing: 1px;
    }

    &__content {

    }

    &__body {
        padding: 60px 0 100px 0;
        text-align: center;
        background: #ffffff;
        box-sizing: border-box;


        .privacy-link {
            color: $accent-color !important;
        }
    }

    &__intro-text {
        padding: 0 16px;
        margin-top: 0;
        max-width: 810px;
        margin: auto;
    }

    &__form-wrapper {
        max-width: 960px;
        margin: 0 auto;
        text-align: initial;
        padding: 16px;
    }

    &__form {
        max-width: 960px;
        margin: 0 auto;
        text-align: left;
        margin-top: 16px;

        &-input {
            

            .dropdown__label {
                margin-bottom: 0;
            }
        }

        /*
        .dropdown__select,
        .ui-input {
            border: 1px solid #dfdfdf;
            color: #383838;
            line-height: 1.5rem;
        }

        .ui-input__label,
        .dropdown__label {
            margin-bottom: 4px;
        }
            */

        &-title {
            border-bottom: 2px solid $secondary-color;
            padding-bottom: 8px;
            margin-bottom: 8px;
        }

        &-title-alt {
            margin-bottom: 0;
        }

        label.ui-custom-checkbox {
            font-size: 15px;
            display: inline-block;
        }
    }

    .two-col-flex {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        align-items: flex-start;

        >* {
            width: 100%;
            margin-top: 20px;
            margin-bottom: 0;

            @media only screen and (min-width: 676px) {
                width: 48%;
            }
        }
    }

    .flex-35 {
        width: 100%;

        @media only screen and (min-width: 1025px) {
            width: 35%;
        }
    }

    .flex-55 {
        width: 100%;

        @media only screen and (min-width: 1025px) {
            width: 55%;
        }
    }

    hr {
        border: 0;
        height: 1px;
        width: 10%;
        position: relative;
        margin: 30px auto;
        overflow: visible;

        &.center-ball {
            background: $primary-color;

            &:before {
                content: "";
                width: 6px;
                height: 6px;
                background: $primary-color;
                display: inline-block;
                border: 2px solid $primary-color;
                border-radius: 50%;
                position: absolute;
                top: -4px;
                left: 50%;
                margin: 0 0 0 -3px;
            }
        }
    }

    .submit-btn-layout {
        padding: 16px 0;
    }

    .mini-map {
        height: 500px;

        #bodyContent {
            p {
                line-height: 21px !important;
                margin-bottom: 8px !important;
            }

            button {
                width: 100%;
                margin-top: 8px;
                font-size: 1.2em;
            }
        }

        .optional-details {
            display: none;
        }
    }

    .selected-site-details {
        margin-top: 16px;
        padding: 24px 32px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
        flex-direction: column;

        @media only screen and (min-width: 500px) {
            flex-direction: row;
        }

        &__icon {
            @media only screen and (min-width: 500px) {
                margin-right: 24px;
                border-right: 1px solid #dfdfdf;
                padding-right: 24px;
            }
        }

        .gm-heading {
            margin: 0 0 8px 0;
            color: $primary-color;
        }

        p {
            font-size: 16px;
            margin-bottom: 8px;
        }

        p:last-child {
            margin-bottom: 0;
        }
    }

    .populate-pc-form {
        display: initial !important;
    }

    #pd-pc-consent {
        text-align: center;
        margin-top: 8px;
    }
}

.ui-pc-studyCenter {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 16px;

    @media only screen and (min-width: 1025px) {
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
    }

    &__listView {
        width: 100%;
    }
}

.container {
    padding: 20px;
}

.toggle-button-wrapper {
    display: flex;
    justify-content: right;
    margin-top: 20px;
}

.toggle-button {
    padding: 8px 12px;
    font-size: 16px;
    position: relative;
    transition: position 0.3s ease;
    display: flex;
    align-items: center;
}

.fixed-button {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
}

.list-view {
    margin-top: 20px;
    background-color: #fafafa;
    padding: 12px 16px;
    border-radius: 10px;
}

.map-view {
    margin-top: 20px;
}

.map-view,
.list-view {
    height: 500px;
    box-sizing: border-box;
}

/* Table styling */
.table-container {
    max-height: 350px;
    overflow-y: auto;
    overflow-x: auto;
    margin-bottom: 32px;
}

.responsive-table {
    width: 100%;
    border-collapse: collapse;

    svg {
        stroke: $tertiary-color;
    }

    .site-title-cell {
        color: $primary-color;
        min-width: 200px;

        i {
            margin-right: 4px;

            @media only screen and (min-width: 768px) {
                margin-right: 16px;
            }
        }
    }

    .arrow-cell {
        display: none;

        @media only screen and (min-width: 768px) {
            display: table-cell;
            vertical-align: middle;
            opacity: 0;
            transition: opacity 0.3s ease-out, transform 0.3s ease-out;
        }
    }

    tr:hover .arrow-cell {
        opacity: 1;
    }

    .hover-arrow {
        transition: transform 0.3s ease-out;
        transform: translateX(-10px);
        display: inline-block;
        vertical-align: middle;
    }

    tr:hover .hover-arrow {
        transform: translateX(0);
    }

    thead th {
        background-color: #efefef;
        text-align: left;
        padding: 8px;
        font-weight: bold;
    }

    tr {
        transition: background-color 0.3s ease, color 0.3s ease;

        &:hover {
            background-color: color.adjust($tertiary-color, $lightness: 65%);
            cursor: pointer;
        }
    }

    td {
        padding: 20px 16px;
        border-bottom: 1px solid #ddd;
    }

    @media only screen and (max-width: 768px) {

        &,
        thead,
        tbody,
        th,
        td,
        tr {
            display: block;
        }

        thead {
            position: absolute;
            top: -9999px;
            left: -9999px;
        }

        tr {
            margin-bottom: 16px;
            border: 1px solid #ddd;
            padding: 8px;
            border-radius: 8px;
            background-color: #fff;
        }

        td {
            border: none;
            padding: 4px;
            text-align: left;
        }
    }
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.spinner-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

.spinner {
    border: 8px solid rgba(0, 0, 0, 0.1);
    border-top: 8px solid #3498db;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.underline-wrapper {
    display: flex;
    border-bottom: 2px solid #3f92a9;
    padding-bottom: 8px;
    margin-bottom: 8px;
    flex-direction: column;

    @media only screen and (min-width: 550px) {
        flex-direction: row;
        align-items: flex-end;
        justify-content: space-between;
    }

    button {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 45px;
        margin: 8px 0;

        @media only screen and (min-width: 550px) {
            margin: 0;
        }
    }
}

.spinner-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

.spinner {
    border: 8px solid rgba(0, 0, 0, 0.1);
    border-top: 8px solid #3498db;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>

<style lang="scss">

.ui-pc-studyCenter__controls {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    align-items: center;
}

.search-container {
    display: flex;
    flex-direction: row;
    gap: 16px;
    flex-wrap: wrap;
    width: 100%;
}

.search-input-wrapper {
   // display: flex;
    position: relative;
    flex: 1;
    margin-bottom: 24px;

    @media only screen and (min-width: 676px) {
        margin-bottom: 0;
    }
}

.search-input {
    width: 100%;
    padding: 10px 16px;
}

.cancel-button {
    position: absolute;
    right: 8px;
    top: 25%;
   // transform: translateY(-50%);
    border: none;
    background: transparent;
    cursor: pointer;
    font-size: 16px;
    color: #333;

    @media only screen and (min-width: 676px) {
        top: 15%;
    }
}
</style>