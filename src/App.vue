<template>
  <div class="main-container" ref="main">
    <ProgressIndicator
      id="wheel"
      :class="{ hidden: scrolled < 1 || scrolled > 7 }"
      :current="scrolled - 1"
    ></ProgressIndicator>
    <div class="bg-container">
      <img src="@img/bg.jpg" alt="" class="bg" />
      <img src="@img/bg.jpg" alt="" class="bg" />
    </div>
    <div class="blackbg" :class="{ show: scrolled >= 7 }"></div>
    <div class="screen" id="s0">
      <video src="@video/1.mp4" autoplay muted playsinline @pause="videoPlaying = false"></video>
      <img src="@img/title.jpg" alt="" v-if="!videoPlaying" />
    </div>
    <div class="screen" id="s1" ref="screen" @resize="handleResize">
      <div class="left hidable" :class="{ hidden: showDetail[0] }">
        <FilmRoll
          :sIndex="0"
          :items="['s1_v0', 's1_v1', 's1_v2', 's1_v3']"
          :width="600"
          :outer-width="900"
          style="transform: translateX(-120px)"
          @slideChange="handleSlideChange($event)"
        ></FilmRoll>
        <span class="des" :class="{ hidden: showDetail[0] }">
          {{ description[`s1_v${swiperIndex[0]}`] || "缺少介绍" }}
        </span>
      </div>
      <div class="right">
        <h2 class="gray">电影的诞生</h2>
        <p>
          早在1829年，比利时著名物理学家约瑟夫普拉多发现：当一个物体在人的眼前消失后，该物体的形象还会在人的视网膜上滞留一段时间，这一发现，被称之为“视象暂留原理”。普拉多根据此原理于1832年发明了“诡盘”。“诡盘”能使被描画在锯齿形的硬纸盘上的画片因运动而活动起来，而且能使视觉上产生的活动画面分解为各种不同的形象。“诡盘”的出现，标志着电影的发明进入到了科学实验阶段。1834年，美国人霍尔纳的“活动视盘”试验成功；1853年，奥地利的冯乌却梯奥斯将军在上述的发明基础上，运用幻灯，放映了原始的动画片。
        </p>
        <ClassicButton @click="showDetail[0] = !showDetail[0]">{{
          showDetail[0] ? "返回视频" : "查看更多"
        }}</ClassicButton>
      </div>
      <div class="transition" style="bottom: 0; right: 60px">
        <img src="@img/projector1.png" alt="" id="proj1" />
      </div>
    </div>
    <div class="screen" id="s2" style="overflow-x: hidden">
      <div class="left">
        <h2 class="gray">无声电影</h2>
        <p>
          无声电影（或称默片）是没有任何配音、配乐或与画面协调的声音的电影。默片技术发明于1860年左近，但在1880至1900年期间，当单卷电影的制作已经变得容易时，默片仍然算是新奇的东西。把电影影像与声音配合的想法，几乎是与电影本身俱生的；但由于技术上的困难，在1920年代末以前，大部分电影都是默片。可是默片的影像等同共通的语言；默片年代，亦被称为“银幕年代”。
        </p>
        <ClassicButton @click="showDetail[1] = !showDetail[1]">{{
          showDetail[1] ? "返回视频" : "查看更多"
        }}</ClassicButton>
      </div>
      <div class="right hidable" :class="{ hidden: showDetail[1] }">
        <div class="rotate">
          <FilmRoll
            :sIndex="1"
            :items="['s2_v0']"
            :width="600"
            :outer-width="1000"
            :innerTranslate="-90"
            style="transform: translateX(-140px)"
            @slideChange="handleSlideChange($event)"
          ></FilmRoll>
          <span class="des" :class="{ hidden: showDetail[1] }">
            {{ description[`s2_v${swiperIndex[1]}`] || "缺少介绍" }}
          </span>
        </div>
      </div>
    </div>
    <div class="screen" id="s3">
      <div class="left hidable" :class="{ hidden: showDetail[2] }">
        <div class="rotate">
          <FilmRoll
            :sIndex="2"
            :items="['s3_v0', 's3_v1']"
            :width="600"
            :outer-width="1000"
            style="transform: translateX(-120px)"
            @slideChange="handleSlideChange($event)"
          ></FilmRoll>
          <span class="des" :class="{ hidden: showDetail[2] }">
            {{ description[`s3_v${swiperIndex[2]}`] || "缺少介绍" }}
          </span>
        </div>
      </div>
      <div class="right">
        <h3>第一次变革</h3>
        <h2 class="gray">有声电影</h2>
        <p>
          电影从无声到有声，经历了一个巨大的转变过程。
          早期的有声电影是用放映机和留声机同时工作来发声的，1926年8月6日，世界第一部有声短片《唐璜》使用
          “维他风”Vitaphone唱片重放影片音乐。
          1927年华纳推出《爵士歌王》，不仅有音乐，还加入了一部分对白，被看作是电影史上第一部有声片。
        </p>
        <ClassicButton @click="showDetail[2] = !showDetail[2]">{{
          showDetail[2] ? "返回视频" : "查看更多"
        }}</ClassicButton>
      </div>
      <div class="transition" style="top: 0; left: 50px">
        <img src="@img/projector2.png" alt="" id="proj2" />
      </div>
    </div>
    <div class="screen" id="s4">
      <div class="left">
        <FilmRoll
          :sIndex="3"
          :items="['s3_v0']"
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
    <div class="screen modern" id="s7" :style="{ position: scrolled >= 8 ? 'relative' : 'sticky' }">
      <div>
        <h3 :style="{ color: scrolled >= 7 ? 'var(--lightText)' : 'var(--darkText)' }">第三次变革</h3>
        <h2>数字化</h2>
      </div>
    </div>
    <div class="screen modern" id="s8">
      <div class="left compact">
        <img src="@img/computer.png" alt="" />
        <div class="content">这里可以加内容</div>
      </div>
      <div class="right compact">
        <input type="radio" name="digitech" id="projection" value="0" v-model="showDetail[4]" checked />
        <label for="projection">数字放映技术</label>
        <p v-if="showDetail[4] == 0">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae animi voluptatem voluptate inventore quod harum
          voluptatibus enim illo, saepe quaerat perferendis quas beatae delectus corporis in quae. Culpa, voluptatum
          ipsum.
        </p>
        <input type="radio" name="digitech" id="cg" value="1" v-model="showDetail[4]" />
        <label for="cg">计算机图形</label>
        <p v-if="showDetail[4] == 1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae animi voluptatem voluptate inventore quod harum
          voluptatibus enim illo, saepe quaerat perferendis quas beatae delectus corporis in quae. Culpa, voluptatum
          ipsum.
        </p>
        <input type="radio" name="digitech" id="processing" value="2" v-model="showDetail[4]" />
        <label for="processing">数字图像处理</label>
        <p v-if="showDetail[4] == 2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae animi voluptatem voluptate inventore quod harum
          voluptatibus enim illo, saepe quaerat perferendis quas beatae delectus corporis in quae. Culpa, voluptatum
          ipsum.
        </p>
      </div>
    </div>
    <div class="screen modern" id="s9" @mousewheel="animations9($event)">
      <h2>What's Next?</h2>
      <h2 class="flip">电影技术的发展不断提高电影的观感</h2>
      <span ref="flowText" class="flow-text ft-1">杜比影院</span>
      <span ref="flowText" class="flow-text ft-2">8K</span>
      <span ref="flowText" class="flow-text ft-3">4D</span>
      <span ref="flowText" class="flow-text ft-4">杜比全景声</span>
      <span ref="flowText" class="flow-text ft-5">120FPS</span>
      <span ref="flowText" class="flow-text ft-6">IMAX</span>
      <span ref="flowText" class="flow-text ft-7">球幕</span>
      <span ref="flowText" class="flow-text ft-8">4K</span>
      <span ref="flowText" class="flow-text ft-9">巨幕</span>
      <span ref="flowText" class="flow-text ft-10">3D</span>
    </div>
    <div class="screen"></div>
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
      screenHeight: document.documentElement.clientHeight,
      showDetail: [false, false, false, false, 0],
      swiperIndex: [0, 0, 0, 0],
      showGame: [false, false],
      description: require("./assets/description.json"),
    };
  },
  watch: {
    scrolled(newVal) {
      console.log(newVal);
      this.handleScroll(newVal);
    },
  },
  mounted() {
    window.addEventListener("scroll", () => {
      if (!this.scrollLock) {
        this.scrolled = window.scrollY / this.screenHeight;
      }
    });
  },
  methods: {
    handleResize() {
      this.screenHeight = document.documentElement.clientHeight;
    },
    handleSlideChange(e) {
      console.log(e);
      this.swiperIndex[e.sIndex] = e.activeIndex;
    },
    handleScroll(scrolled) {
      let flowTexts = document.querySelectorAll(".flow-text");
      if (scrolled > 8) {
        let i = 1;
        for (let flowText of flowTexts) {
          flowText.style.animationName = `getin${i}`;
          i++;
        }
      }
    },
    animations9(e) {
      if (this.scrollLock) {
        e.preventDefault();
      } else {
        if (this.scrolled == 9) {
          //使用这种方法来禁用滚动
          // this.scrollLock = true;
        }
      }
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
    z-index: -1;

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
    width: 100%;
    height: 100vh;
    z-index: -1;
    transition: background-color linear 1s;

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
    height: 100vh;
    max-height: 1000px;
    min-height: 768px;
    box-sizing: border-box;
    border: 1px solid aqua; // 仅供定位使用
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    padding: 0 60px;
    font-family: AaMSXK;

    .left {
      padding-left: 60px;

      .rotate {
        width: 100%;
        transform: translateY(10%) rotate(-10deg);
        transform-origin: left bottom;
      }
    }
    .right {
      padding-right: 60px;

      .rotate {
        width: 100%;
        transform: translateY(10%) rotate(6deg);
        transform-origin: right bottom;
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
      margin-top: -14px;
      margin-bottom: 12px;
      line-height: 1.5;
      color: var(--theme);
      &.gray {
        color: var(--darkText);
      }
    }

    h3 {
      font-family: AaMSXK;
      font-size: 24px;
      color: var(--lightGray);
    }

    p {
      font-family: inherit;
      font-size: 32px;
      line-height: 42px;
      text-align: left;
    }

    .des {
      display: block;
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
      z-index: 0;
      img {
        transform: translateY(-50%);
      }

      #proj1 {
        width: 9vw;
        transform: translateY(30%) rotate(10deg);
      }

      #proj2 {
        width: 14vw;
        transform: translateY(-60%) rotate(-18deg);
      }
    }

    &.modern {
      font-family: PangMenZhengDao;
      color: var(--lightText);
      h2 {
        font-family: inherit;
      }
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
      overflow: hidden;
      video {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
        object-fit: cover;
      }
      h1 {
        z-index: 10;
        color: #fff;
      }
    }

    &#s7 {
      position: sticky;
      top: 0;
      h2 {
        font-size: 150px;
        line-height: 150px;
      }
      h3 {
        transition: color linear 0.5s;
      }
    }

    &#s8 {
      padding: 0;
      .left {
        position: relative;
        width: 126.27vh;
        max-width: unset;
        img {
          position: absolute;
          right: 0;
          bottom: 0;
          height: 90%;
        }
        .content {
          position: absolute;
          right: 0.9%;
          top: 11.5%;
          width: 86.5%;
          height: 66.8%;
          background-color: var(--darkBG);
        }
      }
      .right {
        flex: 1;
        padding: 0 60px;
        align-items: center;

        p {
          margin-top: 20px;
          font-size: 24px;
          line-height: 33px;
        }
      }

      input[type="radio"] {
        display: none;
      }

      label {
        display: block;
        width: 250px;
        height: 70px;
        background: var(--darkGray);
        border-radius: 35px;
        font-size: 30px;
        line-height: 70px;
        white-space: nowrap;
        margin-top: 20px;
        cursor: pointer;
      }

      input[type="radio"]:checked + label {
        background: var(--mediumGray);
        color: var(--theme);
      }
    }

    &#s9 {
      flex-direction: column;
      align-items: center;
      justify-content: center;
      h2 {
        font-size: 80px;
        line-height: 100px;
        color: var(--lightText);
      }
      .flip {
        background: #fff;
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
      }
      .flow-text {
        position: absolute;
        font-family: SourceHanSansCN;
        font-weight: 200;
        opacity: 0;
        transform: scale(0);
        animation-timing-function: ease-out;
        animation-duration: 10s;
        animation-fill-mode: both;
        z-index: 0;
      }
      .ft-1 {
        top: 50%;
        left: 50%;
        color: #9f9f9f;
        line-height: 150px;
        font-size: 88px;
        filter: blur(1px);
      }
      .ft-2 {
        bottom: 50%;
        left: 50%;
        font-size: 36px;
        line-height: 61px;
        color: var(--lightGray);
        filter: blur(2px);
      }
      .ft-3 {
        top: 50%;
        left: 50%;
        font-size: 64px;
        line-height: 109px;
        color: var(--lightGray);
        filter: blur(1.5px);
      }
      .ft-4 {
        bottom: 50%;
        left: 50%;
        font-size: 32px;
        line-height: 109px;
        color: var(--lightGray);
        filter: blur(1.5px);
      }
      .ft-5 {
        top: 50%;
        left: 50%;
        font-size: 72px;
        line-height: 109px;
        color: var(--lightGray);
        filter: blur(1.5px);
      }
      .ft-6 {
        bottom: 50%;
        left: 50%;
        font-size: 72px;
        line-height: 109px;
        color: var(--lightGray);
        filter: blur(1.5px);
      }
      .ft-7 {
        bottom: 50%;
        right: 50%;
        font-size: 52px;
        line-height: 109px;
        color: var(--lightGray);
        filter: blur(2px);
      }
      .ft-8 {
        top: 50%;
        right: 50%;
        font-size: 52px;
        line-height: 109px;
        color: var(--lightGray);
        filter: blur(1px);
      }
      .ft-9 {
        bottom: 50%;
        right: 50%;
        font-size: 52px;
        line-height: 109px;
        color: var(--lightGray);
        filter: blur(1px);
      }
      .ft-10 {
        top: 50%;
        right: 50%;
        font-size: 128px;
        line-height: 109px;
        color: var(--lightGray);
        filter: blur(0.5px);
      }
    }
  }
}
@keyframes getin1 {
  to {
    top: 7vh;
    left: 6vw;
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes getin2 {
  to {
    bottom: 12vh;
    left: 17vw;
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes getin3 {
  to {
    top: 25vh;
    left: 30vw;
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes getin4 {
  to {
    bottom: 25vh;
    left: 28vw;
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes getin5 {
  to {
    top: 2vh;
    left: 45vw;
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes getin6 {
  to {
    bottom: 8vh;
    left: 45vw;
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes getin7 {
  to {
    bottom: 30vh;
    right: 35vw;
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes getin8 {
  to {
    top: 15vh;
    right: 30vw;
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes getin9 {
  to {
    bottom: 15vh;
    right: 20vw;
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes getin10 {
  to {
    top: 10vh;
    right: 10vw;
    opacity: 1;
    transform: scale(1);
  }
}
</style>
