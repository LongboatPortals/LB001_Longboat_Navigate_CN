<template>
<section class="timeline-section ui-section">
    <div class="timeline-section-wrapper">
    <div class="ui-max-width">
            <div class="ui-timeline-flex-wrap">
            <div class="ui-timeline-flex-item __image">
                <timeline-svg></timeline-svg>
            </div>
            <div class="ui-timeline-flex-item __content">
            <ui-head>
                <template #head>
                    <h3 class="timeline-head" v-html="t('prw.timeline_head')"></h3>
                </template>
                <template #subhead>
                    <p class="timeline-para" v-html="t('prw.timeline_p')"></p>
                </template>
            </ui-head>        
            </div>
        </div>
    </div>
</div>
<div class="ui-tl-v2-outer">
    <div class="ui-max-width">
        <ui-timeline class="ui-timeline" :ImageSrc="getImageUrl('screening.png')">
            <template #title><h4 class="ui-tl-v2-header">{{t('prw.timeline_stage1')}}</h4></template>
            <template #content>
                <p class="ui-tl-v2-para">{{t('prw.timeline_stage1_p')}}</p>
            </template>
        </ui-timeline>

        <ui-timeline class="ui-timeline" :ImageSrc="getImageUrl('treatment.png')">
            <template #title><h4 class="ui-tl-v2-header">{{t('prw.timeline_stage2')}}</h4></template>
            <template #content>
                <p class="ui-tl-v2-para">{{t('prw.timeline_stage2_p')}}</p>
                <p class="ui-tl-v2-para">{{t('prw.timeline_stage2_p')}}</p>
            </template>
        </ui-timeline>

        <ui-timeline class="ui-timeline" :ImageSrc="getImageUrl('follow-up.png')">
            <template #title><h4 class="ui-tl-v2-header">{{t('prw.timeline_stage3')}}</h4></template>
            <template #content>
                <p class="ui-tl-v2-para">{{t('prw.timeline_stage3_p')}}</p>
            </template>
        </ui-timeline>
    </div>
    </div>

</section>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import UiHead from '@/modules/components/head-tab/UiHeading.vue';
import UiTimeline from '@/modules/components/uitimeline/UiTimelineClassic.vue';
import TimelineSvg from '@/modules/icons/svgs/TimelineSvg.vue';

// Importing i18n and required components
const { t } = useI18n();

// Function to get the image URL
const getImageUrl = (image) => {
  return new URL(`../assets/images/${image}`, import.meta.url).href;
};
</script>

<style lang="scss">
@import "../assets/styles/_settings.scss";


.ui-tl-v2-outer {
    background-color: tim-section-bg-color;
}

.ui-tl-v2-img-wrap {
    background-color: timline-img-bg-color;
}

.timeline-section {
    padding: 0;
    .timeline-section-wrapper {
        padding: 32px 16px 32px 16px;
        background-color: timeline-section-bg-color;
        @media screen and (max-width: 768px) {
            padding: 16px 8px;
        }
        .ui-subhead{
        margin: 0 0 0 16px;
        max-width: 100%;
        }
    }
    .ui-tl-v2-outer{
        padding: 64px 16px;
    }

    .timeline-head {
        color: $primary-color;
        text-align: left;
        margin: 0 0 0 16px;

    }
    .timeline-para{
        text-align: left;
    }
    h4{
        margin: 0;
        font-size: 24px;
        font-style: normal;
        font-weight: 400;
        line-height: 32px;
        letter-spacing: 0.3px;
        margin-bottom: 8px;
    }
}


.ui-timeline-flex-wrap{
    display: flex;
    align-items: center;
        .ui-timeline-flex-item {
            &.__image {
                flex: 0 0 15%;
            }
            &.__content {
                flex: 0 0 85%;
            }
        }
}
</style>
    