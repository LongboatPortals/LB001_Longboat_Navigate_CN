<template>
    <consent-layout @dropdownLocaleChangeEvent="reloadVideos()">
        <div :key="reloadVideosKey">
            <cn-video style="margin-bottom: 48px" :videoID="$t('cn.video_one')">
                <template #icon>
                    <Icon icon="fa-solid:play-circle" iconSize="50px" />
                </template>
                <template #info>
                    <h4 class="video__title" tabindex="0">{{ $t('cn.video_caption_one') }}</h4>
                    <p class="video__subtitle" tabindex="0">{{ $t('cn.video_caption_one_text') }}</p>
                </template>
            </cn-video>

            <cn-video style="margin-bottom: 48px" :videoID="$t('cn.video_two')">
                <template #icon>
                    <Icon icon="fa-solid:play-circle" iconSize="50px" />
                </template>
                <template #info>
                    <h4 class="video__title" tabindex="0">{{ $t('cn.video_caption_two') }}</h4>
                    <p class="video__subtitle" tabindex="0">{{ $t('cn.video_caption_two_text') }}</p>
                </template>
            </cn-video>

            <cn-video style="margin-bottom: 48px" :videoID="$t('cn.video_three')">
                <template #icon>
                    <Icon icon="fa-solid:play-circle" iconSize="50px" />
                </template>
                <template #info>
                    <h4 class="video__title" tabindex="0">{{ $t('cn.video_caption_three') }}</h4>
                    <p class="video__subtitle" tabindex="0">{{ $t('cn.video_caption_three_text') }}</p>
                </template>
            </cn-video>

            <cn-video style="margin-bottom: 48px" :videoID="$t('cn.video_four')">
                <template #icon>
                    <Icon icon="fa-solid:play-circle" iconSize="50px" />
                </template>
                <template #info>
                    <h4 class="video__title" tabindex="0">{{ $t('cn.video_caption_four') }}</h4>
                    <p class="video__subtitle" tabindex="0">{{ $t('cn.video_caption_four_text') }}</p>
                </template>
            </cn-video>

            <cn-video style="margin-bottom: 48px" :videoID="$t('cn.video_five')">
                <template #icon>
                    <Icon icon="fa-solid:play-circle" iconSize="50px" />
                </template>
                <template #info>
                    <h4 class="video__title" tabindex="0">{{ $t('cn.video_caption_five') }}</h4>
                    <p class="video__subtitle" tabindex="0">{{ $t('cn.video_caption_five_text') }}</p>
                </template>
            </cn-video>
        </div>
    </consent-layout>
</template>

<script setup>
import { useReloadData, useReloadMethods } from '../utils';
import CnVideo from "@/modules/components/wistiavideo/src/WistiaVideo.vue";
import Icon from "@/modules/components/icon/src/UiIcon.vue";
import ConsentLayout from "./CnLayout.vue";


const { reloadVideosKey } = useReloadData();
const { reloadVideos } = useReloadMethods(reloadVideosKey);
</script>
