import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

const url = 'https://bcw-sandbox.herokuapp.com'
class PostsService {
  async getPosts() {
    try {
      // logger.log('Hello from Service getPosts')
      const res = await api.get(url + '/api/posts')
      logger.log(res.data.posts)
      AppState.posts = res.data.posts
      logger.log(AppState.posts[0])
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }
}

export const postsService = new PostsService()
