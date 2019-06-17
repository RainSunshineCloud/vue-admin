<template>
    <div v-if="cansearch" class="search-con search-con-top">
        <table>
            <td v-for="itemRow in Field" class="search-row">
                <template v-for="item in itemRow">
                    <template v-if="item.type!='btn'">
                            <td style="padding-right:5px;vertical-align:middle;">{{item.name}}</td>
                            <td style="padding-right:20px;">
                                <Input v-if="item.type=='text'" v-model="searchData[item.key]" :placeholder="item.placeholder?item.placeholder:''"></Input>

                                <Select v-else-if="item.type=='select'" v-model="searchData[item.key]" style='width: 120px;'>
                                    <template v-for="(value,key) in item.fields">
                                        <Option  :value="key">{{value}}</Option>
                                    </template>
                                </Select>

                                <DatePicker v-else-if="item.type=='date_range'" type="daterange" placement="bottom-end" :placeholder="item.placeholder?item.placeholder:''" v-model="searchData[item.key]"></DatePicker>

                                <DatePicker v-else-if="item.type=='date'" type="date" :placeholder="item.placeholder?item.placeholder:''" v-model="searchData[item.key]"></DatePicker>
                            </td>
                    </template>
                    <template v-else>
                        <td v-if ="item.searchbtn == false"></td>
                        <td v-else-if="item.searchbtn == true" style='padding-left:10px;'><Button @click="getSearchData" type="primary" ><Icon type="search"/>搜索</Button></td>
                        <td v-if ="item.resetbtn == false"></td>
                        <td v-else-if="item.resetbtn == true"><Button @click="resetData" type="warning" ><Icon type="search"/>重置</Button></td>
                    </template>
                </template>
            </td>
        </table>
    </div>
</template>

<script>
    export default {
        name:'searchable',
        props: {
            /**
             * @description 是否可搜索
             */
            cansearch:{
                type: Boolean,
                default: false
            },
            searchField: {
                type: Array,
                default () {
                    return [];
                }

            },
            resetbtn: {
                type:Boolean,
                default: true,
            },
            handleSearchFunc:{
                type:Function
            }

        },
        data () {
            return {
                searchData:{},
            };
        },
        computed:{
            Field () {
                let tmp = [];
                let length = this.searchField.length;
                this.searchField.forEach((value,key)=>{
                    tmp[key] = value;
                    if (length -1 == key) {
                        tmp[key].push({searchbtn:true,type:'btn'});
                        tmp[key].push({resetbtn:this.resetbtn,type:'btn'});
                    } else {
                        tmp[key].push({searchbtn:false,type:'btn'});
                        tmp[key].push({resetbtn:false,type:'btn'});
                    }
                });
                return tmp;
            },
        },
        methods:{
            getSearchData(){
                let tmp_data = this.getData();
                this.$emit('listenSearchData',tmp_data);
            },
            resetData(){
                this.searchData = {};
                let tmp_data = this.getData();
                this.$emit('listenResetData',tmp_data);
            },
            getData() {
                let tmp_data = {};
                this.searchField.forEach((value,key)=>{
                    value.forEach((v,k) => {

                        if (!this.searchData[v.key]) {
                            if (v.type == 'text') tmp_data[v.key] = '';
                            else if (v.type == 'date_range') tmp_data[v.key] = ['',''];
                            else if (v.type == 'select') tmp_data[v.key] = '';
                            else if (v.type == 'date') tmp_data[v.key] = '';
                        } else {
                            if (v.type == 'date_range') {
                                tmp_data[v.key] = ['',''];
                                tmp_data[v.key][0] = this.searchData[v.key][0].valueOf() / 1000;
                                tmp_data[v.key][1] = this.searchData[v.key][1].valueOf() /1000;
                            }else if (v.type == 'date') {
                                tmp_data[v.key] = this.searchData[v.key].valueOf() / 1000;
                            } else {
                                 tmp_data[v.key] = this.searchData[v.key]
                            }
                        }
                    });
                });
                return tmp_data;
            }
        }
    }


</script>

<style type="text/css" scoped>
    
    .search-input{
        display: inline-block;
        width:auto;
        height: 30px;
        line-height: 1.5;
        padding: 4px 7px;
        font-size: 12px;
        border: 1px solid #dcdee2;
        border-radius: 4px;
        color: #515a6e;
        background-color: #fff;
        background-image: none;
        position: relative;
        cursor: text;
        margin-left: 5px;
    }
    .search-input:focus{
        border-color: #57a3f3;
        outline: 0;
        box-shadow: 0 0 0 2px rgba(45,140,240,.2);
    }
    .search-row {
        padding:5px;
    }

</style>