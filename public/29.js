webpackJsonp([29],{C9Yw:function(e,t,a){var n=a("VU/8")(a("jYqk"),a("maUJ"),!1,null,null,null);e.exports=n.exports},jYqk:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{ifReady:!0,name:"",abbreviation:""}},methods:{createNewUnitOfMeasurement:function(){var e=this;this.ifReady=!1,axios.post("/api/unit-of-measurements",this.$data).then(function(t){e.ifReady=!0,e.$router.push({name:"settings.units.index"})}).catch(function(t){e.ifReady=!0,alert("Error!"),console.log(t)})}}}},maUJ:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"card"},[a("div",{staticClass:"card-header"},[e._v("\n            Unit of Measurements / Create New Unit of Measurement\n        ")]),e._v(" "),a("div",{staticClass:"card-body"},[e.ifReady?a("div",[a("form",{on:{submit:function(t){return t.preventDefault(),e.createNewUnitOfMeasurement(t)}}},[a("div",{staticClass:"form-group"},[a("label",[e._v("Name")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.name,expression:"name"}],staticClass:"form-control",attrs:{type:"text",autocomplete:"off",minlength:"2",maxlength:"255",required:""},domProps:{value:e.name},on:{input:function(t){t.target.composing||(e.name=t.target.value)}}})]),e._v(" "),a("div",{staticClass:"form-group"},[a("label",[e._v("Abbreviation")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.abbreviation,expression:"abbreviation"}],staticClass:"form-control",attrs:{type:"text",autocomplete:"off",minlength:"2",maxlength:"255",required:""},domProps:{value:e.abbreviation},on:{input:function(t){t.target.composing||(e.abbreviation=t.target.value)}}})]),e._v(" "),a("button",{staticClass:"btn btn-success btn-sm",attrs:{type:"submit"}},[e._v("Create New Unit of Measurement")])])]):a("div",[e._m(0)])])])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"progress"},[t("div",{staticClass:"progress-bar progress-bar-striped progress-bar-animated",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})])}]}}});
//# sourceMappingURL=29.js.map