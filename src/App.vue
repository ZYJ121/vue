<template>
    <div id="app">
        <el-container style="height: 100%;">
            <!--<el-header class="header">Header</el-header>-->
            <!--<el-container>-->
                <el-aside width="20%">
                    <el-menu
                        default-active="$route.path"
                        class="el-menu-vertical-demo"
                        router>
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span slot="title">导航一</span>
                            </template>
                            <!--<el-menu-item-group>-->
                                <!--<span slot="title">分组一</span>-->
                                <el-menu-item index="/WaterFollowPage">选项1</el-menu-item>
                                <el-menu-item index="1-2">选项2</el-menu-item>
                            <!--</el-menu-item-group>-->
                            <!--<el-menu-item-group title="分组2">-->
                                <!--<el-menu-item index="1-3">选项3</el-menu-item>-->
                            <!--</el-menu-item-group>-->
                            <!--<el-submenu index="1-4">-->
                                <!--<span slot="title">选项4</span>-->
                                <!--<el-menu-item index="1-4-1">选项1</el-menu-item>-->
                            <!--</el-submenu>-->
                        </el-submenu>
                        <el-menu-item index="2" disabled>
                            <i class="el-icon-menu"></i>
                            <span slot="title">导航二</span>
                        </el-menu-item>
                        <!--<el-menu-item index="3">-->
                            <!--<i class="el-icon-document"></i>-->
                            <!--<span slot="title">导航三</span>-->
                        <!--</el-menu-item>-->
                        <el-menu-item index="/index">
                            <i class="el-icon-setting"></i>
                            <span slot="title">导航四</span>
                        </el-menu-item>
                        <el-menu-item index="/order">
                            <i class="el-icon-setting"></i>
                            <span slot="title">订单</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
            <!--</el-container>-->
                <el-main class="h-100">
                    <router-view></router-view>
                </el-main>

        </el-container>
    </div>
</template>

<script>
    export default {
        name: 'App'
    }
</script>

<style scoped>
    /*#app {*/
    /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
    /*-webkit-font-smoothing: antialiased;*/
    /*-moz-osx-font-smoothing: grayscale;*/
    /*text-align: center;*/
    /*color: #2c3e50;*/
    /*margin-top: 60px;*/
    /*}*/
    #app {
        height: 100vh;
    }

    .el-header {
        /* background-color: #B3C0D1;*/
        color: #333;
        /*text-align: center;
        line-height: 60px;*/
    }

    .el-aside {
        background-color: #D3DCE6;
        /*display: block;*/
        /* position: absolute;
         top: 70px;
         bottom: 0;
         overflow-y: scroll;*/
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        /*text-align: center;
        line-height: 160px;*/
    }

    .header {
        border-bottom: 2px solid #f00;
    }
</style>
