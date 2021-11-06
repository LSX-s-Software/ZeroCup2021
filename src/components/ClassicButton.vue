<template>
  <div class="btn" @select.prevent>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
@import url(../assets/css/font.css);
.btn {
  background-image: url(../assets/img/button.png);
  background-size: 100% 100%;
  background-position: center center;
  background-repeat: no-repeat;
  cursor: pointer;
  width: 250px;
  height: 81px;
  margin: 20px 52px 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  font-family: AaMSXK;
  user-select: none;
  transition: filter ease 0.15s;
  flex-shrink: 0;

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
};
</script>
