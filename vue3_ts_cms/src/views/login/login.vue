<template>
 <div class="login">
 <LoginPanel></LoginPanel>
 </div>
</template>


<script setup lang="ts">
import LoginPanel from "./c-cpns/login_panel.vue";



</script>



<style lang="less" scoped>
.login{
    display:flex;
    align-items: center;
    justify-content: center;
    height:100%;
    width:100%;
    background: url("../../assets/img/sun-tornado.svg");
}
</style>
