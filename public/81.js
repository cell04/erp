webpackJsonp([81],{"51OM":function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"card"},[a("div",{staticClass:"card-header"},[a("a",{staticClass:"text-success",attrs:{href:""},on:{click:function(e){return e.preventDefault(),t.viewCorp(e)}}},[t._v("Corporations")]),t._v(" "),a("a",{staticClass:"text-secondary"},[t._v(" / New Corporation")])]),t._v(" "),a("div",{staticClass:"card-body"},[t.ifReady?a("div",[a("form",{on:{submit:function(e){return e.preventDefault(),t.createNewCorporation(e)}}},[a("div",{staticClass:"form-group"},[a("label",[t._v("Name")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],staticClass:"form-control",attrs:{type:"text",autocomplete:"off",minlength:"2",maxlength:"255",required:""},domProps:{value:t.name},on:{input:function(e){e.target.composing||(t.name=e.target.value)}}})]),t._v(" "),a("div",{staticClass:"form-group"},[a("label",[t._v("Description")]),t._v(" "),a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.description,expression:"description"}],staticClass:"form-control",attrs:{maxlength:"1000",required:""},domProps:{value:t.description},on:{input:function(e){e.target.composing||(t.description=e.target.value)}}})]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-4"},[a("div",{staticClass:"form-group"},[a("label",[t._v("Street")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.street,expression:"street"}],staticClass:"form-control",attrs:{type:"text",autocomplete:"off",minlength:"2",maxlength:"255"},domProps:{value:t.street},on:{input:function(e){e.target.composing||(t.street=e.target.value)}}})])]),t._v(" "),a("div",{staticClass:"col-md-4"},[a("div",{staticClass:"form-group"},[a("label",[t._v("City")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.city,expression:"city"}],staticClass:"form-control",attrs:{type:"text",autocomplete:"off",minlength:"2",maxlength:"255"},domProps:{value:t.city},on:{input:function(e){e.target.composing||(t.city=e.target.value)}}})])]),t._v(" "),a("div",{staticClass:"col-md-4"},[a("div",{staticClass:"form-group"},[a("label",[t._v("State")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.state,expression:"state"}],staticClass:"form-control",attrs:{type:"text",autocomplete:"off",minlength:"2",maxlength:"255"},domProps:{value:t.state},on:{input:function(e){e.target.composing||(t.state=e.target.value)}}})])])]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-4"},[a("div",{staticClass:"form-group"},[a("label",[t._v("Zip Code")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.zip_code,expression:"zip_code"}],staticClass:"form-control",attrs:{type:"text",autocomplete:"off",minlength:"2",maxlength:"255"},domProps:{value:t.zip_code},on:{input:function(e){e.target.composing||(t.zip_code=e.target.value)}}})])]),t._v(" "),a("div",{staticClass:"col-md-4"},[a("div",{staticClass:"form-group"},[a("label",[t._v("Country")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.country,expression:"country"}],staticClass:"form-control",attrs:{type:"text",autocomplete:"off",minlength:"2",maxlength:"255",required:""},domProps:{value:t.country},on:{input:function(e){e.target.composing||(t.country=e.target.value)}}})])]),t._v(" "),a("div",{staticClass:"col-md-4"},[a("div",{staticClass:"form-group"},[a("label",[t._v("Fax")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.fax,expression:"fax"}],staticClass:"form-control",attrs:{type:"text",autocomplete:"off",minlength:"2",maxlength:"255"},domProps:{value:t.fax},on:{input:function(e){e.target.composing||(t.fax=e.target.value)}}})])])]),t._v(" "),a("br"),t._v(" "),a("button",{staticClass:"btn btn-outline-success btn-sm",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.viewCorp(e)}}},[a("i",{staticClass:"fas fa-chevron-left"}),t._v(" Back")]),t._v(" "),t._m(0)])]):a("div",[t._m(1)])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("button",{staticClass:"btn btn-success btn-sm",attrs:{type:"submit"}},[e("i",{staticClass:"fas fa-plus"}),this._v(" Create New Corporation")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"progress"},[e("div",{staticClass:"progress-bar progress-bar-striped progress-bar-animated",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})])}]}},NKsG:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{ifReady:!0,name:"",description:"",street:"",city:"",state:"",zip_code:"",country:"",fax:""}},methods:{viewCorp:function(){this.$router.push({name:"corporations.index"})},createNewCorporation:function(){var t=this;this.ifReady=!1,axios.post("/api/corporations",this.$data).then(function(e){t.$router.push({name:"corporations.index"}),Broadcast.$emit("NewCorporationCreated",{})}).catch(function(t){console.log(t)})}}}},Tady:function(t,e,a){var s=a("VU/8")(a("NKsG"),a("51OM"),!1,null,null,null);t.exports=s.exports}});
//# sourceMappingURL=81.js.map