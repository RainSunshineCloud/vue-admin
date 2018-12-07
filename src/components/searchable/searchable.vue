<template>
	<div v-if="cansearch" class="search-con search-con-top">
		<table>
			<td v-for="itemRow in Field" class="search-row">
				<template v-for="item in itemRow">
					<template v-if="item.type=='text'">
							<td style="padding-right:5px;vertical-align:middle;">{{item.name}}</td>
							<td  style="padding-right:20px;">
								<Input v-model="searchData[item.key]" v-if="item.type=='text'" :placeholder="item.placeholder?item.placeholder:''"></Input>
							</td>
					</template>
					<template v-else>
						
						<td v-if ="item.searchbtn == false"></td>
						<td v-else-if="item.searchbtn == true" style='padding-left:10px;'><Button @click="handleSearchFunc" class="search-btn" type="primary" ><Icon type="search"/>&nbsp;&nbsp;搜索</Button></td>
						<td v-if ="item.resetbtn == false"></td>
						<td v-else-if="item.resetbtn == true"><Button @click="handleSearchFunc" class="search-btn" type="primary" ><Icon type="search"/>&nbsp;&nbsp;搜索</Button></td>
					</template>
				<!-- 
					<Col :span="item.span ? item.span : 6" v-if="item.type=='select'">
						<Select v-model="searchData[item.key]" slot="prepend" style="width: 80px">
				            <Option v-for="(key,value) in item.fields" :value="key">{{value}}</Option>
				        </Select>
					</Col>

			        <Col :span="item.span ? item.span : 6" v-if="item.type=='date_range'">
		            	<DatePicker type="daterange" placement="bottom-end" placeholder="Select date"></DatePicker>
		      		</Col>

		      		<Col :span="item.span ? item.span : 6" v-if="item.type=='date'" >
		            	<DatePicker type="date" placeholder="Select date" style="width: 200px"></DatePicker>
		      		</Col> -->
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
						tmp[key].push({searchbtn:true});
						tmp[key].push({resetbtn:true});
					} else {
						tmp[key].push({searchbtn:false});
						tmp[key].push({resetbtn:false});
					}
				});
				return tmp;
			}
		},
		methods:{

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