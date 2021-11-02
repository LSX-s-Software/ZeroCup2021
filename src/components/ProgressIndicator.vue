<template>
  <img src="../assets/img/wheel.png" alt="" id="wheel" :style="{ transform: 'rotate(' + rotate + 'deg)' }" />
</template>

<style scoped>
#wheel {
  width: 350px;
  transition: transform ease 0.1s;
}
</style>

<script>
export default {
  name: "ProgressIndicator",
  props: ["current"],
  computed: {
    rotate() {
      if (this.current <= 1) {
        return 0;
      } else if (this.current <= 3) {
        return (this.current - 1) * 72;
      } else if (this.current <= 5) {
        return 144 + (this.current - 3) * 36;
      } else if (this.current <= 7) {
        return 216 + (this.current - 4) * 72;
      } else {
        return 360;
      }
    },
  },
};
</script>
