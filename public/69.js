webpackJsonp([69],{"2mlR":function(e,t,i){var r=i("VU/8")(i("7Ru7"),i("KaCG"),!1,null,null,null);e.exports=r.exports},"7Ru7":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{ifReady:!1,receive_order_items:[],purchaseOrder:[],receiveOrderId:null,contacts:[],contact:null,contact_id:"",contact_person:"",due_date:"",amount:"",amount_paid:"",warehouses:[],warehouse:null,warehouse_id:"",items:[],reference_number:"",receive_order_id:"",invoice_items:[{item:"",item_id:"",quantity:0,unitOfMeasurements:[],unitOfMeasurement:"",unit_of_measurement_id:"",itemPricelists:[],itemPricelist:0,item_pricelist_id:"",subTotal:0}],amounts:"",isDisabled:!1}},mounted:function(){var e=this,t=new Promise(function(t,i){axios.get("/api/contacts/get-all-contacts/").then(function(i){e.contacts=i.data.contacts,t()}).catch(function(e){console.log(e),i()})}),i=new Promise(function(t,i){axios.get("/api/warehouses/get-all-warehouses").then(function(i){e.warehouses=i.data.warehouses,t()}).catch(function(e){console.log(e),i()})}),r=new Promise(function(t,i){axios.get("/api/items/get-all-items/").then(function(i){e.items=i.data.items,t()}).catch(function(e){console.log(e),i()})}),a=new Promise(function(t,i){axios.get("/api/receive-orders/"+e.$route.params.id).then(function(i){e.receiveOrderId=i.data.receiveOrder.reference_number,e.contact_id=i.data.receiveOrder.contact.id,e.contact_person=i.data.receiveOrder.contact.person,e.receive_order_id=i.data.receiveOrder.id,e.receive_order_items=i.data.receiveOrder.receive_order_items;var r=0;e.receive_order_items.forEach(function(e){r+=e.subTotal}),e.amount=r,t()}).catch(function(e){console.log(e),i()})});Promise.all([t,i,r,a]).then(function(){e.ifReady=!0}),console.log("Params: "+this.$route.params.id)},computed:{subtotalRow:function(){return this.receive_order_items.map(function(e){return Number(e.quantity*e.item_pricelist.price)})},total:function(){return this.receive_order_items.reduce(function(e,t){return e+t.quantity*t.item_pricelist.price},0)}},methods:{viewQuotations:function(){this.$router.push({name:"quotations.index"})},createNewInvoice:function(){var e=this;this.ifReady=!1;var t=[];this.$data.invoice_items.forEach(function(e){t.push({item_id:e.item_id,quantity:e.quantity,unit_of_measurement_id:e.unit_of_measurement_id,item_pricelist_id:e.item_pricelist_id})});var i={invoice_items:this.$data.receive_order_items,receive_order_id:this.receive_order_id,contact_id:this.$data.contact_id,reference_number:this.$data.reference_number,due_date:this.$data.due_date,amount:this.amount,amount_paid:0};console.log(i),axios.post("/api/invoices",i).then(function(t){e.$router.push({name:"invoices.index"})}).catch(function(t){alert("Error! Can't create invoice"),e.ifReady=!0})}}}},KaCG:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("div",{class:this.$store.state.showSidebar?"content-title":"spacer content-title"},[i("h4",{staticClass:"module-title"},[e._v("SALES INVOICE")]),e._v(" "),i("hr",{staticClass:"title-border"})]),e._v(" "),i("div",{staticClass:"p-md-4"},[i("div",{staticClass:"card"},[i("div",{staticClass:"card-header"},[i("a",{staticClass:"text-success",attrs:{href:""},on:{click:function(t){return t.preventDefault(),e.viewQuotations(t)}}},[e._v("Sales Invoices")]),e._v(" "),i("a",{staticClass:"text-secondary"},[e._v(" / Receive Sales Invoice")])]),e._v(" "),i("div",{staticClass:"card-body"},[e.ifReady?i("div",[i("form",{on:{submit:function(t){return t.preventDefault(),e.createNewInvoice(t)}}},[i("div",{staticClass:"row"},[i("div",{staticClass:"col-md-6 form-group"},[i("label",[e._v("Receive Order")]),e._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:e.receiveOrderId,expression:"receiveOrderId"}],staticClass:"form-control",attrs:{type:"text",readonly:""},domProps:{value:e.receiveOrderId},on:{input:function(t){t.target.composing||(e.receiveOrderId=t.target.value)}}})]),e._v(" "),i("div",{staticClass:"col-md-6 form-group"},[i("label",[e._v("Contact")]),e._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:e.contact_person,expression:"contact_person"}],staticClass:"form-control",attrs:{type:"text",readonly:""},domProps:{value:e.contact_person},on:{input:function(t){t.target.composing||(e.contact_person=t.target.value)}}})]),e._v(" "),i("div",{staticClass:"col-md-6 form-group"},[i("label",[e._v("Sales Invoice #")]),e._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:e.reference_number,expression:"reference_number"}],staticClass:"form-control",attrs:{type:"text",required:""},domProps:{value:e.reference_number},on:{input:function(t){t.target.composing||(e.reference_number=t.target.value)}}})]),e._v(" "),i("div",{staticClass:"col-md-6 form-group"},[i("label",[e._v("Due Date")]),e._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:e.due_date,expression:"due_date"}],staticClass:"form-control",attrs:{type:"date",required:""},domProps:{value:e.due_date},on:{input:function(t){t.target.composing||(e.due_date=t.target.value)}}})])]),e._v(" "),i("br"),e._v(" "),i("table",{staticClass:"table table-hover table-sm"},[e._m(0),e._v(" "),i("tbody",[e._l(e.receive_order_items,function(t,r){return i("tr",{key:t.id},[i("td",[e._v(e._s(t.item.stock_keeping_unit))]),e._v(" "),i("td",[e._v(e._s(t.item.name))]),e._v(" "),i("td",[e._v(e._s(t.item.description))]),e._v(" "),i("td",[e._v(e._s(t.quantity))]),e._v(" "),i("td",[e._v(e._s(t.unit_of_measurement.name))]),e._v(" "),i("td",[e._v(e._s(t.item_pricelist.price))]),e._v(" "),i("td",[e._v(e._s(e.subtotalRow[r]))])])}),e._v(" "),i("tr",[i("td"),e._v(" "),i("td"),e._v(" "),i("td"),e._v(" "),i("td"),e._v(" "),i("td"),e._v(" "),e._m(1),e._v(" "),i("td",[e._v(e._s(e.total))]),e._v(" "),i("td")])],2)]),e._v(" "),i("div",{staticClass:"pt-3"},[i("button",{staticClass:"btn btn-outline-success btn-sm",attrs:{type:"button"},on:{click:function(t){return t.preventDefault(),e.viewQuotations(t)}}},[i("i",{staticClass:"fas fa-chevron-left"}),e._v(" Back")]),e._v(" "),i("button",{staticClass:"btn btn-success btn-sm",attrs:{type:"submit",disabled:e.isDisabled}},[i("i",{staticClass:"fas fa-plus"}),e._v(" Create New Invoice")])])])]):i("div",[e._m(2)])])])])])},staticRenderFns:[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("thead",[i("tr",[i("th",{attrs:{scope:"col"}},[e._v("SKU")]),e._v(" "),i("th",{attrs:{scope:"col"}},[e._v("Name")]),e._v(" "),i("th",{attrs:{scope:"col"}},[e._v("Description")]),e._v(" "),i("th",{attrs:{scope:"col"}},[e._v("Qty")]),e._v(" "),i("th",{attrs:{scope:"col"}},[e._v("UOM")]),e._v(" "),i("th",{attrs:{scope:"col"}},[e._v("Unit Price")]),e._v(" "),i("th",{attrs:{scope:"col"}},[e._v("Amount")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("td",[t("b",[this._v("Total")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"progress"},[t("div",{staticClass:"progress-bar progress-bar-striped progress-bar-animated",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})])}]}}});
//# sourceMappingURL=69.js.map