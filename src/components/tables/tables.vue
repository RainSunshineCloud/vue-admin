<template>
    <div style="background:white;margin:2px;padding:20px;border-radius: 10px;">
        <Searchable 
            :cansearch='true' 
            :searchField='searchField' 
            @listenSearchData='getSearchData'
            @listenResetData="getResetData"
        ></Searchable>
        <Table border
            ref="tablesMain"
            :columns="columns" 
            :data="data"
            :loading="loading"
            @on-sort-change="sort"
        >
        </Table>
        <template>
            <Row justify="end" type="flex" style="padding-top: 8px">
                <Col>
                    <Page :total="total" :page-size="pageSize" :current="FormData.page" show-total @on-change="pageChange"/>
                </Col>
            </Row>
        </template>
    </div>
</template>

<script>
import Searchable from '@/components/searchable'
export default {
    name: 'Tables',
    components: {
            Searchable
        },
    props: {
        columns : {
            type: Array
        },
        data: {
            type: Array
        },
        searchField: {
            type: Array,
            default() {
                return []
            }
        },
        loading: {
            type:Boolean,
            dedault: false,
        },
        total: {
            type:Number
        },
        pageSize:{
            type:Number,
            default:10,
        }
    },
    computed:{
        loading_res() {
            return this.loading;
        }
    },
    data () {
        return {
            searchValue: '',
            FormData: {
                "sort":undefined,
                "search":undefined,
                "page" : 1,
                "pageSize":10,
            },
        }
    },
    methods: {
        sort (columns) {
            if (columns.order == 'normal') {
                this.FormData.sort = '';
            } else {
                this.FormData.sort = columns.key + ' ' + columns.order;
            }
            
            this.$emit('listenFormData',this.FormData);
        },
        getSearchData(data) {
            this.FormData.search = this.rebuildData(data);
            this.$emit('listenFormData',this.FormData);
        },
        pageChange(page) {
            this.FormData.page = page;
            this.$emit('listenFormData',this.FormData);
        },
        getResetData(data) {
            this.FormData.page = 1;
            this.FormData.search = this.rebuildData(data);
            this.pageChange(1);
        },
        rebuildData(data) {
            for (let key in data) {

                if (data[key] == '' || data[key] == ["",""]) {
                     delete data[key];
                }
            }

            if (JSON.stringify(data) == '{}') {
                data = undefined;
            }
            return data;
        }
    },
    mounted () {
        this.FormData.pageSize = this.pageSize;
        this.FormData.page = 1;
    }
}
</script>
