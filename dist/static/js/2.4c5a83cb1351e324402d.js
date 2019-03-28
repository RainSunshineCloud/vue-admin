webpackJsonp([2],{"2O4X":function(e,t){},"6Qob":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o={name:"LoginForm",props:{mobleRules:{type:Array,default:function(){return[{required:!0,message:"手机号不能为空",trigger:"blur"}]}},passwordRules:{type:Array,default:function(){return[{required:!0,message:"密码不能为空",trigger:"blur"}]}}},data:function(){return{form:{moble:"",password:""}}},computed:{rules:function(){return{moble:this.userNameRules,password:this.passwordRules}}},methods:{handleSubmit:function(){var e=this;this.$refs.loginForm.validate(function(t){t&&e.$emit("on-success-valid",{moble:e.form.moble,password:e.form.password})})}}},n={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("Form",{ref:"loginForm",attrs:{model:e.form,rules:e.rules},nativeOn:{keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleSubmit(t)}}},[r("FormItem",{attrs:{prop:"moble"}},[r("Input",{attrs:{placeholder:"手机号"},model:{value:e.form.moble,callback:function(t){e.$set(e.form,"moble",t)},expression:"form.moble"}},[r("span",{attrs:{slot:"prepend"},slot:"prepend"},[r("Icon",{attrs:{size:16,type:"ios-person"}})],1)])],1),e._v(" "),r("FormItem",{attrs:{prop:"password"}},[r("Input",{attrs:{type:"password",placeholder:"请输入密码"},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}},[r("span",{attrs:{slot:"prepend"},slot:"prepend"},[r("Icon",{attrs:{size:14,type:"md-lock"}})],1)])],1),e._v(" "),r("FormItem",[r("Button",{attrs:{type:"primary",long:""},on:{click:e.handleSubmit}},[e._v("登录")])],1)],1)},staticRenderFns:[]},s=r("VU/8")(o,n,!1,null,null,null).exports,a=r("//Fk"),i=r.n(a),l=r("woOf"),u=r.n(l),c=r("Zrlr"),m=r.n(c),d=r("wxAW"),p=r.n(d),f=r("4Zt/"),h=r("2uFj"),g=r("TVG1"),v=r("BTaQ"),b=new(function(){function e(){m()(this,e);var t=u()({},h.a.apiConf,this.configs());return new f.a(t,this.commonThen,this.commonCatch,this.middles())}return p()(e,[{key:"configs",value:function(){return{}}},{key:"commonThen",value:function(e){return 200==parseInt(e.status)&&200==parseInt(e.data.code)?(v.Message.success("登录成功"),i.a.resolve({status:200,req:e})):(v.Message.error(e.data.msg),i.a.reject(e))}},{key:"commonCatch",value:function(e){return{then:function(){e.message&&v.Message.error(e.message)}}}},{key:"middles",value:function(){return{req:{success:[],error:[]},res:{success:[this.cookieMiddle],error:[]}}}},{key:"cookieMiddle",value:function(e,t,r){r.headers.token&&Object(g.m)(r.headers.token)}}]),e}()),k={components:{LoginForm:s},methods:{login_handle:function(e){var t=this,r=e.moble,o=e.password;b.post("passport/login",{moble:r,password:o}).then(function(e){t.$router.push({name:t.$config.homeName})})}},mounted:function(){}},y={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"login"},[t("div",{staticClass:"login-con"},[t("Card",{attrs:{icon:"log-in",title:"欢迎登录",bordered:!1}},[t("div",{staticClass:"form-con"},[t("login-form",{on:{"on-success-valid":this.login_handle}})],1)])],1)])},staticRenderFns:[]};var w=r("VU/8")(k,y,!1,function(e){r("OWW2"),r("2O4X")},null,null);t.default=w.exports},OWW2:function(e,t){}});
//# sourceMappingURL=2.4c5a83cb1351e324402d.js.map