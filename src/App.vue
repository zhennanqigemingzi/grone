<template>
    <div class="content">
        Test111
        <Test></Test>
    </div>
    
</template>

<script>
import Test from './view/test'
export default {
    name:'app',
    components:{
        Test,
    }
}
</script>

<style scoped lang='scss'>
.content{
    color: green;
    height: 40px;
    h1{
        color: red;
    }
}

</style>