<!--
 * @FilePath: \src\pages\index.vue
 * @Author: xianghaifeng
 * @Date: 2020-04-13 16:42:23
 * @LastEditors: xianghaifeng
 * @LastEditTime: 2020-04-13 20:37:04
 -->
<template>
  <section class="index">
    <nuxt-child></nuxt-child>
    首页
  </section>
</template>

<script>
export default {
  name: 'Index',
  layout: 'blank',
}
</script>

<style lang="less">
.index {
  position: relative;
  height: calc(
    100vh - @--header-height - @--breadcrumb-height - @--footer-height
  );
}
</style>
