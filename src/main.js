import Vue from "vue";
import App from "./App";
import router from "./router";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import firebase from "firebase";
import "./components/firebaseInit";
import Alert from "./components/Alert";

Vue.use(Vuetify);

Vue.config.productionTip = false;

Vue.component("app-alert", Alert);

let app;
firebase.auth().onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      el: "#app",
      router,
      render: h => h(App)
    });
  }
});
