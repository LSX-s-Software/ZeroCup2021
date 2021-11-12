<template>
  <div class="container">
    <div class="img-container">
      <img :src="imgSrc" alt="" id="origin" :style="{ opacity: imgSrc != '' && showOrigin ? 1 : 0 }" />
      <canvas id="canva"></canvas>
    </div>
    <div class="ctrl">
      <span class="caption">①上传图像</span>
      <input
        type="file"
        id="input-upload"
        accept=".jpg,.jpeg,.png,.gif,.svg"
        @change="loadImg($event)"
        ref="imginput"
      />
      <ModernButton class="btn" @click="showPicker">{{ imgSrc == "" ? "上传图像" : "更换图像" }}</ModernButton>
      <Arrow class="arrow" :rotation="90" />
      <span class="caption">②选择背景色</span>
      <input type="color" v-model="color" @change="customColorUsed = true" /><br />
      <label for="">(不选择将自动使用左上角颜色)</label>
      <Arrow class="arrow" :rotation="90" />
      <span class="caption">③微调</span>
      <label for="bias">
        容差：{{ bias }}
        <input type="range" min="0" id="bias" max="256" step="1" v-model="bias" />
      </label>
      <Arrow class="arrow" :rotation="90" />
      <ModernButton class="btn" @click="draw">{{ status == 1 ? "正在处理" : "开始处理" }}</ModernButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url(../assets/css/theme.css);
.container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-family: SourceHanSansCN;
  font-weight: 200;
  background-color: var(--darkGray);

  .img-container {
    position: relative;
    width: 75%;
    height: 75%;
    border-radius: 10px;
    overflow: hidden;
    background-image: -webkit-gradient(
        linear,
        0 0,
        100% 100%,
        color-stop(0.25, #ccc),
        color-stop(0.25, transparent),
        to(transparent)
      ),
      -webkit-gradient(linear, 0 100%, 100% 0, color-stop(0.25, #ccc), color-stop(0.25, transparent), to(transparent)),
      -webkit-gradient(linear, 0 0, 100% 100%, color-stop(0.75, transparent), color-stop(0.75, #ccc)),
      -webkit-gradient(linear, 0 100%, 100% 0, color-stop(0.75, transparent), color-stop(0.75, #ccc));
    background-size: 10px 10px;

    canvas,
    img {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .ctrl {
    width: 20%;
    #input-upload {
      display: none;
    }
    .caption {
      font-size: 24px;
      display: block;
      margin: 0 auto;
    }
    .arrow {
      display: block;
      margin: 12px auto;
    }
    .btn {
      margin: 0;
      padding: 8px 16px;
      font-size: 20px;
    }
  }
}
</style>

<script>
import Arrow from "./Arrow.vue";
import ModernButton from "./ModernButton.vue";
export default {
  name: "ImgProcessGame",
  components: {
    Arrow,
    ModernButton,
  },
  data() {
    return {
      bias: 64,
      imgSrc: "",
      color: "#ffffff",
      customColorUsed: false,
      status: 0,
      showOrigin: true,
    };
  },
  computed: {
    targetColor() {
      let result = [];
      for (let i = 1; i <= 5; i += 2) {
        result.push(parseInt(this.color.substr(i, 2), 16));
      }
      return result;
    },
  },
  methods: {
    showPicker() {
      console.log(this.$refs);
      this.$refs.imginput.dispatchEvent(new MouseEvent("click"));
    },
    loadImg(e) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = this.readerOnload;
      reader.readAsDataURL(file);
      this.customColorUsed = false;
      this.showOrigin = true;
      let canva = document.querySelector("#canva");
      canva.getContext("2d").clearRect(0, 0, canva.width, canva.height);
    },
    readerOnload(src) {
      this.imgSrc = src.target ? src.target.result : src;
      this.showOrigin = true;
      this.status = 0;
    },
    draw() {
      if (this.status == 1) {
        return;
      }
      console.log("start drawing");
      this.status = 1;
      const img = document.querySelector("#origin");
      const canvas = document.querySelector("#canva");
      const width = (canvas.width = img.naturalWidth || img.width);
      const height = (canvas.height = img.naturalHeight || img.height);
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      // 获取画布像素信息
      const imageData = ctx.getImageData(0, 0, width, height);
      // 一个像素点由RGBA四个值组成，data为[R,G,B,A [,R,G,B,A[...]]]组成的一维数组
      const data = imageData.data;
      if (!this.customColorUsed) {
        //提取左上角像素颜色
        this.color =
          "#" + this.pad(data[0].toString(16)) + this.pad(data[1].toString(16)) + this.pad(data[2].toString(16));
        console.log(this.color);
      }
      // 对图像数据进行处理
      this.filter(data).then(() => {
        // 把新的内容画进画布里
        ctx.putImageData(imageData, 0, 0);
        console.log("finished drawing");
        this.status = 2;
        this.showOrigin = false;
      });
    },
    filter(data) {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.time("process");
          for (let i = 0; i < data.length; i += 4) {
            if (Math.abs(this.colorDistance([data[i], data[i + 1], data[i + 2]], this.targetColor)) <= this.bias) {
              data[i + 3] = 0;
            }
          }
          console.timeEnd("process");
          resolve();
        }, 5);
      });
    },
    pad(str) {
      return str.length == 2 ? str : "0" + str;
    },
    colorDistance(rgb_1, rgb_2) {
      let [R_1, G_1, B_1] = rgb_1;
      let [R_2, G_2, B_2] = rgb_2;
      let rmean = (R_1 + R_2) / 2;
      let R = R_1 - R_2;
      let G = G_1 - G_2;
      let B = B_1 - B_2;
      return Math.sqrt((2 + rmean / 256) * R ** 2 + 4 * G ** 2 + (2 + (255 - rmean) / 256) * B ** 2);
    },
  },
};
</script>
