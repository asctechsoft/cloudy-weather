<template>
  <div class="relative h-auto">
    <div class="body-app show-scroll">
      <!-- header -->
      <HeaderPageV2
        v-if="currentHeader === 'default' && isContentLoaded"
        @onChangeShowDraw="onChangeShowDraw"
      ></HeaderPageV2>

      <HeaderPage
        v-if="currentHeader === 'city' && isContentLoaded"
        @onChangeShowDraw="onChangeShowDraw"
      ></HeaderPage>

      <div id="main-content" :class="headerClass">
        <div class="h-full">
          <div class="container">
            <router-view @route-loaded="handleRouteLoaded" />
          </div>

          <footer class="h-[39%] md:h-auto" v-if="isContentLoaded">
            <!-- <BreadcumsPage></BreadcumsPage> -->
            <!--  -->
            <FooterPage></FooterPage>
          </footer>
        </div>
        <!--  -->
        <SettingPage
          :drawerValue="drawerValue"
          @onCancelFormDraw="onCancelFormDraw"
        ></SettingPage>
      </div>

      <!-- <div v-if="this.$route.name === 'widget-view'" class="body-app">
        <router-view />
      </div> -->
    </div>
  </div>
</template>
<script>
import HeaderPageV2 from "./layout/header/header-page-v2";
import HeaderPage from "./layout/header/header_page";
import FooterPage from "./layout/footer/footer_page.vue";
import SettingPage from "./components/setting/draw-setup/setting-page.vue";
import { mapMutations } from "vuex";
// import BreadcumsPage from "./layout/breadcums/breadcums_page.vue";

export default {
  name: "App-V2",

  components: {
    HeaderPageV2,
    HeaderPage,
    FooterPage,
    SettingPage,
    // BreadcumsPage,
  },
  data() {
    return {
      drawerValue: false,
      isContentLoaded: false,
    };
  },

  computed: {
    currentHeader() {
      if (
        this.$route.name === "home-page" ||
        this.$route.name === "create-widget-view" ||
        this.$route.name === "introduce-page"
      ) {
        return "default";
      } else {
        return "city";
      }
    },

    headerClass() {
      return this.currentHeader === "city"
        ? "h-[calc(100vh-72px)]"
        : "md:h-[calc(100vh-28rem)] h-[calc(100vh-20rem)]";
    },
  },

  watch: {
    $route(to, from) {
      // Khi route thay đổi, đánh dấu là nội dung đang được load
      this.isContentLoaded = false;

      // Sau khi route được tải xong, đánh dấu là đã load xong
      this.$nextTick(() => {
        this.isContentLoaded = true;
      });
    },
  },

  mounted() {
    debugger;
    this.nameRouter = this.$route.name;
    const unitValue = localStorage.getItem("unit");
    if (unitValue) {
      const decodeAirObject = JSON.parse(unitValue);
      this.setObjectSetting(decodeAirObject);
      this.setObjectSettingNotLocal(decodeAirObject);
    }
    this.$nextTick(() => {
      document.body.classList.add("content-loaded");
    });

    document.title =
      "Local, National & Global Daily Weather Forecast | 9Weather";
  },

  methods: {
    ...mapMutations(["setObjectSetting", "setObjectSettingNotLocal"]),
    onChangeShowDraw(val) {
      debugger;
      this.drawerValue = val;
    },

    onCancelFormDraw(val) {
      this.drawerValue = val;
    },

    handleRouteLoaded() {
      this.isContentLoaded = true;
    },
  },
};
</script>
<style lang="scss">
@import "./assets/css/style.css";
@import "./assets/css/common.css";
@import "./assets/css/colors.css";
@import "./assets/css/fonts.css";
@import "./assets/css/padding.css";

#app {
  font-family: "Roboto-Regular", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
body {
  position: relative;
  margin: 0px;
  height: 100%;
  margin: 0;
  font-family: var(--bs-body-font-family);
  font-size: var(--bs-body-font-size);
  font-weight: var(--bs-body-font-weight);
  line-height: var(--bs-body-line-height);
  color: var(--bs-body-color);
  text-align: var(--bs-body-text-align);
  background-color: var(--bs-body-bg);
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.body-app {
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 999;
  flex-direction: column;
}

#main-content {
  opacity: 0;
  transition: opacity 0.5s;
}

.content-loaded #main-content {
  opacity: 1;
}
</style>
