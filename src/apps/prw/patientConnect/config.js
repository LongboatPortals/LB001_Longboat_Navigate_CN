/* ==========================================================================
    Patient Connect (Patient Recruitment) Configuration ⬇
========================================================================== */
export const patientConnectUrl = {
    base: 'https://app.longboat.com',
    rel: '/api/v1/Longboat/15/patient_connect',
    get absolutePath() {
        return this.base + this.rel
    }
}

export const patientConnectHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
    // 'Authorization': ''
}


/* ================= Eligibility form  ===================== */
import * as utils from '@/modules/components/common/src/utils'


export function eligibilityFormData (i18n) {
    
    /********** Choices **********/
    const YES = {
        value: 'yes_a',
        text: i18n.global.t('prw.yes_a'),
        englishValue: utils.translateMessage(i18n, 'prw.yes_a', 'en')
    }
    
    const NO = {
        value: 'no_a',
        text: i18n.global.t('prw.no_a'),
        englishValue: utils.translateMessage(i18n, 'prw.no_a', 'en')
    }
    
    const MAYBE = {
        value: 'maybe_a',
        text: i18n.global.t('prw.maybe_a'),
        englishValue: utils.translateMessage(i18n, 'prw.maybe_a', 'en')
    }
    
    const DONTKNOW = {
        value: 'dk_a',
        text: i18n.global.t('prw.dk_a'),
        englishValue: utils.translateMessage(i18n, 'prw.dk_a', 'en')
    }


    /********** Questions **********/
    return [
        // Question 1
        {
            question: i18n.global.t('prw.question1'),
            field_name: utils.translateMessage(i18n, 'prw.question1', 'en'),
            choices: [YES, NO],
            correctAnswers: [YES, NO]
        },

        // Question 2
        {
            question: i18n.global.t('prw.question2'),
            field_name: utils.translateMessage(i18n, 'prw.question2', 'en'),
            choices: [YES, NO, DONTKNOW],
            correctAnswers: [YES]
        },

        // Question 3
        {
            question: i18n.global.t('prw.question3'),
            field_name: utils.translateMessage(i18n, 'prw.question3', 'en'),
            choices: [YES, NO, MAYBE],
            correctAnswers: [YES, MAYBE]
        },

        // Question 4
        {
            question: i18n.global.t('prw.question4'),
            field_name: utils.translateMessage(i18n, 'prw.question4', 'en'),
            choices: [YES, NO],
            correctAnswers: [YES]
        },

        // Question 5
        {
            question: i18n.global.t('prw.question5'),
            field_name: utils.translateMessage(i18n, 'prw.question5', 'en'),
            choices: [YES, NO],
            correctAnswers: [YES]
        }
    ]
    
}