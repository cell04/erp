webpackJsonp([16],{"0xV0":function(e,t,a){var s=a("VU/8")(a("GXGa"),a("NRzt"),!1,null,null,null);e.exports=s.exports},GXGa:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{ifReady:!0,name:"",address:"",city:"",zip_code:"",country:"",telephone_number:"",status:1}},methods:{viewWarehouses:function(){this.$router.push({name:"warehouses.index"})},createNewWarehouse:function(){var e=this;this.ifReady=!1,axios.post("/api/warehouses",this.$data).then(function(t){e.$router.push({name:"warehouses.index"})}).catch(function(t){e.ifReady=!0,console.log(t)})}}}},NRzt:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[e._m(0),e._v(" "),a("div",{staticClass:"p-md-4"},[a("div",{staticClass:"card"},[a("div",{staticClass:"card-header"},[a("a",{staticClass:"text-success",attrs:{href:""},on:{click:function(t){return t.preventDefault(),e.viewWarehouses(t)}}},[e._v("Warehouses")]),e._v(" "),a("a",{staticClass:"text-secondary"},[e._v(" / Create New Warehouse")])]),e._v(" "),a("div",{staticClass:"card-body"},[e.ifReady?a("div",[a("form",{on:{submit:function(t){return t.preventDefault(),e.createNewWarehouse(t)}}},[a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"name"}},[e._v("Name")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.name,expression:"name"}],staticClass:"form-control",attrs:{type:"text",autocomplete:"off",minlength:"2",maxlength:"255",required:""},domProps:{value:e.name},on:{input:function(t){t.target.composing||(e.name=t.target.value)}}})]),e._v(" "),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"address"}},[e._v("Address")]),e._v(" "),a("textarea",{directives:[{name:"model",rawName:"v-model",value:e.address,expression:"address"}],staticClass:"form-control",attrs:{required:""},domProps:{value:e.address},on:{input:function(t){t.target.composing||(e.address=t.target.value)}}})]),e._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-3 form-group"},[a("label",{attrs:{for:"city"}},[e._v("City")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.city,expression:"city"}],staticClass:"form-control",attrs:{type:"text",autocomplete:"off",minlength:"2",maxlength:"255",required:""},domProps:{value:e.city},on:{input:function(t){t.target.composing||(e.city=t.target.value)}}})]),e._v(" "),a("div",{staticClass:"col-md-3 form-group"},[a("label",{attrs:{for:"country"}},[e._v("Country")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.country,expression:"country"}],staticClass:"form-control",attrs:{type:"text",autocomplete:"off",minlength:"2",maxlength:"255",required:""},domProps:{value:e.country},on:{input:function(t){t.target.composing||(e.country=t.target.value)}}})]),e._v(" "),a("div",{staticClass:"col-md-3 form-group"},[a("label",{attrs:{for:"zip_code"}},[e._v("Zip Code")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.zip_code,expression:"zip_code"}],staticClass:"form-control",attrs:{type:"text",autocomplete:"off",minlength:"2",maxlength:"255",required:""},domProps:{value:e.zip_code},on:{input:function(t){t.target.composing||(e.zip_code=t.target.value)}}})]),e._v(" "),a("div",{staticClass:"col-md-3 form-group"},[a("label",{attrs:{for:"telephone_number"}},[e._v("Telephone Number")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.telephone_number,expression:"telephone_number"}],staticClass:"form-control",attrs:{type:"text",autocomplete:"off",minlength:"2",maxlength:"255",required:""},domProps:{value:e.telephone_number},on:{input:function(t){t.target.composing||(e.telephone_number=t.target.value)}}})])]),e._v(" "),a("button",{staticClass:"btn btn-outline-success btn-sm",attrs:{type:"button"},on:{click:function(t){return t.preventDefault(),e.viewWarehouses(t)}}},[a("i",{staticClass:"fas fa-chevron-left"}),e._v(" Back")]),e._v(" "),a("button",{staticClass:"btn btn-success btn-sm",attrs:{type:"submit"}},[e._v("Create New Warehouse")])])]):a("div",[e._m(1)])])])])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"content-title"},[t("h4",{staticClass:"module-title"},[this._v("WAREHOUSE")]),this._v(" "),t("hr",{staticClass:"title-border"})])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"progress"},[t("div",{staticClass:"progress-bar progress-bar-striped progress-bar-animated",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})])}]}}});
//# sourceMappingURL=16.js.map