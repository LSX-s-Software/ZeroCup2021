<template>
  <div class="main-container" ref="main">
    <ProgressIndicator id="wheel" :class="{ hidden: scrolled < 1 }" :current="scrolled - 1"></ProgressIndicator>
    <div class="bg-container">
      <img src="@img/bg.jpg" alt="" class="bg" />
      <img src="@img/bg.jpg" alt="" class="bg" />
    </div>
    <div class="blackbg" :class="{ show: scrolled >= 6.9 }"></div>
    <div class="screen" id="s0">
      <video src="@video/1.mp4" autoplay muted></video>
      <h1>电影技术革新</h1>
    </div>
    <div class="screen" id="s1" ref="screen" @resize="handleResize">
      <div class="left hidable" :class="{ hidden: showDetail[0] }">
        <FilmRoll
          :sIndex="0"
          :items="['s1_v1', 's1_v2', 's1_v3']"
          :width="600"
          :outer-width="900"
          style="transform: translateX(-120px)"
          @slideChange="handleSlideChange($event)"
        ></FilmRoll>
        <span class="des" :class="{ hidden: showDetail[0] }">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque voluptates eius incidunt mollitia, quo
          provident totam dolore magnam corrupti, excepturi a sit praesentium. Reprehenderit, molestias numquam ad
          dolores doloremque asperiores!
        </span>
      </div>
      <div class="right">
        <h2 class="gray">电影的诞生</h2>
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
    <div class="screen" id="s2">
      <div class="left">
        <h2>无声电影</h2>
        <p>
          无声电影 即没有对白的电影 但是会有现场的乐队 讲解员 给观众带来更好的体验
          无声电影 即没有对白的电影 但是会有现场的乐队 讲解员 给观众带来更好的体验
          无声电影 即没有对白的电影 但是会有现场的乐队 讲解员 给观众带来更好的体验
          无声电影 即没有对白的电影 但是会有现场的乐队 讲解员 给观众带来更好的体验
        </p>
        <ClassicButton @click="showDetail[1] = !showDetail[1]">{{
          showDetail[1] ? "返回视频" : "查看更多"
        }}</ClassicButton>
      </div>
      <div class="right hidable" :class="{ hidden: showDetail[1] }">
        <div class="rotate">
          <FilmRoll
            :sIndex="1"
            :items="['s2_v1', 's2_v2']"
            :width="600"
            :outer-width="900"
            @slideChange="handleSlideChange($event)"
          ></FilmRoll>
          <span class="des" :class="{ hidden: showDetail[1] }">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque voluptates eius incidunt mollitia, quo
            provident totam dolore magnam corrupti, excepturi a sit praesentium. Reprehenderit, molestias numquam ad
            dolores doloremque asperiores!
          </span>
        </div>
      </div>
      <div class="transition" style="right: 60px">
        <img src="@img/projector1.png" alt="" id="proj1" />
      </div>
    </div>
    <div class="screen" id="s3">
      <div class="left hidable" :class="{ hidden: showDetail[2] }">
        <div class="rotate">
          <FilmRoll
            :sIndex="2"
            :items="['s2_v1', 's2_v2']"
            :width="600"
            :outer-width="900"
            @slideChange="handleSlideChange($event)"
          ></FilmRoll>
          <span class="des" :class="{ hidden: showDetail[2] }">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque voluptates eius incidunt mollitia, quo
            provident totam dolore magnam corrupti, excepturi a sit praesentium. Reprehenderit, molestias numquam ad
            dolores doloremque asperiores!
          </span>
        </div>
      </div>
      <div class="right">
        <h2>有声电影</h2>
        <p>
          电影从无声到有声，经历了一个巨大的转变过程。
          早期的有声电影是用放映机和留声机同时工作来发声的，1926年8月6日，世界第一部有声短片《唐璜》使用 “维他风”Vitaphone唱片重放影片音乐。
          1927年华纳推出《爵士歌王》，不仅有音乐，还加入了一部分对白，被看作是电影史上第一部有声片。
        </p>
        <ClassicButton @click="showDetail[2] = !showDetail[2]">{{
          showDetail[2] ? "返回视频" : "查看更多"
        }}</ClassicButton>
      </div>
      <div class="transition" style="left: 50px">
        <img src="@img/projector2.png" alt="" id="proj2" />
      </div>
    </div>
    <div class="screen" id="s4">
      <div class="left">
        <FilmRoll
          :sIndex="3"
          :items="['s2_v1', 's2_v2']"
          :width="889"
          :outer-width="1000"
          :inner-translate="10"
          :height="500"
          @slideChange="handleSlideChange($event)"
        ></FilmRoll>
      </div>
      <!-- <div class="right"></div> -->
    </div>
    <div class="screen" id="s5">
      <div class="left"></div>
      <div class="right"></div>
    </div>
    <div class="screen" id="s6">
      <div class="left"></div>
      <div class="right"></div>
    </div>
    <!-- “数字化”部分 -->
    <div class="screen modern" id="s7">
      <div>
        <h3>第三次变革</h3>
        <h2>数字化</h2>
      </div>
    </div>
    <div class="screen" id="s8">
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
      screenHeight: 1000,
      showDetail: [false, false, false, false],
      swiperIndex: [0, 0, 0, 0],
      showGame: [false, false],
    };
  },
  watch: {
    scrolled(oldVal, newVal) {
      console.log(`scrolled from ${oldVal} to ${newVal}`);
      this.handleScroll();
    }
  },
  mounted() {
    this.screenHeight = this.$refs.screen.getBoundingClientRect().height;
    window.addEventListener("scroll", () => {
      if (!this.scrollLock) {
        this.scrolled = window.scrollY / this.screenHeight;
      }
    });
  },
  methods: {
    handleResize() {
      this.screenHeight = this.$refs.screen.getBoundingClientRect().height;
    },
    handleVideoPause() {
      //视频播放结束
      this.videoPlaying = false;
    },
    handleSlideChange(e) {
      console.log(e);
      this.swiperIndex[e.sIndex] = e.activeIndex;
    },
    handleScroll() {},
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

  .bg-container {
    position: absolute;
    top: 100vh;
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

  .blackbg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 0;
    transition: background-color ease-out 0.7s;

    &.show {
      background-color: var(--darkBG);
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
    padding: 0 60px;

    .left {
      padding-left: 60px;

      .rotate {
        transform: translate(0%, 0%) rotateZ(-10deg);
        transform-origin: right bottom;
      }
    }
    .right {
      padding-right: 60px;

      .rotate {
        transform: translate(0%, 0%) rotateZ(10deg);
      }
    }

    .left,
    .right {
      width: 40%;
      max-width: 700px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;

      &.compact {
        padding: 0;
      }

      &.hidable {
        transform-origin: bottom left;
        transition: transform ease 0.5s, filter ease-out 0.4s;
      }
    }

    .left.hidable.hidden {
      transform: translate(-75%, 30%) rotate(-30deg);
      filter: brightness(0.2);
    }

    .right.hidable.hidden {
      transform: translate(80%, 0%) rotate(30deg);
      filter: brightness(0.2);
    }

    h1 {
      font-family: AaMSXK;
      font-size: 200px;
    }

    h2 {
      font-family: HYZhuZiSuDaHeiW;
      font-size: 60px;
      margin-bottom: 12px;
      line-height: 1.5;
      color: var(--theme);
      &.gray {
        color: var(--darkText);
      }
    }

    h3 {
      font-family: AaMSXK;
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
      transition: opacity ease-out 0.3s;

      &.hidden {
        opacity: 0;
      }
    }

    .transition {
      position: absolute;
      top: 0;
      z-index: 0;
      img {
        transform: translateY(-50%);
      }
    }

    #proj1 {
      width: 187px;
      transform: translateY(-70%) rotate(10deg);
    }

    #proj2 {
      width: 289px;
      transform: translateY(-40%) rotate(-18deg);
    }

    &.modern {
      font-family: PangMenZhengDao;
      color: var(--lightText);
    }

    &#s0,
    &#s7 {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &#s0 {
      height: 100vh;
      max-height: unset;
      background-color: var(--darkBG);
      video {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
      }
      h1 {
        z-index: 10;
        color: #fff;
      }
    }

    &#s7 {
      h2 {
        font-family: inherit;
        font-size: 150px;
        line-height: 150px;
      }
      h3 {
        color: inherit;
      }
    }
  }
}
</style>
