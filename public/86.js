webpackJsonp([86],{"4cMN":function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"card"},[n("div",{staticClass:"card-header"},[e._v("\n            "+e._s(e.componentVal)+"s / Create New "+e._s(e.componentVal)+"\n        ")]),e._v(" "),n("div",{staticClass:"card-body"},[e.ifReady?n("div",[n("form",{on:{submit:function(t){return t.preventDefault(),e.createNewConversion(t)}}},[n("div",{staticClass:"form-group"},[n("label",[e._v("From")]),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.from_value,expression:"from_value"}],staticClass:"form-control",attrs:{type:"number",placeholder:"0",minlength:"2",maxlength:"255",required:""},domProps:{value:e.from_value},on:{input:function(t){t.target.composing||(e.from_value=t.target.value)}}})]),e._v(" "),n("div",{staticClass:"form-group"},[n("label",[e._v("Select UOM")]),e._v(" "),n("vue-select",{attrs:{label:"name",options:e.units},on:{input:function(t){e.selectUnitFrom()}},model:{value:e.unitOfMeasurementFrom,callback:function(t){e.unitOfMeasurementFrom=t},expression:"unitOfMeasurementFrom"}})],1),e._v(" "),n("div",{staticClass:"form-group"},[n("label",[e._v("To")]),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.to_value,expression:"to_value"}],staticClass:"form-control",attrs:{type:"number",placeholder:"0",minlength:"2",maxlength:"255",required:""},domProps:{value:e.to_value},on:{input:function(t){t.target.composing||(e.to_value=t.target.value)}}})]),e._v(" "),n("div",{staticClass:"form-group"},[n("label",[e._v("Select UOM")]),e._v(" "),n("vue-select",{attrs:{label:"name",options:e.units},on:{input:function(t){e.selectUnitTo()}},model:{value:e.unitOfMeasurementTo,callback:function(t){e.unitOfMeasurementTo=t},expression:"unitOfMeasurementTo"}})],1),e._v(" "),n("button",{staticClass:"btn btn-success btn-sm",attrs:{type:"submit"}},[e._v("Create New Conversion")])])]):n("div",[e._m(0)])])])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"progress"},[t("div",{staticClass:"progress-bar progress-bar-striped progress-bar-animated",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})])}]}},arwY:function(e,t,n){var a=n("VU/8")(n("mcEE"),n("4cMN"),!1,null,null,null);e.exports=a.exports},mcEE:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{componentVal:"Conversion",ifReady:!0,unitOfMeasurementFrom:null,unitOfMeasurementTo:null,units:[],unit_of_measurement_from_id:"",from_value:"",unit_of_measurement_to_id:"",to_value:""}},mounted:function(){var e=this;new Promise(function(t,n){axios.get("/api/unit-of-measurements/get-all-unit-of-measurements/").then(function(n){e.units=n.data.unit_of_measurements,n.data.response&&t()})})},methods:{selectUnitFrom:function(){this.unit_of_measurement_from_id=this.unitOfMeasurementFrom.id},selectUnitTo:function(){this.unit_of_measurement_to_id=this.unitOfMeasurementTo.id},createNewConversion:function(){var e=this;this.ifReady=!1,axios.post("/api/conversions",this.$data).then(function(t){e.$router.push({name:"conversions.index"}),e.ifReady=!0}).catch(function(t){e.ifReady=!0,alert("Error!"),console.log(t)})}}}}});
//# sourceMappingURL=86.js.map