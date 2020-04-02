<template>
    <div>
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="code"
                label="订单编号">
            </el-table-column>
            <el-table-column
                prop="custName"
                label="客户名">
            </el-table-column>
            <el-table-column
                prop="amount"
                label="订单金额"
                width="180">
            </el-table-column>

            <el-table-column
                prop="install"
                label="是否安装">
                <template slot-scope="scope">
                    <span v-if="scope.row.install==0">是</span>
                    <span v-else>否</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="state"
                label="订单状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.state==0">已发货</span>
                    <span v-else-if="scope.row.state==1">已结款</span>
                    <span v-else>已完成</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="discribe"
                label="备注">
            </el-table-column>
            <el-table-column
                :formatter="dateFormat"
                prop="orderTime"
                label="下单时间"
                width="180">
            </el-table-column>
            <el-table-column
                :formatter="dateFormat"
                prop="finishTime"
                label="完成时间"
                width="180">
            </el-table-column>
<!--            /**
	 * 客户ID
	 */

	/**
	 * 是否安装（0：不安装，1安装）
	 */
   	@Basic
	@Column(name = "install" )
	private int install;

	/**
	 * 是否紧急（同种状态下，数字越大越紧急）
	 */
   	@Basic
	@Column(name = "urgent" )
	private int urgent;

	/**
	 * 订单状态（0：已打单，1：已发货，2：已结款）
	 */
   	@Basic
	@Column(name = "state" )
	private int state;

	/**
	 * 备注
	 */
   	@Basic
	@Column(name = "describe" )
	private String describe;

	/**
	 * 下单日期
	 */
   	@Basic
	@Column(name = "order_time" )
	private Date orderTime;

	/**
	 * 完成日期
	 */
   	@Basic
	@Column(name = "finish_time" )
	private Date finishTime;

	/**
	 * 创建时间
	 */
   	@Basic
	@Column(name = "create_time" )
	private Date createTime;

	/**
	 * 删除时间
	 */
   	@Basic
	@Column(name = "update_time" )
	private Date updateTime;

	/**
	 * 客户名
	 */
   	@Basic
	@Column(name = "cust_name" )
	private String custName;-->
        </el-table>
    </div>

</template>

<script>
    export default {
        name: "Order",
        components: {},
        data() {
            return {
                tableData:[]
            }
        },
        mounted() {
            this.getAll();
        },
        methods: {
            getAll(){
                let that=this;
                $.ajax({
                    xhrFields: {
                        withCredentials: true
                    },
                    type: 'get',
                    url: this.$url.API_BASE_URL + "/order/getAll",
                    success: function (res) {
                        console.log(res);
                        if(res.code==0){
                            that.tableData=res.data;
                            console.log(that.tableData[0].orderTime)
                        }else{
                            console.log(res.message);
                        }
                    }
                });
            },
            dateFormat(row, column){
                const daterc = row[column.property]
                console.log(daterc)

                if(daterc!=null){
                    // const dateMat= new Date(parseInt(daterc.replace("/Date(", "").replace(")/", ""), 10));

                    const dateMat= new Date(daterc);
                    const year = dateMat.getFullYear();
                    const month = dateMat.getMonth() + 1;
                    const day = dateMat.getDate();
                    const hh = dateMat.getHours();
                    const mm = dateMat.getMinutes();
                    const ss = dateMat.getSeconds();
                    const timeFormat= year + "-" + month + "-" + day + " " + hh + ":" + mm + ":" + ss;
                    return timeFormat;
                }

            }
        }
    }
</script>

<style scoped>

</style>
