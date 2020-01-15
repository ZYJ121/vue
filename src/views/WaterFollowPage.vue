<template>
  <div class="main">
    <el-container>
      <el-aside class="sidebar-container">
        <!--<sidebar :activeIndex="activeIndex" :activeGroup="activeGroup"></sidebar>-->
      </el-aside>
      <el-main class="page-able">
        <div class="container-water-fall">
          <waterfall :col='col' :width="cellWidth" :gutterWidth="gutterWidth" :data="evaluationData"
                     @loadmore="loadmore" @scroll="scroll">
            <template>
              <div class="cell-item" v-for="(item,index) in evaluationData">
                <div class="item-body">
                  <el-card :body-style="{ padding: '0px' }">
                    <div slot="header" class="header">
                      <span>{{item.id}}-{{item.goodName}}</span>
                      <div style="display: inline;">
                        <el-button v-if="item.state != null && item.state===0" type="primary" disabled size="mini"
                                   round>正常
                        </el-button>
                        <el-button v-else-if="item.state != null && item.state===1" type="danger" disabled size="mini"
                                   round>用户删除
                        </el-button>
                        <el-button v-else-if="item.state != null && item.state===2" type="danger" disabled size="mini"
                                   round>管理员删除（都不可见）
                        </el-button>
                        <el-button v-else-if="item.state != null && item.state===3" type="danger" disabled size="mini"
                                   round>管理员删除（单用户可见）
                        </el-button>
                        <el-button v-else type="warning" disabled plain size="mini" round>待审核</el-button>
                      </div>
                    </div>
                    <div class="body" @click="details(item.id)">
                      <div class="dimension">
                        <span> 总评价：</span>
                        <el-rate
                          v-model="item.totalScore"
                          disabled
                          show-text
                          :texts="texts"
                          text-color="#ff9900"
                          style="display: inline">
                        </el-rate>
                      </div>
                      <div class="content" v-if="item.content != null && item.content != ''">{{item.content}}</div>
                      <div style="padding: 5%;">
                        <i class="fa fa-comment-o " aria-hidden="true" style="margin-right: 5%;cursor: pointer"
                           @click="clickComment(item.id,$event)">{{item.commentCount}}</i>
                        <i class="fa fa-thumbs-o-up " aria-hidden="true" style="cursor: pointer"
                           @click="clickLike(item.id,$event)">{{item.favoritesCount}}
                        </i>
                        <el-dropdown style="vertical-align: middle; cursor: pointer;padding-left: 6px;">
                  <span class="el-dropdown-link">
                      <i class="el-icon-more el-icon--right"></i>
                  </span>
                          <el-dropdown-menu slot="dropdown" style="padding-left: 0">
                            <el-dropdown-item @click.native="batchLike(item.id)">批量点赞</el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                        <span style="margin-right: 5%;display: inline;">C币：{{item.obtainCb}}</span>
                        <i class="fa fa-picture-o" aria-hidden="true"
                           v-if="item.pictures != null && item.pictures != ''"
                           style="color: brown;">{{item.pictures.split(';').length}}</i>
                      </div>
                      <div style="margin-left: 5%;    font-weight: 700;">
                        <span>{{item.userName}}</span>
                        <div>创建时间：{{ item.createdAt}}</div>
                        <div v-if="item.deletedAt != null">删除时间：{{ item.deletedAt }}</div>

                      </div>
                    </div>


                    <div style="margin: 4% 10% 5% 12%;text-align: -webkit-right;">
                      <el-button type="primary" size="small" title="置顶" circle
                                 icon="fa fa-arrow-up" style="margin-right: 5%"
                                 @click="sort(item.id) "></el-button>

                      <el-button type="success" size="small" title="通过" circle
                                 icon="el-icon-check" v-if="item.state != 0"
                                 @click="examine(false);id = item.id ;examineState = 0"></el-button>
                      <el-button type="warning" size="small" title="删除仅用户可见" circle
                                 icon="el-icon-close" v-if="item.state != 3"
                                 @click="dialogFormVisible = true;id = item.id ;examineState = 3"></el-button>
                      <el-button type="danger" size="small" title="删除不可见" circle
                                 icon="el-icon-delete" v-if="item.state != 2"
                                 @click="dialogFormVisible = true;id = item.id;examineState = 2"></el-button>

                    </div>
                  </el-card>

                </div>

              </div>
            </template>
          </waterfall>

        </div>
      </el-main>
    </el-container>
  </div>

