<template>
<section class="survey-section ui-section">

    <div class="ui-max-width">
        <h3 class="form-heading">{{ $t('survey.questions_intro') }}</h3>
        <form class="" v-on:submit.prevent="post(form)">

            <!--- question 1 --->
            <question-tab :key="'que' + 0" :isActive="form[0].isActive" :class="{ 'last-tab': form.length == 0 + 1 }">
                <template #left>
                    <span class="number">{{ 0 + 1 }}</span>
                </template>
                <template #right>
                    <div>
                        <div class="question-header">{{ form[0].question }}</div>
                        <div class="select-options">
                            <select-btn v-for="(choice, index) in form[0].choices" :key="'sel' + index" class="select-btn" :label='0 + choice.value' :groupName='"que" + 0' :value='choice.value' :englishValue="choice.englishValue" :choiceId="index" @choiceChange="processChoice(0, index, $event)"> {{ choice.text }} </select-btn>
                        </div>
                        <Transition name="fade">
                            <check-box-group v-if="isQueOneNo" :items="que1_options" @onChange="setQuestionOne" style="margin-top: 16px;">
                                <template #heading>
                                    <p style="margin-bottom: 8px;">{{ $t("survey.question1b") }}</p>
                                </template>
                            </check-box-group>
                        </Transition>
                    </div>

                </template>
            </question-tab>

            <!--- question 2 --->
            <question-tab :key="'que' + 1" :isActive="form[1].isActive" :class="{ 'last-tab': form.length == 1 + 1 }">
                <template #left>
                    <span class="number">{{ 1 + 1 }}</span>
                </template>
                <template #right>
                    <div>
                        <div class="question-header">{{ form[1].question }}</div>
                        <div class="select-options">
                            <select-btn v-for="(choice, index) in form[1].choices" :key="'sel' + index" class="select-btn" :label='1 + choice.value' :groupName='"que" + 1' :value='choice.value' :englishValue="choice.englishValue" :choiceId="index" @choiceChange="processChoice(1, index, $event)"> {{ choice.text }} </select-btn>
                        </div>
                        <Transition name="fade">
                            <check-box-group v-if="isQueTwoNo" :items="que2_options" @onChange="setQuestionTwo" style="margin-top: 16px;">
                                <template #heading>
                                    <p style="margin-bottom: 8px;">{{ $t("survey.question2b") }}</p>
                                </template>
                            </check-box-group>
                        </Transition>
                    </div>
                </template>
            </question-tab>

            <!--- question 3 --->
            <question-tab :key="'que' + 2" :isActive="form[2].isActive" :class="{ 'last-tab': form.length == 2 + 1 }">
                <template #left>
                    <span class="number">{{ 2 + 1 }}</span>
                </template>
                <template #right>
                    <div>
                        <div class="question-header">{{ form[2].question }}</div>
                        <div class="select-options">
                            <select-btn v-for="(choice, index) in form[2].choices" :key="'sel' + index" class="select-btn" :label='2 + choice.value' :groupName='"que" + 2' :value='choice.value' :englishValue="choice.englishValue" :choiceId="index" @choiceChange="processChoice(2, index, $event)"> {{ choice.text }} </select-btn>
                        </div>
                    </div>
                </template>
            </question-tab>

            <!--- question 4 --->
            <question-tab :key="'que' + 3" :isActive="form[3].isActive" :class="{ 'last-tab': form.length == 3 + 1 }">
                <template #left>
                    <span class="number">{{ 3 + 1 }}</span>
                </template>
                <template #right>
                    <div>
                        <div class="question-header">{{ form[3].question }}</div>
                        <div class="select-options">
                            <select-btn v-for="(choice, index) in form[3].choices" :key="'sel' + index" class="select-btn" :label='3 + choice.value' :groupName='"que" + 3' :value='choice.value' :englishValue="choice.englishValue" :choiceId="index" @choiceChange="processChoice(3, index, $event)"> {{ choice.text }} </select-btn>
                        </div>
                    </div>
                </template>
            </question-tab>

            <!--- question 5 --->
            <question-tab :key="'que' + 4" :isActive="form[4].isActive" :class="{ 'last-tab': form.length == 4 + 1 }">
                <template #left>
                    <span class="number">{{ 4 + 1 }}</span>
                </template>
                <template #right>
                    <div>
                        <div class="question-header">{{ form[4].question }}</div>
                        <div class="select-options">
                            <select-btn v-for="(choice, index) in form[4].choices" :key="'sel' + index" class="select-btn" :label='4 + choice.value' :groupName='"que" + 4' :value='choice.value' :englishValue="choice.englishValue" :choiceId="index" @choiceChange="processChoice(4, index, $event)"> {{ choice.text }} </select-btn>
                        </div>
                    </div>
                </template>
            </question-tab>

            <!--- question 6 --->
            <question-tab :key="'que' + 5" :isActive="form[5].isActive" :class="{ 'last-tab': form.length == 5 + 1 }">
                <template #left>
                    <span class="number">{{ 5 + 1 }}</span>
                </template>
                <template #right>
                    <div>
                        <div class="question-header">{{ form[5].question }}</div>
                        <div class="select-options">
                            <select-btn v-for="(choice, index) in form[5].choices" :key="'sel' + index" class="select-btn" :label='5 + choice.value' :groupName='"que" + 5' :value='choice.value' :englishValue="choice.englishValue" :choiceId="index" @choiceChange="processChoice(5, index, $event)"> {{ choice.text }} </select-btn>
                        </div>
                    </div>
                </template>
            </question-tab>

            <!--- question 7 --->
            <question-tab :key="'que' + 6" :isActive="form[6].isActive" :class="{ 'last-tab': form.length == 6 + 1 }">
                <template #left>
                    <span class="number">{{ 6 + 1 }}</span>
                </template>
                <template #right>
                    <div>
                        <div class="question-header">{{ form[6].question }}</div>
                        <div class="select-options">
                            <select-btn v-for="(choice, index) in form[6].choices" :key="'sel' + index" class="select-btn" :label='6 + choice.value' :groupName='"que" + 6' :value='choice.value' :englishValue="choice.englishValue" :choiceId="index" @choiceChange="processChoice(6, index, $event)"> {{ choice.text }} </select-btn>
                        </div>
                    </div>
                </template>
            </question-tab>

            <!--- question 8 -->
            <question-tab :key="'que' + 7" :isActive="form[7].isActive" :class="{ 'last-tab': form.length == 7 + 1 }">
                <template #left>
                    <span class="number">{{ 7 + 1 }}</span>
                </template>
                <template #right>
                    <div>
                        <div class="question-header">{{ form[7].question }}</div>
                        <div class="select-options">
                            <select-btn v-for="(choice, index) in form[7].choices" :key="'sel' + index" class="select-btn" :label='7 + choice.value' :groupName='"que" + 7' :value='choice.value' :englishValue="choice.englishValue" :choiceId="index" @choiceChange="processChoice(7, index, $event)"> {{ choice.text }} </select-btn>
                        </div>
                    </div>
                </template>
            </question-tab>

            <!--- question 9 --->
            <question-tab :key="'que' + 8" :isActive="form[8].isActive" :class="{ 'last-tab': form.length == 8 + 1 }">
                <template #left>
                    <span class="number">{{ 8 + 1 }}</span>
                </template>
                <template #right>
                    <div>
                        <div class="question-header">{{ form[8].question }}</div>
                        <div class="select-options">
                            <select-btn v-for="(choice, index) in form[8].choices" :key="'sel' + index" class="select-btn" :label='8 + choice.value' :groupName='"que" + 8' :value='choice.value' :englishValue="choice.englishValue" :choiceId="index" @choiceChange="processChoice(8, index, $event)"> {{ choice.text }} </select-btn>
                        </div>
                    </div>
                </template>
            </question-tab>

            <!--- question 10 --->
            <question-tab :key="'que' + 9" :isActive="form[9].isActive" :class="{ 'last-tab': form.length == 9 + 1 }">
                <template #left>
                    <span class="number">{{ 9 + 1 }}</span>
                </template>
                <template #right>
                    <div>
                        <div class="question-header">{{ form[9].question }}</div>
                        <div class="select-options">
                            <select-btn v-for="(choice, index) in form[9].choices" :key="'sel' + index" class="select-btn" :label='9 + choice.value' :groupName='"que" + 9' :value='choice.value' :englishValue="choice.englishValue" :choiceId="index" @choiceChange="processChoice(9, index, $event)"> {{ choice.text }} </select-btn>
                        </div>
                    </div>
                </template>
            </question-tab>

            <!--- question 11 --->
            <question-tab :key="'que' + 10" :isActive="form[10].isActive" :class="{ 'last-tab': form.length == 10 + 1 }">
                <template #left>
                    <span class="number">{{ 10 + 1 }}</span>
                </template>
                <template #right>
                    <div>
                        <div class="question-header">{{ form[10].question }}</div>
                        <div class="select-options">
                            <select-btn v-for="(choice, index) in form[10].choices" :key="'sel' + index" class="select-btn" :label='10 + choice.value' :groupName='"que" + 10' :value='choice.value' :englishValue="choice.englishValue" :choiceId="index" @choiceChange="processChoice(10, index, $event)"> {{ choice.text }} </select-btn>
                        </div>
                    </div>
                </template>
            </question-tab>

            <div ref="vue-form-progress-wrapper">
                <div ref="vue-form-progress" class="form-progress fixed">
                    <div class="form-progress__note"><span>{{ $t('survey.progress_note') }}</span>
                        <span>{{ getNumberOfQuestionsAnswered(form) }} / {{ getNumberOfQuestions(form) }}</span></div>
                    <div class="block-center">
                        <ui-progress :progressWidth="progressWidth"></ui-progress>
                    </div>
                </div>
            </div>

            <centered-layout>
                <div>
                    <p> {{ $t('survey.submit_note') }}</p>
                </div>
            </centered-layout>
            <centered-layout>

                <ui-button :isDisabled="!isEligButtonEnabled" class="submit-btn ux-btn ux-btn--primary">
                    {{ $t('survey.submit') }}
                </ui-button>
            </centered-layout>

        </form>

    </div>

    <!-- Display this modal if PC Form submission is successful -->
    <modal-layout v-if="isFormSubmissionSuccessAlertVisible">
        <alert-layout @closeAlertEvent='isFormSubmissionSuccessAlertVisible = false' :alertIcon="getImageUrl('eligble-icon.png')">
            <template #title>{{ $t('survey.success_modal_header') }}</template>
            <template #body>{{ $t('survey.success_modal_text') }}</template>
        </alert-layout>
    </modal-layout>

    <!-- Display this modal if PC Form submission is unsuccessful -->
    <modal-layout v-if="isFormSubmissionErrorAlertVisible">
        <alert-layout @closeAlertEvent='isFormSubmissionErrorAlertVisible = false' :alertIcon="getImageUrl('ineligble-icon.png')">
            <template #title>{{ $t('survey.fail_modal_header') }}</template>
            <template #body>
                <p v-html="$t('survey.fail_modal_text_html')"></p>
            </template>
        </alert-layout>
    </modal-layout>
