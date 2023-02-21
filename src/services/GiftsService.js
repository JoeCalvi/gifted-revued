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
}

export const giftsService = new GiftsService()