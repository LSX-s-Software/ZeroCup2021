<template>
  <div class="container" :style="{ width: outerWidth + 'px' }">
    <img src="@img/border_top.png" alt="" id="border1" :style="{ width: outerWidth + 23 + 'px' }" />
    <swiper
      class="swiper"
      :loop="true"
      :slidesPerView="'auto'"
      :centeredSlides="true"
      :spaceBetween="24"
      @slideChange="onSlideChange"
      :observer="true"
      :observeSlideChildren="true"
      :width="outerWidth + Math.abs(innerTranslate)"
      :navigation="{
        nextEl: '.btn-right',
        prevEl: '.btn-left',
      }"
      :allowTouchMove="items.length > 1"
      :style="{ height: height + 'px' }"
    >
      <swiper-slide
        v-for="(item, index) in items"
        :key="index"
        :style="{ width: width + 'px', left: innerTranslate < 0 ? innerTranslate + 'px' : '' }"
      >
        <div :class="{ hidden: showDetail }" style="transition: opacity 0.3s ease-out; position: relative">
          <video
            muted
            controls
            playsinline
            :src="require('@video/' + item + '.mp4')"
            :style="{ height: height + 'px', width: width + 'px' }"
            :ref="setItemRef"
            :autoplay="index == 0 && sIndex != 3"
          ></video>
          <img
            v-if="dualContent"
            :src="require('@video/' + extraItems[index] + '.png')"
            alt=""
            :style="{ clip: `rect(${height * clip}px,${width}px,${height}px,0px)` }"
          />
        </div>
        <div class="detail">
          <span class="title" :class="{ hidden: !showDetail }">
            {{ description[item + "_title"] || "缺少介绍" }}
          </span>
          <span class="content" :class="{ hidden: !showDetail }">
            {{ description[item + "_detail"] || "缺少介绍" }}
          </span>
        </div>
      </swiper-slide>
      <swiper-slide
        v-if="items.length == 1"
        :style="{ width: width + 'px', left: innerTranslate < 0 ? innerTranslate + 'px' : '' }"
      >
        <img :src="require('@video/' + items[0] + '.png')" :style="{ height: height + 'px', width: width + 'px' }" />
      </swiper-slide>
      <swiper-slide
        v-if="items.length == 1"
        :style="{ width: width + 'px', left: innerTranslate < 0 ? innerTranslate + 'px' : '' }"
      >
        <img :src="require('@video/' + items[0] + '.png')" :style="{ height: height + 'px', width: width + 'px' }" />
      </swiper-slide>
    </swiper>
    <AudioGame
      v-if="audioGame.isShow"
      class="audio-game"
      :height="height / 7"
      :width="width"
      :is-playing="audioGame.isPlaying"
      :is-recording="audioGame.isRecording"
      :is-paused="audioGame.isPaused"
      @finish="this.$emit('playbackfinish')"
      :style="{ transform: `translate(${(this.innerTranslate - this.width) / 2}px,-${borderHeight}px)` }"
    />
    <img
      src="@img/navi.svg"
      alt=""
      class="btn-left"
      v-if="items.length > 1"
      :style="{ transform: 'translate(' + btnLeftTranslate + 'px,-50%) rotateZ(0deg)' }"
    />
    <img
      src="@img/navi.svg"
      alt=""
      class="btn-right"
      v-if="items.length > 1"
      :style="{ transform: 'translate(' + btnRightTranslate + 'px,-50%) rotate(180deg)' }"
    />
    <img src="@img/border_bottom.png" alt="" id="border2" :style="{ width: outerWidth + 23 + 'px' }" />
  </div>
</template>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100%;
  filter: drop-shadow(0 10px 8px rgba(0, 0, 0, 0.16));

  #border1,
  #border2 {
    opacity: 0.8;
    filter: drop-shadow(0 10px 8px rgba(0, 0, 0, 0.16));
    display: block;
  }

  #border2 {
    bottom: 0;
    transform: rotateX(180deg);
  }

  .swiper {
    background-color: rgba(0, 0, 0, 0.8);

    .hidden {
      opacity: 0;
    }

    video,
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 15px;
      overflow: hidden;
    }
    img {
      position: absolute;
      top: 0;
      left: 0;
    }

    .detail {
      position: absolute;
      top: 0;
      display: block;
      font-family: AaMSXK;
      line-height: 36px;
      color: var(--lightText);
      margin-top: 20px;
      max-width: 750px;
      transition: opacity 0.3s;

      .title {
        font-size: 32px;
        display: block;
        margin: 0 0 10px;
      }
      .content {
        font-size: 22px;
        display: block;
      }
    }
  }

  .audio-game {
    border-top: 1px solid var(--mediumGray);
    position: absolute;
    bottom: 0;
    left: 50%;
    z-index: 100;
  }

  .btn-left,
  .btn-right {
    display: block;
    width: 32px;
    position: absolute;
    z-index: 100;
    top: 50%;
    left: 50%;
    cursor: pointer;
    filter: drop-shadow(0 0 6px rgba(0, 0, 0, 0.75));
  }
}
</style>

<script>
import { Swiper, SwiperSlide } from "swiper/vue/swiper-vue";
import "swiper/swiper-bundle.min.css";
import SwiperCore, { Navigation } from "swiper";
import AudioGame from "./AudioGame";
SwiperCore.use([Navigation]);

export default {
  name: "FilmRoll",
  components: {
    Swiper,
    SwiperSlide,
    AudioGame,
  },
  emits: ["slideChange", "playbackfinish"],
  props: {
    dualContent: {
      //一个slide多个内容
      type: Boolean,
      default: false,
    },
    clip: {
      type: Number,
      default: 0,
    },
    sIndex: Number, //用于识别是哪一个组件实例
    height: {
      type: Number,
      default: 450,
    },
    width: {
      type: Number,
      default: 800,
    },
    items: Array,
    extraItems: Array,
    innerTranslate: {
      type: Number,
      default: 50,
    },
    outerWidth: {
      type: Number,
      default: 1200,
    },
    showDetail: {
      type: Boolean,
      default: false,
    },
    audioGame: {
      type: Object,
      default: () => ({
        isShow: false,
        isPlaying: false,
        isRecording: false,
      }),
    },
  },
  data() {
    return {
      itemRefs: [],
      description: require("../assets/description.json"),
      activeIndex: 0,
    };
  },
  computed: {
    btnLeftTranslate() {
      return -this.width / 2 - 80 + this.innerTranslate / 2;
    },
    btnRightTranslate() {
      return this.width / 2 + 48 + this.innerTranslate / 2;
    },
    borderHeight() {
      return this.outerWidth / 20;
    },
  },
  methods: {
    setItemRef(el) {
      if (el) {
        this.itemRefs.push(el);
      }
    },
    onSlideChange(e) {
      this.activeIndex = e.realIndex;
      this.$emit("slideChange", {
        sIndex: this.sIndex,
        activeIndex: e.realIndex,
      });
      // this.itemRefs[e.realIndex].play();
    },
  },
  beforeUpdate() {
    this.itemRefs = [];
  },
};
</script>
