<template>
<section class="prw-headmast ui-section">
    <div class="v2-flxrow ui-header-max-width">
        <div class="v2-flxcol">
            <p class="prw-headmast__banner-header" role="heading" aria-label="Heading Text of Study" aria-level="1">{{t('prw.ats_banner_text')}}</p>
            <p class="prw-headmast__banner-text" role="heading" aria-label="Sub-text Text of Study" aria-level="2">{{t('prw.ats_banner_subtext')}}</p>
            <leftee-layout>
                <ui-abutton class="ux-cta-btn ui-cta-btn ux-btn ux-btn--tertiary" type="a" @click="emitEligibilityBtnEvent">{{ t('prw.cta-btn') }}</ui-abutton>
            </leftee-layout>
        </div>
        <div class="v2-flxcol">
            <div v-if="isBannerImageLoaded" class="ui-abt-deco3">
                <div class="ui-circle"></div>
            </div>

            <div v-if="isBannerImageLoaded" class="ui-abt-deco1">
                <div class="rectangle"></div>
            </div>
            <div class="main-img">
                <img class="prw-headmast__banner-image img-fluid" src="@/assets/images/nav.jpg" @load="isBannerImageLoaded = true" aria-label="Background image of the study"  alt="sitemenu background image and objects designs">
            </div>
        </div>
    </div>
</section>
</template>

<script setup>
import { ref } from 'vue'
import LefteeLayout from '@/modules/components/layout/LefteeLayout.vue'
import UiAbutton from '@/modules/components/uibutton/src/UiButton.vue'
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const emit = defineEmits(['eligibilityBtnEvent']);

// Reactive state
const isBannerImageLoaded = ref(false)

const emitEligibilityBtnEvent = () => {
    emit('eligibilityBtnEvent')
}

</script>

<style lang="scss" scoped>
@import "../assets/styles/_settings.scss";
.prw-headmast {
    background-color: #F5F5F5;
    padding-top: 130px;

    &::before {
        content: "";
        background: rgba($deco-color, 0.2);
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
        line-height: 2rem;
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
        line-height: 1.5rem;
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

        .rectangle {
            height: 88px;
            width: 221px;
            background-color: #A8B1BD;
            border-radius: 70px;

            @media screen and (min-width: 1000px) {
                height: 150px;
                width: 300px;
            }
        }
    }

    &-deco2 {
        background: $deco-color;
        padding: 4px;
        width: 60px;
        box-shadow: 8px 8px 49px rgba(0, 0, 0, 0.15);
        border-radius: 12px;
        position: absolute;
        bottom: -15px;
        left: -20px;
        z-index: 9;
        display: flex;
        flex-direction: column;
        align-items: flex-end;

        .ui-circle {
            height: 18px;
            width: 18px;
            background-color: #F5F5F5;
            border-radius: 50%;
        }

        .ui-rec {
            width: 54px;
            height: 8px;
            background-color: #F5F5F5;
            border-radius: 30px;
            margin-top: 8px;
        }

        .ui-rec:nth-child(3) {
            width: 35px;
            margin-bottom: 16px;
        }

        @media screen and (min-width: 1000px) {}
    }

    &-deco4 {
        background: white;
        padding: 4px 8px;
        width: 90px;
        box-shadow: 8px 8px 49px rgba(0, 0, 0, 0.15);
        border-radius: 12px;
        position: absolute;
        bottom: 71px;
        right: -16px;
        z-index: 9;
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        @media screen and (min-width: 767px) {
            bottom: 145px;
            right: -24px;
        }

        .ui-rec {
            width: 75%;
            height: 8px;
            background-color: #A8B1BD;
            border-radius: 30px;
            margin-top: 8px;
        }

        .ui-rec:nth-child(2) {
            width: 50%;
            margin-bottom: 8px;
        }

        .ui-circle {
            height: 14px;
            width: 14px;
            background-color: $deco-color;
            border-radius: 50%;
        }

    }

    &-deco3 {
        position: absolute;
        top: 20%;
        right: -24px;

        .ui-circle {
            height: 80px;
            width: 80px;
            background-color: $deco-color;
            border-radius: 50%;
        }

    }

}

.elig-btn {

        background-color: $banner-elig-btn-color;

        &:hover{
            background-color:  color.adjust($banner-elig-btn-color, $lightness: 10%);
        }
}

.main-img {
    position: relative;
}
</style>
