<template>
  <div class="w-full h-full bg-unit">
    <!--  -->
    <div class="flex w-full justify-center items-center">
      <img src="../../../assets/images/svg/ic_unit_setting.svg" alt="" />
    </div>
    <div class="w-full text-center txt_light_summer p-2">
      <div class="w-full pl-14 pr-14">
        <span>
          {{
            $t(
              "We_want_to_make_sure_you_have_the_best_experiences_while_using_out_app"
            )
          }}
        </span>
      </div>
      <div>
        <span>{{ $t("Please_choose_your_preference") }}</span>
      </div>
    </div>

    <div class="w-full mt-4">
      <!-- Nhiệt độ -->
      <div
        class="w-full cursor-pointer flex justify-between items-center pt-2 pb-2"
      >
        <div class="txt_regular">
          <span>{{ $t("Temperature") }}</span>
        </div>
        <div class="flex gap-1.5">
          <button
            class="btn-unit"
            :class="{ active: renderUnitSetting.activeTemperature === 'c' }"
            @click="setActiveButton('c')"
          >
            <span class="txt_medium">°C </span>
          </button>
          <button
            class="btn-unit"
            :class="{ active: renderUnitSetting.activeTemperature === 'f' }"
            @click="setActiveButton('f')"
          >
            <span class="txt_medium">°F</span>
          </button>
        </div>
      </div>
      <div class="bor-bottom"></div>
      <!-- Thời gian -->
      <div
        class="w-full cursor-pointer flex justify-between items-center pt-2 pb-2"
      >
        <div class="txt_regular">
          <span>{{ $t("Time_Format") }}</span>
        </div>
        <div class="flex gap-1.5">
          <button
            class="btn-unit"
            :class="{ active: renderUnitSetting.activeTime === '12h' }"
            @click="setActiveButton('12h')"
          >
            <span class="txt_medium">12h </span>
          </button>
          <button
            class="btn-unit"
            :class="{ active: renderUnitSetting.activeTime === '24h' }"
            @click="setActiveButton('24h')"
          >
            <span class="txt_medium">24h</span>
          </button>
        </div>
      </div>
      <div class="bor-bottom"></div>
      <!-- Lượng mưa -->
      <div
        class="w-full cursor-pointer flex justify-between items-center pt-2 pb-2"
      >
        <div class="txt_regular">
          <span>{{ $t("Precipitation") }}</span>
        </div>
        <div class="flex gap-1.5">
          <button
            class="btn-unit"
            :class="{ active: renderUnitSetting.activePrecipitation === 'mm' }"
            @click="setActiveButton('mm')"
          >
            <span class="txt_medium">mm</span>
          </button>
          <button
            class="btn-unit"
            :class="{ active: renderUnitSetting.activePrecipitation === 'in' }"
            @click="setActiveButton('in')"
          >
            <span class="txt_medium">in</span>
          </button>
        </div>
      </div>
      <div class="bor-bottom"></div>
      <!-- Khoảng cách -->
      <div
        class="w-full cursor-pointer flex justify-between items-center pt-2 pb-2"
      >
        <div class="txt_regular">
          <span>{{ $t("Distance") }}</span>
        </div>
        <div class="flex gap-1.5">
          <button
            class="btn-unit"
            :class="{ active: renderUnitSetting.activeDistance === 'km' }"
            @click="setActiveButton('km')"
          >
            <span class="txt_medium">km</span>
          </button>
          <button
            class="btn-unit"
            :class="{ active: renderUnitSetting.activeDistance === 'mi' }"
            @click="setActiveButton('mi')"
          >
            <span class="txt_medium">mi</span>
          </button>
        </div>
      </div>
      <div class="bor-bottom"></div>
      <!-- Tốc độ gió -->

      <!-- Áp xuất -->
      <div class="w-full cursor-pointer pt-2 pb-2">
        <div class="txt_regular text-left pb-2">
          <span>{{ $t("Wind_Speed") }}</span>
        </div>
        <div class="flex gap-1.5 justify-between items-center">
          <div></div>
          <div class="flex gap-1.5">
            <button
              class="btn-unit"
              :class="{ active: renderUnitSetting.activeWindSpeed === 'm/s' }"
              @click="setActiveButton('m/s')"
            >
              <span class="txt_regular_14">m/s </span>
            </button>
            <button
              class="btn-unit"
              :class="{ active: renderUnitSetting.activeWindSpeed === 'km/h' }"
              @click="setActiveButton('km/h')"
            >
              <span class="txt_regular_14">km/h</span>
            </button>
            <button
              class="btn-unit"
              :class="{ active: renderUnitSetting.activeWindSpeed === 'mi/h' }"
              @click="setActiveButton('mi/h')"
            >
              <span class="txt_regular_14">mi/h</span>
            </button>
            <button
              class="btn-unit"
              :class="{ active: renderUnitSetting.activeWindSpeed === 'knot' }"
              @click="setActiveButton('knot')"
            >
              <span class="txt_regular_14">Knot</span>
            </button>
            <button
              class="btn-unit"
              :class="{ active: renderUnitSetting.activeWindSpeed === 'scale' }"
              @click="setActiveButton('bft')"
            >
              <span class="txt_regular_14">Beaufort scale</span>
            </button>
          </div>
        </div>
      </div>
      <div class="bor-bottom"></div>
      <!-- Pressure -->
      <div class="w-full cursor-pointer pt-2 pb-2">
        <div class="txt_regular text-left pb-2">
          <span>{{ $t("Pressure") }}</span>
        </div>
        <div class="flex gap-1.5 justify-between items-center">
          <div></div>
          <div class="flex gap-1.5">
            <button
              class="btn-unit"
              :class="{ active: renderUnitSetting.activePressure === 'mmHg' }"
              @click="setActiveButton('mmHg')"
            >
              <span class="txt_regular_14">mmHg</span>
            </button>
            <button
              class="btn-unit"
              :class="{ active: renderUnitSetting.activePressure === 'hPa' }"
              @click="setActiveButton('hPa')"
            >
              <span class="txt_regular_14">hPa</span>
            </button>
            <button
              class="btn-unit"
              :class="{ active: renderUnitSetting.activePressure === 'atm' }"
              @click="setActiveButton('atm')"
            >
              <span class="txt_regular_14">atm</span>
            </button>
            <button
              class="btn-unit"
              :class="{ active: renderUnitSetting.activePressure === 'mBar' }"
              @click="setActiveButton('mBar')"
            >
              <span class="txt_regular_14">mBar</span>
            </button>
            <button
              class="btn-unit"
              :class="{ active: renderUnitSetting.activePressure === 'inHg' }"
              @click="setActiveButton('inHg')"
            >
              <span class="txt_regular_14">inHg</span>
            </button>
            <button
              class="btn-unit"
              :class="{ active: renderUnitSetting.activePressure === 'kPa' }"
              @click="setActiveButton('kPa')"
            >
              <span class="txt_regular_14">kPa</span>
            </button>
          </div>
        </div>
      </div>
      <div class="bor-bottom"></div>
    </div>

    <div class="w-full p-4 mt-4">
      <button
        type="button"
        @click="onClickDoneUnit()"
        class="w-[300px] text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none font-medium rounded-xl text-sm px-5 py-3 text-center me-2 mb-2"
      >
        <span class="txt_medium">{{ $t("done") }}</span>
      </button>
    </div>
  </div>
