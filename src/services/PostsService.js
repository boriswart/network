import axios from 'axios'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
// import { account } from '../AppState.js'

// const url = 'https://bcw-sandbox.herokuapp.com'

// const url = 'https://localhost:8080'

class PostsService {
  async getPosts() {
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
      logger.log(res.data)
      AppState.posts = res.data.posts
      // logger.log(AppState.page, AppState.isLeft, AppState.isRight)
    } catch (err) {
      logger.error('Problem in PostsService getPosts', err)
    }
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
      logger.error('Problem in PostsService getNextPosts', err)
    }
  }

  async getPreviousPosts() {
    try {
      let res = null
      if (AppState.url && AppState.url !== '') {
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
      logger.error('Problem in PostsService getPrevious Posts', err)
    }
  }

  async createPost() {
    logger.log('logging', AppState.currentPost, AppState.currentPostUrl)
    // const body = 'Testing this awesome post .... Can you hear me out there?'
    // const id = '60c11a2b1adc5b3a61a7e530'
    // const imageUrl = 'https://media1.tenor.com/images/37d0b3187cd0489cb08254d705aeeaad/tenor.gif?itemid=16724382'
    const newPost = { body: AppState.currentPost, imgUrl: AppState.currentPostUrl }

    const res = await api.post('/api/posts/', newPost)
    logger.log('new post', res.data)
  }

  async createSearch() {
    const res = await api.get('/api/posts?body=' + AppState.currentQuery)

    // logger.log('createSearch', res.data, AppState.currentQuery)

    // TODO research example from Movie-Flix"
    // const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=545c6ef058e65396849dfbbf381cbca3&page=${AppState.currentPage}&include_adult=false&query=${AppState.currentQuery}`)

    AppState.posts = res.data.posts.map(p => p)
  }
}
export const postsService = new PostsService()
