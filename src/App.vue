<template>
  <div class="container">
    <ProgressIndicator id="wheel"></ProgressIndicator>
    <FilmRoll id="roll1"
      ><div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
    </FilmRoll>
  </div>
</template>

<script>
import ProgressIndicator from "./components/ProgressIndicator.vue";
import FilmRoll from "./components/FilmRoll.vue";

export default {
  name: "App",
  components: {
    ProgressIndicator,
    FilmRoll,
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  min-height: 100vh;
  position: relative;
}

.container {
  width: 100%;
  overflow-x: hidden;
  position: relative;

  #wheel {
    position: fixed;
    left: -185px;
    top: -185px;
    z-index: 1000;
  }

  #roll1 {
    width: 675px;
    height: auto;
    transform: rotate(-10deg);
    transform-origin: top left;
    position: absolute;
    left: 260px;
  }
}
</style>
