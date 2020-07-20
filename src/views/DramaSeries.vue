<template>
    <div>
        <el-page-header content="详情页面">

        </el-page-header>
        <el-divider></el-divider>
        <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
            <!--            <el-tab-pane label="周一" name="first">-->
            <el-tab-pane v-for="(week,index) in weekString" :key="week" :label="week" :name="week">
                <el-card class="box-card">
                    <!--                    <div slot="header" class="clearfix">-->
                    <!--                        <span>卡片名称</span>-->
                    <!--                        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
                    <!--                    </div>-->
                    <!--                    <div v-for="o in 4" :key="o" class="text item">-->
                    <!--                        {{'列表内容 ' + o }}-->
                    <!--                    </div>-->
                    <div slot="header" class="clearfix">
                        <span>综艺</span>
                    </div>

                    <div class="text item" v-for="(series,index) in tableData" :key="index">
                        <!--                        我独自生活-->
                        {{series.name}}
                    </div>
                </el-card>
            </el-tab-pane>
            <el-tab-pane label="新增" name="second">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="感兴趣的地方">
                        <el-input v-model="form.interest"></el-input>
                    </el-form-item>

                    <el-form-item label="类型">
                        <el-select v-model="form.type" placeholder="请选择类型">
                            <!--                            0国产剧，1韩剧，2日剧，3美剧，4综艺，5动漫，6漫画，7小说-->
<!--                            <el-option value="0">国产剧</el-option>-->
<!--                            <el-option value="1">韩剧</el-option>-->
<!--                            <el-option value="4">国内综艺</el-option>-->
                            <el-option v-for="(seriesType,index) in seriesTypes" :key="index" :value="seriesType.num">{{seriesType.name}}</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="删除">
                        <el-switch v-model="formState"></el-switch>
                    </el-form-item>
                    <el-form-item label="周几更新">
                        <el-checkbox-group v-model="form.renew">
