<template>
    <div>
        <div id="js-map-wrapper" class="map-wrapper">
            <div v-if="isGMapOverlayVisible" id="js-gmap-overlay" class="map-overlay">
                <div class="map-overlay-wrapper">
                    <p class="map-overlay-wrapper__text" v-html="$t('prw.gmap_consent_text')"></p>
                    <centered-layout class="">
                        <ui-button @click="processGMapConsent()" class="ux-btn ux-btn--primary">
                            {{ $t("prw.gmap_consent_button") }}
                        </ui-button>
                    </centered-layout>
                </div>
            </div>
            <div class="map-details-wrapper">
                <div class="map-details">
                    <ui-head :SubHeadAlign="'__left'">
                        <template #head>
                            
                            <div class="ui-studyCenter-flex-wrap">
                                <div class="ui-studyCenter-flex-item __image">
                                    <faq-svg></faq-svg>
                                </div>
                                <div class="ui-studyCenter-flex-item __content">
                                    <h3 v-html="$t('prw.smap_head')"></h3>
                                </div>
                            </div>
                        </template>
                        <template #subhead>
                            {{ $t("prw.smap_p") }}
                        </template>
                    </ui-head>
                    

                    <div class="ui-sdc">
                        <text-input ref="ui_url" class="ui-sdc__input"
                            :placeholder="$t('prw.find_a_site_input_placeholder')" :value="searchTerm"
                            @inputEvent="setSearchInputValue" @keyupEvent="processEnterKey"></text-input>
                        <ui-button ref="searchSiteBtn" style="line-height: 0;" class="ux-btn ux-btn--primary"
                            @click="searchAddress(searchTerm)">{{
                $t("prw.find_a_site_btn") }}</ui-button>
                    </div>
                </div>
            </div>
            <div class="google-map" id="map" ref="googleMap"></div>
        </div>

        <modal-layout v-if="isSiteSearchErrorAlertVisible">
            <alert-layout :alertIcon="getImageUrl('eligble-icon.png')"
                @closeAlertEvent="isSiteSearchErrorAlertVisible = false">
                <template #title>{{ $t("prw.smap_alert") }}</template>
                <template #body>{{ $t("prw.smap_alert_p") }}</template>
            </alert-layout>
        </modal-layout>
    </div>
</template>

<script>
import {
    getSites,
    googleMapUrl,
    gMapOptions,
    gMapConsentCookieExpiryTimeInMins,
    gMapConsentCookieKey as _gMapConsentCookieKey,
} from "@/apps/prw/config";
import Cookies from "js-cookie";
import * as utils from "@/modules/components/common/src/utils";
import UiHeadingVue from "@/modules/components/head-tab/UiHeading.vue";
import UiButtonVue from "@/modules/components/uibutton/src/UiButton.vue";
import ModalLayoutVue from "@/modules/components/layout/ModalLayout.vue";
import AlertLayoutVue from "@/modules/components/layout/AlertLayout.vue";
import CenteredLayoutVue from "@/modules/components/layout/CenteredLayout.vue";
import TextInputVue from "@/modules/components/textinput/TextInput.vue";
import FaqSVG from '@/modules/icons/svgs/FaqSvg.vue';

