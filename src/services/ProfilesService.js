import { AppState } from '../AppState.js'
import { api } from '../services/AxiosService.js'
import { logger } from '../utils/Logger.js'

// const url = 'https://bcw-sandbox.herokuapp.com'

class ProfilesService {
  async getCreatorProfile(id) {
    try {
      AppState.isProfilePost = true
      let res = null
      res = await api.get('/api/profiles/' + id)
      AppState.Profile = res.data
      AppState.activeProfile = res.data
      // logger.log('before', res.data[0]._id)
      res = await api.get('/api/profiles/' + id + '/posts')
      AppState.url = res.data.older
      AppState.posts = res.data.posts

      const initial = res.data.page.split(' of ')
      AppState.isRight = (!((initial[0] >= initial[1])))
      AppState.isLeft = (!((initial[0] <= 1)))
      AppState.page = res.data.page
    } catch (err) {
      logger.error('something went wrong in the profile request', err)
    }
  }

  async getNextPosts(id) {
    try {
      let res = null
      if (AppState.url !== '') {
        res = await api.get(AppState.url)
      } else {
        res = await api.get('/api/profiles?query=' + id)
      }
      AppState.url = res.data.older
      res = await api.get(res.data.older)
      const initial = res.data.page.split(' of ')
      AppState.isRight = (!((initial[0] >= initial[1])))
      AppState.isLeft = (!((initial[0] <= 1)))
      AppState.page = res.data.page
      // logger.log(res.data)
      AppState.posts = res.data.posts
      // logger.log(AppState.page, AppState.isLeft, AppState.isRight)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async getPreviousPosts(id) {
    try {
      let res = null
      if (AppState.url !== '') {
        res = await api.get(AppState.url)
      } else {
        res = await api.get('/api/profiles?query=' + id)
      }
      AppState.url = res.data.newer
      res = await api.get(res.data.newer)
      const initial = res.data.page.split(' of ')
      AppState.isRight = (!((initial[0] >= initial[1])))
      AppState.isLeft = (!((initial[0] <= 1)))
      AppState.page = res.data.page
      // logger.log(res.data)
      AppState.posts = res.data.posts
      // logger.log(AppState.page, AppState.isLeft, AppState.isRight)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }
}
export const profilesService = new ProfilesService()
