<template>
  <div class="main-container" ref="main" @resize="handleResize">
    <ProgressIndicator id="wheel" :class="{ hidden: scrolled < 1 }" :current="scrolled - 1"></ProgressIndicator>
    <FilmRoll
      id="roll1"
      :style="{
        width: videoStyle1.width + 'px',
        left: videoStyle1.left + 'rem',
        transform: 'rotate(' + videoStyle1.rotate + 'deg)',
      }"
      @mousewheel.stop="handleScroll($event)"
    >
      <section
        :style="{
          height: videoStyle1.placeholderHeight + 'px',
          borderBottomWidth: videoStyle1.borderWidth + 'px',
        }"
      ></section>
      <section id="roll-content-1" :style="{ height: videoStyle1.height + 'px' }">
        <transition>
          <video src="./assets/video/1.mp4" muted autoplay @pause="handleVideoPause" v-if="videoPlaying"></video>
        </transition>
        <transition>
          <img src="./assets/img/title.jpg" alt="" v-if="!videoPlaying" />
        </transition>
      </section>
      <section id="roll-content-2"></section>
      <section id="roll-content-3">
        <div class="flipable" :class="{ flip: showDetail[0] }">
          <div class="front"><video src="" muted></video></div>
          <div class="back">背面小字 配图 讲解胶片播放机的原理</div>
        </div>
      </section>
      <section id="roll-content-4">
        <span class="des">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias eligendi laborum cum harum, facilis velit
          debitis voluptatibus tenetur qui exercitationem voluptates eveniet. Incidunt a ea expedita ipsam accusamus,
          eveniet praesentium.
        </span>
      </section>
      <section id="roll-content-5">
        <div class="flipable" :class="{ flip: showDetail[1] }">
          <div class="front"><video src="" muted></video></div>
          <div class="back">背面小字 配图 讲解无声电影的代表作，无声电影的形式所带来艺术呈现手段。</div>
        </div>
      </section>
      <section id="roll-content-6">
        <span class="des">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias eligendi laborum cum harum, facilis velit
          debitis voluptatibus tenetur qui exercitationem voluptates eveniet. Incidunt a ea expedita ipsam accusamus,
          eveniet praesentium.
        </span>
      </section>
    </FilmRoll>
    <div class="screen" ref="s1"></div>
    <div class="screen" ref="s2">
      <transition name="fade">
        <div v-if="scrolled >= 1.2" class="transition">
          <img src="./assets/img/projector1.png" id="proj1" />
        </div>
      </transition>
      <transition name="fade">
        <div class="left" style="justify-content: flex-end; width: 25%" v-if="scrolled >= 1.6 && scrolled <= 2.7">
          <h2>电影的诞生</h2>
          <p>
            简述电影最初的播放原理，及主要技术<br />Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus
            cumque vitae eligendi excepturi repudiandae magni dolorum odit cupiditate? Quam, vel praesentium! Sed quam
            possimus dignissimos in cum vel quasi assumenda.
          </p>
        </div>
      </transition>
      <transition name="fade">
        <div class="right" style="width: 20%" v-if="scrolled >= 1.9 && scrolled <= 2.7">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus cumque vitae eligendi excepturi repudiandae
            magni dolorum odit cupiditate? Quam, vel praesentium! Sed quam possimus dignissimos in cum vel quasi
            assumenda.
          </p>
          <ClassicButton
            :title="showDetail[0] ? '返回视频' : '了解更多'"
            @click="showDetail[0] = !showDetail[0]"
          ></ClassicButton>
        </div>
      </transition>
    </div>
    <div class="screen" ref="s3">
      <div class="left" style="width: 30%">
        <transition name="fade">
          <div v-if="scrolled >= 2.6 && scrolled <= 3.7">
            <p>
              无声电影 即没有对白的电影 但是会有现场的乐队 讲解员 给观众带来更好的体验。 无声电影 即没有对白的电影
              但是会有现场的乐队 讲解员 给观众带来更好的体验无声电影 即没有对白的电影 但是会有现场的乐队 讲解员
              给观众带来更好的体验无声电影 即没有对白的电影 但是会有现场的乐队 讲解员 给观众带来更好的体验无声电影
              即没有对白的电影 但是会有现场的乐队 讲解员 给观众带来更好的体验
            </p>
            <ClassicButton
              :title="showDetail[1] ? '返回视频' : '了解更多'"
              @click="showDetail[1] = !showDetail[1]"
            ></ClassicButton>
          </div>
        </transition>
      </div>
      <transition name="fade">
        <div class="right" style="width: 18%; justify-content: flex-start" v-if="scrolled >= 2.3 && scrolled <= 3.7">
          <h2 class="vertical">无声电影</h2>
        </div>
      </transition>
    </div>
    <FilmRoll id="roll2" :style="{ transform: showGame[0] ? 'translate(-60px, -50px)' : 'rotate(10deg)' }">
      <section id="roll-content-7"></section>
      <section id="roll-content-8"></section>
      <section id="roll-content-9"></section>
      <section id="roll-content-10"></section>
      <section id="roll-content-11"></section>
      <section id="roll-content-12"></section>
      <section id="roll-content-13"></section>
    </FilmRoll>
    <div class="screen" ref="s4">
      <transition name="fade">
        <div v-if="scrolled >= 3.3" class="transition">
          <img src="./assets/img/projector2.png" id="proj2" />
        </div>
      </transition>
      <div class="left" style="justify-content: flex-end; width: 60%">
        <h3>电影的第一次变革</h3>
        <h2>有声电影</h2>
        <p>
          电影从无声到有声，经历了一个巨大的转变过程。
          早期的有声电影是用放映机和留声机同时工作来发声的，1926年8月6日，世界第一部有声短片《唐璜》使用
          “维他风”Vitaphone唱片重放影片音乐。
          1927年华纳推出《爵士歌王》，不仅有音乐，还加入了一部分对白，被看作是电影史上第一部有声片。
        </p>
        <div class="dual-btn">
          <ClassicButton
            :title="showDetail[2] ? '返回视频' : '了解更多'"
            @click="showDetail[2] = !showDetail[2]"
          ></ClassicButton>
          <ClassicButton
            :title="showGame[0] ? '返回视频' : '体验一下'"
            @click="showGame[0] = !showGame[0]"
          ></ClassicButton>
        </div>
      </div>
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
      videoStyle1: {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        rotate: 0,
        left: -3.75,
        top: 0,
        borderWidth: 0,
        placeholderHeight: 0,
      },
      deltaSum: 0,
      scrolled: 0,
      scrollLock: true,
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
    handleScroll(e) {
      if (e.deltaY <= 0 || this.scrolled > 1) {
        return;
      }
      let delta = e.deltaY / this.clientHeight;
      this.deltaSum += delta;
      if (this.deltaSum >= 1) {
        this.scrolled = 1;
        this.deltaSum = 1;
        this.scrollLock = false;
      } else {
        this.scrolled = this.curve(this.deltaSum);
        e.preventDefault();
      }
      this.videoStyle1.left = -3.75 + 20 * this.scrolled;
      let clientWidth = document.documentElement.clientWidth;
      this.videoStyle1.width = clientWidth - (clientWidth - 675) * this.scrolled;
      this.videoStyle1.height = this.clientHeight - (this.clientHeight - 500) * this.scrolled;
      this.videoStyle1.rotate = -10 * this.scrolled;
      this.videoStyle1.borderWidth = Math.min(this.scrolled * 64, 32);
      this.videoStyle1.placeholderHeight = (this.scrolled * (this.clientHeight - 530)) / 2;
    },
    curve(x) {
      // return x < 0.5 ? 4 * Math.pow(x, 3) : 1 - Math.pow(-2 * x + 2, 3) / 2;
      return x;
    },
  },
};
</script>

