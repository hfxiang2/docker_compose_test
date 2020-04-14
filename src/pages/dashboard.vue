<!--
 * @FilePath: \src\pages\dashboard.vue
 * @Author: xianghaifeng
 * @Date: 2020-04-13 16:42:23
 * @LastEditors: xianghaifeng
 * @LastEditTime: 2020-04-13 19:26:26
 -->
<template>
  <div>
    dashboard
    {{ fetchDatas }}
  </div>
</template>

<script>
export default {
  layout: 'blank',
  data() {
    return {
      fetchDatas: [],
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const data = await this.$http.device.list()
      this.fetchDatas = data.payload.list
    },
  },
}
</script>

<style lang="less"></style>
