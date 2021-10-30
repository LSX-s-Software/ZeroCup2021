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
  border-width: 0 60px 0 60px;
  border-style: solid;
  border-image: url(../assets/img/Layer1.png);
  border-image-repeat: repeat;
  border-image-slice: 75;
}

.container .slot {
  height: auto;
}

.container .slot:deep(section) {
  width: auto;
  height: 500px; /*no*/
  box-sizing: content-box;
  border-bottom: 40px solid rgba(0, 0, 0, 0.95);
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
