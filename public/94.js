webpackJsonp([94],{Yzyc:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{ifReady:!0,name:"",display_name:"",description:""}},methods:{viewContactType:function(){this.$router.push({name:"contact-types.index"})},createNewContactType:function(){var t=this;this.ifReady=!1,axios.post("/api/contact-types",this.$data).then(function(e){t.$router.push({name:"contact-types.index"})}).catch(function(t){console.log(t)})}}}},l5jn:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"card"},[a("div",{staticClass:"card-header"},[a("a",{staticClass:"text-success",attrs:{href:""},on:{click:function(e){return e.preventDefault(),t.viewContactType(e)}}},[t._v("Contact Types")]),t._v(" "),a("a",{staticClass:"text-secondary"},[t._v(" / Create New Contact Type")])]),t._v(" "),a("div",{staticClass:"card-body"},[t.ifReady?a("div",[a("form",{on:{submit:function(e){return e.preventDefault(),t.createNewContactType(e)}}},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-6 form-group"},[a("label",[t._v("Name")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],staticClass:"form-control",attrs:{type:"text",autocomplete:"off",minlength:"2",maxlength:"255",required:""},domProps:{value:t.name},on:{input:function(e){e.target.composing||(t.name=e.target.value)}}})]),t._v(" "),a("div",{staticClass:"col-md-6 form-group"},[a("label",[t._v("Display Name")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.display_name,expression:"display_name"}],staticClass:"form-control",attrs:{type:"text",autocomplete:"off",minlength:"2",maxlength:"255",required:""},domProps:{value:t.display_name},on:{input:function(e){e.target.composing||(t.display_name=e.target.value)}}})])]),t._v(" "),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"description"}},[t._v("Desciption")]),t._v(" "),a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.description,expression:"description"}],staticClass:"form-control",attrs:{rows:"3",maxlength:"500",required:""},domProps:{value:t.description},on:{input:function(e){e.target.composing||(t.description=e.target.value)}}})]),t._v(" "),a("br"),t._v(" "),a("button",{staticClass:"btn btn-outline-success btn-sm",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.viewContactType(e)}}},[a("i",{staticClass:"fas fa-chevron-left"}),t._v(" Back")]),t._v(" "),t._m(0)])]):a("div",[t._m(1)])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("button",{staticClass:"btn btn-success btn-sm",attrs:{type:"submit"}},[e("i",{staticClass:"fas fa-plus"}),this._v(" Create New Contact Type")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"progress"},[e("div",{staticClass:"progress-bar progress-bar-striped progress-bar-animated",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})])}]}},lqzo:function(t,e,a){var s=a("VU/8")(a("Yzyc"),a("l5jn"),!1,null,null,null);t.exports=s.exports}});
//# sourceMappingURL=94.js.map