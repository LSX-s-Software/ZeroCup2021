<template>
  <div class="container">
    <p class="title">电影技术革新</p>
    <div
      id="c1"
      class="card bottom"
      :class="{ dark: curHoverId !== 'c1' && curHoverId !== '', hidden: scrolled <= 12.45 }"
    >
      <TimelineButton class="button" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" @click="onClick">
        电影诞生
      </TimelineButton>
      <p class="content bottom left-translate">
        电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生
      </p>
    </div>
    <div
      id="c2"
      class="card top"
      :class="{ dark: curHoverId !== 'c2' && curHoverId !== '', hidden: scrolled <= 12.55 }"
    >
      <TimelineButton class="button" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" @click="onClick">
        无声电影
      </TimelineButton>
      <p class="content top">
        电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生
      </p>
    </div>
    <div
      id="c3"
      class="card bottom"
      :class="{ dark: curHoverId !== 'c3' && curHoverId !== '', hidden: scrolled <= 12.65 }"
    >
      <TimelineButton class="button" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" @click="onClick">
        有声电影
      </TimelineButton>
      <p class="content bottom">
        电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生
      </p>
    </div>
    <div
      id="c4"
      class="card top"
      :class="{ dark: curHoverId !== 'c4' && curHoverId !== '', hidden: scrolled <= 12.75 }"
    >
      <TimelineButton class="button" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" @click="onClick">
        彩色电影
      </TimelineButton>
      <p class="content top">
        电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生
      </p>
    </div>
    <div
      id="c5"
      class="card bottom"
      :class="{ dark: curHoverId !== 'c5' && curHoverId !== '', hidden: scrolled <= 12.85 }"
    >
      <TimelineButton class="button" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" @click="onClick">
        数字电影
      </TimelineButton>
      <p class="content bottom right-translate">
        电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生
      </p>
    </div>
    <div class="timeline" :style="{ clipPath: 'inset(0 ' + (100 - 100 * ((scrolled - 12.4) / 0.6)) + '% 0 0)' }">
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
  watch: {
    scrolled(newVal, oldVal) {
      if (newVal < 12.2) {
        return;
      }
      console.log(newVal, oldVal);
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;

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
      top: calc(50% - 25px - 70px - 60px);
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
