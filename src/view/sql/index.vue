<template>
	<div>
		<Button type="primary" @click="execs" :disabled="loading">执行</Button>
	<hr style="height:2px;border:none;border-top:1px dashed #0066CC;margin-top:10px;">
	<div style="margin:10px 30px;">
	<Form ref="modifyModal.formData" :model="formData" :label-width="80">
		
	    <FormItem label="SQL语句">
	        <Input type="textarea" :autosize="{minRows: 5}" v-model="formData.sql"></Input>
	    </FormItem>
	     <FormItem label="结果">
	        <Input :readonly="true" type="textarea" :autosize="{minRows: 15}" v-model="formData.res"></Input>
	    </FormItem>
	</Form>
	</div>
	</div>
</template>
<script>
    import api from '@/api/api.js'
    export default {
        name: 'sql_index',
        data () {
        	return {
        		formData:{
        			sql:'',
        			res:'',
        		},
        		loading:false,
        	}
        },
        methods:{
        	execs () {
        		this.loading = true;
        		api.post('api/execSql',{sql:this.formData.sql}).then((data) => {
        			let type = typeof data.req.data.data
        			let res = '';
        			if (type != 'string' && type != 'number') {
        				res = JSON.stringify(data.req.data.data);
        			} else {
        				res = data.req.data.data;
        			}
                    this.formData.res = res;
                    this.loading = false;
                });

        	}
        }
    }
</script>
