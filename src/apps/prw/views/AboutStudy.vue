<template>
<section class="ui-cp_v1-wrapper">
    <div class="ui-abs-width-limit">
        <div class="ui-cp_v1-wrap">
            <div class="ui-cp_v1-imagearea ui-flex-40">
                <atsd-svg style="max-width: 65%;"></atsd-svg>
            </div>
            <div class="ui-cp_v1-textarea ui-flex-60">
                <h3 class="hyper-heading">{{t('prw.abouthead') }}</h3>
                <div class="ui-cp_v1-p-wrap">
                    <p class="hyper-para" role="heading" aria-label="About Section sub-text" aria-level="2">{{t('prw.about1') }}</p>
                    <p>{{t('prw.about2') }}</p>
                    <p>{{t('prw.about3') }}</p>
                    <p>{{t('prw.about4') }}</p>
                </div>
                
                   <!-- <ui-abutton type="a" href="#js-eligible" class="ux-cta-btn ux-btn ux-btn--tertiary" v-smooth-scroll>{{t('prw.cta-btn')}}</ui-abutton>-->
                
            </div>
        </div>

    </div>
</section>
</template>

<script setup>
//import UiAnchorButtonVue from '@/modules/components/uibutton/src/UiButton.vue'
import AtsdSvg from '@/modules/icons/svgs/atsdSvgTwo.vue'
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

</script>

<style lang="scss">
@import "../assets/styles/_settings.scss";


.st2 {
    opacity: .1;
    fill: $accent-color;
    enable-background: new
}

.st3 {
    fill: $primary-color
}

.ui-cp_v1-wrapper {
    background-color: #fff;

     .hyper-heading {
        color: $accent-color;
        font-size: 2rem;
        letter-spacing: 0.5px;
        margin: 0 0 8px 0;
        padding: 0;
        text-align: center;

        @media only screen and (min-width: 1024px) {
                margin: 0 0 16px 0;
                font-size: 2.5rem;   
                text-align: left; 
        }
    }

    .hyper-para{
        //font-size: 20px;
        //letter-spacing: normal;
        //line-height: 30px;
    
        @media only screen and (min-width: 768px) {
                font-size: 25px;
                letter-spacing: normal;
                line-height: 35px;
            
        }
    }
}

.ui-cp_v1-para {
    color: #6B787C;
}

.ui-cp_v1-header span {
    color: #38a8e3;
}

a.ui-cp_v1-button {
    background-color: #38a8e3;
    color: #fff;
}

a.ui-cp_v1-button:hover {
    background-color: #79858F;
    color: #fff;
}

a.ui-cp_v1-para {
    color: #38a8e3;
}

/*EDIT COLOURS HERE*/

.ui-abs-width-limit {
    max-width: 1100px;
    margin: 0 auto;
}

.ui-cp_v1-wrapper {
    padding: 70px 16px 80px 16px;
}



a.ui-cp_v1-button {
    border-radius: 4px;
    cursor: pointer;
    display: inline-block;
    padding: 8px 20px;
    position: relative;
    text-decoration: none;
    -webkit-transition: all .3s ease;
    transition: all .3s ease;
    vertical-align: middle;
    white-space: nowrap;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 1px;
    text-align: center;
    border: none;
    -webkit-box-shadow: 2px 4px 10px 0px rgba(0, 0, 0, 0.15);
    -moz-box-shadow: 2px 4px 10px 0px rgba(0, 0, 0, 0.15);
    box-shadow: 2px 4px 10px 0px rgba(0, 0, 0, 0.15);
    align-self: flex-start;
}

a.ui-cp_v1-button:hover,
a.ui-cp_v1-button:visited,
a.ui-cp_v1-button:active {
    text-decoration: none;
}

.ui-cp_v1-button {
    margin-right: 8px;
}

.ui-cp_v1-button {
    margin-top: 8px;
}

.ui-cp_v1-wrap {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}

.ui-flex-60 {
    flex: 0 0 60%;
}

.ui-flex-40 {
    flex: 0 0 40%;
}

.ui-cp_v1-textarea {
    /*
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    */
    padding-left: 60px;
    padding-right: 40px;
    text-align: left;
    box-sizing: border-box;
}

.ui-cp_v1-imagearea {
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    overflow: hidden;
    padding: 12px;
    box-sizing: border-box;
    justify-content: center;

    @media only screen and (max-width: 1023px) {
        
            -webkit-box-flex: 0;
            -ms-flex: 0 0 40%;
            flex: 0 0 40%;
            margin: auto;
        
    }
}

.ui-cp_v1-header {
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 32px;
    letter-spacing: 0.35px;
    text-align: center;
    margin-bottom: 40px;
    color: #6B787C;
}

.ui-cp_v1-imagearea img {
    height: auto;
    max-width: 100%;
    margin: auto;
    z-index: 3;
}

.ui-cp_v1-p-wrap {
    margin-bottom: 32px;
}

@media only screen and (max-width: 1023px) {
    .ui-cp_v1-wrap {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
    }

    .ui-cp_v1-textarea {
        -webkit-box-flex: 0;
        -ms-flex: 0 0 100%;
        flex: 0 0 100%;
        padding-left: 0;
        padding-right: 0;
        margin-top: 12px;
        padding-top: 0;
    }

    .ui-cp_v1-p-wrap {
        max-width: 100%;
    }

    
}
</style>
