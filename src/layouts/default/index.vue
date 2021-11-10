<template>
  <div class="wrapper">
    <div class="wrapper-con">
      <router-view v-slot="{ Component }">
        <transition>
          <div class="content">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </div>
        </transition>
      </router-view>
    </div>
    <van-tabbar v-model="active" @change="onChange" active-color="#3A4259" inactive-color="#BBBBBB">
      <van-tabbar-item icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'DefaultLayout',
  setup() {
    const routePaths = ['/home', '/my']
    const active = ref(0)

    const router = useRouter()
    const onChange = (index: number) => {
      router.push({ path: routePaths[index] })
    }

    const route = useRoute()
    const index = routePaths.findIndex(path => route.path == path)
    active.value = index

    return {
      active,
      onChange
    }
  }
})
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  overflow: hidden;
  box-sizing: border-box;
  flex-direction: column;
  .wrapper-con {
    flex: 1;
    display: flex;
    // height: 0;
    overflow: auto;
  }
}
</style>
