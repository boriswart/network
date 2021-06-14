import axios from 'axios'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
// import { account } from '../AppState.js'

// const url = 'https://bcw-sandbox.herokuapp.com'

// const url = 'https://localhost:8080'

class PostsService {
  async getPosts() {
    // logger.log('Testing ')
    try {
      AppState.isProfilePost = false
      let res = null
      // logger.log('Check AppS.url', AppState.url)
      if (AppState.url && AppState.url !== '') {
        res = await axios.get(AppState.url)
      } else {
        res = await api.get('/api/posts')
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

  async createSearch() {
    logger.log('Searchin posts')
  }

  async getNextPosts() {
    try {
      let res = null
      if (AppState.url && AppState.url !== '') {
        res = await api.get(AppState.url)
      } else {
        res = await api.get('/api/posts')
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
        res = await api.get('/api/posts')
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
    logger.log('logging', event)
    // const body = 'Testing this awesome post .... Can you hear me out there?'
    // const id = '60c11a2b1adc5b3a61a7e530'
    // const imageUrl = 'https://media1.tenor.com/images/37d0b3187cd0489cb08254d705aeeaad/tenor.gif?itemid=16724382'
    // const newPost = { body: 'Testing this awesome post .... Can you hear me out there?' }

    //  , img: 'https://media1.tenor.com/images/37d0b3187cd0489cb08254d705aeeaad/tenor.gif?itemid=16724382' }

    // const res = await api.post('/api/posts/', newPost)
    // logger.log('new post', res.data)
  }
}
export const postsService = new PostsService()
