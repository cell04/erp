webpackJsonp([70],{Qxb2:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("div",{class:this.$store.state.showSidebar?"content-title":"spacer content-title"},[s("h4",{staticClass:"module-title"},[e._v(" SALES INVOICE")]),e._v(" "),s("hr",{staticClass:"title-border"})]),e._v(" "),s("div",{staticClass:"p-md-4"},[s("div",{staticClass:"card"},[s("div",{staticClass:"card-header clearfix"},[s("div",{staticClass:"float-left"},[e._v("\n                    Sales Invoices\n                ")]),e._v(" "),s("div",{staticClass:"float-right"},[s("router-link",{staticClass:"btn btn-primary btn-sm",attrs:{to:{name:"invoices.create"}}},[s("i",{staticClass:"fas fa-plus"}),e._v(" Create New Service Invoice")])],1)]),e._v(" "),s("div",{staticClass:"card-body"},[s("table",{staticClass:"table table-hover table-sm"},[s("caption",[s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-9"},[e._v("\n                                List of Sales Invoices - Total Sales Invoices "+e._s(this.meta.total)+"\n                            ")]),e._v(" "),s("div",{staticClass:"col-md-3"},[e.showProgress?s("div",{staticClass:"progress",attrs:{height:"30px;"}},[s("div",{staticClass:"progress-bar progress-bar-striped progress-bar-animated",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})]):e._e()])])]),e._v(" "),e._m(0),e._v(" "),e.invoices?s("tbody",e._l(e.invoices,function(t){return s("tr",[s("td",[e._v(e._s(t.reference_number))]),e._v(" "),s("td",[e._v(e._s(e._f("Upper")(t.contact.person)))]),e._v(" "),s("td",[e._v(e._s(0==t.status?"Issued":"Approved"))]),e._v(" "),s("td",[e._v(e._s(t.due_date))]),e._v(" "),s("td",[s("router-link",{staticClass:"text-secondary",attrs:{to:{name:"invoices.view",params:{id:t.id}}}},[s("i",{staticClass:"fas fa-envelope-open-text"}),e._v(" View")])],1)])})):e._e()])])]),e._v(" "),s("br"),e._v(" "),s("div",{staticClass:"clearfix"},[(e.pageCount,s("div",[s("nav",{staticClass:"float-left"},[s("ul",{staticClass:"pagination"},[s("li",{staticClass:"page-bill",class:e.isPrevDisabled},[s("a",{staticClass:"page-link",attrs:{href:"#",disabled:""},on:{click:function(t){return t.preventDefault(),e.goToPreviousPage(t)}}},[e._v("Previous")])]),e._v(" "),s("li",{staticClass:"page-bill"},[s("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(t){return t.preventDefault(),e.goToFirstPage(t)}}},[e._v("First")])]),e._v(" "),e._l(e.pageNumbers,function(t){return s("li",{key:t,staticClass:"page-bill",class:e.isPageActive(t)},[s("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(s){s.preventDefault(),e.goToPage(t)}}},[e._v(e._s(t))])])}),e._v(" "),s("li",{staticClass:"page-bill",class:e.isNextDisabled},[s("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(t){return t.preventDefault(),e.goToLastPage(t)}}},[e._v("Last")])]),e._v(" "),s("li",{staticClass:"page-bill",class:e.isNextDisabled},[s("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(t){return t.preventDefault(),e.goToNextPage(t)}}},[e._v("Next")])])],2)])])),e._v(" "),s("div",{staticClass:"float-right"},[s("form",{staticClass:"form-inline"},[s("div",{staticClass:"input-group"},[e._m(1),e._v(" "),s("select",{directives:[{name:"model",rawName:"v-model",value:e.meta.per_page,expression:"meta.per_page"}],staticClass:"custom-select",attrs:{id:"number_of_items"},on:{change:[function(t){var s=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.$set(e.meta,"per_page",t.target.multiple?s:s[0])},e.changePerPage]}},[s("option",{attrs:{value:"10"}},[e._v("10")]),e._v(" "),s("option",{attrs:{value:"15"}},[e._v("15")]),e._v(" "),s("option",{attrs:{value:"20"}},[e._v("20")]),e._v(" "),s("option",{attrs:{value:"25"}},[e._v("25")])])])])]),e._v(" "),s("div",{staticClass:"modal fade",attrs:{id:"searchModal",tabindex:"-1",role:"dialog","aria-labelledby":"searchArticles","aria-hidden":"true"}},[s("div",{staticClass:"modal-dialog modal-dialog-centered modal-lg",attrs:{role:"document"}},[s("div",{staticClass:"modal-content"},[e._m(2),e._v(" "),s("div",{staticClass:"modal-body"},[s("div",{staticClass:"form-group"},[s("label",[e._v("SKU")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.searchColumnSKU,expression:"searchColumnSKU"}],staticClass:"form-control",attrs:{type:"text",autocomplete:"off",minlength:"2",maxlength:"255",required:""},domProps:{value:e.searchColumnSKU},on:{input:function(t){t.target.composing||(e.searchColumnSKU=t.target.value)}}})]),e._v(" "),s("div",{staticClass:"form-group"},[s("label",[e._v("Name")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.searchColumnName,expression:"searchColumnName"}],staticClass:"form-control",attrs:{type:"text",autocomplete:"off",minlength:"2",maxlength:"255",required:""},domProps:{value:e.searchColumnName},on:{input:function(t){t.target.composing||(e.searchColumnName=t.target.value)}}})]),e._v(" "),s("div",{staticClass:"form-group"},[s("label",[e._v("Description")]),e._v(" "),s("textarea",{directives:[{name:"model",rawName:"v-model",value:e.searchColumnDescription,expression:"searchColumnDescription"}],staticClass:"form-control",attrs:{maxlength:"1000",required:""},domProps:{value:e.searchColumnDescription},on:{input:function(t){t.target.composing||(e.searchColumnDescription=t.target.value)}}})]),e._v(" "),s("div",{staticClass:"form-group"},[s("label",[e._v("Order By")]),e._v(" "),s("select",{directives:[{name:"model",rawName:"v-model",value:e.order_by,expression:"order_by"}],staticClass:"form-control",on:{change:function(t){var s=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.order_by=t.target.multiple?s:s[0]}}},[s("option",{attrs:{value:"desc"}},[e._v("Newest")]),e._v(" "),s("option",{attrs:{value:"asc"}},[e._v("Oldest")])])])]),e._v(" "),s("div",{staticClass:"modal-footer clearfix"},[s("button",{staticClass:"btn btn-danger btn-sm",attrs:{type:"button"},on:{click:function(t){return t.preventDefault(),e.clear(t)}}},[e._v("Clear")]),e._v(" "),s("button",{staticClass:"btn btn-success btn-sm",attrs:{type:"button"},on:{click:function(t){return t.preventDefault(),e.search(t)}}},[e._v("Search")]),e._v(" "),s("button",{staticClass:"btn btn-secondary btn-sm",attrs:{type:"button","data-dismiss":"modal"}},[e._v("Close")])])])])])])])])},staticRenderFns:[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("thead",[s("tr",[s("th",{attrs:{scope:"col"}},[e._v("Sales Invoice #")]),e._v(" "),s("th",{attrs:{scope:"col"}},[e._v("Customer")]),e._v(" "),s("th",{attrs:{scope:"col"}},[e._v("Status")]),e._v(" "),s("th",{attrs:{scope:"col"}},[e._v("Date")]),e._v(" "),s("th",{attrs:{scope:"col"}},[e._v("Action")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"input-group-prepend"},[t("div",{staticClass:"input-group-text"},[this._v("Items per page")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"modal-header"},[t("h5",{staticClass:"modal-title"},[this._v("Search For Bills")]),this._v(" "),t("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[t("span",{attrs:{"aria-hidden":"true"}},[this._v("×")])])])}]}},gsX7:function(e,t,s){var a=s("VU/8")(s("sYQg"),s("Qxb2"),!1,null,null,null);e.exports=a.exports},sYQg:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(e,t,s,a,r,i,o){var n={page:e,per_page:t,searchColumnSKU:s,searchColumnName:a,searchColumnDescription:r,order_by:i};axios.get("/api/invoices",{params:n}).then(function(e){o(null,e.data)}).catch(function(e){401==e.response.status&&location.reload(),500==e.response.status&&alert("Kindly report this issue to the devs.")})};t.default={data:function(){return{invoices:null,searchColumnSKU:"",searchColumnName:"",searchColumnDescription:"",order_by:"desc",meta:{current_page:null,from:null,last_page:null,path:null,per_page:10,to:null,total:null},links:{first:null,last:null,next:null,prev:null},error:null,showProgress:!1,pageNumbers:[]}},filters:{Upper:function(e){return e.toUpperCase()}},beforeRouteEnter:function(e,t,s){null==e.query.per_page?a(e.query.page,10,e.query.searchColumnSKU,e.query.searchColumnName,e.query.searchColumnDescription,e.query.order_by,function(e,t){s(function(s){return s.setData(e,t)})}):a(e.query.page,e.query.per_page,e.query.searchColumnSKU,e.query.searchColumnName,e.query.searchColumnDescription,e.query.order_by,function(e,t){s(function(s){return s.setData(e,t)})})},beforeRouteUpdate:function(e,t,s){var r=this;a(e.query.page,this.meta.per_page,this.searchColumnSKU,this.searchColumnName,this.searchColumnDescription,this.order_by,function(e,t){r.setData(e,t),s()})},computed:{nextPage:function(){return this.meta.current_page+1},prevPage:function(){return this.meta.current_page-1},paginatonCount:function(){if(this.meta){var e=this.meta,t=e.current_page,s=e.last_page;return"".concat(t," of ").concat(s)}},pageCount:function(){return!(this.meta.last_page>10)},isPrevDisabled:function(){if(null==this.links.prev)return"disabled"},isNextDisabled:function(){if(null==this.links.next)return"disabled"}},methods:{goToFirstPage:function(){this.showProgress=!0,this.$router.push({name:"invoices.index",query:{page:1,per_page:this.meta.per_page,searchColumnSKU:this.searchColumnSKU,searchColumnName:this.searchColumnName,searchColumnDescription:this.searchColumnDescription,order_by:this.order_by}})},goToPage:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;this.showProgress=!0,this.$router.push({name:"invoices.index",query:{page:e,per_page:this.meta.per_page,searchColumnSKU:this.searchColumnSKU,searchColumnName:this.searchColumnName,searchColumnDescription:this.searchColumnDescription,order_by:this.order_by}})},goToLastPage:function(){this.showProgress=!0,this.$router.push({name:"invoices.index",query:{page:this.meta.last_page,per_page:this.meta.per_page,searchColumnSKU:this.searchColumnSKU,searchColumnName:this.searchColumnName,searchColumnDescription:this.searchColumnDescription,order_by:this.order_by}})},goToNextPage:function(){this.showProgress=!0,this.$router.push({name:"invoices.index",query:{page:this.nextPage,per_page:this.meta.per_page,searchColumnSKU:this.searchColumnSKU,searchColumnName:this.searchColumnName,searchColumnDescription:this.searchColumnDescription,order_by:this.order_by}})},goToPreviousPage:function(){this.showProgress=!0,this.$router.push({name:"invoices.index",query:{page:this.prevPage,per_page:this.meta.per_page,searchColumnSKU:this.searchColumnSKU,searchColumnName:this.searchColumnName,searchColumnDescription:this.searchColumnDescription,order_by:this.order_by}})},setData:function(e,t){var s=t.data,a=t.links,r=t.meta;this.pageNumbers=[],e?this.error=e.toString():(this.invoices=s,this.links=a,this.meta=r),this.showProgress=!1,this.populatePages()},populatePages:function(){if(this.pageCount)for(var e=1;e<=this.meta.last_page;e++)this.pageNumbers.push(e);else if(this.meta.current_page<=6){this.pageNumbers.push(1),this.pageNumbers.push(2),this.pageNumbers.push(3),this.pageNumbers.push(4),this.pageNumbers.push(5),this.pageNumbers.push(6),this.pageNumbers.push(7),this.pageNumbers.push("..."),this.pageNumbers.push(this.meta.last_page-1),this.pageNumbers.push(this.meta.last_page)}else this.meta.current_page+6>=this.meta.last_page?(this.pageNumbers.push(1),this.pageNumbers.push(2),this.pageNumbers.push("..."),this.pageNumbers.push(this.meta.last_page-7),this.pageNumbers.push(this.meta.last_page-6),this.pageNumbers.push(this.meta.last_page-5),this.pageNumbers.push(this.meta.last_page-4),this.pageNumbers.push(this.meta.last_page-3),this.pageNumbers.push(this.meta.last_page-2),this.pageNumbers.push(this.meta.last_page-1),this.pageNumbers.push(this.meta.last_page)):(this.pageNumbers.push(1),this.pageNumbers.push(2),this.pageNumbers.push("..."),this.pageNumbers.push(this.meta.current_page-2),this.pageNumbers.push(this.meta.current_page-1),this.pageNumbers.push(this.meta.current_page),this.pageNumbers.push(this.meta.current_page+1),this.pageNumbers.push(this.meta.current_page+2),this.pageNumbers.push("..."),this.pageNumbers.push(this.meta.last_page-1),this.pageNumbers.push(this.meta.last_page))},isPageActive:function(e){if(e==this.$route.query.page||1==e&&null==this.$route.query.page)return"active"},changePerPage:function(){this.showProgress=!0,this.$router.push({name:"invoices.index",query:{page:1,per_page:this.meta.per_page,searchColumnSKU:this.searchColumnSKU,searchColumnName:this.searchColumnName,searchColumnDescription:this.searchColumnDescription,order_by:this.order_by}})},search:function(){$("#searchModal").modal("hide"),this.showProgress=!0,this.$router.push({name:"invoices.index",query:{page:1,per_page:this.meta.per_page,searchColumnSKU:this.searchColumnSKU,searchColumnName:this.searchColumnName,searchColumnDescription:this.searchColumnDescription,order_by:this.order_by}})},clear:function(){this.searchColumnSKU="",this.searchColumnName="",this.searchColumnDescription="",this.order_by="desc"},openSearchModal:function(){$("#searchModal").modal("show")}}}}});
//# sourceMappingURL=70.js.map