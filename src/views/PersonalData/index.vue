<template>
  <div class="personal-data">PersonalData</div>
  <!-- <div>{{ WebViewJavascriptBridge }}</div> -->
  <van-button @click="closeWindow">关闭</van-button>
  <div>{{ res }}</div>
</template>

<script lang="ts">
import { init, closeWindow, registerHandler } from '@/jsBridge'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'PersonalData',
  setup() {
    // console.log('window.WebViewJavascriptBridge', window.WebViewJavascriptBridge)

    // const WebViewJavascriptBridge = window.WebViewJavascriptBridge
    const res = ref(null)
    init()
    registerHandler('pullDown', (data, cb) => {
      console.log('111PersonalData', data, cb)
      res.value = data
    })
    return { closeWindow, res }
  }
})
</script>

<style lang="scss" scoped></style>
