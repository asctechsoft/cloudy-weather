<!-- eslint-disable prettier/prettier -->
<template>
  <div
    class="h-[72px] w-full bg-header txt_title overflow-hidden sticky top-0 z-50"
  >
    <div class="w-full bg-header h-full pad-form">
      <div class="w-full h-full container">
        <!-- Header -->
        <div class="w-full h-[40px]">
          <!--  -->
          <div class="w-full flex justify-between items-center h-full">
            <!-- Logo -->
            <div
              class="logo-app md:w-[600px] w-full h-full flex justify-center items-center"
            >
              <!--  -->

              <div class="md:flex w-full items-center gap-2">
                <div
                  class="imgLogo cursor-pointer"
                  @click="onClickReloadHome()"
                ></div>

                <div class="flex justify-between items-center md:pt-2 pt-0">
                  <div>
                    <div class="flex items-center gap-1">
                      <div class="items-center flex gap-1">
                        <span class="txt_regular">
                          <span class="text-blue-400 txt_light_summer">{{
                            renderCityName
                          }}</span></span
                        >
                        <span class="text-left txt_light_summer">
                          {{
                            convertFahrenheitToCelsius(
                              paramCurrently?.temperature
                            )
                          }}</span
                        >
                        <div>
                          <img
                            :src="convertIconCurrently(paramCurrently?.icon)"
                            class="size-img"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Search -->
            <div class="w-[calc(100%-800px)] h-full md:block hidden">
              <div class="w-full flex justify-center items-center h-full">
                <!-- <div
                class="text-base w-[30vh] flex justify-center font-semibold hover:text-blue-400 cursor-pointer"
              >
                <div>Cầu Giấy, Hà Nội</div>
                <img src="../../assets/images/svg/ic_weather_day.svg" alt="" />
              </div> -->
                <div class="w-[50vh] lg:block hidden">
                  <el-autocomplete
                    v-model="valueSearch"
                    :fetch-suggestions="querySearchAsync"
                    :placeholder="$t('Search_location')"
                    @select="handleSelect"
                    :prefix-icon="Search"
                  >
                    <template #default="{ item }">
                      <div>
                        <div class="txt_regular">{{ item.value }}</div>
                        <span class="link txt_regular_12">{{
                          item.country
                        }}</span>
                      </div>
                    </template>
                  </el-autocomplete>
                </div>
                <!-- <div class="w-[30vh] h-full"></div> -->
              </div>
            </div>
            <!--  -->
            <div
              class="nav-menu md:w-[600px] w-full h-full flex justify-end items-center"
            >
              <div
                class="md:flex items-center pl-4 pr-4 gap-1 text-white txt_light_10"
              >
                <div class="flex items-center gap-1">
                  <img
                    class="size-img"
                    src="../../assets/images/svg/ic_oclock.svg"
                    alt=""
                  />
                  <div class="text-left">
                    <span>{{ $t("Local_time") }}:</span>
                  </div>
                </div>
                <span id="s-date-time" class="flex items-center">
                  <span class="md:block flex justify-center"
                    ><span id="hour">{{ hour }}</span
                    ><span>:</span> <span id="minutes">{{ minutes }}</span
                    ><span>:</span> <span id="second">{{ second }}</span></span
                  >
                  <span class="ml-1" id="dateValue">{{ dateValue }}</span>
                </span>
              </div>

              <img
                @click="onClickShowMenu"
                src="../../assets/images/svg/ic_menu.svg"
                width="20"
                class="cursor-pointer"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Search } from "@element-plus/icons-vue";
import { mapActions, mapMutations } from "vuex";
import {
  convertCtoF,
  codeToFind,
  convertFtoC,
  getIconHourlyForecastTheme,
} from "../../utils/converValue";
import {
  encodeBase64,
  getAqiDataFromLocation,
  getParamAirByCode,
  urlEncodeString,
  decodeBase64,
} from "../../utils/EncoderDecoderUtils";

