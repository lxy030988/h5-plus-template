<template>
  <div class="wrapper">
    <router-view />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FullLayout',
  setup() {
    return {}
  }
})
</script>
<style lang="scss" scoped>
.wrapper {
  overflow: auto;
}
</style>
