webpackJsonp([71],{"1iVB":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{ifReady:!1,invoiceId:"",invoicePayment:[]}},mounted:function(){var e=this;new Promise(function(t,a){axios.get("/api/invoice-payments/"+e.$route.params.id).then(function(a){e.invoicePayment=a.data.invoicePayment,e.invoiceId=a.data.invoicePayment.invoice,console.log("IP: "+JSON.stringify(a.data)),e.ifReady=!0,a.data.response&&t()})})},methods:{viewInvoice:function(){this.$router.push({name:"invoice-payments.index"})}}}},ObbX:function(e,t,a){var n=a("VU/8")(a("1iVB"),a("pKNC"),!1,null,null,null);e.exports=n.exports},pKNC:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{class:this.$store.state.showSidebar?"content-title":"spacer content-title"},[a("h4",{staticClass:"module-title"},[e._v("INVOICE PAYMENT")]),e._v(" "),a("hr",{staticClass:"title-border"})]),e._v(" "),a("div",{staticClass:"p-md-4"},[a("div",{staticClass:"card"},[a("div",{staticClass:"card-header"},[a("a",{staticClass:"text-success",attrs:{href:""},on:{click:function(t){return t.preventDefault(),e.viewInvoice(t)}}},[e._v("Invoice Payments")]),e._v(" "),a("a",{staticClass:"text-secondary"},[e._v(" / View Invoice Payment")])]),e._v(" "),a("div",{staticClass:"card-body"},[e.ifReady?a("div",[a("fieldset",{attrs:{disabled:""}},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-6 form-group"},[a("label",{attrs:{for:"name"}},[e._v(e._s(1==e.invoicePayment.payment_for?"Sales Invoice #":"Service Invoice #"))]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.invoiceId.reference_number,expression:"invoiceId.reference_number"}],staticClass:"form-control",attrs:{type:"text",autocomplete:"off",minlength:"2",maxlength:"255",required:""},domProps:{value:e.invoiceId.reference_number},on:{input:function(t){t.target.composing||e.$set(e.invoiceId,"reference_number",t.target.value)}}})]),e._v(" "),a("div",{staticClass:"col-md-6 form-group"},[a("label",{attrs:{for:"name"}},[e._v("Amount")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.invoicePayment.amount,expression:"invoicePayment.amount"}],staticClass:"form-control",attrs:{type:"text",autocomplete:"off",minlength:"2",maxlength:"255",required:""},domProps:{value:e.invoicePayment.amount},on:{input:function(t){t.target.composing||e.$set(e.invoicePayment,"amount",t.target.value)}}})]),e._v(" "),a("div",{staticClass:"col-md-6 form-group"},[a("label",{attrs:{for:"name"}},[e._v("Mode of Payment")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.invoicePayment.mode_of_payment.name,expression:"invoicePayment.mode_of_payment.name"}],staticClass:"form-control",attrs:{type:"text",autocomplete:"off",minlength:"2",maxlength:"255",required:""},domProps:{value:e.invoicePayment.mode_of_payment.name},on:{input:function(t){t.target.composing||e.$set(e.invoicePayment.mode_of_payment,"name",t.target.value)}}})]),e._v(" "),a("div",{staticClass:"col-md-6 form-group"},[a("label",{attrs:{for:"name"}},[e._v("CR #")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.invoicePayment.cr_number,expression:"invoicePayment.cr_number"}],staticClass:"form-control",attrs:{type:"text",autocomplete:"off",minlength:"2",maxlength:"255",required:""},domProps:{value:e.invoicePayment.cr_number},on:{input:function(t){t.target.composing||e.$set(e.invoicePayment,"cr_number",t.target.value)}}})]),e._v(" "),2==e.invoicePayment.mode_of_payment_id?a("div",{staticClass:"col-md-6 form-group"},[a("label",{attrs:{for:"name"}},[e._v("Bank Name")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.invoicePayment.bank_name,expression:"invoicePayment.bank_name"}],staticClass:"form-control",attrs:{type:"text",autocomplete:"off",minlength:"2",maxlength:"255",required:""},domProps:{value:e.invoicePayment.bank_name},on:{input:function(t){t.target.composing||e.$set(e.invoicePayment,"bank_name",t.target.value)}}})]):e._e(),e._v(" "),2==e.invoicePayment.mode_of_payment_id?a("div",{staticClass:"col-md-6 form-group"},[a("label",{attrs:{for:"name"}},[e._v("Check #")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.invoicePayment.check,expression:"invoicePayment.check"}],staticClass:"form-control",attrs:{type:"text",autocomplete:"off",minlength:"2",maxlength:"255",required:""},domProps:{value:e.invoicePayment.check},on:{input:function(t){t.target.composing||e.$set(e.invoicePayment,"check",t.target.value)}}})]):e._e()])]),e._v(" "),a("br"),e._v(" "),a("button",{staticClass:"btn btn-outline-success btn-sm",attrs:{type:"button"},on:{click:function(t){return"button"in t||!e._k(t.keyCode,"default",void 0,t.key,void 0)?(t.preventDefault(),e.viewInvoice(t)):null}}},[a("i",{staticClass:"fas fa-chevron-left"}),e._v(" Back")])]):a("div",[e._m(0)])])])])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"progress"},[t("div",{staticClass:"progress-bar progress-bar-striped progress-bar-animated",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})])}]}}});
//# sourceMappingURL=71.js.map