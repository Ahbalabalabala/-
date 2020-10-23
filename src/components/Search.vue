<template>
  <div id="search-box">
    <div id="frame">
      <input
        type="text"
        ref="inp"
        id="input"
        placeholder="搜索公交、地点、路线"
      />
      <div @click="input" id="btn">
        <span class="iconfont icon-sousuo"></span>
      </div>
    </div>
  </div>
</template>
<script>
// import AMapLoader from "@amap/amap-jsapi-loader";
export default {
  props: {
    aAMap: Object,
    amap: Object,
  },
  mounted(){
    this.input()
  },
  methods: {
    input(amap,aAMap) {
        console.log(amap,"xxx",aAMap);
    },
  },
};
</script>
<style lang="scss" scoped>
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
    #input {
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
</style>