<!--                            <el-checkbox label="1">周一</el-checkbox>-->
<!--                            <el-checkbox label="2">周二</el-checkbox>-->
<!--                            <el-checkbox label="3">周三</el-checkbox>-->
<!--                            <el-checkbox label="4">周四</el-checkbox>-->
<!--                            <el-checkbox label="5">周五</el-checkbox>-->
<!--                            <el-checkbox label="6">周六</el-checkbox>-->
<!--                            v-for="(seriesType,index) in seriesTypes" :key="index"-->
                            <el-checkbox v-for="(w,index) in weekAll" :key="index" :label="w.num" >{{w.name}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>

                    <el-form-item label="评分">
                        <el-select v-model="form.score">
                            <el-option value="0">暂不打分</el-option>
                            <el-option v-for="i in 10" :key="i" :value="i">{{i}}</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="更新状态">
                        <el-radio-group v-model="form.seriesState">
                            <!--                            0已完结，1在更新,2待播-->
                            <el-radio :label="0">已完结</el-radio>
                            <el-radio :label="1">在更新</el-radio>
                            <el-radio :label="2">待播</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="在哪看">
                        <el-radio-group v-model="form.address">
                            <!--                            0爱奇艺，1B站，2韩剧TV，3网站-->
                            <el-radio :label="0">爱奇艺</el-radio>
                            <el-radio :label="1">B站</el-radio>
                            <el-radio :label="2">韩剧TV</el-radio>
                            <el-radio :label="3">网站</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="看过之后的评价">
                        <el-input type="textarea" v-model="form.evaluate"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">立即创建</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="周三" name="third" >
                <el-card class="box-card">
                    <!--                    <div slot="header" class="clearfix">-->
                    <!--                        <span>卡片名称</span>-->
                    <!--                        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
                    <!--                    </div>-->
                    <!--                    <div v-for="o in 4" :key="o" class="text item">-->
                    <!--                        {{'列表内容 ' + o }}-->
                    <!--                    </div>-->
                    <div slot="header" class="clearfix">
                        <span>综艺</span>
                    </div>

                    <div class="text item" v-for="(series,index) in tableData" :key="index">
                        <!--                        我独自生活-->
                        {{series.name}}
                    </div>
                </el-card>
            </el-tab-pane>
            <!--            <el-tab-pane label="周四" name="fourth">定时任务补偿</el-tab-pane>-->
        </el-tabs>
    </div>
</template>

<script>
    export default {
        name: "DramaSeries",
        components: {},
        data() {
            return {
                weekString: [],
                weekAll: [
                    {num: 1, name: "周一"},
                    {num: 2, name: "周二"},
                    {num: 3, name: "周三"},
                    {num: 4, name: "周四"},
                    {num: 5, name: "周五"},
                    {num: 6, name: "周六"},
                    {num: 7, name: "周日"}],
                // "周一","周二","周三","周四","周五","周六","周日",
                //0国产剧，1韩剧，2日剧，3美剧，4国内综艺，5国外综艺，6动漫，7漫画，8小说
                seriesTypes: [{num: 0, name: "国产剧"},
                    {num: 1, name: "韩剧"},
                    {num: 2, name: "日剧"},
                    {num: 3, name: "美剧"},
                    {num: 4, name: "国内综艺"},
                    {num: 5, name: "韩国综艺"},
                    {num: 6, name: "动漫"},
                    {num: 7, name: "漫画"},
                    {num: 8, name: "小说"},
                    {num: 9, name: "其它综艺"},
                ],
                activeName: 'second',
                formState: false,
                form: {
                    id: 0,
                    name: '',
                    type: 0,
                    seriesState: 1,
                    interest: '',
                    address: 0,
                    state: 0,
                    renew: [],
                    score: 0,
                    evaluate: ''
                },
                tableData: [{
                    id: 0,
                    name: '',
                    type: 0,
                    seriesState: 1,
                    interest: '',
                    address: 0,
                    state: 0,
                    renew: [],
                    score: 0,
                    evaluate: ''
                }]
            }
        },
        mounted() {
            this.getWeeks();

        },
        methods: {
            // changeCheckbox(){
            //   console.log("============="+this.from.renew);
            // },
            onSubmit() {
                let that = this;
                if (that.formState) {
                    that.form.state = 1
                } else {
                    that.form.state = 0
                }
                let arr = that.form.renew;
                if (arr.length > 0) {
                    let renew = "";
                    for (let i = 0; i < arr.length; i++) {
                        renew = renew + arr[i] + ",";
                    }
                    that.form.renew = renew.slice(0, renew.length - 1);
                }
                console.log("JSON.stringify(this.form)=="+JSON.stringify(this.form))
                that.form.id=0;
                $.ajax({
                    xhrFields: {
                        withCredentials: true
                    },
                    data: {data: JSON.stringify(that.form)},
                    type: 'post',
                    url: this.$url.API_BASE_URL + "/series",
                    success: function (res) {
                        if (res.code == 0) {
                            // let data = res.data;
                            // that.form = data;
                            // if (data.state = 1) {
                            //     that.formState = true
                            // } else {
                            //     that.formState = false
                            // }
                            // that.form.renew = data.renew.split(",");
                            that.form.renew=that.weekAll;
                            that.$message({
                                showClose: true,
                                message: '添加成功！',
                                type: 'success'
                            });
                        } else {
                            console.log(res.message);
                            that.$message({
                                showClose: true,
                                message: '添加失败！'+res.message,
                                type: 'error'
                            });
                        }
                    }
                });
            },
            handleClick(tab, event) {
                let that = this;
                let week = 0;
                if (tab.name === "周一") {
                    week = 1;
                } else if (tab.name === "周二") {
                    week = 2;
                } else if (tab.name === "周三") {
                    week = 3;
                } else if (tab.name === "周四") {
                    week = 4;
                } else if (tab.name === "周五") {
                    week = 5;
                } else if (tab.name === "周六") {
                    week = 6;
                } else if (tab.name === "周日") {
                    week = 7;
                }
                if(tab.name=="third"){
                    that.getSeriesByState(0);
                }else{
                    that.getForWeek(week);
                }

            },
            getSeriesByState(seriesState) {
                let that = this;
                $.ajax({
                    xhrFields: {
                        withCredentials: true
                    },
                    type: 'get',
                    url: this.$url.API_BASE_URL + "/series/getSeriesByState/"+seriesState,
                    success: function (res) {
                        if (res.code == 0) {
                            that.tableData = res.data;
                        } else {
                            console.log(res.message);
                        }
                    }
                });
            },
            getWeeks() {
                let that = this;
                $.ajax({
                    xhrFields: {
                        withCredentials: true
                    },
                    type: 'get',
                    url: this.$url.API_BASE_URL + "/drama/week",
                    success: function (res) {
                        if (res.code == 0) {
                            that.weekString = res.data;
                            that.getForWeek(that.weekString[0]);
                            let arr = res.data;
                            for (let i = 0; i < arr.length; i++) {
                                if (arr[i] === 1) {
                                    that.weekString[i] = "周一";
                                    continue;
                                } else if (arr[i] === 2) {
                                    that.weekString[i] = "周二";
                                    continue;
                                } else if (arr[i] === 3) {
                                    that.weekString[i] = "周三";
                                    continue;
                                } else if (arr[i] === 4) {
                                    that.weekString[i] = "周四";
                                    continue;
                                } else if (arr[i] === 5) {
                                    that.weekString[i] = "周五";
                                    continue;
                                } else if (arr[i] === 6) {
                                    that.weekString[i] = "周六";
                                    continue;
                                } else if (arr[i] === 7) {
                                    that.weekString[i] = "周日";
                                    continue;
                                }
                            }
                        } else {
                            console.log(res.message);
                        }
                    }
                });
            },
            getForWeek(week) {
                let that = this;
                $.ajax({
                    xhrFields: {
                        withCredentials: true
                    },
                    type: 'get',
                    url: this.$url.API_BASE_URL + "/series/" + week,
                    success: function (res) {
                        if (res.code == 0) {
                            that.tableData = res.data;
                        } else {
                            console.log(res.message);
                        }
                    }
                });
            },

        }
    }
</script>

<style scoped>
    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 480px;
    }
</style>
