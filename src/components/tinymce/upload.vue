<template>
    <div>
        <div class="demo-upload-list" v-for="item in uploadList">
            <template>
                <img :src="item.url">
                <div class="demo-upload-list-cover">
                    <Icon type="ios-copy-outline" @click="copy(item.url)" :data-clipboard-text="2"></Icon>
                </div>
            </template>
        </div>

        <template v-if="uploading">
            <div style="display: inline-block;width: 58px;height:58px;line-height: 58px;">
            <div class="ivu-upload ivu-upload-drag">
                <div style="width: 58px;height:58px;line-height: 58px;">
                    <Spin fix></Spin>
                </div>
            </div>
            </div>
        </template>
        <template v-else>
            <Upload
            ref = "upload"
            :show-upload-list="false"
            :on-success="handleSuccess"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            :on-progress="handleProgress"
            type="drag"
            :action="url"
            style="display: inline-block;width:58px;">
                <div style="width: 58px;height:58px;line-height: 58px;">
                    <Icon type="ios-camera" size="20"></Icon>
                </div>
            </Upload>
        </template>
    </div>
</template>
<script>
    
    export default {
        name:"upload-tinymce",
        props:{
            getPic: {
                type:Function
            },
            url:{
                type:String
            },
            imageType:{
                type:Array,
                default:function () {
                    return ['jpg','jpeg','png'];
                },
            }
        },
        data () {
            return {uploadList : [],uploading:false};
        },
        methods: {
            handleSuccess (response, file,fileList) {
                this.uploading = false;
                this.uploadList.push(this.getPic(response,file,fileList));
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件 ' + file.name + ' 格式不正确，请上传'+this.imageType.join(' | ')+'格式的图片。'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: '超出文件大小限制',
                    desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
                });
            },
            handleBeforeUpload () {
                const check = this.uploadList.length < 5;
                if (!check) {
                    this.$Notice.warning({
                        title: '最多只能上传 5 张图片。'
                    });
                }
                
                return check;
            },
            handleProgress() {
                this.uploading = true;
            },
            copy (url) {
                this.$copyText(url).then( (e) => {
                    this.$Notice.success({
                        title: '复制图片地址成功'
                    });
                }, function (e) {
                  this.$Notice.success({
                        title: '复制图片地址失败'
                    });
                })
            }
        }
    }
</script>åß
<style scoped>
    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
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
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>
