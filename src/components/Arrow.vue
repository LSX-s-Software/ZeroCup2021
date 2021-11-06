<template>
  <svg
    t="1632058305684"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="5211"
    :width="width"
    :height="height"
    :style="{ transform: 'rotate(' + rotation + 'deg)' }"
  >
    <path
      d="M686 593.3s-372.6 0.1-541.8 0.1c-44.3 0-80.2-36-80.2-80.2 0-44.3 35.9-80.2 80.2-80.2 141.9 0 541.5-0.1 541.5-0.1S658.8 405.8 535.1 282c-31.4-31.3-31.4-82.1 0-113.5s82.2-31.4 113.5 0l288 288c31.3 31.4 31.3 82.1 0 113.5 0 0-161.9 161.9-285.6 285.7-31.4 31.4-82.1 31.4-113.5 0-31.4-31.4-31.4-82.1 0-113.5C637.8 641.7 686 593.3 686 593.3z"
      p-id="5212"
      :fill="color"
    ></path>
  </svg>
</template>

<script>
export default {
  name: "Arrow",
  props: {
    width: {
      type: Number,
      default: 16,
    },
    height: {
      type: Number,
      default: 16,
    },
    rotation: {
      type: Number,
      default: 180,
    },
    color: {
      type: String,
      default: "#fff",
    },
  },
};
</script>
