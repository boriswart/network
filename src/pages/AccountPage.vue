<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { reactive, computed } from '@vue/runtime-core'

export default {
  name: 'Account',
  errors: [],
  setup() {
    const state = reactive({})
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
    return {
      account: computed(() => AppState.account)

<style scoped>
img {
  max-width: 100px;
}
</style>
