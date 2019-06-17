<template>
    <div style="background:white;margin:2px;padding:20px;border-radius: 10px;">
        <Searchable 
            :cansearch='true' 
            :searchField='searchField'
            :resetbtn="resetBtn"
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
                    <Page :total="total" :page-size="pageForm.pageSize" :current="pageForm.page" show-total @on-change="pageChange"/>
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
            default: false,
        },
        resetBtn: {
            type:Boolean,
            default: true,
        },
        total:{
            type:Number,
            default:0,
        },
        pageForm: {
            type:Object,
            default () {
                return {
                    page:1,
                    pageSize:10,
                }
            }
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
            formData : {
                    "sort":undefined,
                    "search":undefined,
                    "page" : 1,
                    "pageSize":10,
                }
        }
    },
    methods: {
        sort (columns) {
            if (columns.order == 'normal') {
                this.formData.sort = '';
            } else {
                this.formData.sort = columns.key + ' ' + columns.order;
            }
            this.$emit('listenFormData',this.objFlat(this.formData));
        },
        getSearchData(data) {
            this.formData.search = this.rebuildData(data);
            this.$emit('listenFormData',this.objFlat(this.formData));
        },
        pageChange(page) {
            this.formData.page = page;
            this.$emit('listenFormData',this.objFlat(this.formData));
        },
        getResetData(data) {
            this.formData.page = 1;
            this.formData.search = this.rebuildData(data);
            this.$emit('listenResetFormData',this.objFlat(this.formData));
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
        },
        objFlat (obj) {
            var tmp = {};
            for (let i in obj) {
                if (obj[i] instanceof Object) {
                    tmp = Object.assign(tmp,this.objFlat(obj[i]));
                } else {
                    tmp[i] = obj[i];
                }
            }
            return tmp;
        },

    },
}
</script>
