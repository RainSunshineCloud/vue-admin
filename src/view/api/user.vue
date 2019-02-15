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

     <Modal v-model="modifyModify.openModify" width="660" @on-cancel="resetChargeCoin(true)">
            <p slot="header">
                <span>修改</span>
            </p>
            <div style="text-align:center">
                <Form ref="modifyModify.formData" :model="modifyModify.formData" :label-width="80">
                    <FormItem label="ID">
                        <Input type="text" :readonly="true" v-model="modifyModify.formData.id"></Input>
                    </FormItem>
                    <FormItem label="名称">
                        <Input type="text" v-model="modifyModify.formData.nickname"></Input>
                    </FormItem>
                    <FormItem label="头像">
                        <Input type="text" v-model="modifyModify.formData.header"></Input>
                    </FormItem>
                    <FormItem label="类型" prop="type">
                        <Select v-model="modifyModify.formData.type">
                            <Option value="1">民间高手</Option>
                            <Option value="2">业内专家</Option>
                        </Select>
                    </FormItem>
                     <FormItem label="接口名" prop="flag">
                        <Select  v-model="modifyModify.formData.flag">
                            <Option value="1">江苏</Option>
                            <Option value="2">湖北</Option>
                            <Option value="3">吉林</Option>
                            <Option value="4">河北</Option>
                            <Option value="5">甘肃</Option>
                            <Option value="6">上海</Option>
                        </Select>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button type="primary" @click="modify" :disabled="loading">修改</Button>
                <Button type="default" @click="reset" style="margin-left: 8px" :disabled="loading">返回</Button>
            </div>
        </Modal>
        </div>
</template>
<script>
    
    import Tables from '@/components/tables'
    import api from '@/api/api.js'
    export default {
        name: 'api_user',
        components: {
            Tables
        },
        data () {
            return {
                modifyModify:{
                    openModify: false,
                    formData:{
                    },
                },
                ruleCharge:{},
                table_title: [
                    {
                        title: 'ID',
                        key: 'id',
                    },
                    {
                        title: '名称',
                        key: 'nickname',
                    },
                    {
                        title: '头像',
                        key: 'header'
                    },
                    {
                        title: '接口名',
                        key: 'name',
                    },
                    {
                        title: '类型',
                        key: 'type',
                        render: (h, params) => {
                                return h('div', this.getType(params.row.type));
                        }
                    },
                    {
                        title: '操作',
                        key: 'oparate',
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
                                            this.modifyModal(params.row);
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
                            key:'flag',
                            type:'select',
                            fields:{0:'请选择',1:'江苏',2:'湖北',3:'吉林',4:'河北',5:'甘肃',6:'上海'},
                            placeholder:'姓名',
                            name:'接口名',
                        }
                    ]
                ],
                loading:false,
                total: 100,
                pageSize:20,
            }
        },
        methods:{
            getSearchData(data) {
                this.loading = true;
                api.get('api/getPlanUser',data).then((data) => {
                    this.table_data = data.req.data.data.list;
                    this.pageSize = data.req.data.data.pageSize;
                    this.total = data.req.data.data.total;
                });

                this.loading = false;
            },
            getType(type) {
                switch (type) {
                    case 1:
                        return '民间高手';
                    case 2:
                        return '业内专家';
                }
            },
            modifyModal(data) {
                this.modifyModify.openModify = true;
                this.modifyModify.formData = {
                    id: data.id,
                    nickname: data.nickname,
                    header: data.header,
                    type: data.type,
                    flag: data.flag
                };
            },
            modify () {
                api.post('api/modifyPlanUser',this.modifyModify.formData).then((data) => {
                   this.modifyModify.openModify = false;
                   this.getSearchData();
                });
            },
            reset (data) {
                this.modifyModify.openModify = false;
                this.modifyModify.formData = {};
            },

            getResetData(data) {
            }
        },
        mounted () {
            this.getSearchData();
        }
        
    }
</script>
