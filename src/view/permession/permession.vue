<template>
    <div>
        <Button type="primary" @click="open('add_form',{},['id','name','default_permession','other_permession','ssid'])">添加</Button>
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
    import {dateFormat} from '@/libs/tools'
    import Tables from '@/components/tables'
    import api from '@/api/api.js'
    import FormItem from '@/components/form-item'
    import modalMixin from '@/mixin/modal.js'
    export default {
        name: 'user_list',
        components: {
            Tables,
            FormItem
        },
        mixins:[modalMixin],
        data () {
            return {
                zone_data:[],
                default_permession: {
                    1 : '允许',
                    2 : '禁止',
                },
                other_permession: {
                    1 : '允许',
                    2 : '禁止',
                },
                modify_form: {
                    open:false,
                    data:{
                        id:'',
                        name : 'ksdjf',
                        default_permession:1,
                        other_permession:1,
                    }//修改表单数据
                },
                modify_title: [
                    {
                        key:'id',
                        title:'权限ID',
                        readonly:true,
                        type:'text',

                    },
                    {
                        key:'name',
                        type:'text',
                        readonly:false,
                        title:'权限名',
                    },
                    {
                        key:'default_permession',
                        title:'权限',
                        fields:{'1':'允许','2':'禁止',},
                        type:'select',
                        
                    },
                    {
                        key:'other_permession',
                        title:'其他人权限',
                        fields:{'1':'允许','2':'禁止',},
                        type:'select',
                        
                    },

                ],
                add_form: {
                    open:false,
                    data:{
                        zid:1,
                        name : '',
                        default_permession:1,
                        other_permession:1,
                    }//修改表单数据
                },
                add_title: [
                    {
                        key:'zid',
                        title:'作用域',
                        fields:{},
                        type:'select',

                    },
                    {
                        key:'name',
                        type:'text',
                        title:'权限名',
                    },
                    {
                        key:'ssid',
                        type:'text',
                        title:'标识',
                    },
                    {
                        key:'default_permession',
                        title:'权限',
                        fields:{'1':'允许','2':'禁止',},
                        type:'select',
                        
                    },
                    {
                        key:'other_permession',
                        title:'其他人权限',
                        fields:{'1':'允许','2':'禁止',},
                        type:'select',
                        
                    },

                ],
                table_title: [
                    {
                        title: '权限ID',
                        key: 'id',
                        align:'center',
                    },
                    {
                        title: '权限名称',
                        key: 'name',
                        align:'center',
                    },
                    {
                        title: '作用域',
                        key: 'zid',
                        align:'center',
                        render: (h,params) => {
                            return h('div',this.zone_data[params.row.zid]); 
                        }
                    },
                    {
                        title: '标识',
                        key: 'ssid',
                        align:'center',
                    },
                    {
                        title: '角色权限',
                        key: 'default_permession',
                        align:'center',
                        render: (h,params) => {
                            return h('div',this.default_permession[params.row.default_permession]); 
                        }
                    },
                    {
                        title: '其他人权限',
                        key: 'other_permession',
                        render : (h,params) => {
                            return h('div',this.other_permession[params.row.other_permession]);
                        }
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
                                            this.open('modify_form',params.row,['id','name','default_permession','other_permession']);
                                        }
                                    }
                                }, '修改'),
                            ]);
                            
                        }
                    },
                ],
                table_data: [],
                searchField: [
                    [
                        {
                            key:'name',
                            type:'text',
                            placeholder:'请输入权限名',
                            name:'权限名',
                        },
                        {
                            key:'zid',
                            type:'select',
                            fields:{},
                            name:'作用域',
                        },
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
                if (data.zid == '0') {
                    data.zid = undefined;
                }

                api.get('permession/permessionList',data).then((res) => {
                    this.table_data = res.data.list;
                    this.pageSize = parseInt(res.data.pageSize);
                    this.total = parseInt(res.data.total);
                });

                this.loading = false;
            },
            getResetData(data) {
                this.getSearchData(this.pageForm)
            },
            getZoneData(data) {
                this.loading = true;
                data.field = 'id,name';
                api.get('permession/zoneList',data).then((res) => {
                    this.zone_data = {}
                    res.data.list.forEach((item) => {
                        this.zone_data[item.id] = item.name;
                    });
                    //赋值
                    this.add_title[0].fields = this.zone_data;
                    this.searchField[0][1].fields = Object.assign({
                        '0':'请选择'
                    },this.zone_data);
                });

                this.loading = false;
            },
            modify() {
                api.post('permession/modifyPermession',this.modify_form.data).then((res)=>{
                    this.getSearchData(this.pageForm);
                    this.$Message.success('修改成功');
                    this.modify_form.open = false;

                });
            },
            add () {
                api.post('permession/addPermession',this.add_form.data).then((res)=>{
                    this.getSearchData(this.pageForm);
                    this.$Message.success('添加成功');
                    this.add_form.open = false;

                });
            }
        },
        mounted () {
            this.getZoneData({page:1,pageSize:30});
            this.getSearchData(this.pageForm);
        },
    }
</script>
