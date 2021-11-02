<template>
  <div class="container">
    <div class="slot">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  position: relative;
  /* Webpack 会将以 ~ 符号作为前缀的路径视作依赖模块而去解析 */
  background-image: url("~@img/layer-border.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.container .slot {
  width: calc(100% - 2 * 10.2%);
  height: calc(100% - 2 * 10.2%);
  /* height: auto; */
  position: absolute;
  left: 10.2%;
  top: 10.2%;
  border-radius: 14px;
}

.container .slot:deep(section) {
  width: auto;
  height: 500px; /*no*/
  box-sizing: content-box;
  border-bottom: 32px solid rgba(0, 0, 0, 0.85); /*no*/
  display: flex;
  align-items: center;
  justify-content: center;
}

.container .slot:deep(section):nth-child(2n-1) {
  height: calc(100vh - 540px); /*no*/
  background-color: rgba(0, 0, 0, 0.4);
}

.container .slot:deep(div.flipable) {
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform ease-in-out 0.8s;
  display: inherit;
  align-items: inherit;
  justify-content: inherit;
}

.container .slot:deep(div.flipable.flip) {
  transform: rotateY(180deg);
}

.container .slot:deep(div.flipable .front),
.container .slot:deep(div.flipable .back) {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.container .slot:deep(div.flipable .back) {
  transform: rotateY(180deg);
  background-color: rgba(255, 255, 255, 0.8);
}
</style>

<script>
export default {
  name: "FilmRoll",
};
</script>
