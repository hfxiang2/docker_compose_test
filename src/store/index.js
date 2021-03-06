import cookie from 'js-cookie'
import meta from '@/const/meta'

const cookieConfig = {
  get domain() {
    const {hostname} = location
    // 本地环境
    if (!/deepexi\.(com|top)$/.test(hostname)) return hostname
    // 线上环境
    const s = hostname.indexOf('.')
    return hostname.slice(s)
  },
  get expires() {
    const twoHours = 2 * 60 * 60 * 1000
    return new Date(Date.now() + twoHours)
  },
}

const createMenuItem = ({
  name = '',
  id = '',
  pathUrl = '/',
  iconUrl,
  children = [],
}) => {
  return {
    url: pathUrl,
    id: id,
    name: name,
    icon: iconUrl,
    children: children?.length ? children.map(createMenuItem) : null,
  }
}

export const state = () => ({
  // user info
  userId: '',
  username: '',
  avatar: '',

  // meta info
  meta: meta,

  // auth info
  get token() {
    return cookie.get('token', cookieConfig)
  },
  set token(value) {
    cookie.set('token', value, cookieConfig)
  },
  appId: '',
  tenantId: '',
  thirdId: '',

  // menu data
  headerMenu: [
    // {
    //   pathUrl: '/',
    //   id: 1,
    //   name: '首页',
    //   icon: '',
    //   children: null,
    // },
    {
      pathUrl: '/dashboard',
      id: 2,
      name: '平台1',
      icon: '',
      children: null,
    },
    {
      pathUrl: '/home',
      id: 4,
      name: 'Xmesh',
      icon: '',
      children: null,
    },
    // {
    //   pathUrl: '/help',
    //   id: 5,
    //   name: '帮助',
    //   icon: '',
    //   children: null,
    // },
  ],
  siderMenu: [
    {
      pathUrl: '/home',
      id: 6,
      name: '首页',
      icon: '',
      children: null,
    },
    {
      pathUrl: '/ruleChains',
      id: 7,
      name: '规则链库',
      icon: '',
      children: null,
    },
    {
      pathUrl: '/customers',
      id: 8,
      name: '客户',
      icon: '',
      children: null,
    },
    {
      pathUrl: '/assets',
      id: 9,
      name: '资产',
      icon: '',
      children: null,
    },
    {
      pathUrl: '/devices',
      id: 10,
      name: '设备',
      icon: '',
      children: null,
    },
    {
      pathUrl: '/entityViews',
      id: 11,
      name: '实体视图',
      icon: '',
      children: null,
    },
    {
      pathUrl: '/widgets-bundles',
      id: 12,
      name: '部件库',
      icon: '',
      children: null,
    },
    {
      pathUrl: '/dashboards',
      id: 13,
      name: '仪表盘库',
      icon: '',
      children: null,
    },
    {
      pathUrl: '/auditLogs',
      id: 14,
      name: '审计日志',
      icon: '',
      children: null,
    },
    {
      // pathUrl: '/account/staff',
      id: 3,
      name: '账户管理',
      icon: '',
      children: [
        {
          pathUrl: '/account/staff',
          id: 31,
          name: '员工管理',
          icon: '',
          children: null,
        },
        {
          pathUrl: '/account/group',
          id: 32,
          name: '群组管理',
          icon: '',
          children: null,
        },
      ],
    },
  ],
})

export const getters = {
  sideMenu: state => {
    return state.siderMenu.map(createMenuItem)
  },

  mainMenu: state => {
    return state.headerMenu.map(createMenuItem)
  },

  userInfo: state => {
    return {
      name: state.username,
      avatar: state.avatar,
    }
  },
}

export const mutations = {
  logout(s, redirect) {
    cookie.remove('token', cookieConfig)
    Object.assign(s, state())
    const loginUri = redirect
      ? `/login?redirect=${encodeURIComponent(redirect)}`
      : '/login'
    this.$router.replace(loginUri)
  },

  setHeaderMenu(state, payload) {
    state.headerMenu = payload
  },

  setSiderMenu(state, payload) {
    state.siderMenu = payload
  },

  setUserInfo(state, payload = {}) {
    const {params = {}, username, avatar = '', tenantId, token} = payload
    state.username = params.nickname || username
    state.avatar = avatar
    state.tenantId = tenantId
    state.token = token
    state.userId = params.userId
  },
}

export const actions = {
  async login({commit, dispatch}, {body, redirect = '/'}) {
    try {
      const userInfo = await this.$http.login.create(body)
      commit('setUserInfo', userInfo.payload)
      dispatch('getHeaderMenu')
      dispatch('getSiderMenu')
      this.$router.replace(redirect)

      return userInfo
    } catch (error) {
      throw error
    }
  },

  async refresh({commit, dispatch}, token) {
    const userInfo = await this.$http.userInfo.list({
      params: {
        token,
      },
    })
    dispatch('getHeaderMenu')
    dispatch('getSiderMenu')
    commit('setUserInfo', userInfo.payload)
  },

  async getHeaderMenu({commit}) {
    const menus = await this.$http.menus.list({
      params: {
        appId: process.env.APP_ID,
        code: 'main',
      },
    })
    commit('setHeaderMenu', menus.payload)
  },

  async getSiderMenu({commit}) {
    const menus = await this.$http.menus.list({
      params: {
        appId: process.env.APP_ID,
        code: 'account-enterprise',
      },
    })
    commit('setSiderMenu', menus.payload)
  },
}
