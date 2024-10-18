import { httpAqi } from "../../configs/http-weather";
import { decodeBase64 } from "../../utils/EncoderDecoderUtils";

const state = {
  airObject: {},
  airKeyObject: {},
};

const getters = {};

const mutations = {
  /**
   * Set Key
   * @param {*} state
   * @param {*} data
   */
  setAirQualityByKey(state, data) {
    const newDataAir = JSON.parse(decodeBase64(data));
    if (newDataAir) {
      state.airKeyObject = newDataAir.d[0];
    }
  },

  /**
   * Set Data Air Quality
   * @param {*} state
   * @param {*} data
   */
  setAirQuality(state, data) {
    localStorage.setItem("airObject", data);

    const newDataAir = JSON.parse(decodeBase64(data));

    state.airObject = newDataAir;
  },
};

const actions = {
  /**
   * API Get AQI (chất lượng không khí)
   * @param {*} param0
   * @param {*} param
   * @returns
   */
  async getAirQuality({ commit }, param) {
    try {
      const response = await httpAqi.get(`airquality.php?param=${param}`, {
        timeout: 30000, // Thêm timeout 10 giây
      });

      if (response.status === 200) {
        commit("setAirQuality", response.data);
        return response.data;
      } else {
        console.error("Error: API returned non-200 status");
        return null; // Hoặc xử lý giá trị trả về nếu cần
      }
    } catch (error) {
      // Xử lý lỗi ngầm (silent fail)
      console.error("Error fetching air quality data:", error.message || error);
      return null; // Hoặc giá trị mặc định khác nếu cần
    }
  },

  async getAirQualityByKey({ commit }, param) {
    try {
      const response = await httpAqi.get(`airquality.php?param=${param}`, {
        timeout: 30000, // Thêm timeout 10 giây
      });

      if (response.status === 200) {
        commit("setAirQualityByKey", response.data);
        return response.data;
      } else {
        console.error("Error: API returned non-200 status");
        return null; // Hoặc xử lý giá trị trả về nếu cần
      }
    } catch (error) {
      console.error("Error fetching air quality data:", error.message || error);
      return null;
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
