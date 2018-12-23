<template>
    <div style="background:white;margin:2px;padding:20px;border-radius: 10px;">
        <Searchable :cansearch='true' :searchField='searchField' @listenSearchData='getSearchData'></Searchable>
        <Tables border :columns="table_title" :data="table_data"></Tables>
    </div>
</template>
<script>
	import Tables from '@/components/tables'
    import Searchable from '@/components/searchable'
    export default {
        name: 'article_index',
        components: {
            Tables,
            Searchable,
        },
        data () {
            return {
                searchable:true,
                table_title: [
                    {
                        title: 'Date',
                        key: 'date',
                        sortable: true
                    },
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age',
                        sortable: true,
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    },
                    {
                    	title:'操作',
                    	key: 'oprate',
                    	render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    }
                                }, 'Edit')
                            ]);
                        }
                    }
                ],
                table_data: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ],
                searchField: [
                    [
                        {
                            key:'name',
                            type:'text',
                            placeholder:'姓名',
                            name:'姓名',
                        },
                        {
                            key:'jack',
                            type:'select',
                            fields:{0:'请选择',1:'name',2:'jackssdfsdfsddsss'},
                            placeholder:'姓名',
                            name:'姓名sfds',
                        },
                        {
                            key:'date',
                            type:'date',
                            placeholder:'姓名',
                            name:'姓名sfds',
                        },
                        {
                            key:'jack2',
                            type:'date_range',
                            placeholder:'姓名',
                            name:'姓名sfds',
                        }
                    ]
                ]
            }
        },
        methods:{
            getSearchData(data){
                console.log(data);
            }
        }
        
    }
</script>
