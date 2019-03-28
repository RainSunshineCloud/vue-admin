<template>
    <div>
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
                <Form ref="modifyModal.formData" :model="modifyModal.formData" :label-width="100">
                    <FormItem label="ID">
                        <Input type="text" :readonly="true" v-model="modifyModal.formData.id"></Input>
                    </FormItem>
                    <FormItem label="开始期数">
                        <Input type="text" v-model="modifyModal.formData.start_num"></Input>
                    </FormItem>
                    <FormItem label="结束期数">
                        <Input type="text" v-model="modifyModal.formData.end_num"></Input>
                    </FormItem>
                    <FormItem label="对比期数">
                        <Input type="text" v-model="modifyModal.formData.compare_issue"></Input>
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
        name: 'data_plan',
        components: {
            Tables,
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
                        width:70,
                        align:'center',
                    },
                    {
                        title: '用户ID',
                        key: 'user_id',
                        width:80,
                        align:'center',
                    },
                    {
                        title: '开始期数',
                        key: 'start_num',
                        align:'center',
                    },
                    {
                        title: '结束期数',
                        key: 'end_num',
                        align:'center',
                    },
                    
                    {
                        title: '对比期数',
                        key: 'compare_issue',
                        align:'center',
                    },
                    {
                        title: '截止期数',
                        key: 'hit_num',
                        align:'center',
                    },

                    {
                        title: '计划',
                        key: 'plan',
                        width:80,
                        align:'center',
                        render: (h, params) => {
                            return h('div', this.getName(params.row.plan,params.row.type));
                        }

                    },
                    {
                        title: '结果',
                        key: 'res',
                        width:80,
                        align:'center',
                        render: (h, params) => {
                            return h('div', this.getName(params.row.res,params.row.type));
                        }
                    },
                    {
                        title: '中/挂',
                        key: 'plan_res',
                        width:80,
                        align:'center',
                        render: (h, params) => {
                          	return h('div', this.getRes(params.row.plan_res));
                        }

                    },
                    {
                        title: '连中',
                        key: 'long_hit',
                        width:80,
                        align:'center',
                    },
                    {
                        title: '类型',
                        key: 'type',
                        width:80,
                        align:'center',
                        render: (h, params) => {
                           return h('div', this.getType(params.row.type));
                        }
                    },
                    {
                        title: '操作',
                        key: 'oparate',
                        width:80,
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
                searchField: [
                    [
                        {
                            key:'type',
                            type:'select',
                            fields:{1:'大小',2:'单双'},
                            placeholder:'类型',
                            name:'类型',
                        },
                        {
                            key:'user_id',
                            type:'text',
                            placeholder:'用户ID',
                            name:'用户ID',
                        },
                        {
                            key:'start_num',
                            type:'text',
                            placeholder:'开始期数',
                            name:'开始期数',
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
                api.get('Ddapi/getPlanList',data).then((data) => {
                    this.table_data = data.req.data.data.list;
                    this.total = data.req.data.data.total;
                });

                this.loading = false;
            },
            reset(flag) {resets(flag,this);},
            modify () {modifys('Ddapi/modifyRes',this);},
            getResetData(data) {
                this.getSearchData(data);
            },
            getType(type) {
                switch (type) {
                    case 1:
                        return '大小';
                    case 2:
                        return '单双';
                }
            },
            getRes(res) {
                switch (res) {
                	case 0:
            			return '?';
                    case 1:
                        return '中';
                    case 2:
                        return '挂';
                }
            },
            getName(index,type) {
            	switch (type) {
            		case 0:
            			return '?';
            		case 1:
            			return index == 1 ? '小' : '大';
            		case 2:
            			return index == 2 ? '单' : '双';
            	}
            },
            //打开模态
            openModifyModal(data) {
                this.modifyModal.open = true;
                this.modifyModal.formData = {
                    id: data.id,
                    start_num: data.start_num,
                    end_num: data.end_num,
                    compare_issue:data.compare_issue,
                };
            },
            
        },
        mounted () {
            this.getSearchData({pageSize:this.pageSize,page:1});
        }
        
    }
</script>
