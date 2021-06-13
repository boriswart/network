import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
// import { account } from '../AppState.js'

const url = 'https://bcw-sandbox.herokuapp.com'
class PostsService {
  async getPosts() {
    try {
      let res = null
      if (AppState.url !== '') {
        res = await api.get(AppState.url)
      } else {
        res = await api.get(url + '/api/posts')
      }
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

  async getNextPosts() {
    try {
      let res = null
      if (AppState.url !== '') {
        res = await api.get(AppState.url)
      } else {
        res = await api.get(url + '/api/posts')
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

  async getPreviousPosts() {
    try {
      let res = null
      if (AppState.url !== '') {
        res = await api.get(AppState.url)
      } else {
        res = await api.get(url + '/api/posts')
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

  async createPost(event) {
    logger.log('logging event', event)
    // const body = 'Testing this awesome post .... Can you hear me out there?'

    // const creatorId = 'auth0|60c278001128e7006a3705d7'

    // let account
    // const newPost =
    // const imageUrl = 'https://tenor.com/view/horacio-arruda-courbe-tap-mic-dr-horacio-arruda-gif-16724382'

    // const newPost = { body: body, imgUrl: imageUrl, creatorId: creatorId }

    // const res = await api.post(url + '/api/posts', newPost)

    // logger.log('new post', res.data)
  }
}
export const postsService = new PostsService()