</section>
</template>

<script>
//import SelectButtonVue from '@/components/SelectButton.vue'
//import CheckBoxGroup from '../../components/CheckBoxGroup.vue'

import CheckBoxGroup from '@/modules/components/checkbox/CheckBoxGroup.vue'
import UiButton from '@/modules/components/uibutton/src/UiButton.vue'
import QuestionTab from '@/modules/components/question-tab/QuestionTabClassic.vue'
import UiProgressVue from '@/modules/components/progress/UiProgress.vue'
import SelectButtonVue from '@/modules/components/uiselectbutton/src/UiSelectButton.vue'
import ModalLayout from '@/modules/components/layout/ModalLayout.vue'
import CenteredLayoutVue from '@/modules/components/layout/CenteredLayout.vue'
import AlertLayoutVue from '@/modules/components/layout/AlertLayout.vue'
import {
    i18n
} from "@/main";
import {
    surveyForm,
    externalSurveyUrl,
    externalSurveyHeaders,
} from '../config'
import axios from "axios";

export default {
    components: {
        "ui-button": UiButton,
        "modal-layout": ModalLayout,
        "question-tab": QuestionTab,
        "select-btn": SelectButtonVue,
        "centered-layout": CenteredLayoutVue,
        "alert-layout": AlertLayoutVue,
        "ui-progress": UiProgressVue,
        //"select-dropdown": SelectDropdownVue,
        "check-box-group": CheckBoxGroup
        // "ui-head": UiHeadingVue

    },
    mounted() {
        //addIsActiveProperty()
        this.addFormExtraFields(surveyForm(i18n))
        document.addEventListener('scroll', this.toggleProgressBarVisibility);

        let formProgressWrapper = this.$refs['vue-form-progress-wrapper'];
        let formProgress = this.$refs['vue-form-progress']

        formProgressWrapper.style.height = this.getElementHeight(formProgress) + 15 + "px";
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.toggleProgressBarVisibility)
    },
    data() {
        return {
            isPatientConnectFormVisible: false,
            isInEligibilityAlertVisible: false,
            isFormSubmissionErrorAlertVisible: false,
            isFormSubmissionSuccessAlertVisible: false,
            isEligButtonEnabled: false,
            form: surveyForm(i18n),
            progressWidth: 0,
            isQueOneNo: false,
            isQueTwoNo: false,
            que1_options: [{
                    id: "1",
                    label: this.$t("survey.que1_opt1"),
                    value: this.$t("survey.que1_opt1")
                },
                {
                    id: "2",
                    label: this.$t("survey.que1_opt2"),
                    value: this.$t("survey.que1_opt2")
                },
                {
                    id: "3",
                    label: this.$t("survey.que1_opt3"),
                    value: this.$t("survey.que1_opt3")
                },
                {
                    id: "4",
                    label: this.$t("survey.que1_opt4"),
                    value: this.$t("survey.que1_opt4")
                }
            ],
            que2_options: [{
                    id: "5",
                    label: this.$t("survey.que2_opt1"),
                    value: this.$t("survey.que2_opt1")
                },
                {
                    id: "6",
                    label: this.$t("survey.que2_opt2"),
                    value: this.$t("survey.que2_opt2")
                },
                {
                    id: "7",
                    label: this.$t("survey.que2_opt3"),
                    value: this.$t("survey.que2_opt3")
                },
                {
                    id: "8",
                    label: this.$t("survey.que2_opt4"),
                    value: this.$t("survey.que2_opt4")
                }
            ],
            questionOneExtraChoices: '',
            questionTwoExtraChoices: '',
        }
    },
    methods: {
        setQuestionOne(data) {
            const checkedOptions = data.filter(option => option.checked === true);
            const checkedLabels = checkedOptions.map(option => option.label);
            this.questionOneExtraChoices = checkedLabels.join(', ');
        },
        setQuestionTwo(data) {
            const checkedOptions = data.filter(option => option.checked === true);
            const checkedLabels = checkedOptions.map(option => option.label);
            this.questionTwoExtraChoices = checkedLabels.join(', ');
            // console.log(checkedLabels);
            // let englishValue = this.form[1].field_data;
            // this.form[1].field_data = englishValue + "::::" + commaSeparatedLabels  ;
        },
        getImageUrl(image) {
            //console.log('logo name is: ', name, ext)
            return new URL(`../assets/images/${image}`,
                import.meta.url).href
        },
        getElementHeight($element) {
            return $element.offsetHeight;
        },
        isElementInViewport(el) {
            let rect = null;
            if (el != null) {
                rect = el.getBoundingClientRect();

                return (
                    rect.top >= 0 &&
                    //  rect.left >= 0 &&
                    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
                    // &&  rect.right <= (window.innerWidth || document.documentElement.clientWidth)

                );
            }
        },
        toggleProgressBarVisibility() {

            let formProgressWrapper = this.$refs['vue-form-progress-wrapper']
            let formProgress = this.$refs['vue-form-progress']
            if (formProgress.classList != null) {
                this.isElementInViewport(formProgressWrapper) ? formProgress.classList.remove('fixed') : formProgress.classList.add('fixed');
            }

        },
        addFormExtraFields(form) {
            form.forEach((formFields) => {
                formFields.userAnswer = ''
                formFields.isActive = false
                formFields.field_data = ''
            })
        },
        processChoice: function (queLabel, choiceId, {
            value,
            englishValue
        }) {

            //console.log("queLabel: ", queLabel, "choiceId ", choiceId)

            if (queLabel === 0) {
                choiceId === 1 ? this.isQueOneNo = true : this.isQueOneNo = false;
            }

            if (queLabel === 1) {
                choiceId === 1 ? this.isQueTwoNo = true : this.isQueTwoNo = false;
            }

            this.form[queLabel].userAnswer = value; // this adds a new 'userAnswer' property to the 'form'

            // set the field_data
            this.form[queLabel].field_data = englishValue;

            // set the field_name_id
            this.form[queLabel].field_name_id = "Q" + (queLabel + 1);

            // set the field_data_id
            this.form[queLabel].field_data_id = "A" + (queLabel + 1) + "_" + choiceId;

            this.form[queLabel].isActive = true;
            this.checkIsEligButtonEnabled();
            this.noOfquestionsAnswered++
            this.progressWidth = this.getNumberOfQuestionsAnswered(this.form) / this.form.length * 100;

            this.toggleActiveStateOnLabel(queLabel, "radio-wrapper--active")
        },

        /**
         * Toggles (Adds or removes) the class 'radio-wrapper--active' 
         * on labels for a given group of radio buttons
         * @param {*} queLabel 
         */
        toggleActiveStateOnLabel(queLabel, activeClassName) {
            let querySelector = "input[name='que" + queLabel + "']";

            let inputElements = document.querySelectorAll(querySelector);
            let selectedInputElm = null;

            inputElements.forEach(function (inputElm) {
                //console.log("the input element is: ", inputElm.parentElement)
                inputElm.parentElement.classList.remove(activeClassName)
                if (inputElm.checked) {
                    selectedInputElm = inputElm;
                }
            })

            selectedInputElm.parentElement.classList.add(activeClassName)

        },

        getNumberOfQuestionsAnswered(form) {
            let noOfquestionsAnswered = 0
            for (let question of form) {
                if (question.isActive) {
                    noOfquestionsAnswered++;
                }
            }

            return noOfquestionsAnswered

        },

        getNumberOfQuestions(form) {
            return form.length;
        },

        checkIsEligButtonEnabled: function () {
            let isAllQuestionAnswered = true;
            for (const element of this.form) {
                isAllQuestionAnswered = isAllQuestionAnswered && element.isActive;
            }
            if (isAllQuestionAnswered) {
                this.isEligButtonEnabled = true
            } else {
                this.isEligButtonEnabled = false
            }

        },

        getRestructuredForm: function (form) {
            let newForm = []
            form.forEach((formFields) => {
                newForm.push({
                    "field_name": formFields.field_name,
                    "field_data": formFields.field_data,
                    "field_name_id": formFields.field_name_id,
                    "field_data_id": formFields.field_data_id
                })
            })

            //insert extra data for questions 1 and 2
            newForm[0].field_data = newForm[0].field_data + " :: " + this.questionOneExtraChoices;
            newForm[1].field_data = newForm[1].field_data + " :: " + this.questionTwoExtraChoices;

            return newForm;
        },

        post(form) {
            // console.log("this is the content of form: ", JSON.stringify(form));

            let formData = {
                "language": this.$i18n.locale,
                "fields": this.getRestructuredForm(form)
            }

            console.log("this is the content of form: ", JSON.stringify(formData));

            axios.post(this.getPatientConnectUrl(), formData, {
                    headers: externalSurveyHeaders
                })
                .then((res) => {
                    console.log("this is the response: ", res);
                    this.isFormSubmissionSuccessAlertVisible = true;
                })
                .catch((error) => {
                    console.log("error just occured: ", error);
                    this.isFormSubmissionErrorAlertVisible = true
                })
                .finally(() => {
                    //Perform action in always
                    if (!this.isFormSubmissionSuccessAlertVisible) {
                        this.isFormSubmissionErrorAlertVisible = true
                    }

                });

        },

        getPatientConnectUrl() {
            const isPatientConnectLocal =
                import.meta.env.VITE_APP_BYPASS_CORS;
            if (isPatientConnectLocal === "false") {
                return externalSurveyUrl.absolutePath
            } else {
                return externalSurveyUrl.rel
            }
        }
    },
}
</script>

<style lang="scss">
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
$survey-porgress-indicator-bg-color: color.adjust(#005172, $lightness: 20%)!default;

$disabled-submit-btn-color: #a8b1bd !default;
$disabled-submit-btn-text-color: #222 !default;
$submit-btn-color: #92d400 !default;
$submit-btn-text-color: #222 !default;

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

/*
.question-tab.last-tab .question-tab__hr{
    margin-bottom: 0;
}
*/
.select-options {
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    max-width: 300px;
}

.select-btn {
    margin-top: 10px;
}

.survey-section {
    background: $survey-section-bg-color;

    .submit-btn {
        background: $submit-btn-color;
        color: $submit-btn-text-color;

        :disabled {
            background: $disabled-submit-btn-color;
            color: $disabled-submit-btn-text-color
        }
    }
}

.question-tab {

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

.dropdown__label {
    color: #222
}

.ui-checkbox-wrapper {
    display: block;
    padding: 4px 0;

    input {
        margin: 0;
        line-height: normal;
        width: 16px;
        height: 16px;
        margin-right: 12px;
    }

    ;
}

.ui-checkbox {
    accent-color: $primary-color;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
