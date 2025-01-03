<template>
    <div :id="cookieModalElmId">
        <cookie-law :storageName="cookieString" storageType="cookies" position="top" aria-modal="true" role="dialog"
            transitionName="slideFromTop" v-slot="props" @accept="accepted" @close="rejected">
            <div class="cookie-flex" aria-modal="true" role="dialog" aria-label="cookie dialog">
                <p class="cookie-text" aria-modal="true" role="dialog">
                    <slot name="body-content"></slot>
                </p>
                <div class="cookie-btn-wrap">
                    <ui-button id="pd-cookie-accept" class="ux-btn ux-btn--small ux-btn--primary" @click="props.accept">
                        <slot name="accept-btn-text"></slot>
                    </ui-button>
                    <br />
                    <ui-button id="pd-cookie-reject" class="reject-btn ux-btn" @click="props.close">
                        <slot name="reject-btn-text"></slot>
                    </ui-button>
                </div>
            </div>
        </cookie-law>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Cookies from 'js-cookie';
import CookieLaw from './CookieLaw.vue';

const cookieModalElmId = 'ui-modal';
const cookieModalElmVisibility = {
    visible: 'block',
    hidden: 'none',
};

const cookieString = 'CNcookies';
const cookieStringValue = {
    true: 'true',
    false: 'false',
};
const status = ref(false);

function setStatus(_status) {
    status.value = _status;
}

function initializeConsentStatus() {
    const cookieValue = Cookies.get(cookieString);
    if (cookieValue === cookieStringValue.false) {
        setStatus(false);
    } else if (cookieValue === cookieStringValue.true) {
        setStatus(true);
    }
}

function accepted() {
    const modal = document.getElementById(cookieModalElmId);
    if (modal) {
        modal.style.display = cookieModalElmVisibility.hidden;
    }
    Cookies.set(cookieString, cookieStringValue.true, { expires: 1, path: window.location.href });
    setStatus(true);
}

function rejected() {
    Cookies.set(cookieString, cookieStringValue.false, { expires: 1, path: window.location.href });
    const modal = document.getElementById(cookieModalElmId);
    if (modal) {
        modal.style.display = cookieModalElmVisibility.hidden;
    }
}

onMounted(() => {
    const modal = document.getElementById(cookieModalElmId);
    if (Cookies.get(cookieString) === cookieStringValue.false) {
        if (modal) {
            modal.style.display = cookieModalElmVisibility.hidden;
        }
    }
    initializeConsentStatus();
});
</script>

<style lang="scss">
/* The Modal (background) */
#ui-modal {
    position: fixed;
    z-index: 999;
    padding-top: 100px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(75, 75, 75, 0.6);
}



.reject-btn {
    color: #007ea3 !important;

    &:hover {
        color: #09a4d3 !important;
        text-decoration: underline;
    }
}

.Cookie--base {
    background:#efefef !important;
    color: white !important;
    padding: 20px 16px 20px !important;
}

.Cookie {
    flex-direction: row !important;

    @media screen and (min-width: 1025px) {
        flex-direction: column !important;
    }
}

.Cookie>* {
    margin: auto;
    text-align: center;
}



.privacy-link {
    color: #007ea3 !important;
    text-decoration: underline;

    &:hover {
        text-decoration: underline;
    }
}
.cookie-flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1400px;
    background-color: #fff;
    padding: 16px 16px;
    box-shadow: $box-shadow;
    @media screen and (max-width: 767px) {
        flex-direction: column;
    }
    .cookie-text {
        text-align: left;
        margin: 0;
        font-size: 16px;
        margin-bottom: 0;
        padding-right: 32px;
        color:#333;
        @media screen and (max-width: 767px) {
            text-align: center;
            padding-right: 0;
            margin-bottom: 16px;
        }
    }
    #pd-cookie-accept{
        min-width: 130px;
        background-color: $cookie-accept-color;
        &:hover{
            background-color: color.adjust($cookie-accept-color, $lightness: -10%);
        }
    }
    #pd-cookie-reject{
        min-width: 240px;
        padding-bottom: 0;
    }
}
</style>