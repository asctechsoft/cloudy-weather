<template>
  <div class="sun-rise-progression w-full">
    <canvas id="draw_progression" class="w-full" height="65"></canvas>
  </div>
</template>
<script>
import { convertTimeSun } from "../../../utils/converValue.js";
export default {
  name: "sun-path-page",
  data() {
    return {
      sunSize: 20,
      percentProgression: 50,
      imgTop: require("../../../assets/images/svg/ic_canvas_top.svg"),
      imgBottom: require("../../../assets/images/svg/ic_canvas_bottom.svg"),
    };
  },

  props: {
    renderCurrently: {
      type: Object,
      required: () => {},
    },
  },

  computed: {
    timeHourly() {
      const timeValue = this.$store.state.getWeather.currently;

      return Math.round((convertTimeSun(timeValue.time, 0) * 100) / 24);
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.createProgressionSin();
    });
  },

  methods: {
    async createProgressionSin() {
      // Lấy canvas gốc và context của nó
      var canvas = document.getElementById("draw_progression");
      var ctx = canvas.getContext("2d");

      // Khởi tạo tiếp 2 thằng con
      var canvasUpper = document.createElement("canvas");
      canvasUpper.width = canvas.width; // Chiều rộng lấy theo canvas gốc
      canvasUpper.height = canvas.height; // Chiều cao tương tự
      var ctxUpper = canvasUpper.getContext("2d");

      // Tạo thằng con tiếp theo
      var canvasDowner = document.createElement("canvas");
      canvasDowner.width = canvas.width;
      canvasDowner.height = canvas.height;
      var ctxDowner = canvasDowner.getContext("2d");

      // Tạo đường path

      var path = new Path2D();
      path.moveTo(-100, canvas.height + 200); // Di chuyển ra tọa độ này
      var sunPosX = []; // Lưu trữ tọa độ x
      var sunPosY = []; // Lưu trữ tọa độ y
      let i = 0;
      while (i < canvas.width + 5) {
        const wx = i;
        const factor =
          (1 - Math.sin(((i / canvas.width) * 2 - 0.5) * Math.PI)) / 2;
        const wy = factor * canvas.height * 0.7 + canvas.height * 0.15;
        path.lineTo(wx, wy);
        sunPosX.push(wx);
        sunPosY.push(wy);
        i += 5;
      }
      path.lineTo(canvas.width + 100, canvas.height + 100);
      path.closePath(); // Đóng đường path

      ctxUpper.clearRect(0, 0, canvas.width, canvas.height);
      ctxDowner.clearRect(0, 0, canvas.width, canvas.height);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctxDowner.strokeStyle = "#00315A";
      ctxUpper.strokeStyle = "#C4E032";
      ctx.strokeStyle = "#FFFFFF";
      ctxUpper.lineWidth = 2.5;
      ctxDowner.lineWidth = 2.5;
      ctx.lineWidth = 1.7;

      ctxUpper.stroke(path); // Vẽ đường cong
      ctxDowner.stroke(path); // Vẽ đường cong

      ctxDowner.clearRect(0, 0, canvas.width, canvas.height * 0.5);
      ctxUpper.clearRect(0, canvas.height * 0.5, canvas.width, canvas.height);

      ctx.drawImage(canvasDowner, 0, 0); // Vẽ canvas canvasDowner lên ctx
      ctx.drawImage(canvasUpper, 0, 0); // Vẽ canvas canvasUpper lên ctx

      var sunSize = 20;
      var percent = this.timeHourly;

      this.drawSunAt(
        ctx,
        ctxDowner,
        canvasDowner,
        percent,
        sunPosX,
        sunPosY,
        sunSize,
        this.imgTop,
        canvas,
        1
      );

      this.drawSunAt(
        ctx,
        ctxUpper,
        canvasUpper,
        percent,
        sunPosX,
        sunPosY,
        sunSize,
        this.imgBottom,
        canvas,
        2
      );
    },

    drawSunAt(
      ctx,
      ctxNew,
      canvasDowner,
      percent,
      sunPosX,
      sunPosY,
      sunSize,
      drawable,
      canvas,
      number
    ) {
      const posIndex = Math.floor((sunPosY.length * percent) / 100);

      console.log("posIndex", posIndex);

      const posX = sunPosX[posIndex];
      const posY = sunPosY[posIndex];

      const img = new Image();
      img.style.width = "220px";
      img.style.height = "220px";
      img.src = drawable;

      img.onload = () => {
        ctxNew.drawImage(
          img,
          posX - this.sunSize / 2,
          posY - this.sunSize / 2,
          sunSize,
          sunSize
        );
        if (number === 1) {
          ctxNew.clearRect(0, canvas.height * 0.5, canvas.width, canvas.height);
        } else {
          ctxNew.clearRect(0, 0, canvas.width, canvas.height * 0.5);
        }
        // Sau khi vẽ lên canvasDowner, bạn cần vẽ canvasDowner lên canvas chính
        ctx.drawImage(canvasDowner, 0, 0);
        // Thêm đường kẻ trắng
        ctx.beginPath();
        ctx.moveTo(0, canvas.height * 0.5);
        ctx.lineTo(canvas.width, canvas.height * 0.5);
        ctx.stroke();
      };
    },
  },
};
</script>
<style lang=""></style>
