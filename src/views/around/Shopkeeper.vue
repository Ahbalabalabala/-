<template>
    <div class="Shop">
        <van-nav-bar title="" left-text="返回" left-arrow :fixed="true" @click-left="backaround" />
       
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    props:{

    },
    methods:{
        backaround(){
            this.$emit("backaround",true);
        },
    }
}
</script>
<style lang="scss" scoped>
.Shop{
    position: absolute;
    top: 47px;
    bottom: 0px;
    width: 100%;
}
</style>