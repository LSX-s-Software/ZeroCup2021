<template>
  <div class="container">
    <img src="@img/bg2.jpg" alt="" class="bg2" :style="{ opacity: Math.min(scrolled - 12, 1) * 0.2 }" />
    <p class="title">电影技术革新</p>
    <div
      id="c1"
      class="card bottom"
      :class="{ dark: curHoverId !== 'c1' && curHoverId !== '', hidden: curScrolled <= 0.28 }"
    >
      <TimelineButton class="button" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" @click="onClick">
        电影诞生
      </TimelineButton>
      <p class="content bottom left-translate">
        17世纪诞生的幻灯机，和18世纪流行的皮影戏，都受到人们的广泛追捧。直到1832年视觉暂留原理的发现，成为电影诞生的基础，1853年约瑟夫·普拉托发明的诡盘是电影的诞生前身。
      </p>
    </div>
    <div
      id="c2"
      class="card top"
      :class="{ dark: curHoverId !== 'c2' && curHoverId !== '', hidden: curScrolled <= 0.4 }"
    >
      <TimelineButton class="button" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" @click="onClick">
        无声电影
      </TimelineButton>
      <p class="content top">
        在前人技术的基础上，路易斯·李·普林斯在1888年制作了2.11秒的《朗德海花园场景》。1895年，卢米埃尔兄弟制作了影片《工厂大门》，标志着人类第一部电影的诞生。
      </p>
    </div>
    <div
      id="c3"
      class="card bottom"
      :class="{ dark: curHoverId !== 'c3' && curHoverId !== '', hidden: curScrolled <= 0.5 }"
    >
      <TimelineButton class="button" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" @click="onClick">
        有声电影
      </TimelineButton>
      <p class="content bottom">
        从1917年起，提出“拍摄歌曲”让歌手或乐队在电影放映现场伴唱，使让电影有了“声音”。1927年，艾伦·克罗斯兰导演的《爵士歌手》是第一部有台词的电影。
      </p>
    </div>
    <div
      id="c4"
      class="card top"
      :class="{ dark: curHoverId !== 'c4' && curHoverId !== '', hidden: curScrolled <= 0.6 }"
    >
      <TimelineButton class="button" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" @click="onClick">
        彩色电影
      </TimelineButton>
      <p class="content top" style="font-size: 28px; line-height: 1.3">
        人们对于彩色电影的探索几经波折。最初人们用传统的方法在人工为胶片一张张上色，如1902年诞生的《月球旅行记》。1908年，法国的贝尔通发明了透镜加色法，将三基色红，绿，蓝混合相加得到彩色图像。1935年，世界第一部真正的彩色电影《浮华世界》问世。
      </p>
    </div>
    <div
      id="c5"
      class="card bottom"
      :class="{ dark: curHoverId !== 'c5' && curHoverId !== '', hidden: curScrolled <= 0.73 }"
    >
      <TimelineButton class="button" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" @click="onClick">
        数字电影
      </TimelineButton>
      <p class="content bottom right-translate" style="font-size: 28px; line-height: 1.3">
        随着科技进步，电影的拍摄技术也在不断发展，随着人们将数字化技术应用于电影制作，电影行业迎来第三次变革。1987年1月到1992年2月，数字电影放映机技术的早期起步阶段。1998年10月，美国影片《TheLastBroadcast》成功使用数字电影放映机进行了放映。
      </p>
    </div>
    <!-- 缓动曲线 ease 的三次贝塞尔曲线 -1.7t^3+2.4t^2+0.3t -->
    <div
      class="timeline"
      :style="{
        clipPath:
          'inset(0 ' + 100 * (1 + 1.7 * curScrolled ** 3 - 2.4 * curScrolled ** 2 - 0.3 * curScrolled) + '% 0 0)',
      }"
    >
      <div class="line left-translate" :class="{ dark: curHoverId !== '' }"></div>
      <span class="year" :class="{ dark: curHoverId !== 'c1' && curHoverId !== '' }">1853</span>
      <div class="line" :class="{ dark: curHoverId !== '' }"></div>
      <span class="year" :class="{ dark: curHoverId !== 'c2' && curHoverId !== '' }">1895</span>
      <div class="line" :class="{ dark: curHoverId !== '' }"></div>
      <span class="year" :class="{ dark: curHoverId !== 'c3' && curHoverId !== '' }">1926</span>
      <div class="line" :class="{ dark: curHoverId !== '' }"></div>
      <span class="year" :class="{ dark: curHoverId !== 'c4' && curHoverId !== '' }">1932</span>
      <div class="line" :class="{ dark: curHoverId !== '' }"></div>
      <span class="year" :class="{ dark: curHoverId !== 'c5' && curHoverId !== '' }">1987</span>
      <div class="line right-translate" :class="{ dark: curHoverId !== '' }"></div>
    </div>
    <div class="timeline" style="filter: brightness(0.35); z-index: 1; position: absolute; left: 0; margin: 0">
      <div class="line left-translate"></div>
      <span class="year">1853</span>
      <div class="line"></div>
      <span class="year">1895</span>
      <div class="line"></div>
      <span class="year">1926</span>
      <div class="line"></div>
      <span class="year">1932</span>
      <div class="line"></div>
      <span class="year">1987</span>
      <div class="line right-translate"></div>
    </div>
  </div>
