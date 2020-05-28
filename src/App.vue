<template>
  <div>
    <header>
      <section>
        <label for>不 &nbsp; 已</label>
        <input
          type="text"
          placeholder="君子博学而日参省乎己  则知明而行无过矣"
          class="enter"
          :value="inputValue"
          @input="handelInputChange"
          @keyup.enter="addItem"
        />
        <button @click="addItem">添加</button>
        <span>君子曰:学不可以已</span>
      </section>
    </header>
    <section>
      <div class="left">
        <h1>
          正 在 进 行
          <span id="todocount">{{marchNum}}</span>
        </h1>
        <ol class="demo-box" v-for="(item) in marchList" :key="item.id">
          <li>
            <input
              type="checkbox"
              :checked="item.done"
              @change="(e)=>{changeMarchState(e,item.id)}"
              name
              id
            />
            <p>{{item.info}}</p>
            <a href="javascript:;">
              <span @click="removeMarchItemById(item.id)"></span>
            </a>
          </li>
        </ol>
      </div>
      <div class="right">
        <h1>
          已 经 完 成
          <span id="donecount">{{donehNum}}</span>
        </h1>
        <ul v-for="(item) in doneList" :key="item.id">
          <li>
            <input
              type="checkbox"
              :checked="item.done"
              name
              id
              @change="(e)=>{changeDoneState(e,item.id)}"
            />
            <p>{{item.info}}</p>
            <a href="javascript:;">
              <span @click="removeDoneItemById(item.id)"></span>
            </a>
          </li>
        </ul>
      </div>
    </section>
    <footer>
      <p>Create By Sprout © 2020 ToDoSth.cn</p>
    </footer>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  data() {
    return {
      inputStyle: {
        display: 'none'
      }
    }
  },
  created() {
    this.$store.dispatch('getMarchList')
  },
  computed: {
    ...mapState(['marchList', 'doneList', 'inputValue']),
    ...mapGetters(['marchNum', 'donehNum'])
  },
  methods: {
    handelInputChange(e) {
      // console.log(e.target.value)
      this.$store.commit('setInputValue', e.target.value)
    },
    // 添加事件
    addItem() {
      if (this.inputValue.trim() === '') {
        alert('不能无所事事哦')
      } else {
        this.$store.commit('addItem')
      }
    },
    // 删除未完成事件
    removeMarchItemById(id) {
      this.$store.commit('removeMarchItemById', id)
    },
    //删除已完成事件
    removeDoneItemById(id) {
      this.$store.commit('removeDoneItemById', id)
    },
    // 复选框状态改变事件
    changeMarchState(e, id) {
      // console.log(e.target.checked, id)
      // 传多个值时必须使用对象打包到一起
      const params = {
        status: e.target.checked,
        id: id
      }
      this.$store.commit('changeMarchState', params)
    },
    changeDoneState(e, id) {
      const params = {
        status: e.target.checked,
        id: id
      }
      this.$store.commit('changeDoneState', params)
    }
    // 改变p标签内容
  }
}
</script>

<style scoped>
</style>
