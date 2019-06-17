<template>
    <div>
        <Button type="primary" @click="open('add_form',{},['id','name','default_permession','other_permession','ssid'])">添加</Button>
        <Tables border 
        :columns="table_title" 
        :data="table_data" 
        :loading="loading"
        :total = 'total'
        :pageForm = 'pageForm'
        @listenFormData='getSearchData'
        @listenResetFormData = "getResetData"
        >
        </Tables>
        <Modal v-model="modify_form.open" width="660" @on-cancel="close('modify_form')">
            <p slot="header"><span>修改</span></p>
            <FormItem :data='modify_form.data' :formFields='modify_title'></FormItem>
            <div slot="footer">
                <Button type="primary" @click="modify">修改</Button>
                <Button type="default" @click="reset('modify_form')" style="margin-left: 8px">重置</Button>
            </div>
        </Modal>

        <Modal v-model="add_form.open" width="660" @on-cancel="close('add_form')">
            <p slot="header"><span>添加</span></p>
            <FormItem :data='add_form.data' :formFields='add_title'></FormItem>
            <div slot="footer">
                <Button type="primary" @click="add" >添加</Button>
                <Button type="default" @click="close('add_form')" style="margin-left: 8px" >返回</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
    
    import Tables from '@/components/tables'
    import api from '@/api/api.js'
    import {dateFormat} from '@/libs/tools'
    import FormItem from '@/components/form-item'
    import modalMixin from '@/mixin/modal.js'
    export default {
        name: 'user_index',
        components: {
            Tables,
            FormItem
        },
        mixins:[modalMixin],
        data () {
            return {
                modify_form: {
                    open:false,
                    data:{
                        id:'',
                        name : 'ksdjf',
                    }//修改表单数据
                },
                modify_title: [
                    {
                        key:'id',
                        title:'ID',
                        readonly:true,
                        type:'text',

                    },
                    {
                        key:'name',
                        type:'text',
                        title:'名称',
                    },

                ],
                add_form: {
                    open:false,
                    data:{
                        name : '',
                    }//修改表单数据
                },
                add_title: [
                    {
                        key:'name',
                        type:'text',
                        title:'名称',
                    },

                ],
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
                    {
                        title: '操作',
                        key: 'operate',
                        align:'center',
                        render: (h,params) => {
                            return h('div',[
                                h('Button', {
                                    props: {
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.open('modify_form',params.row,['id','name']);
                                        }
                                    }
                                }, '修改'),
                            ]);
                            
                        }
                    },
                ],
                table_data: [],
                loading:false,
                total: 1,
                pageForm:{
                    pageSize:10,
                    page:1,
                },
            }
        },
        methods:{
            getSearchData(data) {
                this.loading = true;
                api.get('permession/zoneList',data).then((res) => {
                    this.table_data = res.data.list;
                    this.pageSize = res.data.pageSize;
                    this.total = res.data.total;
                });

                this.loading = false;
            },
            getResetData(data){
                this.getSearchData(this.pageForm);
            },
            modify () {
                api.post('permession/modifyZone',this.modify_form.data).then((res)=>{
                    this.modify_form.open = false;
                    this.$Message.success('修改成功');
                    this.getSearchData(this.pageForm)
                })
            },
            add () {
                api.post('permession/addZone',this.add_form.data).then((res)=>{
                    this.add_form.open = false;
                    this.$Message.success('修改成功');
                    this.getSearchData(this.pageForm)
                })
            }
        },
        mounted () {
            this.getSearchData(this.pageForm);
        }
        
    }
</script>
