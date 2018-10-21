webpackJsonp([29],{"+Lyp":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{ifReady:!0,newItem:{purchase_price:"",asset_account_id:"",cogs_account_id:"",expense_account_id:"",sales_account_id:"",default_unit_id:"",purchase_unit_id:"",conversion_id:"",conversions:[{conversion_id:""}]},itemTypeId:null,itemClassId:null,itemUnitId:null,item_type_id:"",item_classification_id:"",name:"",description:"",stock_keeping_unit:"",default_unit_of_measurement_id:"",itemTypesList:[],itemClassList:[],itemUnitList:[],accountsList:[],itemClassificationsList:[],unitsList:[],defaultUnitsList:[],conversionsList:[]}},mounted:function(){var t=this;new Promise(function(e,i){axios.get("/api/item-types/get-all-item-types/").then(function(i){console.log(i),t.ifReady=!0,t.itemTypesList=i.data.item_types,i.data.response&&e()})}),new Promise(function(e,i){axios.get("/api/item-classifications/get-all-item-classifications/").then(function(i){t.ifReady=!0,t.itemClassList=i.data.item_classifications,i.data.response&&e()})}),new Promise(function(e,i){axios.get("/api/unit-of-measurements/get-all-unit-of-measurements/").then(function(i){t.ifReady=!0,t.itemUnitList=i.data.unit_of_measurements,i.data.response&&e()})})},methods:{selectItemUnit:function(){this.default_unit_of_measurement_id=this.itemUnitId.id,console.log("GetItemUnitId: "+this.default_unit_of_measurement_id)},selectItemType:function(){this.item_type_id=this.itemTypeId.id,console.log("GetItemTypeId: "+this.item_type_id)},selectItemClass:function(){this.item_classification_id=this.itemClassId.id,console.log("GetItemClassId: "+this.item_classification_id)},createNewItem:function(){var t=this;this.ifReady=!1,axios.post("/api/items",this.$data).then(function(e){t.$router.push({name:"items.index"})}).catch(function(e){t.ifReady=!0,console.log(e)})}}}},"l4W+":function(t,e,i){var s=i("VU/8")(i("+Lyp"),i("mki5"),!1,null,null,null);t.exports=s.exports},mki5:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticClass:"card"},[i("div",{staticClass:"card-header"},[t._v("\n            Items / Create New Item\n        ")]),t._v(" "),i("div",{staticClass:"card-body"},[t.ifReady?i("div",[i("form",{on:{submit:function(e){return e.preventDefault(),t.createNewItem(e)}}},[i("div",{staticClass:"row"},[i("div",{staticClass:"col-md-6"},[i("div",{staticClass:"form-group"},[i("label",[t._v("Name")]),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],staticClass:"form-control",attrs:{type:"text",autocomplete:"off",minlength:"2",maxlength:"255",required:""},domProps:{value:t.name},on:{input:function(e){e.target.composing||(t.name=e.target.value)}}})])]),t._v(" "),i("div",{staticClass:"col-md-6"},[i("div",{staticClass:"form-group"},[i("label",[t._v("SKU")]),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.stock_keeping_unit,expression:"stock_keeping_unit"}],staticClass:"form-control",attrs:{maxlength:"1000",required:""},domProps:{value:t.stock_keeping_unit},on:{input:function(e){e.target.composing||(t.stock_keeping_unit=e.target.value)}}})])])]),t._v(" "),i("div",{staticClass:"form-group"},[i("label",[t._v("Description")]),t._v(" "),i("textarea",{directives:[{name:"model",rawName:"v-model",value:t.description,expression:"description"}],staticClass:"form-control",attrs:{maxlength:"1000",required:""},domProps:{value:t.description},on:{input:function(e){e.target.composing||(t.description=e.target.value)}}})]),t._v(" "),i("div",{staticClass:"row"},[i("div",{staticClass:"col-md-4"},[i("div",{staticClass:"form-group"},[i("label",[t._v("Item Type")]),t._v(" "),i("vue-select",{attrs:{label:"name",options:t.itemTypesList},on:{input:function(e){t.selectItemType()}},model:{value:t.itemTypeId,callback:function(e){t.itemTypeId=e},expression:"itemTypeId"}})],1)]),t._v(" "),i("div",{staticClass:"col-md-4"},[i("div",{staticClass:"form-group"},[i("label",[t._v("Item Classification")]),t._v(" "),i("vue-select",{attrs:{label:"name",options:t.itemClassList},on:{input:function(e){t.selectItemClass()}},model:{value:t.itemClassId,callback:function(e){t.itemClassId=e},expression:"itemClassId"}})],1)]),t._v(" "),i("div",{staticClass:"col-md-4"},[i("div",{staticClass:"form-group"},[i("label",[t._v("Unit of Measurement")]),t._v(" "),i("vue-select",{attrs:{label:"name",options:t.itemUnitList},on:{input:function(e){t.selectItemUnit()}},model:{value:t.itemUnitId,callback:function(e){t.itemUnitId=e},expression:"itemUnitId"}})],1)])]),t._v(" "),i("button",{staticClass:"btn btn-success btn-sm",attrs:{type:"submit"}},[t._v("Create New Item")])])]):i("div",[t._m(0)])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"progress"},[e("div",{staticClass:"progress-bar progress-bar-striped progress-bar-animated",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})])}]}}});
//# sourceMappingURL=29.js.map