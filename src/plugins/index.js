/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import { loadFonts } from './webfontloader'

import vuetify from './vuetify'
import router from '../router'
//DatePicker
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'


//Validatccion
/* Vue.component('ValidationProvider', ValidationProvider);
 */
export function registerPlugins (app) {
  loadFonts()
  app
    .use(vuetify)
    .use(router)
    .component('VueDatePicker', VueDatePicker);

}