export default {
  name: "header_page",

  setup() {
    return {
      Search,
    };
  },
  data() {
    return {
      selectedActive: null,
      valueSearch: "",
      suggestionsTop100: [],
      suggestionsFull: [],

      hour: "",
      minutes: "",
      second: "",
      dateValue: "",
    };
  },

  computed: {
    renderCountry() {
      return this.$store.state.getWeather.cityCountry;
    },

    paramCurrently() {
      return this.$store.state.getWeather.currently;
    },

    renderWeatherCurrent() {
      return this.$store.state.getWeather.weatherCurrent;
    },

    renderCityName() {
      const storageCountry = localStorage.getItem("country");
      if (storageCountry) {
        const storageCountryName = JSON.parse(storageCountry);

        return storageCountryName.city;
      }
      return "";
    },
  },

  async mounted() {
    this.updateTime();
    setInterval(() => {
      this.updateTime();
    }, 1000);
    debugger;

    this.loadDataTop100();
    this.loadDataTopFull();
    this.selectedActive = null;

    const storageCity = localStorage.getItem("cityName");
    if (storageCity) {
      const storageCityName = JSON.parse(storageCity);

      this.valueSearch = storageCityName;
    } else {
      this.valueSearch = "";
    }
  },

  created() {
    this.loadDataTop100();
    this.loadDataTopFull();
  },

  methods: {
    ...mapMutations([
      "setListLocation",
      "setWeatherRecentData",
      "setCityWeather",
      "setCountryFilter",
    ]),
    ...mapActions([
      "getFormattedAddress",
      "getAirQualityByKey",
      "getWeatherData",
      "getAirQuality",
      "getWeatherRecentData",
    ]),

    convertFahrenheitToCelsius(value) {
      if (isNaN(value) || value == null) {
        return "";
      }
      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      if (unitSetting.activeTemperature_save === "f") {
        return (
          convertCtoF(value) + codeToFind(unitSetting.activeTemperature_save)
        );
      } else {
        return (
          convertFtoC(value) + codeToFind(unitSetting.activeTemperature_save)
        );
      }
    },

    convertIconCurrently(value) {
      if (value) {
        const url = getIconHourlyForecastTheme(value);
        return url;
      }
    },

    onClickShowMenu() {
      this.$emit("onChangeShowDraw", true);
    },

    updateTime() {
      const now = new Date();
      // Lấy giờ, phút, giây và định dạng lại nếu cần thiết
      this.hour = this.formatTimeUnit(now.getHours());
      this.minutes = this.formatTimeUnit(now.getMinutes());
      this.second = this.formatTimeUnit(now.getSeconds());

      // Định dạng ngày tháng
      const options = { day: "2-digit", month: "2-digit", year: "numeric" };
      this.dateValue = now.toLocaleDateString("en-US", options);
    },
    formatTimeUnit(unit) {
      // Định dạng lại số để có hai chữ số (vd: 01, 02, ..., 12)
      return unit < 10 ? "0" + unit : unit;
    },

    onClickLink(value) {
      if (value !== 0) {
        this.selectedActive = value;
      }
      let routePath = null;

      if (value === 1) {
        routePath = "/daily-weather";
      } else if (value === 2) {
        routePath = "/promotional-new";
      } else if (value === 3) {
        routePath = "/radar-detail";
      } else if (value === 4) {
        routePath = "/introduce";
      } else if (value === 5) {
        routePath = "/create-widget";
      } else if (value === -1) {
        routePath = `/${this.renderCountry.city}`;
      }

      if (routePath) {
        this.$router
          .push({ path: routePath })
          .then(() => {
            document.getElementsByClassName("body-app")[0].scrollTo(0, 0);
          })
          .catch(() => {});
      }
    },

    async querySearchAsync(queryString, cb) {
      let timeout;
      const results = queryString
        ? this.suggestionsFull.filter(this.createFilter(queryString))
        : this.suggestionsTop100;

      if (results.length > 0) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          cb(results);
        }, 300 * Math.random());
      } else {
        const urlParam = `version=1&type=4&app_id=amobi.weather.forecast.storm.radar&request=https://maps.googleapis.com/maps/api/geocode/json?address=${urlEncodeString(
          this.valueSearch
        )}&key=TOH_KEY`;

        const value = encodeBase64(urlParam);

        await this.getFormattedAddress(value);
        timeout = setTimeout(() => {
          cb(this.$store.state.getWeather.newArray);
        }, 300 * Math.random());
      }
    },

    createFilter(queryString) {
      return (city) => {
        const searchString = queryString.toLowerCase();
        return (
          city.value.toLowerCase().includes(searchString) ||
          city.country.toLowerCase().includes(searchString)
        );
      };
    },

    async handleSelect(item) {
      this.valueSearch = item.value;

      const dataLocation = {
        city: item.value,
        code: item.code,
        country: item.country,
        latitude: item.lat,
        longitude: item.lng,
      };

      localStorage.setItem("country", JSON.stringify(dataLocation));
      localStorage.setItem("cityName", JSON.stringify(dataLocation.city));
      this.setCountryFilter(dataLocation);

      let language = localStorage.getItem("language") || "en";
      console.log("item-search", item);

      // this.setUpdateBreadcumsObject(item);
      await this.$router.push({
        path: `/${language}/${item.country}/${item.value}/${item.code}/current-weather`,
      });
      window.location.reload();

      const param = `version=1&type=8&app_id=amobi.weather.forecast.storm.radar&request=https://api.forecast.io/forecast/TOH_KEY/${item.lat},${item.lng}?lang=en`;
      const resultAir = getAqiDataFromLocation(item.lat, item.lng);
      const value = encodeBase64(param);
      const valueNewAir = encodeBase64(resultAir);

      const airCode = getParamAirByCode(
        this.$store.state.getAqi.airKeyObject.key
      );

      this.saveToLocalStorage("recent_key", dataLocation);
      const arrayStorage = this.getFromLocalStorage("recent_key");
      this.getValueWeatherByRecent(arrayStorage);

      const encodeAirCode = encodeBase64(airCode);

      await Promise.all([
        this.getWeatherData(value),
        this.getAirQualityByKey(valueNewAir),
        this.getAirQuality(encodeAirCode),
      ]);
    },

    async getValueWeatherByRecent(value) {
      const objectLocation = value;

      debugger;
      for (let index = 0; index < objectLocation.length; index++) {
        const element = objectLocation[index];
        const param = `version=1&type=8&app_id=amobi.weather.forecast.storm.radar&request=https://api.forecast.io/forecast/TOH_KEY/${element.latitude},${element.longitude}?lang=en`;
        const value = encodeBase64(param);
        let resultArray = [];
        await this.getWeatherRecentData(value).then((data) => {
          const decodeData = JSON.parse(decodeBase64(data));
          const objectRecent = {
            countryValue: element,
            dataValue: decodeData.currently,
          };
          resultArray.push(objectRecent);
          this.setWeatherRecentData(objectRecent);
        });
      }
    },

    getFromLocalStorage(key) {
      // Trả về mảng các object từ localStorage
      return JSON.parse(localStorage.getItem(key)) || [];
    },

    saveToLocalStorage(key, value) {
      let storedData = JSON.parse(localStorage.getItem(key)) || [];
      debugger;
      // Nếu mảng đã đủ 3 phần tử, xóa phần tử đầu tiên
      if (storedData.length === 3) {
        storedData.pop();
      }

      // Thêm phần tử mới vào mảng
      if (storedData.length !== 0) {
        const findData = storedData.find(
          (x) =>
            x.latitude === value.latitude && x.longitude === value.longitude
        );
        if (!findData) {
          storedData.unshift(value);
        }
      } else {
        storedData.unshift(value);
      }

      // Lưu lại mảng mới vào localStorage
      localStorage.setItem(key, JSON.stringify(storedData));
    },

    /**
     * Load data top 100
     */
    loadDataTop100() {
      fetch("/file-txt/Top_100_Cities.txt")
        .then((response) => response.text())
        .then((text) => {
          debugger;
          this.processFileTop100(text);
        })
        .catch((error) => {
          console.error("Error loading file:", error);
        });
    },
    /**
     * Load data Full
     */
    loadDataTopFull() {
      fetch("/file-txt/full_city.txt")
        .then((response) => response.text())
        .then((text) => {
          debugger;

          this.processFileTopFull(text);
        })
        .catch((error) => {
          console.error("Error loading file:", error);
        });
    },

    processFileTop100(data) {
      const lines = data.split("\n");
      this.suggestionsTop100 = lines.map((line, index) => {
        const values = line
          .split(";")
          .map((value) => value.replace(/"/g, "").trim());
        return {
          id: index + 1,
          country: values[1],
          value: values[2],
          lat: values[3],
          lng: values[4],
        };
      });

      // this.setListLocation(this.suggestions);
    },

    processFileTopFull(data) {
      const lines = data.split("\n");
      this.suggestionsFull = lines.map((line, index) => {
        const values = line
          .split(";")
          .map((value) => value.replace(/"/g, "").trim());
        return {
          id: index + 1,
          country: values[1],
          value: values[2],
          lat: values[3],
          lng: values[4],
        };
      });

      // this.setListLocation(this.suggestions);
    },

    /**
     * Lấy thông tin weather, back về trang chủ
     */
    async onClickReloadHome() {
      //
      debugger;
      this.valueSearch = "";
      const originalTitle = document.title;
      document.title = "Loading...";

      // Lấy thông tin vị trí và thành phố
      const cityCountryNow = this.$store.state.getWeather.cityCountry;

      localStorage.setItem("country", JSON.stringify(cityCountryNow));
      localStorage.removeItem("cityName");
      // Chuyển hướng đến router trước
      this.$router.push({ path: "/" }).then(() => {
        window.location.reload();
      });
      // Xử lý tiếp các tác vụ API trong nền

      const param = `version=1&type=8&app_id=amobi.weather.forecast.storm.radar&request=https://api.forecast.io/forecast/TOH_KEY/${cityCountryNow.latitude},${cityCountryNow.longitude}?lang=en`;
      const resultAir = getAqiDataFromLocation(
        cityCountryNow.latitude,
        cityCountryNow.longitude
      );
      const value = encodeBase64(param);
      const valueNewAir = encodeBase64(resultAir);
      const objectPosition = {
        latitude: cityCountryNow.latitude,
        longitude: cityCountryNow.longitude,
        city: cityCountryNow.city,
        country: cityCountryNow.city,
      };
      const airCode = getParamAirByCode(
        this.$store.state.getAqi.airKeyObject.key
      );
      const encodeAirCode = encodeBase64(airCode);

      // Gọi các API song song
      await Promise.all([
        this.getWeatherData(value),
        this.getAirQualityByKey(valueNewAir),
        this.getAirQuality(encodeAirCode),
      ]);

      this.setCityWeather(objectPosition);
      document.title = originalTitle;
    },

    /**
     * Lấy thông tin weather ở vị trí hiện tại theo location Chome
     */
    async onClickAddressNow() {
      this.valueSearch = "";
      const originalTitle = document.title;
      document.title = "Loading...";
      // Lấy thông tin vị trí và thành phố
      const cityCountryNow = this.$store.state.getWeather.cityCountry;
      localStorage.setItem("country", JSON.stringify(cityCountryNow));
      localStorage.removeItem("cityName");
      // Chuyển hướng đến router trước
      this.$router.push({ path: `/${cityCountryNow.city}` }).then(() => {
        window.location.reload();
      });
      // Xử lý tiếp các tác vụ API trong nền

      const param = `version=1&type=8&app_id=amobi.weather.forecast.storm.radar&request=https://api.forecast.io/forecast/TOH_KEY/${cityCountryNow.latitude},${cityCountryNow.longitude}?lang=en`;
      const resultAir = getAqiDataFromLocation(
        cityCountryNow.latitude,
        cityCountryNow.longitude
      );
      const value = encodeBase64(param);
      const valueNewAir = encodeBase64(resultAir);
      const objectPosition = {
        latitude: cityCountryNow.latitude,
        longitude: cityCountryNow.longitude,
        city: cityCountryNow.city,
        country: cityCountryNow.country,
      };
      const airCode = getParamAirByCode(
        this.$store.state.getAqi.airKeyObject.key
      );
      const encodeAirCode = encodeBase64(airCode);

      // Gọi các API song song
      await Promise.all([
        this.getWeatherData(value),
        this.getAirQualityByKey(valueNewAir),
        this.getAirQuality(encodeAirCode),
      ]);

      this.setCityWeather(objectPosition);
      document.title = originalTitle;
    },

    // processAdditionalFile(data) {
    //   const lines = data.split("\n");
    //   const newSuggestions = lines.map((line, index) => {
    //     const values = line
    //       .split(";")
    //       .map((value) => value.replace(/"/g, "").trim());
    //     return {
    //       id: this.suggestions.length + index + 1,
    //       value: values[1],
    //       country: values[2],
    //       lat: values[3],
    //       lng: values[4],
    //     };
    //   });
    //   // Thêm dữ liệu từ file mới vào suggestions
    //   this.suggestions = [...this.suggestions, ...newSuggestions];
    // },
  },
};
</script>
<style lang="scss">
.nav-links {
  margin-top: 4px;
}
.nav-links li:hover .mega-box {
  // display: block;
  transition: all 0.3s ease;
  top: 100px;
  opacity: 1;
  visibility: visible;
  z-index: 10;
}
.mega-box {
  // display: none;
  position: absolute;
  left: 0px;
  width: 60%;
  padding: 0 30px;
  top: 115px;
  opacity: 0;
  visibility: visible;
  color: black;
  z-index: -1;
}
.mega-box .content {
  background: #ffffff;
  padding: 25px 20px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}
.mega-box .container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  // padding: 20px;
  text-align: left;
}

.mega-box .region {
  // background-color: #fff;
  // border: 1px solid #ddd;
  // border-radius: 4px;
  // box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  // margin: 10px;
  // padding: 20px;
  width: 208px;
  margin-top: 10px;
}

.mega-box .region h2 {
  font-size: 14px;
  margin-top: 0;
  color: #007bff;
  padding-left: 20px;
}

.mega-box .region ul {
  list-style-type: none;
  padding: 0;
}

.mega-box .region ul li {
  margin: 5px 0;
  font-size: 12px;
  padding-left: 20px;
}

.mega-box .region ul li:hover {
  background-color: aqua;
}

.p-li {
  padding: 4px;
}
</style>
