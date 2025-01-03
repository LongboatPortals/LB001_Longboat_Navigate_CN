<template>
    <section class="ui-share ui-section">
        <div class="ui-max-width">
            <div class="ui-share-flex-wrap">
                <div class="ui-share-flex-item __image">
                    <share-svg></share-svg>
                </div>
                <div class="ui-share-flex-item __content">
                    <div class="ui-head">
                        <h3 v-html="t('prw.share_head')"></h3>
                        <p class="">{{ t('prw.share_subhead') }}</p>
                        <div class="ui-share__copy">
                            <span class="ui-share__link-icon">
                                <i class="fa-duotone fa-link link-icon" role="none"></i>
                            </span>
                            <div class="ui-share-flexwrap">
                                <input ref="ui_url" class="ui-share__link" aria-label="Text box with study URL"
                                    type="text" :value="t('prw.share_link')" disabled>
                                <ui-tooltip :isVisible="isTooltipVisible">
                                    <template #component>
                                        <ui-button id="pd-prw-sharestudy" class="share-btn ux-btn ux-btn--primary"
                                            @click="copyLink">{{ t('prw.share_copy') }}</ui-button>
                                    </template>
                                    <template #alert-text>{{ t('prw.shared_copy') }}</template>
                                </ui-tooltip>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n'
import UiButton from '@/modules/components/uibutton/src/UiButton.vue';
import UiTooltip from '@/modules/components/uitooltip/UiTooltip.vue';
import ShareSvg from '@/modules/icons/svgs/FindAStudy.vue';

const { t } = useI18n()

// Define refs
const urlElm = ref(null);
const isTooltipVisible = ref(false);

// Function to copy link to clipboard
const copyLink = () => {
    urlElm.value.disabled = false;
    urlElm.value.select();
    document.execCommand('copy');
    urlElm.value.disabled = true;
    isTooltipVisible.value = true;
    setTimeout(removeTooltip, 1500);
};

// Function to remove tooltip after a delay
const removeTooltip = () => {
    isTooltipVisible.value = false;
};

// On component mount, set the input reference
onMounted(() => {
    //urlElm.value = document.querySelector('input[ref=ui_url]');
    urlElm.value = document.querySelector('.ui-share__link');
});
</script>

<style lang="scss" scoped>
@import "../assets/styles/_settings.scss";

.ui-share {
    background: $share-section-bg-color;

    &__body {
        color: white;
    }

    &__copy {
        background: #F5F5F5;
        border-radius: 4px;
        display: flex;
        justify-content: flex-start;
        max-width: 80%;
        margin-top: 16px;
        margin-left: 16px;

        @media screen and (max-width: 767px) {
            max-width: 100%;
            margin-left: 0;
        }
    }

    &__link {
        color: #4e5157;
        padding: 0 8px;
        background: transparent;
        border: none;
        // max-width: 100px;
        text-align: center;
        font-size: 1rem;
        width: 70%;
        flex: 2;


        &:disabled {
            -webkit-text-fill-color: #4e5157;
            color: #4e5157;
        }

        &:focus {
            background-color: none;
            outline: none;
        }

        @media screen and (min-width: 767px) {
            font-size: 18px;
        }
    }

    &__link-icon {
        color: #4e5157;
        padding: 8px 16px;
        border-right: 0.5px solid #cfcfcf;
        display: flex;
        align-items: center;

        @media screen and (max-width: 767px) {
            display: none;
        }
    }
}

.ui-share-flexwrap {
    display: flex;
    padding: 4px;
    min-width: 320px;
    flex: 2;
}

.share-btn {
    background-color: $share-btn-color;

    &:hover {
        background-color: color.adjust($share-btn-color, $lightness: -10%);
    }
}

.fa-link {
    --fa-primary-color: $primary-color;
    --fa-primary-opacity: 1;
    --fa-secondary-color: #676363;
    --fa-secondary-opacity: 0.5;
}

.ui-share-flex-wrap {
    display: flex;
    align-items: center;

    @media screen and (max-width: 767px) {
        flex-wrap: wrap;
        justify-content: center;
    }

    .ui-share-flex-item {
        &.__image {
            flex: 0 0 15%;

            @media screen and (max-width: 767px) {
                flex: 0 0 25%;
            }
        }

        &.__content {
            flex: 0 0 85%;

            h3,
            p {
                color: #fff;
                text-align: left;
                margin: 0 0 0 16px;

                @media screen and (max-width: 767px) {
                    margin: 0;
                    text-align: center;
                }
            }
        }
    }
}
</style>
