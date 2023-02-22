import { AppState } from "../AppState.js"
import { Gift } from "../models/Gift.js"
import { logger } from "../utils/Logger.js"
import { sandbox_api } from "./AxiosService.js"

class GiftsService {

    async getGifts() {
        const res = await sandbox_api.get('gifts')
        AppState.gifts = res.data.map(g => new Gift(g))
        logger.log('[getting Gifts]', AppState.gifts)
    }

    async openGift(giftId) {
        const res = await sandbox_api.put(`gifts/${giftId}`, { opened: true })
        let oldGiftIndex = AppState.gifts.findIndex(g => g.id == giftId)
        AppState.gifts.splice(oldGiftIndex, 1, new Gift(res.data))
        logger.log(res.data)
    }

    async createGift(giftData) {
        const res = await sandbox_api.post('gifts', giftData)
        let gift = new Gift(res.data)
        AppState.gifts.push(gift)
    }
}

export const giftsService = new GiftsService()