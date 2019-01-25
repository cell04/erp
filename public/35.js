webpackJsonp([35],{"2N54":function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{class:this.$store.state.showSidebar?"content-title":"spacer content-title"},[s("h4",{staticClass:"module-title"},[t._v("STOCK RECEIVE")]),t._v(" "),s("hr",{staticClass:"title-border"})]),t._v(" "),s("div",{staticClass:"p-md-4"},[s("div",{staticClass:"card"},[s("div",{staticClass:"card-header"},[s("a",{staticClass:"text-success",attrs:{href:""},on:{click:function(e){return e.preventDefault(),t.viewSRec(e)}}},[t._v("Stock Receives")]),t._v(" "),s("a",{staticClass:"text-secondary"},[t._v(" / Create New Stock Receive")])]),t._v(" "),s("div",{staticClass:"card-body"},[t.ifReady?s("div",[s("form",{on:{submit:function(e){return e.preventDefault(),t.createNewStockRequest(e)}}},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-6 form-group"},[s("label",[t._v("Stock Transfer")]),t._v(" "),s("vue-select",{attrs:{label:"number",options:t.stockTransfers,required:""},on:{input:function(e){t.selectStockTransfers()}},model:{value:t.stockTransfersData,callback:function(e){t.stockTransfersData=e},expression:"stockTransfersData"}})],1),t._v(" "),s("div",{staticClass:"col-md-6 form-group"},[s("label",[t._v("Stock Receive #")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.number,expression:"number"}],staticClass:"form-control",attrs:{type:"text",required:""},domProps:{value:t.number},on:{input:function(e){e.target.composing||(t.number=e.target.value)}}})]),t._v(" "),s("div",{staticClass:"col-md-6 form-group"},[s("label",[t._v("From")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.st_stock_transferable_from_name,expression:"st_stock_transferable_from_name"}],staticClass:"form-control",attrs:{type:"text",readonly:""},domProps:{value:t.st_stock_transferable_from_name},on:{input:function(e){e.target.composing||(t.st_stock_transferable_from_name=e.target.value)}}})]),t._v(" "),s("div",{staticClass:"col-md-6 form-group"},[s("label",[t._v("To")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.st_stock_transferable_to_name,expression:"st_stock_transferable_to_name"}],staticClass:"form-control",attrs:{type:"text",readonly:""},domProps:{value:t.st_stock_transferable_to_name},on:{input:function(e){e.target.composing||(t.st_stock_transferable_to_name=e.target.value)}}})]),t._v(" "),s("div",{staticClass:"col-md-6 form-group"},[s("label",[t._v("Receive Date")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.receive_date,expression:"receive_date"}],staticClass:"form-control",attrs:{type:"date",required:""},domProps:{value:t.receive_date},on:{input:function(e){e.target.composing||(t.receive_date=e.target.value)}}})])]),t._v(" "),s("br"),t._v(" "),s("table",{staticClass:"table table-hover table-sm"},[t._m(0),t._v(" "),s("tbody",t._l(t.stockReceiveData,function(e){return s("tr",{key:e.id},[s("td",[t._v(t._s(e.item.stock_keeping_unit))]),t._v(" "),s("td",[t._v(t._s(e.item.name))]),t._v(" "),s("td",[t._v(t._s(e.item.description))]),t._v(" "),s("td",[t._v(t._s(e.quantity))]),t._v(" "),s("td",[t._v(t._s(e.unit_of_measurement.name))])])}),0)]),t._v(" "),s("br"),t._v(" "),s("div",{staticClass:"pt-3"},[s("button",{staticClass:"btn btn-outline-success btn-sm",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.viewSRec(e)}}},[s("i",{staticClass:"fas fa-chevron-left"}),t._v(" Back")]),t._v(" "),t._m(1)])])]):s("div",[t._m(2)])])])])])},staticRenderFns:[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("thead",[s("tr",[s("th",{attrs:{scope:"col"}},[t._v("SKU")]),t._v(" "),s("th",{attrs:{scope:"col"}},[t._v("Name")]),t._v(" "),s("th",{attrs:{scope:"col"}},[t._v("Description")]),t._v(" "),s("th",{attrs:{scope:"col"}},[t._v("Qty")]),t._v(" "),s("th",{attrs:{scope:"col"}},[t._v("UOM")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("button",{staticClass:"btn btn-success btn-sm",attrs:{type:"submit"}},[e("i",{staticClass:"fas fa-plus"}),this._v(" Create New Stock Receive")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"progress"},[e("div",{staticClass:"progress-bar progress-bar-striped progress-bar-animated",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})])}]}},"9DIb":function(t,e,s){var a=s("VU/8")(s("xEKe"),s("2N54"),!1,null,null,null);t.exports=a.exports},xEKe:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{ifReady:!1,from_selected_radio_button:"",to_selected_radio_button:"",stockTransfersData:null,stockTransfers:[],warehouses:[],fromWarehouse:null,receive_date:"",toWarehouse:null,branches:[],fromBranch:null,toBranch:null,items:null,number:null,stock_receivable_from_id:null,stock_receivable_from_type:null,stock_receivable_to_id:null,stock_receivable_to_type:null,stock_receive_items:[],stock_transfer_id:"",stockReceiveData:[],st_stock_transferable_from_id:"",st_stock_transferable_to_id:"",st_stock_transferable_from_name:"",st_stock_transferable_to_name:"",st_stock_transferable_from_type:"",st_stock_transferable_to_type:""}},mounted:function(){var t=this,e=new Promise(function(e,s){axios.get("/api/branches/get-all-branches/").then(function(s){t.branches=s.data.branches,e()}).catch(function(t){console.log(t),s()})}),s=new Promise(function(e,s){axios.get("/api/warehouses/get-all-warehouses/").then(function(s){t.warehouses=s.data.warehouses,e()}).catch(function(t){console.log(t),s()})}),a=new Promise(function(e,s){axios.get("/api/stock-transfers/get-all-stock-transfers/").then(function(s){t.stockTransfers=s.data.stock_transfers,e()}).catch(function(t){console.log(t),s()})}),r=new Promise(function(e,s){axios.get("/api/items/get-all-items/").then(function(s){t.items=s.data.items,e()}).catch(function(t){console.log(t),s()})});Promise.all([e,s,a,r]).then(function(){t.ifReady=!0,t.addItem()})},methods:{viewSRec:function(){this.$router.push({name:"stock-receives.index"})},getStockReceiveData:function(t){var e=this;axios.get("/api/stock-transfers/"+t).then(function(t){e.stockReceiveData=t.data.stockTransfer.stock_transfer_items,e.st_stock_transferable_from_id=t.data.stockTransfer.stock_transferable_from_id,e.st_stock_transferable_to_id=t.data.stockTransfer.stock_transferable_to_id,e.st_stock_transferable_from_name=t.data.stockTransfer.stock_transferable_from.name,e.st_stock_transferable_to_name=t.data.stockTransfer.stock_transferable_to.name,e.st_stock_transferable_from_type=t.data.stockTransfer.stock_transferable_from_type,e.st_stock_transferable_to_type=t.data.stockTransfer.stock_transferable_to_type,resolve()}).catch(function(t){console.log(t)})},selectStockTransfers:function(){this.stock_transfer_id=this.stockTransfersData.id,this.getStockReceiveData(this.stock_transfer_id)},selectItem:function(t){this.stock_receive_items[t].item instanceof Object&&(this.stock_receive_items[t].item_id=this.stock_receive_items[t].item.id,this.stock_receive_items[t].unitOfMeasurement=this.stock_receive_items[t].item.default_unit_of_measurement.name,this.stock_receive_items[t].unit_of_measurement_id=this.stock_receive_items[t].item.default_unit_of_measurement.id)},addItem:function(){this.stock_receive_items.push({stock_keeping_unit:"",item:"",item_id:"",quantity:"",unitOfMeasurements:[],unitOfMeasurement:"",unit_of_measurement_id:""})},removeItem:function(t){this.stock_receive_items.splice(t,1)},createNewStockRequest:function(){var t=this;this.ifReady=!1;var e=[];this.stock_receive_items.forEach(function(t){e.push({item_id:t.item_id,quantity:t.quantity,unit_of_measurement_id:t.unit_of_measurement_id})});var s={number:this.number,stock_receivable_from_id:this.st_stock_transferable_from_id,stock_receivable_from_type:this.st_stock_transferable_from_type,stock_receivable_to_id:this.st_stock_transferable_to_id,stock_receivable_to_type:this.st_stock_transferable_to_type,stock_receive_items:this.stockReceiveData,stock_transfer_id:this.stock_transfer_id,stock_received_date:this.receive_date};axios.post("/api/stock-receives",s).then(function(e){t.$router.push({name:"stock-receives.index"})}).catch(function(e){console.log(e),alert("Error! Can't create stock receive"),t.ifReady=!0})}}}}});
//# sourceMappingURL=35.js.map