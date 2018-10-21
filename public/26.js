webpackJsonp([26],{FHp9:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{componentVal:"Item",ifReady:!1,accountType:"",item:"",itemType:"",itemClass:"",item_type_id:"",item_classification_id:"",conversions:[],price_histories:[]}},mounted:function(){this.getItem()},methods:{getItem:function(){var t=this;new Promise(function(e,a){axios.get("/api/items/"+t.$route.params.id).then(function(a){t.item=a.data.item,t.ifReady=!0,a.data.response&&e()})})},viewItems:function(){this.$router.push({name:"items.index"})},editItems:function(){this.$router.push({name:"items.edit",params:{id:this.item.id}})},openDeleteItemModal:function(){$("#deleteItemModal").modal("show")},deleteItem:function(){var t=this;axios.delete("/api/items/"+this.$route.params.id).then(function(e){$("#deleteItemModal").modal("hide"),t.$router.push({name:"items.index"})}).catch(function(t){console.log(t)})}}}},JpmU:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"card"},[a("div",{staticClass:"card-header"},[t._v("\n            "+t._s(t.componentVal)+" / View "+t._s(t.componentVal)+"\n        ")]),t._v(" "),a("div",{staticClass:"card-body"},[t.ifReady?a("div",[a("fieldset",[a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-6"},[a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"name"}},[t._v("Name")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.item.name,expression:"item.name"}],staticClass:"form-control",attrs:{type:"text",id:"name",readonly:""},domProps:{value:t.item.name},on:{input:function(e){e.target.composing||t.$set(t.item,"name",e.target.value)}}})])]),t._v(" "),a("div",{staticClass:"col-md-6"},[a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"name"}},[t._v("SKU")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.item.stock_keeping_unit,expression:"item.stock_keeping_unit"}],staticClass:"form-control",attrs:{type:"text",id:"name",readonly:""},domProps:{value:t.item.stock_keeping_unit},on:{input:function(e){e.target.composing||t.$set(t.item,"stock_keeping_unit",e.target.value)}}})])])]),t._v(" "),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"description"}},[t._v("Description")]),t._v(" "),a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.item.description,expression:"item.description"}],staticClass:"form-control",attrs:{id:"description",readonly:""},domProps:{value:t.item.description},on:{input:function(e){e.target.composing||t.$set(t.item,"description",e.target.value)}}})]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-4"},[a("div",{staticClass:"form-group"},[a("label",[t._v("Item Type")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.item.item_type.name,expression:"item.item_type.name"}],staticClass:"form-control",attrs:{type:"text",id:"type",readonly:""},domProps:{value:t.item.item_type.name},on:{input:function(e){e.target.composing||t.$set(t.item.item_type,"name",e.target.value)}}})])]),t._v(" "),a("div",{staticClass:"col-md-4"},[a("div",{staticClass:"form-group"},[a("label",[t._v("Item Classification")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.item.item_classification.name,expression:"item.item_classification.name"}],staticClass:"form-control",attrs:{type:"text",id:"class",readonly:""},domProps:{value:t.item.item_classification.name},on:{input:function(e){e.target.composing||t.$set(t.item.item_classification,"name",e.target.value)}}})])]),t._v(" "),a("div",{staticClass:"col-md-4"},[a("div",{staticClass:"form-group"},[a("label",[t._v("Unit of Measurement")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.item.default_unit_of_measurement.name,expression:"item.default_unit_of_measurement.name"}],staticClass:"form-control",attrs:{type:"text",id:"class",readonly:""},domProps:{value:t.item.default_unit_of_measurement.name},on:{input:function(e){e.target.composing||t.$set(t.item.default_unit_of_measurement,"name",e.target.value)}}})])])])]),t._v(" "),a("button",{staticClass:"btn btn-outline-info btn-sm",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.viewItems(e)}}},[t._v("Back")]),t._v(" "),a("button",{staticClass:"btn btn-info btn-sm",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.editItems(e)}}},[t._v("Edit Item")]),t._v(" "),a("button",{staticClass:"btn btn-danger btn-sm",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.openDeleteItemModal(e)}}},[t._v("Delete Item")])]):a("div",[t._m(0)])])]),t._v(" "),a("br"),t._v(" "),a("div",{staticClass:"modal fade",attrs:{id:"deleteItemModal",tabindex:"-1",role:"dialog","aria-labelledby":"deleteItemTitle","aria-hidden":"true"}},[a("div",{staticClass:"modal-dialog modal-dialog-centered",attrs:{role:"document"}},[a("div",{staticClass:"modal-content"},[t._m(1),t._v(" "),a("div",{staticClass:"modal-body"},[t._v("\n                    Are you sure you want to delete "),a("b",[a("u",[t._v(t._s(t.item.name))])]),t._v(" ?\n                ")]),t._v(" "),a("div",{staticClass:"modal-footer"},[a("button",{staticClass:"btn btn-danger btn-sm",attrs:{type:"button"},on:{click:function(e){return"button"in e||!t._k(e.keyCode,"default",void 0,e.key,void 0)?(e.preventDefault(),t.deleteItem(e)):null}}},[t._v("Confirm Delete")]),t._v(" "),a("button",{staticClass:"btn btn-secondary btn-sm",attrs:{type:"button","data-dismiss":"modal"}},[t._v("Close")])])])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"progress"},[e("div",{staticClass:"progress-bar progress-bar-striped progress-bar-animated",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"modal-header"},[e("h5",{staticClass:"modal-title",attrs:{id:"exampleModalLongTitle"}},[this._v("You're about to delete this Item")]),this._v(" "),e("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[e("span",{attrs:{"aria-hidden":"true"}},[this._v("×")])])])}]}},fu9Y:function(t,e,a){var i=a("VU/8")(a("FHp9"),a("JpmU"),!1,null,null,null);t.exports=i.exports}});
//# sourceMappingURL=26.js.map