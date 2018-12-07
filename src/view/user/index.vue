<template>
    <div>
        <Searchable :cansearch='true' :handleSearchFunc="sfunc" :searchField='searchField'></Searchable>
        <Tables border :columns="columns5" :data="data5"></Tables>
    </div>
</template>
<script>
	import Tables from '@/components/tables'
    import Searchable from '@/components/searchable'
    export default {
        name: 'user',
        components: {
            Tables,
            Searchable,
        },
        data () {
            return {
                searchable:true,
                columns5: [
                    {
                        title: 'Date',
                        key: 'date',
                        sortable: true,
                        searchable:true,
                    },
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age',
                        sortable: true,
                        searchable:true,
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    }
                ],
                data5: [
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
                sfunc:function () {console.log(1)},
                searchField: [
                    [
                        {
                            key:'name',
                            span:10,
                            type:'text',
                            placeholder:'姓名',
                            name:'姓名',
                        },
                        {
                            key:'jack',
                            span:5,
                            type:'text',
                            placeholder:'姓名',
                            name:'姓名sfds',
                        },
                        {
                            key:'jack',
                            span:5,
                            type:'text',
                            placeholder:'姓名',
                            name:'姓名sfds',
                        },
                        {
                            key:'jack',
                            span:5,
                            type:'text',
                            placeholder:'姓名',
                            name:'姓名sfds',
                        },
                        // {
                        //     key:'fee',
                        //     span:5,
                        //     type:'text',
                        //     placeholder:'姓名',
                        //     name:'姓名',
                        // },
                        // {
                        //     key:'aa',
                        //     span:5,
                        //     type:'text',
                        //     placeholder:'姓名',
                        //     name:'姓名',
                        // }
                    ]
                ]
            }
        }
        
    }
</script>
