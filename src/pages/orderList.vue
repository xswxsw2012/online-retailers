<template>
  <div class="order-wrap">
      <h3>您的产品</h3>
      <div class="order-list-choose">
          <div class="order-list-option">
              选择产品：
              <v-selection :selections="products"
              @on-change="productChange"></v-selection>
          </div>
          <div class="order-list-option">
              开始日期：
              <v-date-picker type="text" mode='single' v-model="startDate"></v-date-picker>
          </div>
          <div class="order-list-option">
              结束日期：
              <v-date-picker mode='single' v-model="endDate"></v-date-picker>
          </div>
          <div class="order-list-option">
              关键词：
              <input type="text" v-model.lazy="query" class="order-query">
          </div>
      </div>
      <div class="order-list-table">
          <table>
              <tr>
                  <th v-for="(item,index) in tableHeads" :key="index"
                  @click="changeOrder(item)"
                  :class="{active:item.active}"
                  >{{ item.label }}</th>
              </tr>
              <tr v-for="(item,index) in getOrderList.list" :key="index">
                  <th v-for="(head,index) in tableHeads" :key="index">{{ item[head.key] }}</th>
              </tr>
          </table>
      </div>
  </div>
</template>
<script>
import VSelection from '../components/base/selection'

export default {
  components: {
      VSelection,
  },
  data () {
      return {
          query: '',
          productId: 0,
          startDate: new Date(2018,1,1),
          endDate: new Date(),
          products: [
            {
                label: '数据统计',
                value: 0
            },
            {
                label: '数据预测',
                value: 1
            },
            {
                label: '流量分析',
                value: 2
            },
            {
                label: '广告发布',
                value: 3
            }
          ],
          tableHeads: [
            {
                label: '订单号',
                key: 'orderId'
            },
            {
                label: '购买产品',
                key: 'product'
            },
            {
                label: '版本类型',
                key: 'version'
            },
            {
                label: '有效时间',
                key: 'period'
            },
            {
                label: '购买日期',
                key: 'date'
            },
            {
                label: '数量',
                key: 'buyNum'
            },
            {
                label: '总价',
                key: 'amount'
            }
        ],
        getOrderList: {
            list:[
                {
                    orderId: "ddj123",
                    product: "数据统计",
                    version: "高级版",
                    period: "1年",
                    buyNum: 2,
                    date: "2016-10-10",
                    amount: "500元"
                },
                {
                    orderId: "yuj583",
                    product: "流量分析",
                    version: "户外版",
                    period: "3个月",
                    buyNum: 1,
                    date: "2016-5-2",
                    amount: "2200元"
                },
                {
                    orderId: "pmd201",
                    product: "广告发布",
                    version: "商铺版",
                    period: "3年",
                    buyNum: 12,
                    date: "2016-8-3",
                    amount: "7890元"
                }
            ]
        }
      }
  },
  watch: {
      query () {
        // this.getTableData();
      }
  },
  methods: {
      productChange (obj) {
          this.$store.commit('updateParams',{
              key: 'productId',
              val: obj.value
          })
          this.productId = obj.value
          console.log(obj);
      },
    //   changeStartDate (date) {
    //       this.startDate = date
    //   },
    //   changeEndDate (date) {
    //       this.endDate = date
    //   }
    getTableData () {
        let reqParams = {
            query: this.query,
            productId: this.productId,
            startDate: this.startDate,
            endDate: this.endDate
        }
        this.$http.post('/api/getOrderList', reqParam)
        .then((res) => {
            this.tableData = res.data.list
        },(err) => {

        })
    },
    changeOrder (headItem) {
        this.tableHeads.map((item) => {
            item.active = false
            return item
        })
        headItem.active = true
        if (this.currentOrder === 'asc') {
            this.currentOrder = 'desc'
        }
        else if(this.currentOrder === 'desc') {
            this.currentOrder = 'asc'
        }
        this.tableData = _.orderBy(this.tableData, headItem.key, this.currentOrder)
    }
  },
  mounted () {
    // this.getTableData();
    this.$store.dispatch('fetchOrderList')
    console.log(this.$store);
  },
  computed: {
      tableData () {
          return this.$store.getters.getOrderList
      }
  }
}
</script>
<style scoped>
.order-wrap {
  width: 1200px;
  min-height: 800px;
  margin: 20px auto;
  overflow: hidden;
}
.order-wrap h3 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}
.order-query {
  height: 25px;
  line-height: 25px;
  border: 1px solid #e3e3e3;
  outline: none;
  text-indent: 10px;
}
.order-list-option {
  display: inline-block;
  padding-left: 15px;
}
.order-list-option:first-child {
  padding-left: 0;
}
.order-list-table {
  margin-top: 20px;
}
.order-list-table table {
  width: 100%;
  background: #fff;
}
.order-list-table td,
.order-list-table th {
  border: 1px solid #e3e3e3;
  text-align: center;
  padding: 10px 0;
}
.order-list-table th {
  background: #4fc08d;
  color: #fff;
  border: 1px solid #4fc08d;
  cursor: pointer;
}
.order-list-table th.active {
  background: #35495e;
}
</style>
