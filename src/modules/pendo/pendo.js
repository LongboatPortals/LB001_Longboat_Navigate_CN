import {
    pendoKey,
    pendoAccountName,
    studyId as studyID,
    studyURL,
    pendoAppType as appType
} from "@/config";

export default function initializePendo() {
  console.log('initialize Pendo');
  // Only initialize Pendo if not in test environment
  if (typeof window !== 'undefined' && import.meta.env.MODE !== 'test') {
    (function(apiKey, pendoAccountName, studyID, studyURL, appType) {
      (function(p, e, n, d, o) {
          let v, w, x, y, z;
          o = p[d] = p[d] || {};
          o._q = o._q || [];
          v = ['initialize', 'identify', 'updateOptions', 'pageLoad', 'track'];
          for (w = 0, x = v.length; w < x; ++w)(function(m) {
              o[m] = o[m] || function() {
                  o._q[m === v[0] ? 'unshift' : 'push']([m].concat([].slice.call(arguments, 0)));
              };
          })(v[w]);
          y = e.createElement(n);
          y.async = true;
          y.src = 'https://cdn.eu.pendo.io/agent/static/' + apiKey + '/pendo.js';
          z = e.getElementsByTagName(n)[0];
          if (z && z.parentNode) {
            z.parentNode.insertBefore(y, z);
          }
      })(window, document, 'script', 'pendo');

      // Initialize Pendo with visitor and account details
      window.pendo.initialize({
          visitor: {
              // Required if user is logged in, default creates anonymous ID
              region: Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
          account: {
              id: studyID + '_' + studyURL + '_' + appType, // Unique account ID
              name: pendoAccountName,
              app_type: appType
          },
          disableCookies: true,
          disableGuides: false,
          disablePersistence: true,
          excludeAllText: true,
      });
    })(pendoKey, pendoAccountName, studyID, studyURL, appType);
  }
}

initializePendo();