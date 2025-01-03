<template>
    <div id="gmap" class="ui-map" ref="googleMap">
        <!-- Conditionally show search input based on the `showSearchInput` prop -->
        <div v-show="props.showSearchInput && isSearchInputVisibleInOverlay" class="map-search-control">
            <input type="text" v-model="searchQuery" @keyup.enter="searchAddress(searchQuery)"
                :placeholder="$t('prw.find_a_site_input_placeholder')" class="search-input"
                aria-label="Text box for searching study center near you" />
            <button ref="searchSiteBtn" @click.prevent="searchAddress(searchQuery)" @keyupEvent="processEnterKey"
                class="ux-btn ux-btn--tertiary">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" width="24"
                    height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                    stroke-linecap="round" stroke-linejoin="round" role="none">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <circle cx="10" cy="10" r="7" />
                    <line x1="21" y1="21" x2="15" y2="15" />
                </svg>
            </button>
        </div>
        <div v-if="isGMapOverlayVisible" id="js-gmap-overlay" class="map-overlay">
            <div class="map-overlay-wrapper">
                <div>
                    <p class="map-overlay-wrapper__text" v-html="$t('prw.gmap_consent_text')"></p>
                    <centered-layout>
                        <ui-button @click="processGMapConsent()" class="ux-btn ux-btn--primary">
                            {{ $t("prw.gmap_consent_button") }}
                        </ui-button>
                    </centered-layout>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import Cookies from 'js-cookie';
import { gMapConsentCookieExpiryTimeInMins, gMapConsentCookieKey as _gMapConsentCookieKey } from '@/apps/prw/config';
import { Loader } from '@googlemaps/js-api-loader';
import CenteredLayout from '@/modules/components/layout/CenteredLayout.vue';
import UiButton from '@/modules/components/uibutton/src/UiButton.vue';
import { useI18n } from 'vue-i18n';


// Emitting events
const emit = defineEmits(['mapSiteSelectEvent', 'siteSearchNotFoundEvent']);

const { t } = useI18n();

const searchQuery = ref('');
const isGMapOverlayVisible = ref(true);
const isSearchInputVisibleInOverlay = ref(false);
const map = ref(null);
const markerList = ref([]);
const placesService = ref(null);
const gMapLoader = ref(null);
const isSiteSearchErrorAlertVisible = ref(false);
const searchControl = ref(null);

const props = defineProps({
    sites: { type: Array, required: true },
    googleMapApiKey: { type: String, required: true },
    googleMapOptions: { type: Object, required: true },
    showSearchInput: { type: Boolean, default: false },
    searchTerm: { type: String, default: '' },
});

function emitSiteDetails(country, id, name, address, email, phone) {
  const site = { country, id, name, address, email, phone };
  emit('mapSiteSelectEvent', site);
}

onMounted(() => {
    window.emitSiteDetails = emitSiteDetails;
    addTemplateSearchControl();
    if (isGmapConsentCookieValid()) {
        isGMapOverlayVisible.value = false;
        isSearchInputVisibleInOverlay.value = true;
        loadMap();
    } else {
        addGMapOverlayBackground();
    }
});

watch(
    () => props.searchTerm,
    (newTerm) => {
        if (newTerm) {
            searchAddress(newTerm);
        }
    }
);

const addTemplateSearchControl = () => {
    searchControl.value = document.querySelector('.map-search-control');
};

const setGMapCookie = () => {
    Cookies.set(_gMapConsentCookieKey, true, {
        expires: gMapConsentCookieExpiryTimeInMins / (24 * 60),
    });
};

const isGmapConsentCookieValid = () => Cookies.get(_gMapConsentCookieKey) !== undefined;

const processGMapConsent = () => {
    setGMapCookie();
    isGMapOverlayVisible.value = false;
    isSearchInputVisibleInOverlay.value = true;
    loadMap();
};

const addGMapOverlayBackground = () => {
    const gmapOverlay = document.getElementById("gmap");
    if (gmapOverlay) {
        gmapOverlay.classList.add("gmap-bg");
    }
};

const loadMap = () => {
    if (!gMapLoader.value) {
        gMapLoader.value = new Loader({
            apiKey: props.googleMapApiKey,
            version: "weekly",
            libraries: ["places"],
            language: t("prw.gmap_locale"),
        });
    }

    gMapLoader.value
        .load()
        .then(initializeMap)
        .catch((error) => console.error("Google Maps failed to load: ", error));
};

const initializeMap = () => {
    map.value = new google.maps.Map(document.getElementById("gmap"), {
        ...props.googleMapOptions,
    });

    placesService.value = new google.maps.places.PlacesService(map.value);
    map.value.controls[google.maps.ControlPosition.TOP_LEFT].push(searchControl.value);

    markerList.value = createMarkers(props.sites, map.value);

    const bounds = new google.maps.LatLngBounds();
    markerList.value.forEach((marker) => bounds.extend(marker.getPosition()));
    map.value.fitBounds(bounds);
};

const createMarkers = (sites, map) => {
    return sites.map((site) => {
        const marker = new google.maps.Marker({
            ...site,
            map,
            icon: {
                url: getImageUrl("map-pin.svg"),
            },
        });

        const message = createMarkerMessage(site);
        attachMarkerMessage(marker, map, message);

        return marker;
    });
};

const attachMarkerMessage = (marker, map, message) => {
    const infowindow = new google.maps.InfoWindow({ content: message });
    marker.infowindow = infowindow;

    marker.addListener("click", () => {
        if (marker.currentInfoWindow) {
            marker.currentInfoWindow.close();
        }
        infowindow.open(map, marker);
        marker.currentInfoWindow = infowindow;
    });
};

