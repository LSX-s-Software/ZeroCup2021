<template>
  <div class="main-container" ref="main" @resize="handleResize">
    <ProgressIndicator id="wheel" :class="{ hidden: scrolled < 1 }" :current="scrolled - 1"></ProgressIndicator>
    <div class="bg-container">
      <img src="./assets/img/bg.jpg" alt="" class="bg" />
      <img src="./assets/img/bg.jpg" alt="" class="bg" />
    </div>
    <div class="screen" ref="s0">
      <div class="left"></div>
      <div class="right"></div>
    </div>
    <div class="screen" ref="s1">
      <div class="left"></div>
      <div class="right"></div>
    </div>
    <div class="screen" ref="s2">
      <div class="left"></div>
      <div class="right"></div>
    </div>
    <div class="screen" ref="s3">
      <div class="left"></div>
      <div class="right"></div>
    </div>
    <div class="screen" ref="s4">
      <div class="left"></div>
      <div class="right"></div>
    </div>
    <div class="screen" ref="s5">
      <div class="left"></div>
      <div class="right"></div>
    </div>
    <div class="screen" ref="s6">
      <div class="left"></div>
      <div class="right"></div>
    </div>
    <div class="screen" ref="s7">
      <div class="left"></div>
      <div class="right"></div>
    </div>
    <div class="screen" ref="s8">
      <div class="left"></div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script>
import ProgressIndicator from "./components/ProgressIndicator.vue";
// import FilmRoll from "./components/FilmRoll.vue";
// import ClassicButton from "./components/ClassicButton.vue";

export default {
  name: "App",
  components: {
    ProgressIndicator,
    // FilmRoll,
    // ClassicButton,
  },
  data() {
    return {
      scrolled: 0,
      scrollLock: false,
      videoPlaying: true,
      clientHeight: document.documentElement.clientHeight,
      showDetail: [false, false, false, false],
      showGame: [false, false],
    };
  },
  mounted() {
    window.addEventListener("scroll", () => {
      if (!this.scrollLock) {
        this.scrolled = 1 + window.scrollY / this.clientHeight;
        console.log(this.scrolled);
      }
    });
  },
  methods: {
    handleResize() {
      this.clientHeight = document.documentElement.clientHeight;
    },
    handleVideoPause() {
      //视频播放结束
      this.videoPlaying = false;
    },
  },
};
</script>

<style lang="scss">
@import url(./assets/css/font.css);
@import url(./assets/css/theme.css);
@import url(./assets/css/transition.css);

* {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100%;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

*::-webkit-scrollbar {
  width: 0 !important;
}

.main-container {
  width: 100%;
  min-height: 500vh;
  box-sizing: border-box;
  position: relative;

  .bg-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
    opacity: 0.3;
    display: flex;
    flex-direction: column;

    img {
      width: 100%;
      height: auto;

      &:nth-child(2n) {
        transform: rotateX(180deg);
      }
    }
  }

  #wheel {
    position: fixed;
    left: -165px;
    top: -165px;
    z-index: 1000;
    transition: left ease-out 0.7s, top ease-out 0.7s;

    &.hidden {
      left: -500px;
      top: -500px;
    }
  }

  .screen {
    position: relative;
    width: 100%;
    height: 92vh;
    max-height: 1000px;
    min-height: 768px;
    box-sizing: border-box;
    border: 1px solid aqua; // 仅供定位使用
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    padding: 75px 45px;

    .left,
    .right {
      max-width: 40%;
      text-align: left;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      justify-content: center;

      .dual-btn {
        display: flex;
        justify-content: space-around;
      }
    }

    h2 {
      font-family: HYZhuZiSuDaHeiW;
      font-size: 80px;
      font-weight: bold;
      margin: 0 0 0.8em;
      color: var(--theme);
      line-height: 1.2;

      &.vertical {
        width: 1em;
        line-height: 1.2;
        font-size: 100px;
        transform: rotate(-10deg);
      }
    }

    h3 {
      font-family: HYZhuZiSuDaHeiW;
      font-size: 30px;
      color: rgb(32, 32, 32);
    }

    p {
      font-size: 30px;
      margin-bottom: 1em;
    }

    .transition {
      position: absolute;
      top: 0;
      left: 90px;
      img {
        transform: translateY(-50%);
      }
    }

    #proj1 {
      width: 187px;
      transform: translateY(-40%) rotate(-10deg);
    }

    #proj2 {
      width: 289px;
      transform: translateY(-40%) rotate(22deg);
    }
  }
}
</style>
