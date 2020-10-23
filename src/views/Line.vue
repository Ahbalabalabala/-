<template>
  <div id="line">
    <div id="gostyle">
      <div id="gostyle-box">
        <router-link to="/Line/drive" tag="li">
          <span class="iconfont icon-qiche"></span>
        </router-link>
        <router-link to="/Line/transit" tag="li">
          <span class="iconfont icon-gongjiao"></span>
        </router-link>
        <router-link to="/Line/steps" tag="li">
          <span class="iconfont icon-zoulu"></span>
        </router-link>
        <router-link to="/Line/riding" tag="li">
          <span class="iconfont icon-yiliaohangyedeICON-"></span>
        </router-link>
        <!-- <button class="go">?</button> -->
      </div>
    </div>
    <div id="point">
      <div id="centerbefore">
        <div>从</div>
        <div>到</div>
      </div>
      <ul id="center">
        <input
          class="centerborder"
          type="text"
          placeholder="输入起点"
          v-model="origin"
        />
        <input type="text" placeholder="输入终点" v-model="end" />
      </ul>
      <div id="centerlast" @click="exchange">
        <span class="iconfont icon-jiantou_shangxiaqiehuan"></span>
      </div>
    </div>
    <router-view :origin="origin" :end="end" :city="city" />
    <!-- <div id="Route" ref="container"></div> -->
  </div>
</template>
<script>
import AMapLoader from "@amap/amap-jsapi-loader";

export default {
  props: ["startingpoint", "endpoint"],
  data() {
    return {
      origin: "",
      end: "",
      city: null,
    };
  },
  mounted() {
    this.abc();
  },
  methods: {
    exchange() {
      let Repeater = this.origin;
      this.origin = this.end;
      this.end = Repeater;
      console.log(this.startingpoint, this.endpoint);
      // console.log(this.origin,this.end);
    },
    abc() {
      this.origin = this.$route.query.nowaddress;
      this.end = this.$route.query.address;
      this.city = this.$route.query.city;
      AMapLoader.load({
        key: "73aad969cef15cccdea947058b1c6f0e", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [
          "AMap.Driving",
          "AMap.Walking",
          "AMap.Riding",
          "AMap.Transfer",
          "AMap.CitySearch",
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
        //IP定位获取当前城市信息
        AMap.plugin("AMap.CitySearch", function () {
          var citySearch = new window.AMap.CitySearch();
          citySearch.getLocalCity(function (status, result) {
            if (status === "complete" && result.info === "OK") {
              // 查询成功，result即为当前所在城市信息
              _this.city = result.city;
              console.log(
                "查询成功，result即为当前所在城市信息",
                _this.city,
                result
              );
            }
          });
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#gostyle {
  height: 47px;
  padding: 0px 69px;
  background-color: #fafafa;
  #gostyle-box {
    display: flex;
    width: 100%;
    height: 100%;
    list-style: none;
    justify-content: space-between;
    align-items: center;
    position: relative;
    .go {
      position: absolute;
      top: 6px;
      right: -50px;
      padding: 8px 9px;
      color: #87bdfb;
      border: 1px solid #cfcfcf;
    }
  }
}

#point {
  width: 100%;
  height: 86px;
  display: flex;
  justify-content: center;
  #centerbefore {
    padding-right: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  #centerlast {
    padding-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  #center {
    height: 86px;
    width: 230px;
    input {
      width: 230px;
      height: 43px;
      border: 0px;
      outline-style: none;
      // color: #ececec;
    }
    .centerborder {
      border-bottom: 1px solid #ececec;
    }
  }
}

.exact-active {
  color: #0091ff;
}
</style>