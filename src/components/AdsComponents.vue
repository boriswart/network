<template>
  <div v-if="state.adverts" class="ads col-4 text-left align-items-center border-2 justify-content-center">
    <h4 class="ml-4">
      Sponsors:
    </h4>
    <div v-for="(ad,i) in ads" :key="i" class="col-12 my-2">
      <div class="col-md-12 mb-4 m-auto shadow card my-5">
        <div class="col-md-12 mb-4 m-auto my-5">
          <h3>
            {{ ad.title }}
          </h3>
          <link rel="stylesheet" href="ad.linkURL">
          <img
            :src="ad.banner"
            class="col-12 card-img-top  block"
            alt="nofindy"
          />
          <img :src="ad.tall"
               class="col-12 card-img-top "
               alt="nofindy2"
          />
        </div> -->
        <div class="card-body">
          <p class="card-text">
            {{ ad.title }}
          </p>
          <span>{{ ad.id }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, reactive, computed } from '@vue/runtime-core'
import { adsService } from '../services/AdsService.js'
import { AppState } from '../AppState'
// import { logger } from '../utils/Logger'

export default {
  setup() {
    const state = reactive({
      adverts: computed(() => AppState.ads),
      ads: onMounted(() => adsService.getAds())
    })
    return {
      state,
      AppState: computed(() => AppState),
      ads: computed(() => AppState.ads)
    }
  }
}
</script>

<style scoped lang="scss">
.ads{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