export default {
    components: {
        "ui-button": UiButtonVue,
        "ui-head": UiHeadingVue,
        "text-input": TextInputVue,
        "modal-layout": ModalLayoutVue,
        "centered-layout": CenteredLayoutVue,
        "alert-layout": AlertLayoutVue,
        "faq-svg": FaqSVG,
    },
    data() {
        return {
            isSiteSearchErrorAlertVisible: false,
            map: null,
            searchBtnElm: null,
            searchTerm: "",
            marker_list: [],
            mapOptions: gMapOptions,
            isGMapOverlayVisible: true,
            mapUrl: googleMapUrl + "&language=" + this.$t("prw.gmap_locale"),
        };
    },

    mounted() {
        if (this.isGmapConsentCookieValid()) {
            this.loadMapScript(this.mapUrl, "gmapScript", this.loadMap);
            this.isGMapOverlayVisible = false;
        } else {
            var gmapOverlay = document.getElementById("map");
            if (gmapOverlay !== null) {
                gmapOverlay.classList.add("gmap-bg");
            }

        }
        utils.setChildHeightToParentHeight("js-map-wrapper", "js-gmap-overlay");
        this.searchBtnElm = this.$refs["searchSiteBtn"];

        //add a native javascript function
        window.populateSite = this.populateSite;
    },

    methods: {
        populateSite(country_iso, site_no) {
            this.$emit('mapSiteSelectEvent', country_iso, site_no)
        },
        getImageUrl(image) {
            return new URL(`../assets/images/${image}`,
                import.meta.url).href
        },
        isGmapConsentCookieValid() {
            if (Cookies.get(_gMapConsentCookieKey) !== undefined) {
                return true;
            }
            return false;
        },
        processGMapConsent() {
            this.enableGMap();
            this.isGMapOverlayVisible = false;
        },
        /*
            removeMapOverlay() {
                var gmapOverlay = document.getElementById("js-gmap-overlay");
                gmapOverlay.classList.add("ui-hide");
            },
            */
        setGMapCookie(gMapConsentCookieKey) {
            Cookies.set(gMapConsentCookieKey, true, {
                expires: gMapConsentCookieExpiryTimeInMins / (24 * 60),
            });
        },
        enableGMap() {
            this.setGMapCookie(_gMapConsentCookieKey);
            this.loadMapScript(this.mapUrl, "gmapScript", this.loadMap);
        },
        processEnterKey(event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                this.searchBtnElm.$el.click();
            }
        },
        setSearchInputValue(value) {
            this.searchTerm = value;
        },

        loadMap: function () {

            this.map = new window.google.maps.Map(this.$refs.googleMap, null);
            this.marker_list = this.createMarkers(getSites);
            let marker_data_list = [];

            for (let marker of this.marker_list) {
                if (marker.active == true) {
                    marker_data_list.push(
                        `<div id='content'>
                            <h2 class='gm-heading'> ${marker.name} </h2>
                            <div id='bodyContent'>
                                <p><i class="fa-solid fa-location-dot [ mr-2 ]"></i> ${marker.address}</p>
                                <p><i class="fa-solid fa-envelope [ mr-2 ]"></i> ${marker.email}</p>
                                <p><i class="fa-solid fa-phone [ mr-2 ]"></i> ${marker.phone}</p>
                                <div class="populate-pc-form" style="display:none">
                                    <hr/>
                                    <button class="ux-btn ux-btn--primary ux-btn--small" onclick="event.preventDefault();populateSite('${marker.country}','${marker.id}')">${ this.$t('prw.pc_choose_site') }</button>
                                </div>
                                </div>
                        </div>`
                    );
                } else {
                    `<div id='content'>Site is not active</div>`;
                }
            }

            // FIT DISPLAY TO CONTAIN ALL MARKERS
            var bounds = new window.google.maps.LatLngBounds();
            this.marker_list.forEach((marker, i) => {
                bounds.extend(marker.getPosition());
                this.attachMarkerMessage(marker, marker_data_list[i]);
            });

            this.map.fitBounds(bounds);
            this.map.setOptions(this.mapOptions);

            const input = document.getElementById("js-ui-sdc-input");
            
            const searchBox = new window.google.maps.places.Autocomplete(input, {
                fields: ["place_id", "geometry", "formatted_address", "name"],
            });
            window.google.maps.event.addListener(searchBox, "place_changed", () => {
                const place = searchBox.getPlace();
                if (!place.geometry) {
                    return;
                }
                this.searchAddress(place.formatted_address);
            });
            searchBox.bindTo("bounds", this.map);
            this.map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(input);
            input.style.display = 'initial';
        },

        loadMapScript(_src, id, callback) {
            /*
            let script = document.getElementById(id);

            if (script !== null) {
                utils.removeScript(id);
            }else{
                utils.addScript(_src, id, callback);
                console.log("script loaded")
            }
            */
            let script = document.getElementById(id)

            if (script !== null) {
                utils.removeScript(id);
            }

            utils.addScript(_src, id, callback)

        },

        findNearestMarker: function (lat, lng) {
            var R = 6371; // radius of earth in km
            var distances = [];
            var closest = -1;
            for (let i = 0; i < this.marker_list.length; i++) {
                var mlat = this.marker_list[i].position.lat();
                var mlng = this.marker_list[i].position.lng();
                var dLat = this.rad(mlat - lat);
                var dLong = this.rad(mlng - lng);
                var a =
                    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                    Math.cos(this.rad(lat)) *
                    Math.cos(this.rad(lat)) *
                    Math.sin(dLong / 2) *
                    Math.sin(dLong / 2);
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                var d = R * c;
                distances[i] = d;
                if (closest == -1 || d < distances[closest]) {
                    closest = i;
                }
            }

            return closest;
        },

        searchAddress: function (searchTerm) {
            // DISTANCE AND NEAREST MARKER SELECTOR
            var geocoder = new window.google.maps.Geocoder();
            var lat = "";
            var lng = "";

            geocoder.geocode({
                    address: searchTerm,
                },
                (results, status) => {
                    if (status === window.google.maps.GeocoderStatus.OK) {
                        lat = results[0].geometry.location.lat();
                        lng = results[0].geometry.location.lng();
                        var nearest_marker =
                            this.marker_list[this.findNearestMarker(lat, lng)];
                        this.map.panTo(nearest_marker.getPosition());
                        this.map.setZoom(6);
                        nearest_marker.infowindow.open(
                            nearest_marker.get("map"),
                            nearest_marker
                        );
                    } else {
                        /*
                                    alert(
                                        "Geocode was not successful for the following reason: " + status
                                    );
                                    */
                        this.isSiteSearchErrorAlertVisible = true;
                    }
                }
            );
        },

        rad: function (x) {
            return (x * Math.PI) / 180;
        },

        // ATTACH DATA AND MESSAGE TO MARKERS
        attachMarkerMessage: function (marker, message) {
            var infowindow = new window.google.maps.InfoWindow({
                content: message,
            });

            marker.infowindow = infowindow;

            marker.addListener("click", () => {
                if (this.currentInfoWindow) {
                    this.currentInfoWindow.close();
                }
                infowindow.open(marker.get("map"), marker);
                this.currentInfoWindow = infowindow;
            });
        },

        createMarkers(sites) {
            const markers = [];
            sites.forEach(site => {
                const marker = new window.google.maps.Marker({

                    active: true,
                    country: site.country,
                    id: site.id,
                    name: site.name,
                    address: site.address,
                    email: site.email,
                    phone: site.phone,
                    position: site.position,
                    map: this.map,

                    icon: {
                        url: '/map-pin.svg',
                    },
                });
                markers.push(marker);
            });
            return markers;
        }
    },
};
</script>


