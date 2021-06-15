<template>
  <div class="col-md-4 account text-left sidebar">
    <img :src="account.coverImg" class="d-flex pl-5 pt-3  rounded" />
    <h1>Welcome</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
    <p>{{ account.bio }}</p>
    <p>Id: {{ account.id }}</p>

    <div class="col-12 card p-3" id="post-form">
      <form @submit.prevent="createPost">
        <div class="w-100 align-items-center">
          <input type="text" class="form-control" placeholder="post.." v-model="state.post">
          <input type="text" class="form-control" placeholder="postURL.." v-model="state.url">
          <button type="submit"
                  class="btn"
                  :disabled="!state.post "
                  :class="{
                    'btn-primary': state.post,
                    'btn-danger': !state.post
                  }"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { reactive, computed } from '@vue/runtime-core'
import { postsService } from '../services/PostsService.js'

export default {
  // errors: [],
  setup() {
    const state = reactive({
      post: '',
      url: ''
    })
    return {
      state,
      account: computed(() => AppState.account),
      createPost() {
        AppState.currentPost = state.post
        AppState.currentPostUrl = state.url
        postsService.createPost()
        state.post = ''
        state.url = ''
      }
    }
  }
}
</script>
<style scoped>
.sidebar{
   height: 100vh;
   background-color: rgba(114, 145, 155, 0.527);
   border: rgb(65, 47, 47);
   border-radius: 5%;
}
img{
   max-width:  400px;
   border-width:  5px;
   border-radius: 10%;
}
</style>
