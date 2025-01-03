
//export const appType = "cn"; // cn, prw, es
export const appType = import.meta.env.VITE_APP_PD_APP_TYPE; // cn, prw, es

/* ==========================================================================
    Auth module Configuration ⬇
========================================================================== */
// Login page Animation
export const isLoginPageAnimationEnabled = true;

//Images
//export const logoPath = "lb_logo.png";
export const logoPath = {
    name: "lb_logo",
    extension: "png"
}

// Login Page Style
export const isDefaultStyle = false; // true or false
export const cookieExpiryTimeInMins = 15;

export const passwords = [
   
    {
        key: "pass", // key used for storing this password in cookie
        value: "Longboat!", // password
        toRoute: "/", // go to this route/url after successful authentication
    },
    {
        key: "passRev",
        value: "Longboat!Rev",
        toRoute: "/amend",
    },

];

// make sure you use a unique key
export const japanPasswords = [{
    key: "japan",
    value: "Longboat!Ja",
    toRoute: "japan",
}, {
    key: "JapanRev",
    value: "Ja!Rev",
    toRoute: "/japan/amend",
}, ];





/* ==========================================================================
    Pendo Analytics ⬇
========================================================================== */
//Pendo Analytics
export const pendoKey = '055e0a8b-b58d-43b8-6bc3-991ad9ea3974';
export const sponsorName = "Longboat";
export const studyURL = "singleAppTemplate.longboat.com";
export const studyId = "LBT009";
export const pendoAppType = appType; //"CN/PRW/ES";
export const pendoAccountName = studyId + '_' + pendoAppType;



/* ==========================================================================
    i18n localisation configuration ⬇
========================================================================== */

// dropdown locales for the default Login & Home page
export const defaultLocale = "en";
export const dropdownLocales = [
    "en",
     // "es",
    // "hu"
];

/*
// dropdown locales for the JapanLogin & Japan  Home page
export const japanDropdownLocales = [
    "ja",
    "sp",
];
*/