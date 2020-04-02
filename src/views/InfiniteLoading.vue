<template>
  <!--<div>-->
    <ul class="infinite-list" v-infinite-scroll="load">
      <li v-for="i in count" class="infinite-list-item" key="index">{{ i }}</li>
    </ul>
  <!--</div>-->
    <!--<xdh-scroll :on-reach-bottom="handleReachBottom">-->
    <!--<el-card v-for="(item, index) in list1" :key="index" style="margin: 32px 0">-->
    <!--Content {{ item }}-->
    <!--</el-card>-->
    <!--</xdh-scroll>-->
</template>

<script>
  export default {
    name: "InfiniteLoading",
    data() {
      return {
        list1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        count: 50
      }
    },
    methods: {
      load() {
        this.count += 2
      },
      handleReachBottom() {
        return new Promise(resolve => {
          setTimeout(() => {
            const last = this.list1[this.list1.length - 1];
            for (let i = 1; i < 11; i++) {
              this.list1.push(last + i);
            }
            resolve();
          }, 2000);
        });
      }
    }

  }
</script>

<style scoped>

</style>
