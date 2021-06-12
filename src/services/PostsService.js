import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
// import { account } from '../AppState.js'

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

  async createPost(newPost) {
    // let imageUrl ='https://tenor.com/view/horacio-arruda-courbe-tap-mic-dr-horacio-arruda-gif-16724382'
    // let body = 'Testing this awesome post .... Can you hear me out there?'
    // let account
    // const newPost =
    const res = await api.post('api/posts', newPost)
    logger.log('new postt', res.data)
  }
}

export const postsService = new PostsService()
