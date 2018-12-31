<template>
    <div style="height: 100%;">
        <markdown @listenData="getData" url="//vm.test.com/git/test/input.php" :formData="formData"></markdown>
    </div>
</template>
<script>
    import markdown from "@/components/markdown"
    export default {
        name: 'article_edit',
        components: {
            markdown
        },
        data() {
            return {
                formData:{
                        article:"",
                        pic:{},
                        cate:'',
                        title:'',
                        desc:'',
                        type:''
                    }
            };
        },
        methods:{
            getData(data) {
                this.formData = {
                        article:"",
                        pic:{},
                        cate:'',
                        title:'',
                        desc:'',
                        type:''
                    }

            }
        }    
    }
</script>