</template>
<script>
import { mapActions, mapMutations } from "vuex";
import { ElNotification } from "element-plus";
import { setTimeout } from "core-js";

export default {
  name: "unit-page",
  setup() {
    const successUnit = () => {
      ElNotification({
        title: "Success",
        message: "This is a success message",
        type: "success",
      });
    };
    return {
      successUnit,
    };
  },
  data() {
    return {
      objectNewSetting: {
        activeTemperature: "c",
        activeTime: "12h",
        activePrecipitation: "mm",
        activeDistance: "km",
        activeWindSpeed: "mi/h",
        activePressure: "hPa",
      },
    };
  },

  computed: {
    renderUnitSetting() {
      console.log(
        "objectSetting",
        this.$store.state.commonModule.objectSetting
      );

      return this.$store.state.commonModule.objectSetting;
    },
  },

  methods: {
    ...mapMutations([
      "setObjectSetting",
      "setActivePressure",
      "setActiveWindSpeed",
      "setActiveDistance",
      "setActivePrecipitation",
      "setActiveTime",
      "setActiveTemperature",
      "setObjectSettingSave",
      "setObjectSettingSaveDefault",
    ]),
    setActiveButton(value) {
      const nameValue = value;
      if (nameValue === "c" || nameValue === "f") {
        this.setActiveTemperature(nameValue);
      }
      if (nameValue === "12h" || nameValue === "24h") {
        this.setActiveTime(nameValue);
      }
      if (nameValue === "mm" || nameValue === "in") {
        this.setActivePrecipitation(nameValue);
      }
      if (nameValue === "km" || nameValue === "mi") {
        this.setActiveDistance(nameValue);
      }
      if (
        nameValue === "m/s" ||
        nameValue === "km/h" ||
        nameValue === "mi/h" ||
        nameValue === "knot" ||
        nameValue === "bft"
      ) {
        this.setActiveWindSpeed(nameValue);
      }
      if (
        nameValue === "mmHg" ||
        nameValue === "hPa" ||
        nameValue === "atm" ||
        nameValue === "mBar" ||
        nameValue === "inHg" ||
        nameValue === "kPa"
      ) {
        this.objectNewSetting.activePressure = nameValue;
        this.setActivePressure(nameValue);
      }
    },

    onClickDoneUnit() {
      this.successUnit();

      this.setObjectSettingSaveDefault(this.renderUnitSetting);

      this.$emit("onCloseDraw", false);
    },
  },
};
</script>
<style lang="scss">
.bg-unit {
  transition: right 0.3s ease;
  color: white;
}

.btn-unit {
  border-radius: 12px;
  background-color: #000000;
  padding: 10px 10px;
  width: 70px;
  height: 45px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn-unit:hover {
  background-color: #6056bb9a;
}
.btn-unit.active {
  border: 2px solid #3490dc; /* Example active background color */
  color: #ffffff; /* Example active text color */
}
button {
  cursor: pointer;
}
</style>
