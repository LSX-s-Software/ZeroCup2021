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
      <img src="@img/bg.jpg" alt="" class="bg" />
    </div>
    <div class="blackbg" :class="{ show: scrolled >= 7 }"></div>
    <div class="screen" id="s0">
      <video src="@video/1.mp4" autoplay muted playsinline @pause="videoPlaying = false"></video>
      <img src="@img/title.jpg" alt="" v-if="!videoPlaying" id="title" />
      <transition>
        <div class="prompt" v-if="!videoPlaying">
          <span>向下滑动来了解</span>
          <img src="@img/down.svg" />
        </div>
      </transition>
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
        <div class="rotate" v-if="!s3rollStyle.fixed">
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
        <!-- 可移动的部分 -->
        <div
          v-else
          class="rotate"
          @mousewheel="animations4($event)"
          :style="{
            position: s3rollStyle.fixed ? 'fixed' : 'relative',
            left: s3rollStyle.left + 'px',
            top: s3rollStyle.top + 'px',
            width: s3rollStyle.fixed ? 'unset' : '100%',
            transform: `translateY(${s3rollStyle.translateY}%) rotate(${s3rollStyle.rotate}deg) scale(${s3rollStyle.scale})`,
            transformOrigin: s3rollStyle.fixed ? 'center center' : '',
          }"
        >
          <FilmRoll
            :sIndex="2"
            :items="['s3_v0', 's3_v1']"
            :dualContent="true"
            :extraItems="['s3_v0', 's3_v1']"
            :clip="clip"
            :width="s3rollStyle.width"
            :height="s3rollStyle.height"
            :outer-width="s3rollStyle.outerWidth"
            :innerTranslate="s3rollStyle.innerTranslate"
            :style="{ transform: 'translateX(' + s3rollStyle.translateX + 'px)' }"
            @slideChange="handleSlideChange($event)"
          ></FilmRoll>
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
    <div
      class="screen"
      id="s4"
      @mousewheel="animations4($event)"
      :style="{ position: scrolled <= 6 ? 'sticky' : '', paddingBottom: Math.min(scrolled - 4, 1) * 75 + 'px' }"
    >
      <h3>第二次变革</h3>
      <h2 :class="{ gray: wheelDelta <= this.screenHeight * 0.95 }">黑白到彩色</h2>
    </div>
    <div class="screen" id="s5" :style="{ position: scrolled <= 6 ? 'sticky' : '' }">
      <div class="left">
        <h3 :style="{ color: scrolled <= 5.5 ? '' : 'var(--darkText)' }">第一阶段</h3>
        <p>
          第一阶段：手工上色，和将胶卷泡到染料里整体上色。第一阶段：手工上色，和将胶卷泡到染料里整体上色。第一阶段：手工上色，和将胶卷泡到染料里整体上色。第一阶段：手工上色，和将胶卷泡到染料里整体上色。第一阶段：手工上色，和将胶卷泡到染料里整体上色。第一阶段：手工上色，和将胶卷泡到染料里整体上色。
        </p>
        <ClassicButton @click="showDetail[3] = !showDetail[3]">{{
          showDetail[3] ? "返回视频" : "查看更多"
        }}</ClassicButton>
      </div>
      <div class="placeholder"></div>
      <div class="right"></div>
    </div>
    <div class="screen" id="s6" :style="{ position: scrolled <= 6 ? 'sticky' : '' }">
      <div class="left" :style="{ opacity: scrolled <= 6 ? 0 : 1 }">
        <h3 style="color: var(--darkText)">第一阶段</h3>
        <p>
          第一阶段：手工上色，和将胶卷泡到染料里整体上色。第一阶段：手工上色，和将胶卷泡到染料里整体上色。第一阶段：手工上色，和将胶卷泡到染料里整体上色。第一阶段：手工上色，和将胶卷泡到染料里整体上色。第一阶段：手工上色，和将胶卷泡到染料里整体上色。第一阶段：手工上色，和将胶卷泡到染料里整体上色。
        </p>
        <ClassicButton @click="showDetail[3] = !showDetail[3]">{{
          showDetail[3] ? "返回视频" : "查看更多"
        }}</ClassicButton>
      </div>
      <div class="placeholder" :style="{ opacity: scrolled <= 6 ? 0 : 1 }">
        <h3>第二次变革</h3>
        <h2>黑白到彩色</h2>
      </div>
      <div class="right">
        <h3>第二阶段</h3>
        <p>
          第一阶段：手工上色，和将胶卷泡到染料里整体上色。第一阶段：手工上色，和将胶卷泡到染料里整体上色。第一阶段：手工上色，和将胶卷泡到染料里整体上色。第一阶段：手工上色，和将胶卷泡到染料里整体上色。第一阶段：手工上色，和将胶卷泡到染料里整体上色。第一阶段：手工上色，和将胶卷泡到染料里整体上色。
        </p>
        <ClassicButton @click="showDetail[4] = !showDetail[4]">{{
          showDetail[4] ? "返回视频" : "查看更多"
        }}</ClassicButton>
      </div>
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
        <div class="content">
          <!-- 在这里写第二个游戏 -->
          <div class="controls" v-if="showDetail[5] == 2">
            <img src="@img/video.png" alt="" />
            <img src="@img/ps.png" alt="" />
          </div>
        </div>
      </div>
      <div class="right compact">
        <input type="radio" name="digitech" id="projection" value="0" v-model="showDetail[5]" checked />
        <label for="projection">数字放映技术</label>
        <div v-if="showDetail[5] == 0">
          <p>
            索尼公司在1980年代开始推广“电子电影摄影“的概念，这项工作收效甚微。但这早就了最早的高清视频拍摄故事片之一——Julia和Julia(1987)。
          </p>
          <p>
            《彩虹》(1996)是世界上第一部使用广泛数字后期制作技术的电影。它完全使用索尼的首台电子电影摄像机拍摄，并具有超过35分钟的数字图像处理和视觉效果，所有后期制作、音效和编辑都以数字方式完成，最后通过电子束记录仪将数字高清图像传输到35mm胶片中进行播放。
          </p>
          <p>
            《最后的广播》(1998)被认为是第一个完全在消费级数字设备上进行拍摄和编辑的电影，而且它被传输到5个美国城市的电影院并首次使用了“国际数字放映机”公司DPI制造的DLP数字电影放映机进行了放映，成为首部进行数字播放的电影之一，开拓了一条胶片拷贝以外的电影播映方式。
          </p>
        </div>
        <input type="radio" name="digitech" id="cg" value="1" v-model="showDetail[5]" />
        <label for="cg">计算机生成影像</label>
        <div v-if="showDetail[5] == 1">
          <p>
            计算机生成影像技术是完全由计算机创造出影像的计算机生成图像技术，简称CGI，即利用计算机软件创造出模拟真实场景的三维空间或电影虚拟人物，也可以对真实拍摄到的空间环境进行改进、描绘。这一技术是数字化的代表。
          </p>
          <p>
            世界上第一部完全用计算机动画制作的电影《玩具总动员》突破了数字技术在电影业中的运用限制，给电影制作开辟了一条全新的道路。2010年的《阿凡达》让我们感受到了CG在质上的飞跃。如今影视特效、3D动画制作与3D游戏制作已成为CG领域发展的前沿。
          </p>
        </div>
        <input type="radio" name="digitech" id="processing" value="2" v-model="showDetail[5]" />
        <label for="processing">数字影像处理</label>
        <div v-if="showDetail[5] == 2">
          <p>
            数字影像合成技术，是指将两个或更多的影像利用计算机图形图像学原理和方法进行叠加或组合处理，是目前拍摄数字化电影最重要的后期制作方法。
          </p>
          <p>
            蓝幕和绿幕技术就是其中的代表。演员在蓝幕、绿幕前表演，由摄影机拍摄下来，画面在电脑中处理，处理掉背景的蓝色或绿色，换上其他背景。
          </p>
          <p style="color: var(--lightGray); font-size: 20px">
            <svg
              t="1632058305684"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="5211"
              width="16"
              height="16"
              style="transform: rotate(180deg)"
            >
              <path
                d="M686 593.3s-372.6 0.1-541.8 0.1c-44.3 0-80.2-36-80.2-80.2 0-44.3 35.9-80.2 80.2-80.2 141.9 0 541.5-0.1 541.5-0.1S658.8 405.8 535.1 282c-31.4-31.3-31.4-82.1 0-113.5s82.2-31.4 113.5 0l288 288c31.3 31.4 31.3 82.1 0 113.5 0 0-161.9 161.9-285.6 285.7-31.4 31.4-82.1 31.4-113.5 0-31.4-31.4-31.4-82.1 0-113.5C637.8 641.7 686 593.3 686 593.3z"
                p-id="5212"
                fill="var(--lightGray)"
              ></path>
            </svg>
            点击Dock栏右侧的图标体验一下
          </p>
        </div>
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
// import ModernButton from "./components/ModernButton.vue";

