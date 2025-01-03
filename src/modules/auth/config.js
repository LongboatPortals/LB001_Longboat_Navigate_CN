export let Config = {
    isLoginPageAnimationEnabled: false,
    isDefaultStyle: false,
    logoPath: 'lb_logo2.png',
    defaultLocale: 'en',
    dropdownLocales: ['en'],
    passwords: [],
    cookieExpiryTimeInMins: 5
}


export default {
    install(Vue, options) {
        Config.isLoginPageAnimationEnabled = options.isLoginPageAnimationEnabled
        Config.isDefaultStyle = options.isDefaultStyle
        Config.logoPath = options.logoPath
        Config.defaultLocale = options.defaultLocale
        Config.dropdownLocales = options.dropdownLocales
        Config.passwords = options.passwords
        Config.cookieExpiryTimeInMins = options.cookieExpiryTimeInMins
    }
};