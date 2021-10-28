<template>
  <div class="main-container" ref="main">
    <ProgressIndicator id="wheel"></ProgressIndicator>
    <FilmRoll
      id="roll1"
      :style="{
        width: videoStyle1.width + 'px',
        left: videoStyle1.left + 'px',
        transform: 'rotate(' + videoStyle1.rotate + 'deg)',
      }"
      @mousewheel="handleScroll($event)"
    >
      <div
        :style="{
          height: (scrolled * 250) / 1000 + 'px',
          borderBottomWidth: scrolled > 250 ? '3.125rem' : '0',
        }"
      ></div>
      <div id="roll-content-1" :style="{ height: videoStyle1.height + 'px' }">
        <video src="./assets/video/1.mp4" muted autoplay></video>
      </div>
      <div id="roll-content-2"></div>
      <div id="roll-content-3"></div>
      <div id="roll-content-4"></div>
      <div id="roll-content-5"></div>
    </FilmRoll>
  </div>
</template>

<script>
import ProgressIndicator from "./components/ProgressIndicator.vue";
import FilmRoll from "./components/FilmRoll.vue";

export default {
  name: "App",
  components: {
    ProgressIndicator,
    FilmRoll,
  },
  data() {
    return {
      videoStyle1: {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        rotate: 0,
        left: 0,
        top: 0,
      },
      scrolled: 0,
    };
  },
  mounted() {
    window.addEventListener("scroll", () => {
      console.log(window.scrollY);
    });
  },
  methods: {
    handleScroll(e) {
      console.log(e.deltaY);
      const basis = 1000;
      if (e.deltaY <= 0) {
        return;
      }
      if (this.scrolled + e.deltaY >= basis) {
        this.scrolled = basis;
      } else {
        this.scrolled += e.deltaY;
        e.preventDefault();
      }
      this.videoStyle1.left = (260 * this.scrolled) / basis;
      let clientWidth = document.documentElement.clientWidth;
      let clientHeight = document.documentElement.clientHeight;
      this.videoStyle1.width =
        clientWidth - ((clientWidth - 675) * this.scrolled) / basis;
      this.videoStyle1.height =
        clientHeight - ((clientHeight - 500) * this.scrolled) / basis;
      this.videoStyle1.rotate = -(10 * this.scrolled) / basis;
      console.log(this.scrolled, this.videoStyle1);
    },
  },
};
</script>

<style lang="scss">
@import url(./assets/css/font.css);
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
  }

  #roll1 {
    width: 675px;
    height: auto;
    transform: rotate(-10deg);
    transform-origin: top left;
    position: absolute;
    left: 260px;

    #roll-content-1 {
      font-family: AaMSXK;
      font-size: 100px;

      video {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>
