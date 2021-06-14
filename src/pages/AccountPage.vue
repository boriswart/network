<template>
  <div class="col-md-4 account text-left sidebar">
    <img :src="account.coverImg" class="d-flex pl-5 pt-3  rounded" />
    <h1>Welcome</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
    <p>{{ account.bio }}</p>
    <p>Id: {{ account.id }}</p>

    <div class="col-12 card p-3" id="post-form">
      <div class="inputForm">
        <textarea rows="3" class="form-control" v-model="body"></textarea>
        <textarea row="1" class="form-control" v-model="URL"></textarea>
        <br>
        <button @click="state.createPost()" class="btn btn-primary pull-right">
          Create a post
        </button>
      </div>
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
      createPost(event) {
        postsService.createPost()
      }
    })
    return {
      state,
      account: computed(() => AppState.account)
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
