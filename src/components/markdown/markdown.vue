<template>
    <div style="height: 100%;background:white;padding:15px 20px 30px 20px;border-radius: 10px;">
        <mavon-editor style="height: 100%;z-index:1000;" :toolbars="toolbars" v-model="formData.article">
            <span slot="left-toolbar-before"><button type="button" aria-hidden="true" class="op-icon fa" style="color:red;" @click="showTitle">存</button></span>
        </mavon-editor>
            <Drawer
                :title="title"
                v-model="show_article"
                width="400"
                :transfer="false"
                :mask="false"
            >
                <slot>
                    <Form :model="formData" :label-width="40">
                        <Row>
                            <Col span="24">
                                <FormItem label="标题" label-position="margin-right">
                                    <Input type="textarea" :rows="1" v-model="formData.title" placeholder="请输入标题" />
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="24">
                                <FormItem label="类型" label-position="right">
                                    <Select v-model="formData.type" placeholder="请选择">
                                        <template v-for="(value,key) in typeList">
                                            <Option :value="key">{{value}}</Option>
                                        </template>
                                    </Select>
                                </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="24">
                            <FormItem label="封面" label-position="right">
                                <template v-if="formData.pic.length">
                                    <img :src="formData.url">
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
                                        type="drag"
                                        :action="url"
                                        style="display: inline-block;width:100%;">
                                        <div style="width: 100%;line-height: 326px;height:326px;">
                                            <Icon type="ios-camera" size="35"></Icon>
                                        </div>
                                    </Upload>
                                </template>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="24">
                                <FormItem label="摘要" label-position="right">
                                    <Input type="textarea" v-model="formData.desc" :rows="4" placeholder="please enter the description" /> 
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                    <Row>
                        <Col span="4">
                            <Button @click="hiddenTitle">关闭</Button>
                        </Col>
                        <Col span="4">
                            <Button type="info" @click="publish(1)">草稿</Button>
                        </Col>
                        <Col span="4">
                            <Button type="primary" @click="publish(2)">发布</Button>
                        </Col>
                     </Row>
                </slot>
            </Drawer>
    </div>
</template>
<script>
    import { mavonEditor } from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'
    export default {
        name: 'markdown',
        components: {
            mavonEditor
        },
        props:{
            title: {
                type: String,
                default : "标题摘要"
            },
            typeList: {
                type:Array,
                default() {
                    return [];
                },
            },
            url:{
                type:String
            },
            formData: {
                type:Object,
                default () {
                    return {
                        article:"",
                        pic:{},
                        cate:'',
                        title:'',
                        desc:'',
                        type:''
                    };
                }
            }   
        },
        data () {
            return {
                show_article:false,
                toolbars: {
                    bold: true, // 粗体
                    italic: true, // 斜体
                    underline: true, // 下划线
                    strikethrough: true, // 中划线
                    mark: true, // 标记
                    superscript: true, // 上角标
                    subscript: true, // 下角标
                    quote: true, // 引用
                    ol: true, // 有序列表
                    ul: true, // 无序列表
                    link: true, // 链接
                    imagelink: true, // 图片链接
                    table: true, // 表格
                    fullscreen: true, // 全屏编辑
                    readmodel: true, // 沉浸式阅读
                    undo: true, // 上一步
                    redo: true, // 下一步
                    alignleft: true, // 左对齐
                    aligncenter: true, // 居中
                    alignright: true, // 右对齐
                    subfield: true, // 单双栏模式
                    preview: true, // 预览
                } 
            }
        },
        methods:{
            showTitle() {
                this.show_article = true;
            },
            hiddenTitle() {
                this.show_article = false;
            },
            handleRemove () {
                this.fromData.pic = {};
            },
            handleSuccess (res, file) {
                this.formData.pic = pic;
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
            publish(cate) {
                this.formData.cate = cate;
                this.$emit('listenData',this.formData);
            }
        }
        
    }
</script>

<style scoped>
    .demo-upload-list{
        display: inline-block;
        width: 100%;
        line-height: 100%;
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
        color: #fff;
        font-size: 30px;
        cursor: pointer;
        margin: 50% 4px;
    }

</style>