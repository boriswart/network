<template>
  <div class="col-md-6profile text-left sidebar">
    <img :src="account.coverImg" class="d-flex pl-5 pt-3  rounded" />
    <h4>Welcome to Profile View</h4>
    <p>{{ profile }}</p>

    <!-- <img class="rounded" :src="profile.picture" alt="nofindy" /> -->
    <!-- <p>{{ profile.email }}</p> -->
    <!-- <p>{{ profile.bio }}</p> -->
    <!-- <p>Id: {{ profile.id }}</p> -->
    <div class="row">
      <div class="col-12">
      </div>
      <!-- <p>{{ account }}</p> -->
    </div>
  </div>
  <div class="col-md-6 profile text-center">
    <h1>Welcome to profile posts:</h1>
    <div class="row">
      <div class="col-12 d-flex flex-wrap">
        <profile>
        </profile>
      </div>
      <!-- <p>{{ account }}</p> -->
    </div>
  </div>
</template>

<script>

import { AppState } from '../AppState'
import { reactive, onMounted, computed } from '@vue/runtime-core'
import { profilesService } from '../services/ProfilesService'

export default {
  name: 'Account',
  errors: [],
  setup() {
    const state = reactive({
      profile: AppState.activeProfile,
      // activeProfile: AppState.activeProfile,
      profiles: onMounted(() => profilesService.getCreatorProfile()),
      activeProfileService(id) {
        profilesService.getCreatorProfile()
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
  name: 'Profile',
  setup() {
    return {
      profile: computed(() => AppState.profile),
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
