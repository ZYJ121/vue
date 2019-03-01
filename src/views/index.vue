<template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      prop="date"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    mounted() {
        $.ajax({
          xhrFields: {
            withCredentials: true
          },
          type: 'get',
          // url: process.env.API_BASE_URL + "/home",
          url:  "http://localhost:8888/getUser",
          success: function (res) {
            alert("chengg")
            console.log(res);
          },
          error: function () {
            alert('ddd')
          }
        });
    },
    methods: {
    //   loginSubmit(e) {
    //     var key = e.which || e.keyCode;
    //     if (key === 13) { // 13 is enter
    //       this.submitForm();
    //     }
    //   },
    //   submitForm() {
    //     let that = this;
    //     this.$refs.ruleForm.validate((valid) => {
    //       if (valid) {
    //         $.ajax({
    //           xhrFields: {
    //             withCredentials: true
    //           },
    //           type: 'post',
    //           url: process.env.API_BASE_URL + "/admin_user/login",
    //           data: {
    //             email: that.ruleForm.account,
    //             encryptedPassword: that.ruleForm.pass,
    //             rememberMe: that.ruleForm.rememberMe
    //           },
    //           success: function (res) {
    //             if (res.code === 0 && res.data) {
    //               that.$store.commit('setUser', {userId: res.data.id, userName: res.data.name})
    //               sessionStorage.setItem("session", res.data);
    //               let path = getUrlKey("path");
    //               if (path != null && path !== undefined) {
    //                 that.$router.push({path: path});
    //               } else {
    //                 goToValidPath('Home').then(function (val) {
    //                   that.$router.push({path: `/${val}`});
    //                 })
    //               }
    //             } else {
    //               that.$alert('用户名或密码不正确', '错误', {
    //                 confirmButtonText: '确定'
    //               });
    //             }
    //           }
    //         });
    //       } else {
    //         console.log('error submit!!');
    //         return false;
    //       }
    //     });
    //   },
    }
  }
</script>

<style scoped>

</style>
