webpackJsonp([85],{"8I5Y":function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={data:function(){return{componentVal:"Conversion",ifReady:!1,unitOfMeasurementFrom:null,unitOfMeasurementTo:null,unit_of_measurements:[],conversion:"",unit_of_measurement_from_id:"",unit_of_measurement_to_id:""}},mounted:function(){var e=this,n=new Promise(function(n,t){axios.get("/api/conversions/"+e.$route.params.id).then(function(t){console.log("Conversions: "+JSON.stringify(t.data.conversion)),e.conversion=t.data.conversion,e.unitOfMeasurementFrom=t.data.conversion.convert_from,e.unitOfMeasurementTo=t.data.conversion.convert_to,t.data.response&&n()})}),t=new Promise(function(n,t){axios.get("/api/unit-of-measurements/get-all-unit-of-measurements/").then(function(t){console.log(t),e.unit_of_measurements=t.data.unit_of_measurements,t.data.response&&n()})});n.then(function(){e.ifReady=!0}),t.then(function(){e.ifReady=!0})},methods:{selectUnitFrom:function(){this.conversion.unit_of_measurement_from_id=this.unitOfMeasurementFrom.id,console.log("unitMeasurementFrom: "+this.conversion.unit_of_measurement_from_id)},selectUnitTo:function(){this.conversion.unit_of_measurement_to_id=this.unitOfMeasurementTo.id,console.log("unitMeasurementTo: "+this.conversion.unit_of_measurement_to_id)},viewConversion:function(){this.$router.push({name:"conversions.view",params:{id:this.$route.params.id}})},updateConversion:function(){var e=this;this.ifReady=!1,axios.put("/api/conversions/"+this.$route.params.id,this.$data.conversion).then(function(n){e.ifReady=!0,e.$router.push({name:"conversions.index"})}).catch(function(n){e.ifReady=!0,alert("Error!"),console.log(n)})}}}},F28A:function(e,n){e.exports={render:function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("div",{staticClass:"card"},[t("div",{staticClass:"card-header"},[e._v("\n            "+e._s(e.componentVal)+"s / Edit "+e._s(e.componentVal)+"\n        ")]),e._v(" "),t("div",{staticClass:"card-body"},[e.ifReady?t("div",[t("form",{on:{submit:function(n){return n.preventDefault(),e.editUnitOfMeasurement(n)}}},[t("div",{staticClass:"form-group"},[t("label",[e._v("From")]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.conversion.from_value,expression:"conversion.from_value"}],staticClass:"form-control",attrs:{type:"number",placeholder:"0",minlength:"2",maxlength:"255",required:""},domProps:{value:e.conversion.from_value},on:{input:function(n){n.target.composing||e.$set(e.conversion,"from_value",n.target.value)}}})]),e._v(" "),t("div",{staticClass:"form-group"},[t("label",[e._v("Select UOM")]),e._v(" "),t("vue-select",{attrs:{label:"name",options:e.unit_of_measurements},on:{input:function(n){e.selectUnitFrom()}},model:{value:e.unitOfMeasurementFrom,callback:function(n){e.unitOfMeasurementFrom=n},expression:"unitOfMeasurementFrom"}})],1),e._v(" "),t("div",{staticClass:"form-group"},[t("label",[e._v("To")]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.conversion.to_value,expression:"conversion.to_value"}],staticClass:"form-control",attrs:{type:"number",placeholder:"0",minlength:"2",maxlength:"255",required:""},domProps:{value:e.conversion.to_value},on:{input:function(n){n.target.composing||e.$set(e.conversion,"to_value",n.target.value)}}})]),e._v(" "),t("div",{staticClass:"form-group"},[t("label",[e._v("Select UOM")]),e._v(" "),t("vue-select",{attrs:{label:"name",options:e.unit_of_measurements},on:{input:function(n){e.selectUnitTo()}},model:{value:e.unitOfMeasurementTo,callback:function(n){e.unitOfMeasurementTo=n},expression:"unitOfMeasurementTo"}})],1),e._v(" "),t("button",{staticClass:"btn btn-info btn-sm",attrs:{type:"button"},on:{click:function(n){return"button"in n||!e._k(n.keyCode,"default",void 0,n.key,void 0)?(n.preventDefault(),e.viewConversion(n)):null}}},[e._v("Back")]),e._v(" "),t("button",{staticClass:"btn btn-success btn-sm",attrs:{type:"button"},on:{click:function(n){return"button"in n||!e._k(n.keyCode,"default",void 0,n.key,void 0)?(n.preventDefault(),e.updateConversion(n)):null}}},[e._v("Update Conversion")])])]):t("div",[e._m(0)])])])])},staticRenderFns:[function(){var e=this.$createElement,n=this._self._c||e;return n("div",{staticClass:"progress"},[n("div",{staticClass:"progress-bar progress-bar-striped progress-bar-animated",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})])}]}},Mmnq:function(e,n,t){var o=t("VU/8")(t("8I5Y"),t("F28A"),!1,null,null,null);e.exports=o.exports}});
//# sourceMappingURL=85.js.map