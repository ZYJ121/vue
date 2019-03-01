<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="名称">
      <el-input v-model="name"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          user: '',
          password: ''
        },
        name:'',
        password:''
      }
    },
    methods: {
      onSubmit() {
        let that = this;
        console.log(that.name+that.password);
        $.ajax({
          xhrFields: {
            withCredentials: true
          },
          type: 'post',
          url:  "http://localhost:8888/login1",
          data:{
          name: that.name,
            password: that.password
        },
          success: function (res) {
            alert("成功")
            if (res.code === 0 && res.data) {
              console.log(res);
              that.$store.commit('setUser', {userId: res.data.id, userName: res.data.username})
              sessionStorage.setItem("session", res.data);
              that.$router.push({path: `/index`});
            }else {
              that.$alert('用户名或密码不正确', '错误', {
                confirmButtonText: '确定'
              });
            }
          },
          error: function () {
            alert("失败");
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>
