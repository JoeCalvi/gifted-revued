<template>
    <div class="giftcard selectable" @click="openGift(gift.id)">
        <div class="card border-dark">
            <div v-if="gift.opened == false">
                <img src="https://www.pngitem.com/pimgs/m/215-2152100_mystery-box-png-transparent-background-gift-box-png.png" 
                class="gift rounded mb-2" alt="">
            </div>
            <div v-else="gift.opened == true">
                <img :src="gift.url" class="gift rounded mb-2" alt="">
            </div>
            <div class="text-center">
                <p>{{ gift.tag }}</p>
            </div>
        </div>
    </div>
</template>


<script>
import { Gift } from '../models/Gift.js'
import { giftsService } from '../services/GiftsService.js'
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop.js'
import { onMounted, computed } from 'vue';

export default {

    props: {
        gift: { type: Gift}
    },

    setup(){

        return {

            gifts: computed(() => AppState.gifts),

            async openGift(giftId) {
              try {
                await giftsService.openGift(giftId)
              } catch (error) {
                Pop.error(error)
                logger.log('[openGift error]', error)
              }
            }        
        }
    }
}
</script>


<style lang="scss" scoped>

.gift{
  height: 250px;
  width: 250px;
}

</style>