import Cookies from 'js-cookie'
import { Config } from "../config";


/**
 * Summary Logs user out.
 * Description logs a user out by removing passwords for login and review/amend sites
 * and then sends user to another page eg login page.
 * @param  {Object} context             You will usually pass 'this' as a value
 * @param  {string} pathAfterLogout
 */
export let processLogout = function(callback = () => {}) {
    for (let pass of Config.passwords) {
        //context.$cookies.remove(pass.key);
        //Cookies.remove(pass.key, {path: pass.toRoute})
        Cookies.remove(pass.key)
    }
    callback()
};

export let processLogin = function(inputPassword, callbackIfSuccessful, callbackIfFail) {
    for (let pass of Config.passwords) {
        if (pass.value === inputPassword) {
            // finalizeLogin(context, pass.key, inputPassword, pass.toRoute);
            //context.error = false;
            Cookies.set(pass.key, inputPassword, {path: pass.toRoute, expires: Config.cookieExpiryTimeInMins / (24 * 60) })
           // Cookies.set(pass.key, inputPassword, { expires: Config.cookieExpiryTimeInMins / (24 * 60) })
                //context.$cookies.set(pass.key, inputPassword, Config.cookieExpiryTimeInMins * 60);
            callbackIfSuccessful(pass.toRoute)
            return;
                // context.error = false;
                // context.$router.replace(pass.toRoute);

        }
    }

    callbackIfFail()
};

export let authenticate = function(inputPassword) {
    for (let pass of Config.passwords) {
        if (pass.value === inputPassword) {
            return pass.toRoute;
        }
    }
    return null;
};



export let isPasswordInCookie = function() {
    for (let pass of Config.passwords) {
        if (Cookies.get(pass.key) === pass.value) {
            return true;
        }
    }
    return false;
};

export let guardPage = function({ loginRoute, next }) {
    if (isPasswordInCookie()) {
        next();
    } else {
        next(loginRoute);
    }
};

export let loginGuard = (loginPath) => {
    return (to) => {
        if (
            // make sure the user is authenticated
            !isPasswordInCookie() &&
            // ❗️ Avoid an infinite redirect
            to.path !== loginPath
        ) {
            //console.log("not authenticated");
            // redirect the user to the login page
            return { path: loginPath }
        }

    }
}