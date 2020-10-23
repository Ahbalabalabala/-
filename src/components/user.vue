<template>
<div>
  
    <div class="chat">
      <div class="chatportrait">
        <img class="chatimg" :src="img" alt="" />
      </div>
      <div class="chatintroduce">
        <p><b>{{name}}</b></p>
        <p>{{last}}</p>
      </div>
    </div>
  
</div>
  
</template>
<script>
export default {
  props:["id","img","name","last"],
}
</script>
<style lang="scss" scoped>
.chat {
  width: 100%;
  height: 60px;
  padding: 10px 25px;
  box-sizing: border-box;
  font-size: 13px;
  display: flex;
  background-color: #fff;
  border-bottom: 1px solid #ccc;

  .chatintroduce {
    padding-left: 20px;
    font-size: 14px;
  }
  .chatportrait {
    width: 40px;
    height: 40px;
    // background-color: green;
    border-radius: 50%;
    .chatimg {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
}
</style>