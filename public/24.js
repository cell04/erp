webpackJsonp([24],{"6IGs":function(e,t,s){var a=s("VU/8")(s("hdcC"),s("CGac"),!1,null,null,null);e.exports=a.exports},CGac:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("div",{staticClass:"card"},[s("div",{staticClass:"card-header"},[e._v("\n            Stock Receives / View Stock Receive\n        ")]),e._v(" "),s("div",{staticClass:"card-body"},[e.ifReady?s("div",[s("fieldset",[s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-6 form-group"},[s("label",[e._v("Stock Transfer")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.stTransfer.number,expression:"stTransfer.number"}],staticClass:"form-control",attrs:{type:"text",readonly:""},domProps:{value:e.stTransfer.number},on:{input:function(t){t.target.composing||e.$set(e.stTransfer,"number",t.target.value)}}})]),e._v(" "),s("div",{staticClass:"col-md-6 form-group"},[s("label",[e._v("Number")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.stockReceives.number,expression:"stockReceives.number"}],staticClass:"form-control",attrs:{type:"text",readonly:""},domProps:{value:e.stockReceives.number},on:{input:function(t){t.target.composing||e.$set(e.stockReceives,"number",t.target.value)}}})]),e._v(" "),s("div",{staticClass:"col-md-6 form-group"},[s("label",[e._v("Received From")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.stFrom.name,expression:"stFrom.name"}],staticClass:"form-control",attrs:{type:"text",readonly:""},domProps:{value:e.stFrom.name},on:{input:function(t){t.target.composing||e.$set(e.stFrom,"name",t.target.value)}}})]),e._v(" "),s("div",{staticClass:"col-md-6 form-group"},[s("label",[e._v("Received To")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.stTo.name,expression:"stTo.name"}],staticClass:"form-control",attrs:{type:"text",readonly:""},domProps:{value:e.stTo.name},on:{input:function(t){t.target.composing||e.$set(e.stTo,"name",t.target.value)}}})])])]),e._v(" "),s("br"),e._v(" "),s("table",{staticClass:"table table-hover table-sm"},[e._m(0),e._v(" "),s("tbody",e._l(e.stockReceiveItems,function(t){return s("tr",{key:t.id},[s("td",[e._v(e._s(t.item.name))]),e._v(" "),s("td",[e._v(e._s(t.item.description))]),e._v(" "),s("td",[e._v(e._s(t.quantity))]),e._v(" "),s("td",[e._v(e._s(t.unit_of_measurement.name))])])}))]),e._v(" "),s("br"),e._v(" "),s("button",{staticClass:"btn btn-outline-success btn-sm",attrs:{type:"button"},on:{click:function(t){return t.preventDefault(),e.viewSRec(t)}}},[s("i",{staticClass:"fas fa-chevron-left"}),e._v(" Back")])]):s("div",[e._m(1)])])]),e._v(" "),s("br")])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("thead",[t("tr",[t("th",{attrs:{scope:"col"}},[this._v("Name")]),this._v(" "),t("th",{attrs:{scope:"col"}},[this._v("Description")]),this._v(" "),t("th",{attrs:{scope:"col"}},[this._v("Received Qty")]),this._v(" "),t("th",{attrs:{scope:"col"}},[this._v("UOM")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"progress"},[t("div",{staticClass:"progress-bar progress-bar-striped progress-bar-animated",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})])}]}},hdcC:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{ifReady:!1,stockReceives:[],stFrom:[],stTo:[],stUser:[],stTransfer:[],stockReceiveItems:[]}},mounted:function(){this.getItem()},methods:{getItem:function(){var e=this;new Promise(function(t,s){axios.get("/api/stock-receives/"+e.$route.params.id).then(function(s){e.ifReady=!0,e.stockReceives=s.data.stockReceive,e.stTransfer=s.data.stockReceive.stock_transfer,e.stFrom=s.data.stockReceive.stock_receivable_from,e.stTo=s.data.stockReceive.stock_receivable_to,e.stUser=s.data.stockReceive.user,e.stockReceiveItems=s.data.stockReceive.stock_receive_items,s.data.response&&t()})})},viewSRec:function(){this.$router.push({name:"stock-receives.index"})}}}}});
//# sourceMappingURL=24.js.map