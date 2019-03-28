<template>
    <div>
        <Button type="primary" @click="openAddModal">添加</Button>
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

        <Modal v-model="modifyModal.open" width="660" @on-cancel="reset(1)">
            <p slot="header">
                <span>修改</span>
            </p>
            <div style="text-align:center">
                <Form ref="modifyModal.formData" :model="modifyModal.formData" :label-width="80">
                    <FormItem label="ID">
                        <Input type="text" :readonly="true" v-model="modifyModal.formData.id"></Input>
                    </FormItem>
                    <FormItem label="名称">
                        <Input type="text" v-model="modifyModal.formData.nickname"></Input>
                    </FormItem>
                    <FormItem label="状态">
                        <Select v-model="modifyModal.formData.status">
                            <Option value=1>使用中</Option>
                            <Option value=2>不显示</Option>
                            <Option value=2>不生成</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="头像">
                        <MyUpload :pics="[modifyModal.formData.header]" @listenFileUpload="uploadFile" :flag= "1" @listenFileRemove="removeFile(1)"></MyUpload>
                    </FormItem>
                    <FormItem label="类型" prop="type">
                        <Select v-model="modifyModal.formData.type">
                            <Option value=1>民间高手</Option>
                            <Option value=2>业内专家</Option>
                        </Select>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button type="primary" @click="modify" :disabled="loading">修改</Button>
                <Button type="default" @click="reset(1)" style="margin-left: 8px" :disabled="loading">返回</Button>
            </div>
        </Modal>

        <Modal v-model="addModal.open" width="660" @on-cancel="reset(2)">
            <p slot="header"> <span>添加</span></p>

            <div style="text-align:center">
                <Form ref="addModal.formData" :model="addModal.formData" :label-width="80">
                    <FormItem label="名称">
                        <Input type="text" v-model="addModal.formData.nickname"></Input>
                    </FormItem>
                    <FormItem label="头像">
                        <MyUpload :pics="[addModal.formData.header]" :flag= "2" @listenFileUpload="uploadFile" @listenFileRemove="removeFile(2)"></MyUpload>
                    </FormItem>
                    <FormItem label="类型" prop="type">
                        <Select v-model="addModal.formData.type">
                            <Option value=1>民间高手</Option>
                            <Option value=2>业内专家</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="接口名" prop="flag">
                        <Select v-model="addModal.formData.flag">
                            <template v-for="(val,key) in searchField[0][0].fields">
                                <Option :value="key">{{val}}</Option>
                            </template>
                        </Select>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button type="primary" @click="add" :disabled="loading">添加</Button>
                <Button type="default" @click="reset(2)" style="margin-left: 8px" :disabled="loading">返回</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
    
    import Tables from '@/components/tables'
    import api from '@/api/api.js'
    import MyUpload from '@/components/my-upload'
    import {removeFiles,uploadFiles,resets,modifys,adds} from '@/libs/methods.js'
    export default {
        name: 'api_user',
        components: {
            Tables,
            MyUpload
        },
        data () {
            return {
                pics:[],
                modifyModal:{
                    open: false,
                    formData:{
                    },
                },
                addModal:{
                    open: false,
                    formData:{
                    },
                },
                table_title: [
                    {
                        title: 'ID',
                        key: 'id',
                        width:70,
                        align:'center',
                    },
                    {
                        title: '名称',
                        key: 'nickname',
                        width:90,
                        align:'center',
                    },
                    {
                        title: '头像',
                        key: 'header'
                    },
                    {
                        title: '接口名',
                        key: 'name',
                        width:80,
                        align:'center',
                    },
                    {
                        title: '状态',
                        key: 'status',
                        width:100,
                        align:'center',
                        render: (h, params) => {
                            return h('div', this.getStatus(params.row.status));
                        }
                    },
                    {
                        title: '类型',
                        key: 'type',
                        width:100,
                        align:'center',
                        render: (h, params) => {
                            return h('div', this.getType(params.row.type));
                        }
                    },
                    {
                        title: '操作',
                        key: 'oparate',
                        width:150,
                        align:'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.openModifyModal(params.row);
                                        }
                                    }
                                }, '修改'),
                                // h('Button', {
                                //     props: {
                                //         size: 'small'
                                //     },
                                //     style: {
                                //         marginRight: '5px'
                                //     },
                                //     on: {
                                //         click: () => {
                                //             dels("api/delPlanUser",this,{id:params.row.id});
                                //         }
                                //     }
                                // }, '删除')
                            ]);
                        }
                    }
                ],
                table_data: [],
                searchField: [
                    [
                        {
                            key:'flag',
                            type:'select',
                            fields:{'1':'江苏','2':'湖北','3':'吉林','4':'河北','5':'甘肃','6':'上海','7':'一分快三','8': '三分快三','9': '五分快三','10':'幸运飞艇','11':'蛋蛋'},
                            placeholder:'姓名',
                            name:'接口名',
                        }
                    ]
                ],
                loading:false,
                total: 100,
                pageSize:10,
            }
        },
        methods:{
            getSearchData(data) {
                this.loading = true;
                api.get('api/getPlanUser',data).then((data) => {
                    this.table_data = data.req.data.data.list;
                    this.total = data.req.data.data.total;
                });

                this.loading = false;
            },
            getResetData(data) {
                this.getSearchData(data);
            },
            getType(type) {
                switch (type) {
                    case 1:
                        return '民间高手';
                    case 2:
                        return '业内专家';
                }
            },
            getStatus(status) {
                switch (status) {
                    case 1:
                        return '使用中';
                    case 2:
                        return '不显示';
                    case 3:
                        return '不生成';
                }
            },
            //打开模态
            openModifyModal(data) {
                this.modifyModal.open = true;
                this.modifyModal.formData = {
                    id: data.id,
                    nickname: data.nickname,
                    header: data.header,
                    type: '' + data.type,
                    status: '' + data.status,
                };
            },
            openAddModal() {
                this.addModal.open = true;
                this.addModal.formData = {
                    header:'',
                    nickname: '',
                    type: '',
                    flag:'',
                };
            },
            modify () {modifys('api/modifyPlanUser',this);},
            add() { adds('api/addPlanUser',this);},
            reset(flag) {resets(flag,this);},
            //文件上传
            uploadFile (param,flag) { uploadFiles(param,flag,this);},
            // removeFile (flag) {removeFiles(flag,this);}
            
        },
        mounted () {
            this.getSearchData({pageSize:this.pageSize,page:1});
        }
        
    }
</script>
