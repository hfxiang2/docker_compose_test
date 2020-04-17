<template>
  <div>
    <el-row :gutter="20">
      <el-col v-for="o in 8" :span="8" :key="o" class="text item"
        ><div>
          <el-card class="box-card" shadow="hover">
            <div>
              {{ '列表内容 ' + o }}
            </div>
            <a><i class="el-icon-s-order"></i> </a>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.box-card {
  height: 240px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.el-icon-s-order {
  width: 200px;
  height: 160px;
  font-size: 120px;
  text-align: center;
  color: rgb(18, 113, 247);
}
</style>
