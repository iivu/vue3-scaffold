import { createApp } from 'vue';
import { Popup, Icon, Swipe, SwipeItem, Picker } from 'vant';

import App from './App.vue';
import store from './store';

let app = null;
function initApp() {
  app = createApp(App);
  app
    .use(store)
    .use(Icon)
    .use(Popup)
    .use(Swipe)
    .use(SwipeItem)
    .use(Picker)
    .mount('#app');
}

initApp();
