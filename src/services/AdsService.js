import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

const url = 'https://bcw-sandbox.herokuapp.com'
class AdsService {
  async getAds() {
    try {
      // logger.log('Hello from Ads Service')
      const res = await api.get(url + '/api/ads')
      // logger.log(res.data)
      AppState.ads = res.data
      // logger.log(AppState.ads)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }
}
export const adsService = new AdsService()
