<template>
  <div id="contact">
    <router-view
      :friends="friends"
      :chatdata="chatdata"
      :picture="picture"
      @call-send="addMsg"
    />
    <!-- <div id="service">
      <div class="modular first-line" @click="bbc"> 
        <div class="picture delicious-food"></div>
        <div class="font">美食</div>
      </div>
      <div class="modular first-line">
        <div class="picture hotel-Reservation"></div>
        <div class="font">订酒店</div>
      </div>
      <div class="modular first-line">
        <div class="picture watch-movie"></div>
        <div class="font">看电影</div>
      </div>
      <div class="modular first-line">
        <div class="picture scenic-spot"></div>
        <div class="font">景点</div>
      </div>
      <div class="modular">
        <div class="picture bank"></div>
        <div class="font">银行</div>
      </div>
      <div class="modular">
        <div class="picture internet-bar"></div>
        <div class="font">网吧</div>
      </div>
      <div class="modular">
        <div class="picture shopping"></div>
        <div class="font">购物</div>
      </div>
      <div class="modular">
        <div class="picture public-toilets"></div>
        <div class="font">公厕</div>
      </div>
      <div class="modular">
        <div class="picture bus-stop"></div>
        <div class="font">公交站</div>
      </div>
      <div class="modular">
        <div class="picture metro-station"></div>
        <div class="font">地铁站</div>
      </div>
      <div class="modular">
        <div class="picture parking-lot"></div>
        <div class="font">停车场</div>
      </div>
      <div class="modular">
        <div class="picture more"></div>
        <div class="font">更多</div>
      </div>
    </div>
    <div id="Open-link">
      <div class="ico"></div>
      <span>更多详情，点击查看</span><button>打开</button>
    </div> -->
  </div>
</template>

<script>
// import AMapLoader from "@amap/amap-jsapi-loader";
// import user from "../components/user";
export default {
  props: {
    friends: Array,
    chatdata: Object,
    picture: String,
  },
  data() {
    return {
      // picture: "",
      // num: 4,
    };
  },
  computed: {},
  mounted() {
    this.adduser();
  },
  methods: {
    adduser() {
      // let _this = this;
      if (this.$route.query.name) {
        let user = {};
        user.name = this.$route.query.name;
        user.img = this.$route.query.img;
        // user.id = this.num;
        // this.friends.push(user);
        // this.chatData[this.num] = [{ self: false, msg: "帅哥，你好呀" }];

        this.$emit("adduser", {
          user: user,
          userchatdata: [{ self: false, msg: "你好呀" }],
          // id: this.num,
        });
        // this.num++;
      }
      console.log("巡检一下", this.chatData, this.friends);
      
    },
    addMsg({ id, msg, self }) {
      // this.chatData[id].push({
      //   msg,
      //   self,
      // });
      console.log("nearby+",id, msg, self);
      this.$emit("addchat", {
        msg: msg,
        self: self,
        id: id,
      });
    },
  },
  // beforeRouteUpdate(to, from, next) {
  //   console.log(to, from);
  //   next((vm) => {
  //     fetch(`/song/url?id=${vm.id}`);
  //   });
  // },
  components: {
    // user,
    // Search,
  },
};
</script>
<style lang="scss" scoped>
#contact {
  width: 100vw;
  position: absolute;
  top: 45px;
  bottom: 0px;
  background-color: #ebebeb;
  #my {
    width: 100%;
    height: 60px;
    padding: 10px 25px;
    box-sizing: border-box;
    font-size: 13px;
    display: flex;
    background-color: #fff;
    // justify-content: space-between;
    // align-items: center;
    border-radius: 3px;
    box-shadow: 1px 1px 1px 1px#00000040;
    margin-bottom: 10px;
    .myinformation {
      padding-left: 20px;
      font-size: 14px;
    }
    .portrait {
      width: 40px;
      height: 40px;
      // background-color: green;
      border-radius: 50%;
      .portraitimg {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
  }
  #contacts {
    width: 100%;
    position: absolute;
    top: 70px;
    bottom: 0px;
    background-color: #fff;
  }
}

