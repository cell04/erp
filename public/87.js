webpackJsonp([87],{"8Yp0":function(t,e,a){var o=a("VU/8")(a("LicZ"),a("An4k"),!1,null,null,null);t.exports=o.exports},An4k:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{class:this.$store.state.showSidebar?"content-title":"spacer content-title"},[a("h4",{staticClass:"module-title"},[t._v("CONTACT")]),t._v(" "),a("hr",{staticClass:"title-border"})]),t._v(" "),a("div",{staticClass:"p-md-4"},[a("div",{staticClass:"card"},[a("div",{staticClass:"card-header"},[a("a",{staticClass:"text-success",attrs:{href:""},on:{click:function(e){return e.preventDefault(),t.viewContact(e)}}},[t._v("Contacts")]),t._v(" "),a("a",{staticClass:"text-secondary"},[t._v(" / View Contact")])]),t._v(" "),a("div",{staticClass:"card-body"},[t.ifReady?a("div",[a("fieldset",{attrs:{disabled:""}},[a("div",{staticClass:"form-group"},[a("label",[t._v("Contact Type")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.contact_type,expression:"contact_type"}],staticClass:"form-control",attrs:{type:"text",required:""},domProps:{value:t.contact_type},on:{input:function(e){e.target.composing||(t.contact_type=e.target.value)}}})]),t._v(" "),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"person"}},[t._v("Full Name")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.person,expression:"person"}],staticClass:"form-control",attrs:{type:"text",id:"person",required:""},domProps:{value:t.person},on:{input:function(e){e.target.composing||(t.person=e.target.value)}}})]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-4"},[a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"mobile_number"}},[t._v("Mobile No.")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.mobile_number,expression:"mobile_number"}],staticClass:"form-control",attrs:{type:"text",id:"mobile_number"},domProps:{value:t.mobile_number},on:{input:function(e){e.target.composing||(t.mobile_number=e.target.value)}}})])]),t._v(" "),a("div",{staticClass:"col-md-4"},[a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"email"}},[t._v("Email")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],staticClass:"form-control",attrs:{type:"email",id:"email"},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}})])]),t._v(" "),a("div",{staticClass:"col-md-4"},[a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"company"}},[t._v("Company Name")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.company,expression:"company"}],staticClass:"form-control",attrs:{type:"text",id:"company",autocomplete:"off",minlength:"2",maxlength:"255"},domProps:{value:t.company},on:{input:function(e){e.target.composing||(t.company=e.target.value)}}})])])]),t._v(" "),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"company_address"}},[t._v("Company Address")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.company_address,expression:"company_address"}],staticClass:"form-control",attrs:{type:"text",id:"company_address"},domProps:{value:t.company_address},on:{input:function(e){e.target.composing||(t.company_address=e.target.value)}}})]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-6 form-group"},[a("label",{attrs:{for:"company_address"}},[t._v("Business Type")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.business_type,expression:"business_type"}],staticClass:"form-control",attrs:{type:"text",id:"business_type"},domProps:{value:t.business_type},on:{input:function(e){e.target.composing||(t.business_type=e.target.value)}}})]),t._v(" "),a("div",{staticClass:"col-md-6 form-group"},[a("label",{attrs:{for:"company_address"}},[t._v("Payment Term")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.payment_term,expression:"payment_term"}],staticClass:"form-control",attrs:{type:"text",id:"payment_term"},domProps:{value:t.payment_term},on:{input:function(e){e.target.composing||(t.payment_term=e.target.value)}}})])]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-6 form-group"},[a("label",{attrs:{for:"company_address"}},[t._v("Payment Method")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.mode_of_payment,expression:"mode_of_payment"}],staticClass:"form-control",attrs:{type:"text",id:"mode_of_payment"},domProps:{value:t.mode_of_payment},on:{input:function(e){e.target.composing||(t.mode_of_payment=e.target.value)}}})]),t._v(" "),"Check"===t.mode_of_payment?a("div",{staticClass:"col-md-6 form-group"},[a("label",{attrs:{for:"company_address"}},[t._v("Bank Name")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.bank_name,expression:"bank_name"}],staticClass:"form-control",attrs:{type:"text",id:"bank_name"},domProps:{value:t.bank_name},on:{input:function(e){e.target.composing||(t.bank_name=e.target.value)}}})]):t._e()])]),t._v(" "),a("button",{staticClass:"btn btn-outline-success btn-sm",attrs:{type:"button"},on:{click:function(e){return"button"in e||!t._k(e.keyCode,"default",void 0,e.key,void 0)?(e.preventDefault(),t.viewContact(e)):null}}},[a("i",{staticClass:"fas fa-chevron-left"}),t._v(" Back")]),t._v(" "),a("button",{staticClass:"btn btn-primary btn-sm",attrs:{type:"button"},on:{click:function(e){return"button"in e||!t._k(e.keyCode,"default",void 0,e.key,void 0)?(e.preventDefault(),t.editContact(e)):null}}},[a("i",{staticClass:"fas fa-edit"}),t._v(" Edit")]),t._v(" "),a("button",{staticClass:"btn btn-danger btn-sm",attrs:{type:"button"},on:{click:function(e){return"button"in e||!t._k(e.keyCode,"default",void 0,e.key,void 0)?(e.preventDefault(),t.openDeleteContactModal(e)):null}}},[a("i",{staticClass:"fas fa-trash-alt"}),t._v(" Delete")])]):a("div",[t._m(0)])])]),t._v(" "),a("div",{staticClass:"modal fade",attrs:{id:"deleteContactModal",tabindex:"-1",role:"dialog","aria-labelledby":"deleteContactTitle","aria-hidden":"true"}},[a("div",{staticClass:"modal-dialog modal-dialog-centered",attrs:{role:"document"}},[a("div",{staticClass:"modal-content"},[t._m(1),t._v(" "),a("div",{staticClass:"modal-body"},[t._v("\n                        Are you sure you want to delete this "+t._s(t.componentVal)+"? "),a("br"),a("br"),t._v("\n                        Deleting this "+t._s(t.componentVal)+" will delete the following data "),a("br"),a("br"),t._v("\n\n                        that are all related to this "+t._s(t.componentVal)+".\n                    ")]),t._v(" "),a("div",{staticClass:"modal-footer"},[a("button",{staticClass:"btn btn-danger btn-sm",attrs:{type:"button"},on:{click:function(e){return"button"in e||!t._k(e.keyCode,"default",void 0,e.key,void 0)?(e.preventDefault(),t.deleteContact(e)):null}}},[t._v("Confirm Delete")]),t._v(" "),a("button",{staticClass:"btn btn-secondary btn-sm",attrs:{type:"button","data-dismiss":"modal"}},[t._v("Close")])])])])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"progress"},[e("div",{staticClass:"progress-bar progress-bar-striped progress-bar-animated",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"modal-header"},[e("h5",{staticClass:"modal-title",attrs:{id:"exampleModalLongTitle"}},[this._v("You're about to delete this contact?")]),this._v(" "),e("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[e("span",{attrs:{"aria-hidden":"true"}},[this._v("×")])])])}]}},LicZ:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{ifReady:!1,componentVal:"contact",contact_type:"",id:"",type:"",person:"",mobile_number:"",email:"",company:"",company_address:"",business_type:"",bank_name:"",payment_term:"",mode_of_payment:"",credit_limit:0}},mounted:function(){var t=this;new Promise(function(e,a){axios.get("/api/contacts/"+t.$route.params.id).then(function(a){if(console.log("Contact: "+JSON.stringify(a.data)),a.data.response){t.contact_type=a.data.contact.contact_type.display_name,t.id=a.data.contact.id,t.type=a.data.contact.type,t.person=a.data.contact.person,t.mobile_number=a.data.contact.mobile_number,t.email=a.data.contact.email,t.company=a.data.contact.company,t.company_address=a.data.contact.company_address,t.credit_limit=a.data.contact.credit_limit,t.business_type=a.data.contact.business_type,t.bank_name=a.data.contact.bank_name,t.mode_of_payment=a.data.contact.mode_of_payment.name;var o=a.data.contact.payment_term;t.payment_term=1==o?"Partial":"Full",e()}})}).then(function(){t.ifReady=!0})},methods:{viewContact:function(){this.$router.push({name:"contacts.index"})},editContact:function(){this.$router.push({name:"contacts.edit",params:{id:this.id}})},openDeleteContactModal:function(){$("#deleteContactModal").modal("show")},deleteContact:function(){var t=this;$("#deleteContactModal").modal("hide"),axios.delete("/api/contacts/"+this.$route.params.id).then(function(e){t.$router.push({name:"contacts.index"})})}}}}});
//# sourceMappingURL=87.js.map