<style lang="scss">
@import url(./assets/css/font.css);
@import url(./assets/css/theme.css);
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

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.5s ease-out;
}

.fade-leave-active {
  transition: all 0.5s ease-in;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.main-container {
  width: 100%;
  min-height: 500vh;
  box-sizing: border-box;
  position: relative;
  background-image: url(./assets/img/bg.jpg);
  background-size: 100%;
  background-position: center top;

  .full-screen {
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 9000;
  }

  #wheel {
    position: fixed;
    left: -185px;
    top: -185px;
    z-index: 1000;
    transition: left ease-out 0.7s, top ease-out 0.7s;

    &.hidden {
      left: -700px;
      top: -700px;
    }
  }

  #roll1 {
    left: 260px;
    width: 675px;
    height: auto;
    transform: rotate(-10deg);
    transform-origin: top left;
    position: absolute;
    z-index: 100;

    span.des {
      opacity: 0.85;
      font-size: 18px;
    }

    video,
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    #roll-content-1 {
      position: relative;
      font-family: AaMSXK;
      font-size: 100px;
      background-color: #000;

      video {
        animation: fadeIn ease 1s;
        animation-fill-mode: both;
        animation-delay: 0.5s;
      }
    }

    #roll-content-4,
    #roll-content-6 {
      align-items: flex-start;
      padding: 20px;
    }

    #roll-content-6 {
      border-bottom: none;
      height: 250px;
    }
  }

  #roll2 {
    position: absolute;
    top: 320vh;
    right: 72px;
    width: 675px;
    height: auto;
    transform: rotate(10deg);
    transform-origin: top right;
    z-index: 100;
    transition: transform ease 0.5s;

    #roll-content-7 {
      height: 150px;
    }

    #roll-content-13 {
      border-bottom: none;
    }
  }

  .screen {
    position: relative;
    width: 100%;
    height: 100vh;
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
      // &::first-letter {
      //   float: left;
      //   font-size: 2em;
      //   margin-right: 8px;
      // }
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
