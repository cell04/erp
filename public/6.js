webpackJsonp([6],{"3/p9":function(t,e,a){var i=a("OuGJ");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a("rjj0")("72e57a42",i,!0,{})},Faly:function(t,e,a){var i=a("VU/8")(a("S5bA"),a("tdHu"),!1,function(t){a("3/p9")},null,null);t.exports=i.exports},OuGJ:function(t,e,a){(t.exports=a("FZ+f")(!1)).push([t.i,".dateStyle input:-moz-read-only{background-color:#fff!important}.dateStyle input:read-only{background-color:#fff!important}",""])},S5bA:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{ifReady:!1,contacts:[],bidsheets:[],bidsheetData:null,bid_sheet_id:"",contact:null,contact_id:"",due_date:"",amount:"",amount_paid:"",items:[],reference_number:"",amounts:"",isDisabled:!1}},filters:{Decimal:function(t){if(t)return t.toFixed(2)}},mounted:function(){var t=this,e=new Promise(function(e,a){axios.get("/api/contacts/get-all-contacts/").then(function(a){t.contacts=a.data.contacts,e()}).catch(function(t){console.log(t),a()})}),a=new Promise(function(e,a){axios.get("/api/bid-sheets/get-all-open-bid-sheets/").then(function(a){t.bidsheets=a.data.bid_sheets,e()}).catch(function(t){console.log(t),a()})});Promise.all([e,a]).then(function(){t.ifReady=!0})},computed:{},methods:{viewServiceInvoices:function(){this.$router.push({name:"service-invoices.index"})},getBidSheetDetails:function(t){var e=this;console.log("Take id: "+t),axios.get("/api/bid-sheets/"+t).then(function(t){console.log("Quote: "+JSON.stringify(t.data)),e.contact=t.data.bidSheet.contact.person,e.contact_id=t.data.bidSheet.contact_id,e.amount=t.data.bidSheet.amount,e.autoGenerateSalesInvoive(),resolve()}).catch(function(t){console.log(t),reject()})},autoGenerateSalesInvoive:function(){var t=new Date,e=[t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes(),t.getSeconds(),t.getMilliseconds()].join("");this.reference_number=e,console.log("Code: "+e)},selectBidSheet:function(){this.bid_sheet_id=this.bidsheetData.id,console.log("B ID: "+this.bidsheetData.id),this.getBidSheetDetails(this.bidsheetData.id)},createNewInvoice:function(){var t=this;this.ifReady=!1;var e={invoice_items:null,bid_sheet_id:this.bid_sheet_id,contact_id:this.$data.contact_id,reference_number:"SRI"+this.$data.reference_number,due_date:moment(this.$data.due_date).format("YYYY-MM-DD"),amount:this.amount,amount_paid:0};console.log(e),axios.post("/api/service-invoices",e).then(function(e){t.$router.push({name:"service-invoices.index"})}).catch(function(e){alert("Error! Can't create invoice"),t.ifReady=!0})}}}},tdHu:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{class:this.$store.state.showSidebar?"content-title":"spacer content-title"},[a("h4",{staticClass:"module-title"},[t._v("SERVICE INVOICE")]),t._v(" "),a("hr",{staticClass:"title-border"})]),t._v(" "),a("div",{staticClass:"p-md-4"},[a("div",{staticClass:"card"},[a("div",{staticClass:"card-header"},[a("a",{staticClass:"text-success",attrs:{href:""},on:{click:function(e){return e.preventDefault(),t.viewServiceInvoices(e)}}},[t._v("Service Invoices")]),t._v(" "),a("a",{staticClass:"text-secondary"},[t._v(" / Create New Service Invoice")])]),t._v(" "),a("div",{staticClass:"card-body"},[t.ifReady?a("div",[a("form",{on:{submit:function(e){return e.preventDefault(),t.createNewInvoice(e)}}},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-6 form-group"},[a("label",[t._v("Bid Sheet #")]),t._v(" "),a("vue-select",{attrs:{label:"bid_sheet_number",options:t.bidsheets},on:{input:function(e){t.selectBidSheet()}},model:{value:t.bidsheetData,callback:function(e){t.bidsheetData=e},expression:"bidsheetData"}})],1),t._v(" "),a("div",{staticClass:"col-md-6 form-group"},[a("label",[t._v(" Service Invoice #")]),t._v(" "),a("div",{staticClass:"input-group"},[t._m(0),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.reference_number,expression:"reference_number"}],staticClass:"form-control",attrs:{type:"text",readonly:"",placeholder:"Sales Invoice #","aria-label":"Input group example","aria-describedby":"btnGroupAddon"},domProps:{value:t.reference_number},on:{input:function(e){e.target.composing||(t.reference_number=e.target.value)}}})])]),t._v(" "),a("div",{staticClass:"col-md-6 form-group"},[a("label",[t._v("Customer")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.contact,expression:"contact"}],staticClass:"form-control",attrs:{type:"text",readonly:""},domProps:{value:t.contact},on:{input:function(e){e.target.composing||(t.contact=e.target.value)}}})]),t._v(" "),a("div",{staticClass:"col-md-6 form-group"},[a("label",[t._v("Amount")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.amount,expression:"amount"}],staticClass:"form-control",attrs:{type:"text",readonly:""},domProps:{value:t.amount},on:{input:function(e){e.target.composing||(t.amount=e.target.value)}}})]),t._v(" "),a("div",{staticClass:"col-md-6 form-group"},[a("div",{staticClass:"dateStyle"},[a("label",[t._v("Due Date")]),t._v(" "),a("datepicker",{attrs:{"bootstrap-styling":!0,required:""},model:{value:t.due_date,callback:function(e){t.due_date=e},expression:"due_date"}})],1)])]),t._v(" "),a("div",{staticClass:"pt-3"},[a("button",{staticClass:"btn btn-outline-success btn-sm",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.viewServiceInvoices(e)}}},[a("i",{staticClass:"fas fa-chevron-left"}),t._v(" Back")]),t._v(" "),a("button",{staticClass:"btn btn-success btn-sm",attrs:{type:"submit",disabled:t.isDisabled}},[a("i",{staticClass:"fas fa-plus"}),t._v(" Create New Service Invoice")])])])]):a("div",[t._m(1)])])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"input-group-prepend"},[e("div",{staticClass:"input-group-text",attrs:{id:"btnGroupAddon"}},[this._v("SRI")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"progress"},[e("div",{staticClass:"progress-bar progress-bar-striped progress-bar-animated",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})])}]}}});
//# sourceMappingURL=6.js.map