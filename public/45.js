webpackJsonp([45],{"9X1m":function(t,a,e){var s=e("VU/8")(e("s7Kx"),e("uVuX"),!1,null,null,null);t.exports=s.exports},s7Kx:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default={data:function(){return{ifReady:!1,quotations:[],contactData:[],total:0}},filters:{Decimal:function(t){if(t)return t.toFixed(2)}},mounted:function(){var t=this;new Promise(function(a,e){axios.get("/api/quotations/"+t.$route.params.id).then(function(e){t.quotations=e.data.quotation,t.contactData=e.data.quotation.contact,t.quotations.quotation_items.map(function(a){a.subTotal=a.quantity*a.price,t.total+=a.subTotal}),a()}).catch(function(t){console.log(t),e()})}).then(function(){t.ifReady=!0})},methods:{viewQuotations:function(){this.$router.push({name:"quotations.index"})},openDeleteQuotationModal:function(){$("#deleteQuotationModal").modal("show")},deleteQuotation:function(){var t=this;$("#deleteQuotationModal").modal("hide"),axios.delete("/api/quotations/"+this.$route.params.id).then(function(a){t.$router.push({name:"quotations.index"})}).catch(function(t){alert("Error!"),console.log(t)})},openCancelQuotationModal:function(){$("#cancelQuotationModal").modal("show")},openCancelQuotation:function(){var t=this;this.ifReady=!1,$("#cancelQuotationModal").modal("hide");axios.patch("/api/quotations/"+this.$route.params.id,{status:2}).then(function(a){t.quotations.status=2,t.ifReady=!0}).catch(function(a){alert("Please report to the devs"),t.ifReady=!0,console.log(a)})},openApproveQuotationModal:function(){$("#approveQuotationModal").modal("show")},openApproveQuotation:function(){var t=this;this.ifReady=!1,$("#approveQuotationModal").modal("hide");axios.patch("/api/quotations/"+this.$route.params.id,{status:1}).then(function(a){t.quotations.status=1,t.ifReady=!0}).catch(function(a){alert("Please report to the devs"),t.ifReady=!0,console.log(a)})}}}},uVuX:function(t,a){t.exports={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("div",{class:this.$store.state.showSidebar?"content-title":"spacer content-title"},[e("h4",{staticClass:"module-title"},[t._v("QUOTATIONS")]),t._v(" "),e("hr",{staticClass:"title-border"})]),t._v(" "),e("div",{staticClass:"p-md-4"},[e("div",{staticClass:"card"},[e("div",{staticClass:"card-header"},[e("a",{staticClass:"text-success",attrs:{href:""},on:{click:function(a){return a.preventDefault(),t.viewQuotations(a)}}},[t._v("Quotations")]),t._v(" "),e("a",{staticClass:"text-secondary"},[t._v(" / View Quotation")])]),t._v(" "),e("div",{staticClass:"card-body"},[t.ifReady?e("div",[0===t.quotations.status?e("div",[t._m(0)]):1===t.quotations.status?e("div",[t._m(1)]):2===t.quotations.status?e("div",[t._m(2)]):3===t.quotations.status?e("div",[t._m(3)]):e("div",[t._m(4)]),t._v(" "),e("fieldset",[e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-6"},[e("div",{staticClass:"form-group"},[e("label",[t._v("Quotation #")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.quotations.number,expression:"quotations.number"}],staticClass:"form-control",attrs:{type:"text",readonly:""},domProps:{value:t.quotations.number},on:{input:function(a){a.target.composing||t.$set(t.quotations,"number",a.target.value)}}})])]),t._v(" "),e("div",{staticClass:"col-md-6"},[e("div",{staticClass:"form-group"},[e("label",[t._v("Stock Origin")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.quotations.quotable.name,expression:"quotations.quotable.name"}],staticClass:"form-control",attrs:{type:"text",readonly:""},domProps:{value:t.quotations.quotable.name},on:{input:function(a){a.target.composing||t.$set(t.quotations.quotable,"name",a.target.value)}}})])])]),t._v(" "),e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-6"},[e("div",{staticClass:"form-group"},[e("label",[t._v("Customer Name")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.quotations.contact.person,expression:"quotations.contact.person"}],staticClass:"form-control",attrs:{type:"text",readonly:""},domProps:{value:t.quotations.contact.person},on:{input:function(a){a.target.composing||t.$set(t.quotations.contact,"person",a.target.value)}}})])]),t._v(" "),e("div",{staticClass:"col-md-3"},[e("div",{staticClass:"form-group"},[e("label",[t._v("Tax")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.quotations.tax,expression:"quotations.tax"}],staticClass:"form-control",attrs:{type:"text",readonly:""},domProps:{value:t.quotations.tax},on:{input:function(a){a.target.composing||t.$set(t.quotations,"tax",a.target.value)}}})])]),t._v(" "),e("div",{staticClass:"col-md-3"},[e("div",{staticClass:"form-group"},[e("label",[t._v("Validity Date")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.quotations.validity_date,expression:"quotations.validity_date"}],staticClass:"form-control",attrs:{type:"text",readonly:""},domProps:{value:t.quotations.validity_date},on:{input:function(a){a.target.composing||t.$set(t.quotations,"validity_date",a.target.value)}}})])]),t._v(" "),e("div",{staticClass:"col-md-12 form-group"},[e("hr"),t._v(" "),t._m(5),t._v(" "),e("div",[t._m(6),t._v(": "+t._s(t.contactData.person))]),t._v(" "),e("div",[t._m(7),t._v(": "+t._s(t.contactData.company))]),t._v(" "),e("div",[t._m(8),t._v(": "+t._s(t.contactData.company_address))]),t._v(" "),e("div",[t._m(9),t._v(": "+t._s(t.contactData.email))]),t._v(" "),e("div",[t._m(10),t._v(": "+t._s(t.contactData.mobile_number))]),t._v(" "),e("hr")])])]),t._v(" "),e("br"),t._v(" "),e("legend",[t._v("Quotation Items")]),t._v(" "),e("table",{staticClass:"table table-hover table-sm"},[t._m(11),t._v(" "),e("tbody",[t._l(t.quotations.quotation_items,function(a,s){return e("tr",{key:s},[e("td",[t._v(t._s(a.item.stock_keeping_unit))]),t._v(" "),e("td",[t._v(t._s(a.item.name))]),t._v(" "),e("td",[t._v(t._s(a.item.description))]),t._v(" "),e("td",[t._v(t._s(a.quantity))]),t._v(" "),e("td",[t._v(t._s(a.unit_of_measurement.name))]),t._v(" "),e("td",[t._v(t._s(a.price))]),t._v(" "),e("td",{attrs:{align:"right"}},[t._v(t._s(t._f("Decimal")(a.subTotal)))])])}),t._v(" "),e("tr",[e("td"),t._v(" "),e("td"),t._v(" "),e("td"),t._v(" "),e("td"),t._v(" "),e("td"),t._v(" "),t._m(12),t._v(" "),e("td",{attrs:{align:"right"}},[e("b",[t._v(t._s(t._f("Decimal")(t.total)))])])])],2)]),t._v(" "),e("br"),e("br"),t._v(" "),e("div",{staticClass:"clearfix"},[e("div",{staticClass:"float-left"},[e("button",{staticClass:"btn btn-outline-success btn-sm",attrs:{type:"button"},on:{click:function(a){return a.preventDefault(),t.viewQuotations(a)}}},[e("i",{staticClass:"fas fa-chevron-left"}),t._v(" Back")]),t._v(" "),0===t.quotations.status?e("button",{staticClass:"btn btn-danger btn-sm",attrs:{type:"button"},on:{click:function(a){return"button"in a||!t._k(a.keyCode,"default",void 0,a.key,void 0)?(a.preventDefault(),t.openDeleteQuotationModal(a)):null}}},[e("i",{staticClass:"fas fa-trash-alt"}),t._v(" Delete")]):t._e()]),t._v(" "),e("div",{staticClass:"float-right"},[0==t.quotations.status?e("button",{staticClass:"btn btn-success btn-sm",on:{click:function(a){return a.preventDefault(),t.openApproveQuotationModal(a)}}},[e("i",{staticClass:"fas fa-thumbs-up"}),t._v(" Approve Quotation")]):t._e(),t._v(" "),0===t.quotations.status?e("button",{staticClass:"btn btn-danger btn-sm",on:{click:function(a){return"button"in a||!t._k(a.keyCode,"default",void 0,a.key,void 0)?(a.preventDefault(),t.openCancelQuotationModal(a)):null}}},[e("i",{staticClass:"fas fa-thumbs-down"}),t._v(" Cancel")]):t._e()])])]):e("div",[t._m(13)])]),t._v(" "),e("div",{staticClass:"modal fade",attrs:{id:"deleteQuotationModal",tabindex:"-1",role:"dialog","aria-labelledby":"deleteQuotationTitle","aria-hidden":"true"}},[e("div",{staticClass:"modal-dialog modal-dialog-centered",attrs:{role:"document"}},[e("div",{staticClass:"modal-content"},[t._m(14),t._v(" "),e("div",{staticClass:"modal-body"},[t._v("\n                            Are you sure you want to delete this "+t._s(t.quotations.number)+"? "),e("br"),e("br")]),t._v(" "),e("div",{staticClass:"modal-footer"},[e("button",{staticClass:"btn btn-secondary btn-sm",attrs:{type:"button","data-dismiss":"modal"}},[t._v("Close")]),t._v(" "),e("button",{staticClass:"btn btn-danger btn-sm",attrs:{type:"button"},on:{click:function(a){return"button"in a||!t._k(a.keyCode,"default",void 0,a.key,void 0)?(a.preventDefault(),t.deleteQuotation(a)):null}}},[t._v("Confirm Delete")])])])])]),t._v(" "),e("div",{staticClass:"modal fade",attrs:{id:"approveQuotationModal",tabindex:"-1",role:"dialog","aria-labelledby":"approveQuotationTitle","aria-hidden":"true"}},[e("div",{staticClass:"modal-dialog modal-dialog-centered",attrs:{role:"document"}},[e("div",{staticClass:"modal-content"},[t._m(15),t._v(" "),e("div",{staticClass:"modal-body"},[t._v("\n                            Are you sure you want to approve this "+t._s(t.quotations.number)+"? "),e("br"),e("br")]),t._v(" "),e("div",{staticClass:"modal-footer"},[e("button",{staticClass:"btn btn-secondary btn-sm",attrs:{type:"button","data-dismiss":"modal"}},[t._v("Close")]),t._v(" "),e("button",{staticClass:"btn btn-success btn-sm",attrs:{type:"button"},on:{click:function(a){return"button"in a||!t._k(a.keyCode,"default",void 0,a.key,void 0)?(a.preventDefault(),t.openApproveQuotation(a)):null}}},[t._v("Confirm Approve")])])])])]),t._v(" "),e("div",{staticClass:"modal fade",attrs:{id:"cancelQuotationModal",tabindex:"-1",role:"dialog","aria-labelledby":"cancelQuotationTitle","aria-hidden":"true"}},[e("div",{staticClass:"modal-dialog modal-dialog-centered",attrs:{role:"document"}},[e("div",{staticClass:"modal-content"},[t._m(16),t._v(" "),e("div",{staticClass:"modal-body"},[t._v("\n                            Are you sure you want to cancel this "+t._s(t.quotations.number)+"? "),e("br"),e("br")]),t._v(" "),e("div",{staticClass:"modal-footer"},[e("button",{staticClass:"btn btn-secondary btn-sm",attrs:{type:"button","data-dismiss":"modal"}},[t._v("Close")]),t._v(" "),e("button",{staticClass:"btn btn-danger btn-sm",attrs:{type:"button"},on:{click:function(a){return"button"in a||!t._k(a.keyCode,"default",void 0,a.key,void 0)?(a.preventDefault(),t.openCancelQuotation(a)):null}}},[t._v("Confirm Cancel")])])])])])])])])},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("h5",[this._v("\n                            Quotation\n                            "),a("span",{staticClass:"badge badge-info"},[this._v("Issued")])])},function(){var t=this.$createElement,a=this._self._c||t;return a("h5",[this._v("\n                            Quotation\n                            "),a("span",{staticClass:"badge badge-primary"},[this._v("Admin Approved")])])},function(){var t=this.$createElement,a=this._self._c||t;return a("h5",[this._v("\n                            Quotation\n                            "),a("span",{staticClass:"badge badge-danger"},[this._v("Admin Cancelled")])])},function(){var t=this.$createElement,a=this._self._c||t;return a("h5",[this._v("\n                            Quotation\n                            "),a("span",{staticClass:"badge badge-danger"},[this._v("Customer Approved")])])},function(){var t=this.$createElement,a=this._self._c||t;return a("h5",[this._v("\n                            Quotation\n                            "),a("span",{staticClass:"badge badge-success"},[this._v("Customer Cancelled")])])},function(){var t=this.$createElement,a=this._self._c||t;return a("h5",[a("u",[this._v("Customer Information:")])])},function(){var t=this.$createElement,a=this._self._c||t;return a("label",{attrs:{for:"name"}},[a("strong",[this._v("Customer")])])},function(){var t=this.$createElement,a=this._self._c||t;return a("label",{attrs:{for:"name"}},[a("strong",[this._v("Company")])])},function(){var t=this.$createElement,a=this._self._c||t;return a("label",{attrs:{for:"name"}},[a("strong",[this._v("Address")])])},function(){var t=this.$createElement,a=this._self._c||t;return a("label",{attrs:{for:"name"}},[a("strong",[this._v("Email")])])},function(){var t=this.$createElement,a=this._self._c||t;return a("label",{attrs:{for:"name"}},[a("strong",[this._v("Phone")])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("thead",[e("tr",[e("th",{attrs:{scope:"col"}},[t._v("SKU")]),t._v(" "),e("th",{attrs:{scope:"col"}},[t._v("Name")]),t._v(" "),e("th",{attrs:{scope:"col"}},[t._v("Desc")]),t._v(" "),e("th",{attrs:{scope:"col"}},[t._v("Qty")]),t._v(" "),e("th",{attrs:{scope:"col"}},[t._v("UoM")]),t._v(" "),e("th",{attrs:{scope:"col"}},[t._v("Price")]),t._v(" "),e("th",{staticClass:"text-right"},[t._v("Sub Total")])])])},function(){var t=this.$createElement,a=this._self._c||t;return a("td",[a("b",[this._v("Total")])])},function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"progress"},[a("div",{staticClass:"progress-bar progress-bar-striped progress-bar-animated",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})])},function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"modal-header"},[a("h5",{staticClass:"modal-title",attrs:{id:"exampleModalLongTitle"}},[this._v("You're about to delete this Quotation?")]),this._v(" "),a("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[a("span",{attrs:{"aria-hidden":"true"}},[this._v("×")])])])},function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"modal-header"},[a("h5",{staticClass:"modal-title",attrs:{id:"exampleModalLongTitle"}},[this._v("You're about to approve this Quotation?")]),this._v(" "),a("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[a("span",{attrs:{"aria-hidden":"true"}},[this._v("×")])])])},function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"modal-header"},[a("h5",{staticClass:"modal-title",attrs:{id:"exampleModalLongTitle"}},[this._v("You're about to cancel this Quotation?")]),this._v(" "),a("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[a("span",{attrs:{"aria-hidden":"true"}},[this._v("×")])])])}]}}});
//# sourceMappingURL=45.js.map