import { AppState } from '../AppState.js'
import { api } from '../services/AxiosService.js'
import { logger } from '../utils/Logger.js'

const url = 'https://bcw-sandbox.herokuapp.com'

class ProfilesService {
  async getCreatorProfile(id) {
    try {
      let res = await api.get(url + '/api/profiles?query=' + id)
      AppState.Profiles = res.data.map(p => p)
      AppState.activeProfile = res.data[0]
      res = await api.get(url + '/api/profiles/60c4f4753d7e6bdf2fa8f153/posts')
      AppState.posts = res.data.posts
      logger.log(res.data)
      logger.log(AppState.posts)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }
}
export const profilesService = new ProfilesService()
