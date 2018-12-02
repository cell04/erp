webpackJsonp([10],{"4E8W":function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t._m(0),t._v(" "),a("div",{staticClass:"p-md-4"},[a("div",{staticClass:"card"},[a("div",{staticClass:"card-header"},[a("a",{staticClass:"text-success",attrs:{href:""},on:{click:function(e){return e.preventDefault(),t.viewBills(e)}}},[t._v("Purchase Invoices")]),t._v(" "),a("a",{staticClass:"text-secondary"},[t._v(" / Create New Purchase Invoice")])]),t._v(" "),a("div",{staticClass:"card-body"},[t.ifReady?a("div",[a("form",{on:{submit:function(e){return e.preventDefault(),t.createNewBill(e)}}},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-6 form-group"},[a("label",[t._v("Received Order #")]),t._v(" "),a("vue-select",{attrs:{label:"reference_number",options:t.receiveOrders,required:""},on:{input:function(e){t.selectRO()}},model:{value:t.receiveOrdersId,callback:function(e){t.receiveOrdersId=e},expression:"receiveOrdersId"}})],1),t._v(" "),a("div",{staticClass:"col-md-6 form-group"},[a("label",[t._v("Purchase Invoice #")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.reference_number,expression:"reference_number"}],staticClass:"form-control",attrs:{type:"text",required:""},domProps:{value:t.reference_number},on:{input:function(e){e.target.composing||(t.reference_number=e.target.value)}}})]),t._v(" "),a("div",{staticClass:"col-md-6 form-group"},[a("label",[t._v("Supplier")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.ro_contact_name,expression:"ro_contact_name"}],staticClass:"form-control",attrs:{type:"text",readonly:""},domProps:{value:t.ro_contact_name},on:{input:function(e){e.target.composing||(t.ro_contact_name=e.target.value)}}})]),t._v(" "),a("div",{staticClass:"col-md-6 form-group"},[a("div",{staticClass:"dateStyle"},[a("label",[t._v("Due Date")]),t._v(" "),a("datepicker",{attrs:{"bootstrap-styling":!0,required:""},model:{value:t.due_date,callback:function(e){t.due_date=e},expression:"due_date"}})],1)]),t._v(" "),a("div",{staticClass:"col-md-6 form-group"},[a("label",[t._v("Taxable")]),a("br"),t._v(" "),a("label",{staticClass:"switch"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.taxable,expression:"taxable"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.taxable)?t._i(t.taxable,null)>-1:t.taxable},on:{change:[function(e){var a=t.taxable,i=e.target,r=!!i.checked;if(Array.isArray(a)){var s=t._i(a,null);i.checked?s<0&&(t.taxable=a.concat([null])):s>-1&&(t.taxable=a.slice(0,s).concat(a.slice(s+1)))}else t.taxable=r},function(e){t.onTaxable()}]}}),t._v(" "),a("span",{staticClass:"slider round"},[a("span",{staticClass:"on"},[t._v(t._s("Yes"))]),t._v(" "),a("span",{staticClass:"off"},[t._v(t._s("No"))])])])]),t._v(" "),!0===this.$data.taxable?a("div",{staticClass:"col-md-6 form-group"},[a("label",[t._v("Tax %")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.taxable_value,expression:"taxable_value"}],staticClass:"form-control",attrs:{type:"number"},domProps:{value:t.taxable_value},on:{input:function(e){e.target.composing||(t.taxable_value=e.target.value)}}})]):t._e()]),t._v(" "),a("br"),t._v(" "),t._m(1),t._v(" "),a("br"),t._v(" "),a("br"),t._v(" "),a("table",{staticClass:"table table-hover table-sm"},[t._m(2),t._v(" "),a("tbody",[t._l(t.receive_order_items,function(e,i){return a("tr",{key:e.id},[a("td",[t._v(t._s(e.item.stock_keeping_unit))]),t._v(" "),a("td",[t._v(t._s(e.item.name))]),t._v(" "),a("td",[t._v(t._s(e.item.description))]),t._v(" "),a("td",[t._v(t._s(e.quantity))]),t._v(" "),a("td",[t._v(t._s(e.unit_of_measurement.name))]),t._v(" "),a("td",[t._v(t._s(e.item_pricelist.price))]),t._v(" "),a("td",{attrs:{align:"right"}},[t._v(t._s(t._f("Decimal")(t.subtotalRow[i])))])])}),t._v(" "),a("tr",[a("td",{attrs:{colspan:"5"}}),t._v(" "),t._m(3),t._v(" "),a("td",{attrs:{align:"right"}},[t._v(t._s(t._f("Decimal")(t.subtotal)))])]),t._v(" "),a("tr",[a("td",{attrs:{colspan:"5"}}),t._v(" "),t._m(4),t._v(" "),a("td",{attrs:{align:"right"}},[t._v(t._s(t.taxis?t.taxis.toFixed(2):0))])]),t._v(" "),a("tr",[a("td",{attrs:{colspan:"5"}}),t._v(" "),t._m(5),t._v(" "),a("td",{attrs:{align:"right"}},[t._v(t._s(t._f("Decimal")(t.total)))])])],2)]),t._v(" "),a("br"),t._v(" "),a("div",{staticClass:"pt-3"},[a("button",{staticClass:"btn btn-outline-success btn-sm",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.viewBills(e)}}},[a("i",{staticClass:"fas fa-chevron-left"}),t._v(" Back")]),t._v(" "),a("button",{staticClass:"btn btn-success btn-sm",attrs:{type:"submit",disabled:t.isDisabled}},[a("i",{staticClass:"fas fa-plus"}),t._v(" Create New Purchase Invoice")])])])]):a("div",[t._m(6)])])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"content-title"},[e("h4",{staticClass:"module-title"},[this._v("PURCHASE INVOICE")]),this._v(" "),e("hr",{staticClass:"title-border"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("h6",[e("b",[e("u",[this._v("Purchase Invoice Items")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("tr",[a("th",{attrs:{scope:"col"}},[t._v("SKU")]),t._v(" "),a("th",{attrs:{scope:"col"}},[t._v("Name")]),t._v(" "),a("th",{attrs:{scope:"col"}},[t._v("Description")]),t._v(" "),a("th",{attrs:{scope:"col"}},[t._v("Qty")]),t._v(" "),a("th",{attrs:{scope:"col"}},[t._v("UOM")]),t._v(" "),a("th",{attrs:{scope:"col"}},[t._v("Unit Price")]),t._v(" "),a("th",{staticClass:"text-right"},[t._v("Amount")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("td",[e("b",[this._v("Subtotal")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("td",[e("b",[this._v("Tax")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("td",[e("b",[this._v("Total")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"progress"},[e("div",{staticClass:"progress-bar progress-bar-striped progress-bar-animated",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})])}]}},F5fE:function(t,e,a){(t.exports=a("FZ+f")(!1)).push([t.i,'.dateStyle input:-moz-read-only{background-color:#fff!important}.dateStyle input:read-only{background-color:#fff!important}.switch{position:relative;display:inline-block;width:90px;height:34px}.switch input{display:none}.slider{cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#8e8e8e}.slider,.slider:before{position:absolute;-webkit-transition:.4s;transition:.4s}.slider:before{content:"";height:26px;width:26px;left:4px;bottom:4px;background-color:#fff}input:checked+.slider{background-color:#0cc27e}input:focus+.slider{-webkit-box-shadow:0 0 1px #2196f3;box-shadow:0 0 1px #2196f3}input:checked+.slider:before{-webkit-transform:translateX(55px);transform:translateX(55px)}.on{display:none}.off,.on{color:#fff;position:absolute;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);top:50%}.on{left:45%}.off{left:55%}input:checked+.slider .on{display:block}input:checked+.slider .off{display:none}.slider.round{border-radius:34px}.slider.round:before{border-radius:50%}',""])},SyeK:function(t,e,a){var i=a("VU/8")(a("toPZ"),a("4E8W"),!1,function(t){a("rkWa")},null,null);t.exports=i.exports},rkWa:function(t,e,a){var i=a("F5fE");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a("rjj0")("6d37b93b",i,!0,{})},toPZ:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{ifReady:!1,receive_order_items:[],receiveOrders:[],receiveOrdersId:null,taxable:0,tax:0,taxable_value:0,bills:[],billsContact:[],billsId:null,contacts:[],contact:null,contact_id:"",ro_contact_id:"",ro_contact_name:"",due_date:"",amount:"",amount_paid:0,items:[],reference_number:"",receive_order_id:"",bill_items:[{item:"",item_id:"",quantity:0,unitOfMeasurements:[],unitOfMeasurement:"",unit_of_measurement_id:"",itemPricelists:[],itemPricelist:0,item_pricelist_id:"",subTotal:0}],amounts:"",isDisabled:!1}},filters:{Decimal:function(t){if(t)return t.toFixed(2)}},mounted:function(){var t=this;this.due_date=new Date;var e=new Promise(function(e,a){axios.get("/api/contacts/get-all-contacts/").then(function(a){t.contacts=a.data.contacts,e()}).catch(function(t){console.log(t),a()})}),a=new Promise(function(e,a){axios.get("/api/items/get-all-items/").then(function(a){t.items=a.data.items,e()}).catch(function(t){console.log(t),a()})}),i=new Promise(function(e,a){axios.get("/api/receive-orders/get-all-receive-orders/").then(function(a){t.receiveOrders=a.data.receive_orders,t.billsContact=a.data.receive_orders.contact,e()}).catch(function(t){console.log(t),a()})});Promise.all([e,a,i]).then(function(){t.ifReady=!0})},computed:{subtotalRow:function(){return this.receive_order_items.map(function(t){return Number(t.quantity*t.item_pricelist.price)})},subtotal:function(){return this.receive_order_items.reduce(function(t,e){return t+e.quantity*e.item_pricelist.price},0)},taxis:function(){return this.subtotal*(this.$data.taxable_value/100)},total:function(){var t=this;return this.receive_order_items.reduce(function(e,a){return e+a.quantity*a.item_pricelist.price-t.taxis},0)}},methods:{onTaxable:function(){return this.taxable_value=0},viewBills:function(){this.$router.push({name:"bills.index"})},getBillAmount:function(){var t=0;this.receive_order_items.forEach(function(e){t+=e.quantity*e.item_pricelist.price}),this.amount=t,console.log("total: "+this.amount)},getBillsData:function(t){var e=this;axios.get("/api/receive-orders/"+t).then(function(t){e.ro_contact_id=t.data.receiveOrder.contact_id,e.ro_contact_name=t.data.receiveOrder.contact.person,e.amount=t.data.receiveOrder.amount,e.receive_order_items=t.data.receiveOrder.receive_order_items,e.getBillAmount(),resolve()}).catch(function(t){console.log(t),reject()})},selectRO:function(){this.receive_order_id=this.receiveOrdersId.id,console.log("Date: "+this.due_date),this.getBillsData(this.receiveOrdersId.id)},createNewBill:function(){var t=this;this.ifReady=!1;var e=[];this.$data.receive_order_items.forEach(function(t){e.push({item_id:t.item_id,quantity:t.quantity,unit_of_measurement_id:t.unit_of_measurement_id,price:t.item_pricelist.price})});var a={taxable:!0===this.$data.taxable?1:0,tax:this.taxis,taxable_value:+this.$data.taxable_value,bill_items:this.receive_order_items,receive_order_id:this.$data.receive_order_id,contact_id:this.$data.ro_contact_id,reference_number:this.$data.reference_number,due_date:moment(this.$data.due_date).format("YYYY-MM-DD"),amount:this.amount,amount_paid:"0"};console.log(a),this.ifReady=!0,axios.post("/api/bills",a).then(function(e){t.$router.push({name:"bills.index"})}).catch(function(e){alert("Error! Can't create bill"),t.ifReady=!0})}}}}});
//# sourceMappingURL=10.js.map