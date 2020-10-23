<template>
  <div>
    <div id="my" >
      <div class="portrait">
        <img class="portraitimg" :src="picture" alt="" />
      </div>
      <div class="myinformation">
        <p><b>昨天今天明天</b></p>
        <p></p>
      </div>
    </div>
    <div id="contacts">
      <div v-for="(item,index) in friends" :key="`${item.msg}+${index}`">
        <router-link :to="`/Nearby/chat/${item.id}`" tag="div">
          <user :id="item.id" :name="item.name" :img="item.img" :last="chatdata[item.id].slice(-1)[0].msg" />
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import user from "../../components/user";
export default {
  props: {
    friends: Array,
    chatdata: Object,
    picture:String,
  },
  data(){
    return {
    }
  },
  mounted(){
  },
  methods:{
  
  },
  components: {
    user,
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