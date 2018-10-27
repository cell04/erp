webpackJsonp([67],{CPMb:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{ifReady:!1,id:"",type:"",person:"",mobile_number:"",email:"",company:"",company_address:"",isDisabled:!1,contact_type:[{value:1,contact_name:"Supplier"},{value:2,contact_name:"Customer"},{value:3,contact_name:"Employee"}]}},mounted:function(){var t=this;new Promise(function(e,a){axios.get("/api/contacts/"+t.$route.params.id).then(function(a){a.data.response&&(t.id=a.data.contact.id,t.type=a.data.contact.type,t.person=a.data.contact.person,t.mobile_number=a.data.contact.mobile_number,t.email=a.data.contact.email,t.company=a.data.contact.company,t.company_address=a.data.contact.company_address,e())})}).then(function(){t.ifReady=!0})},methods:{viewContact:function(){this.$router.push({name:"contacts.view",params:{id:this.$route.params.id}})},updateContact:function(){var t=this;this.isDisabled=!0,this.isReady=!1,axios.patch("/api/contacts/"+this.$route.params.id,this.$data).then(function(e){e.data.response||alert("error"),t.$router.push({name:"contacts.view",params:{id:t.$route.params.id}})})}},computed:{}}},FatK:function(t,e,a){var o=a("VU/8")(a("CPMb"),a("RsE2"),!1,null,null,null);t.exports=o.exports},RsE2:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"card"},[a("div",{staticClass:"card-header"},[t._v("\n            Contacts / View Contacts\n        ")]),t._v(" "),a("div",{staticClass:"card-body"},[t.ifReady?a("div",[a("form",{ref:"editContactForm",attrs:{role:"form",method:"POST","accept-charset":"utf-8"},on:{submit:function(e){return e.preventDefault(),t.editContact(e)}}},[a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"type"}},[t._v("Type")]),t._v(" "),a("select",{directives:[{name:"model",rawName:"v-model",value:t.type,expression:"type"}],staticClass:"form-control",on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.type=e.target.multiple?a:a[0]}}},t._l(t.contact_type,function(e){return a("option",{domProps:{value:e.value}},[t._v(t._s(e.contact_name))])}))]),t._v(" "),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"person"}},[t._v("Full Name")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.person,expression:"person"}],staticClass:"form-control",attrs:{type:"text",id:"person",required:""},domProps:{value:t.person},on:{input:function(e){e.target.composing||(t.person=e.target.value)}}})]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-4"},[a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"mobile_number"}},[t._v("Mobile No.")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.mobile_number,expression:"mobile_number"}],staticClass:"form-control",attrs:{type:"text",id:"mobile_number"},domProps:{value:t.mobile_number},on:{input:function(e){e.target.composing||(t.mobile_number=e.target.value)}}})])]),t._v(" "),a("div",{staticClass:"col-md-4"},[a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"email"}},[t._v("Email")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],staticClass:"form-control",attrs:{type:"email",id:"email"},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}})])]),t._v(" "),a("div",{staticClass:"col-md-4"},[a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"company"}},[t._v("Company Name")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.company,expression:"company"}],staticClass:"form-control",attrs:{type:"text",id:"company",autocomplete:"off",minlength:"2",maxlength:"255"},domProps:{value:t.company},on:{input:function(e){e.target.composing||(t.company=e.target.value)}}})])])]),t._v(" "),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"company_address"}},[t._v("Company Address")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.company_address,expression:"company_address"}],staticClass:"form-control",attrs:{type:"text",id:"company_address"},domProps:{value:t.company_address},on:{input:function(e){e.target.composing||(t.company_address=e.target.value)}}})]),t._v(" "),a("button",{staticClass:"btn btn-info btn-sm",attrs:{type:"button"},on:{click:function(e){return"button"in e||!t._k(e.keyCode,"default",void 0,e.key,void 0)?(e.preventDefault(),t.viewContact(e)):null}}},[t._v("Back")]),t._v(" "),a("button",{staticClass:"btn btn-success btn-sm",attrs:{type:"button",disabled:t.isDisabled},on:{click:function(e){return"button"in e||!t._k(e.keyCode,"default",void 0,e.key,void 0)?(e.preventDefault(),t.updateContact(e)):null}}},[t._v("Update Contact")])])]):a("div",[t._m(0)])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"progress"},[e("div",{staticClass:"progress-bar progress-bar-striped progress-bar-animated",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})])}]}}});
//# sourceMappingURL=67.js.map