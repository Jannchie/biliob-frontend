import Vue from "vue";
import Vuetify from "vuetify/lib";
import theme from "./theme";
import zhHans from "vuetify/es5/locale/zh-Hans";
Vue.use(Vuetify);
export default new Vuetify({
  breakpoint: {
    thresholds: {
      xs: 340,
      sm: 540,
      md: 800,
      lg: 1200
    },
    scrollBarWidth: 24
  },
  icons: {
    iconfont: "mdi"
  },
  theme: {
    ...theme,
    dark: false
  },
  lang: {
    locales: { zhHans },
    current: "zh-Hans"
  }
});
