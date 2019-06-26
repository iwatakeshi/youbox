<template>
  <div id="app" class="section">
    <div class="container">
      <h1 class="title has-text-centered">YouBox</h1>
      <SearchBar @onchange="onSearchBarChange"/>
      <br>
      <transition name="fade" mode="out-in">
        <VideoDetail
          v-show="(!!video.etag) && showVideoDetail"
          :video="video"
          @onhide="onVideoDetailHide"
        />
      </transition>
      <br v-show="(!!video.etag) && showVideoDetail">
      <div v-if="hasAPIKey">
        <VideoList :videos="videos" @onselect="onVideoSelect"/>
      </div>
      <div v-else>
        <p>Please add the Youtube API Key for Youbox to work.</p>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from "./components/SearchBar";
import VideoList from "./components/VideoList";
import VideoDetail from "./components/VideoDetail";

import axios from "axios";

const YOUTUBE_API_KEY =
  process.env.VUE_APP_YOUTUBE_API_KEY || window.VUE_APP_YOUTUBE_API_KEY || "";

export default {
  name: "app",
  components: {
    SearchBar,
    VideoList,
    VideoDetail
  },
  data() {
    return {
      videos: [
        // {
        //   kind: "youtube#searchResult",
        //   etag: '"Bdx4f4ps3xCOOo1WZ91nTLkRZ_c/425fjPIg_L2GTopi1Qu2g3G0N1s"',
        //   id: {
        //     kind: "youtube#video",
        //     videoId: "x36P30CRxvY"
        //   },
        //   snippet: {
        //     publishedAt: "2019-01-23T23:01:01.000Z",
        //     channelId: "UCQINXHZqCU5i06HzxRkujfg",
        //     title:
        //       "名曲J-POPメドレー - Relaxing Piano Music - 24/7 Live - 勉強用BGM, 作業用BGM, 結婚式BGM",
        //     description:
        //       "Dear Bride / 西野カナ Story / AI 恋するフォーチュンクッキー / AKB48 花束を君に / 宇多田ヒカル Everything / MISIA Eyes On Me / Superfly ロージー / Aiko 糸 /...",
        //     thumbnails: {
        //       default: {
        //         url: "https://i.ytimg.com/vi/x36P30CRxvY/default_live.jpg",
        //         width: 120,
        //         height: 90
        //       },
        //       medium: {
        //         url: "https://i.ytimg.com/vi/x36P30CRxvY/mqdefault_live.jpg",
        //         width: 320,
        //         height: 180
        //       },
        //       high: {
        //         url: "https://i.ytimg.com/vi/x36P30CRxvY/hqdefault_live.jpg",
        //         width: 480,
        //         height: 360
        //       }
        //     },
        //     channelTitle: "BGM channel",
        //     liveBroadcastContent: "live"
        //   }
        // },
        // {
        //   kind: "youtube#searchResult",
        //   etag: '"Bdx4f4ps3xCOOo1WZ91nTLkRZ_c/5yr22YcSbQDPOGJ3DfSO9UXTH9I"',
        //   id: {
        //     kind: "youtube#video",
        //     videoId: "pGkcG2qH3pA"
        //   },
        //   snippet: {
        //     publishedAt: "2019-03-01T00:40:50.000Z",
        //     channelId: "UCQNN7INAt1yS_v0P0tSlbrQ",
        //     title:
        //       "POP MUSIC 2019 (POP&amp;NCS) 24/7 MUSIC LIVE STREAM - HUNTER.FM",
        //     description:
        //       "Seja bem-vindo à Hunter.FM, O Canal Pop&NCS. Aqui você irá descobrir novas músicas para acrescentar em sua playlist :) Ouça rádios de música Pop, ...",
        //     thumbnails: {
        //       default: {
        //         url: "https://i.ytimg.com/vi/pGkcG2qH3pA/default_live.jpg",
        //         width: 120,
        //         height: 90
        //       },
        //       medium: {
        //         url: "https://i.ytimg.com/vi/pGkcG2qH3pA/mqdefault_live.jpg",
        //         width: 320,
        //         height: 180
        //       },
        //       high: {
        //         url: "https://i.ytimg.com/vi/pGkcG2qH3pA/hqdefault_live.jpg",
        //         width: 480,
        //         height: 360
        //       }
        //     },
        //     channelTitle: "HUNTER.FM",
        //     liveBroadcastContent: "live"
        //   }
        // },
        // {
        //   kind: "youtube#searchResult",
        //   etag: '"Bdx4f4ps3xCOOo1WZ91nTLkRZ_c/9ngrTH5nloEgELr79mg34di661M"',
        //   id: {
        //     kind: "youtube#video",
        //     videoId: "pvuN_WvF1to"
        //   },
        //   snippet: {
        //     publishedAt: "2019-04-19T03:57:44.000Z",
        //     channelId: "UC8rVJyj4zE0S9-sccMLifIA",
        //     title: "Lil Dicky - Earth (Official Music Video)",
        //     description:
        //       'For more information on how to save the Earth go to https://welovetheearth.org To purchase or stream Earth go to https://LilDicky.lnk.to/Earth "Earth" Song: ...',
        //     thumbnails: {
        //       default: {
        //         url: "https://i.ytimg.com/vi/pvuN_WvF1to/default.jpg",
        //         width: 120,
        //         height: 90
        //       },
        //       medium: {
        //         url: "https://i.ytimg.com/vi/pvuN_WvF1to/mqdefault.jpg",
        //         width: 320,
        //         height: 180
        //       },
        //       high: {
        //         url: "https://i.ytimg.com/vi/pvuN_WvF1to/hqdefault.jpg",
        //         width: 480,
        //         height: 360
        //       }
        //     },
        //     channelTitle: "Lil Dicky",
        //     liveBroadcastContent: "none"
        //   }
        // },
        // {
        //   kind: "youtube#searchResult",
        //   etag: '"Bdx4f4ps3xCOOo1WZ91nTLkRZ_c/pqPk68pyu4UN0ALIfeVVFhIvYQo"',
        //   id: {
        //     kind: "youtube#video",
        //     videoId: "m7Bc3pLyij0"
        //   },
        //   snippet: {
        //     publishedAt: "2018-09-24T13:58:16.000Z",
        //     channelId: "UCEdvpU2pFRCVqU6yIPyTpMQ",
        //     title: "Marshmello ft. Bastille - Happier (Official Music Video)",
        //     description:
        //       "Marshmello ft. Bastille - Happier (Official Music Video) Download / Stream Happier ▷ http://marshmello.lnk.to/happier NEW Mello™   by Marshmello gear SHOP ...",
        //     thumbnails: {
        //       default: {
        //         url: "https://i.ytimg.com/vi/m7Bc3pLyij0/default.jpg",
        //         width: 120,
        //         height: 90
        //       },
        //       medium: {
        //         url: "https://i.ytimg.com/vi/m7Bc3pLyij0/mqdefault.jpg",
        //         width: 320,
        //         height: 180
        //       },
        //       high: {
        //         url: "https://i.ytimg.com/vi/m7Bc3pLyij0/hqdefault.jpg",
        //         width: 480,
        //         height: 360
        //       }
        //     },
        //     channelTitle: "Marshmello",
        //     liveBroadcastContent: "none"
        //   }
        // },
        // {
        //   kind: "youtube#searchResult",
        //   etag: '"Bdx4f4ps3xCOOo1WZ91nTLkRZ_c/6YQ1IYX-CQBOTm2JbDaaaxCcWTk"',
        //   id: {
        //     kind: "youtube#video",
        //     videoId: "Dkk9gvTmCXY"
        //   },
        //   snippet: {
        //     publishedAt: "2019-06-17T12:13:12.000Z",
        //     channelId: "UCANLZYMidaCbLQFWXBC95Jg",
        //     title: "Taylor Swift - You Need To Calm Down",
        //     description:
        //       "Music video by Taylor Swift performing “You Need To Calm Down” – off her upcoming new album 'Lover' (out August 23). ▻Download “You Need To Calm ...",
        //     thumbnails: {
        //       default: {
        //         url: "https://i.ytimg.com/vi/Dkk9gvTmCXY/default.jpg",
        //         width: 120,
        //         height: 90
        //       },
        //       medium: {
        //         url: "https://i.ytimg.com/vi/Dkk9gvTmCXY/mqdefault.jpg",
        //         width: 320,
        //         height: 180
        //       },
        //       high: {
        //         url: "https://i.ytimg.com/vi/Dkk9gvTmCXY/hqdefault.jpg",
        //         width: 480,
        //         height: 360
        //       }
        //     },
        //     channelTitle: "TaylorSwiftVEVO",
        //     liveBroadcastContent: "none"
        //   }
        // }
      ],
      video: {},
      showVideoDetail: false,
      hasAPIKey: YOUTUBE_API_KEY !== ""
    };
  },
  methods: {
    async onSearchBarChange(query) {
      try {
        if (this.hasAPIKey) {
          const response = await axios.get(
            "https://www.googleapis.com/youtube/v3/search",
            {
              params: {
                key: YOUTUBE_API_KEY,
                type: "video",
                part: "snippet",
                q: query
              }
            }
          );
          this.videos = response.data.items;
        }
      } catch (error) {
        console.error(error);
      }
    },
    onVideoSelect(video) {
      this.showVideoDetail = true;
      this.video = video;
    },
    onVideoDetailHide() {
      this.showVideoDetail = false;
    }
  }
};
</script>

<style lang="scss">
@import "../node_modules/bulma-scss/bulma.scss";
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