export default {
  name: "App",
  components: {
    ProgressIndicator,
    FilmRoll,
    ClassicButton,
    // ModernButton,
  },
  data() {
    return {
      scrolled: 0,
      scrollLock: false,
      wheelDelta: 0,
      clip: 0,
      videoPlaying: true,
      screenHeight: document.documentElement.clientHeight,
      screenWidth: document.documentElement.clientWidth,
      showDetail: [false, false, false, false, false, 0],
      swiperIndex: [0, 0, 0, 0],
      showGame: [false, false],
      description: require("./assets/description.json"),
      s3rollStyle: {
        fixed: false,
        left: 0,
        top: 0,
        width: 600,
        outerWidth: 1000,
        height: 450,
        translateX: -120,
        translateY: 10,
        rotate: -10,
        innerTranslate: 50,
        scale: 1,
      },
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
      this.scrolled = window.scrollY / this.screenHeight;
    });
  },
  methods: {
    handleResize() {
      this.screenHeight = document.documentElement.clientHeight;
      this.screenWidth = document.documentElement.clientWidth;
    },
    handleSlideChange(e) {
      console.log(e);
      this.swiperIndex[e.sIndex] = e.activeIndex;
    },
    handleScroll(scrolled) {
      let flowTexts = document.querySelectorAll(".flow-text");
      if (scrolled <= 3) {
        if (this.s3rollStyle.fixed) {
          this.s3rollStyle = {
            fixed: false,
            left: 0,
            top: 180,
            width: 600,
            outerWidth: 1000,
            height: 450,
            translateX: -120,
            translateY: 10,
            rotate: -10,
            innerTranslate: 50,
            scale: 1,
          };
        }
      } else if (scrolled <= 8) {
        if (scrolled >= 4 && this.wheelDelta <= this.screenHeight) {
          this.scrollLock = true;
          this.wheelDelta = 0;
          this.clip = 0;
        }
        this.animations3();
      } else if (scrolled > 8) {
        let i = 1;
        for (let flowText of flowTexts) {
          flowText.style.animationName = `getin${i}`;
          i++;
        }
      }
    },
    animations3() {
      if (this.scrolled <= 6) {
        let percent1 = this.scrolled >= 4 ? 1 : this.scrolled - 3;
        let percent2 = Math.max(0, Math.min(this.scrolled - 4, 1));
        this.s3rollStyle = {
          outerWidth: 1000 + 200 * percent1,
          left: ((this.screenWidth - 1200) / 2) * percent1,
          top: 180 - 105 * percent1,
          width: 600 + 360 * percent1,
          height: 450 + 270 * percent1,
          rotate: -10 + 10 * percent1,
          fixed: true,
          translateX: -120 + 120 * percent1,
          translateY: -10 + 10 * percent1,
          innerTranslate: 50 - 50 * percent1,
          scale: 1 - 0.2 * percent2,
        };
      } else if (this.scrolled <= 7) {
        this.s3rollStyle.top = 75 - (window.scrollY - this.screenHeight * 6);
      }
    },
    animations4(e) {
      if (this.scrollLock) {
        e.preventDefault();
        this.wheelDelta += e.deltaY;
        let percent = this.wheelDelta / this.screenHeight;
        console.log(percent);
        this.clip = percent / 0.95;
        if (percent < 0 || percent >= 1) {
          this.scrollLock = false;
          if (percent < 0) {
            this.clip = 0;
          }
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
        z-index: 10;
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
      video,
      #title {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
        object-fit: cover;
      }
      #title {
        z-index: 10;
      }
      .prompt {
        position: absolute;
        margin: 1rem 0;
        bottom: 0;
        font-size: 1rem;
        text-align: center;
        // display: none;
        left: 50%;
        transform: translateX(-50%);
        z-index: 100;
        display: flex;
        flex-direction: column;
        align-items: center;
        animation: move ease 6s infinite;

        span {
          color: var(--lightText);
          margin: 0.5rem;
          font-size: 0.9rem;
          letter-spacing: 2px;
        }

        img {
          width: 5.75rem;
        }

        @keyframes move {
          10%,
          50% {
            bottom: 0px;
            opacity: 1;
          }
          85% {
            bottom: 50px;
            opacity: 0;
          }
          100% {
            bottom: 0px;
            opacity: 0;
          }
        }
      }
    }

    &#s4 {
      top: 0;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;

      h2 {
        transition: color linear 0.3s;
      }
    }

    &#s5,
    &#s6 {
      // position: sticky;
      top: 0;
      .placeholder {
        width: 960px; /*no*/
        padding-bottom: 75px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
      }
      .left,
      .right {
        flex: 1;
        align-items: center;
        h3 {
          font-size: 40px;
          color: var(--theme);
          font-family: HYZhuZiSuDaHeiW;
          transition: color linear 0.3s;
        }
      }
      .left {
        padding: 0 32px 0 0;
      }
      .right {
        padding: 0 0 0 32px;
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
        & > img {
          position: absolute;
          right: 0;
          bottom: 0;
          height: 83.33%;
        }
        .content {
          position: absolute;
          right: 0.9%;
          top: 18.15%;
          width: 87%;
          height: 61.6%;
          background: linear-gradient(to left, #8a2387, #e94057, #f27121);
          .controls {
            position: absolute;
            bottom: 12px;
            padding: 12px 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: rgba(242, 242, 242, 0.4);
            border-radius: 20px;
            backdrop-filter: blur(20px); /*no*/
            -webkit-backdrop-filter: blur(20px); /*no*/
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            gap: 32px;
            opacity: 0;
            transition: opacity ease-out 0.3s;
            img {
              width: 32px;
              height: 32px;
              object-fit: contain;
              cursor: pointer;
            }
          }
          &:hover .controls {
            opacity: 1;
          }
        }
      }
      .right {
        flex: 1;
        padding: 0 60px;
        align-items: center;

        div {
          margin-top: 20px;
          p {
            font-size: 24px;
            line-height: 33px;
          }
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
