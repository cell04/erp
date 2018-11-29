webpackJsonp([27],{"+H09":function(t,s){t.exports={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[t._m(0),t._v(" "),e("div",{staticClass:"p-md-4"},[e("div",{staticClass:"card"},[e("div",{staticClass:"card-header"},[e("a",{staticClass:"text-success",attrs:{href:""},on:{click:function(s){return s.preventDefault(),t.viewStockTransfers(s)}}},[t._v("Stock Transfers")]),t._v(" "),e("a",{staticClass:"text-secondary"},[t._v(" / View Stock Transfer")])]),t._v(" "),e("div",{staticClass:"card-body"},[t.ifReady?e("div",[0===t.stockTransfer.status?e("div",[t._m(1)]):1===t.stockTransfer.status?e("div",[t._m(2)]):t._e(),t._v(" "),e("fieldset",{attrs:{disabled:""}},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-6"},[e("label",{attrs:{for:"name"}},[t._v("Stock Tranfer #")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.stockTransfer.number,expression:"stockTransfer.number"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.stockTransfer.number},on:{input:function(s){s.target.composing||t.$set(t.stockTransfer,"number",s.target.value)}}})]),t._v(" "),e("div",{staticClass:"col-md-6"},[e("label",{attrs:{for:"name"}},[t._v("Tranfer Date")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.stockTransfer.stock_transfered_date,expression:"stockTransfer.stock_transfered_date"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.stockTransfer.stock_transfered_date},on:{input:function(s){s.target.composing||t.$set(t.stockTransfer,"stock_transfered_date",s.target.value)}}})]),t._v(" "),e("div",{staticClass:"col-md-6"},[e("label",{attrs:{for:"name"}},[t._v("Transfer From")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.stockTransfer.stock_transferable_from.name,expression:"stockTransfer.stock_transferable_from.name"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.stockTransfer.stock_transferable_from.name},on:{input:function(s){s.target.composing||t.$set(t.stockTransfer.stock_transferable_from,"name",s.target.value)}}})]),t._v(" "),e("div",{staticClass:"col-md-6"},[e("label",{attrs:{for:"name"}},[t._v("Transfer To")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.stockTransfer.stock_transferable_to.name,expression:"stockTransfer.stock_transferable_to.name"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.stockTransfer.stock_transferable_to.name},on:{input:function(s){s.target.composing||t.$set(t.stockTransfer.stock_transferable_to,"name",s.target.value)}}})])])]),t._v(" "),e("br"),t._v(" "),t._m(3),t._v(" "),e("br"),t._v(" "),e("table",{staticClass:"table table-hover table-sm"},[t._m(4),t._v(" "),e("tbody",t._l(t.stockTransferItems,function(s){return e("tr",[e("td",[t._v(t._s(s.item.stock_keeping_unit))]),t._v(" "),e("td",[t._v(t._s(s.item.name))]),t._v(" "),e("td",[t._v(t._s(s.quantity))]),t._v(" "),e("td",[t._v(t._s(s.unit_of_measurement.name))])])}))]),t._v(" "),e("br"),e("br"),t._v(" "),e("div",{staticClass:"clearfix"},[e("div",{staticClass:"float-left"},[e("button",{staticClass:"btn btn-outline-success btn-sm",attrs:{type:"button"},on:{click:function(s){return s.preventDefault(),t.viewStockTransfers(s)}}},[e("i",{staticClass:"fas fa-chevron-left"}),t._v(" Back")])]),t._v(" "),e("div",{staticClass:"float-right"},[0===t.stockTransfer.status?e("button",{staticClass:"btn btn-success btn-sm",on:{click:function(s){return"button"in s||!t._k(s.keyCode,"default",void 0,s.key,void 0)?(s.preventDefault(),t.openApproveStockTransferModal(s)):null}}},[e("i",{staticClass:"fas fa-thumbs-up"}),t._v(" Approve")]):t._e()])])]):e("div",[t._m(5)])]),t._v(" "),e("div",{staticClass:"modal fade",attrs:{id:"approveStockTransferModal",tabindex:"-1",role:"dialog","aria-labelledby":"approveStockTransferTitle","aria-hidden":"true"}},[e("div",{staticClass:"modal-dialog modal-dialog-centered",attrs:{role:"document"}},[e("div",{staticClass:"modal-content"},[t._m(6),t._v(" "),t._m(7),t._v(" "),e("div",{staticClass:"modal-footer"},[e("button",{staticClass:"btn btn-success btn-sm",attrs:{type:"button"},on:{click:function(s){return"button"in s||!t._k(s.keyCode,"default",void 0,s.key,void 0)?(s.preventDefault(),t.approveStockTransfer(s)):null}}},[t._v("Confirm Transfer")]),t._v(" "),e("button",{staticClass:"btn btn-secondary btn-sm",attrs:{type:"button","data-dismiss":"modal"}},[t._v("Close")])])])])])])])])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"content-title"},[s("h4",{staticClass:"module-title"},[this._v("STOCK TRANSFER")]),this._v(" "),s("hr",{staticClass:"title-border"})])},function(){var t=this.$createElement,s=this._self._c||t;return s("h5",[this._v("\n                            Stock Transfer Details\n                            "),s("span",{staticClass:"badge badge-secondary badge-info"},[this._v("Transferring")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h5",[this._v("\n                            Stock Transfer Details\n                            "),s("span",{staticClass:"badge badge-secondary badge-success"},[this._v("Transferred")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h6",[s("u",[this._v("Stock Transfer Items")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("thead",[s("tr",[s("th",{attrs:{scope:"col"}},[this._v("Stock Keeping Unit")]),this._v(" "),s("th",{attrs:{scope:"col"}},[this._v("Name")]),this._v(" "),s("th",{attrs:{scope:"col"}},[this._v("Quantity")]),this._v(" "),s("th",{attrs:{scope:"col"}},[this._v("UOM")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"progress"},[s("div",{staticClass:"progress-bar progress-bar-striped progress-bar-animated",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"modal-header"},[s("h5",{staticClass:"modal-title",attrs:{id:"exampleModalLongTitle"}},[this._v("You're about to approve this Stock Transfer?")]),this._v(" "),s("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[s("span",{attrs:{"aria-hidden":"true"}},[this._v("×")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"modal-body"},[this._v("\n                            Are you sure you want to approve this Stock Tranfer? "),s("br"),s("br")])}]}},mxHX:function(t,s,e){var a=e("VU/8")(e("sKcj"),e("+H09"),!1,null,null,null);t.exports=a.exports},sKcj:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0}),s.default={data:function(){return{ifReady:!1,stockTransfer:null,stockTransferItems:[]}},mounted:function(){var t=this;new Promise(function(s,e){axios.get("/api/stock-transfers/"+t.$route.params.id).then(function(e){t.stockTransfer=e.data.stockTransfer,t.stockTransferItems=t.stockTransfer.stock_transfer_items,s()}).catch(function(t){console.log(t),e()})}).then(function(){t.ifReady=!0})},methods:{viewStockTransfers:function(){this.$router.push({name:"stock-transfers.index"})},openApproveStockTransferModal:function(){$("#approveStockTransferModal").modal("show")},approveStockTransfer:function(){var t=this;this.ifReady=!1,$("#approveStockTransferModal").modal("hide"),axios.post("/api/stock-transfers/"+this.stockTransfer.id+"/transferred").then(function(s){t.stockTransfer.status=1,t.ifReady=!0}).catch(function(s){console.log(s),alert("Error! Can't can't cancel stock request"),t.ifReady=!0})}}}}});
//# sourceMappingURL=27.js.map