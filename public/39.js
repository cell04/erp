webpackJsonp([39],{jeX2:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{ifReady:!0,itemTypeId:null,itemClassId:null,itemUnitId:null,itemTypesList:[],itemClassList:[],itemUnitList:[],item_type_id:"",item_classification_id:"",id:"",stock_keeping_unit:"",default_unit_of_measurement_id:"",name:"",description:"",status:1}},mounted:function(){var t=this;new Promise(function(e,i){axios.get("/api/items/"+t.$route.params.id).then(function(i){t.id=i.data.item.id,t.name=i.data.item.name,t.description=i.data.item.description,t.stock_keeping_unit=i.data.item.stock_keeping_unit,t.item_type_id=i.data.item.item_type_id,t.item_classification_id=i.data.item.item_classification_id,t.default_unit_of_measurement_id=i.data.item.default_unit_of_measurement_id,t.itemTypeId=i.data.item.item_type,t.itemClassId=i.data.item.item_classification,t.itemUnitId=i.data.item.default_unit_of_measurement,t.getItemType(),t.getClassType(),t.getUnit(),e()})}).then(function(){t.ifReady=!0})},methods:{selectItemType:function(){this.item_type_id=this.itemTypeId.id,console.log("GetItemTypeId: "+this.item_type_id)},selectClassType:function(){this.item_classification_id=this.itemClassId.id,console.log("GetItemClassId: "+this.item_classification_id)},selectUnit:function(){this.default_unit_of_measurement_id=this.itemUnitId.id,console.log("GetUnitId: "+this.default_unit_of_measurement_id)},getItemType:function(){var t=this;new Promise(function(e,i){axios.get("/api/item-types/get-all-item-types/").then(function(i){t.itemTypesList=i.data.item_types,e()})})},getClassType:function(){var t=this;new Promise(function(e,i){axios.get("/api/item-classifications/get-all-item-classifications/").then(function(i){t.itemClassList=i.data.item_classifications,e()})})},getUnit:function(){var t=this;new Promise(function(e,i){axios.get("/api/unit-of-measurements/get-all-unit-of-measurements/").then(function(i){t.itemUnitList=i.data.unit_of_measurements,e()})})},viewItems:function(){this.$router.push({name:"items.index"})},updateItem:function(){var t=this;this.ifReady=!1,axios.patch("/api/items/"+this.$route.params.id,this.$data).then(function(e){t.$router.push({name:"items.view",params:{id:t.$route.params.id}})}).catch(function(e){t.ifReady=!0,console.log(e)})}}}},uHPP:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticClass:"card"},[i("div",{staticClass:"card-header"},[t._v("\n            Items / Edit Item\n        ")]),t._v(" "),i("div",{staticClass:"card-body"},[t.ifReady?i("div",[i("form",{on:{submit:function(e){return e.preventDefault(),t.editWarehouse(e)}}},[i("div",{staticClass:"form-group"},[i("label",{attrs:{for:"name"}},[t._v("Name")]),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],staticClass:"form-control",attrs:{type:"text",autocomplete:"off",minlength:"2",maxlength:"255",required:""},domProps:{value:t.name},on:{input:function(e){e.target.composing||(t.name=e.target.value)}}})]),t._v(" "),i("div",{staticClass:"form-group"},[i("label",{attrs:{for:"name"}},[t._v("SKU")]),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.stock_keeping_unit,expression:"stock_keeping_unit"}],staticClass:"form-control",attrs:{type:"text",autocomplete:"off",minlength:"2",maxlength:"255",required:""},domProps:{value:t.stock_keeping_unit},on:{input:function(e){e.target.composing||(t.stock_keeping_unit=e.target.value)}}})]),t._v(" "),i("div",{staticClass:"form-group"},[i("label",{attrs:{for:"description"}},[t._v("Description")]),t._v(" "),i("textarea",{directives:[{name:"model",rawName:"v-model",value:t.description,expression:"description"}],staticClass:"form-control",attrs:{autocomplete:"off",minlength:"2",maxlength:"255",required:""},domProps:{value:t.description},on:{input:function(e){e.target.composing||(t.description=e.target.value)}}})]),t._v(" "),i("div",{staticClass:"row"},[i("div",{staticClass:"col-md-4"},[i("div",{staticClass:"form-group"},[i("label",[t._v("Item Type")]),t._v(" "),i("vue-select",{attrs:{label:"name",options:t.itemTypesList},on:{input:function(e){t.selectItemType()}},model:{value:t.itemTypeId,callback:function(e){t.itemTypeId=e},expression:"itemTypeId"}})],1)]),t._v(" "),i("div",{staticClass:"col-md-4"},[i("div",{staticClass:"form-group"},[i("label",[t._v("Item Classification")]),t._v(" "),i("vue-select",{attrs:{label:"name",options:t.itemClassList},on:{input:function(e){t.selectClassType()}},model:{value:t.itemClassId,callback:function(e){t.itemClassId=e},expression:"itemClassId"}})],1)]),t._v(" "),i("div",{staticClass:"col-md-4"},[i("div",{staticClass:"form-group"},[i("label",[t._v("Unit of Measurement")]),t._v(" "),i("vue-select",{attrs:{label:"name",options:t.itemUnitList},on:{input:function(e){t.selectUnit()}},model:{value:t.itemUnitId,callback:function(e){t.itemUnitId=e},expression:"itemUnitId"}})],1)])]),t._v(" "),i("button",{staticClass:"btn btn-outline-success btn-sm",attrs:{type:"button"},on:{click:function(e){return"button"in e||!t._k(e.keyCode,"default",void 0,e.key,void 0)?(e.preventDefault(),t.viewItems(e)):null}}},[t._v("Back")]),t._v(" "),i("button",{staticClass:"btn btn-success btn-sm",attrs:{type:"button"},on:{click:function(e){return"button"in e||!t._k(e.keyCode,"default",void 0,e.key,void 0)?(e.preventDefault(),t.updateItem(e)):null}}},[t._v("Update Item")])])]):i("div",[t._m(0)])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"progress"},[e("div",{staticClass:"progress-bar progress-bar-striped progress-bar-animated",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})])}]}},xKEp:function(t,e,i){var s=i("VU/8")(i("jeX2"),i("uHPP"),!1,null,null,null);t.exports=s.exports}});
//# sourceMappingURL=39.js.map