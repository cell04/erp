webpackJsonp([22],{CazR:function(t,e,s){var r=s("VU/8")(s("Pr9A"),s("z+kM"),!1,null,null,null);t.exports=r.exports},Pr9A:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{user_roles:null,error:null,showProgress:!1,pageNumbers:[]}},mounted:function(){var t=this;new Promise(function(e,s){axios.get("/api/roles/get-all-roles/").then(function(s){console.log(s),t.ifReady=!0,t.user_roles=s.data.roles,s.data.response&&e()})})}}},"z+kM":function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticClass:"card"},[t._m(0),t._v(" "),s("div",{staticClass:"card-body"},[s("table",{staticClass:"table table-hover table-sm"},[s("caption",[s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-9"}),t._v(" "),s("div",{staticClass:"col-md-3"},[t.showProgress?s("div",{staticClass:"progress",attrs:{height:"30px;"}},[s("div",{staticClass:"progress-bar progress-bar-striped progress-bar-animated",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})]):t._e()])])]),t._v(" "),t._m(1),t._v(" "),t.user_roles?s("tbody",t._l(t.user_roles,function(e){e.id;var r=e.name;return s("tr",[s("td",[t._v(t._s(r))])])}),0):t._e()])])]),t._v(" "),s("br")])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"card-header clearfix"},[e("div",{staticClass:"float-left"},[this._v("\n                Settings / User Roles\n            ")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("thead",[e("tr",[e("th",{attrs:{scope:"col"}},[this._v("Role")])])])}]}}});
//# sourceMappingURL=22.js.map