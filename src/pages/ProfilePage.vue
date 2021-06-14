<template>
  <div class="col-md-3 profile text-left sidebar">
    <!-- <img :src="account.coverImg" class="d-flex pl-5 pt-3  rounded" /> -->
    <h6>Welcome to {{ state.profile.name }}Profile View</h6>
    <img :src="state.profile.picture" class="img-fluid" />
    <p>{{ state.profile.name }}</p>
    <p>Email: {{ state.profile.email }} </p>
    <div class="row">
      <div class="col-12">
      </div>
      <!-- <p>{{ account }}</p> -->
    </div>
  </div>
  <div class="profile col-md-9 text-center">
    <h1>Welcome to {{ state.profile.name }} profile posts:</h1>
    <div class="row">
      <div class="col-12 d-flex flex-wrap">
        <PostsComponents>
        </PostsComponents>
      </div>
    </div>
  </div>
</template>

<script>

import { AppState } from '../AppState'
import { onMounted, reactive, computed } from '@vue/runtime-core'
import { profilesService } from '../services/ProfilesService'

export default {
  name: 'Profile',
  errors: [],
  setup() {
    const state = reactive({
      profile: AppState.activeProfile,
      activeProfile: AppState.activeProfile,
      profiles: onMounted(() => profilesService.getCreatorProfile(state.profile.name)),
      activeProfileService() {
        profilesService.getCreatorProfile(state.profile.name)
      }
    })
    return {
      state,
      activeProfile: computed(() => AppState.activeProfile)
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
  max-width: 400px;
  border: rgb(29, 26, 23);
  border-width: 5px;
  border-radius: 10%;
}
</style>
