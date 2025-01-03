<template>
    <section class=" eligibility-section" style=" border-radius: 5px">

         <!-- Pre-Screener form-->
        <div v-if="!isPatientConnectFormVisible" class="ui-scroller" style="height: 100%; overflow: auto; padding: 0 16px 0 16px">

            <span class="ui-close-btn" @click="closeForm">&times;</span>

            <div class="centered-modal">
                
                    <template v-if="!isInEligibilityAlertVisible">
                        <ui-head class="txt-center" style="padding-top:32px">
                            <template #head>
                                <h3 v-html="$t('prw.elig_head')" tabindex="0"></h3>
                            </template>
                            <template #subhead>{{ $t('prw.elig_head_p') }}</template>
                        </ui-head>
                        <form id="eligibility-form" @submit.prevent="processEligibility(eligibilityForm)">
                            <!-- Eligibility questions -->
                            <question-tab v-for="(item, fIndex) in eligibilityForm" :id="'que-' + fIndex"
                                :key="'que' + fIndex" :isActive="item.isActive" class="ui-question-tab"
                                :class="{ 'last-tab': eligibilityForm.length == fIndex + 1 }">
                                <template #text>{{ item.question }}</template>
                                <template #options>
                                    <div class="select-options">
                                        <select-button v-for="(choice, index) in item.choices" :key="'sel' + index"
                                            class="select-btn" :label="fIndex + choice.value"
                                            :groupName="'que' + fIndex" :value="choice.value"
                                            :englishValue="choice.englishValue"
                                            @choiceChange="processChoice(fIndex, $event)">
                                            {{ choice.text }}
                                        </select-button>
                                    </div>
                                </template>
                            </question-tab>

                            <consent-box
                                style="display: flex; margin-bottom: 30px; margin-top: 8px; padding: 8px 0 120px 0"
                                @onConsentBoxChecked="onConsentChange($event)">
                                <span v-html="$t('prw.pre-screening_consent')" />
                            </consent-box>

                            <!-- Progress bar and submit button -->
                            <div class="fixed-bottom-container">
                                <div class="progress-bar">
                                    <p>{{ answeredCount }} of {{ eligibilityForm.length }} {{ $t('prw.answerd_label') }}
                                    </p>
                                    <div class="progress-bar__container">
                                        <div class="progress-bar__fill" :style="{ width: progressPercentage + '%' }">
                                        </div>
                                    </div>
                                </div>

                                <centered-layout>
                                    <ui-button id="pd-pc-check-elig-btn" :isDisabled="!isEligButtonEnabled"
                                        type="submit" class="ux-btn ux-btn--primary">
                                        {{ $t('prw.check_elig') }}
                                    </ui-button>
                                </centered-layout>
                            </div>
                        </form>
                    </template>

                    <!-- Non-eligible message -->
                    <template v-if="isInEligibilityAlertVisible">
                        <div class="ineligible-message">
                            <ui-head class="txt-center">
                                <template #head>
                                    <elig-svg class="alert-icon" style="width: 200px"></elig-svg>
                                    {{ $t('prw.not_eligible') }}
                                </template>
                                <template #subhead>{{ $t('prw.not_eligible_desc') }}</template>
                            </ui-head>
                            <ui-button @click="closeForm" class="ux-btn ux-btn--primary">
                                {{ $t('prw.close') }}
                            </ui-button>
                        </div>
                    </template>
                
            </div>
        </div>

         <!-- Patient Connect -->
        <div v-if="isPatientConnectFormVisible" class="ui-scroller" style="height: 100%; overflow: auto; padding: 0 16px 0 16px">
            <span class="ui-close-btn" @click="closeForm">&times;</span>
            <div class="centered-modal">
                <!-- Patient Connect form inside the same modal -->
                <div class="ui-pc-wrapper" style="height: 100%">
                    <patient-connect class="slideup" :eligibilityForm="eligibilityForm"
                        @closePCFormEvent="handleClosePCForm" @formSubmittedEvent="onFormSubmissionSuccess"
                        @formSubmissionErrorEvent="showFormSubmissionErrorAlert"></patient-connect>
                </div>
            </div>
        </div>

    </section>
</template>

