import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    marchList: [],
    doneList: [{
      'id': 0,
      'info': '1',
      'done': true
    }],
    inputValue: '',
    index: 5,
    pInputValue: ''
  },
  mutations: {
    initMarchList(state, marchList) {
      state.marchList = marchList
    },
    // 为 inputValue传值
    setInputValue(state, val) {
      state.inputValue = val
    },
    // 向未完成列表中添加新任务
    addItem(state) {
      const obj = {
        'id': state.index,
        'info': state.inputValue,
        'done': false,
        'isp': true,
        'isinput': false
      }
      state.inputValue = ''
      state.marchList.push(obj)
      state.index++
    },
    // 根据id删除任务
    removeMarchItemById(state, id) {
      const index = state.marchList.findIndex(x =>
        x.id === id
      )
      state.marchList.splice(index, 1)
    },
    removeDoneItemById(state, id) {
      const index = state.doneList.findIndex(x =>
        x.id === id
      )
      state.doneList.splice(index, 1)
    },
    // 根据id改变事件状态
    changeMarchState(state, params) {
      const index = state.marchList.findIndex(item =>
        item.id === params.id
      )
      const obj = state.marchList[index]
      obj.done = params.status
      state.marchList.splice(index, 1)
      state.doneList.push(obj)
    },
    changeDoneState(state, params) {
      const index = state.doneList.findIndex(item =>
        item.id === params.id
      )
      const obj = state.doneList[index]
      obj.done = params.status
      state.doneList.splice(index, 1)
      state.marchList.push(obj)
    },
    //改变p标签的值
    changeEdit(state, params) {
      const index = state.marchList.findIndex(item =>
        item.id === params.id
      )
      state.marchList[index].isp = !state.marchList[index].isp
      state.marchList[index].isinput = !state.marchList[index].isinput
      state.pInputValue = params.value
    },
    saveEdit(state, params) {
      state.pInputValue = params.value
      const index = state.marchList.findIndex(item =>
        item.id === params.id
      )
      state.marchList[index].info = state.pInputValue
      state.marchList[index].isp = !state.marchList[index].isp
      state.marchList[index].isinput = !state.marchList[index].isinput
    }
  },
  // 异步请求要写在actions中
  actions: {
    getMarchList(context) {
      axios.get('/list.json').then(({ data }) => {
        context.commit('initMarchList', data)
      })
    }
  },
  getters: {
    marchNum(state) {
      return state.marchList.length
    },
    donehNum(state) {
      return state.doneList.length
    }
  },
  modules: {
  }
})
