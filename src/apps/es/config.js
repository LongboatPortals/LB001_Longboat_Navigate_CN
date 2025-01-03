export const externalSurveyUrl = {
    base: "https://app.longboat.com",
    rel: "/api/v1/Longboat/15/connect_data/1",
    get absolutePath() {
        return this.base + this.rel;
    },
}

export const externalSurveyHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': '42a04c0a-cb4a-4941-9145-3626eadc2b48'
}

/* ================= Survey form  ===================== */
import * as utils from "@/modules/components/common/src/utils";


export const answers = {
    STRONGLY_DISAGREE: "strongly_disagree",
    DISAGREE: "disagree",
    NE_AGREE_DISAGREE: "ne_agree_disagree",
    AGREE: "agree",
    ST_AGREE: "strongly_agree",
    YES: "yes",
    NO: "no",
    SOMEWHAT_AGREE: "somewhat_agree",
    VERY_ACCEPTABLE: "very_acceptable",
    SOMEWHAT_ACCEPTABLE: "somewhat_acceptable",
    UNACCEPTABLE: "unacceptable",
    VERY_UNACCEPTABLE: "very_unacceptable",
    DID_NOT_USE: "did_not_use",
    VERY_SATISFIED: "very_satisfied",
    SATISFIED: "satisfied",
    SOMEWHAT_SATISFIED: "somewhat_satisfied",
    UNSATISFIED: "unsatisfied",
    VERY_UNSATISFIED: "very_unsatisfied",
    NOT_APPLICABLE: "not_applicable"
};


export function yes(i18n) {
    return {
        value: answers.YES,
        text: i18n.global.t("survey.answer_six"),
        englishValue: utils.translateMessage(i18n,"survey.answer_six", 'en')//i18n.global.t("survey.answer_six", 'en')
    }
}

export function no(i18n) {
    return {
        value: answers.NO,
        text: i18n.global.t("survey.answer_seven"),
        englishValue: utils.translateMessage(i18n,"survey.answer_seven", 'en')
    }
}
export function strongly_agree(i18n) {
    return {
        value: answers.ST_AGREE,
        text: i18n.global.t("survey.answer_five"),
        englishValue: utils.translateMessage(i18n,"survey.answer_five", 'en')
    }
}

export function somewhat_agree(i18n) {
    return {
        value: answers.SOMEWHAT_AGREE,
        text: i18n.global.t("survey.answer_eight"),
        englishValue: utils.translateMessage(i18n,"survey.answer_eight", 'en')
    }
}

export function disagree(i18n) {
    return {
        value: answers.DISAGREE,
        text: i18n.global.t("survey.answer_two"),
        englishValue: utils.translateMessage(i18n,"survey.answer_two", 'en')
    }
}

export function strongly_disagree(i18n) {
    return {
        value: answers.STRONGLY_DISAGREE,
        text: i18n.global.t("survey.answer_one"),
        englishValue: utils.translateMessage(i18n,"survey.answer_one", 'en')
    }
}

export function very_acceptable(i18n) {
    return {
        value: answers.VERY_ACCEPTABLE,
        text: i18n.global.t("survey.answer_nine"),
        englishValue: utils.translateMessage(i18n,"survey.answer_nine", 'en')
    }
}

export function somewhat_acceptable(i18n) {
    return {
        value: answers.SOMEWHAT_ACCEPTABLE,
        text: i18n.global.t("survey.answer_ten"),
        englishValue: utils.translateMessage(i18n,"survey.answer_ten", 'en')
    }
}

export function unacceptable(i18n) {
    return {
        value: answers.UNACCEPTABLE,
        text: i18n.global.t("survey.answer_eleven"),
        englishValue: utils.translateMessage(i18n,"survey.answer_eleven", 'en')
    }
}

export function very_unacceptable(i18n) {
    return {
        value: answers.VERY_UNACCEPTABLE,
        text: i18n.global.t("survey.answer_twelve"),
        englishValue: utils.translateMessage(i18n,"survey.answer_twelve", 'en')
    }
}

export function did_not_use(i18n) {
    return {
        value: answers.DID_NOT_USE,
        text: i18n.global.t("survey.answer_thirteen"),
        englishValue: utils.translateMessage(i18n,"survey.answer_thirteen", 'en')
    }
}

