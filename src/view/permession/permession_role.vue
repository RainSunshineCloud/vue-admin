<template>
    <div>
        <Button type="primary" @click="open('add_form',{},[])">添加</Button>
        <Tables border 
            :columns="table_title" 
            :data="table_data" 
            :searchField="searchField"
            :loading="loading"
            :pageForm = "pageForm"
            :total='total'
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
    import {dateFormat} from '@/libs/tools'
    import FormItem from '@/components/form-item'
    import modalMixin from '@/mixin/modal.js'
    export default {
        name: 'permession_role',
        components: {
            Tables,
            FormItem,
        },
        mixins:[modalMixin],
        data () {
            return {
                zone_data:{//作用域数据

                },
                status: {//状态
                    0 : '请选择',
                    1 : '有效',
                    2 : '无效',
                },
                
                default_permession: {//权限
                    1 : '允许',
                    2 : '禁止',
                },
                other_permession: {//其他人权限
                    1 : '允许',
                    2 : '禁止',
                },
                modify_form: {
                    open:false,
                    data:{
                        role_name:'sfs',
                        user_name :'ksdjf',
                        status:1,
                    }//修改表单数据
                },
                modify_title: [
                    {
                        key:'role_name',
                        title:'角色名',
                        readonly:true,
                        type:'text',

                    },
                    {
                        key:'zone_name',
                        type:'text',
                        readonly:true,
                        title:'作用域',
                    },
                    {
                        key:'permession_name',
                        type:'text',
                        readonly:true,
                        title:'权限名',
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
                        permession_id:'',
                        status:1,
                    }//修改表单数据
                },
                add_title: [
                    {
                        key:'role_id',
                        title:'角色ID',
                        type:'text',

                    },
                    {
                        key:'permession_id',
                        type:'text',
                        title:'权限ID',
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
                        title: '角色名',
                        key: 'role_name',
                    },
                    
                    {
                        title: '作用域',
                        sortable:'custom',

                        key: 'zone_name',
                    },
                    {
                        title: '权限名',
                        key: 'permession_name',
                    },
                    {
                        title: '角色权限',
                        key: 'default_permession',
                        width: 90,
                        render : (h,params) => {
                            return h('div',this.default_permession[params.row.default_permession]);
                        }
                    },
                    {
                        title: '其他人权限',
                        key: 'other_permession',
                        width: 100,
                        render : (h,params) => {
                            return h('div',this.other_permession[params.row.other_permession]);
                        }
                    },
                    {
                        title: '状态',
                        key: 'status',
                        width: 80,
                        render : (h,params) => {
                            return h('div',this.status[params.row.status]);
                        }
                    },
                    {
                        title: '更新时间',
                        key: 'update_time',
                        width: 100,
                        render: (h,params) => {
                            return h('div',dateFormat(params.row.update_time,"Y-m-d"));
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
                                            const column = [
                                            'pid',
                                            'rid',
                                            'permession_name',
                                            'role_name',
                                            'status',
                                            'zone_name'
                                            ];
                                            this.open('modify_form',params.row,column);
                                        }
                                    }
                                }, '修改'),
                            ]);
                            
                        }
                    },
                ],
                table_data: [],//表格数据
                loading:false,
                total:0,
                pageForm: {
                    page:1,
                    pageSize:10,
                }
            }
        },
        computed:{
            searchField () {
                return [
                    [
                        {
                            key:'role_name',
                            type:'text',
                            placeholder:'角色名',
                            name:'角色名',
                        },
                        {
                            key:'permession_name',
                            type:'text',
                            placeholder:'权限名',
                            name:'权限名',
                        },
                        {
                            key:'status',
                            type:'select',
                            fields:this.status,
                            placeholder:'状态',
                            name:'状态',
                        },
                    ]
                ];
            }
        },
        methods:{
            getSearchData(data) {
                this.loading = true;
                if ( !data || !data.sort) {
                    data = data || {};
                    data.sort = 'update_time desc';
                }

                if (data && data.status == 0) {
                    data.status = undefined;
                }
                
                api.get('permession/permessionRoleList',data).then((res) => {
                    this.table_data = res.data.list;
                    this.total = parseInt(res.data.total);
                });

                this.loading = false;
            },
           
            modify () {             
                api.post('permession/modifypermessionrole',this.modify_form.data).then((res) => {
                    this.modify_form.open = false;
                    this.modify_form.data = {};
                    this.getSearchData(this.pageForm);
                });
            },
            add () {
                
                api.post('permession/addpermessionrole',this.add_form.data).then((res) => {
                    this.add_form.open = false;
                    this.add_form.data = {};
                    this.getSearchData(this.pageForm);
                });
            },
            getResetData(data){
                this.getSearchData(this.pageForm)
            },
        },
        mounted () {
            this.getSearchData(this.pageForm);
        }
        
    }
</script>
