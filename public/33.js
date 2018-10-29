webpackJsonp([33],{HT3z:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"card"},[i("div",{staticClass:"card-header"},[e._v("\n        Receive Orders / Create New Receive Order\n    ")]),e._v(" "),i("div",{staticClass:"card-body"},[e.ifReady?i("div",[i("form",{on:{submit:function(t){return t.preventDefault(),e.createNewReceiveOrder(t)}}},[i("div",{staticClass:"row"},[i("div",{staticClass:"col-md-6 form-group"},[i("label",[e._v("Purchase Order")]),e._v(" "),i("vue-select",{attrs:{label:"reference_number",options:e.purchaseOrders},on:{input:function(t){e.selectPurchaseOrder()}},model:{value:e.purchaseOrder,callback:function(t){e.purchaseOrder=t},expression:"purchaseOrder"}})],1),e._v(" "),i("div",{staticClass:"col-md-6 form-group"},[i("label",[e._v("Contact")]),e._v(" "),i("vue-select",{attrs:{label:"person",options:e.contacts},on:{input:function(t){e.selectContact()}},model:{value:e.contact,callback:function(t){e.contact=t},expression:"contact"}})],1),e._v(" "),i("div",{staticClass:"col-md-6 form-group"},[i("label",[e._v("Reference Number")]),e._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:e.reference_number,expression:"reference_number"}],staticClass:"form-control",attrs:{type:"text",required:""},domProps:{value:e.reference_number},on:{input:function(t){t.target.composing||(e.reference_number=t.target.value)}}})]),e._v(" "),i("div",{staticClass:"col-md-6 form-group"},[i("label",[e._v("Warehouse")]),e._v(" "),i("vue-select",{attrs:{label:"name",options:e.warehouses},on:{input:function(t){e.selectWarehouse()}},model:{value:e.warehouse,callback:function(t){e.warehouse=t},expression:"warehouse"}})],1)]),e._v(" "),i("br"),e._v(" "),i("table",{staticClass:"table table-hover table-sm"},[e._m(0),e._v(" "),e._m(1),e._v(" "),i("tbody",[e._l(e.receive_order_items,function(t,r){return i("tr",{key:r},[i("td",[e._v(e._s(t.item.stock_keeping_unit))]),e._v(" "),i("td",[i("vue-select",{attrs:{label:"name",options:e.items},on:{input:function(t){e.selectItem(r)}},model:{value:t.item,callback:function(i){e.$set(t,"item",i)},expression:"receive_order_item.item"}})],1),e._v(" "),i("td",[i("input",{directives:[{name:"model",rawName:"v-model.number",value:t.quantity,expression:"receive_order_item.quantity",modifiers:{number:!0}}],staticClass:"form-control",attrs:{required:""},domProps:{value:t.quantity},on:{input:function(i){i.target.composing||e.$set(t,"quantity",e._n(i.target.value))},blur:function(t){e.$forceUpdate()}}})]),e._v(" "),i("td",[e._v("\n                                "+e._s(t.unitOfMeasurement)+"\n                            ")]),e._v(" "),i("td",[i("vue-select",{attrs:{label:"price",options:t.itemPricelists},on:{input:function(t){e.selectItemPricelist(r)}},model:{value:t.itemPricelist,callback:function(i){e.$set(t,"itemPricelist",i)},expression:"receive_order_item.itemPricelist"}})],1),e._v(" "),i("td",[i("input",{directives:[{name:"model",rawName:"v-model.number",value:t.tracking_number,expression:"receive_order_item.tracking_number",modifiers:{number:!0}}],staticClass:"form-control",attrs:{type:"text",required:""},domProps:{value:t.tracking_number},on:{input:function(i){i.target.composing||e.$set(t,"tracking_number",e._n(i.target.value))},blur:function(t){e.$forceUpdate()}}})]),e._v(" "),i("td",[e._v(e._s(isNaN(t.subTotal)?"0.00":t.subTotal))]),e._v(" "),i("td",[i("input",{directives:[{name:"model",rawName:"v-model",value:t.expiration_date,expression:"receive_order_item.expiration_date"}],staticClass:"form-control",attrs:{type:"date"},domProps:{value:t.expiration_date},on:{input:function(i){i.target.composing||e.$set(t,"expiration_date",i.target.value)}}})]),e._v(" "),i("td",[i("button",{staticClass:"btn btn-danger btn-sm",attrs:{type:"button"},on:{click:function(t){e.deleteRow(r)}}},[e._v("Remove")])])])}),e._v(" "),i("tr",[i("td",{attrs:{colspan:"5"}}),e._v(" "),e._m(2),e._v(" "),i("td",[e._v(e._s(isNaN(e.amount)?"0.00":e.amount))]),e._v(" "),i("td"),e._v(" "),i("td")])],2)]),e._v(" "),i("div",{staticClass:"pt-3"},[i("button",{staticClass:"btn btn-success btn-sm",attrs:{type:"submit",disabled:e.isDisabled}},[e._v("Create New Receive Order")]),e._v(" "),i("button",{staticClass:"btn btn-primary btn-sm",attrs:{type:"button"},on:{click:e.addNewItem}},[e._v("Add New Item")])])])]):i("div",[e._m(3)])])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("caption",[t("div",{staticClass:"row"},[t("div",{staticClass:"col-md-3"})])])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("thead",[i("tr",[i("th",{attrs:{scope:"col"}},[e._v("SKU")]),e._v(" "),i("th",{attrs:{scope:"col"}},[e._v("Item")]),e._v(" "),i("th",{attrs:{scope:"col"}},[e._v("Quantity")]),e._v(" "),i("th",{attrs:{scope:"col"}},[e._v("Unit of Measurement")]),e._v(" "),i("th",{attrs:{scope:"col"}},[e._v("Price")]),e._v(" "),i("th",{attrs:{scope:"col"}},[e._v("Tracking #")]),e._v(" "),i("th",{attrs:{scope:"col"}},[e._v("Sub Total")]),e._v(" "),i("th",{attrs:{scope:"col"}},[e._v("Expiration")]),e._v(" "),i("th",{attrs:{scope:"col"}},[e._v("Action")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("td",[t("b",[this._v("Total")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"progress"},[t("div",{staticClass:"progress-bar progress-bar-striped progress-bar-animated",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})])}]}},KfA8:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{ifReady:!1,purchaseOrders:[],purchaseOrder:null,purchaseOrderId:null,contacts:[],contact:null,contact_id:"",warehouses:[],warehouse:null,warehouse_id:"",items:[],reference_number:"",purchase_order_id:"",receive_order_items:[{item:"",item_id:"",quantity:0,unitOfMeasurements:[],unitOfMeasurement:"",unit_of_measurement_id:"",itemPricelists:[],itemPricelist:0,item_pricelist_id:"",tracking_number:"",expiration_date:"",subTotal:0}],amount:"",isDisabled:!0}},mounted:function(){var e=this,t=new Promise(function(t,i){axios.get("/api/contacts/get-all-contacts/").then(function(i){e.contacts=i.data.contacts,t()}).catch(function(e){console.log(e),i()})}),i=new Promise(function(t,i){axios.get("/api/warehouses/get-all-warehouses").then(function(i){e.warehouses=i.data.warehouses,t()}).catch(function(e){console.log(e),i()})}),r=new Promise(function(t,i){axios.get("/api/items/get-all-items/").then(function(i){e.items=i.data.items,t()}).catch(function(e){console.log(e),i()})}),s=new Promise(function(t,i){axios.get("/api/purchase-orders/get-all-purchase-orders/").then(function(i){e.purchaseOrders=i.data.purchase_orders,t()}).catch(function(e){console.log(e),i()})});Promise.all([t,i,r,s]).then(function(){e.ifReady=!0})},computed:{subTotalRow:function(){return this.receive_order_items.map(function(e){return e.quantity*e.unit_price})},total:function(){return this.receive_order_items.reduce(function(e,t){return e+t.quantity*t.unit_price},0)}},methods:{selectContact:function(){this.contact_id=this.contact.id},selectWarehouse:function(){this.warehouse_id=this.warehouse.id},selectPurchaseOrder:function(){this.purchase_order_id=this.purchaseOrder.id,this.reference_number=this.purchaseOrder.reference_number},selectItem:function(e){var t=this;if(this.receive_order_items[e].item instanceof Object){this.receive_order_items[e].item_id=this.receive_order_items[e].item.id,this.receive_order_items[e].unitOfMeasurement=this.receive_order_items[e].item.default_unit_of_measurement.name,this.receive_order_items[e].unit_of_measurement_id=this.receive_order_items[e].item.default_unit_of_measurement.id;new Promise(function(i,r){axios.get("/api/item-pricelists/get-item-pricelists/"+t.receive_order_items[e].item_id).then(function(r){t.receive_order_items[e].itemPricelists=r.data.item_pricelists,i()}).catch(function(e){console.log(e),r()})})}},selectItemPricelist:function(e){this.receive_order_items[e].item_pricelist_id=this.receive_order_items[e].itemPricelist.id,this.receive_order_items[e].subTotal=parseFloat(this.receive_order_items[e].quantity)*parseFloat(this.receive_order_items[e].itemPricelist.price),this.updateTotalAmount()},updateTotalAmount:function(){var e=0;this.receive_order_items.forEach(function(t){e+=t.subTotal}),this.amount=e,this.amount>0?this.isDisabled=!1:this.isDisabled=!0},addNewItem:function(){this.receive_order_items.push({item:"",item_id:"",quantity:"",unitOfMeasurements:[],unitOfMeasurement:"",unit_of_measurement_id:"",itemPricelists:[],itemPricelist:"",item_pricelist_id:"",tracking_number:"",expiration_date:"",subTotal:0}),this.updateTotalAmount()},deleteRow:function(e){this.receive_order_items.splice(e,1),this.updateTotalAmount()},createNewReceiveOrder:function(){var e=this;this.ifReady=!1;var t=[];this.$data.receive_order_items.forEach(function(e){t.push({item_id:e.item_id,quantity:e.quantity,unit_of_measurement_id:e.unit_of_measurement_id,item_pricelist_id:e.item_pricelist_id,tracking_number:e.tracking_number,expiration_date:e.expiration_date})});var i={reference_number:this.$data.reference_number,contact_id:this.$data.contact_id,receive_order_items:t,purchase_order_id:this.purchase_order_id};axios.post("/api/receive-orders",i).then(function(t){console.log(t.data),e.$router.push({name:"receive-orders.index"})}).catch(function(t){console.log(t),alert("Error! Can't create receive order"),e.ifReady=!0})}}}},"PpM+":function(e,t,i){var r=i("VU/8")(i("KfA8"),i("HT3z"),!1,null,null,null);e.exports=r.exports}});
//# sourceMappingURL=33.js.map