<script setup>
import { ref, reactive, onMounted, computed, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { i18n } from '@/main'
import axios from 'axios'
import { eligibilityFormData, patientConnectUrl, patientConnectHeaders } from './config'
import UiButton from '@/modules/components/uibutton/src/UiButton.vue'
import ConsentBox from '@/modules/components/consentselect/ConsentBox.vue'
import CenteredLayout from '@/modules/components/layout/CenteredLayout.vue'
import QuestionTab from '@/modules/components/question-tab/QuestionTabRockstar.vue'
import UiHead from '@/modules/components/head-tab/UiHeading.vue'
import SelectButton from '@/modules/components/uiselectbutton/src/SelectButtonClassic.vue'
import PatientConnect from './PatientConnectForm.vue'
import eligSvg from '@/modules/icons/svgs/amiEligible.vue'

// Declare the events you want to emit
const emit = defineEmits(['gMapInFormConsentEnabledEvent', 'gMapInFormConsentEnabledEvent', 'closeEligibilityFormEvent']);


const { locale } = useI18n()
const isPatientConnectFormVisible = ref(false)
const isInEligibilityAlertVisible = ref(false)
const isFormSubmissionErrorAlertVisible = ref(false)
const isFormSubmissionSuccessAlertVisible = ref(false)
const isEligButtonEnabled = ref(false)
const isConsent = ref(false)
const eligibilityForm = reactive(eligibilityFormData(i18n))

// Track progress
const answeredCount = computed(() => {
    return eligibilityForm.filter(item => item.isActive).length
})

const progressPercentage = computed(() => {
    return (answeredCount.value / eligibilityForm.length) * 100
})


const addIsActiveProperty = (eligibilityForm) => {
    eligibilityForm.forEach((item) => {
        item.isActive = false
    })
}

const handleClosePCForm = () => {
    isPatientConnectFormVisible.value = false
    emit('gMapInFormConsentEnabledEvent')
}


const processChoice = (queLabel, { value, englishValue }) => {
    eligibilityForm[queLabel].userAnswer = value
    eligibilityForm[queLabel].field_data = englishValue
    eligibilityForm[queLabel].isActive = true
    checkIsEligButtonEnabled()

    // Scroll to the next question if it exists
    nextTick(() => {
        const nextQuestion = document.getElementById(`que-${queLabel + 1}`);
        if (nextQuestion) {
            nextQuestion.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

const checkIsEligButtonEnabled = () => {
    const isAllQuestionAnswered = eligibilityForm.every((item) => item.isActive)
    isEligButtonEnabled.value = isAllQuestionAnswered && isConsent.value
}

const onConsentChange = (consent) => {
    isConsent.value = consent
    checkIsEligButtonEnabled()
}

const isValid = (input) => {
    return input.correctAnswers.some((correctAnswer) => correctAnswer.value === input.userAnswer)
}

const isAllValid = () => {
    return eligibilityForm.every((x) => isValid(x))
}

const processEligibility = () => {
    if (isAllValid()) {
        isPatientConnectFormVisible.value = true;
    } else {
        post(eligibilityForm)
        isInEligibilityAlertVisible.value = true
    }
}

const onFormSubmissionSuccess = () => {
    isPatientConnectFormVisible.value = false
    isFormSubmissionSuccessAlertVisible.value = true
}

const showFormSubmissionErrorAlert = () => {
    isFormSubmissionErrorAlertVisible.value = true
}

const getPatientConnectUrl = () => {
    return import.meta.env.VITE_APP_BYPASS_CORS === 'false'
        ? patientConnectUrl.absolutePath
        : patientConnectUrl.rel
}

const getFormFields = () => {
    return eligibilityForm.map((formFields, index) => ({
        [`question_${index + 1}`]: formFields.field_name,
        question_answer: formFields.field_data
    }))
}


const post = () => {
    const formData = {
        language: locale.value, // Access the current locale value
        name: 'null',
        sms: 'null',
        email: 'null',
        site: 'null',
        questions: getFormFields(),
    }

    console.log('this is the form data: ', JSON.stringify(formData))



    axios
        .post(getPatientConnectUrl(), formData, {
            headers: patientConnectHeaders
        })
        .then((res) => {
            console.log('this is the response: ', res)
        })
        .catch((error) => {
            console.log('error just occurred: ', error)
        })
}

const closeForm = () => {
    emit('closeEligibilityFormEvent')
};

onMounted(() => {
    addIsActiveProperty(eligibilityForm)
})
</script>

<style lang="scss">
@import '../assets/styles/_settings.scss';

.eligibility-section {
    background: $elig-section-bg-color;

    .select-options {
        margin-top: 4px;
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
        justify-content: flex-start;
    }
    .last-tab:before,
    .last-tab:after {
        content: none;
    }

    .select-btn {
        margin-top: 16px;
        margin-right: 16px;
    }

    .question-tab-rockstar {

        &--active {
            &:after,
            .question-tab-rockstar__indicator {
                background-color: $elig-indicator-bg-color;
            }
        }
    
    }   

    .radio__input:checked+.radio__label {
        background-color: $elig-select-btn-color-selected;
    }

    .radio__input:focus+.radio__label {
        border: 2px dashed $elig-select-btn-color-onfocus;
    }

    .radio__label:hover {
        background-color: $elig-select-btn-color-onhover;
    }

    .ui-custom-checkbox .checkmark {
        top: 4px;
    }

    .ui-custom-checkbox input:checked~.checkmark {
        top: 4px;
    }

    .ui-alert {
        &__header {
            background: $primary-color;
            background: linear-gradient(0deg, $primary-color 0%, color.adjust($primary-color, $lightness: 10%) 100%);
        }

        &__status-icon-wrapper {
            background: #6e6e6e;
        }

        &__title {
            color: #6e6e6e;
            text-transform: capitalize;
            font-weight: 600;
            letter-spacing: 1px;
        }

        &__body {
            max-width: initial;
            letter-spacing: initial;
        }
    }

    .submit-success {
        .ui-alert {
            &__header {
                background: $primary-color;
                background: linear-gradient(0deg, $primary-color 0%, color.adjust($primary-color, $lightness: 10%) 100%);
            }



            &__status-icon-wrapper {
                background: $accent-color;
            }
        }
    }

    .ui-close-btn {
        transition: all 0.3s ease;
        color: $primary-color;
        font-size: 28px;
        font-weight: bold;
        padding: 0 16px;
        background: white;
        border: 1px #dedede solid;
        position: absolute;
        top: 16px;
        right: 24px;
        z-index: 99999;
        cursor: pointer;

        &:hover {
            color: color.adjust($primary-color, $lightness: 50%);
        }
    }

    .question-tab-rockstar__textarea {
        box-shadow: rgba(14, 63, 126, 0.06) 0px 0px 0px 1px, rgba(42, 51, 70, 0.03) 0px 1px 1px -0.5px,
            rgba(42, 51, 70, 0.04) 0px 2px 2px -1px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px,
            rgba(42, 51, 70, 0.03) 0px 5px 5px -2.5px, rgba(42, 51, 70, 0.03) 0px 10px 10px -5px,
            rgba(42, 51, 70, 0.03) 0px 24px 24px -8px;
    }
}

.alert-icon {
    width: 100px;
    margin: 0 auto;
    display: block;
    margin-bottom: 16px;
}

.slideup {
    animation: slideup 0.3s;
    animation-timing-function: cubic-bezier(0.05, 0.8, 0.1, 0.95);

    @keyframes slideup {
        0% {
            transform: translateY(50vh);
        }

        100% {
            transform: translateY(0);
        }
    }
}

.slidedown {
    animation: slidedown 0.3s;
    animation-timing-function: cubic-bezier(0.05, 0.8, 0.1, 0.95);
    transition: transform 3s cubic-bezier(0.05, 0.8, 0.1, 0.95);

    @keyframes slidedown {
        0% {
            transform: translateY(0);
        }

        100% {
            transform: translateY(50vh);
        }
    }
}

.nested-enter-active .alert {
    animation: slideup 0.3s;
}

.nested-leave-active .alert {
    transform: translateY(100vh);
}

.eligibility-section {
    .fixed-bottom-container {
        position: fixed;
        bottom: 0;
        border-radius: 5px;
        left: 0;
        width: 100%;
        background-color: white;
        padding: 10px;
        box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        display: flex;
        flex-direction: column;
        /* Stacking for mobile */
        align-items: center;
        /* Center elements on smaller screens */
        box-sizing: border-box;
    }

    .progress-bar {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin-bottom: 10px;
    }

    .progress-bar p {
        margin: 0;
        margin-bottom: 8px;
        white-space: nowrap;
        text-align: center;
    }

    .progress-bar__container {
        background-color: #e0e0e0;
        border-radius: 15px;
        height: 12px;
        width: 100%;
        max-width: 400px;
        overflow: hidden;
    }

    .progress-bar__fill {
        background-color: #4caf50;
        height: 100%;
        transition: width 0.5s ease;
    }

    .centered-layout {
        width: 100%;
        /* Full width for mobile */
        display: flex;
        justify-content: center;

        /* Center button on smaller screens */
        .ux-btn {
            margin: 0;
            box-sizing: border-box;
        }
    }

    @media (min-width: 768px) {
        .fixed-bottom-container {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding: 10px 15px;
        }

        .progress-bar {
            flex-direction: row;
            flex-grow: 1;
            margin-bottom: 0;
            margin-right: 20px;
            justify-content: flex-start;
        }

        .progress-bar p {
            margin-right: 15px;
            margin-bottom: 0;
        }

        .centered-layout {
            flex-shrink: 0;
            width: auto;
        }
    }
}


.ui-pc-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    display: flex;
}

.centered-modal {
    height: 100%;
    max-width: 900px;
    margin: auto;
}

.ineligible-message {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
}
</style>
