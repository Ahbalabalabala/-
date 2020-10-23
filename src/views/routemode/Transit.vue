<template>
  <div id="transit">
    <div id="Route" ref="container" v-show="show"></div>

    <div class="details" v-show="show">
      <div>
        <span>{{ result[0].instruction }}</span
        >→...
      </div>
      <div @click="show = !show">详情</div>
    </div>

    <div class="detailed" v-show="!show">
      <div class="back">
        <div class="goback" @click="show = !show">
          <span class="iconfont icon-xiajiantou"></span>
        </div>
        <div class="tit">从{{ targetstart }}</div>
        <div class="tit">到{{ targetend }}</div>
      </div>
      <p v-for="(item, index) in result" :key="item">
        {{ index + 1 }}、 {{ item.instruction }}
      </p>
    </div>
  </div>
</template>
<script>
import AMapLoader from "@amap/amap-jsapi-loader";

export default {
  props: ["origin", "end", "city"],
  data() {
    return {
      result: [1, 2, 3],
      show: true,
      targetstart: null,
      targetend: null,
    };
  },
  mounted() {
    this.abc();
  },
  methods: {
    abc() {

      AMapLoader.load({
        key: "73aad969cef15cccdea947058b1c6f0e", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [
          "AMap.Driving",
          "AMap.Walking",
          "AMap.Riding",
          "AMap.Transfer",
        ],
        AMapUI: {
          // 是否加载 AMapUI，缺省不加载
          version: "1.1", // AMapUI 缺省 1.1
          plugins: ["control/BasicControl"], // 需要加载的 AMapUI ui插件
        },
        // Loca: {
        //   // 是否加载 Loca， 缺省不加载
        //   version: "1.3.2", // Loca 版本，缺省 1.3.2
        // },
      }).then((AMap) => {
        let _this = this;
        console.log("origin", this.origin, "end", this.end, "city", this.city);
        let map = new AMap.Map(this.$refs.container);

        var transOptions = {
          map: map,
          city: this.city,
          // panel: 'panel',
          policy: window.AMap.TransferPolicy.LEAST_TIME, //乘车策略
        };
        //构造公交换乘类
        var transfer = new window.AMap.Transfer(transOptions);
        //根据起、终点名称查询公交换乘路线
        transfer.search(
          [
            { keyword: this.origin, city: this.city },
            //第一个元素city缺省时取transOptions的city属性
            { keyword: this.end, city: this.city },
            //第二个元素city缺省时取transOptions的cityd属性
          ],
          function (status, result) {
            // result即是对应的公交路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_TransferResult
            if (status === "complete") {
              console.log("绘制公交路线完成", result);
              _this.targetstart = result.start.name;
              _this.targetend = result.end.name;
              _this.result = result.plans[0].segments;
            } else {
              console.log("公交路线数据查询失败" + result);
            }
          }
        );
      });
    },
  },
};
</script>
<style lang="scss" scoped>
#transit {
  #Route {
    width: 100%;
    position: absolute;
    top: 178px;
    bottom: 0px;
  }
  .details {
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: 65px;
    padding: 15px 15px;
    background-color: #fff;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
  }
  .detailed {
    width: 100%;
    position: absolute;
    top: 178px;
    bottom: 0px;
    background-color: #fff;
    padding: 15px 10px;
    box-sizing: border-box;

    .back {
      width: 100%;
      height: 45px;
      .tit {
        text-align: center;
      }
      .goback {
        width: 30px;
        height: 30px;
        position: absolute;
        top: 20px;
        left: 20px;
        text-align: center;
        line-height: 30px;
        transform: rotate(90deg);
      }
    }
    p {
      font-size: 12px;
      padding: 20px 0px;
      padding-left: 20px;
      border-bottom: 1px solid #bcbcbc;
    }
  }
}
.exact-active {
  color: #0091ff;
}
</style>