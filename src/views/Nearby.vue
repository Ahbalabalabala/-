<template>
  <div id="contact">
    <router-view
      :friends="friends"
      :chatdata="chatdata"
      :picture="picture"
      @call-send="addMsg"
    />
    
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

</style>