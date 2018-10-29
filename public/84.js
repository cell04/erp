webpackJsonp([84],{"5dBh":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{ifReady:!1,bills:[],contacts:[],roRefNum:[],billsItems:[]}},mounted:function(){this.getItem()},methods:{getItem:function(){var t=this;new Promise(function(e,s){axios.get("/api/bills/"+t.$route.params.id).then(function(s){t.ifReady=!0,t.bills=s.data.bill,t.contacts=s.data.bill.contact,t.billsItems=s.data.bill.bill_items,t.roRefNum=s.data.bill.quotation,s.data.response&&e()})})},viewBills:function(){this.$router.push({name:"bills.index"})}},computed:{subtotalRow:function(){return this.billsItems.map(function(t){return Number(t.quantity*t.price)})},total:function(){return this.billsItems.reduce(function(t,e){return t+e.quantity*e.price},0)}}}},CvQW:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticClass:"card"},[s("div",{staticClass:"card-header"},[t._v("\n            Invoices / View Invoice\n        ")]),t._v(" "),s("div",{staticClass:"card-body"},[t.ifReady?s("div",[0===t.bills.status?s("div",[t._m(0)]):1===t.bills.status?s("div",[t._m(1)]):s("div",[t._m(2)]),t._v(" "),s("fieldset",[s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-6 form-group"},[s("label",[t._v("Quotation")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.roRefNum.amount,expression:"roRefNum.amount"}],staticClass:"form-control",attrs:{type:"text",readonly:""},domProps:{value:t.roRefNum.amount},on:{input:function(e){e.target.composing||t.$set(t.roRefNum,"amount",e.target.value)}}})]),t._v(" "),s("div",{staticClass:"col-md-6 form-group"},[s("label",[t._v("Contact")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.contacts.person,expression:"contacts.person"}],staticClass:"form-control",attrs:{type:"text",readonly:""},domProps:{value:t.contacts.person},on:{input:function(e){e.target.composing||t.$set(t.contacts,"person",e.target.value)}}})]),t._v(" "),s("div",{staticClass:"col-md-6 form-group"},[s("label",[t._v("Reference #")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.bills.reference_number,expression:"bills.reference_number"}],staticClass:"form-control",attrs:{type:"text",readonly:""},domProps:{value:t.bills.reference_number},on:{input:function(e){e.target.composing||t.$set(t.bills,"reference_number",e.target.value)}}})]),t._v(" "),s("div",{staticClass:"col-md-6 form-group"},[s("label",[t._v("Amount")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.bills.amount,expression:"bills.amount"}],staticClass:"form-control",attrs:{type:"number",readonly:""},domProps:{value:t.bills.amount},on:{input:function(e){e.target.composing||t.$set(t.bills,"amount",e.target.value)}}})]),t._v(" "),s("div",{staticClass:"col-md-6 form-group"},[s("label",[t._v("Amount Paid")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.bills.amount_paid,expression:"bills.amount_paid"}],staticClass:"form-control",attrs:{type:"number",readonly:""},domProps:{value:t.bills.amount_paid},on:{input:function(e){e.target.composing||t.$set(t.bills,"amount_paid",e.target.value)}}})]),t._v(" "),s("div",{staticClass:"col-md-6 form-group"},[s("label",[t._v("Due Date")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.bills.due_date,expression:"bills.due_date"}],staticClass:"form-control",attrs:{type:"date",readonly:""},domProps:{value:t.bills.due_date},on:{input:function(e){e.target.composing||t.$set(t.bills,"due_date",e.target.value)}}})])])]),t._v(" "),s("br"),t._v(" "),s("h5",[t._v("\n                    Invoice Item Details\n                ")]),t._v(" "),s("br"),t._v(" "),s("table",{staticClass:"table table-hover table-sm"},[t._m(3),t._v(" "),s("tbody",[t._l(t.billsItems,function(e,a){return s("tr",{key:e.id},[s("td",[t._v(t._s(e.item.name))]),t._v(" "),s("td",[t._v(t._s(e.item.description))]),t._v(" "),s("td",[t._v(t._s(e.quantity))]),t._v(" "),s("td",[t._v(t._s(e.unit_of_measurement.name))]),t._v(" "),s("td",[t._v(t._s(e.price))]),t._v(" "),s("td",[t._v(t._s(t.subtotalRow[a]))])])}),t._v(" "),s("tr",[s("td"),t._v(" "),s("td"),t._v(" "),s("td"),t._v(" "),s("td"),t._v(" "),t._m(4),t._v(" "),s("td",[t._v(t._s(t.total))]),t._v(" "),s("td")])],2)]),t._v(" "),s("button",{staticClass:"btn btn-info btn-sm",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.viewBills(e)}}},[t._v("Back")])]):s("div",[t._m(5)])])]),t._v(" "),s("br")])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("h5",[this._v("\n                        Invoice Details\n                        "),e("span",{staticClass:"badge badge-info"},[this._v("Issued")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h5",[this._v("\n                        Invoice Details\n                        "),e("span",{staticClass:"badge badge-primary"},[this._v("Partially Paid")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h5",[this._v("\n                        Invoice Details\n                        "),e("span",{staticClass:"badge badge-success"},[this._v("Fully Paid")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("thead",[s("tr",[s("th",{attrs:{scope:"col"}},[t._v("Name")]),t._v(" "),s("th",{attrs:{scope:"col"}},[t._v("Description")]),t._v(" "),s("th",{attrs:{scope:"col"}},[t._v("Received Qty")]),t._v(" "),s("th",{attrs:{scope:"col"}},[t._v("UOM")]),t._v(" "),s("th",{attrs:{scope:"col"}},[t._v("Unit Price")]),t._v(" "),s("th",{attrs:{scope:"col"}},[t._v("Amount")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("td",[e("b",[this._v("Total")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"progress"},[e("div",{staticClass:"progress-bar progress-bar-striped progress-bar-animated",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})])}]}},gGke:function(t,e,s){var a=s("VU/8")(s("5dBh"),s("CvQW"),!1,null,null,null);t.exports=a.exports}});
//# sourceMappingURL=84.js.map