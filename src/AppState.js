import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  posts: [],
  page: '',
  isLeft: false,
  isRight: false,
  isProfilePost: false,
  activePost: {},
  profiles: [],
  activeProfile: {},
  user: {},
  account: {},
  ads: [],
  url: ''
})
