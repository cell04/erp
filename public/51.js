webpackJsonp([51],{fu9Y:function(t,e,s){var a=s("VU/8")(s("wyUA"),s("rcE5"),!1,null,null,null);t.exports=a.exports},rcE5:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{class:this.$store.state.showSidebar?"content-title":"spacer content-title"},[s("h4",{staticClass:"module-title"},[t._v("ITEM")]),t._v(" "),s("hr",{staticClass:"title-border"})]),t._v(" "),s("div",{staticClass:"p-md-4"},[s("div",{staticClass:"card"},[s("div",{staticClass:"card-header"},[s("a",{staticClass:"text-success",attrs:{href:""},on:{click:function(e){return e.preventDefault(),t.viewItems(e)}}},[t._v("Items")]),t._v(" "),s("a",{staticClass:"text-secondary"},[t._v(" / View Item")])]),t._v(" "),s("div",{staticClass:"card-body"},[t.ifReady?s("div",[s("fieldset",[s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-6"},[s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"name"}},[t._v("Name")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.item.name,expression:"item.name"}],staticClass:"form-control",attrs:{type:"text",id:"name",readonly:""},domProps:{value:t.item.name},on:{input:function(e){e.target.composing||t.$set(t.item,"name",e.target.value)}}})])]),t._v(" "),s("div",{staticClass:"col-md-6"},[s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"name"}},[t._v("SKU")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.item.stock_keeping_unit,expression:"item.stock_keeping_unit"}],staticClass:"form-control",attrs:{type:"text",id:"name",readonly:""},domProps:{value:t.item.stock_keeping_unit},on:{input:function(e){e.target.composing||t.$set(t.item,"stock_keeping_unit",e.target.value)}}})])])]),t._v(" "),s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-6"},[s("div",{staticClass:"form-group"},[s("label",[t._v("Item Type")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.item.item_type.name,expression:"item.item_type.name"}],staticClass:"form-control",attrs:{type:"text",id:"type",readonly:""},domProps:{value:t.item.item_type.name},on:{input:function(e){e.target.composing||t.$set(t.item.item_type,"name",e.target.value)}}})])]),t._v(" "),s("div",{staticClass:"col-md-6"},[s("div",{staticClass:"form-group"},[s("label",[t._v(" Item Subtype")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.item.item_classification.name,expression:"item.item_classification.name"}],staticClass:"form-control",attrs:{type:"text",id:"class",readonly:""},domProps:{value:t.item.item_classification.name},on:{input:function(e){e.target.composing||t.$set(t.item.item_classification,"name",e.target.value)}}})])])]),t._v(" "),s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-6 form-group"},[s("label",[t._v("With Components")]),s("br"),t._v(" "),s("label",{staticClass:"switch"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.withComponent,expression:"withComponent"}],attrs:{type:"checkbox",disabled:""},domProps:{checked:Array.isArray(t.withComponent)?t._i(t.withComponent,null)>-1:t.withComponent},on:{change:function(e){var s=t.withComponent,a=e.target,i=!!a.checked;if(Array.isArray(s)){var n=t._i(s,null);a.checked?n<0&&(t.withComponent=s.concat([null])):n>-1&&(t.withComponent=s.slice(0,n).concat(s.slice(n+1)))}else t.withComponent=i}}}),t._v(" "),s("span",{staticClass:"slider round"},[s("span",{staticClass:"on"},[t._v(t._s("Yes"))]),t._v(" "),s("span",{staticClass:"off"},[t._v(t._s("No"))])])])]),t._v(" "),t.item.selling_unit_of_measurement?s("div",{staticClass:"col-md-6"},[s("div",{staticClass:"form-group"},[s("label",[t._v("Selling UOM")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.item.selling_unit_of_measurement.name,expression:"item.selling_unit_of_measurement.name"}],staticClass:"form-control",attrs:{type:"text",id:"class",readonly:""},domProps:{value:t.item.selling_unit_of_measurement.name},on:{input:function(e){e.target.composing||t.$set(t.item.selling_unit_of_measurement,"name",e.target.value)}}})])]):t._e()]),t._v(" "),s("div",{staticClass:"row"},[t.item.purchase_unit_of_measurement?s("div",{staticClass:"col-md-6"},[s("div",{staticClass:"form-group"},[s("label",[t._v("Purchase UOM")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.item.purchase_unit_of_measurement.name,expression:"item.purchase_unit_of_measurement.name"}],staticClass:"form-control",attrs:{type:"text",id:"class",readonly:""},domProps:{value:t.item.purchase_unit_of_measurement.name},on:{input:function(e){e.target.composing||t.$set(t.item.purchase_unit_of_measurement,"name",e.target.value)}}})])]):t._e(),t._v(" "),t.item.default_unit_of_measurement?s("div",{staticClass:"col-md-6"},[s("div",{staticClass:"form-group"},[s("label",[t._v("Default UOM")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.item.default_unit_of_measurement.name,expression:"item.default_unit_of_measurement.name"}],staticClass:"form-control",attrs:{type:"text",id:"class",readonly:""},domProps:{value:t.item.default_unit_of_measurement.name},on:{input:function(e){e.target.composing||t.$set(t.item.default_unit_of_measurement,"name",e.target.value)}}})])]):t._e()]),t._v(" "),s("div",{staticClass:"row"},[s("div",{directives:[{name:"show",rawName:"v-show",value:0!=t.item.item_conversions.length,expression:"item.item_conversions.length != 0"}],staticClass:"col"},[s("div",{staticClass:"card"},[t._m(0),t._v(" "),s("div",{staticClass:"card-body"},[s("table",{staticClass:"table table-hover table-sm"},[t._m(1),t._v(" "),t._m(2),t._v(" "),s("tbody",t._l(t.item.item_conversions,function(e){return s("tr",{key:e.id},[s("td",[t._v(t._s(e.conversion.from_value)+" "+t._s(e.conversion.convert_from.name))]),t._v(" "),s("td",[t._v(t._s(e.conversion.to_value)+" "+t._s(e.conversion.convert_to.name))]),t._v(" "),1===e.module?s("td",[t._v("\n                                                        Invetory\n                                                    ")]):t._e(),t._v(" "),2===e.module?s("td",[t._v("\n                                                        Recipe\n                                                    ")]):t._e()])}),0)])])])]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:0!=t.item.item_components.length,expression:"item.item_components.length != 0"}],staticClass:"col"},[s("div",{staticClass:"card"},[t._m(3),t._v(" "),s("div",{staticClass:"card-body"},[s("table",{staticClass:"table table-hover table-sm"},[t._m(4),t._v(" "),t._m(5),t._v(" "),s("tbody",t._l(t.item.item_components,function(e){return s("tr",{key:e.id},[s("td",[t._v(t._s(e.component.name))]),t._v(" "),s("td",[t._v(t._s(e.quantity))]),t._v(" "),s("td",[t._v(t._s(e.unit_of_measurement.name))])])}),0)])])])])])]),t._v(" "),s("br"),t._v(" "),s("button",{staticClass:"btn btn-outline-success btn-sm",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.viewItems(e)}}},[s("i",{staticClass:"fas fa-chevron-left"}),t._v(" Back")]),t._v(" "),s("button",{staticClass:"btn btn-primary btn-sm",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.editItems(e)}}},[s("i",{staticClass:"fas fa-edit"}),t._v(" Edit Item")]),t._v(" "),s("button",{staticClass:"btn btn-danger btn-sm",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.openDeleteItemModal(e)}}},[s("i",{staticClass:"fas fa-trash-alt"}),t._v(" Delete Item")])]):s("div",[t._m(6)])])]),t._v(" "),s("br"),t._v(" "),s("div",{staticClass:"modal fade",attrs:{id:"deleteItemModal",tabindex:"-1",role:"dialog","aria-labelledby":"deleteItemTitle","aria-hidden":"true"}},[s("div",{staticClass:"modal-dialog modal-dialog-centered",attrs:{role:"document"}},[s("div",{staticClass:"modal-content"},[t._m(7),t._v(" "),s("div",{staticClass:"modal-body"},[t._v("\n                        Are you sure you want to delete "),s("b",[s("u",[t._v(t._s(t.item.name))])]),t._v(" ?\n                    ")]),t._v(" "),s("div",{staticClass:"modal-footer"},[s("button",{staticClass:"btn btn-danger btn-sm",attrs:{type:"button"},on:{click:function(e){return"button"in e||!t._k(e.keyCode,"default",void 0,e.key,void 0)?(e.preventDefault(),t.deleteItem(e)):null}}},[t._v("Confirm Delete")]),t._v(" "),s("button",{staticClass:"btn btn-secondary btn-sm",attrs:{type:"button","data-dismiss":"modal"}},[t._v("Close")])])])])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"card-header"},[e("a",{staticClass:"text-success"},[this._v("Conversion Section")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("caption",[e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-3"})])])},function(){var t=this.$createElement,e=this._self._c||t;return e("thead",[e("tr",[e("th",{attrs:{scope:"col"}},[this._v("From")]),this._v(" "),e("th",{attrs:{scope:"col"}},[this._v("To")]),this._v(" "),e("th",{attrs:{scope:"col"}},[this._v("Module")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"card-header"},[e("a",{staticClass:"text-success"},[this._v("Component Section")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("caption",[e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-3"})])])},function(){var t=this.$createElement,e=this._self._c||t;return e("thead",[e("tr",[e("th",{attrs:{scope:"col"}},[this._v("Item")]),this._v(" "),e("th",{attrs:{scope:"col"}},[this._v("Quantity")]),this._v(" "),e("th",{attrs:{scope:"col"}},[this._v("UOM")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"progress"},[e("div",{staticClass:"progress-bar progress-bar-striped progress-bar-animated",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"modal-header"},[e("h5",{staticClass:"modal-title",attrs:{id:"exampleModalLongTitle"}},[this._v("You're about to delete this Item")]),this._v(" "),e("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[e("span",{attrs:{"aria-hidden":"true"}},[this._v("×")])])])}]}},wyUA:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{componentVal:"Item",ifReady:!1,accountType:"",item:{},itemType:"",itemClass:"",item_type_id:"",item_classification_id:"",price_histories:[],withComponent:null}},mounted:function(){this.getItem()},methods:{getItem:function(){var t=this;new Promise(function(e,s){axios.get("/api/items/"+t.$route.params.id).then(function(s){console.log(JSON.stringify(s.data.item)),t.item=s.data.item,"yes"===t.item.with_component?t.withComponent=!0:t.withComponent=!1,t.ifReady=!0,s.data.response&&e()})})},viewItems:function(){this.$router.push({name:"items.index"})},editItems:function(){this.$router.push({name:"items.edit",params:{id:this.item.id}})},openDeleteItemModal:function(){$("#deleteItemModal").modal("show")},deleteItem:function(){var t=this;axios.delete("/api/items/"+this.$route.params.id).then(function(e){$("#deleteItemModal").modal("hide"),t.$router.push({name:"items.index"})}).catch(function(t){console.log(t)})}}}}});
//# sourceMappingURL=51.js.map