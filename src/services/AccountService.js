import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account/')
      AppState.account = res.data
    } catch (err) {
      logger.error('problem in AccountService getAccount', err)
    }
  }
}

export const accountService = new AccountService()
