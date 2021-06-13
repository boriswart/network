import { api } from '../services/AxiosService.js'
const { logger } = require('../utils/Logger')

const url = 'https://bcw-sandbox.herokuapp.com'
class ProfilesService {
  async getCreatorProfile(id) {
    try {
      logger.log('we Can now build and route the profile page')
      const res = await api.get(url + '/api/profiles/:id')
      logger.log(res.data)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }
}
export const profilesService = new ProfilesService()
