webpackJsonp([62],{pVPD:function(t,e,i){var s=i("VU/8")(i("vf0o"),i("sMCV"),!1,null,null,null);t.exports=s.exports},sMCV:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{class:this.$store.state.showSidebar?"content-title":"spacer content-title"},[i("h4",{staticClass:"module-title"},[t._v("ITEM PRICE LIST")]),t._v(" "),i("hr",{staticClass:"title-border"})]),t._v(" "),i("div",{staticClass:"p-md-4"},[i("div",{staticClass:"card"},[i("div",{staticClass:"card-header"},[i("a",{staticClass:"text-success",attrs:{href:""},on:{click:function(e){return e.preventDefault(),t.viewItemPricelists(e)}}},[t._v("Item Price Lists")]),t._v(" "),i("a",{staticClass:"text-secondary"},[t._v(" / Edit Item Price List")])]),t._v(" "),i("div",{staticClass:"card-body"},[t.ifReady?i("div",[i("form",{on:{submit:function(e){return e.preventDefault(),t.editItemClassification(e)}}},[i("div",{staticClass:"form-group"},[i("label",{attrs:{for:"name"}},[t._v("Item")]),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.item.name,expression:"item.name"}],staticClass:"form-control",attrs:{type:"text",autocomplete:"off",minlength:"2",maxlength:"255",required:"",readonly:""},domProps:{value:t.item.name},on:{input:function(e){e.target.composing||t.$set(t.item,"name",e.target.value)}}})]),t._v(" "),i("div",{staticClass:"form-group"},[i("label",{attrs:{for:"name"}},[t._v("Price")]),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.price,expression:"price"}],staticClass:"form-control",attrs:{type:"text",autocomplete:"off",minlength:"2",maxlength:"255",required:""},domProps:{value:t.price},on:{input:function(e){e.target.composing||(t.price=e.target.value)}}})]),t._v(" "),i("br"),t._v(" "),i("button",{staticClass:"btn btn-outline-success btn-sm",attrs:{type:"button"},on:{click:function(e){return"button"in e||!t._k(e.keyCode,"default",void 0,e.key,void 0)?(e.preventDefault(),t.viewItemPricelists(e)):null}}},[i("i",{staticClass:"fas fa-chevron-left"}),t._v("Back")]),t._v(" "),i("button",{staticClass:"btn btn-success btn-sm",attrs:{type:"button"},on:{click:function(e){return"button"in e||!t._k(e.keyCode,"default",void 0,e.key,void 0)?(e.preventDefault(),t.updateItemPricelist(e)):null}}},[i("i",{staticClass:"fas fa-edit"}),t._v(" Update Item Price List")])])]):i("div",[t._m(0)])])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"progress"},[e("div",{staticClass:"progress-bar progress-bar-striped progress-bar-animated",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})])}]}},vf0o:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{ifReady:!1,item:"",id:"",item_id:"",price:"",status:1}},mounted:function(){var t=this;new Promise(function(e,i){axios.get("/api/item-pricelists/"+t.$route.params.id).then(function(i){t.id=i.data.itemPricelist.id,t.price=i.data.itemPricelist.price,t.item_id=i.data.itemPricelist.item.id,t.item=i.data.itemPricelist.item,e()}).catch(function(t){console.log(t),alert("Error"),i()})}).then(function(){t.ifReady=!0})},methods:{viewItemPricelists:function(){this.$router.push({name:"item-pricelists.index"})},updateItemPricelist:function(){var t=this;this.ifReady=!1,axios.patch("/api/item-pricelists/"+this.$route.params.id,this.$data).then(function(e){t.$router.push({name:"item-pricelists.view",params:{id:t.$route.params.id}})}).catch(function(e){t.ifReady=!0,console.log(e)})}}}}});
//# sourceMappingURL=62.js.map