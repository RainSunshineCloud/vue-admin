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
                        title: 'Date',
                        key: 'date',
                        sortable: 'custom'
                    },
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age',
                        sortable: 'custom',
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    }
                ],
                table_data: [],
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
                ],
                loading:false,
                total: 100,
                pageSize:20,
            }
        },
        methods:{
            getSearchData(data){
                this.loading = true;

                api.get('test/input.php').then(function (error) {
                });
                this.table_data = [
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
                this.loading = false;
            },
            getResetData(data){
            }
        }
        
    }
</script>
