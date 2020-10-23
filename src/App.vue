<template>
  <div id="app">
    <div id="nav" v-show="display">
      <router-link to="/Map" class="tab-item" tag="li">
        <span class="iconfont icon-ditu1" />地图
      </router-link>
      <router-link to="/Line" class="tab-item" tag="li">
        <span class="iconfont icon-xiangshangjiantou" />线路
      </router-link>
      <router-link to="/Nearby" class="tab-item" tag="li">
        <span class="iconfont icon-ditu" />我的
      </router-link>
    </div>

    <router-view
      :friends="friends"
      :chatdata="chatData"
      :picture="picture"
      @adduser="adduser"
      @addchat="addchat"
      @show="show"
    />
  </div>
</template>

<script>
// import AMapLoader from "@amap/amap-jsapi-loader";
export default {
  data() {
    return {
      picture: "",
      num: 4,
      display:true,
      friends: [
        { id: 0, name: "Tom", img: null },
        { id: 1, name: "Jimmy", img: null },
        { id: 2, name: "Mike", img: null },
        { id: 3, name: "Jessica", img: null },
      ],
      chatData: {
        0: [
          { self: true, msg: "在不在?" },
          { self: true, msg: "在不在1?" },
          { self: true, msg: "在不在2?" },
          { self: true, msg: "在不在3?" },
          { self: true, msg: "在不在4?" },
          { self: false, msg: "没钱" },
        ],
        1: [
          { self: true, msg: "睡了吗?" },
          { self: true, msg: "睡了吗?" },
          { self: true, msg: "睡了吗?" },
          { self: true, msg: "睡了吗?" },
          { self: true, msg: "睡了吗?" },
          { self: false, msg: "奥利给!" },
        ],
        2: [
          { self: true, msg: "画画的贝贝?" },
          { self: true, msg: "画画的贝贝?" },
          { self: true, msg: "画画的贝贝?" },
          { self: true, msg: "画画的贝贝?" },
          { self: true, msg: "画画的贝贝?" },
          { self: false, msg: "一给屋里giao giao!" },
        ],
        3: [
          { self: true, msg: "在吗,妹妹?" },
          { self: true, msg: "在吗,妹妹?" },
          { self: true, msg: "在吗,妹妹?" },
          { self: true, msg: "在吗,妹妹?" },
          { self: true, msg: "在吗,妹妹?" },
          { self: false, msg: "在,v借50" },
        ],
      },
    };
  },
  computed: {},
  mounted() {
    this.contacts();
  },
  methods: {
    contacts() {
      let _this = this;
      //获取图片
      _this.$axios
        .get("https://api.uomg.com/api/rand.avatar", {
          params: {
            sort: "男",
            format: "json",
          },
        })
        .then((res) => {
          // let a=JSON.parse(res.data)
          _this.picture = res.data.imgurl;
          console.log(res.data.imgurl);
          // _this.friendsimgs.push(res.data.imgurl);
          // console.log(_this.friendsimgs);
          // icon.image = res.data.imgurl;
        })
        .catch(function (error) {
          console.log(error);
        });
      if (this.$route.query.name) {
        for (let i = 0; i < this.friends.length - 1; i++) {
          _this.$axios
            .get("https://api.uomg.com/api/rand.avatar", {
              params: {
                sort: "女",
                format: "json",
              },
            })
            .then((res) => {
              // console.log(res);
              _this.friends[i].img = res.data.imgurl;
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      } else {
        for (let i = 0; i < this.friends.length; i++) {
          _this.$axios
            .get("https://api.uomg.com/api/rand.avatar", {
              params: {
                sort: "女",
                format: "json",
              },
            })
            .then((res) => {
              // console.log(res);
              _this.friends[i].img = res.data.imgurl;
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      }
    },
    adduser({ user, userchatdata }) {
      console.log("appuese+", user, userchatdata, this.num);
      user.id = this.num;
      this.friends.push(user);
      this.chatData[this.num] = userchatdata;
      this.num++;
    },
    addchat({ id, msg, self }) {
      console.log("app+", id, msg, self);
      this.chatData[id].push({
        msg,
        self,
      });
    },
    show(show){
      this.display=show
    }
  },
};
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
  zoom: 1;
}
</style>
<style lang="scss" scoped>
html,
body {
  height: 100%;
  margin: 0px;
  padding: 0px;
}
#app {
  // display: flex;
  width: 100%;
  height: 100%;
  #nav {
    height: 45px;
    display: flex;
    top: 0px;
    background-color: #3d92fb;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .tab-item {
      color: #9ec9fd;
      text-decoration: none;
      list-style: none;
      font-size: 0.9375rem;
    }
    .active {
      color: #fff;
    }
  }
}
</style>