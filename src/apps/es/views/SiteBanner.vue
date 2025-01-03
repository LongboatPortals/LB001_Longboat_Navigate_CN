<template>
<section class="es-headmast ui-section">
    <div class="v2-flxrow ui-header-max-width">
        <div class="v2-flxcol">
            <p class="es-headmast__banner-header" aria-level="1" role="heading" aria-label="Heading of Welcome text" tabindex="0">{{t('survey.ats_banner_text')}}</p>
            <p class="es-headmast__banner-text" aria-level="2" role="heading" aria-label="Heading of About study page" tabindex="0">{{t('survey.ats_banner_subtext')}}</p>
            <leftee-layout>
                <ui-abutton id="pd-es-start-survey" type="a" href="#js-survey" class="ux-btn ux-btn--primary" v-smooth-scroll>{{t('survey.ats_btn_label')}}</ui-abutton>
            </leftee-layout>
        </div>
        <div class="v2-flxcol">
            <div v-if="isBannerImageLoaded" class="ui-abt-deco3">
                <div class="ui-circle"></div>
            </div>

            <div v-if="isBannerImageLoaded" class="ui-abt-deco1">
                <div class="ui-ellipsis"></div>
            </div>
            <div class="main-img">
                <img class="es-headmast__banner-image img-fluid" src="../assets/images/nav.jpg" @load="isBannerImageLoaded = true" alt="background image of the survey page">
            </div>
        </div>
    </div>
</section>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import LefteeLayout from '@/modules/components/layout/LefteeLayout.vue';
import UiAbutton from '@/modules/components/uibutton/src/UiButton.vue';


// Setup i18n
const { t } = useI18n();

const isBannerImageLoaded = ref(false);


</script>

<style lang="scss">
@import "../assets/styles/_settings.scss";

$banner-bg-color: #F5F5F5 !default;
$banner-heading-text-color: #005172 !default;
$banner-body-text-color: #384144 !default;
$banner-btn-color: #b2ff08 !default;
$ellipsis-bg-color: #A8B1BD !default;
$circle-bg-color: #007ea3 !default;
$rect-bg-color: #007ea3 !default;



.es-headmast {
    background-color: $banner-bg-color;
    padding-top: 130px;

    &::before {
        content: "";
        background: rgba($rect-bg-color, 0.2);
        width: 30%;
        height: 500px;
        position: absolute;
        right: 0;
        top: 0;
        border-bottom-left-radius: 57px;

        @media screen and (min-width:1250px) {
            height: 600px;
        }
    }

    &__banner-header {
        font-weight: 300;
        font-size: 1.75rem;
        line-height: 1.3em;
        letter-spacing: 1px;
        color: $banner-heading-text-color;
        text-align: left;
        margin: 0;
        max-width: 550px;

        @media screen and (min-width: 767px) {
            font-size: 3rem;
            line-height: 60px;
        }
    }

    &__banner-text {
        text-align: left;
        font-size: 1.25rem;
        line-height: 1.3em;
        letter-spacing: 0.354167px;
        color: $banner-body-text-color;
        margin: 24px 0;
        max-width: 450px;

        @media screen and (min-width: 767px) {
            font-size: 1.5rem;
            line-height: 30px;
        }
    }

    &__banner-image {
        border-radius: 20px;
    }
}

.v2-flxrow {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
}

.v2-flxcol {
    margin: 1rem .5em;
    z-index: 1;
}

.v2-flxcol:nth-child(2) {
    position: relative;
}

@media screen and (min-width: 767px) {
    .v2-flxrow {
        flex-direction: row;
    }

    .v2-flxcol:first-child {
        flex-basis: 60%;
    }

    .v2-flxcol:nth-child(2) {
        flex-basis: 40%;
    }
}

.ui-abt {

    &-deco1 {
        position: absolute;
        top: -7%;
        left: -15%;
        opacity: .4;

        .ui-ellipsis {
            height: 88px;
            width: 221px;
            background-color: $ellipsis-bg-color;
            border-radius: 70px;

            @media screen and (min-width: 1000px) {
                height: 150px;
                width: 300px;
            }
        }
    }

    &-deco3 {
        position: absolute;
        top: 20%;
        right: -24px;

        .ui-circle {
            height: 80px;
            width: 80px;
            background-color: $circle-bg-color;
            border-radius: 50%;
        }

    }

}

.elig-btn {

        background-color: $banner-btn-color;

        &:hover{
            background-color: color.adjust($banner-btn-color, $lightness: 10%);
        }
}

.main-img {
    position: relative;
}
</style>
