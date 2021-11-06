<template>
  <div id="waveform" ref="waveform" :style="{ height: height + 'px', width: width + 'px' }"></div>
</template>
<script>
import WaveSurfer from "wavesurfer.js";

export default {
  name: "AudioGame",
  props: {
    height: {
      type: Number,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    isRecording: {
      type: Boolean,
      default: false,
    },
    isPlaying: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["finish"],
  watch: {
    isRecording: function (val) {
      if (val) {
        this.startRecording();
      } else {
        this.stopRecording();
      }
    },
    isPlaying: function (val) {
      if (val) {
        this.startPlaying();
      } else {
        this.stopPlaying();
      }
    },
  },
  data() {
    return {
      wavesurfer: null,
      mediaRecorder: null,
      chunks: [],
    };
  },
  methods: {
    startRecording() {
      this.mediaRecorder.start();
    },
    stopRecording() {
      this.mediaRecorder.stop();
    },
    startPlaying() {
      this.wavesurfer.play();
      console.log("isplaying", this.wavesurfer.isPlaying());
    },
    stopPlaying() {
      this.wavesurfer.pause();
    },
  },
  mounted() {
    this.wavesurfer = WaveSurfer.create({
      container: this.$refs.waveform,
      waveColor: "#368666",
      progressColor: "#6d9e8b",
      backgroundColor: "#000",
      cursorColor: "#fff",
      normalize: true,
      height: this.height,
      width: this.width,
      // barWidth: 3,
      // barHeight: 1,
      // cursorWidth: 0,
      // hideScrollbar: true,
      responsive: true,
    });

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          this.mediaRecorder = new MediaRecorder(stream);
          this.mediaRecorder.ondataavailable = (e) => {
            const url = window.URL.createObjectURL(e.data);
            console.log("recording", url);
            this.wavesurfer.load(url);
          };
        })
        .catch((err) => {
          console.error(err);
        });
    }

    this.wavesurfer.on("ready", () => {
      console.log("ready", this.wavesurfer.getDuration(), this.wavesurfer.getVolume(), this.wavesurfer.getMute());
    });
    this.wavesurfer.on("finish", () => {
      this.$emit("finish");
    });
  },
};
</script>
<style lang="scss" scoped>
#waveform {
  border-radius: 0 0 15px 15px;
  overflow: hidden;
}
</style>
