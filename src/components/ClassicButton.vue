<template>
  <div class="btn" @select.prevent>{{ title }}</div>
</template>

<style lang="scss" scoped>
@import url(../assets/css/font.css);
.btn {
  background-image: url(../assets/img/button.png);
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  cursor: pointer;
  width: 250px;
  height: 81px;
  margin: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  font-family: AaMSXK;
  user-select: none;

  &:hover {
    filter: brightness(1.1);
  }

  &:active {
    filter: brightness(0.9);
  }
}
</style>

<script>
export default {
  name: "ClassicButton",
  props: ["title"],
};
</script>
