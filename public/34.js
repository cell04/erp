webpackJsonp([34],{CTLf:function(t,e,i){var s=i("VU/8")(i("tB1e"),i("VMXY"),!1,null,null,null);t.exports=s.exports},VMXY:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticClass:"card"},[i("div",{staticClass:"card-header"},[t._v("\n            Item Pricelists / View Item Pricelist\n        ")]),t._v(" "),i("div",{staticClass:"card-body"},[t.ifReady?i("div",[i("fieldset",{attrs:{disabled:""}},[i("div",{staticClass:"form-group"},[i("label",{attrs:{for:"name"}},[t._v("Item")]),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.itemId.name,expression:"itemId.name"}],staticClass:"form-control",attrs:{type:"text",autocomplete:"off",minlength:"2",maxlength:"255",required:""},domProps:{value:t.itemId.name},on:{input:function(e){e.target.composing||t.$set(t.itemId,"name",e.target.value)}}})]),t._v(" "),i("div",{staticClass:"form-group"},[i("label",{attrs:{for:"name"}},[t._v("Price")]),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.itemPricelist.price,expression:"itemPricelist.price"}],staticClass:"form-control",attrs:{type:"text",autocomplete:"off",minlength:"2",maxlength:"255",required:""},domProps:{value:t.itemPricelist.price},on:{input:function(e){e.target.composing||t.$set(t.itemPricelist,"price",e.target.value)}}})])]),t._v(" "),i("button",{staticClass:"btn btn-outline-primary btn-sm",attrs:{type:"button"},on:{click:function(e){return"button"in e||!t._k(e.keyCode,"default",void 0,e.key,void 0)?(e.preventDefault(),t.viewItemPricelists(e)):null}}},[t._v("Back")]),t._v(" "),i("button",{staticClass:"btn btn-primary btn-sm",attrs:{type:"button"},on:{click:function(e){return"button"in e||!t._k(e.keyCode,"default",void 0,e.key,void 0)?(e.preventDefault(),t.editItemPricelists(e)):null}}},[t._v("Edit Item Class")]),t._v(" "),i("button",{staticClass:"btn btn-danger btn-sm",attrs:{type:"button"},on:{click:function(e){return"button"in e||!t._k(e.keyCode,"default",void 0,e.key,void 0)?(e.preventDefault(),t.openDeleteItemPricelistsModal(e)):null}}},[t._v("Delete Item Class")])]):i("div",[t._m(0)])])]),t._v(" "),i("div",{staticClass:"modal fade",attrs:{id:"deleteItemPricelistsModal",tabindex:"-1",role:"dialog","aria-labelledby":"deleteItemPricelistsTitle","aria-hidden":"true"}},[i("div",{staticClass:"modal-dialog modal-dialog-centered",attrs:{role:"document"}},[i("div",{staticClass:"modal-content"},[t._m(1),t._v(" "),i("div",{staticClass:"modal-body"},[t._v("\n                    Are you sure you want to delete this Item "),i("b",[i("u",[t._v(t._s(t.itemId.name)+" - "+t._s(t.itemPricelist.price)+" ")])]),t._v("?\n                ")]),t._v(" "),i("div",{staticClass:"modal-footer"},[i("button",{staticClass:"btn btn-danger btn-sm",attrs:{type:"button"},on:{click:function(e){return"button"in e||!t._k(e.keyCode,"default",void 0,e.key,void 0)?(e.preventDefault(),t.deleteItemPricelists(e)):null}}},[t._v("Confirm Delete")]),t._v(" "),i("button",{staticClass:"btn btn-secondary btn-sm",attrs:{type:"button","data-dismiss":"modal"}},[t._v("Close")])])])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"progress"},[e("div",{staticClass:"progress-bar progress-bar-striped progress-bar-animated",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"modal-header"},[e("h5",{staticClass:"modal-title",attrs:{id:"exampleModalLongTitle"}},[this._v("You're about to delete this Item Price?")]),this._v(" "),e("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[e("span",{attrs:{"aria-hidden":"true"}},[this._v("×")])])])}]}},tB1e:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{ifReady:!1,itemId:"",itemPricelist:""}},mounted:function(){var t=this;new Promise(function(e,i){axios.get("/api/item-pricelists/"+t.$route.params.id).then(function(i){var s=i.data.itemPricelist.item_id;new Promise(function(e,a){axios.get("/api/items/"+s).then(function(e){t.itemPricelist=i.data.itemPricelist,t.itemId=e.data.item})});e()})}).then(function(){t.ifReady=!0})},methods:{viewItemPricelists:function(){this.$router.push({name:"item-pricelists.index"})},editItemPricelists:function(){this.$router.push({name:"item-pricelists.edit",params:{id:this.itemPricelist.id}})},openDeleteItemPricelistsModal:function(){$("#deleteItemPricelistsModal").modal("show")},deleteItemPricelists:function(){var t=this;axios.delete("/api/item-pricelists/"+this.$route.params.id).then(function(e){t.$router.push({name:"item-pricelists.index"}),$("#deleteItemPricelistsModal").modal("hide")}).catch(function(t){console.log(t)})}}}}});
//# sourceMappingURL=34.js.map