import Vue from "vue";
import Vuetify from "vuetify/lib";
import theme from "./theme";
import zhHans from "vuetify/es5/locale/zh-Hans";
Vue.use(Vuetify);
export default new Vuetify({
  icons: {
    iconfont: "mdi"
  },
  theme: {
    ...theme
  },
  lang: {
    locales: { zhHans },
    current: "zh-Hans"
  }
});
