<template>
  <div class="jc-login-wrap">
    <div class="jc-login-contain">
      <h1>vue3-element-template</h1>
      <div class="jc-login-info">
        <van-cell-group inset>
          <van-field v-model="form.account" type="tel" label="手机号" />
          <van-field v-model="form.userPwd" type="password" label="密码" />
          <van-button type="primary" block>立即登录</van-button>
        </van-cell-group>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRaw } from 'vue'
import { getUserInfo } from '@/api/user'
import { Md5 } from 'ts-md5/dist/md5'
import { useMyStore } from '@/hooks'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Login',
  setup() {
    const form = reactive({
      account: '',
      userPwd: ''
    })
    const { commit } = useMyStore()
    const router = useRouter()

    const onSubmit = async () => {
      try {
        const { account, userPwd } = toRaw(form)
        console.log(toRaw(form))
        const res = await getUserInfo({
          account,
          userPwd: Md5.hashStr(userPwd)
        })
        commit('user/SET_USER', res)
        router.push({ path: '/' })
      } catch (error) {
        console.error(error)
      }
    }
    return {
      form,
      onSubmit
    }
  }
})
</script>

<style scoped lang="scss">
.jc-login-wrap {
}
</style>
