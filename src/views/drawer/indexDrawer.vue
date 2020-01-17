<template>
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="导航栏名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="跳转地址">
            <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item label="是否显示">
            <el-switch
                v-model="value"
                active-color="#13ce66"
                inactive-color="#ff4949">
            </el-switch>
        </el-form-item>
        <el-form-item label="图标">
            <el-input v-model="form.icon"></el-input>
        </el-form-item>
        <el-form-item label="分组">
            <el-select v-model="form.parentId" placeholder="请选择">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: "indexDrawer",
        data() {
            return {
                form: {
                    name: '',
                    url: '',
                    state:1,
                    icon:'el-icon-menu',
                    parentId:0,
                },
                value:true,
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],

                // drawerState: false,
                // direction: 'rtl',
            }
        },
        mounted() {
            if (this.inner) {
                let box = this.$el.parentNode
                box.style.position = 'relative'
            }
        },
        methods: {
            onSubmit() {
                if(this.value){
                    this.form.state=1
                }else{
                    this.form.state=0
                }
                $.ajax({
                    xhrFields: {
                        withCredentials: true
                    },
                    type: 'post',
                    // url: process.env.API_BASE_URL + "/admin_user/login",
                    url: "http://localhost:1211/menu/getAll",
                    data: {data: JSON.stringify(this.form)},
                    success: function (res) {
                        console.log(res);
                    }
                });
            },
            dialogCancel() {
                var that = this;
                $('.content').animate({right: '-80%'}, 'fast');
                $('.dialog').animate({backgroundColor: 'rgba(0,0,0,0)'}, 'fast', function () {
                    that.$emit('sonFun', false)
                });
            }
        }
    }
</script>

<style scoped>
    .dialog {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        right: 0;
        margin: 0;
        background: rgba(0, 0, 0, 0);
        overflow: hidden;
    }

    .content {
        width: 80%;
        height: 100%;
        background: #ffffff;
        position: absolute;
        right: -80%;
    }
</style>
