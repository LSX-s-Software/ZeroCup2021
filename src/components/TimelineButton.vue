<template>
  <div class="btn" @select.prevent>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "TimelineButton",
};
</script>
<style lang="scss" scoped>
.btn {
  padding: 20px 6px;
  color: #f5f5f5;
  font-family: AaMSXK;
  font-size: 50px;
  border-image: url("~@img/timeline_button_border.png");
  border-image-slice: 22;
  border-width: 10px;
  border-style: solid;
  cursor: pointer;
}
</style>
