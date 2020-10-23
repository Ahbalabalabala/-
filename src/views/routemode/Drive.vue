<template>
  <div id="drive">
    <div id="Route" ref="container" v-show="show"></div>

    <div class="details" v-show="show">
      <div>
        <span>{{ result[0].road }}</span
        >→ <span>{{ result[1].road }}</span
        >→ <span>{{ result[2].road }}</span
        >→...
      </div>
      <div @click="show = !show">详情</div>
    </div>

    <div class="detailed" v-show="!show">
      <div class="back">
        <div class="goback" @click="show = !show"><span class="iconfont icon-xiajiantou"></span></div>
        <div class="tit">从{{ targetstart }}</div>
        <div class="tit">到{{ targetend }}</div>
      </div>
      <p v-for="(item, index) in result" :key="item">
       {{ index+1 }}、 {{ item.instruction }}
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
    this.bcd();
  },
  methods: {
    bcd() {
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
      }).then(() => {
        let _this = this;
        let map = new window.AMap.Map(this.$refs.container);

        //构造路线导航类
        let driving = new window.AMap.Driving({
          map: map,
          // panel: "panel",
        });
        // 根据起终点名称规划驾车导航路线
        driving.search(
          [
            { keyword: this.origin, city: this.city },
            { keyword: this.end, city: this.city },
          ],
          function (status, result) {
            // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
            if (status === "complete") {
              console.log("绘制驾车路线完成", result);
              _this.result = result.routes[0].steps;
              _this.targetstart = result.start.name;
              _this.targetend = result.end.name;
              // console.log("result",result.routes[0].steps);
              console.log(_this.result);
              // _this.show = true;
            } else {
              console.log("获取驾车数据失败：" + result);
            }
          }
        );
      });
    },
  },
};
</script>
<style lang="scss" scoped>
#drive {
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
.active {
  color: #0091ff;
}
</style>