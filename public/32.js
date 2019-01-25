webpackJsonp([32],{"+yGI":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{componentVal:"Stock Request",ifReady:!1,stock_request:"",stock_request_items:[]}},mounted:function(){this.getStockRequest()},methods:{getStockRequest:function(){var t=this;new Promise(function(e,s){axios.get("/api/stock-requests/"+t.$route.params.id).then(function(s){t.ifReady=!0,t.stock_request=s.data.stockRequest,t.stock_request_items=s.data.stockRequest.stock_request_items,s.data.response&&e()})})},viewStockRequests:function(){this.$router.push({name:"stock-requests.index"})}}}},YIoN:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticClass:"card"},[s("div",{staticClass:"card-header"},[t._v("\n            "+t._s(t.componentVal)+"s / Edit "+t._s(t.componentVal)+"\n        ")]),t._v(" "),s("div",{staticClass:"card-body"},[t.ifReady?s("div",[s("fieldset",[s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-6"},[s("div",{staticClass:"form-group"},[s("label",[t._v("Requested From")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.stock_request.stock_requestable_from.name,expression:"stock_request.stock_requestable_from.name"}],staticClass:"form-control",attrs:{type:"text",readonly:""},domProps:{value:t.stock_request.stock_requestable_from.name},on:{input:function(e){e.target.composing||t.$set(t.stock_request.stock_requestable_from,"name",e.target.value)}}})])]),t._v(" "),s("div",{staticClass:"col-md-6"},[s("div",{staticClass:"form-group"},[s("label",[t._v("Requested To")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.stock_request.stock_requestable_to.name,expression:"stock_request.stock_requestable_to.name"}],staticClass:"form-control",attrs:{type:"text",readonly:""},domProps:{value:t.stock_request.stock_requestable_to.name},on:{input:function(e){e.target.composing||t.$set(t.stock_request.stock_requestable_to,"name",e.target.value)}}})])])]),t._v(" "),s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-6"},[s("div",{staticClass:"form-group"},[s("label",[t._v("Status")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:0===t.stock_request.status?"pending":1===t.stock_request.status?"approved":"cancelled",expression:"stock_request.status === 0 ? 'pending' \n                                    : stock_request.status === 1 ? 'approved' : 'cancelled'"}],staticClass:"form-control",attrs:{type:"text",id:"name",readonly:""},domProps:{value:0===t.stock_request.status?"pending":1===t.stock_request.status?"approved":"cancelled"},on:{input:function(e){e.target.composing||t.$set(0===t.stock_request.status?"pending":t.stock_request,"status === 1 ? 'approved' : 'cancelled'",e.target.value)}}})])]),t._v(" "),s("div",{staticClass:"col-md-6"},[s("div",{staticClass:"form-group"},[s("label",[t._v("Created By")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.stock_request.user.name,expression:"stock_request.user.name"}],staticClass:"form-control",attrs:{type:"text",id:"name",readonly:""},domProps:{value:t.stock_request.user.name},on:{input:function(e){e.target.composing||t.$set(t.stock_request.user,"name",e.target.value)}}})])])])]),t._v(" "),s("br"),t._v(" "),s("table",{staticClass:"table table-hover table-sm"},[t._m(0),t._v(" "),s("tbody",t._l(t.stock_request_items,function(e){return s("tr",{key:e.id},[s("td",[t._v(t._s(e.item.stock_keeping_unit))]),t._v(" "),s("td",[t._v(t._s(e.item.name))]),t._v(" "),s("td",[t._v(t._s(e.quantity))]),t._v(" "),s("td",[t._v(t._s(e.item.default_unit_of_measurement.name))])])}),0)]),t._v(" "),s("br"),t._v(" "),s("br"),t._v(" "),s("button",{staticClass:"btn btn-info btn-sm",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.viewStockRequests(e)}}},[t._v("Back")])]):s("div",[t._m(1)])])]),t._v(" "),s("br")])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("thead",[e("tr",[e("th",{attrs:{scope:"col"}},[this._v("SKU")]),this._v(" "),e("th",{attrs:{scope:"col"}},[this._v("Name")]),this._v(" "),e("th",{attrs:{scope:"col"}},[this._v("Quantity")]),this._v(" "),e("th",{attrs:{scope:"col"}},[this._v("UOM")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"progress"},[e("div",{staticClass:"progress-bar progress-bar-striped progress-bar-animated",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})])}]}},j1F6:function(t,e,s){var a=s("VU/8")(s("+yGI"),s("YIoN"),!1,null,null,null);t.exports=a.exports}});
//# sourceMappingURL=32.js.map