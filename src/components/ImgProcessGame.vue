<template>
  <div class="container">
    <div class="lft">
      <div class="img-container">
        <img id="bg" v-if="bgIndex > -1" :src="require('@img/game3/' + bg[bgIndex] + '.jpg')" alt="" />
        <img :src="imgSrc" alt="" id="origin" :style="{ opacity: imgSrc != '' && showOrigin ? 1 : 0 }" />
        <canvas id="canva"></canvas>
      </div>
    </div>
    <div class="ctrl">
      <input
        type="file"
        id="input-upload"
        accept=".jpg,.jpeg,.png,.gif,.svg"
        @change="loadImg($event)"
        ref="imginput"
      />
      <ModernButton class="btn" @click="showPicker">{{ imgSrc == "" ? "上传图像" : "更换图像" }}</ModernButton>
      <div class="group">
        <div class="flexbox">
          <span class="caption">背景颜色</span>
          <input type="color" v-model="color" @change="customColorUsed = true" />
        </div>
        <label for="">(不选择将自动使用左上角颜色)</label>
      </div>
      <div class="group">
        <div class="flexbox">
          <span class="caption">调整容差</span>
          <span style="width: 3em; text-align: right">{{ bias }}</span>
        </div>
        <input type="range" min="0" id="bias" max="256" step="1" v-model="bias" />
      </div>
      <ModernButton class="btn" @click="showBGPicker = !showBGPicker">选择背景</ModernButton>
      <div class="group bg-picker" v-if="showBGPicker">
        <img
          v-for="(item, index) in bg"
          :class="{ chosen: bgIndex == index }"
          :src="require('@img/game3/' + item + '.jpg')"
          alt=""
          :key="index"
          @click="changeBG(index)"
        />
      </div>
      <ModernButton :class="{ btn: true, disabled: imgSrc == '' }" @click="draw">{{
        status == 1 ? "正在处理" : "开始处理"
      }}</ModernButton>
      <!-- <transition>
        <ModernButton v-if="status >= 2" class="btn" @click="download">{{
          status == 3 ? "正在准备" : "保存图片"
        }}</ModernButton>
      </transition>
      <a :href="base64Data" download="合成的图片">下载</a> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url(../assets/css/theme.css);
.container {
  display: flex;
  align-items: center;
  font-family: SourceHanSansCN;
  font-weight: 200;
  background-color: var(--darkGray);

  .lft {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .img-container {
      position: relative;
      width: 85%;
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
    }

    canvas,
    img {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: contain;
      z-index: 1;
      &#bg {
        object-fit: cover;
        z-index: 0;
      }
    }
  }

  .ctrl {
    width: calc(20% + 32px);
    padding: 48px 16px 24px;
    box-sizing: border-box;
    height: 100%;
    background-color: #4d4d4d;
    #input-upload {
      display: none;
    }
    .group {
      padding: 20px 10px;
      margin: 16px;
      background-color: var(--lightGray);
      border-radius: 10px;
      .flexbox {
        display: flex;
        align-items: center;
        justify-content: space-around;
      }
      .caption {
        font-size: 20px;
        font-family: PangMenZhengDao;
        color: var(--theme);
      }
      label {
        font-size: 12px;
        color: #bababa;
      }
      #bias {
        appearance: none;
        -webkit-appearance: none;
        background-color: transparent;
        &::-webkit-slider-thumb {
          -webkit-appearance: none;
          border: 5px solid #fff;
          height: 25px;
          width: 25px;
          border-radius: 12.5px;
          background: var(--lightGray);
          cursor: pointer;
          margin-top: -10px;
        }
        &::-webkit-slider-runnable-track {
          appearance: none;
          -webkit-appearance: none;
          width: 100%;
          height: 5px;
          cursor: pointer;
          background: #bababa;
          border-radius: 2.5px;
        }
      }
    }
    .bg-picker {
      display: flex;
      flex-wrap: wrap;
      background-color: transparent;
      padding: 0;
      border-radius: 0;
      img {
        width: 52px;
        height: 39px;
        object-fit: cover;
        margin: 0 5px;
        border-radius: 5px;
        overflow: hidden;
        cursor: pointer;
        border: 2px transparent solid;
        &.chosen {
          border: 2px var(--theme) solid;
        }
      }
    }
    .btn {
      margin-top: 12px;
      color: var(--theme);
      &.disabled {
        color: var(--lightGray);
        &:hover {
          filter: none;
          cursor: not-allowed;
        }
      }
    }
  }
}
</style>

<script>
import ModernButton from "./ModernButton.vue";
export default {
  name: "ImgProcessGame",
  components: {
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
      showBGPicker: false,
      bg: ["bg1", "bg2"],
      bgIndex: -1,
      imageData: null,
      base64Data: null,
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
    changeBG(index) {
      if (index == this.bgIndex) {
        this.bgIndex = -1;
      } else {
        this.bgIndex = index;
      }
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
      // console.log("start drawing");
      this.status = 1;
      const img = document.querySelector("#origin");
      const canvas = document.querySelector("#canva");
      const width = (canvas.width = img.naturalWidth || img.width);
      const height = (canvas.height = img.naturalHeight || img.height);
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      // 获取画布像素信息
      this.imageData = ctx.getImageData(0, 0, width, height);
      // 一个像素点由RGBA四个值组成，data为[R,G,B,A [,R,G,B,A[...]]]组成的一维数组
      const data = this.imageData.data;
      if (!this.customColorUsed) {
        //提取左上角像素颜色
        this.color =
          "#" + this.pad(data[0].toString(16)) + this.pad(data[1].toString(16)) + this.pad(data[2].toString(16));
        // console.log(this.color);
      }
      // 对图像数据进行处理
      this.filter(data).then(() => {
        // 把新的内容画进画布里
        ctx.putImageData(this.imageData, 0, 0);
        // console.log("finished drawing");
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
    composite() {
      return new Promise((resolve) => {
        setTimeout(() => {
          const img = document.querySelector("#bg");
          const canvas = document.querySelector("#canva");
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          const bgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          for (let i = 0; i < this.imageData.length; i += 4) {
            if (this.imageData[i + 3] == 0) {
              this.imageData[i] = bgData[i];
              this.imageData[i + 1] = bgData[i + 1];
              this.imageData[i + 2] = bgData[i + 2];
            }
          }
          ctx.putImageData(this.imageData, 0, 0);
          resolve();
        }, 5);
      });
    },
    download() {
      this.status = 3;
      this.composite().then(() => {
        this.base64Data = document.querySelector("#canva").toDataURL("image/png");
        this.status = 2;
      });
    },
  },
};
</script>
