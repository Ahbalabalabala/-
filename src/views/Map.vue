<template>
  <div id="map">
    <div class="layer" v-show="display">
      <div id="search-box">
        <div id="frame">
          <input
            type="text"
            ref="ipt"
            id="inp"
            placeholder="搜索公交、地点、路线"
            @keyup.enter="clickOn"
          />
          <div id="btn" @click="clickOn">
            <span class="iconfont icon-sousuo"></span>
          </div>
        </div>
      </div>
      <div id="drawing-surface" ref="container">
        <div
          class="ico traffic"
          @click="Traffic"
          :class="{ trlayer: traffic == false }"
        ></div>
        <div
          class="ico satellite"
          @click="SatelliteLayer"
          :class="{ salayer: satellite == false }"
        ></div>
        <!-- <div class="icon download" :class="{ downloadclick: show == true }"></div> -->
        <div class="icon set-up" v-show="!show"></div>
        <div
          class="icon"
          :class="{
            locationbefor: locationstatus == 1,
            locationing: locationstatus == 2,
            locationlast: locationstatus == 3,
            locationclick: show == true,
          }"
          @click="Location"
        ></div>
      </div>
      <div class="Information" v-if="show">
        <div class="tit">
          <p class="titfirst">{{ address }}</p>
          <p class="titconter">
            {{ street }} {{ streetNumber }} {{ township }}
          </p>
        </div>
        <div class="letsgo">
          <div @click="around">
            <!-- <router-link :to="{ path: '/Map/search', query: {} }" tag="div"> -->
            <span class="iconfont icon-ditu" />搜周围
            <!-- </router-link> -->
          </div>
          <div @click="$emit('distanceinformation', { nowaddress })">
            <router-link
              :to="{ path: '/Line', query: { address, nowaddress, city } }"
              tag="div"
            >
              <span class="iconfont icon-chakou" />去这里
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="nearby" v-show="!display">
      <router-view @backaround="backaround" />
      <van-nav-bar
        title="搜索周围"
        left-text="返回"
        left-arrow
        :fixed="true"
        @click-left="backMap"
        v-show="business"
      />
      <div class="boxcont" v-show="business">
        <classification
          v-for="(elm, index) in boxdata"
          :key="elm.img"
          :boxdata="boxdata[index]"
          :endpoint="endpoint"
          @businessdis="businessdis"
          
        />
      </div>
    </div>
  </div>
</template>
<script>
import AMapLoader from "@amap/amap-jsapi-loader";
// import Search from "../components/Search";
import classification from "../components/classification.vue";
// import MapConfig from "../utils/MapConfig";

