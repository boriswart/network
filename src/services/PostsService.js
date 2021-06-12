import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
// import { account } from '../AppState.js'

const url = 'https://bcw-sandbox.herokuapp.com'
class PostsService {
  async getPosts() {
    try {
      const res = await api.get(url + '/api/posts')
      const initial = res.data.page.split(' of ')
      AppState.isRight = (!((initial[0] >= initial[1])))
      AppState.isLeft = (!((initial[0] <= 1)))
      logger.log(res.data)
      AppState.posts = res.data.posts
      // logger.log(AppState.posts[0])
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async createPost(event) {
    logger.log('logging event', event)
    const body = 'Testing this awesome post .... Can you hear me out there?'

    const creatorId = 'auth0|60c278001128e7006a3705d7'

    // let account
    // const newPost =
    const imageUrl = 'https://tenor.com/view/horacio-arruda-courbe-tap-mic-dr-horacio-arruda-gif-16724382'

    const newPost = { body: body, imgUrl: imageUrl, creatorId: creatorId }

    const res = await api.post(url + '/api/posts', newPost)

    logger.log('new post', res.data)
  }
}

export const postsService = new PostsService()
