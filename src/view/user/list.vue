<template>
    <div>
        <Button type="primary" @click="open('addModal')">添加</Button>
        <Tables border 
            :columns="table_title" 
            :data="table_data" 
            :searchField="searchField"
            :loading="loading"
            :total = 'total'
            :pageSize = 'pageSize'
            @listenFormData='getSearchData'
            @listenResetFormData = "getResetData"
            >
        </Tables>
        <!--修改信息 -->
        <Modal v-model="modifyModal.open" width="660" @on-cancel="reset('modifyModal')">
            <p slot="header">
                <span>修改</span>
            </p>
            <div style="text-align:center">
                <Form ref="modifyModal.formData" :model="modifyModal.formData" :label-width="80">
                    <FormItem label="ID">
                        <Input type="text" :readonly="true" v-model="modifyModal.formData.id"></Input>
                    </FormItem>
                    <FormItem label="手机号">
                        <Input type="text" v-model="modifyModal.formData.moble"></Input>
                    </FormItem>
                    <FormItem label="头像">
                        <MyUpload 
                            :pics="[modifyModal.header_url]"
                            flag= "modifyModal" 
                            url="user/uploadImg" 
                            @listenFileUpload="uploadPic"
                            @listenFileRemove="removePic"
                        >
                        </MyUpload>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button type="primary" @click="modify('user/modify','modifyModal')" :disabled="loading">修改</Button>
                <Button type="default" @click="reset('modifyModal')" style="margin-left: 8px" :disabled="loading">返回</Button>
            </div>
        </Modal>
        <!-- 修改密码 -->
        <Modal v-model="modifyPasswordModal.open" width="660" @on-cancel="reset('modifyPasswordModal')">
            <p slot="header">
                <span>修改密码</span>
            </p>
            <div style="text-align:center">
                <Form ref="modifyPasswordModal.formData" :model="modifyPasswordModal.formData" :label-width="80">
                    <FormItem label="ID">
                        <Input type="text" :readonly="true" v-model="modifyPasswordModal.formData.id"></Input>
                    </FormItem>
                    <FormItem label="密码">
                        <Input type="text" v-model="modifyPasswordModal.formData.password"></Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button type="primary" @click="modify('user/modifyPassword','modifyPasswordModal')" :disabled="loading">修改</Button>
                <Button type="default" @click="reset('modifyPasswordModal')" style="margin-left: 8px" :disabled="loading">返回</Button>
            </div>
        </Modal>
        <!-- 添加用户 -->
        <Modal v-model="addModal.open" width="660" @on-cancel="reset('addModal')">
            <p slot="header"> <span>添加</span></p>

            <div style="text-align:center">
                <Form ref="addModal.formData" :model="addModal.formData" :label-width="80">
                    <FormItem label="moble">
                        <Input type="text" v-model="addModal.formData.moble"></Input>
                    </FormItem>
                    <FormItem label="密码">
                        <Input type="text" v-model="addModal.formData.password"></Input>
                    </FormItem>
                    <FormItem label="头像">
                        <MyUpload 
                            :pics="[addModal.header_url]" 
                            flag= "addModal"
                            url="user/uploadImg"
                            @listenFileUpload="uploadPic" 
                            @listenFileRemove="removePic"
                        >
                        </MyUpload>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button type="primary" @click="add('user/add','addModal')" :disabled="loading">添加</Button>
                <Button type="default" @click="reset('addModal')" style="margin-left: 8px" :disabled="loading">返回</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
    import {dateFormat} from '@/libs/tools'
    import Tables from '@/components/tables'
    import MyUpload from '@/components/my-upload'
    import modal from '@/mixin/modalMixin.js'
    import upload from '@/mixin/uploadMixin.js'
    import api from '@/api/api.js'
    export default {
        name: 'user_list',
        mixins: [modal,upload],
        components: {
            Tables,
            MyUpload
        },
        data () {
            return {
                modifyModal:{
                    open: false,
                    formData:{
                    },
                    header_url:'',
                },
                modifyPasswordModal:{
                    open: false,
                    formData:{
                    },
                },
                addModal:{
                    open: false,
                    formData:{
                    },
                    header_url:'',
                },
                table_title: [
                    {
                        title: 'ID',
                        key: 'id',
                        align:'center',
                    },
                    {
                        title: '手机号',
                        key: 'moble',
                        align:'center',
                    },
                    {
                        title: '创建时间',
                        key: 'create_time',
                        align:'center',
                        render: (h,params) => {
                            return h('div',dateFormat(params.row.create_time)); 
                        }
                    },
                    {
                        title: '更新时间',
                        key: 'update_time',
                        align:'center',
                        render: (h,params) => {
                            return h('div',dateFormat(params.row.update_time)); 
                        }
                    },
                    {
                        title: '操作',
                        key: 'operate',
                        align:'center',
                        render: (h,params) => {
                            return h('div',[
                                h('Button', {
                                    props: {
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.open('modifyModal',params.row,['id','moble','header']);
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.open('modifyPasswordModal',params.row,['id','password']);
                                        }
                                    }
                                }, '修改密码')
                            ]);
                            
                        }
                    },
                ],
                table_data: [],
                searchField: [
                ],
                loading:false,
                total: 100,
                pageSize:20,
            }
        },
        methods:{
            getSearchData(data) {
                this.loading = true;
                api.get('user/list',data).then((res) => {
                    this.table_data = res.data.list;
                    this.pageSize = parseInt(res.data.pageSize);
                    this.total = parseInt(res.data.total);
                });

                this.loading = false;
            },
        },
        mounted () {
            this.getSearchData();
        },
    }
</script>
