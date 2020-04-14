<!--
 * @FilePath: \src\pages\account\staff.vue
 * @Author: xianghaifeng
 * @Date: 2020-04-13 16:42:23
 * @LastEditors: xianghaifeng
 * @LastEditTime: 2020-04-14 09:48:58
 -->
<template>
  <div>
    <el-data-table v-bind="$data" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: 'http://121.40.62.190:8080/mock/39/Eagle_eye/device/searchDevice',
      dataPath: 'payload.list',
      columns: [
        {prop: 'id', label: '设备id', align: 'center'},
        {prop: 'name', label: '设备名称'},
        {prop: 'ip', label: 'ip地址'},
      ],
      form: [
        {
          type: 'input',
          id: 'name',
          label: '设备名称',
          rules: [
            {
              required: true,
              message: '请输入设备名称',
              trigger: 'blur',
              transform: v => v && v.trim(),
            },
          ],
          el: {placeholder: '请输入设备名称'},
        },
        {
          type: 'input',
          id: 'id',
          label: '设备id',
          rules: [
            {
              required: true,
              message: '请输入设备id',
              trigger: 'blur',
            },
          ],
          el: {placeholder: '请输入设备id'},
        },
        {
          type: 'input',
          id: 'ip',
          label: 'ip地址',
          rules: [
            {
              required: true,
              message: '请输入设备ip',
              trigger: 'blur',
            },
          ],
          el: {placeholder: '请输入设备ip'},
        },
      ],
      searchForm: [
        {
          el: {placeholder: '请输入'},
          label: '设备id',
          id: 'id',
          type: 'input',
        },
        {
          el: {placeholder: '请输入'},
          label: '设备名称',
          id: 'name',
          type: 'input',
        },
        {
          el: {placeholder: '请输入'},
          label: 'ip地址',
          id: 'ip',
          type: 'input',
        },
      ],
      hasView: true,
    }
  },
}
</script>

<style lang="less"></style>
