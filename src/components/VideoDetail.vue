<template>
  <div>
    <div class="box">
      <div class="media-content" ref="videodetail">
        <div class="container">
          <div class="video-container">
            <div v-if="video.etag">
            <div class="title">{{video.snippet.title}}</div>
            <youtube
              :key="video.etag"
              :video-id="id"
              :player-width="'100%'"
              :player-height="'auto'"
              @ready="onReady"
            ></youtube>
          </div>
          </div>
        </div>
      </div>
      <br>
      <nav class="level is-mobile">
        <div class="level-left">
          <button class="level-item button" @click="onCopy()">Share</button>
          <transition name="fade">
            <p v-show="copied">Link copied!</p>
          </transition>
        </div>
        <div class="level-right">
          <a
            :href="`https://youtu.be/${id}`"
            target="_blank"
            class="level-item button is-primary"
          >View on YouTube</a>
          <button class="level-item button" @click="onHide()">Close</button>
        </div>
      </nav>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "VideoDetail",
  props: {
    video: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      copied: false,
      videoWidth: 640,
      videoHeight: 360
    };
  },
  computed: {
    id() {
      const { id } = this.video;
      return id ? id.videoId : ''
    }
  },
  methods: {
    onHide() {
      if (this.player) {
        this.player.stopVideo();
      }
      this.$emit(`onhide`);
    },
    onCopy() {
      this.$copyText(`https://youtu.be/${this.video.id.videoId}`);
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 1500);
    },
    onReady(event) {
      this.player = event.target;
    }
  },
});
</script>


<style>
.video-container {
  position: relative;
  padding-bottom: 56.25%;
  padding-top: 30px;
  height: 0;
  overflow: hidden;
}

.video-container iframe,
.video-container object,
.video-container embed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
