<template>
  <div>
    <video
      muted
      controls
      playsinline
      :src="require('@video/' + src + '.mp4')"
      :style="{ height: height * 7 / 8 + 'px', width: width + 'px' }"
    ></video>
    <div id="waveform" ref="waveform" :style="{ height: height / 8 + 'px', width: width + 'px' }"></div>
  </div>
</template>
<script>
import WaveSurfer from 'wavesurfer.js'

export default {
  name: 'AudioGame',
  props: {
    src: {
      type: String,
      required: true,
    },
    height: {
      type: Number,
      default: 200,
    },
    width: {
      type: Number,
      default: 200,
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
      console.log('isplaying', this.wavesurfer.isPlaying());
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
      cursorColor: "#fff",
      height: this.height / 8,
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
            console.log('recording', url)
            this.wavesurfer.load(url);
          };
        })
        .catch((err) => {
          console.log(err);
        });
    }

    this.wavesurfer.on('ready', () => {
      console.log('ready', this.wavesurfer.getDuration(), this.wavesurfer.getVolume(), this.wavesurfer.getMute());
    });
  },
};
</script>
<style lang="scss" scoped>
#waveform {
  // position: absolute;
  margin: 0 auto;
}
</style>