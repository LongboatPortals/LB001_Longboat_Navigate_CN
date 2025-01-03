<template>
    <section class="faq-section ui-section">
        <div class="faq-section-wrapper">
            <div class="ui-max-width">
                <div class="ui-faq-flex-wrap">
                    <div class="ui-faq-flex-item __image">
                        <faq-svg></faq-svg>
                    </div>
                    <div class="ui-faq-flex-item __content">
                        <ui-head>
                            <template #head>
                                <h3 class="faq-head" v-html="t('prw.faq_head')"></h3>
                            </template>
                            <template #subhead>
                                <p class="faq-para" v-html="t('prw.faq_intro')"></p>
                            </template>
                        </ui-head>
                    </div>
                </div>
            </div>
        </div>
        <div class="ui-faq">
            <div class="ui-faq-toolPanel-wrapper">
                <div class="ui-faq-toolPanel">
                    <!--
                    <div class="search-container">
                        #<input type="text" id="searchInput" @keyup.stop="searchFAQs($event)" placeholder="Search FAQs">#
                        <div class="search-input-wrapper">
                            <input type="text" id="searchInput" @keyup.stop="searchInput = $event" class="search-input" :placeholder="t('prw.faq_search_placeholder')">
                            <button @click="clearSearchField()" v-if="searchInput" class="cancle-search-btn"><i class="fa-solid fa-xmark"></i></button>
                        </div>    
                        <button class="search-button" @click="searchFAQs()">#<i class="fa-solid fa-magnifying-glass search-icon"></i>#{{t("prw.faq_search_button")}}</button>  
                    </div>
                -->
                    <div class="faq-search">
                        <text-input id="searchInput" ref="ui_url" class="faq-search__input" :placeholder="t('prw.faq_search_placeholder')" :value="searchInput" @inputEvent="searchInput = $event" @keyup="resetFaq()" @keydown.enter="searchFAQs()"></text-input>
                        <button @click="clearSearchField()" v-if="searchInput" class="cancle-search-btn"><i class="fa-solid fa-xmark"></i></button>
                        <ui-button ref="searchSiteBtn" class="ux-btn ux-btn--primary" style="line-height: 0" @click="searchFAQs()">{{ t("prw.faq_search_button") }}</ui-button>
                    </div>
                    <div class="faq-open-close-btns">
                    <ui-button class="ux-btn ux-btn--outline" @click="showAllFAQs()">{{t("prw.faq_view_all")}}</ui-button>
                    <ui-button class="ux-btn ux-btn--outline" @click="closeAllFAQs()">{{t("prw.faq_close_all")}}</ui-button>
                </div>
                </div>
                <!-- <hr class="my-6" /> -->
                <div v-if="showTextNotFound" class="ui-faq-tool__text-not-found-alert">
                    <p>{{t("prw.faq_search_no_results")}}</p>
                </div>
            </div>
            <div id="js-ui-faq-questions" class="ui-faq-questions">
                <div class="ui-max-width">
                    <ui-faq class="faq-comp" :faqId="1">
                        <template #heading>
                            <h4 v-html="t('prw.faq1')"></h4>
                        </template>
                        <template #content>
                            <p v-html="t('prw.faq1_a')"></p>
                        </template>
                    </ui-faq>
                    <ui-faq class="faq-comp" :faqId="2">
                        <template #heading>
                            <h4 v-html="t('prw.faq2')"></h4>
                        </template>
                        <template #content>
                            <p v-html="t('prw.faq2_a')"></p>
                        </template>
                    </ui-faq>
                    <ui-faq class="faq-comp" :faqId="3">
                        <template #heading>
                            <h4 v-html="t('prw.faq3')"></h4>
                        </template>
                        <template #content>
                            <p v-html="t('prw.faq3_a')"></p>
                        </template>
                    </ui-faq>
                    <ui-faq class="faq-comp" :faqId="4">
                        <template #heading>
                            <h4 v-html="t('prw.faq4')"></h4>
                        </template>
                        <template #content>
                            <p v-html="t('prw.faq4_a')"></p>
                        </template>
                    </ui-faq>
                    <ui-faq class="faq-comp" :faqId="5">
                        <template #heading>
                            <h4 v-html="t('prw.faq5')"></h4>
                        </template>
                        <template #content>
                            <p v-html="t('prw.faq5_a')"></p>
                        </template>
                    </ui-faq>
    
                    <ui-faq class="faq-comp" :faqId="5">
                        <template #heading>
                            <h4 v-html="t('prw.faq6')"></h4>
                        </template>
                        <template #content>
                            <p v-html="t('prw.faq6_a')"></p>
                        </template>
                    </ui-faq>
                    <ui-faq class="faq-comp" :faqId="5">
                        <template #heading>
                            <h4 v-html="t('prw.faq7')"></h4>
                        </template>
                        <template #content>
                            <p v-html="t('prw.faq7_a')"></p>
                        </template>
                    </ui-faq>
    
                </div>
            </div>
        </div>
    
    </section>
    </template>
    
    <script setup>
    import { ref, onMounted } from 'vue';
    import { useI18n } from 'vue-i18n';
    import UiFaq from '@/modules/components/uifaq/UiFaq.vue';
    import UiHead from '@/modules/components/head-tab/UiHeading.vue';
    import FaqSvg from '@/modules/icons/svgs/FaqSvg.vue';
    import TextInput from "@/modules/components/textinput/TextInput.vue";
    import { show, hide } from 'slidetoggle';
    
    // Vue I18n instance
    const { t } = useI18n();
    
    // Reactive state
    const searchInput = ref('');
    const showTextNotFound = ref(false);
    
    // Methods
    const getHeightOfElement = (elementId) => {
        let element = document.getElementById(elementId);
        return element.offsetHeight;
    };
    
    const setHeightOfElement = (elementId, height) => {
        let element = document.getElementById(elementId);
        element.style.minHeight = height + 'px';
    };
    
    const resetFaq = () => {
        if (searchInput.value.length === 0) {
            searchFAQs();
        }
    };
    
    const searchFAQs = () => {
        let isSearchTextFound = true;
        const input = searchInput.value.toLowerCase().trim();
        const faqItems = document.getElementsByClassName('faq-comp');
    
        for (let i = 0; i < faqItems.length; i++) {
            const question = faqItems[i].getElementsByTagName('h4')[0];
            const answer = faqItems[i].getElementsByTagName('p')[0];
            const questionText = question.innerText.toLowerCase();
            const answerText = answer.innerText.toLowerCase();
    
            question.innerHTML = question.innerHTML.replace(/<mark class="highlight">|<\/mark>/g, '');
            answer.innerHTML = answer.innerHTML.replace(/<mark class="highlight">|<\/mark>/g, '');
    
            if (questionText.includes(input) || answerText.includes(input)) {
                faqItems[i].classList.remove('hidden');
                const highlightedQuestion = question.innerHTML.replace(new RegExp(input, 'gi'), match => `<mark class="highlight">${match}</mark>`);
                question.innerHTML = highlightedQuestion;
    
                const highlightedAnswer = answer.innerHTML.replace(new RegExp(input, 'gi'), match => `<mark class="highlight">${match}</mark>`);
                answer.innerHTML = highlightedAnswer;
    
                if (input.length > 0) {
                    faqItems[i].classList.add('__open');
                    show(faqItems[i].lastElementChild, { miliseconds: 300, transitionFunction: 'ease-in' });
                }
    
                if (input.length === 0) {
                    faqItems[i].classList.remove('__open');
                    hide(faqItems[i].lastElementChild, { miliseconds: 300, transitionFunction: 'ease-in' });
                }
    
            } else {
                faqItems[i].classList.add('hidden');
            }
    
            isSearchTextFound = isSearchTextFound && faqItems[i].classList.contains('hidden');
        }
    
        showTextNotFound.value = isSearchTextFound;
    };
    
    const showAllFAQs = () => {
        const faqItems = document.getElementsByClassName('faq-comp');
        for (let i = 0; i < faqItems.length; i++) {
            faqItems[i].classList.add('__open');
            show(faqItems[i].lastElementChild, { miliseconds: 300, transitionFunction: 'ease-in' });
        }
    };
    
    const closeAllFAQs = () => {
        const faqItems = document.getElementsByClassName('faq-comp');
        for (let i = 0; i < faqItems.length; i++) {
            faqItems[i].classList.remove('__open');
            hide(faqItems[i].lastElementChild, { miliseconds: 300, transitionFunction: 'ease-in' });
        }
    };
    
    const clearSearchField = () => {
        searchInput.value = '';
        document.getElementById('searchInput').value = '';
        searchFAQs();
    };
    
    // Lifecycle hook
    onMounted(() => {
        let elementId = 'js-ui-faq-questions';
        setHeightOfElement(elementId, getHeightOfElement(elementId));
    });
    </script>
    
    <style lang="scss">
    @import "../assets/styles/_settings.scss";
    
    .faq-section {
        background: $faq-section-bg-color;
        padding: 0;
        padding-bottom: 36px;
    
        .faq-section-wrapper {
            padding: 32px 16px 64px 16px;
            background-color: rgba($primary-color, .1);
    
            @media screen and (max-width: 768px) {
                padding: 16px 8px;
            }
        }
    
        .faq-head {
            color: $primary-color;
            text-align: left;
            margin: 0 0 0 16px;
    
        }
    
        .faq-para {
            text-align: left;
        }
    
        .ui-subhead {
            margin: 0 0 0 16px;
            max-width: 100%;
        }
    
        .ui-head {
            color: tertiary-color;
            text-align: left;
            margin-bottom: 4px;
        }
    
        h4 {
            margin: 0;
        }
    
        .ui-faq-questions {
            padding: 8px;
            max-width: 960px;
            margin: auto;
            background-color: $faq-questions-back;
            box-shadow: $faq-box-shadow;
            // margin-top: -36px;
            border-radius: 4px;
    
            @media screen and (max-width: 768px) {
                margin-top: 0;
            }
        }
    
        .ui-faqs-item {
            .ui-subhead {
                max-width: auto;
            }
    
            &.__open {
                border-bottom-color: $faq-hr-onopen-color;
    
                .ui-faqs-btn {
                    i {
                        color: #fff;
                    }
                }
            }
        }
    }
    
    .ui-faqs-item {
        border-bottom-color: $faq-hr-color;
    }
    
    .faq-comp {
        .ui-faqs-btn {
            background-color: $faq-btn-color;
        }
    }
    
    .ui-faq-flex-wrap {
        display: flex;
        align-items: center;
    
        .ui-faq-flex-item {
            &.__image {
                flex: 0 0 15%;
            }
    
            &.__content {
                flex: 0 0 85%;
            }
        }
    }
    
    .ui-faq-toolPanel {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 8px 16px;
    
        .faq-search {
            // border: 1px solid #165172;
            width: 100%;
            height: 50px;
            display: flex;
            justify-content: space-between;
            //margin: 8px 0;
    
            .search-input-wrapper {
                display: flex;
                width: 75%;
                border-radius: 4px;
            }
    
            input {
                padding: 8px 16px;
                border: 0;
               // font-size: 20px;
                width: 100%;
    
                &:focus {
                    outline: none;
                    box-shadow: none;
                }
            }
    
            .cancle-search-btn {
                background-color: transparent;
                cursor: pointer;
                position: relative;
                top: 0;
                left: 0;
                border: none;
                padding: 0 16px;
    
                &:active {
                    box-shadow: none;
                }
    
                i {
                    color: #165172;
                    font-size: 20px;
                }
            }
    
            .search-button {
                width: 25%;
            }
    
            /*
            button {
                margin: 0;
                border-radius: 0;
            }
            */
    
            @media screen and (min-width: 550px) {
                width: 55%;
            }
        }
    
        .faq-open-close-btns {
            display: flex;
            justify-content: space-between;
            width: 100%;
            margin-top: 8px;
            padding: 4px 0;
    
            @media screen and (min-width: 550px) {
                width: 45%;
                margin-top: 0;
                justify-content: space-evenly;
            }
    
            button {
                width: 48%;
    
                @media screen and (min-width: 550px) {
                    width: 45%;
                }
              
            }
        }
    
        
    }
    
    .ui-faq-toolPanel-wrapper {
        padding: 8px;
        max-width: 960px;
        margin: auto;
        background-color: #fcfcfc;
        box-shadow: 0px 4px 20px rgba(22, 81, 114, 0.14);
        // margin-top: -36px;
        border-radius: 4px;
    }
    
    .ui-faq-tool__text-not-found-alert {
        padding: 8px 16px;
    }
    
    .ui-faq {
        margin-top: 0;
    
        @media screen and (min-width: 768px) {
            margin-top: -36px;
        }
    }
    
    .highlight {
        font-weight: bold;
        background-color: yellow;
    }
    </style>
    
    <style lang="scss">
    .faq-search {
        border: 2px solid #dfdfdf;
        display: flex;
        padding: 4px;
        border-radius: 4px;
        justify-content: space-between;
        width: 96%;
        box-sizing: border-box;
    
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
    
                @media only screen and (max-width: 1023px) {
                    padding: 12px 8px;
                }
    
                &:focus {
                    outline: none;
                    border: none;
                    box-shadow: none;
                }
            }
        }
    }
    </style>
    