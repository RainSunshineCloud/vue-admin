<template>
    <div>
        <Tables border 
            :columns="table_title" 
            :data="table_data" 
            :searchField="searchField"
            :loading="loading"
            :total = 'total'
            :pageForm = 'pageForm'
            @listenFormData='getSearchData'
            @listenResetFormData = "getResetData"
            >
        </Tables>

        <Modal v-model="modify_form.open" width="660" @on-cancel="close('modify_form')">
            <p slot="header"><span>修改</span></p>
            <FormItem :data='modify_form.data' :formFields='modify_title'></FormItem>
            <div slot="footer">
                <Button type="primary" @click="modify">修改</Button>
                <Button type="default" @click="reset('modify_form')" style="margin-left: 8px">重置</Button>
            </div>
        </Modal>

        <Modal v-model="add_form.open" width="660" @on-cancel="close('add_form')">
            <p slot="header"><span>添加</span></p>
            <FormItem :data='add_form.data' :formFields='add_title'></FormItem>
            <div slot="footer">
                <Button type="primary" @click="add">添加</Button>
                <Button type="default" @click="close('add_form')" style="margin-left: 8px">返回</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
    
    import Tables from '@/components/tables'
    import api from '@/api/api.js'
    import modalMixin from '@/mixin/modal.js'
    import FormItem from '@/components/form-item'
    export default {
        name: 'user_index',
        components: {
            Tables,
            FormItem
        },
        mixins:[modalMixin],
        data () {
            return {
                status: {
                    1 : '有效',
                    2 : '无效',
                },
                modify_form: {
                    open:false,
                    data:{
                        role_name:'',
                        user_name:'',
                        role_id:'',
                        status:1,
                    }//修改表单数据
                },
                modify_title: [
                    {
                        key:'user_name',
                        title:'用户名',
                        readonly:true,
                        type:'text',

                    },
                    {
                        key:'role_name',
                        type:'text',
                        readonly:true,
                        title:'角色名',
                    },
                    {
                        key:'status',
                        title:'状态',
                        fields:{'1':'有效','2':'无效',},
                        type:'select',
                        
                    },

                ],
                add_form: {
                    open:false,
                    data:{
                        role_id:'',
                        user_id:'',
                        status:1,
                    }//修改表单数据
                },
                add_title: [
                    {
                        key:'user_name',
                        title:'用户名',
                        readonly:true,
                        type:'text',

                    },
                    {
                        key:'role_id',
                        type:'text',
                        title:'角色ID',
                    },
                    {
                        key:'status',
                        title:'状态',
                        fields:{'1':'有效','2':'无效',},
                        type:'select',
                        
                    },//表单列表

                ],
                table_title: [
                    {
                        title: '用户ID',
                        key: 'user_id',
                    },
                    {
                        title: '用户名',
                        key: 'user_name',
                    },
                    {
                        title: '角色名',
                        key: 'role_name',
                    },
                    {
                        title: '状态',
                        key: 'status',
                        render : (h,params) => {
                            return h('div',this.status[params.row.status]);
                        }
                    },
                    {
                        title: '创建时间',
                        key: 'create_time'
                    },
                    {
                        title: '更新时间',
                        key: 'update_time',
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
                                            const column = [
                                            'user_name',
                                            'role_name',
                                            'status',
                                            'user_id',
                                            'role_id'
                                            ];
                                            this.open('modify_form',params.row,column);
                                        }
                                    }
                                }, '修改'),
                                 h('Button', {
                                    props: {
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '1px'
                                    },
                                    on: {
                                        click: () => {
                                            const column = [
                                            'user_name',
                                            'status',
                                            'user_id'
                                            ];
                                            this.open('add_form',params.row,column);
                                        }
                                    }
                                }, '添加')
                            ]);
                            
                        }
                    },
                    
                ],
                table_data: [],
                searchField: [
                    [
                        {
                            key:'user_name',
                            type:'text',
                            placeholder:'用户名',
                            name:'用户名',
                        },
                        {
                            key:'role_name',
                            type:'text',
                            placeholder:'角色名',
                            name:'角色名',
                        }
                    ]
                ],
                loading:false,
                total: 1,
                pageForm: {
                    page:1,
                    pageSize:10,
                },
            }
        },
        methods:{
            getSearchData(data) {
                this.loading = true;
                api.get('permession/userRoleList',data).then((res) => {
                    this.table_data = res.data.list;
                    this.pageSize = res.data.pageSize;
                    this.total = res.data.total;
                });

                this.loading = false;
            },
            getResetData(data){
                this.getSearchData(this.pageForm);
            },
            modify() {
                api.post('permession/modifyUserRole',this.modify_form.data).then( (res) => {
                    this.$Message.success('修改成功');
                    this.getSearchData(this.pageForm);
                    this.modify_form.open = false;
                });
            },
            add() {
                api.post('permession/addUserRole',this.add_form.data).then( (res) => {
                    this.$Message.success('修改成功');
                    this.getSearchData(this.pageForm);
                    this.add_form.open = false;
                });
            }
        },
        mounted () {
            this.getSearchData(this.pageForm);
        }
        
    }
</script>
