export default (function (wistiaID) {
    let wistiaJs = document.createElement("script");
    wistiaJs.setAttribute(
        "src",
        "https://fast.wistia.com/assets/external/E-v1.js"
    );
    wistiaJs.setAttribute("id", wistiaID);
    document.head.appendChild(wistiaJs);
})("wistiaScript");


export let enableWistiaCookieTracking = (consent) => {
    window._wq = window._wq || [];
    window._wq.push(function (W) {
        W.consent(consent);
        //console.log("Wistia: In privacy mode?", !W.consent()); // returns true or false
    });
}