<style lang="scss">
@import "../assets/styles/_settings.scss";

.map-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    //padding: 40px 0;

    @media only screen and (min-width: 1025px) {
        flex-direction: row;
    }

    .ui-studyCenter-flex-wrap {
        display: flex;
        align-items: center;

        .ui-studyCenter-flex-item.__image {
            flex: 0 0 15%;
        }

        .ui-studyCenter-flex-item.__content {
            flex: 0 0 85%;
        }
    }

    .map-details-wrapper {
        // width: 100%;
        // background-color: rgba(38, 165, 221, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 32px 16px;
        width: 100%;
        box-sizing: border-box;
        background: rgb(1,81,114);
        background: linear-gradient(0deg, rgba(1,81,114,1) 0%, rgba(1,126,163,1) 100%);

        @media only screen and (min-width: 1025px) {
            width: 50%;
            padding: 16px;
        }

        .map-details {
            
            .ui-head, .ui-subhead {
                color: white;
                margin-bottom: 8px;
                margin-top: 0;;
            }

            .ui-head h3{
                margin: 0;
            }
        }

    }

    #map {
        //top: -50px;
        height: 500px;
        width: 100%;
        //max-width: 960px;
       // margin: auto;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

        @media only screen and (min-width: 1025px) {
             width: 50%;
             height: 600px;
        }

        .gm-style .gm-style-iw-tc {
            filter: drop-shadow(0 4px 2px rgba(0, 0, 0, .3)) !important;
            width: 20px !important;
        }

        .gm-style .gm-style-iw-tc::after {
            height: 32px;
            width: 20px;
        }

        .gm-style-iw-t {
            bottom: 55px !important;
        }

        #content {
            width: 250px;
            background-color: whitesmoke;
            border-radius: 5px;

            h2.gm-heading {
                margin: 0;
                font-size: 16px;
                padding: 12px 24px 12px 20px;
                color: #333;
                letter-spacing: 1px;
                line-height: 1.5em;
                border-bottom: 1px solid #dfdfdf;
            }

            #bodyContent {
                padding: 12px 16px;

                p {
                    font-size: 15px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 24px;
                    letter-spacing: 0.5px;
                    text-align: left;
                    margin-bottom: 12px;

                    &:last-child {
                        margin-bottom: 0;
                    }
                }
            }
        }

    }
}

.ui-sdc {
    border: 2px solid #dfdfdf;
    display: flex;
    padding: 4px;
    border-radius: 4px;
    justify-content: space-between;
    width: 96%;
    height: 50px;
    box-sizing: border-box;
    margin-top: 20px;
    background: white;

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
            padding: 8px 16px;

            @media only screen and (max-width: 1023px) {
                //padding: 12px 2px;
            }

            &:focus {
                outline: none;
                border: none;
                box-shadow: none;
            }
        }
    }
}


.google-map {
    &.gmap-bg {
        background-image: url("../assets/images/map-placeholder.png");
        background-repeat: no-repeat;
        background-position: 90%;
        background-size: cover;
    }
}

.map-overlay {
    position: absolute;
    height: 500px;
    width: 100%;
    background-color: rgba(0, 0, 0, .5);

    display: flex;
    align-items: center;

    &.ui-hide {
        visibility: hidden;
        opacity: 0;
        transition: all 0.09s;
    }
}

.map-overlay-wrapper {
    background: white;
    padding: 20px;
    border-radius: 5px;
    max-width: 400px;
    margin: auto;

    &__text {
        color: black;
        text-align: center;
    }
}
</style>
