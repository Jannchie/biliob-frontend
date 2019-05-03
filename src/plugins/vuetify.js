import Vue from "vue";
import Vuetify from "vuetify/lib";
import theme from "./theme";
import "vuetify/src/stylus/app.styl";

Vue.use(Vuetify, {
  iconfont: "mdi",
  theme
});
