<template>
  <div>
    <van-button type="primary">主要按钮</van-button>
    <div class="test">element 图标</div>
  </div>
  <img alt="Vue logo" src="@/assets/logo.png" />
  <img alt="Vue logo" src="@/assets/logo.png" />
  <img alt="Vue logo" src="@/assets/logo.png" />
  <img alt="Vue logo" src="@/assets/logo.png" />
  <img alt="Vue logo" src="@/assets/logo.png" />
  <img alt="Vue logo" src="../../assets/logo.png" />
  <img src="@/assets/icons/menu/home.svg" alt="" style="width: 20px" />
  <div>
    <van-button type="primary" @click="testVuex"> 测试Vuex </van-button>
    <van-button type="primary" @click="clickMenu"> 测试路由 </van-button>
  </div>
  <Messagea />
  <div class="jc-svg-icon assd s s s s">
    <div>图标测试</div>
    <svg-icon name="home" />
    <svg-icon name="setting" />
  </div>
</template>

<script lang="ts">
import Messagea from '@/components/Messagea.vue'
import { computed, defineComponent, ref } from 'vue'

// import { GlobleState } from '@/store'
// import { useStore } from 'vuex'
import { useMyStore } from '@/hooks'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Home',
  components: {
    Messagea
  },
  setup() {
    // console.log(import.meta.env.VITE_BASE_URL)
    // const store = useStore<GlobleState>()
    // console.log(store.state.home.name)
    const { state, getters, commit, dispatch } = useMyStore()
    // console.log('vuex state', state.user.loading)
    console.log('getters', getters['user/isLogin'])

    function testVuex() {
      console.log('testVuex')
      // commit('user/GET_DATA', false)
      dispatch('user/GET_DATA', false)
      // console.log('vuex state', state.user.loading)
      // setTimeout(() => {
      //   console.log('vuex state', state.user.loading)
      // }, 3000)
    }
    const router = useRouter()
    function clickMenu() {
      router.push({ path: '/setting/plan' })
    }
    return { testVuex, clickMenu }
  }
})
</script>
<style lang="scss" scoped>
.test {
  width: 100px;
}
.jc-svg-icon {
  color: red;
}
.echarts {
  width: 800px;
  height: 600px;
}
::v-deep(.deep-test) {
  color: red;
  .c1 {
    color: wheat;
  }
}
</style>
