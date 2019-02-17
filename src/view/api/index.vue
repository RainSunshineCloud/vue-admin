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
                    <Input type="text" :readonly="true" v-model="modifyModal.formData.name"></Input>
                </FormItem>
                <FormItem label="最大期数">
                    <Input type="text" v-model="modifyModal.formData.max_num"></Input>
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
    import {removeFiles,uploadFiles,resets,modifys,adds} from '@/libs/methods.js'
    export default {
        name: 'api_index',
        components: {
            Tables
        },
        data () {
            return {
                modifyModal:{
                    open: false,
                    formData:{
                    },
                },
                table_title: [
                    {
                        title: 'ID',
                        key: 'id',
                    },
                    {
                        title: '名称',
                        key: 'name',
                    },
                    {
                        title: '开始时间',
                        key: 'start_time'
                    },
                    {
                        title: '结束时间',
                        key: 'end_time',
                    },
                    {
                        title: '间隔',
                        key: 'gap'
                    },
                    {
                        title: '接口',
                        key: 'url'
                    },
                    {
                        title: '标志',
                        key: 'flag'
                    },
                    {
                        title: '最大期数',
                        key: 'max_num'
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
                };
            },
            modify () { console.log(this.modifyModal.formData); modifys('api/modifyConfig',this);},
            reset(flag) {resets(flag,this);},
        },
        mounted () {
            this.getSearchData();
        }
        
    }
</script>
