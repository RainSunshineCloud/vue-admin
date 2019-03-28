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
                <Form ref="modifyModal.formData" :model="modifyModal.formData" :label-width="110">
                    <FormItem label="ID">
                        <Input type="text" :readonly="true" v-model="modifyModal.formData.id"></Input>
                    </FormItem>
                    <FormItem label="下一期">
                        <Input type="text" v-model="modifyModal.formData.next_num"></Input>
                    </FormItem>
                    <FormItem label="总期数">
                        <Input type="text" v-model="modifyModal.formData.total_count"></Input>
                    </FormItem>
                    <FormItem label="当前开奖时间戳">
                        <Input type="text" v-model="modifyModal.formData.now_time"></Input>
                    </FormItem>
                    <FormItem label="下一期开奖时间戳">
                        <Input type="text" v-model="modifyModal.formData.next_num"></Input>
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
    import {dateFormat} from '@/libs/tools.js'
    import {resets,modifys} from '@/libs/methods.js'
    export default {
        name: 'data_res',
        components: {
            Tables,
        },
        data () {
            return {
                table_title: [
                    {
                        title: 'ID',
                        key: 'id',
                        width:70,
                        align:'center',
                    },
                    {
                        title: '类型',
                        key: 'type',
                        width:90,
                        align:'center',
                        render: (h, params) => {
                           return h('div', this.searchField[0][0].fields[params.row.type]);
                        }
                    },
                    {
                        title: '当前期',
                        key: 'now_num',
                        align:'center',
                    },
                    {
                        title: '下一期',
                        key: 'next_num',
                        align:'center',
                    },
                    {
                        title: '已开期数',
                        key: 'draw_count',
                        width:90,
                        align:'center',
                    },
                    
                    {
                        title: '总期数',
                        key: 'total_count',
                        align:'center',
                        width:80,
                    },
                     {
                        title: '开奖号码',
                        key: 'now_code',
                        align:'center',
                        width:90,
                    },
                    {
                        title: '总和',
                        key: 'sum_num',
                        align:'center',
                        width:80,
                    },
                    {
                        title: '当前开奖时间',
                        key: 'now_time',
                        align:'center',
                        width:120,
                        render : (h,params) => {
                           return h("div",dateFormat(params.row.now_time,"m-d H:i"));
                        }
                    },
                     {
                        title: '下期开奖时间',
                        key: 'next_time',
                        align:'center',
                        width:120,
                        render : (h,params) => {
                           return h("div",dateFormat(params.row.next_time,"m-d H:i"));
                        }
                    },
                    {
                        title: '大/小',
                        key: 'is_big',
                        align:'center',
                        width:80,
                        render: (h, params) => {
                            return h('div', this.getName(params.row.is_big,1));
                        }
                    },
                    {
                        title: '单/双',
                        key: 'is_double',
                        align:'center',
                        width:80,
                        render: (h, params) => {
                            return h('div', this.getName(params.row.is_double,2));
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
                modifyModal:{
                    open: false,
                    formData:{
                    },
                },
                table_data: [],
                searchField: [
                    [
                        {
                            key:'type',
                            type:'select',
                            fields:{'1':'江苏','2':'湖北','3':'吉林','4':'河北','5':'甘肃','6':'上海','7':'一分快三','8': '三分快三','9': '五分快三'},
                            placeholder:'姓名',
                            name:'接口名',
                        },
                        {
                            key:'now_num',
                            type:'text',
                            placeholder:'期数',
                            name:'期数',
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
                api.get('api/getResList',data).then((data) => {
                    this.table_data = data.req.data.data.list;
                    this.total = data.req.data.data.total;
                });

                this.loading = false;
            },
            getResetData(data) {
                this.getSearchData(data);
            },
            getName(index,type) {
            	switch (index) {
            		case 0:
            			return '?';
            		case 1:
            			return type == 1 ? '小' : '单';
            		case 2:
            			return type == 2 ? '大' : '双';
            	}
            },
            reset(flag) {resets(flag,this);},
            modify () {modifys('api/modifyPlan',this);},
            //打开模态
            openModifyModal(data) {
                this.modifyModal.open = true;
                this.modifyModal.formData = {
                    id: data.id,
                    next_num: data.next_num,
                    total_count: data.total_count,
                    now_time:data.now_time + "",
                    next_time:data.now_time + "",
                };
            },
        },
        mounted () {
            this.getSearchData({pageSize:this.pageSize,page:1});
        },
        
        
    }
</script>
