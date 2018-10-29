webpackJsonp([56],{PVQo:function(e,t,i){var o=i("VU/8")(i("avYE"),i("RcK2"),!1,null,null,null);e.exports=o.exports},RcK2:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("div",{staticClass:"card"},[i("div",{staticClass:"card-header"},[e._v("\n            Invoices / View Invoice\n        ")]),e._v(" "),i("div",{staticClass:"card-body"},[e.ifReady?i("div",[i("fieldset",[i("div",{staticClass:"row"},[i("div",{staticClass:"col-md-6 form-group"},[i("label",[e._v("Receive Order")]),e._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:e.roRefNum.reference_number,expression:"roRefNum.reference_number"}],staticClass:"form-control",attrs:{type:"text",readonly:""},domProps:{value:e.roRefNum.reference_number},on:{input:function(t){t.target.composing||e.$set(e.roRefNum,"reference_number",t.target.value)}}})]),e._v(" "),i("div",{staticClass:"col-md-6 form-group"},[i("label",[e._v("Contact")]),e._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:e.contacts.person,expression:"contacts.person"}],staticClass:"form-control",attrs:{type:"text",readonly:""},domProps:{value:e.contacts.person},on:{input:function(t){t.target.composing||e.$set(e.contacts,"person",t.target.value)}}})]),e._v(" "),i("div",{staticClass:"col-md-6 form-group"},[i("label",[e._v("Reference #")]),e._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:e.invoices.reference_number,expression:"invoices.reference_number"}],staticClass:"form-control",attrs:{type:"text",readonly:""},domProps:{value:e.invoices.reference_number},on:{input:function(t){t.target.composing||e.$set(e.invoices,"reference_number",t.target.value)}}})]),e._v(" "),i("div",{staticClass:"col-md-6 form-group"},[i("label",[e._v("Amount")]),e._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:e.invoices.amount,expression:"invoices.amount"}],staticClass:"form-control",attrs:{type:"number",readonly:""},domProps:{value:e.invoices.amount},on:{input:function(t){t.target.composing||e.$set(e.invoices,"amount",t.target.value)}}})]),e._v(" "),i("div",{staticClass:"col-md-6 form-group"},[i("label",[e._v("Amount Paid")]),e._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:e.invoices.amount_paid,expression:"invoices.amount_paid"}],staticClass:"form-control",attrs:{type:"number",readonly:""},domProps:{value:e.invoices.amount_paid},on:{input:function(t){t.target.composing||e.$set(e.invoices,"amount_paid",t.target.value)}}})]),e._v(" "),i("div",{staticClass:"col-md-6 form-group"},[i("label",[e._v("Due Date")]),e._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:e.invoices.due_date,expression:"invoices.due_date"}],staticClass:"form-control",attrs:{type:"date",readonly:""},domProps:{value:e.invoices.due_date},on:{input:function(t){t.target.composing||e.$set(e.invoices,"due_date",t.target.value)}}})])])]),e._v(" "),i("br"),e._v(" "),i("table",{staticClass:"table table-hover table-sm"},[e._m(0),e._v(" "),i("tbody",[e._l(e.invoiceItems,function(t,o){return i("tr",{key:t.id},[i("td",[e._v(e._s(t.item.name))]),e._v(" "),i("td",[e._v(e._s(t.item.description))]),e._v(" "),i("td",[e._v(e._s(t.quantity))]),e._v(" "),i("td",[e._v(e._s(t.unit_of_measurement.name))]),e._v(" "),i("td",[e._v(e._s(t.item_pricelist.price))]),e._v(" "),i("td",[e._v(e._s(e.subtotalRow[o]))])])}),e._v(" "),i("tr",[i("td"),e._v(" "),i("td"),e._v(" "),i("td"),e._v(" "),i("td"),e._v(" "),e._m(1),e._v(" "),i("td",[e._v(e._s(e.total))]),e._v(" "),i("td")])],2)]),e._v(" "),i("button",{staticClass:"btn btn-info btn-sm",attrs:{type:"button"},on:{click:function(t){return t.preventDefault(),e.viewItems(t)}}},[e._v("Back")])]):i("div",[e._m(2)])])]),e._v(" "),i("br")])},staticRenderFns:[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("thead",[i("tr",[i("th",{attrs:{scope:"col"}},[e._v("Name")]),e._v(" "),i("th",{attrs:{scope:"col"}},[e._v("Description")]),e._v(" "),i("th",{attrs:{scope:"col"}},[e._v("Received Qty")]),e._v(" "),i("th",{attrs:{scope:"col"}},[e._v("UOM")]),e._v(" "),i("th",{attrs:{scope:"col"}},[e._v("Unit Price")]),e._v(" "),i("th",{attrs:{scope:"col"}},[e._v("Amount")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("td",[t("b",[this._v("Total")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"progress"},[t("div",{staticClass:"progress-bar progress-bar-striped progress-bar-animated",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})])}]}},avYE:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{ifReady:!1,invoices:[],contacts:[],roRefNum:[],invoiceItems:[]}},mounted:function(){this.getItem()},methods:{getItem:function(){var e=this;new Promise(function(t,i){axios.get("/api/invoices/"+e.$route.params.id).then(function(i){console.log("Invoices: "+JSON.stringify(i.data.invoice)),e.ifReady=!0,e.invoices=i.data.invoice,e.contacts=i.data.invoice.contact,e.invoiceItems=i.data.invoice.invoice_items,e.roRefNum=i.data.invoice.receive_order,i.data.response&&t()})})},viewItems:function(){this.$router.push({name:"invoices.index"})}},computed:{subtotalRow:function(){return this.invoiceItems.map(function(e){return Number(e.quantity*e.item_pricelist.price)})},total:function(){return this.invoiceItems.reduce(function(e,t){return e+t.quantity*t.item_pricelist.price},0)}}}}});
//# sourceMappingURL=56.js.map