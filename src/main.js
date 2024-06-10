import { createApp } from "vue";
import router from "./router";
import "./axiosConfig";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import "./assets/style.css";
import "@fortawesome/fontawesome-free/css/all.css";
import App from "./App.vue";

const app = createApp(App);
app.use(router);
app.use(Toast);
app.mount("#app");
