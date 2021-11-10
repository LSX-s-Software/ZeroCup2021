import { createApp } from "vue";
import App from "./App.vue";
import "./util/rem";
import smoothscroll from "smoothscroll-polyfill";
smoothscroll.polyfill();

createApp(App).mount("#app");
