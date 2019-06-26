<template>
  <div class="container" id="video-list">
    <ul>
      <li v-for="(video, index) in videos" :key="index">
        <VideoListItem :video="video" @onselect="onSelect"/>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import VideoListItem from "./VideoListItem.vue";

export default Vue.extend({
  components: {
    VideoListItem
  },
  props: {
    videos: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    onSelect(video) {
      this.$emit("onselect", video);
    }
  }
});
</script>


<style>
</style>
