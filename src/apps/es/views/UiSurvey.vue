<template>
<section class="survey-section ui-section">

    <div class="ui-max-width">
        <h3 class="form-heading" aria-label="Form Heading">{{t('survey.questions_intro')}}</h3>
        <form class="" v-on:submit.prevent="post(form)">
            <question-tab v-for="(item, fIndex) in form" :key="'que' + fIndex" :isActive="item.isActive" :class="{ 'last-tab': form.length == fIndex + 1 }">
                <template #left>
                    <span class="number">{{fIndex+1}}</span>
                    <!--<div class="question-header"><span class="number">{{fIndex+1}}</span> {{ item.question }}</div>-->
                </template>
                <template #right>
                    <div>
                        <div class="question-header">{{ item.question }}</div>
                        <div class="select-options">
                            <select-btn v-for="(choice, index) in item.choices" :key="'sel' + index" class="select-btn" :label='fIndex + choice.value' :groupName='"que" + fIndex' :value='choice.value' :englishValue="choice.englishValue" :choiceId="index" @choiceChange="processChoice(fIndex,index,$event)"> {{ choice.text }} </select-btn>
                        </div>
                    </div>

                </template>

            </question-tab>

            <div ref="vue-form-progress-wrapper">
                <div ref="vue-form-progress" class="form-progress fixed">
                    <div class="form-progress__note"><span>{{t('survey.progress_note')}}</span> <span>{{getNumberOfQuestionsAnswered(form)}} / {{getNumberOfQuestions(form)}}</span></div>
                    <div class="block-center">
                        <ui-progress :progressWidth="progressWidth"></ui-progress>
                    </div>
                </div>
            </div>

            <centered-layout>
                <div>
                    <p> {{t('survey.submit_note')}}</p>
                </div>
            </centered-layout>
            <centered-layout>

                <ui-button :isDisabled="!isEligButtonEnabled" class="submit-btn ux-btn ux-btn--primary">
                    {{t('survey.submit')}}
                </ui-button>
            </centered-layout>

        </form>

    </div>

    <!-- Display this modal if PC Form submission is successful -->
    <modal-layout v-if="isFormSubmissionSuccessAlertVisible">
        <alert-layout @closeAlertEvent='isFormSubmissionSuccessAlertVisible = false' :alertIcon="getImageUrl('eligble-icon.png')">
            <template #title>
                <img style="max-width:150px" src="../assets/images/success.svg" alt="Success Icon" />
                {{ t('survey.success_modal_header') }}
            </template>
            <template #body>{{ t('survey.success_modal_text') }}</template>
        </alert-layout>
    </modal-layout>

    <!-- Display this modal if PC Form submission is unsuccessful -->
    <modal-layout v-if="isFormSubmissionErrorAlertVisible">
        <alert-layout @closeAlertEvent='isFormSubmissionErrorAlertVisible = false' :alertIcon="getImageUrl('ineligble-icon.png')">
            <template #title>
                <img style="max-width:150px" src="../assets/images/failure.svg" alt="Failure Icon" />
                {{ t('survey.fail_modal_header') }}
            </template>
            <template #body>
                <p v-html="t('survey.fail_modal_text_html')"></p>
            </template>
        </alert-layout>
    </modal-layout>
</section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';
import axios from 'axios';
import UiButton from '@/modules/components/uibutton/src/UiButton.vue';
import QuestionTab from '@/modules/components/question-tab/QuestionTabClassic.vue';
import UiProgress from '@/modules/components/progress/UiProgress.vue';
import SelectBtn from '@/modules/components/uiselectbutton/src/UiSelectButton.vue';
import ModalLayout from '@/modules/components/layout/ModalLayout.vue';
import CenteredLayout from '@/modules/components/layout/CenteredLayout.vue';
import AlertLayout from '@/modules/components/layout/AlertLayout.vue';
import { surveyForm, externalSurveyUrl, externalSurveyHeaders } from '../config';
import { i18n } from "@/main";
//import * as utils from '@/modules/components/common/src/utils';

const { t, locale } = useI18n();
const form = ref(surveyForm(i18n));
const isEligButtonEnabled = ref(false);
const isFormSubmissionSuccessAlertVisible = ref(false);
const isFormSubmissionErrorAlertVisible = ref(false);
const progressWidth = ref(0);
const vueFormProgressWrapper = ref(null);
const vueFormProgress = ref(null);

function getImageUrl(image) {
    return new URL(`../assets/images/${image}`, import.meta.url).href;
}

function getElementHeight(element) {
    return element.offsetHeight;
}

function isElementInViewport(el) {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
}

function toggleProgressBarVisibility() {
    if (vueFormProgressWrapper.value && vueFormProgress.value) {
        isElementInViewport(vueFormProgressWrapper.value) 
            ? vueFormProgress.value.classList.remove('fixed') 
            : vueFormProgress.value.classList.add('fixed');
    }
}

function addFormExtraFields(form) {
    form.forEach((formField) => {
        formField.userAnswer = '';
        formField.isActive = false;
        formField.field_data = '';
    });
}

function processChoice(queLabel, choiceId, { value, englishValue }) {
    const question = form.value[queLabel];
    question.userAnswer = value;
    question.field_data = englishValue;
    question.field_name_id = `Q${queLabel + 1}`;
    question.field_data_id = `A${queLabel + 1}_${choiceId}`;
    question.isActive = true;
    checkIsEligButtonEnabled();
    progressWidth.value = (getNumberOfQuestionsAnswered(form.value) / form.value.length) * 100;
}

function getNumberOfQuestionsAnswered(form) {
    return form.reduce((acc, question) => acc + (question.isActive ? 1 : 0), 0);
}

