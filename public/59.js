webpackJsonp([59],{"/cQf":function(e,t,a){var s=a("VU/8")(a("URSB"),a("NoEZ"),!1,null,null,null);e.exports=s.exports},NoEZ:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"card"},[a("div",{staticClass:"card-header"},[e._v("\n        Item Types / Create New Item Type\n    ")]),e._v(" "),a("div",{staticClass:"card-body"},[e.ifReady?a("div",[a("form",{on:{submit:function(t){return t.preventDefault(),e.createNewItemType(t)}}},[a("div",{staticClass:"row"},[a("div",{staticClass:"form-group col-md-6"},[a("label",[e._v("Name")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.name,expression:"name"}],staticClass:"form-control",attrs:{type:"text",autocomplete:"off",minlength:"2",maxlength:"255",required:""},domProps:{value:e.name},on:{input:function(t){t.target.composing||(e.name=t.target.value)}}})]),e._v(" "),a("div",{staticClass:"form-group col-md-6"},[a("label",[e._v("Display Name")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.display_name,expression:"display_name"}],staticClass:"form-control",attrs:{type:"text",autocomplete:"off",minlength:"2",maxlength:"255",required:""},domProps:{value:e.display_name},on:{input:function(t){t.target.composing||(e.display_name=t.target.value)}}})])]),e._v(" "),a("div",{staticClass:"form-group"},[a("label",[e._v("Description")]),e._v(" "),a("textarea",{directives:[{name:"model",rawName:"v-model",value:e.description,expression:"description"}],staticClass:"form-control",attrs:{maxlength:"1000",required:""},domProps:{value:e.description},on:{input:function(t){t.target.composing||(e.description=t.target.value)}}})]),e._v(" "),a("button",{staticClass:"btn btn-outline-success btn-sm",attrs:{type:"button"},on:{click:function(t){return t.preventDefault(),e.viewItemType(t)}}},[a("i",{staticClass:"fas fa-chevron-left"}),e._v(" Back")]),e._v(" "),e._m(0)])]):a("div",[e._m(1)])])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("button",{staticClass:"btn btn-success btn-sm",attrs:{type:"submit"}},[t("i",{staticClass:"fas fa-plus"}),this._v(" Create New Item Type")])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"progress"},[t("div",{staticClass:"progress-bar progress-bar-striped progress-bar-animated",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})])}]}},URSB:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{ifReady:!0,name:"",display_name:"",description:""}},methods:{viewItemType:function(){this.$router.push({name:"item-types.index"})},createNewItemType:function(){var e=this;axios.post("/api/item-types",this.$data).then(function(t){console.log(t.data),e.$router.push({name:"item-types.index"})}).catch(function(e){console.log(e),alert("Error! Can't create item type")})}}}}});
//# sourceMappingURL=59.js.map