export default {
  props: [],
  data() {
    return {
      AMap: null,
      map: null,
      satellite: true,
      satelliteLayer: null,
      traffic: true,
      trafficLayer: null,
      geolocation: null,
      locationstatus: 1,
      startingpoint: null,
      endpoint: null,
      address: "null",
      friendsimgs: [],
      show: false,
      zoomCtrl: null,
      street: "null",
      streetNumber: "null",
      township: "null",
      nowaddress: "null",
      city: "null",
      alignment: [],
      display: true,
      business: true,
      wangming: [
        "春景丶小可爱",
        "小赤奋若吖",
        "是友珊吖",
        "冰安少女",
        "沛安小姐姐",
        "丹蓝小公主",
        "一条小春海",
        "尔风小仙女",
        "珮青三岁啦",
        "安露mio",
        "水荷小娘子",
        "一只凝安呀",
        "小竹酱吖",
        "叶帆mm丶",
        "迎梅姑娘",
        "是你的己卯呀",
        "山枫baby",
        "巧松酱大魔王",
        "婉容超级甜",
        "邻家如意",
        "晓莉mm丶",
        "笑柳小姐姐",
        "芮波丶小可爱",
        "小东俊吖",
        "晓君baby",
        "荣荣小娘子",
        "琇晶小公主",
        "香菱少女",
        "艳丽超级甜",
        "一条小代梅",
      ],
      boxdata: [
        {
          img: require("../img/more_re.png"),
          content: [
            ["美食", "酒店", "景点"],
            ["停车场", "加油站", "公交站"],
            ["地铁站", "网吧", "洗浴"],
          ],
        },
        {
          img: require("../img/more_chi.png"),
          content: [
            ["美食", "肯德基", "麦当劳"],
            ["中餐", "快餐", "西餐"],
            ["川菜", "火锅", "咖啡厅"],
          ],
        },
        {
          img: require("../img/more_zhu.png"),
          content: [
            ["酒店", "快捷酒店", "如家"],
            ["汉庭", "星级酒店", "青年旅社"],
          ],
        },
        {
          img: require("../img/more_xing.png"),
          content: [
            ["停车场", "加油站", "公交站"],
            ["地铁站", "火车站", "火车票代售"],
          ],
        },
        {
          img: require("../img/more_wan.png"),
          content: [
            ["电影院", "网吧", "洗浴"],
            ["足疗", "KTV", "酒吧"],
            ["夜店", "台球", "棋牌室"],
          ],
        },
        {
          img: require("../img/more_you.png"),
          content: [
            ["景点", "公园", "游乐场"],
            ["博物馆", "动物园", "广场"],
          ],
        },
        {
          img: require("../img/more_gou.png"),
          content: [
            ["超市", "商场", "团购"],
            ["步行街", "便利店", "家具城"],
          ],
        },
        {
          img: require("../img/more_shenghuo.png"),
          content: [
            ["银行", "ATM", "医院"],
            ["药店", "快递", "厕所"],
            ["汽车维修", "邮局", "洗车"],
            ["移动营业厅", "联通营业厅", "电信营业厅"],
          ],
        },
      ],
    };
  },
  mounted() {
    this.Map();
    // this.$nextTick(() => {
    //   // this.a()
    // });
  },

  methods: {
    Map() {
      AMapLoader.load({
        key: "73aad969cef15cccdea947058b1c6f0e", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [
          "AMap.Driving",
          "AMap.Walking",
          "AMap.Riding",
          "AMap.Transfer",
          "AMap.Marker",
          "AMap.InfoWindow",
          "AMap.Geocoder",
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
      })
        .then((AMap) => {
          var _this = this;
          //创建地图
          var map = new AMap.Map(this.$refs.container, {
            resizeEnable: true,
            zoom: 10,
          });
          //地图加载完成
          map.on("complete", function () {
            console.log("地图图块加载完成后触发", AMap);

            _this.AMap = AMap;
            _this.map = map;
            // console.log(
            //   "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            //   this.map,
            //   this.AMap,
            //   "bbbbbbbbbbbbbbbbbbb",
            //   map,
            //   AMap
            // );
          });

          //输入提示
          var autoOptions = {
            input: this.$refs.ipt,
            // city: "广州",
          };
          AMap.plugin(["AMap.PlaceSearch", "AMap.AutoComplete"], function () {
            // console.log(autoOptions);
            let auto = new AMap.AutoComplete(autoOptions);
            let placeSearch = new AMap.PlaceSearch({
              map: map,
            }); //构造地点查询类
            auto.on("select", select); //注册监听，当选中某条记录时会触发
            auto.on("complete", (e) => {
              console.log(e);
            });
            //打印关键字信息
            function select(e) {
              console.log(e);

              _this.show = true;
              //位置信息
              _this.address = e.poi.name;
              _this.street = e.poi.district;
              _this.streetNumber = e.poi.address;
              _this.township = "";
              //放大缩小位置
              _this.zoomCtrl.removeFrom(map);
              window.AMapUI.loadUI("control/BasicControl", function (
                BasicControl
              ) {
                _this.zoomCtrl = new BasicControl.Zoom({
                  //见zoom-green.css
                  theme: "shrink",
                  position: "rb",
                  // showZoomNum: true,
                });
                map.addControl(_this.zoomCtrl);
                // zoomCtrl.removeFrom(map)
              });

              placeSearch.setCity(e.poi.adcode);
              placeSearch.search(e.poi.name); //关键字查询查询
            }
          });

          for (let i = 0; i < 10; i++) {
            //获取图片
            _this.$axios
              .get("https://api.uomg.com/api/rand.avatar", {
                params: {
                  // sort: "女",
                  format: "json",
                },
              })
              .then((res) => {
                // let a=JSON.parse(res.data)
                // console.log(res.data.imgurl);
                _this.friendsimgs.push(res.data.imgurl);
                // console.log(_this.friendsimgs);
                // icon.image = res.data.imgurl;
              })
              .catch(function (error) {
                console.log(error);
              });
          }
          //定位
          AMap.plugin("AMap.Geolocation", function () {
            _this.locationstatus = 2;
            let geolocation = new AMap.Geolocation({
              enableHighAccuracy: true, //是否使用高精度定位，默认:true
              timeout: 10000, //超过10秒后停止定位，默认：5s
              position: "LB", //定位按钮的停靠位置
              buttonOffset: new AMap.Pixel(17, 15), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
              zoomToAccuracy: true, //定位成功后是否自动调整地图视野到定位点
              panToLocation: true,
              showMarker: true,
              buttonDom: "<input >",
              showButton: false,
            });
            // console.log("geolocation", geolocation);
            map.addControl(geolocation);
            _this.geolocation = geolocation;
            // console.log("kankan", geolocation);
            geolocation.getCurrentPosition(function (status, result) {
              if (status == "complete") {
                console.log(
                  "成功",
                  result,
                  result.position.lng,
                  result.position.lat
                );
                _this.startingpoint = {
                  longitude: result.position.lng,
                  latitude: result.position.lat,
                };

                let friendsNearby = [];
                for (let i = 0; i < 10; i++) {
                  let x =
                    Math.floor(
                      Math.random() * 5000 +
                        (result.position.lng * 1000000 - 2500)
                    ) / 1000000;
                  let y =
                    Math.floor(
                      Math.random() * 10000 +
                        (result.position.lat * 1000000 - 5000)
                    ) / 1000000;
                  // console.log("y=", y, "x=", x);
                  friendsNearby[i] = { position: [x, y] };
                }
                console.log(friendsNearby);
                // //创建 LabelsLayer
                // var labelsLayer = new AMap.LabelsLayer({
                //   zooms: [3, 20],
                //   zIndex: 1000,
                //   // 该层内标注是否避让
                //   collision: true,
                //   // 设置 allowCollision：true，可以让标注避让用户的标注
                //   allowCollision: true,
                // });
                //编辑信息体标题
                // let title= '方恒假日酒店<span style="font-size:11px;color:#F00;" ></span>'

                for (let i = 0; i < 10; i++) {
                  //编辑点信息
                  let infoWindow = new AMap.InfoWindow({
                    // isCustom: true,  //使用自定义窗体
                    offset: new AMap.Pixel(20, 0),
                    // content: createInfoWindow(title, content.join("<br/>")),
                  });
                  // 创建 AMap.Icon 实例：
                  let icon = new AMap.Icon({
                    size: new AMap.Size(40, 50), // 图标尺寸
                    image: _this.friendsimgs[i], // Icon的图像
                    // imageOffset: new AMap.Pixel(0, -60), // 图像相对展示区域的偏移量，适于雪碧图等
                    imageSize: new AMap.Size(40, 50), // 根据所设置的大小拉伸或压缩图片
                  });

                  //创建坐标
                  let marker = new AMap.Marker({
                    icon: icon,
                    position: [
                      friendsNearby[i].position[0],
                      friendsNearby[i].position[1],
                    ],
                    clickable: true,
                  });

                  marker.content =
                    '<router-link :to="/Nearby" tag="div">你好呀</router-link>';
                  marker.on("click", function (e) {
                    infoWindow.setContent(e.target.content);
                    infoWindow.open(map, e.target.getPosition());
                    console.log(
                      "点击我是神马？",
                      _this.wangming[Math.floor(Math.random() * 30)]
                    );
                    console.log("头像", e.originEvent.srcElement.currentSrc);
                    // _this.$router.push("/Nearby");
                    _this.$router.push({
                      path: "/Nearby",
                      query: {
                        name: _this.wangming[Math.floor(Math.random() * 10)],
                        img: e.originEvent.srcElement.currentSrc,
                      },
                    });
                  });
                  //出现自动显示
                  // marker.emit("click", { target: marker });

                  //添加入地图
                  map.add(marker);
                }

                //根据经纬度查地址
                let geocoder = new AMap.Geocoder({
                  city: "010", //城市设为北京，默认：“全国”
                  radius: 1000, //范围，默认：500
                });
                let lnglat = [
                  _this.startingpoint.longitude,
                  _this.startingpoint.latitude,
                ];
                // map.add(marker);
                // marker.setPosition(lnglat);

                geocoder.getAddress(lnglat, function (status, result) {
                  if (status === "complete" && result.regeocode) {
                    var address = result.regeocode.formattedAddress;
                    console.log("根据定位查询地址成功", address);
                    // console.log("根据定位查询地址成功result", result.regeocode.addressComponent.city);
                    _this.city = result.regeocode.addressComponent.city;
                    _this.startingpoint.address = address;
                    _this.nowaddress = address;
                    // console.log(_this.startingpoint);
                  } else {
                    console.log("根据经纬度查询地址失败");
                  }
                });

                setTimeout(() => {
                  _this.locationstatus = 1;
                }, 500);
              } else {
                console.log("失败", result);
                _this.locationstatus = 3;
              }
            });
          });
          //绑定定位移动
          map.on("movestart", function () {
            _this.locationstatus = 3;
          });
          //卫星图层
          this.satelliteLayer = new AMap.TileLayer.Satellite();
          //批量添加图层
          map.add([this.satelliteLayer]);
          //移除图层
          // map.remove(satelliteLayer);
          //隐藏图层
          this.satelliteLayer.hide();

          //路况
          this.trafficLayer = new AMap.TileLayer.Traffic({
            zIndex: 10,
          });
          //绑定
          this.trafficLayer.setMap(map);
          //隐藏
          this.trafficLayer.hide();
          //显示
          // trafficLayer.show();

          //缩放UI
          window.AMapUI.loadUI("control/BasicControl", function (BasicControl) {
            _this.zoomCtrl = new BasicControl.Zoom({
              //见zoom-green.css
              theme: "large-small",
              position: "rb",
              // showZoomNum: true,
            });
            map.addControl(_this.zoomCtrl);
            // zoomCtrl.removeFrom(map)
          });

          //点击显示坐标
          console.log("绑定事件!");

          map.on("click", showInfoClick);
          function showInfoClick(e) {
            if (_this.alignment) {
              _this.map.remove(_this.alignment);
            }

            _this.show = true;
            _this.zoomCtrl.removeFrom(map);
            //放大缩小位置
            window.AMapUI.loadUI("control/BasicControl", function (
              BasicControl
            ) {
              _this.zoomCtrl = new BasicControl.Zoom({
                //见zoom-green.css
                theme: "shrink",
                position: "rb",
                // showZoomNum: true,
              });
              map.addControl(_this.zoomCtrl);
              // zoomCtrl.removeFrom(map)
            });

            let text =
              "您在 [ " +
              e.lnglat.getLng() +
              "," +
              e.lnglat.getLat() +
              " ] 的位置单击了地图！";
            console.log(text);
            _this.endpoint = {
              longitude: e.lnglat.getLng(),
              latitude: e.lnglat.getLat(),
            };

            // console.log(_this.endpoint);

            // // 创建 AMap.Icon 实例：
            // let icon = new AMap.Icon({
            //   size: new AMap.Size(40, 50), // 图标尺寸
            //   image: _this.friendsimgs[0], // Icon的图像
            //   // imageOffset: new AMap.Pixel(0, -60), // 图像相对展示区域的偏移量，适于雪碧图等
            //   imageSize: new AMap.Size(40, 50), // 根据所设置的大小拉伸或压缩图片
            // });

            //创建坐标
            let marker = new AMap.Marker({
              // icon:icon,
              position: [e.lnglat.getLng(), e.lnglat.getLat()],
            });
            _this.alignment.push(marker);
            //编辑点信息
            let infoWindow = new AMap.InfoWindow({
              offset: new AMap.Pixel(0, -30),
            });
            // marker.content = "我是第" + 100 + "个Marker";
            // marker.on("click", markerClick);
            //出现自动显示
            // marker.emit("click", { target: marker });
            // function markerClick(e) {
            //   infoWindow.setContent(e.target.content);
            //   infoWindow.open(map, e.target.getPosition());
            // }
            //插入坐标
            // map.add(marker);

            //根据经纬度查地址
            let geocoder = new AMap.Geocoder({
              // city: "010", //城市设为北京，默认：“全国”
              radius: 1000, //范围，默认：500
            });
            //位置经纬度
            let lnglat = [e.lnglat.getLng(), e.lnglat.getLat()];
            map.add(marker);
            // map.remove(marker);
            // marker.setPosition(lnglat);
            geocoder.getAddress(lnglat, function (status, result) {
              if (status === "complete" && result.regeocode) {
                // console.log("根据点击目标查询地址成功", address);
                _this.endpoint.address = result.regeocode.formattedAddress;
                console.log(result.regeocode.addressComponent.city);
                _this.endpoint.city = result.regeocode.addressComponent.city;
                _this.address = result.regeocode.formattedAddress;
                _this.street = result.regeocode.addressComponent.street;
                _this.streetNumber =
                  result.regeocode.addressComponent.streetNumber;
                _this.township = result.regeocode.addressComponent.township;

                //添加信息体
                let arrive = `<p>${result.regeocode.formattedAddress}</p>`;
                // arrive += `<button @click="a">到这里</button>`;
                marker.content = arrive;
                marker.on("click", markerClick);
                // marker.emit("click", { target: marker });
              } else {
                console.log("根据经纬度查询地址失败");
              }
              //添加信息体
              function markerClick(e) {
                infoWindow.setContent(e.target.content);
                infoWindow.open(map, e.target.getPosition());
              }
            });

            // document.querySelector("#text").innerText = text;

            // 事件绑定

            // 解绑事件
            // function clickOff() {
            //   log.success("解除事件绑定!");
            //   map.off("click", showInfoClick);
            // }
            // 给按钮绑定事件
          }
        })
        .catch((e) => {
          if (!e) {
            this.Map();
            console.log("xx");
          }
        });
    },
    SatelliteLayer() {
      if (this.satellite) {
        //显示卫星图层
        this.satelliteLayer.show();
        this.satellite = false;
      } else {
        //隐藏卫星图层
        this.satelliteLayer.hide();
        this.satellite = true;
      }
    },
    Traffic() {
      if (this.traffic) {
        //显示路况图层
        this.trafficLayer.show();
        this.traffic = false;
      } else {
        //隐藏路况图层
        this.trafficLayer.hide();
        this.traffic = true;
      }
    },
    clickOn() {
      let _this = this;
      var map = this.map;
      var AMap = this.AMap;

      let placeSearch = new AMap.PlaceSearch({
        map: map,
      }); //构造地点查询类
      placeSearch.search(this.$refs.ipt.value);

      placeSearch.on("complete", (e) => {
        // console.log("pqpqpqpqpqp", e);

        _this.show = true;
        //位置信息
        _this.address = e.poiList.pois[0].name;
        _this.street = e.poiList.pois[0].cityname;
        _this.streetNumber = e.poiList.pois[0].adname;
        _this.township = e.poiList.pois[0].address;
        //放大缩小位置
        _this.zoomCtrl.removeFrom(map);
        window.AMapUI.loadUI("control/BasicControl", function (BasicControl) {
          _this.zoomCtrl = new BasicControl.Zoom({
            //见zoom-green.css
            theme: "shrink",
            position: "rb",
            // showZoomNum: true,
          });
          map.addControl(_this.zoomCtrl);
          // zoomCtrl.removeFrom(map)
        });
      });
    },
    Location() {
      let _this = this;
      this.locationstatus = 2;
      this.geolocation.getCurrentPosition(function (status, result) {
        if (status == "complete") {
          console.log("成功", result);
          _this.startingpoint = [result.position.lng, result.position.lat];
          setTimeout(() => {
            _this.locationstatus = 1;
          }, 500);

          let friendsNearby = [];
          for (let i = 0; i < 10; i++) {
            let x =
              Math.floor(
                Math.random() * 14000 + (result.position.lng * 1000000 - 7000)
              ) / 1000000;
            let y =
              Math.floor(
                Math.random() * 20000 + (result.position.lat * 1000000 - 10000)
              ) / 1000000;
            // console.log("y=", y, "x=", x);
            friendsNearby[i] = { position: [x, y] };
          }
          console.log(friendsNearby);
          // //创建 LabelsLayer
          // var labelsLayer = new AMap.LabelsLayer({
          //   zooms: [3, 20],
          //   zIndex: 1000,
          //   // 该层内标注是否避让
          //   collision: true,
          //   // 设置 allowCollision：true，可以让标注避让用户的标注
          //   allowCollision: true,
          // });

          for (let i = 0; i < 10; i++) {
            //编辑点信息
            let infoWindow = new window.AMap.InfoWindow({
              offset: new window.AMap.Pixel(20, 0),
            });
            // 创建 AMap.Icon 实例：
            let icon = new window.AMap.Icon({
              size: new window.AMap.Size(40, 50), // 图标尺寸
              image: _this.friendsimgs[i], // Icon的图像
              // imageOffset: new AMap.Pixel(0, -60), // 图像相对展示区域的偏移量，适于雪碧图等
              imageSize: new window.AMap.Size(40, 50), // 根据所设置的大小拉伸或压缩图片
            });

            //创建坐标
            let marker = new window.window.AMap.Marker({
              icon: icon,
              position: [
                friendsNearby[i].position[0],
                friendsNearby[i].position[1],
              ],
            });

            marker.content = "帅哥，你好呀";
            marker.on("click", function (e) {
              infoWindow.setContent(e.target.content);
              infoWindow.open(window.map, e.target.getPosition());
            });
            //出现自动显示
            // marker.emit("click", { target: marker });

            //添加入地图
            window.map.add(marker);
          }
        } else {
          console.log("失败", result);
          _this.locationstatus = 3;
        }
      });
    },
    around() {
      this.display = false;
      this.$emit("show", this.display);
      // let _this = this;
      // let AMap = _this.AMap;
      // // let map = this.map;
      // console.log("xx", this.endpoint);

      // //搜索信息
      // var placeSearch = new AMap.PlaceSearch({
      //   // city 指定搜索所在城市，支持传入格式有：城市名、citycode和adcode
      //   city: "广州", // 兴趣点城市
      //   // type: "餐饮服务", // 兴趣点类别
      //   // pageSize: 5, // 单页显示结果条数
      //   // pageIndex: 1, // 页码
      //   // citylimit: true, //是否强制限制在设置的城市内搜索
      //   // map: map, // 展现结果的地图实例
      //   // panel: "panel", // 结果列表将在此容器中进行展示。
      //   // autoFitView: true, // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
      // });
      // placeSearch.searchNearBy(
      //   "酒店",
      //   [_this.endpoint.longitude, _this.endpoint.latitude],
      //   5000,
      //   function (status, result) {
      //     // 查询成功时，result即对应匹配的POI信息
      //     if (status == "complete") {
      //       console.log(result);
      //     } else {
      //       console.log(status);
      //     }
      //   }
      // );
    },
    backMap() {
      this.display = true;
      this.$emit("show", this.display);
    },
    businessdis(e) {
      console.log(e);
      this.business = e;
    },
    backaround(e) {
      this.business = e;
    },
    category(e) {
      let _this = this;
      let AMap = window.AMap;
      // let map = this.map;
      // console.log("AMap", AMap);

      //搜索信息
      var placeSearch = new AMap.PlaceSearch({
        // city 指定搜索所在城市，支持传入格式有：城市名、citycode和adcode
        city: _this.endpoint.city, // 兴趣点城市
        // type: "餐饮服务", // 兴趣点类别
        // pageSize: 5, // 单页显示结果条数
        // pageIndex: 1, // 页码
        // citylimit: true, //是否强制限制在设置的城市内搜索
        // map: map, // 展现结果的地图实例
        // panel: "panel", // 结果列表将在此容器中进行展示。
        // autoFitView: true, // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
      });
      // console.log("placeSearch", placeSearch);
      console.log("endpoint", this.endpoint);

      placeSearch.searchNearBy(
        e,
        [_this.endpoint.longitude, _this.endpoint.latitude],
        5000,
        function (status, result) {
          // 查询成功时，result即对应匹配的POI信息
          if (status == "complete") {
            console.log(result);
            _this.surroundingData = result.poiList.pois;
          } else {
            console.log(status);
          }
        }
      );
    },
  },
  components: {
    // Search,
    classification,
  },
};
</script>

<style >
.amap-controls {
  /*
  position: absolute;
    background: #fff url("../img/map_icon.png") no-repeat -19px -303px;
    background-size: 48px 329px;
    background-position: 7px -189px; 
    */
  border-radius: 4px;
  width: 36px;
  height: 36px;
  left: 15px;
  bottom: 15px;
}
#drawing-surface .amap-ui-control-theme-large-small {
  right: 15px;
  bottom: 61px;
  height: 84px;
  border-radius: 4px;
  width: 36px;
}
#drawing-surface .amap-ui-control-theme-shrink {
  right: 15px;
  bottom: 135px;
  height: 84px;
  border-radius: 4px;
  width: 36px;
}
#drawing-surface .amap-ui-control-theme-large-small .amap-ui-control-zoom {
  width: 36px;
  border: 0px;
}
#drawing-surface .amap-ui-control-theme-shrink .amap-ui-control-zoom {
  width: 36px;
  border: 0px;
}