</template>

<script>

  export default {
    components: {},
    data() {
      return {

        col: 4,


        robotCount: 1,
        hour: 1,
        batchLikeVisible: false,
        selectedRobot: {id: 0, avatar: null, telephone: null, nickname: null},
        dialogComment: false,//评论弹窗控制
        dialogEvaluation: false,//评价详情弹窗控制
        editId: 0,
        editItemType: 3,
        activeIndex: '64',//菜单高亮
        activeGroup: ['3'],//展开的子导航
        texts: ['很差', '一般', '不错', '满意', '超赞'],

        evaluationData: [{
          "id": 4,
          "goodsOrderItemId": 43613,
          "skuId": 2,
          "userId": 209051,
          "state": 0,
          "content": "很棒，很棒，很棒哦！我最满意的一次购物体验我最满意的一次购物体验我最满意的一次购物体验我最满意的一次购物体验我最满意的一次购物体验我最满意的一次购物体验我最满意的一次购物体验我最满意的一次购物体验我最满意的一次购物体验我最满意的一次购物体验",
          "pictures": null,
          "totalScore": 4.0,
          "dimensionOne": 3.0,
          "dimensionTwo": 5.0,
          "dimensionThree": 5.0,
          "obtainCb": 15,
          "favoritesCount": 3,
          "commentCount": 1,
          "deletedAt": 1559274983000,
          "createdAt": 1558596924000,
          "dimensionName": "[\"质量\",\"口感\",\"物流\"]",
          "userName": "liaotianhua",
          "goodName": "美国ON 乳清蛋白粉 5磅 香草味",
          "selectTags": [{"id": 38, "name": "质量赞", "type": "评价标签", "priority": 0}, {
            "id": 39,
            "name": "效果显著",
            "type": "评价标签",
            "priority": 0
          }, {"id": 41, "name": "口感细腻", "type": "评价标签", "priority": 0}, {
            "id": 42,
            "name": "味道适中",
            "type": "评价标签",
            "priority": 0
          }, {"id": 47, "name": "全部", "type": "评价标签", "priority": 10}, {
            "id": 50,
            "name": "好评",
            "type": "评价标签",
            "priority": 7
          }]
        }, {
          "id": 1,
          "goodsOrderItemId": 44530,
          "skuId": 2,
          "userId": 10,
          "state": 0,
          "content": "很棒，很棒，很棒哦！ ",
          "pictures": "http://7xoin6.com1.z0.glb.clouddn.com/1558431270539.jpg?w=1080&h=1080;http://7xoin6.com1.z0.glb.clouddn.com/1558431287733.jpg?w=1080&h=1080",
          "totalScore": 4.0,
          "dimensionOne": 4.0,
          "dimensionTwo": 3.0,
          "dimensionThree": 5.0,
          "obtainCb": 35,
          "favoritesCount": 0,
          "commentCount": 4,
          "deletedAt": null,
          "createdAt": 1558434982000,
          "dimensionName": "[\"质量\",\"口感\",\"物流\"]",
          "userName": "\uD83D\uDC49sir\uD83D\uDC8E",
          "goodName": "美国ON 乳清蛋白粉 5磅 香草味",
          "selectTags": [{"id": 38, "name": "质量赞", "type": "评价标签", "priority": 0}, {
            "id": 39,
            "name": "效果显著",
            "type": "评价标签",
            "priority": 0
          }, {"id": 43, "name": "物流态度好", "type": "评价标签", "priority": 0}, {
            "id": 47,
            "name": "全部",
            "type": "评价标签",
            "priority": 10
          }, {"id": 49, "name": "有图", "type": "评价标签", "priority": 8}, {
            "id": 50,
            "name": "好评",
            "type": "评价标签",
            "priority": 7
          }]
        }, {
          "id": 2,
          "goodsOrderItemId": 44288,
          "skuId": 1004,
          "userId": 165302,
          "state": 3,
          "content": "我最满意的一次购物体验",
          "pictures": null,
          "totalScore": 4.0,
          "dimensionOne": 4.0,
          "dimensionTwo": 3.0,
          "dimensionThree": 4.0,
          "obtainCb": 15,
          "favoritesCount": 0,
          "commentCount": 1,
          "deletedAt": 1559293350000,
          "createdAt": 1558498375000,
          "dimensionName": "[\"质量\",\"口感\",\"物流\"]",
          "userName": "肉肉男",
          "goodName": "加拿大魔兽 ZMA锌镁威力素 90粒",
          "selectTags": [{"id": 38, "name": "质量赞", "type": "评价标签", "priority": 0}, {
            "id": 40,
            "name": "包装结实好看",
            "type": "评价标签",
            "priority": 0
          }, {"id": 43, "name": "物流态度好", "type": "评价标签", "priority": 0}, {
            "id": 47,
            "name": "全部",
            "type": "评价标签",
            "priority": 10
          }, {"id": 50, "name": "好评", "type": "评价标签", "priority": 7}]
        }, {
          "id": 3,
          "goodsOrderItemId": 44239,
          "skuId": 1000,
          "userId": 165302,
          "state": 2,
          "content": "这次购物体验感觉不大好，",
          "pictures": null,
          "totalScore": 2.0,
          "dimensionOne": 2.0,
          "dimensionTwo": 2.0,
          "dimensionThree": 3.0,
          "obtainCb": 15,
          "favoritesCount": 0,
          "commentCount": 0,
          "deletedAt": 1559294393000,
          "createdAt": 1558520763000,
          "dimensionName": "[\"质量\",\"口感\",\"物流\"]",
          "userName": "肉肉男",
          "goodName": "加拿大魔兽 巨无霸增肌粉 椰子味 5磅",
          "selectTags": [{"id": 29, "name": "有结块", "type": "评价标签", "priority": 0}, {
            "id": 31,
            "name": "包装有瑕疵",
            "type": "评价标签",
            "priority": 0
          }, {"id": 32, "name": "效果不明显", "type": "评价标签", "priority": 0}, {
            "id": 37,
            "name": "物流慢",
            "type": "评价标签",
            "priority": 0
          }, {"id": 47, "name": "全部", "type": "评价标签", "priority": 10}, {
            "id": 52,
            "name": "差评",
            "type": "评价标签",
            "priority": 5
          }]
        }, {
          "id": 6,
          "goodsOrderItemId": 34673,
          "skuId": 3,
          "userId": 193990,
          "state": 0,
          "content": "众享丝滑，入口即化，妙哉妙哉",
          "pictures": "http://7xoin6.com1.z0.glb.clouddn.com/1559211768099.jpg?w=1080&h=1080;http://7xoin6.com1.z0.glb.clouddn.com/1559211768099.jpg?w=1080&h=1080;http://7xoin6.com1.z0.glb.clouddn.com/1559211768099.jpg?w=1080&h=1080;http://7xoin6.com1.z0.glb.clouddn.com/1559211768099.jpg?w=1080&h=1080;http://7xoin6.com1.z0.glb.clouddn.com/1559211768099.jpg?w=1080&h=1080;http://7xoin6.com1.z0.glb.clouddn.com/1559211768099.jpg?w=1080&h=1080;http://7xoin6.com1.z0.glb.clouddn.com/1559211768099.jpg?w=1080&h=1080;http://7xoin6.com1.z0.glb.clouddn.com/1559211768099.jpg?w=1080&h=1080;http://7xoin6.com1.z0.glb.clouddn.com/1559211768099.jpg?w=1080&h=1080",
          "totalScore": 5.0,
          "dimensionOne": 5.0,
          "dimensionTwo": 5.0,
          "dimensionThree": 5.0,
          "obtainCb": 35,
          "favoritesCount": 0,
          "commentCount": 0,
          "deletedAt": null,
          "createdAt": 1559211787000,
          "dimensionName": "[\"质量\",\"口感\",\"物流\"]",
          "userName": "gengli",
          "goodName": "美国ON 乳清蛋白粉 5磅 曲奇味",
          "selectTags": [{"id": 41, "name": "口感细腻", "type": "评价标签", "priority": 0}, {
            "id": 47,
            "name": "全部",
            "type": "评价标签",
            "priority": 10
          }, {"id": 49, "name": "有图", "type": "评价标签", "priority": 8}, {
            "id": 50,
            "name": "好评",
            "type": "评价标签",
            "priority": 7
          }]
        }, {
          "id": 9,
          "goodsOrderItemId": 34893,
          "skuId": 183,
          "userId": 144095,
          "state": 0,
          "content": "下次再来，口感爆棚",
          "pictures": "http://7xoin6.com1.z0.glb.clouddn.com/1559213481847.jpg?w=1080&h=989;http://7xoin6.com1.z0.glb.clouddn.com/1559213489906.jpg?w=1080&h=1080;http://7xoin6.com1.z0.glb.clouddn.com/1559213583551.jpg?w=1080&h=1080",
          "totalScore": 4.0,
          "dimensionOne": 4.0,
          "dimensionTwo": 4.0,
          "dimensionThree": 4.0,
          "obtainCb": 25,
          "favoritesCount": 0,
          "commentCount": 4,
          "deletedAt": null,
          "createdAt": 1559213526000,
          "dimensionName": "[\"质量\",\"口感\",\"物流\"]",
          "userName": "潘panpan",
          "goodName": "美国ON 乳清蛋白粉 5磅 草莓味",
          "selectTags": [{"id": 38, "name": "质量赞", "type": "评价标签", "priority": 0}, {
            "id": 47,
            "name": "全部",
            "type": "评价标签",
            "priority": 10
          }, {"id": 49, "name": "有图", "type": "评价标签", "priority": 8}, {
            "id": 50,
            "name": "好评",
            "type": "评价标签",
            "priority": 7
          }]
        }, {
          "id": 8,
          "goodsOrderItemId": 34832,
          "skuId": 183,
          "userId": 128862,
          "state": 4,
          "content": "",
          "pictures": "http://7xoin6.com1.z0.glb.clouddn.com/1559212526297.jpg?w=1080&h=1080",
          "totalScore": 4.0,
          "dimensionOne": 4.0,
          "dimensionTwo": 3.0,
          "dimensionThree": 5.0,
          "obtainCb": 25,
          "favoritesCount": 0,
          "commentCount": 5,
          "deletedAt": null,
          "createdAt": 1559212533000,
          "dimensionName": "[\"质量\",\"口感\",\"物流\"]",
          "userName": "Ycc",
          "goodName": "美国ON 乳清蛋白粉 5磅 草莓味",
          "selectTags": [{"id": 42, "name": "味道适中", "type": "评价标签", "priority": 0}, {
            "id": 47,
            "name": "全部",
            "type": "评价标签",
            "priority": 10
          }, {"id": 49, "name": "有图", "type": "评价标签", "priority": 8}, {
            "id": 50,
            "name": "好评",
            "type": "评价标签",
            "priority": 7
          }]
        }, {
          "id": 5,
          "goodsOrderItemId": 43919,
          "skuId": 182,
          "userId": 220178,
          "state": 1,
          "content": "一口气喝了五碗，你说好不好",
          "pictures": null,
          "totalScore": 5.0,
          "dimensionOne": 5.0,
          "dimensionTwo": 5.0,
          "dimensionThree": 5.0,
          "obtainCb": 15,
          "favoritesCount": 0,
          "commentCount": 0,
          "deletedAt": 1559293936000,
          "createdAt": 1559209669000,
          "dimensionName": "[\"质量\",\"口感\",\"物流\"]",
          "userName": "米斯特change",
          "goodName": "美国ON 乳清蛋白粉 5磅 双重巧克力",
          "selectTags": [{"id": 38, "name": "质量赞", "type": "评价标签", "priority": 0}, {
            "id": 39,
            "name": "效果显著",
            "type": "评价标签",
            "priority": 0
          }, {"id": 43, "name": "物流态度好", "type": "评价标签", "priority": 0}, {
            "id": 44,
            "name": "物流速度快",
            "type": "评价标签",
            "priority": 0
          }, {"id": 47, "name": "全部", "type": "评价标签", "priority": 10}, {
            "id": 50,
            "name": "好评",
            "type": "评价标签",
            "priority": 7
          }]
        }, {
          "id": 7,
          "goodsOrderItemId": 34764,
          "skuId": 183,
          "userId": 94157,
          "state": 0,
          "content": "",
          "pictures": null,
          "totalScore": 1.0,
          "dimensionOne": 1.0,
          "dimensionTwo": 2.0,
          "dimensionThree": 3.0,
          "obtainCb": 5,
          "favoritesCount": 0,
          "commentCount": 0,
          "deletedAt": null,
          "createdAt": 1559212075000,
          "dimensionName": "[\"质量\",\"口感\",\"物流\"]",
          "userName": "别克kz",
          "goodName": "美国ON 乳清蛋白粉 5磅 草莓味",
          "selectTags": [{"id": 30, "name": "溶解度低", "type": "评价标签", "priority": 0}, {
            "id": 34,
            "name": "太甜",
            "type": "评价标签",
            "priority": 0
          }, {"id": 35, "name": "太淡", "type": "评价标签", "priority": 0}, {
            "id": 37,
            "name": "物流慢",
            "type": "评价标签",
            "priority": 0
          }, {"id": 47, "name": "全部", "type": "评价标签", "priority": 10}, {
            "id": 52,
            "name": "差评",
            "type": "评价标签",
            "priority": 5
          }]
        }],

        cellWidth: 280,
        gutterWidth: 5,
        cellHeight: 380,

        currentPage: 1,//当前页数
        total: 100,//总条数
        size: 10,//每页几条数据


        state: -1,//评价状态
        spuId: 0,//商品ID
        totalScore: -1,//评价等级
        createdTime: '',//时间
        orderBy: 0,//排序


        goodName: '',//商品名称
        maxLength: 15,//商品名最多显示字数


        loading: true,

        examineState: 3,//审核状态
        cbState: 4,//cb状态
        dialogFormVisible: false,


      };
    },
    mounted() {
      // this.init();
    },
    methods: {
      scroll(scrollData) {
      },
      h(){
        console.log("wowowowo");
      },
      loadmore(index) {
        console.log("1111111111111111111");
        this.h();
      },



      details(id) {
        this.dialogEvaluation = true;
        this.editId = id;

      },

    },

    name: "GoodsEvaluation"
  }
</script>

<style>
  .el-carousel__item {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

  }

  .carousel-image {
    max-width: 100%;
    max-height: 100%;
  }

  .header {
    text-align: 5%;
  }

  .body {
    margin-left: 5%;
    margin-right: 5%;
    margin-top: 12px;
    cursor: pointer;
  }

  .body .dimension {
    margin-top: 5px;
  }

  .body .tag {
    margin-top: 8px;
  }

  .body .content {
    margin-left: 5%;
    margin-top: 12px;
    font-size: initial;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }

  .el-carousel__item.is-active {
    z-index: 0 !important;
  }

  .cell-item {
    margin-bottom: 5px;
  }
</style>
