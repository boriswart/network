<template>
  <div class="home col-12 d-flex flex-wrap align-items-center justify-content-center">
    <div v-for="(post,i) in posts" :key="i" class="col-12 d-flex my-3  flex-wrap">
      <div class="col-md-4 mb-4 m-auto shadow card my-5">
        <img :src="post.creator.picture" class="col-4 card-img-top rounded-pill p-2" alt="porterImage">
        <div class="card-body">
          <p class="card-text">
            {{ post.body }}
          </p>
          <span>{{ post.id }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, computed } from '@vue/runtime-core'
import { postsService } from '../services/PostsService.js'
import { AppState } from '../AppState'
export default {
  setup() {
    const state = reactive({})
    onMounted(() => postsService.getPosts())
    return {
      state,
      AppState: computed(() => AppState),
      posts: computed(() => AppState.posts)
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