.amap-ui-control-theme-large-small
  .amap-ui-control-zoom
  .amap-ui-control-zoom-in,
.amap-ui-control-theme-large-small
  .amap-ui-control-zoom
  .amap-ui-control-zoom-out {
  width: 36px;
  height: 42px;
}
.amap-ui-control-theme-shrink .amap-ui-control-zoom .amap-ui-control-zoom-in,
.amap-ui-control-theme-shrink .amap-ui-control-zoom .amap-ui-control-zoom-out {
  width: 36px;
  height: 42px;
}
</style>
<style lang="scss" scoped>
.nearby {
  width: 100vw;
  min-height: 100vh;

  .boxcont {
    // margin: 13px 7px 0px 7px;
    width: 100%;
    min-height: 1235px;
    position: absolute;
    top: 46px;
    bottom: 0px;
    background-color: #f1f1f1;
  }
}
#map {
  width: 100%;
  height: 100%;
  #drawing-surface {
    width: 100%;
    position: absolute;
    top: 87px;
    bottom: 0px;
  }
  .Information {
    position: absolute;
    bottom: 15px;
    left: 15px;
    width: 345px;
    height: 105px;
    background-color: white;
    border-radius: 4px;
    .tit {
      font-size: 12px;
      height: 40px;
      padding: 15px 10px;
      border-bottom: 1px solid #f0f0f0;
      .titfirst {
        font-size: 14px;
      }
      // .titconter{
      //   margin-top: 10px;
      // }
    }
    .letsgo {
      width: 100%;
      display: flex;
      font-size: 12px;
      justify-content: space-around;
      padding: 10px;
    }
  }
  .ico {
    width: 36px;
    height: 36px;
    position: absolute;
    background: url("../img/sprite_0505.png") no-repeat rgba(0, 0, 0, 0.4);
    background-size: 230px 982px;
    border-radius: 4px;
    z-index: 160;
  }
  .traffic {
    background-position: -118px -14px;
    top: 8px;
    right: 15px;
  }
  .satellite {
    background-position: 0px -794px;
    top: 54px;
    right: 15px;
  }
  .trlayer {
    background-position: -118px -62px;
  }
  .salayer {
    background-position: 0px -736px;
  }
  .icon {
    width: 36px;
    height: 36px;
    position: absolute;
    background: #fff url("../img/map_icon.png") no-repeat -19px -303px;
    background-size: 48px 329px;
    border-radius: 4px;
    z-index: 160;
  }
  .download {
    left: 15px;
    bottom: 61px;
    background-position: -19px -302px;
  }
  .downloadclick {
    bottom: 181px;
  }
  .locationbefor {
    left: 15px;
    bottom: 15px;
    background-position: 7px -189px;
  }
  .locationing {
    width: 22px;
    height: 22px;
    padding: 7px 7px;
    left: 15px;
    bottom: 15px;
    background: #fff url("../img/loading.gif") no-repeat 7px 7px;
    background-size: 21px 21px;
  }
  .locationlast {
    left: 15px;
    bottom: 15px;
    background-position: 7px -245px;
  }
  .locationclick {
    bottom: 135px;
  }
  .set-up {
    bottom: 15px;
    right: 15px;
    background-position: -3px -97px;
  }

  .expansion {
    width: 36px;
    height: 84px;
    right: 15px;
    position: absolute;
    background-color: #fff;
    border-radius: 4px;
    bottom: 61px;
    .iconl {
      height: 41px;
      border-bottom: 1px solid #ddd;
      background: #fff url("../img/map_icon.png") no-repeat;
      margin: 0 7px;
      background-size: 48px 329px;
      z-index: 160;
    }
    .enlarge {
      background-position: 0px 12px;
    }
    .narrow {
      background-position: -30px 13px;
    }
  }
  #search-box {
    height: 32px;
    background-color: #3d92fb;
    padding: 0 10px 10px 10px;
    #frame {
      width: 100%;
      height: 32px;
      color: #ffffff;
      background: #357fdb;
      border-radius: 4px;
      position: relative;
      #inp {
        font-size: 0.9375rem;
        width: 100%;
        height: 32px;
        padding: 0 66px 0 7px;
        background: #357fdb;
        color: #ffffff;
        border-radius: 4px;
        outline-style: none;
        border: none;
        box-sizing: border-box;
        &::placeholder {
          color: #abc9f0;
          font-size: 0.9375rem;
        }
      }
      #btn {
        width: 30px;
        height: 30px;
        padding: 0px 6px 1px 6px;
        position: absolute;
        right: 0px;
        top: 0px;
        text-align: center;
        line-height: 32px;
        .icon-sousuo {
          font-size: 25px;
          color: #9dbce2;
        }
      }
    }
  }
}
</style>