webpackJsonp([5],{bywr:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("0J0o"),i=a("P9l9"),l={name:"data_res",components:{Tables:n.a},data:function(){var e=this;return{table_title:[{title:"ID",key:"id",width:70,align:"center"},{title:"类型",key:"type",width:90,align:"center",render:function(t,a){return t("div",e.searchField[0][0].fields[a.row.type])}},{title:"当前期",key:"now_num",align:"center"},{title:"下一期",key:"next_num",align:"center"},{title:"已开期数",key:"draw_count",width:90,align:"center"},{title:"总期数",key:"total_count",align:"center",width:80},{title:"开奖号码",key:"now_code",align:"center",width:90},{title:"总和",key:"sum_num",align:"center",width:80},{title:"大/小",key:"is_big",align:"center",width:80,render:function(t,a){return t("div",e.getName(a.row.is_big,1))}},{title:"单/双",key:"is_double",align:"center",width:80,render:function(t,a){return t("div",e.getName(a.row.is_double,2))}}],table_data:[],searchField:[[{key:"type",type:"select",fields:{1:"江苏",2:"湖北",3:"吉林",4:"河北",5:"甘肃",6:"上海",7:"一分快三",8:"三分快三",9:"五分快三"},placeholder:"姓名",name:"接口名"},{key:"now_num",type:"text",placeholder:"期数",name:"期数"}]],loading:!1,total:100,pageSize:10}},methods:{getSearchData:function(e){var t=this;this.loading=!0,i.a.get("api/getResList",e).then(function(e){t.table_data=e.req.data.data.list,t.total=e.req.data.data.total}),this.loading=!1},getResetData:function(e){this.getSearchData(e)},getName:function(e,t){switch(e){case 0:return"?";case 1:return 1==t?"小":"单";case 2:return 2==t?"大":"双"}}},mounted:function(){this.getSearchData({pageSize:this.pageSize,page:1})}},r={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("Tables",{attrs:{border:"",columns:e.table_title,data:e.table_data,searchField:e.searchField,loading:e.loading,total:e.total,pageSize:e.pageSize},on:{listenFormData:e.getSearchData,listenResetFormData:e.getResetData}})],1)},staticRenderFns:[]},d=a("VU/8")(l,r,!1,null,null,null);t.default=d.exports}});
//# sourceMappingURL=5.4bfc30197f1c7b882f13.js.map