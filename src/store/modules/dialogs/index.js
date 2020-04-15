import * as TYPES from './types'

const namespaced = true;

const state = () => ({
  dialogs: [
    {
      id: 1,
      subject: 'Простой запрос',
      created: '2019-08-01 23:59',
      parts: [
        {
          id: 1,
          author: 'vasya',
          text: 'Привет, как дела?',
          created: '2019-08-01 23:59'
        },
        {
          id: 2,
          author: 'petya',
          created: '2019-08-02 01:20',
          text: 'Привет, все хорошо, спасибо!'
        },
        {
          id: 3,
          author: 'petya',
          created: '2019-08-02 05:20',
          text: 'А у тебя?'
        }
      ]
    },
    {
      id: 2,
      subject: 'Вопрос по домену',
      created: '2016-03-02 14:19',
      parts: [
        {
          id: 1,
          author: 'petr',
          created: '2019-08-06 12:20',
          text: 'Здравствуйте, тут есть кто-нибудь?'
        },
        {
          id: 2,
          author: 'vasya',
          created: '2019-08-06 12:34',
          text: 'Да, я вас слушаю!'
        },
        {
          id: 3,
          author: 'petr',
          created: '2019-08-06 12:38',
          text: 'Помогите мне настроить домен!'
        }
      ]
    }
  ],
  messages: null
})

const actions = {
  async getMessages({ commit, state }, data) {
    try {
      const response = await new Promise(res => {
        setTimeout(() => {
          commit(TYPES.SET_MESSAGES, state.dialogs.find(item => +item.id === +data.id).parts)
          res()
        }, 3000)
      })

      return { messages: response }
    } catch (e) {
      return e
    }
  },

  async sendMessage({ commit }, data) {
    try {
      const response = await new Promise(res => {
        setTimeout(() => {
          commit(TYPES.ADD_MESSAGE, data.mess)
          res()
        }, 1000)
      })

      return response
    } catch (e) {
      return e
    }
  }
}

const mutations = {
  [TYPES.SET_MESSAGES_LOADER](state, payload) {
    state.messagesLoader = payload
  },

  [TYPES.SET_MESSAGES](state, payload) {
    state.messages = payload
  },

  [TYPES.RESET_MESSAGES](state, payload) {
    state.messages = null
  },

  [TYPES.ADD_MESSAGE](state, payload) {
    state.messages.push(payload)
  }
}

const getters = {}

export default {
  namespaced,
  actions,
  state,
  mutations,
  getters
}
