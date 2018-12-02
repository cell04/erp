webpackJsonp([30],{"+Nmm":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{ifReady:!1,stockRequest:"",stockRequestItems:[]}},mounted:function(){var t=this;new Promise(function(e,s){axios.get("/api/stock-requests/"+t.$route.params.id).then(function(s){t.stockRequest=s.data.stockRequest;t.stockRequest.statusName={0:"Pending",1:"Approved",2:"Cancelled"}[t.stockRequest.status],t.stockRequestItems=s.data.stockRequest.stock_request_items,e()}).catch(function(e){console.log(e),alert("Please report to the devs"),s(),t.ifReady=!0})}).then(function(){t.ifReady=!0})},methods:{viewStockRequests:function(){this.$router.push({name:"stock-requests.index"})},editStockRequest:function(){this.$router.push({name:"stock-requests.edit",params:{id:this.stockRequest.id}})},openDeleteStockRequestModal:function(){$("#deleteStockRequestModal").modal("show")},deleteStockRequest:function(){var t=this;$("#deleteStockRequestModal").modal("hide"),axios.delete("/api/stock-requests/"+this.$route.params.id).then(function(e){t.$router.push({name:"stock-requests.index"})}).catch(function(t){alert("Error!"),console.log(t)})},openApproveStockRequestModal:function(){$("#approveStockRequestModal").modal("show")},approveStockRequest:function(){var t=this;this.ifReady=!1,$("#approveStockRequestModal").modal("hide"),axios.post("/api/stock-requests/"+this.$route.params.id+"/approve").then(function(e){t.stockRequest.approve_by=JSON.parse(localStorage.getItem("user")),t.stockRequest.statusName="Approved",t.stockRequest.status=1,t.ifReady=!0}).catch(function(t){console.log(t),alert("Error! Can't can't approve stock request")})},openCancelStockRequestModal:function(){$("#cancelStockRequestModal").modal("show")},cancelStockRequest:function(){var t=this;this.ifReady=!1,$("#cancelStockRequestModal").modal("hide"),axios.post("/api/stock-requests/"+this.$route.params.id+"/cancel").then(function(e){t.stockRequest.statusName="Cancelled",t.stockRequest.status=2,t.ifReady=!0}).catch(function(t){console.log(t),alert("Error! Can't can't cancel stock request")})}}}},FzGN:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[t._m(0),t._v(" "),s("div",{staticClass:"p-md-4"},[s("div",{staticClass:"card"},[s("div",{staticClass:"card-header"},[s("a",{staticClass:"text-success",attrs:{href:""},on:{click:function(e){return e.preventDefault(),t.viewStockRequests(e)}}},[t._v("Stock Requests")]),t._v(" "),s("a",{staticClass:"text-secondary"},[t._v(" / View Stock Request")])]),t._v(" "),s("div",{staticClass:"card-body"},[t.ifReady?s("div",[0===t.stockRequest.status?s("div",[t._m(1)]):1===t.stockRequest.status?s("div",[t._m(2)]):s("div",[t._m(3)]),t._v(" "),s("fieldset",[s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-6"},[s("div",{staticClass:"form-group"},[s("label",[t._v("Stock Request #")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.stockRequest.number,expression:"stockRequest.number"}],staticClass:"form-control",attrs:{type:"text",readonly:""},domProps:{value:t.stockRequest.number},on:{input:function(e){e.target.composing||t.$set(t.stockRequest,"number",e.target.value)}}})])]),t._v(" "),s("div",{staticClass:"col-md-6"},[s("div",{staticClass:"form-group"},[s("label",[t._v("Created By")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.stockRequest.user.name,expression:"stockRequest.user.name"}],staticClass:"form-control",attrs:{type:"text",id:"name",readonly:""},domProps:{value:t.stockRequest.user.name},on:{input:function(e){e.target.composing||t.$set(t.stockRequest.user,"name",e.target.value)}}})])]),t._v(" "),s("div",{staticClass:"col-md-6"},[s("div",{staticClass:"form-group"},[s("label",[t._v("Requested From")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.stockRequest.stock_requestable_from.name,expression:"stockRequest.stock_requestable_from.name"}],staticClass:"form-control",attrs:{type:"text",readonly:""},domProps:{value:t.stockRequest.stock_requestable_from.name},on:{input:function(e){e.target.composing||t.$set(t.stockRequest.stock_requestable_from,"name",e.target.value)}}})])]),t._v(" "),s("div",{staticClass:"col-md-6"},[s("div",{staticClass:"form-group"},[s("label",[t._v("Requested To")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.stockRequest.stock_requestable_to.name,expression:"stockRequest.stock_requestable_to.name"}],staticClass:"form-control",attrs:{type:"text",readonly:""},domProps:{value:t.stockRequest.stock_requestable_to.name},on:{input:function(e){e.target.composing||t.$set(t.stockRequest.stock_requestable_to,"name",e.target.value)}}})])]),t._v(" "),1===t.stockRequest.status?s("div",{staticClass:"col-md-6"},[s("div",{staticClass:"form-group"},[s("label",[t._v("Approved By")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.stockRequest.approve_by.name,expression:"stockRequest.approve_by.name"}],staticClass:"form-control",attrs:{type:"text",id:"name",readonly:""},domProps:{value:t.stockRequest.approve_by.name},on:{input:function(e){e.target.composing||t.$set(t.stockRequest.approve_by,"name",e.target.value)}}})])]):t._e(),t._v(" "),1===t.stockRequest.status?s("div",{staticClass:"col-md-6"},[s("div",{staticClass:"form-group"},[s("label",[t._v("Approved Date")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.stockRequest.updated_at,expression:"stockRequest.updated_at"}],staticClass:"form-control",attrs:{type:"text",readonly:""},domProps:{value:t.stockRequest.updated_at},on:{input:function(e){e.target.composing||t.$set(t.stockRequest,"updated_at",e.target.value)}}})])]):t._e()])]),t._v(" "),s("br"),t._v(" "),t._m(4),t._v(" "),s("br"),t._v(" "),s("table",{staticClass:"table table-hover table-sm"},[t._m(5),t._v(" "),s("tbody",t._l(t.stockRequestItems,function(e,a){return s("tr",{key:a},[s("td",[t._v(t._s(e.item.stock_keeping_unit))]),t._v(" "),s("td",[t._v(t._s(e.item.name))]),t._v(" "),s("td",[t._v(t._s(e.quantity))]),t._v(" "),s("td",[t._v(t._s(e.item.default_unit_of_measurement.name))])])}))]),t._v(" "),s("br"),t._v(" "),s("br"),t._v(" "),s("div",{staticClass:"clearfix"},[s("div",{staticClass:"float-left"},[s("button",{staticClass:"btn btn-outline-success btn-sm",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.viewStockRequests(e)}}},[s("i",{staticClass:"fas fa-chevron-left"}),t._v(" Back")]),t._v(" "),s("button",{staticClass:"btn btn-danger btn-sm",attrs:{type:"button"},on:{click:function(e){return"button"in e||!t._k(e.keyCode,"default",void 0,e.key,void 0)?(e.preventDefault(),t.openDeleteStockRequestModal(e)):null}}},[s("i",{staticClass:"fas fa-trash-alt"}),t._v(" Delete")])]),t._v(" "),s("div",{staticClass:"float-right"},[0===t.stockRequest.status?s("button",{staticClass:"btn btn-success btn-sm",on:{click:function(e){return"button"in e||!t._k(e.keyCode,"default",void 0,e.key,void 0)?(e.preventDefault(),t.openApproveStockRequestModal(e)):null}}},[s("i",{staticClass:"fas fa-thumbs-up"}),t._v(" Approve")]):t._e(),t._v(" "),0===t.stockRequest.status?s("button",{staticClass:"btn btn-danger btn-sm",on:{click:function(e){return"button"in e||!t._k(e.keyCode,"default",void 0,e.key,void 0)?(e.preventDefault(),t.openCancelStockRequestModal(e)):null}}},[s("i",{staticClass:"fas fa-thumbs-down"}),t._v(" Cancel")]):t._e()])])]):s("div",[t._m(6)])])]),t._v(" "),s("div",{staticClass:"modal fade",attrs:{id:"deleteStockRequestModal",tabindex:"-1",role:"dialog","aria-labelledby":"deleteStockRequestTitle","aria-hidden":"true"}},[s("div",{staticClass:"modal-dialog modal-dialog-centered",attrs:{role:"document"}},[s("div",{staticClass:"modal-content"},[t._m(7),t._v(" "),t._m(8),t._v(" "),s("div",{staticClass:"modal-footer"},[s("button",{staticClass:"btn btn-danger btn-sm",attrs:{type:"button"},on:{click:function(e){return"button"in e||!t._k(e.keyCode,"default",void 0,e.key,void 0)?(e.preventDefault(),t.deleteStockRequest(e)):null}}},[t._v("Confirm Delete")]),t._v(" "),s("button",{staticClass:"btn btn-secondary btn-sm",attrs:{type:"button","data-dismiss":"modal"}},[t._v("Close")])])])])]),t._v(" "),s("div",{staticClass:"modal fade",attrs:{id:"approveStockRequestModal",tabindex:"-1",role:"dialog","aria-labelledby":"approveStockRequestTitle","aria-hidden":"true"}},[s("div",{staticClass:"modal-dialog modal-dialog-centered",attrs:{role:"document"}},[s("div",{staticClass:"modal-content"},[t._m(9),t._v(" "),t._m(10),t._v(" "),s("div",{staticClass:"modal-footer"},[s("button",{staticClass:"btn btn-success btn-sm",attrs:{type:"button"},on:{click:function(e){return"button"in e||!t._k(e.keyCode,"default",void 0,e.key,void 0)?(e.preventDefault(),t.approveStockRequest(e)):null}}},[t._v("Confirm Approve")]),t._v(" "),s("button",{staticClass:"btn btn-secondary btn-sm",attrs:{type:"button","data-dismiss":"modal"}},[t._v("Close")])])])])]),t._v(" "),s("div",{staticClass:"modal fade",attrs:{id:"cancelStockRequestModal",tabindex:"-1",role:"dialog","aria-labelledby":"cancelStockRequestTitle","aria-hidden":"true"}},[s("div",{staticClass:"modal-dialog modal-dialog-centered",attrs:{role:"document"}},[s("div",{staticClass:"modal-content"},[t._m(11),t._v(" "),t._m(12),t._v(" "),s("div",{staticClass:"modal-footer"},[s("button",{staticClass:"btn btn-danger btn-sm",attrs:{type:"button"},on:{click:function(e){return"button"in e||!t._k(e.keyCode,"default",void 0,e.key,void 0)?(e.preventDefault(),t.cancelStockRequest(e)):null}}},[t._v("Confirm Cancel")]),t._v(" "),s("button",{staticClass:"btn btn-secondary btn-sm",attrs:{type:"button","data-dismiss":"modal"}},[t._v("Close")])])])])]),t._v(" "),s("br")])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"content-title"},[e("h4",{staticClass:"module-title"},[this._v("STOCK REQUEST")]),this._v(" "),e("hr",{staticClass:"title-border"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("h5",[this._v("\n                            Stock Request Details\n                            "),e("span",{staticClass:"badge badge-secondary badge-info"},[this._v("Pending")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h5",[this._v("\n                            Stock Request Details\n                            "),e("span",{staticClass:"badge badge-secondary badge-success"},[this._v("Approved")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h5",[this._v("\n                            Stock Request Details\n                            "),e("span",{staticClass:"badge badge-secondary badge-danger"},[this._v("Cancelled")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h6",[e("u",[this._v("Stock Request Items")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("thead",[e("tr",[e("th",{attrs:{scope:"col"}},[this._v("SKU")]),this._v(" "),e("th",{attrs:{scope:"col"}},[this._v("Name")]),this._v(" "),e("th",{attrs:{scope:"col"}},[this._v("Quantity")]),this._v(" "),e("th",{attrs:{scope:"col"}},[this._v("UOM")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"progress"},[e("div",{staticClass:"progress-bar progress-bar-striped progress-bar-animated",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"modal-header"},[e("h5",{staticClass:"modal-title",attrs:{id:"exampleModalLongTitle"}},[this._v("You're about to delete this Stock Request?")]),this._v(" "),e("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[e("span",{attrs:{"aria-hidden":"true"}},[this._v("×")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"modal-body"},[this._v("\n                        Are you sure you want to delete this Stock Request? "),e("br"),e("br")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"modal-header"},[e("h5",{staticClass:"modal-title",attrs:{id:"exampleModalLongTitle"}},[this._v("You're about to approve this Stock Request?")]),this._v(" "),e("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[e("span",{attrs:{"aria-hidden":"true"}},[this._v("×")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"modal-body"},[this._v("\n                        Are you sure you want to approve this Stock Request? "),e("br"),e("br")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"modal-header"},[e("h5",{staticClass:"modal-title",attrs:{id:"exampleModalLongTitle"}},[this._v("You're about to cancel this Stock Request?")]),this._v(" "),e("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[e("span",{attrs:{"aria-hidden":"true"}},[this._v("×")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"modal-body"},[this._v("\n                        Are you sure you want to cancel this Stock Request? "),e("br"),e("br")])}]}},TSLc:function(t,e,s){var a=s("VU/8")(s("+Nmm"),s("FzGN"),!1,null,null,null);t.exports=a.exports}});
//# sourceMappingURL=30.js.map