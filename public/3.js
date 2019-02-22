webpackJsonp([3],{"3r6Q":function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"card"},[a("div",{staticClass:"card-header"},[a("a",{staticClass:"text-success",attrs:{href:""},on:{click:function(t){return t.preventDefault(),e.viewUnitOfMeasurement(t)}}},[e._v("Unit of Measurements")]),e._v(" "),a("a",{staticClass:"text-secondary"},[e._v(" / Edit Unit of Measurement")])]),e._v(" "),a("div",{staticClass:"card-body"},[e.ifReady?a("div",[a("form",{on:{submit:function(t){return t.preventDefault(),e.editUnitOfMeasurement(t)}}},[a("div",{staticClass:"form-group"},[a("label",[e._v("Name")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.unit_of_measurements.name,expression:"unit_of_measurements.name"}],staticClass:"form-control",attrs:{type:"text",autocomplete:"off",minlength:"2",maxlength:"255",required:""},domProps:{value:e.unit_of_measurements.name},on:{input:function(t){t.target.composing||e.$set(e.unit_of_measurements,"name",t.target.value)}}})]),e._v(" "),a("div",{staticClass:"form-group"},[a("label",[e._v("Abbreviation")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.unit_of_measurements.abbreviation,expression:"unit_of_measurements.abbreviation"}],staticClass:"form-control",attrs:{type:"text",autocomplete:"off",minlength:"2",maxlength:"255",required:""},domProps:{value:e.unit_of_measurements.abbreviation},on:{input:function(t){t.target.composing||e.$set(e.unit_of_measurements,"abbreviation",t.target.value)}}})]),e._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-6 form-group"},[a("label",[e._v("Default")]),a("br"),e._v(" "),a("label",{staticClass:"switch"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.defaultValue,expression:"defaultValue"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.defaultValue)?e._i(e.defaultValue,null)>-1:e.defaultValue},on:{change:[function(t){var a=e.defaultValue,n=t.target,s=!!n.checked;if(Array.isArray(a)){var i=e._i(a,null);n.checked?i<0&&(e.defaultValue=a.concat([null])):i>-1&&(e.defaultValue=a.slice(0,i).concat(a.slice(i+1)))}else e.defaultValue=s},function(t){e.getDefaultValue()}]}}),e._v(" "),a("span",{staticClass:"slider round"},[a("span",{staticClass:"on"},[e._v(e._s("Yes"))]),e._v(" "),a("span",{staticClass:"off"},[e._v(e._s("No"))])])])])]),e._v(" "),a("button",{staticClass:"btn btn-outline-success btn-sm",attrs:{type:"button"},on:{click:function(t){return"button"in t||!e._k(t.keyCode,"default",void 0,t.key,void 0)?(t.preventDefault(),e.viewUnitOfMeasurement(t)):null}}},[a("i",{staticClass:"fas fa-chevron-left"}),e._v(" Back")]),e._v(" "),a("button",{staticClass:"btn btn-success btn-sm",attrs:{type:"button"},on:{click:function(t){return"button"in t||!e._k(t.keyCode,"default",void 0,t.key,void 0)?(t.preventDefault(),e.updateUnitOfMeasurement(t)):null}}},[a("i",{staticClass:"fas fa-edit"}),e._v(" Update UOM")])])]):a("div",[e._m(0)])])])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"progress"},[t("div",{staticClass:"progress-bar progress-bar-striped progress-bar-animated",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})])}]}},RErH:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{componentVal:"UOM",ifReady:!1,unit_of_measurements:"",defaultValue:null}},mounted:function(){var e=this;new Promise(function(t,a){axios.get("/api/unit-of-measurements/"+e.$route.params.id).then(function(a){console.log(a),e.unit_of_measurements=a.data.unitOfMeasurement,"yes"==e.unit_of_measurements.default_value?e.defaultValue=!0:e.defaultValue=!1,t()})}).then(function(){e.ifReady=!0})},methods:{viewUnitOfMeasurement:function(){this.$router.push({name:"unit-of-measurements.view",params:{id:this.$route.params.id}})},getDefaultValue:function(){this.defaultValue?this.unit_of_measurements.default_value="yes":this.unit_of_measurements.default_value="no"},updateUnitOfMeasurement:function(){var e=this;this.ifReady=!1,axios.put("/api/unit-of-measurements/"+this.$route.params.id,this.$data.unit_of_measurements).then(function(t){e.ifReady=!0,e.$router.push({name:"unit-of-measurements.index"})}).catch(function(t){e.ifReady=!0,alert("Error!"),console.log(t)})}}}},W2uq:function(e,t,a){(e.exports=a("FZ+f")(!1)).push([e.i,'.dateStyle input:-moz-read-only{background-color:#fff!important}.dateStyle input:read-only{background-color:#fff!important}.switch{position:relative;display:inline-block;width:90px;height:34px}.switch input{display:none}.slider{cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#8e8e8e}.slider,.slider:before{position:absolute;-webkit-transition:.4s;transition:.4s}.slider:before{content:"";height:26px;width:26px;left:4px;bottom:4px;background-color:#fff}input:checked+.slider{background-color:#0cc27e}input:focus+.slider{-webkit-box-shadow:0 0 1px #2196f3;box-shadow:0 0 1px #2196f3}input:checked+.slider:before{-webkit-transform:translateX(55px);transform:translateX(55px)}.on{display:none}.off,.on{color:#fff;position:absolute;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);top:50%}.on{left:45%}.off{left:55%}input:checked+.slider .on{display:block}input:checked+.slider .off{display:none}.slider.round{border-radius:34px}.slider.round:before{border-radius:50%}',""])},yjlN:function(e,t,a){var n=a("VU/8")(a("RErH"),a("3r6Q"),!1,function(e){a("zJuK")},null,null);e.exports=n.exports},zJuK:function(e,t,a){var n=a("W2uq");"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);a("rjj0")("1daed10e",n,!0,{})}});
//# sourceMappingURL=3.js.map