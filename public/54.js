webpackJsonp([54],{EPqz:function(t,e,s){"use strict";var i;function n(t,e,s){return e in t?Object.defineProperty(t,e,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[e]=s,t}Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{ifReady:!0,itemTypeId:{},itemClassId:{},defaultItemUnitId:{},purchaseItemUnitId:{},itemTypesList:[],itemClassList:[],itemUnitList:[],item_type_id:"",item_classification_id:"",id:"",stock_keeping_unit:"",default_unit_of_measurement_id:"",purchase_unit_of_measurement_id:"",name:"",description:"",status:1,conversionsList:[],item_conversions:[],selectedConversionModule:{},selectedConversion:{},conversionModules:[{value:1,name:"Inventory"},{value:2,name:"Recipe"}]}},mounted:function(){var t=this;new Promise(function(e,s){axios.get("/api/items/"+t.$route.params.id).then(function(s){t.id=s.data.item.id,t.name=s.data.item.name,t.description=s.data.item.description,t.stock_keeping_unit=s.data.item.stock_keeping_unit,t.item_type_id=s.data.item.item_type_id,t.item_classification_id=s.data.item.item_classification_id,t.default_unit_of_measurement_id=s.data.item.default_unit_of_measurement_id,t.purchase_unit_of_measurement_id=s.data.item.purchase_unit_of_measurement_id,t.itemTypeId=s.data.item.item_type,t.itemClassId=s.data.item.item_classification,t.defaultItemUnitId=s.data.item.default_unit_of_measurement,t.purchaseItemUnitId=s.data.item.purchase_unit_of_measurement,t.item_conversions=s.data.item.item_conversions,t.itemClassList=s.data.item.item_type.item_classifications,t.getItemType(),t.getClassType(),t.getUnit(),t.getConversions(),e()})}).then(function(){t.ifReady=!0})},methods:(i={refreshData:function(){this.item_classifications=[]},selectItemType:function(){this.item_type_id=this.itemTypeId.id,this.itemClassList=this.itemTypeId.item_classifications,console.log("GetItemTypeId: "+this.item_type_id)},addNewItem:function(){this.item_conversions.push({module:this.selectedConversionModule.value,module_name:this.selectedConversionModule.name,conversion_id:this.selectedConversion.id,conversion:{convert_from:this.selectedConversion.convert_from,from_value:this.selectedConversion.from_value,convert_to:this.selectedConversion.convert_to,to_value:this.selectedConversion.to_value}}),console.log(this.item_conversions)},getConversions:function(){var t=this,e={purchase_unit_of_measurement_id:this.purchase_unit_of_measurement_id,default_unit_of_measurement_id:this.default_unit_of_measurement_id};console.log(e),axios.post("/api/items/conversions",e).then(function(e){console.log(e.data.conversions),t.conversionsList=e.data.conversions}).catch(function(e){console.log(e),alert("Error! No Result"),t.ifReady=!0})},selectClassType:function(){this.item_classification_id=this.itemClassId.id,console.log("GetItemClassId: "+this.item_classification_id)},selectDefaultUnit:function(){this.default_unit_of_measurement_id=this.defaultItemUnitId.id,this.getConversions(),this.selectedConversion={},this.selectedConversionModule={},console.log("GetDefaultUnitId: "+this.default_unit_of_measurement_id)}},n(i,"getConversions",function(){var t=this,e={purchase_unit_of_measurement_id:this.purchase_unit_of_measurement_id,default_unit_of_measurement_id:this.default_unit_of_measurement_id};this.purchase_unit_of_measurement_id&&this.default_unit_of_measurement_id&&axios.post("/api/items/conversions",e).then(function(e){console.log(e.data.conversions),t.conversionsList=e.data.conversions}).catch(function(e){console.log(e),alert("Error! No Result"),t.conversionsList=[],t.ifReady=!0})}),n(i,"selectPurchaseUnit",function(){this.purchase_unit_of_measurement_id=this.purchaseItemUnitId.id,this.selectedConversion={},this.selectedConversionModule={},console.log("GetPurchaseUnitId: "+this.purchase_unit_of_measurement_id)}),n(i,"getItemType",function(){var t=this;new Promise(function(e,s){axios.get("/api/item-types/get-all-item-types/").then(function(s){t.itemTypesList=s.data.item_types,e()})})}),n(i,"getClassType",function(){var t=this;new Promise(function(e,s){axios.get("/api/item-classifications/get-all-item-classifications/").then(function(s){t.itemClassList=s.data.item_classifications,e()})})}),n(i,"getUnit",function(){var t=this;new Promise(function(e,s){axios.get("/api/unit-of-measurements/get-all-unit-of-measurements/").then(function(s){t.itemUnitList=s.data.unit_of_measurements,e()})})}),n(i,"viewItems",function(){this.$router.push({name:"items.index"})}),n(i,"deleteRow",function(t){this.item_conversions.splice(t,1)}),n(i,"updateItem",function(){var t=this;this.ifReady=!1,axios.patch("/api/items/"+this.$route.params.id,this.$data).then(function(e){t.$router.push({name:"items.view",params:{id:t.$route.params.id}})}).catch(function(e){t.ifReady=!0,console.log(e)})}),i)}},xKEp:function(t,e,s){var i=s("VU/8")(s("EPqz"),s("yBYR"),!1,null,null,null);t.exports=i.exports},yBYR:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{class:this.$store.state.showSidebar?"content-title":"spacer content-title"},[s("h4",{staticClass:"module-title"},[t._v("ITEM")]),t._v(" "),s("hr",{staticClass:"title-border"})]),t._v(" "),s("div",{staticClass:"p-md-4"},[s("div",{staticClass:"card"},[s("div",{staticClass:"card-header"},[s("a",{staticClass:"text-success",attrs:{href:""},on:{click:function(e){return e.preventDefault(),t.viewItems(e)}}},[t._v("Items")]),t._v(" "),s("a",{staticClass:"text-secondary"},[t._v(" / Edit Item")])]),t._v(" "),s("div",{staticClass:"card-body"},[t.ifReady?s("div",[s("form",{on:{submit:function(e){return e.preventDefault(),t.editWarehouse(e)}}},[s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"name"}},[t._v("Name")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],staticClass:"form-control",attrs:{type:"text",autocomplete:"off",minlength:"2",maxlength:"255",required:""},domProps:{value:t.name},on:{input:function(e){e.target.composing||(t.name=e.target.value)}}})]),t._v(" "),s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"name"}},[t._v("SKU")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.stock_keeping_unit,expression:"stock_keeping_unit"}],staticClass:"form-control",attrs:{type:"text",autocomplete:"off",minlength:"2",maxlength:"255",required:""},domProps:{value:t.stock_keeping_unit},on:{input:function(e){e.target.composing||(t.stock_keeping_unit=e.target.value)}}})]),t._v(" "),s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-6"},[s("div",{staticClass:"form-group"},[s("label",[t._v("Item Type")]),t._v(" "),s("vue-select",{attrs:{label:"name",options:t.itemTypesList},on:{input:function(e){t.selectItemType()}},model:{value:t.itemTypeId,callback:function(e){t.itemTypeId=e},expression:"itemTypeId"}})],1)]),t._v(" "),s("div",{staticClass:"col-md-6"},[s("div",{staticClass:"form-group"},[s("label",[t._v(" Item Subtype")]),t._v(" "),s("vue-select",{attrs:{label:"name",options:t.itemClassList},on:{input:function(e){t.selectClassType()}},model:{value:t.itemClassId,callback:function(e){t.itemClassId=e},expression:"itemClassId"}})],1)]),t._v(" "),s("div",{staticClass:"col-md-6"},[s("div",{staticClass:"form-group"},[s("label",[t._v("Purchase UOM")]),t._v(" "),s("vue-select",{attrs:{label:"name",options:t.itemUnitList},on:{input:function(e){t.selectPurchaseUnit()}},model:{value:t.purchaseItemUnitId,callback:function(e){t.purchaseItemUnitId=e},expression:"purchaseItemUnitId"}})],1)]),t._v(" "),s("div",{staticClass:"col-md-6"},[s("div",{staticClass:"form-group"},[s("label",[t._v("Default UOM")]),t._v(" "),s("vue-select",{attrs:{label:"name",options:t.itemUnitList},on:{input:function(e){t.selectDefaultUnit()}},model:{value:t.defaultItemUnitId,callback:function(e){t.defaultItemUnitId=e},expression:"defaultItemUnitId"}})],1)]),t._v(" "),0!=t.conversionsList.length?s("div",{staticClass:"col"},[s("div",{staticClass:"card"},[t._m(0),t._v(" "),s("div",{staticClass:"card-body"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-6"},[s("div",{staticClass:"form-group"},[s("vue-select",{attrs:{label:"name",options:t.conversionsList},model:{value:t.selectedConversion,callback:function(e){t.selectedConversion=e},expression:"selectedConversion"}})],1)]),t._v(" "),s("div",{staticClass:"col-md-3"},[s("div",{staticClass:"form-group"},[s("vue-select",{attrs:{label:"name",options:t.conversionModules},model:{value:t.selectedConversionModule,callback:function(e){t.selectedConversionModule=e},expression:"selectedConversionModule"}})],1)]),t._v(" "),s("div",{staticClass:"col-md-3"},[s("div",{staticClass:"form-group"},[s("button",{staticClass:"btn btn-success",attrs:{type:"button"},on:{click:t.addNewItem}},[s("i",{staticClass:"fas fa-plus"}),t._v(" Add")])])])])]),t._v(" "),s("div",{staticClass:"card-body"},[s("table",{staticClass:"table table-hover table-sm"},[t._m(1),t._v(" "),t._m(2),t._v(" "),s("tbody",t._l(t.item_conversions,function(e,i){return s("tr",{key:i},[s("td",[t._v(t._s(e.conversion.from_value)+" "+t._s(e.conversion.convert_from.name))]),t._v(" "),s("td",[t._v(t._s(e.conversion.to_value)+" "+t._s(e.conversion.convert_to.name))]),t._v(" "),1===e.module?s("td",[t._v("\n                                                        Invetory\n                                                    ")]):t._e(),t._v(" "),2===e.module?s("td",[t._v("\n                                                        Recipe\n                                                    ")]):t._e(),t._v(" "),s("td",[s("button",{staticClass:"btn btn-danger btn-sm",attrs:{type:"button"},on:{click:function(e){t.deleteRow(i)}}},[s("i",{staticClass:"far fa-times-circle"})])])])}),0)])])])]):t._e()]),t._v(" "),s("br"),t._v(" "),s("button",{staticClass:"btn btn-outline-success btn-sm",attrs:{type:"button"},on:{click:function(e){return"button"in e||!t._k(e.keyCode,"default",void 0,e.key,void 0)?(e.preventDefault(),t.viewItems(e)):null}}},[s("i",{staticClass:"fas fa-chevron-left"}),t._v(" Back")]),t._v(" "),s("button",{staticClass:"btn btn-success btn-sm",attrs:{type:"button"},on:{click:function(e){return"button"in e||!t._k(e.keyCode,"default",void 0,e.key,void 0)?(e.preventDefault(),t.updateItem(e)):null}}},[s("i",{staticClass:"fas fa-edit"}),t._v(" Update Item")])])]):s("div",[t._m(3)])])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"card-header"},[e("a",{staticClass:"text-success"},[this._v("Conversion Section")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("caption",[e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-3"})])])},function(){var t=this.$createElement,e=this._self._c||t;return e("thead",[e("tr",[e("th",{attrs:{scope:"col"}},[this._v("From")]),this._v(" "),e("th",{attrs:{scope:"col"}},[this._v("To")]),this._v(" "),e("th",{attrs:{scope:"col"}},[this._v("Module")]),this._v(" "),e("th",{attrs:{scope:"col"}},[this._v("Action")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"progress"},[e("div",{staticClass:"progress-bar progress-bar-striped progress-bar-animated",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})])}]}}});
//# sourceMappingURL=54.js.map