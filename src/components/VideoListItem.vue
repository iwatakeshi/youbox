<template>
  <div id="video-list-item" style="margin-bottom: 20px;">
    <div class="columns is-fullhd" v-show="video.snippet">
      <figure class="column is-one-quarter">
        <a @click="onClick(video)">
          <img
            class="image"
            :src="thumbnail.url"
            :width="thumbnail.width"
            :height="thumbnail.height"
          >
        </a>
      </figure>
      <div class="column">
        <!-- Form  -->
        <div class="form">
          <div class="field">
            <a @click="onClick(video)">
              <h6 class="title is-6">{{video.snippet.title}}</h6>
            </a>
          </div>
          <div class="field">
            <div class="columns is-desktop is-mobile is-vcentered">
              <div class="column">
                <p class>{{video.snippet.channelTitle}}</p>
              </div>
              <div class="column is-two-fifths">
                <p class>{{ publishedDate | moment("from", "now") }}</p>
              </div>
              <div
                  v-show="video.snippet.liveBroadcastContent === 'live'"
                  class="column is-one-fifth"
                >
                  <span class="tag is-danger">Live</span>
                </div>
                <div v-show="isNewVideo" class="column is-one-fifth">
                  <span class="tag is-info">New</span>
                </div>
            </div>
          </div>
          <div class="field">
            <p style="margin-top: 5%;">{{video.snippet.description}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    video: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    thumbnail() {
      return this.video.snippet.thumbnails.medium;
    },
    id() {
      return this.video.id.videoId;
    },
    isNewVideo() {
      return (
        new Date(this.video.snippet.publishedAt).getMonth() ===
        new Date().getMonth()
      );
    },
    publishedDate() {
      return new Date(this.video.snippet.publishedAt);
    }
  },
  methods: {
    onClick(video) {
      this.$emit("onselect", video);
    }
  }
});
</script>


<style>
</style>
