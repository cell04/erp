webpackJsonp([102],{"6be7":function(e,t,a){var s=a("VU/8")(a("a3NJ"),a("Wwx5"),!1,null,null,null);e.exports=s.exports},Wwx5:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[e._m(0),e._v(" "),a("div",{staticClass:"p-md-4"},[a("div",{staticClass:"card"},[a("div",{staticClass:"card-header clearfix"},[a("div",{staticClass:"float-left"},[e._v("\n                    Purchase Invoice Payment\n                ")]),e._v(" "),a("div",{staticClass:"float-right"},[a("router-link",{staticClass:"btn-primary btn-sm",attrs:{to:{name:"bill-payments.create"}}},[a("i",{staticClass:"fas fa-plus"}),e._v(" Create New Purchase Invoice Payment")])],1)]),e._v(" "),a("div",{staticClass:"card-body"},[a("table",{staticClass:"table table-hover table-sm"},[a("caption",[a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-9"},[e._v("\n                                List of Purchase Invoice Payments - Total Purchase Invoice Payments "+e._s(this.meta.total)+"\n                            ")]),e._v(" "),a("div",{staticClass:"col-md-3"},[e.showProgress?a("div",{staticClass:"progress",attrs:{height:"30px;"}},[a("div",{staticClass:"progress-bar progress-bar-striped progress-bar-animated",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})]):e._e()])])]),e._v(" "),e._m(1),e._v(" "),e.billPayment?a("tbody",e._l(e.billPayment,function(t){var s=t.id,r=t.bill,i=t.amount,n=t.mode_of_payment,o=t.cr_number;return a("tr",{key:s},[a("td",[e._v(e._s(r.reference_number))]),e._v(" "),a("td",[e._v(e._s(o))]),e._v(" "),a("td",[e._v(e._s(n.name))]),e._v(" "),a("td",[e._v(e._s(i))]),e._v(" "),a("td",[e._v(e._s(+r.amount-+r.amount_paid))]),e._v(" "),a("td",[a("router-link",{staticClass:"text-secondary",attrs:{to:{name:"bill-payments.view",params:{id:s}}}},[a("i",{staticClass:"fas fa-envelope-open-text"}),e._v(" View\n                                ")])],1)])})):e._e()])])]),e._v(" "),a("br"),e._v(" "),a("div",{staticClass:"clearfix"},[(e.pageCount,a("div",[a("nav",{staticClass:"float-left"},[a("ul",{staticClass:"pagination"},[a("li",{staticClass:"page-item",class:e.isPrevDisabled},[a("a",{staticClass:"page-link",attrs:{href:"#",disabled:""},on:{click:function(t){return t.preventDefault(),e.goToPreviousPage(t)}}},[e._v("Previous")])]),e._v(" "),a("li",{staticClass:"page-item"},[a("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(t){return t.preventDefault(),e.goToFirstPage(t)}}},[e._v("First")])]),e._v(" "),e._l(e.pageNumbers,function(t){return a("li",{key:t,staticClass:"page-item",class:e.isPageActive(t)},[a("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(a){a.preventDefault(),e.goToPage(t)}}},[e._v(e._s(t))])])}),e._v(" "),a("li",{staticClass:"page-item",class:e.isNextDisabled},[a("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(t){return t.preventDefault(),e.goToLastPage(t)}}},[e._v("Last")])]),e._v(" "),a("li",{staticClass:"page-item",class:e.isNextDisabled},[a("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(t){return t.preventDefault(),e.goToNextPage(t)}}},[e._v("Next")])])],2)])])),e._v(" "),a("div",{staticClass:"float-right"},[a("form",{staticClass:"form-inline"},[a("div",{staticClass:"input-group"},[e._m(2),e._v(" "),a("select",{directives:[{name:"model",rawName:"v-model",value:e.meta.per_page,expression:"meta.per_page"}],staticClass:"custom-select",attrs:{id:"number_of_items"},on:{change:[function(t){var a=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.$set(e.meta,"per_page",t.target.multiple?a:a[0])},e.changePerPage]}},[a("option",{attrs:{value:"10"}},[e._v("10")]),e._v(" "),a("option",{attrs:{value:"15"}},[e._v("15")]),e._v(" "),a("option",{attrs:{value:"20"}},[e._v("20")]),e._v(" "),a("option",{attrs:{value:"25"}},[e._v("25")])])])])])]),e._v(" "),a("div",{staticClass:"modal fade",attrs:{id:"searchModal",tabindex:"-1",role:"dialog","aria-labelledby":"searchArticles","aria-hidden":"true"}},[a("div",{staticClass:"modal-dialog modal-dialog-centered modal-lg",attrs:{role:"document"}},[a("div",{staticClass:"modal-content"},[e._m(3),e._v(" "),a("div",{staticClass:"modal-body"},[a("div",{staticClass:"form-group"},[a("label",[e._v("Name")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.searchColumnName,expression:"searchColumnName"}],staticClass:"form-control",attrs:{type:"text",autocomplete:"off",minlength:"2",maxlength:"255",required:""},domProps:{value:e.searchColumnName},on:{input:function(t){t.target.composing||(e.searchColumnName=t.target.value)}}})]),e._v(" "),a("div",{staticClass:"form-group"},[a("label",[e._v("Description")]),e._v(" "),a("textarea",{directives:[{name:"model",rawName:"v-model",value:e.searchColumnDescription,expression:"searchColumnDescription"}],staticClass:"form-control",attrs:{maxlength:"1000",required:""},domProps:{value:e.searchColumnDescription},on:{input:function(t){t.target.composing||(e.searchColumnDescription=t.target.value)}}})]),e._v(" "),a("div",{staticClass:"form-group"},[a("label",[e._v("Order By")]),e._v(" "),a("select",{directives:[{name:"model",rawName:"v-model",value:e.order_by,expression:"order_by"}],staticClass:"form-control",on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.order_by=t.target.multiple?a:a[0]}}},[a("option",{attrs:{value:"desc"}},[e._v("Newest")]),e._v(" "),a("option",{attrs:{value:"asc"}},[e._v("Oldest")])])])]),e._v(" "),a("div",{staticClass:"modal-footer clearfix"},[a("button",{staticClass:"btn btn-danger btn-sm",attrs:{type:"button"},on:{click:function(t){return t.preventDefault(),e.clear(t)}}},[e._v("Clear")]),e._v(" "),a("button",{staticClass:"btn btn-success btn-sm",attrs:{type:"button"},on:{click:function(t){return t.preventDefault(),e.search(t)}}},[e._v("Search")]),e._v(" "),a("button",{staticClass:"btn btn-secondary btn-sm",attrs:{type:"button","data-dismiss":"modal"}},[e._v("Close")])])])])])])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"content-title"},[t("h4",{staticClass:"module-title"},[this._v("PURCHASE INVOICE PAYMENT")]),this._v(" "),t("hr",{staticClass:"title-border"})])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("thead",[a("tr",[a("th",{attrs:{scope:"col"}},[e._v("Purchase Invoice #")]),e._v(" "),a("th",{attrs:{scope:"col"}},[e._v("CR #")]),e._v(" "),a("th",{attrs:{scope:"col"}},[e._v("Mode of Payment")]),e._v(" "),a("th",{attrs:{scope:"col"}},[e._v("Amount")]),e._v(" "),a("th",{attrs:{scope:"col"}},[e._v("Remaining Balance")]),e._v(" "),a("th",{attrs:{scope:"col"}},[e._v("Action")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"input-group-prepend"},[t("div",{staticClass:"input-group-text"},[this._v("Items per page")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"modal-header"},[t("h5",{staticClass:"modal-title"},[this._v("Search Item Types")]),this._v(" "),t("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[t("span",{attrs:{"aria-hidden":"true"}},[this._v("×")])])])}]}},a3NJ:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=function(e,t,a,s,r,i){var n={page:e,per_page:t,searchColumnName:a,searchColumnDescription:s,order_by:r};axios.get("/api/bill-payments",{params:n}).then(function(e){console.log(e.data),i(null,e.data)}).catch(function(e){i(e,e.res.data)})};t.default={data:function(){return{componentVal:" Item Subtype",billPayment:null,searchColumnName:null,searchColumnDescription:null,order_by:"desc",meta:{current_page:null,from:null,last_page:null,path:null,per_page:10,to:null,total:null},links:{first:null,last:null,next:null,prev:null},error:null,showProgress:!1,pageNumbers:[]}},beforeRouteEnter:function(e,t,a){null==e.query.per_page?s(e.query.page,10,e.query.searchColumnName,e.query.searchColumnDescription,e.query.order_by,function(e,t){a(function(a){return a.setData(e,t)})}):s(e.query.page,e.query.per_page,e.query.searchColumnName,e.query.searchColumnDescription,e.query.order_by,function(e,t){a(function(a){return a.setData(e,t)})})},beforeRouteUpdate:function(e,t,a){var r=this;s(e.query.page,this.meta.per_page,e.query.searchColumnName,e.query.searchColumnDescription,e.query.order_by,function(e,t){r.setData(e,t),a()})},mounted:function(){new Promise(function(e,t){axios.get("/api/invoice-payments/").then(function(t){e()})})},computed:{nextPage:function(){return this.meta.current_page+1},prevPage:function(){return this.meta.current_page-1},paginatonCount:function(){if(this.meta){var e=this.meta,t=e.current_page,a=e.last_page;return"".concat(t," of ").concat(a)}},pageCount:function(){return!(this.meta.last_page>10)},isPrevDisabled:function(){if(null==this.links.prev)return"disabled"},isNextDisabled:function(){if(null==this.links.next)return"disabled"}},methods:{goToFirstPage:function(){this.showProgress=!0,this.$router.push({name:"bill-payments.index",query:{page:1,per_page:this.meta.per_page}})},goToPage:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;this.showProgress=!0,this.$router.push({name:"bill-payments.index",query:{page:e,per_page:this.meta.per_page}})},goToLastPage:function(){this.showProgress=!0,this.$router.push({name:"bill-payments.index",query:{page:this.meta.last_page,per_page:this.meta.per_page}})},goToNextPage:function(){this.showProgress=!0,this.$router.push({name:"bill-payments.index",query:{page:this.nextPage,per_page:this.meta.per_page}})},goToPreviousPage:function(){this.showProgress=!0,this.$router.push({name:"bill-payments.index",query:{page:this.prevPage,per_page:this.meta.per_page}})},setData:function(e,t){var a=t.data,s=t.links,r=t.meta;this.pageNumbers=[],e?this.error=e.toString():(this.billPayment=a,this.links=s,this.meta=r),this.showProgress=!1,this.populatePages()},populatePages:function(){if(this.pageCount)for(var e=1;e<=this.meta.last_page;e++)this.pageNumbers.push(e);else if(this.meta.current_page<=6){this.pageNumbers.push(1),this.pageNumbers.push(2),this.pageNumbers.push(3),this.pageNumbers.push(4),this.pageNumbers.push(5),this.pageNumbers.push(6),this.pageNumbers.push(7),this.pageNumbers.push("..."),this.pageNumbers.push(this.meta.last_page-1),this.pageNumbers.push(this.meta.last_page)}else this.meta.current_page+6>=this.meta.last_page?(this.pageNumbers.push(1),this.pageNumbers.push(2),this.pageNumbers.push("..."),this.pageNumbers.push(this.meta.last_page-7),this.pageNumbers.push(this.meta.last_page-6),this.pageNumbers.push(this.meta.last_page-5),this.pageNumbers.push(this.meta.last_page-4),this.pageNumbers.push(this.meta.last_page-3),this.pageNumbers.push(this.meta.last_page-2),this.pageNumbers.push(this.meta.last_page-1),this.pageNumbers.push(this.meta.last_page)):(this.pageNumbers.push(1),this.pageNumbers.push(2),this.pageNumbers.push("..."),this.pageNumbers.push(this.meta.current_page-2),this.pageNumbers.push(this.meta.current_page-1),this.pageNumbers.push(this.meta.current_page),this.pageNumbers.push(this.meta.current_page+1),this.pageNumbers.push(this.meta.current_page+2),this.pageNumbers.push("..."),this.pageNumbers.push(this.meta.last_page-1),this.pageNumbers.push(this.meta.last_page))},isPageActive:function(e){if(e==this.$route.query.page||1==e&&null==this.$route.query.page)return"active"},changePerPage:function(){this.showProgress=!0,this.$router.push({name:"bill-payments.index",query:{page:1,per_page:this.meta.per_page}})},search:function(){$("#searchModal").modal("hide"),this.showProgress=!0,this.$router.push({name:"bill-payments.index",query:{page:1,per_page:this.meta.per_page,searchColumnName:this.searchColumnName,searchColumnDescription:this.searchColumnDescription,order_by:this.order_by}})},clear:function(){this.searchColumnName="",this.searchColumnDescription="",this.order_by="desc"},openSearchModal:function(){$("#searchModal").modal("show")}}}}});
//# sourceMappingURL=102.js.map