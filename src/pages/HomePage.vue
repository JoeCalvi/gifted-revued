<template>
  <div class="container-fluid">
    <div class="row">
      <div v-for="gift in gifts" class="col-md-4 my-3">
        <GiftCard :gift="gift"/>
      </div>
    </div>
  </div>
</template>

<script>
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { giftsService } from '../services/GiftsService.js'
import { onMounted, computed } from 'vue';
import { AppState } from '../AppState.js';

export default {
  setup() {
    // NOTE PRIVATE
    async function getGifts() {
      try {
        await giftsService.getGifts()
      } catch (error) {
        Pop.error(error)
        logger.log('[getGifts error]', error)
      }
    }

    

    onMounted(() => {
      getGifts()
    })

    return {
      // NOTE PUBLIC
      gifts: computed(() => AppState.gifts)
    }
  
  }
}
</script>

<style scoped lang="scss">
.gift{
  height: 250px;
  width: 250px;
}


</style>
