webpackJsonp([77],{"LJ/K":function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"card"},[a("div",{staticClass:"card-header"},[t._v("\n        Default Accounts / Create New Default Account\n    ")]),t._v(" "),a("div",{staticClass:"card-body"},[t.ifReady?a("div",[a("form",{on:{submit:function(e){return e.preventDefault(),t.createNewItemType(e)}}},[a("div",{staticClass:"row"},[a("div",{staticClass:"form-group col-md-6"},[a("label",[t._v("Name")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],staticClass:"form-control",attrs:{type:"text",autocomplete:"off",minlength:"2",maxlength:"255",required:""},domProps:{value:t.name},on:{input:function(e){e.target.composing||(t.name=e.target.value)}}})]),t._v(" "),a("div",{staticClass:"form-group col-md-6"},[a("label",[t._v("Display Name")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.display_name,expression:"display_name"}],staticClass:"form-control",attrs:{type:"text",autocomplete:"off",minlength:"2",maxlength:"255",required:""},domProps:{value:t.display_name},on:{input:function(e){e.target.composing||(t.display_name=e.target.value)}}})])]),t._v(" "),a("button",{staticClass:"btn btn-outline-success btn-sm",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.viewItemType(e)}}},[a("i",{staticClass:"fas fa-chevron-left"}),t._v(" Back")]),t._v(" "),t._m(0)])]):a("div",[t._m(1)])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("button",{staticClass:"btn btn-success btn-sm",attrs:{type:"submit"}},[e("i",{staticClass:"fas fa-plus"}),this._v(" Create New Item Type")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"progress"},[e("div",{staticClass:"progress-bar progress-bar-striped progress-bar-animated",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})])}]}},cCTv:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{ifReady:!0,name:"",display_name:""}},methods:{viewItemType:function(){this.$router.push({name:"default-accounts.index"})},createNewItemType:function(){}}}},mAm4:function(t,e,a){var s=a("VU/8")(a("cCTv"),a("LJ/K"),!1,null,null,null);t.exports=s.exports}});
//# sourceMappingURL=77.js.map