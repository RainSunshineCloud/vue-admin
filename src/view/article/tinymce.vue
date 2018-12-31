

<template>
    <Teditor :getPic="getPic" :url="url" @listenData="getData" :formData="formData" :typeList="typeList"></Teditor>
</template>

<script>
    import Teditor from "@/components/tinymce";
    export default {
        components: {
            Teditor
        },
        data() {
          return {
            getPic:function (response) {
                return response;
            },
            url:"//vm.test.com/git/test/input.php",
            typeList:{
                '1':'ksdfjk'
            },
            formData:{
                title: 'sdfsdfs',
                image: 'sdfsd',
                desc: 'sdfsd',
                type:'1',
                content:'<p>sdfsdfs</p>',
            }

          }
        },
        methods:{
            getData(data) {
                console.log(data);
            }
        }
    }
</script>