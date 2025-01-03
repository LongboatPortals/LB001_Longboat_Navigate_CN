<template>
    <div class="question-tab-rockstar" :class="{'question-tab-rockstar--active': isActive}">
        <div class="question-tab-rockstar__indicator"></div>
        <div class="question-tab-rockstar__textarea" tabindex="0">
            <!-- @slot Use this slot to provide the question -->
            <slot name="text"></slot>
    
            <!-- @slot Use this slot to provide select options for the question -->
            <slot name="options"></slot>
        </div>
    </div>
    </template>
    
    <script setup>
    
    /**
     * Props for Question Tab component
     */
    defineProps({
        /**
         * Determines if the tab is active
         */
        isActive: {
            type: Boolean,
            required: false,
            default: false
        }
    });
    </script>
    
    <style lang="scss">
    .question-tab-rockstar {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: start;
        -ms-flex-align: start;
        align-items: flex-start;
        position: relative;
        z-index: 1;
    
        &:before, &:after {
            content: "";
            width: 2px;
            position: absolute;
            left: 7px;
            top: 0;
            bottom: 0;
            //  background-color: #39a8e3;
            z-index: -1;
            
        }
    
        &:before{
           height: 100%; 
        }
    
        &:after {
            height: 0;
        }
    
        &__textarea {
            padding: 16px 24px;
            margin-bottom: 16px;
            position: relative;
            border-radius: 6px;
            z-index: 2;
            -webkit-box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, .18);
            box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, .18);
            flex: 1;
            text-align: left;
    
            @media only screen and (max-width: 1023px) {
                padding: 16px;
            }
        }
    
        &:last-child .question-tab-rockstar__textarea {
            margin-bottom: 0;
        }
    
        &__indicator {
            width: 16px;
            min-width: 16px;
            height: 16px;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            margin-right: 24px;
            border-radius: 50%;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            /* border: 4px solid #efefef;*/
            // background-color: #39a8e3;
            //   background-color: #a8b1bd;
        }
    
        &:before, &:after,
        &__indicator {
            background-color: #dadada;
            transition: all 0.9s;
        }
    
        &--active {
           
    
            &:after{
                height: 100%;
            }
    
            &:after,
            .question-tab-rockstar__indicator {
                background-color: #39a8e3;
            }
        }
    
    }
    </style>
    