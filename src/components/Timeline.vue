<template>
  <div class="container">
    <p class="title">电影技术革新</p>
    <div id="s1" class="card bottom" :class="{ dark: curHoverId !== 's1' && curHoverId !== '' }">
      <TimelineButton class="button" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" @click="onClick">
        电影诞生
      </TimelineButton>
      <p class="content bottom left-translate">
        电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生
      </p>
    </div>
    <div id="s2" class="card top" :class="{ dark: curHoverId !== 's2' && curHoverId !== '' }">
      <TimelineButton class="button" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" @click="onClick">
        无声电影
      </TimelineButton>
      <p class="content top">
        电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生
      </p>
    </div>
    <div id="s3" class="card bottom" :class="{ dark: curHoverId !== 's3' && curHoverId !== '' }">
      <TimelineButton class="button" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" @click="onClick">
        有声电影
      </TimelineButton>
      <p class="content bottom">
        电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生
      </p>
    </div>
    <div id="s4" class="card top" :class="{ dark: curHoverId !== 's4' && curHoverId !== '' }">
      <TimelineButton class="button" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" @click="onClick">
        彩色电影
      </TimelineButton>
      <p class="content top">
        电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生
      </p>
    </div>
    <div id="s5" class="card bottom" :class="{ dark: curHoverId !== 's5' && curHoverId !== '' }">
      <TimelineButton class="button" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" @click="onClick">
        数字电影
      </TimelineButton>
      <p class="content bottom right-translate">
        电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生电影诞生
      </p>
    </div>
    <div class="timeline">
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
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;

  .title {
    float: left;
    width: 100px;
    line-height: 134px;
    font-size: 100px;
    color: #f5f5f5;
    font-family: PangMenZhengDao;
  }

  .timeline {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
    margin: 0 0 0 -160px;

    .line {
      width: 180px;
      height: 0;
      border: 1px solid #ebad00;

      &.left-translate,
      &.right-translate {
        width: 340px;
      }
    }

    .year {
      font-size: 50px;
      font-family: PangMenZhengDao;
      color: #ebad00;
    }
  }

  .card {
    position: absolute;
    transition: all 0.3s ease-out;
    width: 20%;

    &.top {
      top: calc(50% - 25px - 70px - 60px);
    }

    &.bottom {
      bottom: calc(50% - 35px);
    }

    &.dark {
      filter: brightness(0.35);
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

  #s1 {
    left: 15%;
  }

  #s2 {
    left: 31%;
  }

  #s3 {
    left: 47%;
  }

  #s4 {
    left: 63%;
  }

  #s5 {
    left: 79%;
  }
}
</style>
