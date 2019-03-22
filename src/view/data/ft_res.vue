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
        name: 'data_ft_res',
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
                    },
                    {
                        title: '冠军大小',
                        key: 'f_is_big',
                        align:'center',
                        width:80,
                        render: (h, params) => {
                            return h('div', this.getName(params.row.f_is_big,1));
                        }
                    },
                    {
                        title: '冠军单双',
                        key: 'f_is_double',
                        align:'center',
                        width:80,
                        render: (h, params) => {
                             return h('div', this.getName(params.row.f_is_double,2));
                        }
                    },
                    {
                        title: '亚军大小',
                        key: 's_is_big',
                        align:'center',
                        width:80,
                        render: (h, params) => {
                            return h('div', this.getName(params.row.s_is_big,1));
                        }
                    },
                    {
                        title: '亚军单双',
                        key: 's_is_double',
                        align:'center',
                        width:80,
                        render: (h, params) => {
                            return h('div', this.getName(params.row.s_is_double,2));
                        }
                    },
  
                ],
                table_data: [],
                searchField: [
                    [
                        {
                            key:'type',
                            type:'select',
                            fields:{'10':"飞艇"},
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
                api.get('api/getFtResList',data).then((data) => {
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
            			return type == 1 ? '大' : '双';
            	}
            }
            
        },
        mounted () {
            this.getSearchData({pageSize:this.pageSize,page:1});
        }
        
    }
</script>