function getNumberOfQuestions(form) {
    return form.length;
}

function checkIsEligButtonEnabled() {
    isEligButtonEnabled.value = form.value.every(question => question.isActive);
}

function post(form) {
    const formData = {
        language: locale.value,
        fields: form.map(({ field_name, field_data, field_name_id, field_data_id }) => ({
            field_name: field_name || ' ',
            field_data: field_data || ' ',
            field_name_id: field_name_id || ' ',
            field_data_id: field_data_id || ' '
        }))
    };

    console.log("this is the content of form: ", JSON.stringify(formData));

    axios.post(getExternalSurveyUrl(), formData, { headers: externalSurveyHeaders })
        .then(() => isFormSubmissionSuccessAlertVisible.value = true)
        .catch(() => isFormSubmissionErrorAlertVisible.value = true);
}

function getExternalSurveyUrl() {
    return import.meta.env.VITE_APP_BYPASS_CORS === 'false'
        ? externalSurveyUrl.absolutePath
        : externalSurveyUrl.rel;
}

onMounted(() => {
    addFormExtraFields(form.value);
    document.addEventListener('scroll', toggleProgressBarVisibility);
    if (vueFormProgressWrapper.value && vueFormProgress.value) {
        vueFormProgressWrapper.value.style.height = getElementHeight(vueFormProgress.value) + 15 + 'px';
    }
});

onBeforeUnmount(() => {
    document.removeEventListener('scroll', toggleProgressBarVisibility);
});
</script>

<style lang="scss">
@import "../assets/styles/_settings.scss";

$survey-section-bg-color: #fbfbfb !default;
$survey-heading-text-color: #005172 !default;
$survey-heading-hr-color: #005172 !default;

$survey-question-number-border-color: #39a8e3 !default;
$survey-question-number-border-color--isAnswered: #39a8e3 !default;
$survey-question-number-bg-color: #fff !default;
$survey-question-number-bg-color--isAnswered: #39a8e3 !default;
$survey-question-number-text-color: #39a8e3 !default;
$survey-question-number-text-color--isAnswered: white !default;
$survey-question-divider-color: gray !default;
$question-select-onhover-color: #d8f4ff !default;
$question-select-button-border-color: #39a8e3 !default;
$question-selected-button-dot-color: #39a8e3 !default;

$survey-progress-wrapper-bg-color: #005172 !default;
$survey-progress-wrapper-top-border-color: none !default;
$onfixed-survey-progress-wrapper-bg-color: #005172 !default;
$onfixed-survey-progress-wrapper-top-border-color: none !default;

$survey-progress-bg-color: #005172 !default;
$survey-progress-border-color: white !default;
$survey-porgress-indicator-bg-color: color.adjust(#005172, $lightness: 20%) !default;

$disabled-submit-btn-color: #a8b1bd !default;
$disabled-submit-btn-text-color: #222 !default;
$submit-btn-color: #92d400 !default;
$submit-btn-text-color: #222 !default;



.survey-section {
    background: $survey-section-bg-color;

    .form-heading {
        color: $survey-heading-text-color;
    
        &::after {
            content: '';
            position: relative;
           // width: 100%;
            height: 2px;
            display: flex;
            margin: 30px 0 40px 0;
            background-color: $survey-heading-hr-color;
        }
    }
    
    .form-progress {
        background-color: $survey-progress-wrapper-bg-color;
        border-top: $onfixed-survey-progress-wrapper-top-border-color;
        padding: 32px 8px;
        position: relative;
        bottom: 0;
        right: 0;
       // width: 100%;
        z-index: 9;
        transition: all 0.8s;
    
        @media only screen and (max-width: 767px) {
            padding: 16px 8px;
        }
    
        &.fixed {
            background-color: $onfixed-survey-progress-wrapper-bg-color;
            border-top: 1px solid $survey-progress-wrapper-top-border-color;
            position: fixed;
            z-index: 9;
            bottom: 0;
            left: 0;
            right: 0;
        }
    
        &__note {
            color: white;
            text-align: center;
            margin-bottom: 16px;
        }
    }
    
    .question-header {
        display: flex;
        align-items: flex-start;
        max-width: 800px;
    }
    
    .number {
        border: $survey-question-number-border-color 1.5px solid;
        border-radius: 3px;
        background-color: $survey-question-number-bg-color;
        color: $survey-question-number-text-color;
        margin-right: 16px;
        min-width: 25px;
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s;
    }
    
    
    .select-btn {
        margin-top: 10px;
        transition: all 0.3s;
    }

    .select-options {
        margin-top: 8px;
        display: flex;
        flex-direction: column;
        max-width: 300px;
    }

    .question-tab-classic {

        .radio__input:after {
            border-color: $question-select-button-border-color;
        }
    
        .radio__input:checked:after {
            background-color: $question-selected-button-dot-color;
        }
    
        .radio-wrapper:hover,
        .radio-wrapper--active {
            background-color: $question-select-onhover-color;
        }
    
        &--active {
    
            .number {
                background-color: $survey-question-number-bg-color--isAnswered;
                color: $survey-question-number-text-color--isAnswered;
                border-color: $survey-question-number-border-color--isAnswered;
            }
        }
    
    }
    
    .ui-progress {
        background-color: $survey-progress-bg-color;
        border: 1px solid $survey-progress-border-color;
    
        &__indicator {
            background-color: $survey-porgress-indicator-bg-color;
        }
    }

}

.ui-alert__title{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.ui-alert__header{
    padding: 0;
}

.ui-alert__close-btn{
    color: #8e8e8e;
}
</style>
