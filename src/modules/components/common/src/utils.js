// Function to resize overlay
export let resizeOverlay = function (elementID) {
  resize();

  function resize() {
    let element = document.getElementById(elementID);
    if (element !== null) {
      element.style.height = window.innerHeight + 'px';
    }
  }

  window.addEventListener('resize', resize, true);
};

// Function for Wistia cookie tracking
export let wistiaCookieTracking = function (consent) {
  window._wq = window._wq || [];
  window._wq.push(function (W) {
    W.consent(consent);
  });
};

// Function to play animation
let playAnimation = function (idElement, elementSelector) {
  let waitTimeInSecs = 15;
  setTimeout(function () {
    var element = document.getElementById(idElement);
    element.classList.remove(elementSelector);
  }, waitTimeInSecs * 60);
};

// Configure page animation
export let configurePageAnimation = function (elementId, animeClassName) {
  let element = document.getElementById(elementId);
  element.classList.add(animeClassName);
  playAnimation(elementId, animeClassName);
};

// Remove script
export let removeScript = function (scriptId) {
  let elem = document.getElementById(scriptId);
  return elem?.parentNode?.removeChild(elem);
};

// Add script
export let addScript = function (_src, id, callback = () => {}) {
  let script = document.createElement('script');
  script.src = _src;
  script.id = id;
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);
  script.addEventListener('load', callback);
};

// Set page title
export let setPageTitle = (title) => {
  document.title = title;
};

// Translate message using vue-i18n
export let translateMessage = (i18n, key, locale) => {
  return i18n.global.t(key, { locale });
};

// Get specific translation
export let getSpecificTranslation = (i18n, key, locale) => {
  const { messages } = i18n.global;
  let result = messages.value[locale];
  try {
    let translation = result[key];
    return translation?.source;
  } catch (error) {
    console.error('Translation key not found:', key);
    return key; // Fallback to the key itself if not found
  }
};

/**
 * Updates the 'lang' query in the URL using vue-router
 * @param {Object} router - vue-router instance
 * @param {string} locale - the new locale to update with
 */
export let updateLocaleCodeInURL = function (router, locale) {
  router.push({
    path: window.location.pathname,
    query: {
      lang: locale,
    },
  });
};

/**
 * Sets the current locale using the localeKey supplied via vue-i18n
 * @param {Object} i18n - vue-i18n instance
 * @param {string} localeKey - the new locale key
 */
export function setCurrentLocale(i18n, localeKey) {
  const { locale } = i18n.global;
  locale.value = localeKey;
}

/**
 * Redirects to the path provided using vue-router
 * @param {Object} router - vue-router instance
 * @param {string} path - path to go to
 */
export let redirectTo = function (router, path) {
  router.push({ path });
};

/**
 * Sets the 'lang' attribute for the <html> tag/element eg <html lang='en'>...</html>
 * @param {string} locale - the current locale
 */
export let setHtmlElementLangAttribute = (locale) => {
  document.documentElement.setAttribute('lang', locale);
};

/**
 * Renames the keys of an object
 * @param {Object} obj - The object whose key(s) to be renamed
 * @param {Object} newKeys - The new key names
 * @returns {Object} transformed Object whose keys have been renamed
 */
export let renameKeys = (obj, newKeys) => {
  const keyValues = Object.keys(obj).map((key) => {
    const newKey = newKeys[key] || key;
    return {
      [newKey]: obj[key],
    };
  });
  return Object.assign({}, ...keyValues);
};

// Deep merge multiple objects
export let mergeDeep = (...objects) => {
  const isObject = (obj) => obj && typeof obj === 'object';

  return objects.reduce((prev, obj) => {
    Object.keys(obj).forEach((key) => {
      const pVal = prev[key];
      const oVal = obj[key];

      if (Array.isArray(pVal) && Array.isArray(oVal)) {
        prev[key] = pVal.concat(...oVal);
      } else if (isObject(pVal) && isObject(oVal)) {
        prev[key] = mergeDeep(pVal, oVal);
      } else {
        prev[key] = oVal;
      }
    });

    return prev;
  }, {});
};

// Get localized content for multiple locales
export let getLocalisedContent = (localesContext) => {
  const locales = localesContext;
  const messages = {};
  locales.keys().forEach((key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key);
    }
  });
  return messages;
};

// Add locale to the HTML element's class attribute
export let addLocaleToHtmlElementClass = (classAttribute) => {
  document.documentElement.setAttribute('class', classAttribute);
};

// Set the child height equal to the parent height
export let setChildHeightToParentHeight = function (parentID, childID) {
  let isEventRegistered = false;
  resize();

  function resize() {
    let parent = document.getElementById(parentID);
    let child = document.getElementById(childID);

    if (child !== null) {
      child.style.height = parent.clientHeight + 'px';
    }
  }

  if (!isEventRegistered) {
    window.addEventListener('resize', function () {
      resize();
      isEventRegistered = true;
    }, true);
  }
};

// Decode HTML entities
export let htmlDecode = (input) => {
  let doc = new DOMParser().parseFromString(input, 'text/html');
  return doc.documentElement.textContent;
};

// Extract sites from data
export let extractSites = (data) => {
  const sites = [];
  data.forEach((country) => {
    country.states.forEach((state) => {
      if (state.sites) {
        state.sites.forEach((site) => {
          sites.push({ ...site, country: country.name });
        });
      } else {
        sites.push({
          active: true,
          id: state.id,
          name: state.name,
          address: state.address,
          email: state.email,
          phone: state.phone,
          position: state.position,
          country: country.name,
        });
      }
    });
  });
  return sites;
};
