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
  border-image: url(../assets/Layer1.png);
  border-width: 0 60px 0 60px;
  border-image-repeat: repeat;
  border-image-slice: 75;
}

.container .slot {
  height: auto;
}

.container >>> .slot div {
  width: 100%;
  height: 500px;
  box-sizing: border-box;
  border-bottom: 50px solid rgba(0, 0, 0, 0.95);
}
</style>

<script>
export default {
  name: "FilmRoll",
};
</script>
