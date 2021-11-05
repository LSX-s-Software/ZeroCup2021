<template>
  <div class="btn" @select.prevent>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
@import url(../assets/css/font.css);
@import url(../assets/css/theme.css);
.btn {
  display: inline-block;
  font-family: PangMenZhengDao;
  padding: 16px 28px;
  background: var(--mediumGray);
  border-radius: 35px;
  font-size: 25px;
  white-space: nowrap;
  margin-top: 20px;
  cursor: pointer;
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
  name: "ModernButton",
};
</script>
