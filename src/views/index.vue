<template>
    <div>
        <!--<el-collapse accordion>-->
            <!--<el-collapse-item>-->
                <!--<template slot="title">-->
                    <!--一致性 Consistency<i class="header-icon el-icon-info"></i>-->
                <!--</template>-->
                <!--<div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>-->
                <!--<div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>-->
            <!--</el-collapse-item>-->
            <!--<el-collapse-item title="反馈 Feedback">-->
                <!--<div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>-->
                <!--<div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>-->
            <!--</el-collapse-item>-->
            <!--<el-collapse-item title="效率 Efficiency">-->
                <!--<div>简化流程：设计简洁直观的操作流程；</div>-->
                <!--<div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>-->
                <!--<div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>-->
            <!--</el-collapse-item>-->
            <!--<el-collapse-item title="可控 Controllability">-->
                <!--<div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>-->
                <!--<div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>-->
            <!--</el-collapse-item>-->
        <!--</el-collapse>-->

        <el-menu
            default-active="$route.path"
            class="el-menu-vertical-demo"
            router >
            <el-submenu  v-for="(data,index) in datas" index="data.url" >
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">{{data.name}}</span>
                </template>
                <el-menu-item v-for="(child,index) in data.childs" index="child.url">{{child.name}}</el-menu-item>
                <!--<el-menu-item index="1-2">选项2</el-menu-item>-->
            </el-submenu>

            <!--<el-menu-item index="2" disabled>-->
                <!--<i class="el-icon-menu"></i>-->
                <!--<span slot="title">导航二</span>-->
            <!--</el-menu-item>-->
            <!--<el-menu-item index="3">-->
            <!--<i class="el-icon-document"></i>-->
            <!--<span slot="title">导航三</span>-->
            <!--</el-menu-item>-->
            <!--<el-menu-item index="/index">-->
                <!--<i class="el-icon-setting"></i>-->
                <!--<span slot="title">导航四</span>-->
            <!--</el-menu-item>-->
        </el-menu>
        <el-button type="primary" @click="onSubmit">新建</el-button>
        <!--<el-button type="primary" @click="save">新建</el-button>-->
        <!--<index-drawer v-if="drawerState" v-on:drawerState="indexDrawer"></index-drawer>-->

    </div>
</template>

<script>
    import indexDrawer from './drawer/indexDrawer'

    export default {
        components: {indexDrawer},
        data() {
            return {
                datas:[{
                    name: '',
                    url: '',
                    icon: 'el-icon-menu',
                    childs:[{
                        name: '',
                        url: '',
                        icon: 'el-icon-menu',
                    }]
                }],
                form: {
                    name: '',
                    url: '',
                    state: 1,
                    icon: 'el-icon-menu',
                    parentId: 0,
                },
                value: true,
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
            console.log("开始请求");
            this.onSubmit();
            // $.ajax({
            //     xhrFields: {
            //         withCredentials: true
            //     },
            //     type: 'get',
            //     url: process.env.API_BASE_URL + "/menu/getAll",
            //     // url: "http://localhost:1211/menu/getAll",
            //     // data: {data: JSON.stringify(this.form)},
            //     success: function (res) {
            //         console.log(res);
            //     }
            // });
        },
        methods: {
            // save() {
            //     this.drawerState = true;
            // },
            // sonFun: function () {
            //     this.drawerState = false;
            // },
            // handleClose(done) {
            //     this.$confirm('确认关闭？')
            //         .then(_ => {
            //             done();
            //         })
            //         .catch(_ => {
            //         });
            // },
            onSubmit() {
                let url = this.$url.API_BASE_URL + "/menu/getAll";
                $.ajax({
                    xhrFields: {
                        withCredentials: true
                    },
                    type: 'get',
                    url: url,
                    // data: {data: JSON.stringify(this.form)},
                    success: function (res) {
                        console.log(res);
                        this.datas=res;
                    }
                });
            },
        }
    }
</script>

<style scoped>

</style>
