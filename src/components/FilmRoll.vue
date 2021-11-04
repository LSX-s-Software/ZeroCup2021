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
    >
      <swiper-slide
        v-for="(item, index) in items"
        :key="index"
        :style="{ width: width + 'px', left: innerTranslate < 0 ? innerTranslate + 'px' : '' }"
      >
        <video
          muted
          controls
          playsinline
          :src="require('@video/' + item + '.mp4')"
          :style="{ height: height + 'px', width: width + 'px' }"
          :ref="setItemRef"
        ></video>
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
    <img
      src="@img/navi.svg"
      alt=""
      class="btn-left"
      v-if="items.length > 1"
      :style="{ transform: 'translate(' + btnLeftTranslate + 'px,-50%)' }"
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

    video,
    img {
      border-radius: 15px;
      overflow: hidden;
      object-fit: cover;
    }
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
SwiperCore.use([Navigation]);

export default {
  name: "FilmRoll",
  components: {
    Swiper,
    SwiperSlide,
  },
  emits: ["slideChange"],
  props: {
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
    innerTranslate: {
      type: Number,
      default: 50,
    },
    outerWidth: {
      type: Number,
      default: 1200,
    },
  },
  data() {
    return {
      itemRefs: [],
    };
  },
  computed: {
    btnLeftTranslate() {
      return -this.width / 2 - 80 + this.innerTranslate / 2;
    },
    btnRightTranslate() {
      return this.width / 2 + 48 + this.innerTranslate / 2;
    },
  },
  methods: {
    setItemRef(el) {
      if (el) {
        this.itemRefs.push(el);
      }
    },
    onSlideChange(e) {
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
