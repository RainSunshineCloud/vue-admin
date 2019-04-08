<template>
    <div>
	    <template v-if="pics.length && pics[0] != '' && !!pics[0]" >
    	    <div class="demo-upload-list" :style="{width:width}">
    	       	<img :src="pics[0]">
    	        <div class="demo-upload-list-cover">
    	            <Icon type="ios-trash-outline" @click.native="handleRemove"></Icon>
    	        </div>
    	    </div>
	    </template>
	    <template v-else>
	        <Upload
	            ref="upload"
	            :show-upload-list="false"
	            :format="['jpg','jpeg','png']"
	            :max-size="2048"
	            :on-format-error="handleFormatError"
	            :on-exceeded-size="handleMaxSize"
	            type="drag"
	            action=""
	            :before-upload="uploadFunc"
	            style="display: inline-block;width:100%;">

	            <div style="line-height: 100%;height:100%;" >
	                <Icon type="ios-camera" size="35"></Icon>
	            </div>
	        </Upload>
	    </template>
    </div>
</template>

<script>
    export default {
        props:{
            pics: {
                type:Array,
                default () {
                    return [];
                }
            },
            width: {
            	type:String,
            	default:'200px',
            },
            flag: {
                type:String
            },
            url: {
                type:String
            }
        },
        methods:{
            handleRemove () {
                this.$emit('listenFileRemove',this.flag);
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
            },
            uploadFunc (file) {
                let formData = new FormData();
                formData.append('file',file);
            	this.$emit('listenFileUpload',formData,this.flag,this.url);
            	return false;
            	
            }
        }
    }
</script>

<style scoped>
    .demo-upload-list{
        display: inline-block;
        width: 100px;
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
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
    	position: absolute;
        color: #fff;
        font-size: 30px;
        cursor: pointer;
        vertical-align: middle;
        top: 50%;
        left:50%;
    	margin: -15px 0 0 -15px;
    }

</style>

