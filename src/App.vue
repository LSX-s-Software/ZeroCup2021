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
      <div class="left">
        <FilmRoll :items="['./assets/video/s1_v1.mp4', '', '']"></FilmRoll>
        <span class="des">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque voluptates eius incidunt mollitia, quo
          provident totam dolore magnam corrupti, excepturi a sit praesentium. Reprehenderit, molestias numquam ad
          dolores doloremque asperiores!
        </span>
      </div>
      <div class="right">
        <h2>电影的诞生</h2>
        <p>
          在美国，电影是一种文化，是一种艺术，是一种视觉享受。 在中国，电影是一种文化，是一种艺术，是一种视觉享受。
          在中国，电影是一种文化，是一种艺术，是一种视觉享受。 在中国，电影是一种文化，是一种艺术，是一种视觉享受。
          在中国，电影是一种文化，是一种艺术，是一种视觉享受。 在中国，电影是一种文化，是一种艺术，是一种视觉享受。
          在中国，电影是一种文化，是一种艺术，是一种视觉享受。 在中国，电影是一种文化，是一种艺术，是一种视觉享受。
        </p>
        <ClassicButton @click="showDetail[0] = !showDetail[0]">{{
          showDetail[0] ? "返回视频" : "查看更多"
        }}</ClassicButton>
      </div>
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
import FilmRoll from "./components/FilmRoll.vue";
import ClassicButton from "./components/ClassicButton.vue";

export default {
  name: "App",
  components: {
    ProgressIndicator,
    FilmRoll,
    ClassicButton,
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
  color: var(--darkText);
}

*::-webkit-scrollbar {
  width: 0 !important;
}

.main-container {
  width: 100%;
  min-height: 500vh;
  box-sizing: border-box;
  position: relative;
  padding: 0 60px;

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

    .left,
    .right {
      max-width: 40%;
      padding: 0 60px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;

      &.compact {
        padding: 0;
      }

      .dual-btn {
        display: flex;
        justify-content: space-around;
      }

      .video {
        background-color: #000000;
        height: 500px;
        object-fit: contain;
      }
    }

    h2 {
      font-family: HYZhuZiSuDaHeiW;
      font-size: 60px;
      margin-bottom: 12px;
      line-height: 1.5;
    }

    h3 {
      font-family: HYZhuZiSuDaHeiW;
      font-size: 30px;
      color: rgb(32, 32, 32);
    }

    p {
      font-family: AaMSXK;
      font-size: 32px;
      line-height: 42px;
      text-align: left;
    }

    .des {
      font-size: 20px;
      font-family: AaMSXK;
      line-height: 24px;
      color: var(--lightGray);
      opacity: 1;
      margin-top: 20px;
      max-width: 750px;
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
