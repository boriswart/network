<template>
  <div class="home col-8 d-flex flex-wrap align-items-center justify-content-center">
    <div class="col-12 justify-content-center  align-items-center d-flex">
      <i class="fa fa-angle-left" @click="state.getPreviousPosts()" v-if="state.isLeft" aria-hidden="true"></i>
      {{ state.page }}
      <i class="fa fa-angle-right" @click="state.getNextPosts()" v-if="state.isRight" aria-hidden="true"></i>
    </div>
    <div v-for="(post,i) in posts" :key="i" class="col-4 d-flex my-3  flex-wrap">
      <div class="col-md-12 mb-4 m-auto shadow card my-5">
        <div class="col-md-12 mb-4 m-auto my-5">
          <img v-if="post.imgUrl"
               :src="post.imgUrl"
               class="col-12 img-fluid"
               alt="posterImage"
          />
          <img v-else
               src="//placehold.it/300x200"
               class="col-12 img-fluid"
          />
          <img
            :src="post.creator.picture"
            class="col-4 card-img-top rounded-pill p-1"
            @click="state.getCreatorProfile(creator.id)"
          />
        </div>
        <div class="card-body">
          <p class="card-text">
            {{ post.body }}
          </p>
          <span>{{ post.id }}</span>
        </div>
      </div>
    </div>
  </div>
  <!--      Ads area... Ads display here   ....                      -->
  <div v-if="state.adverts" class="col-4 text-left align-items-center border-2 justify-content-center">
    <h4 class="ml-4">
      Sponsors:
    </h4>
    <div v-for="(ad,i) in ads" :key="i" class="col-12 my-2">
      <div class="col-md-12 mb-4 m-auto shadow card my-5">
        <div class="col-md-12 mb-4 m-auto my-5">
          <h3>
            {{ ad.title }}
          </h3>
          <link rel="stylesheet" href="ad.linkURL">
          <img
            :src="ad.banner"
            class="col-12 card-img-top  block"
            alt="nofindy"
          />
          <img :src="ad.tall"
               class="col-12 card-img-top "
               alt="nofindy2"
          />
        </div> -->
        <div class="card-body">
          <p class="card-text">
            {{ ad.title }}
          </p>
          <span>{{ ad.id }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, computed } from '@vue/runtime-core'
import { postsService } from '../services/PostsService.js'
import { profilesService } from '../services/ProfilesService.js'
import { adsService } from '../services/AdsService.js'
import { AppState } from '../AppState'
// import { logger } from '../utils/Logger'

export default {
  setup() {
    const state = reactive({
      adverts: computed(() => AppState.ads),
      page: computed(() => AppState.page),
      posts: onMounted(() => postsService.getPosts()),
      ads: onMounted(() => adsService.getAds()),
      isLeft: computed(() => AppState.isLeft),
      isRight: computed(() => AppState.isRight),
      getCreatorProfile(id) {
        profilesService.getCreatorProfile(id)
      },
      getNextPosts() {
        postsService.getNextPosts()
      },
      getPreviousPosts() {
        postsService.getPreviousPosts()
      }
    })
    return {
      state,
      AppState: computed(() => AppState),
      posts: computed(() => AppState.posts),
      ads: computed(() => AppState.ads)
    }
  }
}

</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
