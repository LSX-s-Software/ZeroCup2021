<template>
  <div class="main-container" ref="main" @resize="handleResize">
    <ProgressIndicator id="wheel" :class="{ hidden: scrolled < 1 }"></ProgressIndicator>
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
          borderBottomWidth: videoStyle1.borderWidth + 'rem',
        }"
      ></section>
      <section id="roll-content-1" :style="{ height: videoStyle1.height + 'px' }">
        <video src="./assets/video/1.mp4" muted autoplay></video>
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
      <section id="roll-content-5"></section>
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
        <div class="right" style="width: 20%; justify-content: center" v-if="scrolled >= 1.8 && scrolled <= 2.7">
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
      videoStyle1: {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        rotate: 0,
        left: -3.75,
        top: 0,
        borderWidth: 0,
        placeholderHeight: 0,
      },
      scrolled: 0,
      scrollLock: true,
      clientHeight: document.documentElement.clientHeight,
      showDetail: [false, false, false, false],
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
    handleScroll(e) {
      if (e.deltaY <= 0 || this.scrolled > 1) {
        return;
      }
      let delta = e.deltaY / this.clientHeight;
      if (this.scrolled + delta >= 1) {
        this.scrolled = 1;
        this.scrollLock = false;
      } else {
        this.scrolled += delta;
        e.preventDefault();
      }
      this.videoStyle1.left = -3.75 + 20 * this.scrolled;
      let clientWidth = document.documentElement.clientWidth;
      this.videoStyle1.width = clientWidth - (clientWidth - 675) * this.scrolled;
      this.videoStyle1.height = this.clientHeight - (this.clientHeight - 500) * this.scrolled;
      this.videoStyle1.rotate = -10 * this.scrolled;
      this.videoStyle1.borderWidth = Math.min(this.scrolled * 5, 2.5);
      this.videoStyle1.placeholderHeight = (this.scrolled * (this.clientHeight - 530)) / 2;
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
    transition: all ease-out 0.7s;

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

    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      background-color: #fff;
    }

    #roll-content-1 {
      font-family: AaMSXK;
      font-size: 100px;
    }

    #roll-content-4 {
      align-items: flex-start;
      padding: 20px;
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
    }

    h2 {
      font-size: 52px;
      font-weight: 500;
      margin: 0.8em 0;
      color: var(--theme);
    }

    p {
      font-size: 30px;
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
  }
}
</style>
