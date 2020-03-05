
/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */

if (window.csrfTokenName !== undefined && window.csrfToken !== undefined) {
  window.axios.defaults.headers.common[window.csrfTokenName] = window.csrfToken;
} else {
  console.error('CSRF token not found. Include them in window object. https://docs.craftcms.com/v3/changes-in-craft-3.html#csrf-token-params');
}
