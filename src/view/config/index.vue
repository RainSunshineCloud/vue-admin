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
                    <Input type="text" :readonly='true' v-model="modifyModal.formData.name"></Input>
                </FormItem>
                <FormItem label="描述">
                    <Input type="text" v-model="modifyModal.formData.desc"></Input>
                </FormItem>
                <FormItem label="值">
                    <Input type="text" v-model="modifyModal.formData.value"></Input>
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
    import {resets,modifys} from '@/libs/methods.js'
    export default {
        name: 'config_index',
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
                        title: '名称',
                        key: 'name',
                    },
                    {
                        title: '描述',
                        key: 'desc'
                    },
                    {
                        title: '值',
                        key: 'value'
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
                api.get('api/getOtherConfig',data).then((data) => {
                    this.table_data = data.req.data.data.list;
                    this.pageSize = data.req.data.data.pageSize;
                    this.total = data.req.data.data.total;
                });

                this.loading = false;
            },
            getResetData(data){
            },
            //打开模态
            openModifyModal(data) {
                this.modifyModal.open = true;
                this.modifyModal.formData = {
                    name: data.name,
                    desc: data.desc,
                    value: data.value,
                };
            },
            modify () { console.log(this.modifyModal.formData); modifys('api/modifyOtherConfig',this);},
            reset(flag) {resets(flag,this);},
        },
        mounted () {
            this.getSearchData();
        }
        
    }
</script>
