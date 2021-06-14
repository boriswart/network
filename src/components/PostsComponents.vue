<template>
  <div class="posts col-12 d-flex flex-wrap align-items-center justify-content-center">
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
            class="col-12 card-img-top rounded-pill p-1"
            @click="state.getCreatorProfile(post.creator.name)"
          />
        </div>
        <div class="card-body">
          <p class="card-text">
            {{ post.body }}
          </p>
          <span>{{ post.creator.id }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, reactive, computed } from '@vue/runtime-core'
import { postsService } from '../services/PostsService.js'
import { profilesService } from '../services/ProfilesService.js'
import { AppState } from '../AppState'
// import { logger } from '../utils/Logger'

export default {
  setup() {
    const state = reactive({
      page: computed(() => AppState.page),
      isProfilePost: computed(() => AppState.isProfilePost),
      isLeft: computed(() => AppState.isLeft),
      isRight: computed(() => AppState.isRight),
      getposts: onMounted(() => state.getPosts()),
      getPosts(id) {
        if (state.isProfilePost) {
          profilesService.getCreatorProfile(id)
        } else {
          postsService.getPosts()
        }
      },
      getNextPosts() {
        if (state.isProfilePost) {
          profilesService.getNextPosts()
        } else {
          postsService.getNextPosts()
        }
      },
      getPreviousPosts() {
        if (state.isProfilePost) {
          profilesService.getPreviousPosts()
        } else {
          postsService.getPreviousPosts()
        }
      },
      getCreatorProfile(id) {
        profilesService.getCreatorProfile(id)
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
.posts{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
