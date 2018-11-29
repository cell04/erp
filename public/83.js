webpackJsonp([83],{"5p2T":function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{componentVal:"Conversion",ifReady:!1,conversions:""}},mounted:function(){var t=this;new Promise(function(e,o){axios.get("/api/conversions/"+t.$route.params.id).then(function(o){console.log(o),t.conversions=o.data.conversion,e()})}).then(function(){t.ifReady=!0})},methods:{viewUnitOfMeasurements:function(){this.$router.push({name:"conversions.index"})},editUnitOfMeasurements:function(){this.$router.push({name:"conversions.edit",params:{id:this.conversions.id}})},openDeleteConversionModal:function(){$("#deleteConversionModal").modal("show")},deleteConversion:function(){var t=this;$("#deleteConversionModal").modal("hide"),axios.delete("/api/conversions/"+this.$route.params.id).then(function(e){t.$router.push({name:"conversions.index"})}).catch(function(t){alert("Error!"),console.log(t)})}}}},F97k:function(t,e,o){var n=o("VU/8")(o("5p2T"),o("sKN/"),!1,null,null,null);t.exports=n.exports},"sKN/":function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("div",{staticClass:"card"},[o("div",{staticClass:"card-header"},[t._v("\n            "+t._s(t.componentVal)+"s / View "+t._s(t.componentVal)+"\n        ")]),t._v(" "),o("div",{staticClass:"card-body"},[t.ifReady?o("div",[o("fieldset",{attrs:{disabled:""}},[o("div",{staticClass:"form-group"},[o("label",{attrs:{for:"name"}},[t._v("From")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.conversions.from_value,expression:"conversions.from_value"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.conversions.from_value},on:{input:function(e){e.target.composing||t.$set(t.conversions,"from_value",e.target.value)}}})]),t._v(" "),o("div",{staticClass:"form-group"},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.conversions.convert_from.name,expression:"conversions.convert_from.name"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.conversions.convert_from.name},on:{input:function(e){e.target.composing||t.$set(t.conversions.convert_from,"name",e.target.value)}}})]),t._v(" "),o("div",{staticClass:"form-group"},[o("label",{attrs:{for:"name"}},[t._v("To")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.conversions.to_value,expression:"conversions.to_value"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.conversions.to_value},on:{input:function(e){e.target.composing||t.$set(t.conversions,"to_value",e.target.value)}}})]),t._v(" "),o("div",{staticClass:"form-group"},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.conversions.convert_to.name,expression:"conversions.convert_to.name"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.conversions.convert_to.name},on:{input:function(e){e.target.composing||t.$set(t.conversions.convert_to,"name",e.target.value)}}})])]),t._v(" "),o("button",{staticClass:"btn btn-info btn-sm",attrs:{type:"button"},on:{click:function(e){return"button"in e||!t._k(e.keyCode,"default",void 0,e.key,void 0)?(e.preventDefault(),t.viewUnitOfMeasurements(e)):null}}},[t._v("Back")]),t._v(" "),o("button",{staticClass:"btn btn-primary btn-sm",attrs:{type:"button"},on:{click:function(e){return"button"in e||!t._k(e.keyCode,"default",void 0,e.key,void 0)?(e.preventDefault(),t.editUnitOfMeasurements(e)):null}}},[t._v("Edit "+t._s(t.componentVal))]),t._v(" "),o("button",{staticClass:"btn btn-danger btn-sm",attrs:{type:"button"},on:{click:function(e){return"button"in e||!t._k(e.keyCode,"default",void 0,e.key,void 0)?(e.preventDefault(),t.openDeleteConversionModal(e)):null}}},[t._v("Delete "+t._s(t.componentVal))])]):o("div",[t._m(0)])])]),t._v(" "),o("div",{staticClass:"modal fade",attrs:{id:"deleteConversionModal",tabindex:"-1",role:"dialog","aria-labelledby":"deleteConversionTitle","aria-hidden":"true"}},[o("div",{staticClass:"modal-dialog modal-dialog-centered",attrs:{role:"document"}},[o("div",{staticClass:"modal-content"},[o("div",{staticClass:"modal-header"},[o("h5",{staticClass:"modal-title",attrs:{id:"exampleModalLongTitle"}},[t._v("You're about to delete this "+t._s(t.componentVal)+"?")]),t._v(" "),t._m(1)]),t._v(" "),o("div",{staticClass:"modal-body"},[t._v("\n                    Are you sure you want to delete this "+t._s(t.componentVal)+"? "),o("br"),o("br")]),t._v(" "),o("div",{staticClass:"modal-footer"},[o("button",{staticClass:"btn btn-danger btn-sm",attrs:{type:"button"},on:{click:function(e){return"button"in e||!t._k(e.keyCode,"default",void 0,e.key,void 0)?(e.preventDefault(),t.deleteConversion(e)):null}}},[t._v("Confirm Delete")]),t._v(" "),o("button",{staticClass:"btn btn-secondary btn-sm",attrs:{type:"button","data-dismiss":"modal"}},[t._v("Close")])])])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"progress"},[e("div",{staticClass:"progress-bar progress-bar-striped progress-bar-animated",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[e("span",{attrs:{"aria-hidden":"true"}},[this._v("×")])])}]}}});
//# sourceMappingURL=83.js.map