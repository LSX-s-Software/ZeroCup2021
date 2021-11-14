<template>
  <div class="ccontainer">
    <div class="bgg-ccontainer">
      <img src="/img/bg.fac7b468.jpg" style="opacity: 0.4" class="bg" />
    </div>
    <div class="wrapper">
      <div class="left">
        <span>体验一下</span>
        <div class="title">减色法记录颜色</div>
        <div class="main">
          胶卷中展示了两个经典彩色电影《花与树》《飘》的剧照截图。
          请屏幕前的你通过控制青色、洋红和黄色的用量，为他选择合适的颜色吧！
          这也是使用加色法/减色法拍摄彩色电影原理的直观呈现。
        </div>
      </div>
      <img class="img-layer" src="@/assets/img/layer-border.png" />
      <div class="merge">
        <img
          :src="require('@/assets/img/merge-' + currentImg + '-0.jpg')"
          alt=""
          class="one"
          style="mix-blend-mode: initial"
        />
        <img
          :src="require('@/assets/img/merge-' + currentImg + '-1.jpg')"
          alt=""
          class="one"
          :style="'opacity: ' + value[0] / 100 + ';'"
        />
        <img
          :src="require('@/assets/img/merge-' + currentImg + '-2.jpg')"
          alt=""
          class="two"
          :style="'opacity: ' + value[1] / 100 + ';'"
        />
        <img
          :src="require('@/assets/img/merge-' + currentImg + '-3.jpg')"
          alt=""
          class="three"
          :style="'opacity: ' + value[2] / 100 + ';'"
        />
      </div>
      <div class="rright">
        <div>
          <img style="width: 234px" :src="require('@/assets/img/merge-' + currentImg + '-1.jpg')" alt="" />
          <input type="range" min="0" max="100" step="1" v-model="value[0]" />
        </div>
        <div>
          <img style="width: 234px" :src="require('@/assets/img/merge-' + currentImg + '-2.jpg')" alt="" />
          <input type="range" min="0" max="100" step="1" v-model="value[1]" />
        </div>
        <div>
          <img style="width: 234px" :src="require('@/assets/img/merge-' + currentImg + '-3.jpg')" alt="" />
          <input type="range" min="0" max="100" step="1" v-model="value[2]" />
        </div>
        <ClassicButton @click="this.$emit('hide')">返回视频</ClassicButton>
      </div>
    </div>

    <div class="placeholder">
      <h3>第二次变革</h3>
      <h2>黑白到彩色</h2>
    </div>
  </div>
</template>

<script>
import ClassicButton from "./ClassicButton";
export default {
  name: "ColorGameLayer",
  components: {
    ClassicButton,
  },
  emits: ["hide"],
  data() {
    return {
      showDetail: 0,
      value: [50, 50, 50],
      currentImg: 1,
    };
  },
  methods: {
    changeCurrentImg: function () {
      this.currentImg === 1 ? (this.currentImg = 2) : (this.currentImg = 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.bgg-ccontainer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  display: flex;
  opacity: 1;
  flex-direction: column;
  z-index: 99991;
  background-color: #fff;
}
.ccontainer {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
  display: flex;
  flex-direction: column;
  .wrapper {
    display: flex;
    margin: 0 3vw;
    z-index: 99999;
    justify-content: space-between;
    align-items: center;
    min-height: 100vh;
    min-width: 94vw;
    .left {
      display: flex;
      flex-direction: column;
      max-width: 22vw;
      text-align: left;
      span {
        font-size: 30px;
        font-family: AaMSXK;
        color: #707070;
      }
      .title {
        font-size: 60px;
        font-family: AaMSXK;
        color: #222222;
      }
      .main {
        font-size: 32px;
        font-family: iekieweibeiti;
        color: #222222;
      }
      transition: all 0.5s;
      transition-delay: 1s;

      &.hidden {
        transform: translateX(-200%);
      }
    }
    .img-layer {
      width: 889px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .merge {
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      width: 45rem;
      height: 26rem;
      background-color: rgba(0, 0, 0, 0.8);
      transform: translate(-50%, -50%);
      z-index: 999998;
      img {
        width: 40rem;
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        mix-blend-mode: multiply;
        z-index: 999999;
      }
    }
    .rright {
      width: 13vw;
      display: flex;
      flex-direction: column;
      gap: 30px;
      margin-right: 5vw;
      div {
        width: 100%;
        img {
          width: 100%;
        }
      }
    }
  }
}
.placeholder {
  width: 960px; /*no*/
  padding-bottom: 75px;
  position: fixed;
  bottom: 2.5rem;
  left: 50%;
  z-index: 99999;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  h3 {
    font-family: AaMSXK;
    font-size: 1.5rem;
    color: var(--lightGray);
  }
  h2 {
    font-family: HYZhuZiSuDaHeiW;
    font-size: 3.75rem;
    margin-top: -0.875 rem;
    margin-bottom: 0.75 rem;
    line-height: 1.5;
    color: var(--theme);
  }
}
</style>
