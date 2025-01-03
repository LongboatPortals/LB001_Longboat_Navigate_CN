import { extractSites } from "@/modules/components/common/src/utils"
import sites from "./patientConnect/sites/data.js"

/* ==========================================================================
    Google map Configuration ⬇
========================================================================== */
export const gMapConsentCookieKey = 'gMapConsentCookie'
export const gMapConsentCookieExpiryTimeInMins = 60
export const googleMapApiKey = 'AIzaSyDYt4g3PR9n2P5HF7NivSCidrKFvj9Nojg'
export const googleMapUrl = `https://maps.googleapis.com/maps/api/js?key=${googleMapApiKey}&libraries=places`
export let gMapOptions = {
    center: {
        lat: 33.9466277,
        lng: -84.3320862
    },
    scrollwheel: false,
    disableDefaultUI: true,
    zoomControl: true,
    fullscreenControl: true,
    zoom: 4,
    styles: [
        {
            featureType: 'all',
            elementType: 'geometry.fill',
            stylers: [
                {
                    color: '#ffffff',
                    weight: '1.00'
                }
            ]
        },
        {
            featureType: 'all',
            elementType: 'geometry.stroke',
            stylers: [
                {
                    color: '#9c9c9c'
                }
            ]
        },
        {
            featureType: 'all',
            elementType: 'labels.text',
            stylers: [
                {
                    visibility: 'on'
                }
            ]
        },
        {
            featureType: 'landscape',
            elementType: 'all',
            stylers: [
                {
                    color: '#f2f2f2'
                }
            ]
        },
        {
            featureType: 'landscape',
            elementType: 'geometry.fill',
            stylers: [
                {
                    color: '#ffffff'
                }
            ]
        },
        {
            featureType: 'landscape.man_made',
            elementType: 'geometry.fill',
            stylers: [
                {
                    color: '#ffffff'
                }
            ]
        },
        {
            featureType: 'poi',
            elementType: 'all',
            stylers: [
                {
                    visibility: 'off'
                }
            ]
        },
        {
            featureType: 'road',
            elementType: 'all',
            stylers: [
                {
                    saturation: -100
                },
                {
                    lightness: 45
                }
            ]
        },
        {
            featureType: 'road',
            elementType: 'geometry.fill',
            stylers: [
                {
                    color: '#eeeeee'
                }
            ]
        },
        {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#7b7b7b'
                }
            ]
        },
        {
            featureType: 'road',
            elementType: 'labels.text.stroke',
            stylers: [
                {
                    color: '#ffffff'
                }
            ]
        },
        {
            featureType: 'road.highway',
            elementType: 'all',
            stylers: [
                {
                    visibility: 'simplified'
                }
            ]
        },
        {
            featureType: 'road.arterial',
            elementType: 'labels.icon',
            stylers: [
                {
                    visibility: 'off'
                }
            ]
        },
        {
            featureType: 'transit',
            elementType: 'all',
            stylers: [
                {
                    visibility: 'off'
                }
            ]
        },
        {
            featureType: 'water',
            elementType: 'all',
            stylers: [
                {
                    color: '#46bcec'
                },
                {
                    visibility: 'on'
                }
            ]
        },
        {
            featureType: 'water',
            elementType: 'geometry.fill',
            stylers: [
                {
                    color: '#c8d7d4'
                }
            ]
        },
        {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#070707'
                }
            ]
        },
        {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [
                {
                    color: '#ffffff'
                }
            ]
        }
    ]
}


/* ==========================================================================
    Study Center Map Configuration ⬇
========================================================================== */
export let getSites = extractSites(sites);