<template>
    <div>
        <Tables border 
            :columns="table_title" 
            :data="table_data" 
            :searchField="searchField"
            :resetBtn='false'
            :loading="loading"
            :total = 'total'
            :pageForm = 'pageForm'
            @listenFormData='getSearchData'
            >
        </Tables>
    </div>

</template>
<script>
    import {dateFormat} from '@/libs/tools'
    import Tables from '@/components/tables'
    import api from '@/api/api.js'
    export default {
        name: 'user_permession',
        components: {
            Tables,
        },
        data () {
            return {
                zone_data:{
                    name:'value',
                },
                default_permession: {
                    1 : '允许',
                    2 : '禁止',
                },
                other_permession: {
                    1 : '允许',
                    2 : '禁止',
                },
                table_title: [
                    {
                        title: '用户昵称',
                        key: 'user_name',
                        align:'center',
                    },
                    {
                        title: '角色名称',
                        key: 'role_name',
                        sortable:true,
                        align:'center',
                    },
                    {
                        title: '作用域',
                        key: 'zid',
                        align:'center',
                        sortable:true,
                        render: (h,params) => {
                            return h('div',this.zone_data[params.row.zid]); 
                        }
                    },
                    {
                        title: '权限名称',
                        key: 'name',
                        sortable:true,
                        align:'center',
                    },

                    {
                        title: '标识',
                        key: 'ssid',
                        align:'center',
                    },
                    {
                        title: '权限',
                        key: 'default_permession',
                        align:'center',
                        render: (h,params) => {
                            return h('div',this.default_permession[params.row.default_permession]); 
                        }
                    },
                    {
                        title: '其他人权限',
                        key: 'other_permession',
                        align:'center',
                        render: (h,params) => {
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
                ],
                table_data: [],
                loading:false,
                total: 1,
                pageForm: {
                    page:1,
                    pageSize:10,
                }
            }
        },
        computed : {
            searchField () {
                return [
                    [
                        {
                            key:'user_id',
                            type:'text',
                            placeholder:'请输入用户ID',
                            name:'用户ID',
                        },
                        {
                            key:'zone_id',
                            type:'select',
                            fields:this.zone_data,
                            placeholder:'请输入作用域',
                            name:'作用域',
                        },
                        {
                            key:'permession_name',
                            type:'text',
                            placeholder:'请输入权限名称',
                            name:'权限名称',
                        },
                    ]
                ];
            }
        },
        methods:{
            getSearchData(data) {
                if (!data || !data.user_id) {
                    this.$Message.error("请输入用户ID");
                    return;
                }

                if (data.zone_id == '0') {
                    data.zone_id = null;
                }
                this.loading = true;
        
                api.get('permession/userPermessionList',data).then((res) => {
                    this.table_data = res.data.list;
                    this.pageSize = parseInt(res.data.pageSize);
                    this.total = parseInt(res.data.total);
                });

                this.loading = false;
            },
            getZoneData(data) {
                this.loading = true;
                data.field = 'id,name';
                api.get('permession/zoneList',data).then((res) => {
                    this.zone_data = {0 : '请选择'}
                    res.data.list.forEach((item) => {
                        this.zone_data[item.id] = item.name;
                    });
                });

                this.loading = false;
            }
        },
        mounted () {
            this.getZoneData({page:1,pageSize:30});
        },
    }
</script>
