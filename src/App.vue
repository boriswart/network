<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <footer>
    <div class="bg-dark text-light text-center p-4">
      Made with 💖 by CodeWorks
    </div>
  </footer>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    const state = reactive({

    })
    return {
      state,
      appState: computed(() => AppState)

    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

</style>
