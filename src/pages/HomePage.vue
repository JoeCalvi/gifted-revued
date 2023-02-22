<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 d-flex justify-content-center mt-3">
        <form @submit.prevent="createGift()">
          <span class="me-3">
            <label for="tag">Tag</label>
            <input v-model="editable.tag" required type="text" class="form-control mb-2">
            <label for="imgUrl">Img URL</label>
            <input v-model="editable.url" required type="text" class="form-control mb-2">
            <div class="text-end">
              <button class="btn btn-outline-dark" type="submit">Add Gift</button>
            </div>
          </span>
        </form>
      </div>
    </div>
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
import { onMounted, computed, ref } from 'vue';
import { AppState } from '../AppState.js';

export default {
  setup() {
    // NOTE PRIVATE
    const editable = ref({});
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
      editable,
      gifts: computed(() => AppState.gifts),

      async createGift() {
        try {
          let giftData = editable.value
          await giftsService.createGift(giftData);
          editable.value = {};
        } catch (error) {
          logger.log('[createGift error]', error)
          Pop.error(error)
        }
      }
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
