webpackJsonp([18],{"8Eso":function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"card my-4"},[a("ul",{staticClass:"nav nav-pills nav-justified"},[a("li",{staticClass:"nav-item bg-white"},[a("router-link",{staticClass:"nav-link p-3",attrs:{to:{name:"settings.index"}}},[t._v("\n                    System\n                ")])],1),t._v(" "),a("li",{staticClass:"nav-item bg-white"},[a("router-link",{staticClass:"nav-link p-3",attrs:{to:{name:"settings.users"}}},[t._v("\n                    Users\n                ")])],1),t._v(" "),a("li",{staticClass:"nav-item bg-white"},[a("router-link",{staticClass:"nav-link p-3",attrs:{to:{name:"settings.paymentTerms"}}},[t._v("\n                    payment_terms\n                ")])],1),t._v(" "),a("li",{staticClass:"nav-item bg-white"},[a("router-link",{staticClass:"nav-link p-3",attrs:{to:{name:"settings.conversions"}}},[t._v("\n                    Conversions\n                ")])],1),t._v(" "),a("li",{staticClass:"nav-item bg-white "},[a("router-link",{staticClass:"nav-link p-3 active",attrs:{to:{name:"settings.paymentTerms"}}},[t._v("\n                    Payment Terms\n                ")])],1)])]),t._v(" "),a("div",{staticClass:"card"},[a("div",{staticClass:"card-header clearfix"},[t._v("\n            Payment Terms\n            "),a("button",{staticClass:"btn btn-primary float-right",attrs:{type:"button"},on:{click:function(e){e.preventDefault(),t.setUnit("","","","create")}}},[t._v("+ Add Payment Term")])]),t._v(" "),a("div",{staticClass:"card-body"},[a("table",{staticClass:"table table-hover table-sm"},[a("caption",[a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-9"},[t._v("\n                            List of payment_terms - Total payment_terms "+t._s(this.meta.total)+"\n                        ")]),t._v(" "),a("div",{staticClass:"col-md-3"},[t.showProgress?a("div",{staticClass:"progress",attrs:{height:"30px;"}},[a("div",{staticClass:"progress-bar progress-bar-striped progress-bar-animated",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})]):t._e()])])]),t._v(" "),t._m(0),t._v(" "),t.payment_terms?a("tbody",t._l(t.payment_terms,function(e){var s=e.id,i=e.name,r=e.value;return a("tr",{key:s},[a("td",[t._v(t._s(i))]),t._v(" "),a("td",[t._v(t._s(r))]),t._v(" "),a("td",[a("button",{staticClass:"btn btn-primary",on:{click:function(e){e.preventDefault(),t.setUnit(s,i,r,"view")}}},[t._v("View")]),t._v(" "),a("button",{staticClass:"btn btn-danger",on:{click:function(e){e.preventDefault(),t.setUnit(s,i,r,"update")}}},[t._v("Edit")])])])})):t._e()])])]),t._v(" "),a("br"),t._v(" "),a("div",{staticClass:"clearfix"},[(t.pageCount,a("div",[a("nav",{staticClass:"float-left"},[a("ul",{staticClass:"pagination"},[a("li",{staticClass:"page-item",class:t.isPrevDisabled},[a("a",{staticClass:"page-link",attrs:{href:"#",disabled:""},on:{click:function(e){return e.preventDefault(),t.goToPreviousPage(e)}}},[t._v("Previous")])]),t._v(" "),a("li",{staticClass:"page-item"},[a("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.goToFirstPage(e)}}},[t._v("First")])]),t._v(" "),t._l(t.pageNumbers,function(e){return a("li",{key:e,staticClass:"page-item",class:t.isPageActive(e)},[a("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(a){a.preventDefault(),t.goToPage(e)}}},[t._v(t._s(e))])])}),t._v(" "),a("li",{staticClass:"page-item",class:t.isNextDisabled},[a("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.goToLastPage(e)}}},[t._v("Last")])]),t._v(" "),a("li",{staticClass:"page-item",class:t.isNextDisabled},[a("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.goToNextPage(e)}}},[t._v("Next")])])],2)])])),t._v(" "),a("div",{staticClass:"float-right"},[a("form",{staticClass:"form-inline"},[a("button",{staticClass:"btn btn-primary mr-2",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.openSearchModal(e)}}},[t._v("Search Payment Term")]),t._v(" "),a("div",{staticClass:"input-group"},[t._m(1),t._v(" "),a("select",{directives:[{name:"model",rawName:"v-model",value:t.meta.per_page,expression:"meta.per_page"}],staticClass:"custom-select",attrs:{id:"number_of_items"},on:{change:[function(e){var a=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.$set(t.meta,"per_page",e.target.multiple?a:a[0])},t.changePerPage]}},[a("option",{attrs:{value:"10"}},[t._v("10")]),t._v(" "),a("option",{attrs:{value:"15"}},[t._v("15")]),t._v(" "),a("option",{attrs:{value:"20"}},[t._v("20")]),t._v(" "),a("option",{attrs:{value:"25"}},[t._v("25")])])])])]),t._v(" "),a("div",{staticClass:"modal fade",attrs:{id:"modal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true"}},[a("div",{staticClass:"modal-dialog",attrs:{role:"document"}},[a("div",{staticClass:"modal-content"},[t._m(2),t._v(" "),a("form",{on:{submit:function(e){return e.preventDefault(),t.createNewUnit(e)}}},[a("div",{staticClass:"modal-body"},[a("div",{staticClass:"form-group"},[a("label",[t._v("Name")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.modal.name,expression:"modal.name"}],staticClass:"form-control",attrs:{type:"text",readonly:"view"===t.modal.type,required:""},domProps:{value:t.modal.name},on:{input:function(e){e.target.composing||t.$set(t.modal,"name",e.target.value)}}})]),t._v(" "),a("div",{staticClass:"form-group"},[a("label",[t._v("Value")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.modal.value,expression:"modal.value"}],staticClass:"form-control",attrs:{type:"number",readonly:"view"===t.modal.type,required:""},domProps:{value:t.modal.value},on:{input:function(e){e.target.composing||t.$set(t.modal,"value",e.target.value)}}})])]),t._v(" "),a("div",{staticClass:"modal-footer"},[a("button",{staticClass:"btn btn-secondary",attrs:{type:"button","data-dismiss":"modal"}},[t._v("Close")]),t._v(" "),"create"===t.modal.type?a("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[t._v("Save Unit")]):t._e(),t._v(" "),"update"===t.modal.type?a("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[t._v("Update Unit")]):t._e()])])])])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("thead",[e("tr",[e("th",{attrs:{scope:"col"}},[this._v("Name")]),this._v(" "),e("th",{attrs:{scope:"col"}},[this._v("value")]),this._v(" "),e("th",{attrs:{scope:"col"}},[this._v("Action")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"input-group-prepend"},[e("div",{staticClass:"input-group-text"},[this._v("Items per page")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"modal-header"},[e("h5",{staticClass:"modal-title",attrs:{id:"exampleModalLabel"}},[this._v("New Payment Term")]),this._v(" "),e("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[e("span",{attrs:{"aria-hidden":"true"}},[this._v("×")])])])}]}},ZCFe:function(t,e,a){var s=a("VU/8")(a("bKYW"),a("8Eso"),!1,null,null,null);t.exports=s.exports},bKYW:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=function(t,e,a){var s={page:t,per_page:e};Vue.http.get("/api/payment-terms",{params:s}).then(function(t){console.log(t),a(null,t.data)}).catch(function(t){console.error(t),a(t,t.res.data)})};e.default={data:function(){return{componentVal:"Contact",payment_terms:null,meta:{current_page:null,from:null,last_page:null,path:null,per_page:10,to:null,total:null},links:{first:null,last:null,next:null,prev:null},error:null,showProgress:!1,pageNumbers:[],modal:{id:"",name:"",value:"",type:""}}},beforeRouteEnter:function(t,e,a){null==t.query.per_page?s(t.query.page,10,function(t,e){a(function(a){return a.setData(t,e)})}):s(t.query.page,t.query.per_page,function(t,e){a(function(a){return a.setData(t,e)})})},beforeRouteUpdate:function(t,e,a){var i=this;s(t.query.page,this.meta.per_page,function(t,e){i.setData(t,e),a()})},computed:{nextPage:function(){return this.meta.current_page+1},prevPage:function(){return this.meta.current_page-1},paginatonCount:function(){if(this.meta){var t=this.meta;return t.current_page+" of "+t.last_page}},pageCount:function(){return!(this.meta.last_page>10)},isPrevDisabled:function(){if(null==this.links.prev)return"disabled"},isNextDisabled:function(){if(null==this.links.next)return"disabled"}},methods:{toggleModal:function(t){$("#modal").modal(t)},setUnit:function(t,e,a,s){this.modal.id=t,this.modal.name=e,this.modal.value=a,this.modal.type=s,this.toggleModal("show")},createNewUnit:function(){var t=this;switch(this.modal.type){case"update":this.$http.put("/api/payment-terms/"+this.modal.id,this.modal).then(function(e){console.log(JSON.stringify(e.data)),alert("Success! Unit updated successfully"),t.toggleModal("hide"),t.refresh()}).catch(function(t){console.log(t),alert("Error! Can't update unit")});break;case"create":this.$http.post("/api/payment-terms",this.modal).then(function(e){console.log(JSON.stringify(e.data)),alert("Success! New unit created successfully"),t.toggleModal("hide"),t.refresh()}).catch(function(t){console.log(t),alert("Error! Can't create new unit")})}},refresh:function(){this.showProgress=!0,this.$router.go({name:"settings.paymentTerms",query:{page:this.meta.current_page,per_page:this.meta.per_page}})},goToFirstPage:function(){this.showProgress=!0,this.$router.push({name:"settings.paymentTerms",query:{page:1,per_page:this.meta.per_page}})},goToPage:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;this.showProgress=!0,this.$router.push({name:"settings.paymentTerms",query:{page:t,per_page:this.meta.per_page}})},goToLastPage:function(){this.showProgress=!0,this.$router.push({name:"settings.paymentTerms",query:{page:this.meta.last_page,per_page:this.meta.per_page}})},goToNextPage:function(){this.showProgress=!0,this.$router.push({name:"settings.paymentTerms",query:{page:this.nextPage,per_page:this.meta.per_page}})},goToPreviousPage:function(){this.showProgress=!0,this.$router.push({name:"settings.paymentTerms",query:{page:this.prevPage,per_page:this.meta.per_page}})},setData:function(t,e){var a=e.data,s=e.links,i=e.meta;this.pageNumbers=[],t?this.error=t.toString():(this.payment_terms=a,this.links=s,this.meta=i),this.showProgress=!1,this.populatePages()},populatePages:function(){if(this.pageCount)for(var t=1;t<=this.meta.last_page;t++)this.pageNumbers.push(t);else if(this.meta.current_page<=6){this.pageNumbers.push(1),this.pageNumbers.push(2),this.pageNumbers.push(3),this.pageNumbers.push(4),this.pageNumbers.push(5),this.pageNumbers.push(6),this.pageNumbers.push(7),this.pageNumbers.push("..."),this.pageNumbers.push(this.meta.last_page-1),this.pageNumbers.push(this.meta.last_page)}else this.meta.current_page+6>=this.meta.last_page?(this.pageNumbers.push(1),this.pageNumbers.push(2),this.pageNumbers.push("..."),this.pageNumbers.push(this.meta.last_page-7),this.pageNumbers.push(this.meta.last_page-6),this.pageNumbers.push(this.meta.last_page-5),this.pageNumbers.push(this.meta.last_page-4),this.pageNumbers.push(this.meta.last_page-3),this.pageNumbers.push(this.meta.last_page-2),this.pageNumbers.push(this.meta.last_page-1),this.pageNumbers.push(this.meta.last_page)):(this.pageNumbers.push(1),this.pageNumbers.push(2),this.pageNumbers.push("..."),this.pageNumbers.push(this.meta.current_page-2),this.pageNumbers.push(this.meta.current_page-1),this.pageNumbers.push(this.meta.current_page),this.pageNumbers.push(this.meta.current_page+1),this.pageNumbers.push(this.meta.current_page+2),this.pageNumbers.push("..."),this.pageNumbers.push(this.meta.last_page-1),this.pageNumbers.push(this.meta.last_page))},isPageActive:function(t){if(t==this.$route.query.page||1==t&&null==this.$route.query.page)return"active"},changePerPage:function(){this.showProgress=!0,this.$router.push({name:"settings.paymentTerms",query:{page:1,per_page:this.meta.per_page}})}}}}});
//# sourceMappingURL=18.js.map