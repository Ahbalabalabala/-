<template>
  <div id="chat">
    <van-nav-bar :title="information.name" left-text="返回" @click-left="back"/>
    <div id="content">
      <div
        v-for="(item, index) in Chatrecord"
        :key="`${item.msg}+${index}`"
        :class="[{ rowleft: !item.self }, { rowright: item.self }]"
      >
        <div class="portrait">
          <img :src="!item.self ? information.img : picture" alt="" />
        </div>
        <div class="word">
          {{ item.msg }}
        </div>
      </div>
    </div>
    <div id="interactive">
      <van-field v-model="value" center clearable placeholder="请输入聊天内容" @keyup.enter="send" >
        <template #button>
          <van-button size="small" type="primary" @click="send" >发送</van-button
          >
        </template>
      </van-field>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    friends: Array,
    chatdata: Object,
    picture: String,
  },
  data() {
    return {
      value: "",
    };
  },
  computed: {
    Chatrecord() {
      // console.log(this.friends.this.$route.params.id);
      return this.chatdata[this.$route.params.id];
    },
    information() {
      return this.friends[this.$route.params.id];
    },
  },
  methods: {
    send() {
      if (!this.value) {
        return;
      }
      this.$emit("call-send", {
        msg: this.value,
        self: true,
        id: this.$route.params.id,
      });
      this.value=""
    },
    back(){
      this.$router.go(-1)
    }
  },
};
</script>
<style lang="scss" scoped>
#chat {
  width: 100%;
  height: 100%;
  background-color: #f2f2f2;
  #content {
    width: 100%;
    // position: absolute;
    // top: 50px;
    // bottom: 0;
    background-color: #f2f2f2;

    .rowleft {
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      padding: 0px 40px;
      box-sizing: border-box;
      position: relative;
      .portrait {
        position: absolute;
        width: 30px;
        height: 30px;
        left: 5px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .word {
        padding: 10px;
        background-color: #fff;
        border-radius: 4px;
      }
    }
    .rowright {
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 0px 40px;
      box-sizing: border-box;
      position: relative;
      .portrait {
        position: absolute;
        width: 30px;
        height: 30px;
        right: 5px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .word {
        padding: 10px;
        background-color: #92ed62;
        border-radius: 4px;
      }
    }
  }
  #interactive {
    position: fixed;
    width: 100%;
    bottom: 0px;
  }
}
</style>