// #service {
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: space-between;
//   padding: 20px 10px;

//   .modular {
//     height: 58px;
//     width: 88px;
//     margin-top: 27px;
//     .picture {
//       width: 36px;
//       height: 36px;
//       border-radius: 50%;

//       left: 0px;
//       right: 0px;
//       margin: 0px auto;
//     }
//     .font {
//       text-align: center;
//       font-size: 13px;
//       margin-top: 10px;
//     }
//     .delicious-food {
//       background: url("../img/search-icons.png") no-repeat;
//       background-size: 58px 678px;
//       background-position: -9px -125px;
//       background-color: #fc9c1e;
//     }
//     .hotel-Reservation {
//       background: url("../img/search-icons.png") no-repeat;
//       background-size: 58px 678px;
//       background-position: center -183px;
//       background-color: #398eff;
//     }
//     .watch-movie {
//       background: url("../img/search-icons.png") no-repeat;
//       background-size: 58px 678px;
//       background-position: center -341px;
//       background-color: #f26cd9;
//     }
//     .scenic-spot {
//       background: url("../img/search-icons.png") no-repeat;
//       background-size: 58px 678px;
//       background-position: center -399px;
//       background-color: #00c5c3;
//     }
//     .bank {
//       background: url("../img/search-icons.png") no-repeat;
//       background-size: 58px 678px;
//       background-position: center -11px;
//       background-color: #a671ff;
//     }
//     .internet-bar {
//       background: url("../img/search-icons.png") no-repeat;
//       background-size: 58px 678px;
//       background-position: center -239px;
//       background-color: #6f81f2;
//     }
//     .shopping {
//       background: url("../img/search-icons.png") no-repeat;
//       background-size: 58px 678px;
//       background-position: -10px -517px;
//       background-color: #f57799;
//     }
//     .public-toilets {
//       background: url("../img/search-icons.png") no-repeat;
//       background-size: 58px 678px;
//       background-position: -9px -632px;
//       background-color: #398eff;
//     }
//     .bus-stop {
//       background: url("../img/search-icons.png") no-repeat;
//       background-size: 58px 678px;
//       background-position: center -69px;
//       background-color: #2da0f7;
//     }
//     .metro-station {
//       background: url("../img/search-icons.png") no-repeat;
//       background-size: 58px 678px;
//       background-position: -9.5px -573px;
//       background-color: #35c49f;
//     }
//     .parking-lot {
//       background: url("../img/search-icons.png") no-repeat;
//       background-size: 58px 678px;
//       background-position: center -399px;
//       background-color: #53a2fc;
//     }
//     .more {
//       background: url("../img/search-icons.png") no-repeat;
//       background-size: 58px 678px;
//       background-position: center -290px;
//       background-color: #84b7fa;
//     }
//   }

//   .first-line {
//     margin: 0px;
//   }
// }
// #Open-link {
//   width: 100%;
//   height: 54px;
//   margin: 10px 0px;
//   padding-left: 36px;
//   position: relative;
//   line-height: 55px;
//   display: flex;
//   justify-content: space-between;
//   box-sizing: border-box;
//   align-items: center;
//   .ico {
//     width: 18px;
//     height: 17px;
//     display: inline-block;
//     background: url("../img/download_more.png") no-repeat;
//     background-size: 100% 100%;
//     position: absolute;
//     left: 10px;
//     top: 18px;
//   }
//   button {
//     border: 1px solid rgba(0, 144, 255, 0.93);
//     color: rgba(0, 145, 255, 0.93) !important;
//     background: #ffffff;
//     width: 55px;
//     height: 30px;
//     border-radius: 4px;
//     margin-right: 10px;
//   }
// }
</style>