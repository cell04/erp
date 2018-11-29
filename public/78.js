webpackJsonp([78],{QBBF:function(t,o,a){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),o.default={data:function(){return{ifReady:!1,corporation:""}},mounted:function(){var t=this;new Promise(function(o,a){axios.get("/api/corporations/"+t.$route.params.id).then(function(a){t.corporation=a.data.corporation,o()})}).then(function(){t.ifReady=!0})},methods:{viewCorporations:function(){this.$router.push({name:"corporations.index"})},editCorporation:function(){this.$router.push({name:"corporations.edit",params:{id:this.corporation.id}})},openDeleteCorporationModal:function(){$("#deleteCorporationModal").modal("show")},deleteCorporation:function(){var t=this;$("#deleteCorporationModal").modal("hide"),axios.delete("/api/corporations/"+this.$route.params.id).then(function(o){t.$router.push({name:"corporations.index"})}).catch(function(t){console.log(t)})}}}},sGPr:function(t,o){t.exports={render:function(){var t=this,o=t.$createElement,a=t._self._c||o;return a("div",[a("div",{staticClass:"card"},[a("div",{staticClass:"card-header"},[a("a",{staticClass:"text-success",attrs:{href:""},on:{click:function(o){return o.preventDefault(),t.viewCorporations(o)}}},[t._v("Corporations")]),t._v(" "),a("a",{staticClass:"text-secondary"},[t._v(" / View Corporation")])]),t._v(" "),a("div",{staticClass:"card-body"},[t.ifReady?a("div",[a("fieldset",{attrs:{disabled:""}},[a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"name"}},[t._v("Name")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.corporation.name,expression:"corporation.name"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.corporation.name},on:{input:function(o){o.target.composing||t.$set(t.corporation,"name",o.target.value)}}})]),t._v(" "),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"description"}},[t._v("Description")]),t._v(" "),a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.corporation.description,expression:"corporation.description"}],staticClass:"form-control",domProps:{value:t.corporation.description},on:{input:function(o){o.target.composing||t.$set(t.corporation,"description",o.target.value)}}})]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-4"},[a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"street"}},[t._v("Street")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.corporation.street,expression:"corporation.street"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.corporation.street},on:{input:function(o){o.target.composing||t.$set(t.corporation,"street",o.target.value)}}})])]),t._v(" "),a("div",{staticClass:"col-md-4"},[a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"city"}},[t._v("City")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.corporation.city,expression:"corporation.city"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.corporation.city},on:{input:function(o){o.target.composing||t.$set(t.corporation,"city",o.target.value)}}})])]),t._v(" "),a("div",{staticClass:"col-md-4"},[a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"state"}},[t._v("State")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.corporation.state,expression:"corporation.state"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.corporation.state},on:{input:function(o){o.target.composing||t.$set(t.corporation,"state",o.target.value)}}})])])]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-4"},[a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"zip_code"}},[t._v("Zip Code")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.corporation.zip_code,expression:"corporation.zip_code"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.corporation.zip_code},on:{input:function(o){o.target.composing||t.$set(t.corporation,"zip_code",o.target.value)}}})])]),t._v(" "),a("div",{staticClass:"col-md-4"},[a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"country"}},[t._v("Country")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.corporation.country,expression:"corporation.country"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.corporation.country},on:{input:function(o){o.target.composing||t.$set(t.corporation,"country",o.target.value)}}})])]),t._v(" "),a("div",{staticClass:"col-md-4"},[a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"fax"}},[t._v("Fax")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.corporation.fax,expression:"corporation.fax"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.corporation.fax},on:{input:function(o){o.target.composing||t.$set(t.corporation,"fax",o.target.value)}}})])])])]),t._v(" "),a("button",{staticClass:"btn btn-outline-success btn-sm",attrs:{type:"button"},on:{click:function(o){return"button"in o||!t._k(o.keyCode,"default",void 0,o.key,void 0)?(o.preventDefault(),t.viewCorporations(o)):null}}},[a("i",{staticClass:"fas fa-chevron-left"}),t._v(" Back")]),t._v(" "),a("button",{staticClass:"btn btn-primary btn-sm",attrs:{type:"button"},on:{click:function(o){return"button"in o||!t._k(o.keyCode,"default",void 0,o.key,void 0)?(o.preventDefault(),t.editCorporation(o)):null}}},[a("i",{staticClass:"fas fa-edit"}),t._v("  Edit Corporation")]),t._v(" "),a("button",{staticClass:"btn btn-danger btn-sm",attrs:{type:"button"},on:{click:function(o){return"button"in o||!t._k(o.keyCode,"default",void 0,o.key,void 0)?(o.preventDefault(),t.openDeleteCorporationModal(o)):null}}},[a("i",{staticClass:"fas fa-trash-alt"}),t._v(" Delete Corporation")])]):a("div",[t._m(0)])])]),t._v(" "),a("div",{staticClass:"modal fade",attrs:{id:"deleteCorporationModal",tabindex:"-1",role:"dialog","aria-labelledby":"deleteCorporationTitle","aria-hidden":"true"}},[a("div",{staticClass:"modal-dialog modal-dialog-centered",attrs:{role:"document"}},[a("div",{staticClass:"modal-content"},[t._m(1),t._v(" "),a("div",{staticClass:"modal-body"},[t._v("\n                    Are you sure you want to delete this Corporation? "),a("br"),a("br"),t._v("\n                    Deleting this "+t._s(t.componentVal)+" will delete the following data "),a("br"),a("br"),t._v("\n                    - departments "),a("br"),t._v("\n                    - sub-departments "),a("br"),t._v("\n                    - budgets "),a("br"),t._v("\n                    - journals "),a("br"),t._v("\n                    - journal entries "),a("br"),t._v("\n                    - vouchers "),a("br"),t._v("\n                    - voucher entries "),a("br"),t._v("\n                    - statistics "),a("br"),t._v("\n                    - metrics "),a("br"),a("br"),t._v("\n\n                    that are all related to this Corporation.\n                ")]),t._v(" "),a("div",{staticClass:"modal-footer"},[a("button",{staticClass:"btn btn-danger btn-sm",attrs:{type:"button"},on:{click:function(o){return"button"in o||!t._k(o.keyCode,"default",void 0,o.key,void 0)?(o.preventDefault(),t.deleteCorporation(o)):null}}},[t._v("Confirm Delete")]),t._v(" "),a("button",{staticClass:"btn btn-secondary btn-sm",attrs:{type:"button","data-dismiss":"modal"}},[t._v("Close")])])])])])])},staticRenderFns:[function(){var t=this.$createElement,o=this._self._c||t;return o("div",{staticClass:"progress"},[o("div",{staticClass:"progress-bar progress-bar-striped progress-bar-animated",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})])},function(){var t=this.$createElement,o=this._self._c||t;return o("div",{staticClass:"modal-header"},[o("h5",{staticClass:"modal-title",attrs:{id:"exampleModalLongTitle"}},[this._v("You're about to delete this Corporation?")]),this._v(" "),o("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[o("span",{attrs:{"aria-hidden":"true"}},[this._v("×")])])])}]}},ylwn:function(t,o,a){var e=a("VU/8")(a("QBBF"),a("sGPr"),!1,null,null,null);t.exports=e.exports}});
//# sourceMappingURL=78.js.map