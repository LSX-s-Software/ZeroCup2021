<template>
  <div class="container">
    <div class="img-container">
      <img :src="imgSrc" alt="" id="origin" :style="{ opacity: showOrigin ? 1 : 0 }" />
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
      <input type="color" v-model="color" />
      <Arrow class="arrow" :rotation="90" />
      <span class="caption">③微调</span>
      <label for="bias">
        容差：{{ bias }}
        <input type="range" min="0" id="bias" max="128" step="1" v-model="bias" />
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
      bias: 16,
      imgSrc: "",
      color: "#ffffff",
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
      console.log(file);
      const reader = new FileReader();
      reader.onload = this.readerOnload;
      reader.readAsDataURL(file);
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
            const target = this.targetColor;
            let flag = true;
            for (let j = 0; j < 3; j++) {
              if (Math.abs(data[i + j] - target[j]) > this.bias) {
                flag = false;
                break;
              }
            }
            if (flag) {
              data[i + 3] = 0;
            }
          }
          console.timeEnd("process");
          resolve();
        }, 10);
      });
    },
  },
};
</script>
