<template>
	<div>
	    <Row :gutter='10'>
	        <Col span="16">
	            <div style="height:100%">
	                <Editor id="content" v-model="formData.content" :init="init" style="height:100%"></Editor>
	            </div>
	        </Col>
	        <Col span="8">
	            <Card style="border:1px solid #c5c5c5;margin-bottom: 10px;" :shadow="true">
	               	<p slot="title" >
	                	<Icon type="paintbrush"></Icon>
	                	标题&描述
	              	</p>
	            	<Form :label-width="70" :model="formData">
	            		<FormItem label="文章标题">
	            			<Input v-model="formData.title" />
	            		</FormItem>
	            		<FormItem label='文章类型'>
	            			<Select v-model="formData.type">
	            				<template v-for="(v,k) in typeList">
		            				<Option :value="k">
		            					{{v}}
		            				</Option>
	            				</template>
	            			</Select>
	            		</FormItem>
	            		<FormItem label='封面地址'>
	            			<Input  v-model="formData.image" />
	            		</FormItem>
	            		<FormItem label='摘要描述'>
	            			<Input type="textarea" v-model="formData.desc" />
	            		</FormItem>
	            		<Button type="info" @click="publish(1)">草稿</Button>
	            		<Button type="primary" @click="publish(2)">发布</Button>
	            	</Form>
	            </Card>
	            <Card style="border:1px solid #c5c5c5;" :shadow="true">
	               	<p slot="title" style="color:#444;">
	                	<Icon type="ios-cloud-upload" size="26" color="lightblue"></Icon>
	                	图片上传
	              	</p>
	              	<upload-tinymce :getPic="getPic" :url="url"></upload-tinymce>
	            </Card>
	        </Col>
	    </Row>
	</div>
</template>
<script>
  	import uploadTinymce from "@/components/tinymce/upload"
  	import Editor from '@tinymce/tinymce-vue'
	import tinymce from "tinymce"
	import 'tinymce/themes/modern/theme'
	import 'tinymce/plugins/table'
	import 'tinymce/plugins/link'
	import 'tinymce/plugins/image'
  export default {
  	name: 'Uedit',
    components:{
      uploadTinymce,
      Editor
    },
  	props:{
  		plugins:{
  			type:String,
  			default:"table link image",
  		},
  		url:{
  			type:String
  		},
  		getPic: {
            type:Function
        },
        typeList: {
        	type:Object
        },
        formData: {
    		type:Object,
    		default () {
    			return {
    				title: '',
	        		image: '',
	        		desc: '',
	        		type:'',
	        		content:'',
    			};
    		}
    		
    	},
  	},
  	data () {
  		return {
        	init : {
        		selector:"textarea#content",
			  	language_url: '/static/langs/zh_CN.js',
			  	language: 'zh_CN',
			  	skin_url: '/static/skins/lightgray',
			  	height: 500,
			  	branding: false,
			  	plugins:this.plugins,
        	}
	    };
  	},
  	mounted () {
  		tinymce.init(this.init);
  	},
  	methods : {
  		publish (publish) {
  			this.formData.publish = publish;
  			this.$emit('listenData',this.formData);
  		}
  	}
  }
</script>