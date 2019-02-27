webpackJsonp([54],{SuiI:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{class:this.$store.state.showSidebar?"content-title":"spacer content-title"},[s("h4",{staticClass:"module-title"},[t._v("ITEM")]),t._v(" "),s("hr",{staticClass:"title-border"})]),t._v(" "),s("div",{staticClass:"p-md-4"},[s("div",{staticClass:"card"},[s("div",{staticClass:"card-header"},[s("a",{staticClass:"text-success",attrs:{href:""},on:{click:function(e){return e.preventDefault(),t.viewItems(e)}}},[t._v("Items")]),t._v(" "),s("a",{staticClass:"text-secondary"},[t._v(" / Create New Item")])]),t._v(" "),s("div",{staticClass:"card-body"},[t.ifReady?s("div",[s("form",{on:{submit:function(e){return e.preventDefault(),t.createNewItem(e)}}},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-6"},[s("div",{staticClass:"form-group"},[s("label",[t._v("Name")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],staticClass:"form-control",attrs:{type:"text",autocomplete:"off",minlength:"2",maxlength:"255",required:""},domProps:{value:t.name},on:{input:function(e){e.target.composing||(t.name=e.target.value)}}})])]),t._v(" "),s("div",{staticClass:"col-md-6"},[s("div",{staticClass:"form-group"},[s("label",[t._v("SKU")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.stock_keeping_unit,expression:"stock_keeping_unit"}],staticClass:"form-control",attrs:{maxlength:"1000",required:""},domProps:{value:t.stock_keeping_unit},on:{input:function(e){e.target.composing||(t.stock_keeping_unit=e.target.value)}}})])])]),t._v(" "),s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-6"},[s("div",{staticClass:"form-group"},[s("label",[t._v("Item Type")]),t._v(" "),s("vue-select",{attrs:{label:"name",options:t.itemTypesList},on:{input:function(e){t.selectItemType()}},model:{value:t.itemTypeId,callback:function(e){t.itemTypeId=e},expression:"itemTypeId"}})],1)]),t._v(" "),s("div",{staticClass:"col-md-6"},[s("div",{staticClass:"form-group"},[s("label",[t._v(" Item Subtype")]),t._v(" "),s("vue-select",{attrs:{label:"name",options:t.itemClassList},on:{input:function(e){t.selectItemClass()}},model:{value:t.itemClassId,callback:function(e){t.itemClassId=e},expression:"itemClassId"}})],1)])]),t._v(" "),s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-6 form-group"},[s("label",[t._v("With Components")]),s("br"),t._v(" "),s("label",{staticClass:"switch"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.withComponent,expression:"withComponent"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.withComponent)?t._i(t.withComponent,null)>-1:t.withComponent},on:{change:[function(e){var s=t.withComponent,i=e.target,n=!!i.checked;if(Array.isArray(s)){var o=t._i(s,null);i.checked?o<0&&(t.withComponent=s.concat([null])):o>-1&&(t.withComponent=s.slice(0,o).concat(s.slice(o+1)))}else t.withComponent=n},function(e){t.getWithComponentValue()}]}}),t._v(" "),s("span",{staticClass:"slider round"},[s("span",{staticClass:"on"},[t._v(t._s("Yes"))]),t._v(" "),s("span",{staticClass:"off"},[t._v(t._s("No"))])])])]),t._v(" "),s("div",{staticClass:"col-md-6"},[s("div",{staticClass:"form-group"},[s("label",[t._v("Selling UOM")]),t._v(" "),s("vue-select",{attrs:{label:"name",options:t.itemUnitList,required:""},on:{input:function(e){t.selectSellingItemUnit()}},model:{value:t.sellingItemUnitId,callback:function(e){t.sellingItemUnitId=e},expression:"sellingItemUnitId"}})],1)])]),t._v(" "),s("div",{staticClass:"row"},[s("div",{directives:[{name:"show",rawName:"v-show",value:!t.withComponent,expression:"!withComponent"}],staticClass:"col-md-6"},[s("div",{staticClass:"form-group"},[s("label",[t._v("Purchase UOM")]),t._v(" "),s("vue-select",{attrs:{label:"name",options:t.itemUnitList},on:{input:function(e){t.selectPurchaseItemUnit()}},model:{value:t.purchaseItemUnitId,callback:function(e){t.purchaseItemUnitId=e},expression:"purchaseItemUnitId"}})],1)]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:!t.withComponent,expression:"!withComponent"}],staticClass:"col-md-6"},[s("div",{staticClass:"form-group"},[s("label",[t._v("Default UOM")]),t._v(" "),s("vue-select",{attrs:{label:"name",options:t.itemUnitList},on:{input:function(e){t.selectDefaultItemUnit()}},model:{value:t.defaultItemUnitId,callback:function(e){t.defaultItemUnitId=e},expression:"defaultItemUnitId"}})],1)])]),t._v(" "),s("div",{staticClass:"row"},[0==t.conversionsList.length||t.withComponent?t._e():s("div",{staticClass:"col"},[s("div",{staticClass:"card"},[t._m(0),t._v(" "),s("div",{staticClass:"card-body"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-6"},[s("div",{staticClass:"form-group"},[s("vue-select",{attrs:{label:"name",options:t.conversionsList},model:{value:t.selectedConversion,callback:function(e){t.selectedConversion=e},expression:"selectedConversion"}})],1)]),t._v(" "),s("div",{staticClass:"col-md-3"},[s("div",{staticClass:"form-group"},[s("vue-select",{attrs:{label:"name",options:t.conversionModules},model:{value:t.selectedConversionModule,callback:function(e){t.selectedConversionModule=e},expression:"selectedConversionModule"}})],1)]),t._v(" "),s("div",{staticClass:"col-md-3"},[s("div",{staticClass:"form-group"},[s("button",{staticClass:"btn btn-success",attrs:{type:"button"},on:{click:t.addNewItem}},[s("i",{staticClass:"fas fa-plus"}),t._v(" Add")])])])])]),t._v(" "),s("div",{staticClass:"card-body"},[s("table",{staticClass:"table table-hover table-sm"},[t._m(1),t._v(" "),t._m(2),t._v(" "),s("tbody",t._l(t.item_conversions,function(e,i){return s("tr",{key:i},[s("td",[t._v(t._s(e.from_value)+" "+t._s(e.convertFrom.name))]),t._v(" "),s("td",[t._v(t._s(e.to_value)+" "+t._s(e.convertTo.name))]),t._v(" "),s("td",[t._v(t._s(e.module_name))]),t._v(" "),s("td",[s("button",{staticClass:"btn btn-danger btn-sm",attrs:{type:"button"},on:{click:function(e){t.deleteRow(i)}}},[s("i",{staticClass:"far fa-times-circle"})])])])}),0)])])])]),t._v(" "),t.withComponent?s("div",{staticClass:"col"},[s("div",{staticClass:"card"},[t._m(3),t._v(" "),s("div",{staticClass:"card-body"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-4"},[s("label",[t._v("Item")]),t._v(" "),s("div",{staticClass:"form-group"},[s("vue-select",{attrs:{label:"name",options:t.items},on:{input:function(e){t.selectComponent()}},model:{value:t.selectedComponent.item,callback:function(e){t.$set(t.selectedComponent,"item",e)},expression:"selectedComponent.item"}})],1)]),t._v(" "),s("div",{staticClass:"col-md-2"},[s("div",{staticClass:"form-group"},[s("label",[t._v("Quantity")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.selectedComponent.quantity,expression:"selectedComponent.quantity"}],staticClass:"form-control",attrs:{type:"number"},domProps:{value:t.selectedComponent.quantity},on:{input:function(e){e.target.composing||t.$set(t.selectedComponent,"quantity",e.target.value)}}})])]),t._v(" "),s("div",{staticClass:"col-md-3"},[s("div",{staticClass:"form-group"},[s("label",[t._v("UOM")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.selectedComponent.unit_name,expression:"selectedComponent.unit_name"}],staticClass:"form-control",attrs:{type:"text",disabled:""},domProps:{value:t.selectedComponent.unit_name},on:{input:function(e){e.target.composing||t.$set(t.selectedComponent,"unit_name",e.target.value)}}})])]),t._v(" "),s("div",{staticClass:"col-md-3"},[s("label",[t._v("Action")]),t._v(" "),s("div",{staticClass:"form-group"},[s("button",{staticClass:"btn btn-success",attrs:{type:"button"},on:{click:t.addNewItemComponent}},[s("i",{staticClass:"fas fa-plus"}),t._v(" Add")])])])])]),t._v(" "),s("div",{staticClass:"card-body"},[s("table",{staticClass:"table table-hover table-sm"},[t._m(4),t._v(" "),t._m(5),t._v(" "),s("tbody",t._l(t.item_components,function(e,i){return s("tr",{key:i},[s("td",[t._v(t._s(e.item.name))]),t._v(" "),s("td",[t._v(t._s(e.quantity)+" ")]),t._v(" "),s("td",[t._v(t._s(e.unit.name))]),t._v(" "),s("td",[s("button",{staticClass:"btn btn-danger btn-sm",attrs:{type:"button"},on:{click:function(e){t.deleteComponentRow(i)}}},[s("i",{staticClass:"far fa-times-circle"})])])])}),0)])])])]):t._e()]),t._v(" "),s("br"),t._v(" "),s("button",{staticClass:"btn btn-outline-success btn-sm",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.viewItems(e)}}},[s("i",{staticClass:"fas fa-chevron-left"}),t._v(" Back")]),t._v(" "),t._m(6)])]):s("div",[t._m(7)])])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"card-header"},[e("a",{staticClass:"text-success"},[this._v("Conversion Section")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("caption",[e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-3"})])])},function(){var t=this.$createElement,e=this._self._c||t;return e("thead",[e("tr",[e("th",{attrs:{scope:"col"}},[this._v("From")]),this._v(" "),e("th",{attrs:{scope:"col"}},[this._v("To")]),this._v(" "),e("th",{attrs:{scope:"col"}},[this._v("Module")]),this._v(" "),e("th",{attrs:{scope:"col"}},[this._v("Action")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"card-header"},[e("a",{staticClass:"text-success"},[this._v("Component Section")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("caption",[e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-3"})])])},function(){var t=this.$createElement,e=this._self._c||t;return e("thead",[e("tr",[e("th",{attrs:{scope:"col"}},[this._v("Item")]),this._v(" "),e("th",{attrs:{scope:"col"}},[this._v("Quantity")]),this._v(" "),e("th",{attrs:{scope:"col"}},[this._v("UOM")]),this._v(" "),e("th",{attrs:{scope:"col"}},[this._v("Action")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("button",{staticClass:"btn btn-success btn-sm",attrs:{type:"submit"}},[e("i",{staticClass:"fas fa-plus"}),this._v(" Create New Item")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"progress"},[e("div",{staticClass:"progress-bar progress-bar-striped progress-bar-animated",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})])}]}},bEvG:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{ifReady:!0,newItem:{purchase_price:"",asset_account_id:"",cogs_account_id:"",expense_account_id:"",sales_account_id:"",default_unit_id:"",purchase_unit_id:"",conversion_id:"",item_conversions:[{conversion_id:""}]},items:[],item_components:[],selectedComponent:{},withComponent:null,with_component:null,itemTypeId:{},itemClassId:{},defaultItemUnitId:{},purchaseItemUnitId:{},sellingItemUnitId:{},item_type_id:"",item_classification_id:"",name:"",description:"",stock_keeping_unit:"",default_unit_of_measurement_id:"",selling_unit_of_measurement_id:null,purchase_unit_of_measurement_id:"",itemTypesList:[],itemClassList:[],itemUnitList:[],selectedConversion:{},selectedConversionModule:{},accountsList:[],itemClassificationsList:[],unitsList:[],defaultUnitsList:[],conversionsList:[],item_conversions:[],conversionModules:[{value:1,name:"Inventory"},{value:2,name:"Recipe"}]}},mounted:function(){var t=this;new Promise(function(e,s){axios.get("/api/item-types/get-all-item-types/").then(function(s){console.log(s),t.ifReady=!0,t.itemTypesList=s.data.item_types,s.data.response&&e()}),axios.get("/api/items/get-all-items").then(function(s){console.log(s),t.ifReady=!0,t.items=s.data.items,s.data.response&&e()})}),new Promise(function(e,s){axios.get("/api/unit-of-measurements/get-all-unit-of-measurements/").then(function(s){t.ifReady=!0,t.itemUnitList=s.data.unit_of_measurements,s.data.response&&e()})})},methods:{viewItems:function(){this.$router.push({name:"items.index"})},getWithComponentValue:function(){this.withComponent?(this.item_conversions=[],this.default_unit_of_measurement_id=null,this.purchase_unit_of_measurement_id=null,this.with_component="yes"):(this.with_component="no",this.item_components=[])},selectComponent:function(){this.selectedComponent.unit_name=this.selectedComponent.item.selling_unit_of_measurement.name,this.selectedComponent.unit=this.selectedComponent.item.selling_unit_of_measurement},addNewItem:function(){this.item_conversions.push({module:this.selectedConversionModule.value,module_name:this.selectedConversionModule.name,conversion_id:this.selectedConversion.id,convertFrom:this.selectedConversion.convert_from,from_value:this.selectedConversion.from_value,convertTo:this.selectedConversion.convert_to,to_value:this.selectedConversion.to_value})},addNewItemComponent:function(){this.item_components.push({component_id:this.selectedComponent.item.id,item:this.selectedComponent.item,unit:this.selectedComponent.unit,unit_of_measurement_id:this.selectedComponent.unit.id,quantity:this.selectedComponent.quantity,converter_value:1}),this.selectedComponent={}},deleteRow:function(t){this.item_conversions.splice(t,1)},deleteComponentRow:function(t){this.item_components.splice(t,1)},getConversions:function(){var t=this,e={purchase_unit_of_measurement_id:this.purchase_unit_of_measurement_id,default_unit_of_measurement_id:this.default_unit_of_measurement_id};this.purchase_unit_of_measurement_id&&this.default_unit_of_measurement_id&&axios.post("/api/items/conversions",e).then(function(e){console.log(e.data.conversions),t.conversionsList=e.data.conversions}).catch(function(e){console.log(e),alert("Error! No Result"),t.conversionsList=[],t.ifReady=!0})},selectDefaultItemUnit:function(){this.default_unit_of_measurement_id=this.defaultItemUnitId.id,console.log("GetDefaultItemUnitId: "+this.default_unit_of_measurement_id),this.getConversions(),this.item_conversions=[],this.selectedConversion={},this.selectedConversionModule={}},selectSellingItemUnit:function(){this.selling_unit_of_measurement_id=this.sellingItemUnitId.id},selectPurchaseItemUnit:function(){this.purchase_unit_of_measurement_id=this.purchaseItemUnitId.id,this.conversionsList=[],this.defaultItemUnitId={},this.item_conversions=[],this.selectedConversion={},this.selectedConversionModule={},console.log("GetPurchaseItemUnitId: "+this.purchase_unit_of_measurement_id)},selectItemType:function(){this.item_type_id=this.itemTypeId.id,this.itemClassList=this.itemTypeId.item_classifications,console.log("GetItemTypeId: "+this.item_type_id)},selectItemClass:function(){this.item_classification_id=this.itemClassId.id,console.log("GetItemClassId: "+this.item_classification_id)},createNewItem:function(){var t=this;this.ifReady=!1,axios.post("/api/items",this.$data).then(function(e){t.$router.push({name:"items.index"})}).catch(function(e){t.ifReady=!0,console.log(e)})}}}},"l4W+":function(t,e,s){var i=s("VU/8")(s("bEvG"),s("SuiI"),!1,null,null,null);t.exports=i.exports}});
//# sourceMappingURL=54.js.map