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
    </div>
</template>
<script>
    
    import Tables from '@/components/tables'
    import api from '@/api/api.js'
    export default {
        name: 'data_plan',
        components: {
            Tables,
        },
        data () {
            return {
                table_title: [
                    {
                        title: 'ID',
                        key: 'id',
                        align:'center',
                    },
                    {
                        title: '用户ID',
                        key: 'user_id',
                        align:'center',
                    },
                    {
                        title: '当前期',
                        key: 'now_num',
                        align:'center',
                    },
                    {
                        title: '倍投比例',
                        key: 'rate',
                        align:'center',
                    },
                    {
                        title: '计划',
                        key: 'plan',
                        align:'center',
                        render: (h, params) => {
                            return h('div', this.getName(params.row.plan,params.row.type));
                        }

                    },
                    {
                        title: '结果',
                        key: 'res',
                        align:'center',
                        render: (h, params) => {
                            return h('div', this.getName(params.row.res,params.row.type));
                        }
                    },
                    {
                        title: '中/挂',
                        key: 'plan_res',
                        align:'center',
                        render: (h, params) => {
                          	return h('div', this.getRes(params.row.plan_res));
                        }

                    },
                    {
                        title: '连中',
                        key: 'long_hit',
                        align:'center',
                    },
                    {
                        title: '类型',
                        key: 'type',
                        align:'center',
                        render: (h, params) => {
                           return h('div', this.getType(params.row.type));
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
                            key:'now_num',
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
                api.get('Ddapi/getPlanResList',data).then((data) => {
                    this.table_data = data.req.data.data.list;
                    this.total = data.req.data.data.total;
                });

                this.loading = false;
            },
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
            			return index == 1 ? '单' : '双';
            	}
            }
            
        },
        mounted () {
            this.getSearchData({pageSize:this.pageSize,page:1});
        }
        
    }
</script>