export function very_satisfied(i18n) {
    return {
        value: answers.VERY_SATISFIED,
        text: i18n.global.t("survey.answer_fourteen"),
        englishValue: utils.translateMessage(i18n,"survey.answer_fourteen", 'en')
    }
}

export function satisfied(i18n) {
    return {
        value: answers.SATISFIED,
        text: i18n.global.t("survey.answer_fifteen"),
        englishValue: utils.translateMessage(i18n,"survey.answer_fifteen", 'en')
    }
}

export function somewhat_satisfied(i18n) {
    return {
        value: answers.SOMEWHAT_SATISFIED,
        text: i18n.global.t("survey.answer_fifteen_two"),
        englishValue: utils.translateMessage(i18n,"survey.answer_fifteen_two", 'en')
    }
}

export function unsatisfied(i18n) {
    return {
        value: answers.UNSATISFIED,
        text: i18n.global.t("survey.answer_sixteen"),
        englishValue: utils.translateMessage(i18n,"survey.answer_sixteen", 'en')
    }
}

export function very_unsatisfied(i18n) {
    return {
        value: answers.VERY_UNSATISFIED,
        text: i18n.global.t("survey.answer_seventeen"),
        englishValue: utils.translateMessage(i18n,"survey.answer_seventeen", 'en')
    }
}
export function not_applicable(i18n) {
    return {
        value: answers.NOT_APPLICABLE,
        text: i18n.global.t("survey.answer_eighteen"),
        englishValue: utils.translateMessage(i18n,"survey.answer_eighteen", 'en')
    }
}

export const surveyForm = (i18n) => [

    // Question 1
    {
        question: i18n.global.t("survey.question1"),
        choices: [yes(i18n), no(i18n)],
        field_name: utils.translateMessage(i18n,"survey.question1", 'en') //i18n.global.t("survey.question1", 'en'),
    },

    // Question 2
    {
        question: i18n.global.t("survey.question2"),
        choices: [yes(i18n), no(i18n), not_applicable(i18n)],
        field_name: utils.translateMessage(i18n,"survey.question2", 'en'),
    },

    // Question 3
    {
        question: i18n.global.t("survey.question3"),
        choices: [yes(i18n), no(i18n), not_applicable(i18n)],
        field_name: utils.translateMessage(i18n,"survey.question3", 'en'),
    },

    // Question 4
    {
        question: i18n.global.t("survey.question4"),
        choices: [yes(i18n), no(i18n), did_not_use(i18n)],
        field_name: utils.translateMessage(i18n,"survey.question4", 'en'),
    },

    // Question 5
    {
        question: i18n.global.t("survey.question5"),
        choices: [yes(i18n), no(i18n), did_not_use(i18n)],
        field_name: utils.translateMessage(i18n,"survey.question5", 'en'),
    },

    // Question 6
    {
        question: i18n.global.t("survey.question6"),
        choices: [yes(i18n), no(i18n), did_not_use(i18n)],
        field_name: utils.translateMessage(i18n,"survey.question6", 'en'),
    },

    // Question 7
    {
        question: i18n.global.t("survey.question7"),
        choices: [yes(i18n), no(i18n), did_not_use(i18n)],
        field_name: utils.translateMessage(i18n,"survey.question7", 'en'),
    },

    // Question 8
    {
        question: i18n.global.t("survey.question8"),
        choices: [very_acceptable(i18n), somewhat_acceptable(i18n), unacceptable(i18n), very_unacceptable(i18n)],
        field_name: utils.translateMessage(i18n,"survey.question8", 'en'),
    },

    // Question 9
    {
        question: i18n.global.t("survey.question9"),
        choices: [very_acceptable(i18n), somewhat_acceptable(i18n), unacceptable(i18n), very_unacceptable(i18n)],
        field_name: utils.translateMessage(i18n,"survey.question9", 'en'),
    },

    // Question 10
    {
        question: i18n.global.t("survey.question10"),
        choices: [yes(i18n), no(i18n), not_applicable(i18n)],
        field_name:utils.translateMessage(i18n,"survey.question10", 'en'),
    },

    // Question 11
    {
        question: i18n.global.t("survey.question11"),
        choices: [yes(i18n), no(i18n), not_applicable(i18n)],
        field_name: utils.translateMessage(i18n,"survey.question11", 'en'),
    },
    
];