<template>
  <div class="col-md-4 account text-left sidebar">
    <img :src="account.coverImg" class="d-flex pl-5 pt-3  rounded" />
    <h1>Welcome</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
    <p>{{ account.bio }}</p>
    <p>Id: {{ account.id }}</p>

    <div class="col-12 card p-3" id="post-form">
      <form class="" onsubmit="state.createPost(event)">
        <div class="form-group">
          <label for="post"></label>
          <input size="55" type="text" id="post" placeholder="post">
        </div>
        <div class="form-group">
          <label for="img" id="imgUrl"></label>
          <input size="55" type="text" id="image" placeholder="url">
        </div>
        <button @click="state.createPost(event)" class="btn btn-primary btn-small float-right" type="submit">
          Post
        </button>
      </form>
    </div>

    <div class="row">
      <div class="col-12">
      </div>
      <!-- <p>{{ account }}</p> -->
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { reactive, computed } from '@vue/runtime-core'
import { postsService } from '../services/PostsService'

export default {
  name: 'Account',
  errors: [],
  setup() {
    const state = reactive({
      createPost(event) {
        postsService.createPost(event)
      }
    })
    return {
      state,
      account: computed(() => AppState.account)
    }
  }
}
</script>
export default {
  name: 'Account',
  setup() {
    createPost(){
    }
    return {
      account: computed(() => AppState.account),
      bio: computed(() =>     AppState.account.bio)

    }
  }

}
<style scoped>
.sidebar{
 height: 100vh;
 background-color: rgba(114, 145, 155, 0.527);
 border: rgb(65, 47, 47);
 border-radius: 5%;
}
img{
  max-width: 400px;
  border: rgb(29, 26, 23);
  border-width: 5px;
  border-radius: 10%;
}
</style>
