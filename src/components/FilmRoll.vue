<template>
  <div class="container" :style="{ width: outerWidth + 'px', height: height + 'px' }">
    <img src="@img/border.png" alt="" id="border1" :style="{ width: outerWidth + 25 + 'px' }" />
    <img src="@img/border.png" alt="" id="border2" :style="{ width: outerWidth + 25 + 'px' }" />
    <swiper
      :slides-per-view="1"
      :space-between="24"
      @slideChange="onSlideChange"
      class="swiper"
      :centeredSlides="true"
      :style="{ width: outerWidth + 'px' }"
      :loop="true"
      :loopAdditionalSlides="1"
    >
      <swiper-slide v-for="(item, index) in items" :key="index" :style="{ maxWidth: width + 'px' }">
        <video
          muted
          controls
          :src="require('@video/' + item + '.mp4')"
          :style="{ height: height + 'px', width: width + 'px' }"
        ></video>
      </swiper-slide>
    </swiper>
  </div>
</template>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100%;
  filter: drop-shadow(0 10px 8px rgba(0, 0, 0, 0.16));
  overflow-y: visible;

  #border1,
  #border2 {
    left: 0;
    position: absolute;
    opacity: 0.8;
    filter: drop-shadow(0 10px 8px rgba(0, 0, 0, 0.16));
  }

  #border1 {
    top: 0;
    transform: translateY(-100%);
  }

  #border2 {
    bottom: 0;
    transform: translateY(100%) rotateX(180deg);
  }

  .swiper {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);

    video {
      border-radius: 15px;
      overflow: hidden;
      object-fit: cover;
    }
  }
}
</style>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.min.css";

export default {
  name: "FilmRoll",
  components: {
    Swiper,
    SwiperSlide,
  },
  emits: ["slideChange"],
  props: {
    height: {
      type: Number,
      default: 450,
    },
    width: {
      type: Number,
      default: 800,
    },
    items: Array,
    outerTranslate: String,
    innerTranslate: String,
  },
  computed: {
    outerWidth() {
      return this.width * 1.45;
    },
  },
  methods: {
    onSlideChange(e) {
      console.log(e);
      this.$emit("slideChange", e);
    },
  },
};
</script>
