<template>
  <div class="col-12 d-flex">
    <!--      Posts area..Posts display here   --->
    <div class="row">
      <div class="col-12">
        <PostsComponents>
        </PostsComponents>
      </div>
    </div>
    <!--      Ads area... Ads display here   ...-->
    <AdsComponents>
    </AdsComponents>
  </div>
</template>

<script>
import { onMounted, reactive, computed } from '@vue/runtime-core'
import { postsService } from '../services/PostsService.js'
import { profilesService } from '../services/ProfilesService.js'
import { adsService } from '../services/AdsService.js'
import { AppState } from '../AppState'
import { router } from '../router.js'

export default {
  setup() {
    const state = reactive({
      adverts: computed(() => AppState.ads),
      page: computed(() => AppState.page),
      posts: onMounted(() => postsService.getPosts()),
      ads: onMounted(() => adsService.getAds()),
      isLeft: computed(() => AppState.isLeft),
      isRight: computed(() => AppState.isRight),

      async getCreatorProfile(id) {
        await router.push('ProfilePage')
        profilesService.getCreatorProfile(id)
        await router.push('ProfilePage')
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
