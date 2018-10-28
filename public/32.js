webpackJsonp([32],{"7qwV":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{componentVal:"Received Orders",ifReady:!1,order:[],received_items:[],contacts:[]}},mounted:function(){this.getReceivedOrder()},methods:{getReceivedOrder:function(){var e=this;new Promise(function(t,r){axios.get("/api/receive-orders/"+e.$route.params.id).then(function(r){e.ifReady=!0,e.order=r.data.receiveOrder,e.contacts=r.data.receiveOrder.contact,e.received_items=r.data.receiveOrder.receive_order_items,r.data.response&&t()})})},viewReceivedOrders:function(){this.$router.push({name:"receive-orders.index"})}},computed:{subtotalRow:function(){return this.received_items.map(function(e){return Number(e.quantity*e.item_pricelist.price)})},total:function(){return this.received_items.reduce(function(e,t){return e+t.quantity*t.item_pricelist.price},0)}}}},N7aw:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("div",{staticClass:"card"},[r("div",{staticClass:"card-header"},[e._v("\n            "+e._s(e.componentVal)+" / View "+e._s(e.componentVal)+"\n        ")]),e._v(" "),r("div",{staticClass:"card-body"},[e.ifReady?r("div",[r("fieldset",[r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-6"},[r("div",{staticClass:"form-group"},[r("label",[e._v("Received Date")]),e._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.order.created_at,expression:"order.created_at"}],staticClass:"form-control",attrs:{type:"text",id:"name",readonly:""},domProps:{value:e.order.created_at},on:{input:function(t){t.target.composing||e.$set(e.order,"created_at",t.target.value)}}})])]),e._v(" "),r("div",{staticClass:"col-md-6"},[r("div",{staticClass:"form-group"},[r("label",[e._v("Reference #")]),e._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.order.reference_number,expression:"order.reference_number"}],staticClass:"form-control",attrs:{type:"text",id:"name",readonly:""},domProps:{value:e.order.reference_number},on:{input:function(t){t.target.composing||e.$set(e.order,"reference_number",t.target.value)}}})])])]),e._v(" "),r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-6"},[r("div",{staticClass:"form-group"},[r("label",[e._v("Contact")]),e._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.contacts.person,expression:"contacts.person"}],staticClass:"form-control",attrs:{type:"text",id:"name",readonly:""},domProps:{value:e.contacts.person},on:{input:function(t){t.target.composing||e.$set(e.contacts,"person",t.target.value)}}})])])])]),e._v(" "),r("br"),e._v(" "),r("table",{staticClass:"table table-hover table-sm"},[e._m(0),e._v(" "),r("tbody",[e._l(e.received_items,function(t,s){return r("tr",{key:t.id},[r("td",[e._v(e._s(t.item.stock_keeping_unit))]),e._v(" "),r("td",[e._v(e._s(t.item.name))]),e._v(" "),r("td",[e._v(e._s(t.item.description))]),e._v(" "),r("td",[e._v(e._s(t.quantity))]),e._v(" "),r("td",[e._v(e._s(t.unit_of_measurement.name))]),e._v(" "),r("td",[e._v(e._s(t.item_pricelist.price))]),e._v(" "),r("td",[e._v(e._s(t.tracking_number))]),e._v(" "),r("td",[e._v(e._s(e.subtotalRow[s]))])])}),e._v(" "),r("tr",[r("td"),e._v(" "),r("td"),e._v(" "),r("td"),e._v(" "),r("td"),e._v(" "),r("td"),e._v(" "),r("td"),e._v(" "),e._m(1),e._v(" "),r("td",[e._v(e._s(e.total))]),e._v(" "),r("td")])],2)]),e._v(" "),r("br"),e._v(" "),r("button",{staticClass:"btn btn-outline-info btn-sm",attrs:{type:"button"},on:{click:function(t){return t.preventDefault(),e.viewReceivedOrders(t)}}},[e._v("Back")]),e._v(" "),"Issued"===e.order.status?r("router-link",{attrs:{to:{name:"receive-orders.create",params:{po_id:e.order.id}}}},[r("button",{staticClass:"btn btn-success btn-sm"},[e._v("Receive PO")])]):e._e(),e._v(" "),"Issued"===e.order.status?r("button",{staticClass:"btn btn-danger btn-sm",on:{click:function(t){e.closePO(e.order.id,e.order.purchase_order_number)}}},[e._v("Close PO")]):e._e()],1):r("div",[e._m(2)])])]),e._v(" "),r("br")])},staticRenderFns:[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("thead",[r("tr",[r("th",{attrs:{scope:"col"}},[e._v("SKU")]),e._v(" "),r("th",{attrs:{scope:"col"}},[e._v("Name")]),e._v(" "),r("th",{attrs:{scope:"col"}},[e._v("Description")]),e._v(" "),r("th",{attrs:{scope:"col"}},[e._v("Received Qty")]),e._v(" "),r("th",{attrs:{scope:"col"}},[e._v("UOM")]),e._v(" "),r("th",{attrs:{scope:"col"}},[e._v("Unit Price")]),e._v(" "),r("th",{attrs:{scope:"col"}},[e._v("Tracking #")]),e._v(" "),r("th",{attrs:{scope:"col"}},[e._v("Amount")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("td",[t("b",[this._v("Total")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"progress"},[t("div",{staticClass:"progress-bar progress-bar-striped progress-bar-animated",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})])}]}},ox1U:function(e,t,r){var s=r("VU/8")(r("7qwV"),r("N7aw"),!1,null,null,null);e.exports=s.exports}});
//# sourceMappingURL=32.js.map