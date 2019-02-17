<script>
	import config from '@/config'
    export default {
        props:{
            url:{
                type:String
            },
            baseUrl: {
            	type:String,
            	default () {
            		return config.apiConf.baseURL;
            	}
            },
            formData: {
                type:Object,
                default () {
                    return {
                        pic:{
                        },
                        url:''
                    };
                }
            }   
        },
        data () {
        },
        methods:{
            handleSuccess (res, file) {
                this.formData.pic = pic;
            },
            handleRemove () {
                this.fromData.pic = {};
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: '图片格式错误',
                    desc: '仅支持jpg,jpeg,png三种格式上传'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: '图片过大',
                    desc: '图片过大，最多支持2M',
                });
            }
        }
    }
</script>

<style scoped>
    .demo-upload-list{
        display: inline-block;
        width: 200px;
        line-height: 100%;
        height:100%;
        text-align: center;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }

    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
        padding:25% 0;

    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 30px;
        cursor: pointer;
    }

</style>

<template>
    <div class='demo-upload-list'>
    <template v-if="formData.pic.length">
        <img :src="baseUrl + '/' + formData.url">
        <div class="demo-upload-list-cover">
            <Icon type="ios-trash-outline" @click.native="handleRemove"></Icon>
        </div>
    </template>
    <template v-else>
        <Upload
            ref="upload"
            :show-upload-list="false"
            :on-success="handleSuccess"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            type="select"
            :action="baseUrl + '/' + url"
            style="display: inline-block;width:100%;">
            <div style="line-height: 100%;height:100%;" >
                <Icon type="ios-camera" size="35"></Icon>
            </div>
        </Upload>
    </template>
    </div>
</template>