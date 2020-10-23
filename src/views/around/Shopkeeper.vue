<template>
    <div class="Shop">
        <van-nav-bar title="" left-text="返回" left-arrow :fixed="true" @click-left="backaround" />
        <div>12456</div>
        <button>aidnji</button>
        <button>aidnji</button>
        <button>aidnji</button>
        <button>aidnji</button>
        <button>aidnji</button>
        <button>aidnji</button>
        <button>aidnji</button>
        <button>aidnji</button>
        <p>418641856456165165</p>
        <p>418641856456165165</p>
        <p>418641856456165165</p>
        <p>418641856456165165</p>
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