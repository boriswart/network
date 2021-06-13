import { AppState } from '../AppState.js'
import { api } from '../services/AxiosService.js'
import { logger } from '../utils/Logger.js'

const url = 'https://bcw-sandbox.herokuapp.com'

class ProfilesService {
  async getCreatorProfile(id) {
    try {
      let res = null
      res = await api.get(url + '/api/profiles?query=' + id)
      AppState.Profiles = res.data.map(p => p)
      AppState.activeProfile = res.data[0]
      logger.log('before', res.data)
      res = await api.get(url + '/api/profiles/' + res.data._id + '/posts')
      // res = await api.get(url + '/api/profiles/60c4f4753d7e6bdf2fa8f153/posts')
      AppState.posts = res.data.posts
      const initial = res.data.page.split(' of ')
      AppState.isRight = (!((initial[0] >= initial[1])))
      AppState.isLeft = (!((initial[0] <= 1)))
      AppState.page = res.data.page
      logger.log('after', res.data)
      logger.log(AppState.posts)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }
}
export const profilesService = new ProfilesService()
