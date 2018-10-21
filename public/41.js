webpackJsonp([41],{JsjN:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"card"},[a("div",{staticClass:"card-header"},[e._v("\n            Item Classifications / Create New Item Classification\n        ")]),e._v(" "),a("div",{staticClass:"card-body"},[e.ifReady?a("div",[a("form",{on:{submit:function(t){return t.preventDefault(),e.createNewItemClass(t)}}},[a("div",{staticClass:"form-group"},[a("label",[e._v("Item Type")]),e._v(" "),a("vue-select",{attrs:{label:"name",options:e.itemTypesList},on:{input:function(t){e.selectItemType()}},model:{value:e.itemTypeId,callback:function(t){e.itemTypeId=t},expression:"itemTypeId"}})],1),e._v(" "),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"name"}},[e._v("Name")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.name,expression:"name"}],staticClass:"form-control",attrs:{type:"text",autocomplete:"off",minlength:"2",maxlength:"255",required:""},domProps:{value:e.name},on:{input:function(t){t.target.composing||(e.name=t.target.value)}}})]),e._v(" "),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"dname"}},[e._v("Display Name")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.display_name,expression:"display_name"}],staticClass:"form-control",attrs:{type:"text",autocomplete:"off",minlength:"2",maxlength:"255",required:""},domProps:{value:e.display_name},on:{input:function(t){t.target.composing||(e.display_name=t.target.value)}}})]),e._v(" "),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"desc"}},[e._v("Description")]),e._v(" "),a("textarea",{directives:[{name:"model",rawName:"v-model",value:e.description,expression:"description"}],staticClass:"form-control",attrs:{required:""},domProps:{value:e.description},on:{input:function(t){t.target.composing||(e.description=t.target.value)}}})]),e._v(" "),a("button",{staticClass:"btn btn-success btn-sm",attrs:{type:"submit"}},[e._v("Create New Item Class")])])]):a("div",[e._m(0)])])])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"progress"},[t("div",{staticClass:"progress-bar progress-bar-striped progress-bar-animated",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})])}]}},LNBO:function(e,t,a){var s=a("VU/8")(a("TndL"),a("JsjN"),!1,null,null,null);e.exports=s.exports},TndL:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{itemTypesList:[],ifReady:!0,itemTypeId:null,item_type_id:"",name:"",display_name:"",description:"",status:1}},mounted:function(){var e=this;new Promise(function(t,a){axios.get("/api/item-types/get-all-item-types/").then(function(a){e.itemTypesList=a.data.item_types,a.data.response&&t()})})},methods:{selectItemType:function(){this.item_type_id=this.itemTypeId.id,console.log("GetItemTypeId: "+this.item_type_id)},createNewItemClass:function(){var e=this;this.ifReady=!1,axios.post("/api/item-classifications",this.$data).then(function(t){e.$router.push({name:"item-classifications.index"})}).catch(function(t){e.ifReady=!0,console.log(t)})}}}}});
//# sourceMappingURL=41.js.map