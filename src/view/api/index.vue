<template>
<div>
    <Tables border 
        :columns="table_title" 
        :data="table_data" 
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
                <FormItem label="名称">
                    <Input type="text" v-model="modifyModal.formData.name"></Input>
                </FormItem>
                <FormItem label="最大期数">
                    <Input type="text" v-model="modifyModal.formData.max_num"></Input>
                </FormItem>
                <FormItem label="状态">
                    <Select v-model="modifyModal.formData.status">
                        <template v-for="(val,key) in status_desc">
                            <Option :value="key">{{val}}</Option>
                        </template>
                    </Select>
                </FormItem>
                <FormItem label="开始时间">
                    <TimePicker type="time" :value="modifyModal.formData.start_time" placeholder="请选择" style="width: 100%" @on-change="getStartTime"></TimePicker>
                </FormItem>
                <FormItem label="结束时间">
                    <TimePicker type="time" :value="modifyModal.formData.end_time" placeholder="请选择"style="width: 100%" @on-change="getEndTime"></TimePicker>
                </FormItem>
                <FormItem label="间隔">
                    <Input type="text" v-model="modifyModal.formData.gap"></Input>
                </FormItem>
                <FormItem label="排序">
                    <Input type="text" v-model="modifyModal.formData.order"></Input>
                </FormItem>
                <FormItem label="头像">
                    <MyUpload :pics="[modifyModal.formData.pic]" :flag= "3" @listenFileUpload="uploadFile" @listenFileRemove="removeFile(3)"></MyUpload>
                </FormItem>
                <FormItem label="第二次倒计时">
                     <TimePicker type="time" :value="modifyModal.formData.k_time" placeholder="请选择"style="width: 100%" @on-change="getKTime"></TimePicker>
                </FormItem>
                <FormItem label="底部说明">
                    <Input type="textarea" v-model="modifyModal.formData.shuoming"></Input>
                </FormItem>
            </Form>
        </div>
        <div slot="footer">
            <Button type="primary" @click="modify" :disabled="loading">修改</Button>
            <Button type="default" @click="reset(1)" style="margin-left: 8px" :disabled="loading">返回</Button>
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
        name: 'api_index',
        components: {
            Tables,
            MyUpload
        },
        data () {
            return {
                status_desc: {
                    '1': '有效',
                    '2': '无效'
                },
                modifyModal:{
                    open: false,
                    formData:{
                    },
                },
                table_title: [
                    {
                        title: 'ID',
                        width:70,
                        key: 'id',
                    },
                    {
                        title: '名称',
                        width:90,
                        key: 'name',
                    },
                    {
                        title: '状态',
                        key: 'status',
                        width:70,
                        render: (h, params) => {
                            return h('div', this.status_desc[params.row.status]);
                        }

                    },
                    {
                        title: '开始时间',
                        width:90,
                        key: 'start_time'
                    },
                    {
                        title: '结束时间',
                        width:90,
                        key: 'end_time',
                    },
                     {
                        title: '倒计时',
                        width:90,
                        key: 'k_time',
                    },
                    {
                        title: '间隔',
                        width:70,
                        key: 'gap'
                    },
                    {
                        title: '接口',
                        key: 'url'
                    },
                    {
                        title: '排序',
                        key: 'order',
                        width:90,
                        align:'center',
                    },
                    {
                        title: '图标',
                        key: 'pic',
                        align:'center',
                    },
                    {
                        title: '标志',
                        key: 'flag',
                        width:90,
                    },
                    {
                        title: '最大期数',
                        key: 'max_num',
                        width:90,
                    },
                    {
                        title: '操作',
                        key: 'oparate',
                        width:100,
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
                                }, '修改')
                            ]);
                        }
                    }
                ],
                table_data: [],
                loading:false,
                total: 100,
                pageSize:20,
            }
        },
        methods:{
            getSearchData(data) {
                this.loading = true;
                api.get('api/getConfig',data).then((data) => {
                    this.table_data = data.req.data.data.list;
                    this.pageSize = data.req.data.data.pageSize;
                    this.total = data.req.data.data.total;
                });

                this.loading = false;
            },
            getResetData(data){
            },
            getEndTime(data) {
                this.modifyModal.formData.end_time = data;
            },
            getStartTime(data) {
                this.modifyModal.formData.start_time = data;
            },
            getKTime(data) {
                this.modifyModal.formData.k_time = data;
            },
            //打开模态
            openModifyModal(data) {
                this.modifyModal.open = true;
                this.modifyModal.formData = {
                    id: data.id,
                    max_num:data.max_num,
                    start_time:data.start_time,
                    end_time:data.end_time,
                    name: data.name,
                    gap: data.gap,
                    k_time: data.k_time,
                    shuoming: data.shuoming,
                    status: data.status + '',
                    order:data.order,
                    pic: data.pic

                };
            },
            modify () { console.log(this.modifyModal.formData); modifys('api/modifyConfig',this);},
            reset(flag) {resets(flag,this);},
            //文件上传
            uploadFile (param,flag) { uploadFiles(param,flag,this);},
            removeFile (flag) {removeFiles(flag,this);}
        },
        mounted () {
            this.getSearchData();
        }
        
    }
</script>
