webpackJsonp([48],{"8d9z":function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"card"},[i("div",{staticClass:"card-header"},[e._v("\n        Item Price Lists / Create New Item Price List\n    ")]),e._v(" "),i("div",{staticClass:"card-body"},[e.ifReady?i("div",[i("form",{on:{submit:function(t){return t.preventDefault(),e.createNewItemPricelist(t)}}},[i("div",{staticClass:"form-group"},[i("label",[e._v("Item")]),e._v(" "),i("vue-select",{attrs:{label:"name",options:e.items},on:{input:function(t){e.selectItem()}},model:{value:e.item,callback:function(t){e.item=t},expression:"item"}})],1),e._v(" "),i("div",{staticClass:"form-group"},[i("label",{attrs:{for:"name"}},[e._v("Price")]),e._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:e.price,expression:"price"}],staticClass:"form-control",attrs:{type:"number",autocomplete:"off",minlength:"2",maxlength:"255",step:".01",placeholder:"0.00",required:""},domProps:{value:e.price},on:{input:function(t){t.target.composing||(e.price=t.target.value)}}})]),e._v(" "),i("button",{staticClass:"btn btn-success btn-sm",attrs:{type:"submit"}},[e._v("Create New Item Price List")])])]):i("div",[e._m(0)])])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"progress"},[t("div",{staticClass:"progress-bar progress-bar-striped progress-bar-animated",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})])}]}},Lmeb:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{ifReady:!1,items:[],item:null,item_id:"",price:""}},mounted:function(){var e=this;new Promise(function(t,i){axios.get("/api/items/get-all-items/").then(function(i){e.items=i.data.items,t()}).catch(function(e){console.log(e),i()})}).then(function(){e.ifReady=!0})},methods:{selectItem:function(){this.item_id=this.item.id,console.log("item_id: "+this.item_id)},createNewItemPricelist:function(){var e=this;this.ifReady=!1,axios.post("/api/item-pricelists",this.$data).then(function(t){e.$router.push({name:"item-pricelists.index"})}).catch(function(t){e.ifReady=!0,console.log(t)})}}}},lJrd:function(e,t,i){var s=i("VU/8")(i("Lmeb"),i("8d9z"),!1,null,null,null);e.exports=s.exports}});
//# sourceMappingURL=48.js.map