<template>
  <div class="boxsty">
    <div id="box">
      <div class="pict"><img :src="boxdata.img" alt="" /></div>
      <div
        class="boxctn"
        v-for="(elm, index) in boxdata.content"
        :key="elm[index]"
      >
        <div class="boxson" @click="search(elm[0]),business=false">
          <router-link :to="{ path: '/Map/shopkeeper', query: {category:elm[0]} }" tag="div">
            {{ elm[0] }}
          </router-link>
        </div>
        <div class="boxson cent" @click="search(elm[1]),business=false">
          <router-link :to="{ path: '/Map/shopkeeper', query: {category:elm[1]} }" tag="div">
            {{ elm[1] }}
          </router-link>
        </div>
        <div class="boxson" @click="search(elm[2]),business=false">
          <router-link :to="{ path: '/Map/shopkeeper', query: {category:elm[2]} }" tag="div">
            {{ elm[2] }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    boxdata: Object,
    endpoint: Object,
  },
  data() {
    return {
      surroundingData: null,
      business:true,
    };
  },
  methods: {
    search(e) {
      console.log(e);

      this.$emit("businessdis",this.business);



      // this.$emit("category",e);

      
    },
  },
};
</script>
<style lang="scss" scoped>
.boxsty {
  padding: 0px 10px;
}
#box {
  padding: 9px 1px 0px 1px;
  width: 100%;
  padding-left: 30px;
  position: relative;
  box-sizing: border-box;
  background-color: #fff;
  margin-top: 10px;
  .pict {
    position: absolute;
    left: 3px;
    top: 0px;
    width: 26px;
    height: 26px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .boxctn {
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #f1f1f1;

    .boxson {
      width: 33%;
      line-height: 32px;
      display: inline-block;
      text-align: center;
      margin: 5px 0px;
    }
    .cent {
      border-left: 1px dotted #a4a5a9;
      border-right: 1px dotted #a4a5a9;
    }
  }
}
</style>