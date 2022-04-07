
<template>
  <div class="all">
    <el-tabs v-model="activeName"  type="card">
      <el-tab-pane label="部门管理" name="depmana"><DepMana></DepMana></el-tab-pane>
      <el-tab-pane label="职位管理" name="posmana"><PosMana></PosMana></el-tab-pane>
      <el-tab-pane label="权限组" name="permissmana"><PermissMana></PermissMana></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import PosMana from '../../components/system/basic/PositionManage'
import DepMana from '../../components/system/basic/DepMana'
import PermissMana from '../../components/system/basic/PermissMana'

export default {
  name: "SysBasic",
  data(){
    return{
      activeName:'posmana'
    }
  },
  components:{
    DepMana,
    PosMana,
    PermissMana
  }
}
</script>

<style scoped>
.all{
  margin-top: 10px;
}
</style>
