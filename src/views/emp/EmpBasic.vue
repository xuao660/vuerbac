<template>
  <div style="margin-top: 20px;">
    <div>
      <div style="display: flex;justify-content: space-between">
        <div>
          <el-input placeholder="请输入员工名进行搜索，可以直接回车搜索..." prefix-icon="el-icon-search"
                    clearable
                    @clear="initEmps"
                    style="width: 350px;margin-right: 10px" v-model="keyword"
                    @keydown.enter.native="initEmps" :disabled="showAdvanceSearchView"></el-input>
          <el-button icon="el-icon-search" type="primary" @click="initEmps" :disabled="showAdvanceSearchView">
            搜索
          </el-button>

        </div>

      </div>

    </div>
    <div style="margin-top: 10px">
      <el-table
          :data="emps"
          stripe
          border
          v-loading="loading"
          element-loading-text="正在加载..."
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          style="width: 100%">

        <el-table-column
            prop="name"
            fixed
            align="left"
            label="姓名"
            width="90">
        </el-table-column>
        <el-table-column
            prop="workID"
            label="工号"
            align="left"
            width="85">
        </el-table-column>
        <el-table-column
            prop="gender"
            label="性别"
            align="left"
            width="85">
        </el-table-column>
        <el-table-column
            prop="birthday"
            width="95"
            align="left"
            label="出生日期">
        </el-table-column>
        <el-table-column
            prop="idCard"
            width="150"
            align="left"
            label="身份证号码">
        </el-table-column>
        <el-table-column
            prop="wedlock"
            width="70"
            label="婚姻状况">
        </el-table-column>
        <el-table-column
            prop="email"
            width="180"
            align="left"
            label="电子邮件">
        </el-table-column>
        <el-table-column
            prop="phone"
            width="120"
            align="left"
            label="电话号码">
        </el-table-column>
        <el-table-column
            prop="address"
            width="150"
            align="left"
            label="联系地址">
        </el-table-column>

      </el-table>
      <div style="display: flex;justify-content: flex-end">
        <el-pagination
            background
            @current-change="currentChange"
            @size-change="sizeChange"
            layout="sizes, prev, pager, next, jumper, ->, total, slot"
            :total="total">
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "EmpBasic",
  data() {
    return {
      searchValue: {

      },
      title: '',
      importDataBtnText: '导入数据',
      importDataBtnIcon: 'el-icon-upload2',
      importDataDisabled: false,
      showAdvanceSearchView: false,
      allDeps: [],
      emps: [],
      loading: false,
      popVisible: false,
      popVisible2: false,
      dialogVisible: false,
      total: 0,
      page: 1,
      keyword: '',
      size: 10,

      emp: {
        name: "javaboy",
        gender: "男",
        birthday: "1989-12-31",
        idCard: "610122199001011256",
        wedlock: "已婚",
        email: "laowang@qq.com",
        phone: "18565558897",
        address: "深圳市南山区",
        workID: "00000057",

      },
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      rules: {
        // name: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        // gender: [{required: true, message: '请输入性别', trigger: 'blur'}],
        // birthday: [{required: true, message: '请输入出生日期', trigger: 'blur'}],
        // idCard: [{required: true, message: '请输入身份证号码', trigger: 'blur'}, {
        //   pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
        //   message: '身份证号码格式不正确',
        //   trigger: 'blur'
        // }],
        // wedlock: [{required: true, message: '请输入婚姻状况', trigger: 'blur'}],
        // email: [{required: true, message: '请输入邮箱地址', trigger: 'blur'}, {
        //   type: 'email',
        //   message: '邮箱格式不正确',
        //   trigger: 'blur'
        // }],
        // phone: [{required: true, message: '请输入电话号码', trigger: 'blur'}],
        // address: [{required: true, message: '请输入员工地址', trigger: 'blur'}],
        // workID: [{required: true, message: '请输入工号', trigger: 'blur'}],
      }
    }
  },
  mounted() {
    this.initEmps();
  },
  methods: {

    emptyEmp() {
      this.emp = {
        name: "",
        gender: "",
        birthday: "",
        idCard: "",
        wedlock: "",
        email: "",
        phone: "",
        address: "",
        workID: "",

      }
      this.inputDepName = '';
    },
    sizeChange(currentSize) {
      this.size = currentSize;
      this.initEmps();
    },
    currentChange(currentPage) {
      this.page = currentPage;
      this.initEmps('advanced');
    },

    initEmps(type) {
      this.loading = true;
      let url = '/employee/basic/?page=' + this.page + '&size=' + this.size;
      if (type && type == 'advanced') {

      } else {
        url += "&name=" + this.keyword;
      }
      this.getRequest(url).then(resp => {
        this.loading = false;
        if (resp) {
          this.emps = resp.data;
          this.total = resp.total;
        }
      });
    }
  }
}
</script>

<style>
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all .8s ease;
}

.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */
{
  transform: translateX(10px);
  opacity: 0;
}
</style>
