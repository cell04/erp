webpackJsonp([33],{Jk2u:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{ifReady:!1,purchaseOrder:[],purchaseOrderId:null,purchaseOrderContact:null,contacts:[],contact:null,contactData:"",warehouses:[],warehouse:null,warehouseData:"",items:[],reference_number:"",purchase_order_id:"",receive_order_items:[{item:"",item_id:"",quantity:0,unitOfMeasurements:[],unitOfMeasurement:"",unit_of_measurement_id:"",itemPricelists:[],itemPricelist:0,item_pricelist_id:"",tracking_number:"",expiration_date:"",subTotal:0}],amount:"",isDisabled:!1}},mounted:function(){var e=this,t=new Promise(function(t,r){axios.get("/api/contacts/get-all-contacts/").then(function(r){e.contacts=r.data.contacts,t()}).catch(function(e){console.log(e),r()})}),r=new Promise(function(t,r){axios.get("/api/warehouses/get-all-warehouses").then(function(r){e.warehouses=r.data.warehouses,t()}).catch(function(e){console.log(e),r()})}),a=new Promise(function(t,r){axios.get("/api/items/get-all-items/").then(function(r){e.items=r.data.items,t()}).catch(function(e){console.log(e),r()})}),s=new Promise(function(t,r){axios.get("/api/purchase-orders/get-all-purchase-orders/").then(function(r){e.purchaseOrder=r.data.purchase_orders,t()}).catch(function(e){console.log(e),r()})}),i=new Promise(function(t,r){axios.get("/api/purchase-orders/"+e.$route.params.id).then(function(r){e.purchaseOrderId=r.data.purchaseOrder.reference_number,e.contactData=r.data.purchaseOrder.contact,e.purchase_order_id=r.data.purchaseOrder.id,e.receive_order_items=r.data.purchaseOrder.purchase_order_items,t()}).catch(function(e){console.log(e),r()})});Promise.all([t,r,a,s,i]).then(function(){e.ifReady=!0}),console.log("Params: "+this.$route.params.id)},computed:{subtotalRow:function(){return this.receive_order_items.map(function(e){return Number(e.quantity*e.item_pricelist.price)})},total:function(){return this.receive_order_items.reduce(function(e,t){return e+t.quantity*t.item_pricelist.price},0)}},methods:{viewPOs:function(){this.$router.push({name:"purchase-orders.index"})},updateTotalAmount:function(){this.receive_order_items.forEach(function(e){e.subTotal})},deleteRow:function(e){this.receive_order_items.splice(e,1),this.updateTotalAmount()},createNewReceiveOrder:function(){var e=this;this.ifReady=!1;var t=[];this.$data.receive_order_items.forEach(function(r){t.push({item_id:r.item_id,quantity:r.quantity,unit_of_measurement_id:r.unit_of_measurement_id,item_pricelist_id:r.item_pricelist_id,tracking_number:e.reference_number,expiration_date:r.expiration_date})});var r={reference_number:this.$data.reference_number,contact_id:this.$data.contactData.id,receive_order_items:t,purchase_order_id:this.purchase_order_id};axios.post("/api/receive-orders",r).then(function(t){console.log(t.data),e.$router.push({name:"receive-orders.index"})}).catch(function(t){console.log(t),alert("Error! Can't create receive order"),e.ifReady=!0})}}}},e9kS:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"card"},[e._m(0),e._v(" "),r("div",{staticClass:"card-body"},[e.ifReady?r("div",[r("form",{on:{submit:function(t){return t.preventDefault(),e.createNewReceiveOrder(t)}}},[r("h6",[r("u",[e._v("From "),r("b",[e._v("PO #")]),e._v(" "+e._s(e.purchaseOrderId))])]),e._v(" "),r("br"),e._v(" "),r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-6 form-group"},[r("label",[e._v("Purchase Order #")]),e._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.purchaseOrderId,expression:"purchaseOrderId"}],staticClass:"form-control",attrs:{type:"text",readonly:""},domProps:{value:e.purchaseOrderId},on:{input:function(t){t.target.composing||(e.purchaseOrderId=t.target.value)}}})]),e._v(" "),r("div",{staticClass:"col-md-6 form-group"},[r("label",[e._v("Supplier")]),e._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.contactData.person,expression:"contactData.person"}],staticClass:"form-control",attrs:{type:"text",readonly:""},domProps:{value:e.contactData.person},on:{input:function(t){t.target.composing||e.$set(e.contactData,"person",t.target.value)}}})]),e._v(" "),r("div",{staticClass:"col-md-6 form-group"},[r("label",[e._v("Receive Order #")]),e._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.reference_number,expression:"reference_number"}],staticClass:"form-control",attrs:{type:"text",required:""},domProps:{value:e.reference_number},on:{input:function(t){t.target.composing||(e.reference_number=t.target.value)}}})])]),e._v(" "),r("br"),e._v(" "),r("table",{staticClass:"table table-hover table-sm"},[e._m(1),e._v(" "),r("tbody",[e._l(e.receive_order_items,function(t,a){return r("tr",{key:t.id},[r("td",[e._v(e._s(t.item.stock_keeping_unit))]),e._v(" "),r("td",[e._v(e._s(t.item.name))]),e._v(" "),r("td",[e._v(e._s(t.item.description))]),e._v(" "),r("td",[r("input",{directives:[{name:"model",rawName:"v-model",value:t.quantity,expression:"item.quantity"}],staticClass:"form-control",attrs:{type:"text",required:""},domProps:{value:t.quantity},on:{input:function(r){r.target.composing||e.$set(t,"quantity",r.target.value)}}})]),e._v(" "),r("td",[e._v(e._s(t.unit_of_measurement.name))]),e._v(" "),r("td",[e._v(e._s(t.item_pricelist.price))]),e._v(" "),r("td",[e._v(e._s(e.subtotalRow[a]))]),e._v(" "),r("td",[r("button",{staticClass:"btn btn-danger btn-sm",attrs:{type:"button"},on:{click:function(t){e.deleteRow(a)}}},[r("i",{staticClass:"far fa-times-circle"})])])])}),e._v(" "),r("tr",[r("td"),e._v(" "),r("td"),e._v(" "),r("td"),e._v(" "),r("td"),e._v(" "),r("td"),e._v(" "),e._m(2),e._v(" "),r("td",[e._v(e._s(e.total))])])],2)]),e._v(" "),r("div",{staticClass:"pt-3"},[r("button",{staticClass:"btn btn-outline-success btn-sm",attrs:{type:"button"},on:{click:function(t){return t.preventDefault(),e.viewPOs(t)}}},[r("i",{staticClass:"fas fa-chevron-left"}),e._v(" Back")]),e._v(" "),r("button",{staticClass:"btn btn-success btn-sm",attrs:{type:"submit",disabled:e.isDisabled}},[r("i",{staticClass:"fas fa-plus"}),e._v(" Create New Receive Order")])])])]):r("div",[e._m(3)])])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"card-header"},[t("b",[this._v("Receive Orders / Create New Receive Order")])])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("thead",[r("tr",[r("th",{attrs:{scope:"col"}},[e._v("SKU")]),e._v(" "),r("th",{attrs:{scope:"col"}},[e._v("Name")]),e._v(" "),r("th",{attrs:{scope:"col"}},[e._v("Description")]),e._v(" "),r("th",{attrs:{scope:"col"}},[e._v("Qty")]),e._v(" "),r("th",{attrs:{scope:"col"}},[e._v("UOM")]),e._v(" "),r("th",{attrs:{scope:"col"}},[e._v("Unit Price")]),e._v(" "),r("th",{attrs:{scope:"col"}},[e._v("Amount")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("td",[t("b",[this._v("Total")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"progress"},[t("div",{staticClass:"progress-bar progress-bar-striped progress-bar-animated",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})])}]}},h24D:function(e,t,r){var a=r("VU/8")(r("Jk2u"),r("e9kS"),!1,null,null,null);e.exports=a.exports}});
//# sourceMappingURL=33.js.map