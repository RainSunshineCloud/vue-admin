<template>
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
</template>
<script>
    
    import Tables from '@/components/tables'
    import api from '@/api/api.js'
    export default {
        name: 'user_index',
        components: {
            Tables
        },
        data () {
            return {
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
                    }
                ],
                table_data: [],
                searchField: [
                    [

                        {
                            key:'name',
                            type:'select',
                            fields:{0:'请选择',1:'江苏',2:'湖北',3:'吉林',4:'河北',5:'甘肃',6:'上海'},
                            placeholder:'姓名',
                            name:'姓名',
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
                api.get('api/getConfig',data).then((data) => {
                    this.table_data = data.req.data.data.list;
                    this.pageSize = data.req.data.data.pageSize;
                    this.total = data.req.data.data.total;
                });

                this.loading = false;
            },
            getResetData(data){
            }
        },
        mounted () {
            this.getSearchData();
        }
        
    }
</script>