const createMarkerMessage = (marker) => {
    return marker.active
        ? `<div class='site-content'>
                <h2 class='gm-heading'>${marker.name}</h2>
                <div id='bodyContent'>
                    <p><i class="fa-solid fa-location-dot [ mr-2 ]"></i> ${marker.address}</p>
                    <div class="optional-details">
                        <p><i class="fa-solid fa-envelope [ mr-2 ]"></i> ${marker.email}</p>
                        <p><i class="fa-solid fa-phone [ mr-2 ]"></i> ${marker.phone}</p>
                    </div>
                    <div class="populate-pc-form" style="display:none">
                        <button class="ux-btn ux-btn--primary" onclick="event.preventDefault(); emitSiteDetails('${marker.country}', '${marker.id}', '${marker.name}', '${marker.address}', '${marker.email}', '${marker.phone}')">${t('prw.pc_choose_site')}</button>
                    </div>
                    </div>
            </div>`
        : "<div>Site is not active</div>";
};

const searchAddress = (searchTerm) => {
    const request = { query: searchTerm, fields: ["name", "geometry"] };
    placesService.value.findPlaceFromQuery(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            const { geometry } = results[0];
            const { lat, lng } = geometry.location;
            const nearestMarkerIndex = findNearestMarker(lat(), lng());
            const nearestMarker = markerList.value[nearestMarkerIndex];
            map.value.panTo(nearestMarker.getPosition());
            map.value.setZoom(6);
            nearestMarker.infowindow.open(map.value, nearestMarker);
        } else {
            isSiteSearchErrorAlertVisible.value = true;
        }
    });
};

const findNearestMarker = (lat, lng) => {
    return markerList.value
        .map((marker) => calculateDistance(lat, lng, marker.position.lat(), marker.position.lng()))
        .indexOf(Math.min(...markerList.value.map((marker) => calculateDistance(lat, lng, marker.position.lat(), marker.position.lng()))));
};

const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371;
    const dLat = toRadians(lat2 - lat1);
    const dLng = toRadians(lng2 - lng1);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLng / 2) ** 2;
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};

const toRadians = (degrees) => (degrees * Math.PI) / 180;

const getImageUrl = (image) => new URL(`../assets/images/${image}`, import.meta.url).href;


</script>

<style lang="scss">
@import "../assets/styles/_settings.scss";

.ui-map {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

    hr {
        margin: 0;
    }

    .gm-style-iw-d {
        -ms-overflow-style: none;
        /* for Internet Explorer, Edge */
        scrollbar-width: none;
        /* for Firefox */
        overflow-y: scroll;

        &::-webkit-scrollbar {
            display: none;
            /* for Chrome, Safari, and Opera */
        }
    }

    .gm-style .gm-style-iw-c {
        top: -9px;
        padding-left: 0;
        padding-right: 0;
    }

    .gm-style .gm-style-iw-c,
    .gm-style-iw-d {
        max-height: 300px !important;
    }

    .gm-style .gm-style-iw-tc {
        filter: drop-shadow(0 4px 2px rgba(0, 0, 0, .3)) !important;
        width: 20px !important;
    }

    .gm-style .gm-style-iw-tc::after {
        height: 32px;
        width: 20px;
        top: -10px;
    }

    .gm-style-iw-t {
        bottom: 55px !important;
    }

    .gm-style .gm-style-iw-c,
    #site-content,
    .gm-style .gm-style-iw-tc::after {
        background-color: whitesmoke;
    }

    .gm-style-iw-chr {
        background: #e8e8e8;
        // display: none;

        .gm-style-iw-ch {
            display: none;
        }

    }

}

.site-content {
    max-width: 280px;
    border-radius: 5px;
    // cursor: pointer; // Show pointer cursor on hover

    i {
        color: $accenttwo-color;
    }

    h2.gm-heading {
        margin: 0;
        font-size: 16px;
        padding: 12px 40px 12px 16px;
        color: #333;
        letter-spacing: 0.3px;
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

.map-overlay {
    position: static;
    height: 100%;
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
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 0 12px;

    >div {
        max-width: 400px;
        background: white;
        padding: 20px;
        border-radius: 5px;
    }

    &__text {
        color: black;
        text-align: center;
    }
}

#gmap {
    &.gmap-bg {
        background-image: url("../assets/images/map-placeholder.png");
        background-repeat: no-repeat;
        background-position: 90%;
        background-size: cover;
    }

    button.gm-ui-hover-effect {
        position: absolute !important;
        right: 0px;
        top: 0px;
        // background: #e6e6e6 !important;
        width: 38px !important;
        height: 38px !important;

        &:focus,
        &:active,
        &:hover,
        &:visited {
            outline: none;
            box-shadow: none;
        }

        >span {
            margin: 6px !important;
        }
    }

    .map-search-control {
        display: flex;
        margin: 10px;

        button {
            position: relative;
            right: 50px;
            font-size: 16px;
            border-radius: 0px 20px 20px 0px;
            padding: 0 8px;
            display: flex;
            width: 50px;
            justify-content: center;
            align-items: center;

            svg {
                width: 25px;
                height: 25px;
            }
        }
    }

    .search-input {
        font-size: 16px;
        //border: 1px solid #ccc;
        border: none;
        border-radius: 20px;
        width: 250px;
        padding: 8px 16px;
        // height: 25px;
        box-shadow: rgba(14, 63, 126, 0.06) 0px 0px 0px 1px, rgba(42, 51, 70, 0.03) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 2px 2px -1px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.03) 0px 5px 5px -2.5px, rgba(42, 51, 70, 0.03) 0px 10px 10px -5px, rgba(42, 51, 70, 0.03) 0px 24px 24px -8px;

        @media only screen and (min-width: 676px) {
            width: 300px;
        }
    }

}
</style>
