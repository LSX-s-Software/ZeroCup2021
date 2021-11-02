<template>
  <div class="container">
    <div class="placeholder" :style="{ height: height + 'px' }"></div>
    <swiper
      :slides-per-view="3"
      :space-between="24"
      @slideChange="onSlideChange"
      class="swiper"
      :centeredSlides="true"
      :width="width"
      :loop="true"
      :slidesPerView="1"
    >
      <swiper-slide v-for="(item, index) in items" :key="index">
        <video :src="item" muted controls :style="{ height: height + 'px', width: width + 'px' }"></video>
      </swiper-slide>
    </swiper>
  </div>
</template>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100%;
  /* Webpack 会将以 ~ 符号作为前缀的路径视作依赖模块而去解析 */
  /* background-image: url("~@img/layer-border.png");
  background-size: 100% 100%;
  background-repeat: no-repeat; */
  background-color: rgba(0, 0, 0, 0.8);
  filter: drop-shadow(0 10px 8px rgba(0, 0, 0, 0.16));

  .placeholder {
    width: 100%;
  }

  .swiper {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 50vw;
    video {
      border-radius: 15px;
      overflow: hidden;
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
  },
  methods: {
    onSlideChange(e) {
      console.log(e);
      this.$emit("slideChange", e);
    },
  },
};
</script>
