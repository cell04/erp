webpackJsonp([25],{ULpq:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{ifReady:!1,stocks:[],stockable:[],uom:[],item:[]}},mounted:function(){var t=this;new Promise(function(e,a){axios.get("/api/stocks/"+t.$route.params.id).then(function(a){t.stocks=a.data.stock,t.stockable=a.data.stock.stockable,t.uom=a.data.stock.unit_of_measurement,t.item=a.data.stock.item,e()})}).then(function(){t.ifReady=!0})},methods:{viewStocks:function(){this.$router.push({name:"stocks.index"})}}}},gnEo:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t._m(0),t._v(" "),a("div",{staticClass:"p-md-4"},[a("div",{staticClass:"card"},[a("div",{staticClass:"card-header"},[a("a",{staticClass:"text-success",attrs:{href:""},on:{click:function(e){return e.preventDefault(),t.viewStocks(e)}}},[t._v("Stocks")]),t._v(" "),a("a",{staticClass:"text-secondary"},[t._v(" / View Stock")])]),t._v(" "),a("div",{staticClass:"card-body"},[t.ifReady?a("div",[a("fieldset",{attrs:{disabled:""}},[a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"name"}},[t._v("Stock From")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.stockable.name,expression:"stockable.name"}],staticClass:"form-control",attrs:{type:"text",autocomplete:"off",minlength:"2",maxlength:"255",required:""},domProps:{value:t.stockable.name},on:{input:function(e){e.target.composing||t.$set(t.stockable,"name",e.target.value)}}})]),t._v(" "),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"adress"}},[t._v("Item Name")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.item.name,expression:"item.name"}],staticClass:"form-control",attrs:{type:"text",autocomplete:"off",minlength:"2",maxlength:"255",required:""},domProps:{value:t.item.name},on:{input:function(e){e.target.composing||t.$set(t.item,"name",e.target.value)}}})]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-6 form-group"},[a("label",{attrs:{for:"city"}},[t._v("Quantity")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.stocks.quantity,expression:"stocks.quantity"}],staticClass:"form-control",attrs:{type:"text",autocomplete:"off",minlength:"2",maxlength:"255",required:""},domProps:{value:t.stocks.quantity},on:{input:function(e){e.target.composing||t.$set(t.stocks,"quantity",e.target.value)}}})]),t._v(" "),a("div",{staticClass:"col-md-6 form-group"},[a("label",{attrs:{for:"country"}},[t._v("UOM")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.uom.name,expression:"uom.name"}],staticClass:"form-control",attrs:{type:"text",autocomplete:"off",minlength:"2",maxlength:"255",required:""},domProps:{value:t.uom.name},on:{input:function(e){e.target.composing||t.$set(t.uom,"name",e.target.value)}}})])])]),t._v(" "),a("button",{staticClass:"btn btn-outline-success btn-sm",attrs:{type:"button"},on:{click:function(e){return"button"in e||!t._k(e.keyCode,"default",void 0,e.key,void 0)?(e.preventDefault(),t.viewStocks(e)):null}}},[a("i",{staticClass:"fas fa-chevron-left"}),t._v(" Back")])]):a("div",[t._m(1)])])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"content-title"},[e("h4",{staticClass:"module-title"},[this._v("STOCK")]),this._v(" "),e("hr",{staticClass:"title-border"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"progress"},[e("div",{staticClass:"progress-bar progress-bar-striped progress-bar-animated",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})])}]}},rHnG:function(t,e,a){var s=a("VU/8")(a("ULpq"),a("gnEo"),!1,null,null,null);t.exports=s.exports}});
//# sourceMappingURL=25.js.map