</template>
<script>
import TimelineButton from "./TimelineButton.vue";

export default {
  name: "TimeLine",
  components: {
    TimelineButton,
  },
  props: {
    scrolled: Number,
  },
  data() {
    return {
      curHoverId: "",
    };
  },
  computed: {
    curScrolled() {
      // console.log(this.scrolled > 13.1 ? (this.scrolled - 13.1) / 0.9 : 0);
      return this.scrolled > 13.1 ? (this.scrolled - 13.1) / 0.9 : 0;
    },
  },
  methods: {
    onMouseEnter(e) {
      this.curHoverId = e.target.parentNode.id;
    },
    onMouseLeave() {
      this.curHoverId = "";
    },
    onClick(e) {
      let param = 0;
      switch (e.target.innerText) {
        case "电影诞生":
          param = 1;
          break;
        case "无声电影":
          param = 2;
          break;
        case "有声电影":
          param = 3;
          break;
        case "彩色电影":
          param = 5;
          break;
        case "数字电影":
          param = 8;
          break;
      }
      this.$emit("scrollTo", param);
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  border-radius: 30px 30px 0 0;

  .bg2 {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
    // opacity: 0.2;
  }

  .dark {
    filter: brightness(0.35);
  }

  .title {
    float: left;
    width: 100px;
    line-height: 134px;
    font-size: 100px;
    color: #f5f5f5;
    font-family: PangMenZhengDao;
    margin: 0 0 0 60px;
  }

  .timeline {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
    margin: 0 0 0 -160px;
    z-index: 5;

    .line {
      width: 180px;
      height: 0;
      border: 1px solid #ebad00;
      transition: filter 0.3s ease-out;

      &.left-translate,
      &.right-translate {
        width: 340px;
      }
    }

    .year {
      font-size: 50px;
      font-family: PangMenZhengDao;
      color: #ebad00;
      transition: filter 0.3s ease-out;
    }
  }

  .card {
    position: absolute;
    transition: all 0.3s ease-out;
    width: 20%;
    transform: translateY(0);
    opacity: 1;

    &.top {
      top: calc(50% - 155px);
    }

    &.bottom {
      bottom: calc(50% - 35px);
    }

    &.top.hidden {
      transform: translateY(20px);
      opacity: 0;
    }

    &.bottom.hidden {
      transform: translateY(-20px);
      opacity: 0;
    }

    .content {
      font-size: 35px;
      color: #f5f5f5;
      position: absolute;
      width: 450px;
      left: -112.5px;

      &.top {
        top: -290px;
      }

      &.bottom {
        top: 130px;

        &.left-translate {
          left: 0px;
        }

        &.right-translate {
          left: -225px;
        }
      }
    }

    .button {
      position: absolute;
    }
  }

  #c1 {
    left: 15%;
  }

  #c2 {
    left: 31%;
  }

  #c3 {
    left: 47%;
  }

  #c4 {
    left: 63%;
  }

  #c5 {
    left: 79%;
  }
}
</style>
