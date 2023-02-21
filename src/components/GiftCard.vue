<template>
    <div class="giftcard">
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

export default {

    props: {
        gift: { type: Gift}
    },

    setup(){
        return {}
    }
}
</script>


<style lang="scss" scoped>

.gift{
  height: 250px;
  width: 250px;
}

</style>