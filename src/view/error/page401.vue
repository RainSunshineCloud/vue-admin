<template>
  <div class="main">
    <div class="text">401 <br/>Not Get Permission!</div>
  </div>
</template>

<script>
export default {
    data () {
        return {
        }
    },
}

</script>

<style scoped>
    .main {
        width: 100%;
        height: 100%;
        text-align: center;
        background-image: url('../../assets/images/error-page/error-401.svg');
        background-size: cover;
        background-position: center;
       
    }
    .main > div {
        left:50%;
        top:30%;
        font-size: 2rem;
        color: red;
        position: relative;
        transform:translateY(-60%);
        transform:translateX(-50%); 
    }
</style>