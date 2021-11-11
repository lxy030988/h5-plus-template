<template>
  <div class="personal-data">PersonalData</div>
  <van-button @click="closeWindow">关闭</van-button>
  <div>{{ res }}</div>
</template>

<script lang="ts">
import { closeWindow, registerPullDown } from '@/jsBridge'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'PersonalData',
  setup() {
    const res = ref(null)

    registerPullDown((data: any, cb: any) => {
      console.log('registerPullDown', data, cb)
      res.value = data
    })
    return { closeWindow, res }
  }
})
</script>

<style lang="scss" scoped></style>
