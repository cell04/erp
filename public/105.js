webpackJsonp([105],{EHvF:function(e,t,s){var a=s("VU/8")(s("rG4q"),s("goyC"),!1,null,null,null);e.exports=a.exports},goyC:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("div",{class:this.$store.state.showSidebar?"content-title":"spacer content-title"},[s("h4",{staticClass:"module-title"},[e._v("BID SHEET")]),e._v(" "),s("hr",{staticClass:"title-border"})]),e._v(" "),s("div",{staticClass:"p-md-4"},[s("div",{staticClass:"card"},[s("div",{staticClass:"card-header clearfix"},[s("div",{staticClass:"float-left"},[e._v("\n                    Bid Sheet\n                ")]),e._v(" "),s("div",{staticClass:"float-right"},[s("router-link",{staticClass:"btn btn-primary btn-sm",attrs:{to:{name:"bid-sheets.create"}}},[s("i",{staticClass:"fas fa-plus"}),e._v(" Create New Bid Sheet")])],1)]),e._v(" "),s("div",{staticClass:"card-body"},[s("table",{staticClass:"table table-hover table-sm"},[s("caption",[s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-9"},[e._v("\n                                List of Bid Sheets - Total Bid Sheets "+e._s(this.meta.total)+"\n                            ")]),e._v(" "),s("div",{staticClass:"col-md-3"},[e.showProgress?s("div",{staticClass:"progress",attrs:{height:"30px;"}},[s("div",{staticClass:"progress-bar progress-bar-striped progress-bar-animated",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})]):e._e()])])]),e._v(" "),e._m(0),e._v(" "),e.bidsheets?s("tbody",e._l(e.bidsheets,function(t,a){return s("tr",{key:a},[s("td",[e._v(e._s(t.bid_sheet_number))]),e._v(" "),s("td",[e._v(e._s(e._f("Upper")(t.contact.person)))]),e._v(" "),s("td",[e._v(e._s(t.status))]),e._v(" "),s("td",[e._v(e._s(e._f("DateFormat")(t.created_at)))]),e._v(" "),s("td",[s("router-link",{staticClass:"text-secondary",attrs:{to:{name:"bid-sheets.view",params:{id:t.id}}}},[s("i",{staticClass:"fas fa-envelope-open-text"}),e._v(" View")])],1)])}),0):e._e()])])]),e._v(" "),s("br"),e._v(" "),s("div",{staticClass:"clearfix"},[(e.pageCount,s("div",[s("nav",{staticClass:"float-left"},[s("ul",{staticClass:"pagination"},[s("li",{staticClass:"page-item",class:e.isPrevDisabled},[s("a",{staticClass:"page-link",attrs:{href:"#",disabled:""},on:{click:function(t){return t.preventDefault(),e.goToPreviousPage(t)}}},[e._v("Previous")])]),e._v(" "),s("li",{staticClass:"page-item"},[s("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(t){return t.preventDefault(),e.goToFirstPage(t)}}},[e._v("First")])]),e._v(" "),e._l(e.pageNumbers,function(t){return s("li",{key:t,staticClass:"page-item",class:e.isPageActive(t)},[s("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(s){s.preventDefault(),e.goToPage(t)}}},[e._v(e._s(t))])])}),e._v(" "),s("li",{staticClass:"page-item",class:e.isNextDisabled},[s("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(t){return t.preventDefault(),e.goToLastPage(t)}}},[e._v("Last")])]),e._v(" "),s("li",{staticClass:"page-item",class:e.isNextDisabled},[s("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(t){return t.preventDefault(),e.goToNextPage(t)}}},[e._v("Next")])])],2)])])),e._v(" "),s("div",{staticClass:"float-right"},[s("form",{staticClass:"form-inline"},[s("div",{staticClass:"input-group"},[e._m(1),e._v(" "),s("select",{directives:[{name:"model",rawName:"v-model",value:e.meta.per_page,expression:"meta.per_page"}],staticClass:"custom-select",attrs:{id:"number_of_items"},on:{change:[function(t){var s=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.$set(e.meta,"per_page",t.target.multiple?s:s[0])},e.changePerPage]}},[s("option",{attrs:{value:"10"}},[e._v("10")]),e._v(" "),s("option",{attrs:{value:"15"}},[e._v("15")]),e._v(" "),s("option",{attrs:{value:"20"}},[e._v("20")]),e._v(" "),s("option",{attrs:{value:"25"}},[e._v("25")])])])])]),e._v(" "),s("div",{staticClass:"modal fade",attrs:{id:"searchModal",tabindex:"-1",role:"dialog","aria-labelledby":"searchArticles","aria-hidden":"true"}},[s("div",{staticClass:"modal-dialog modal-dialog-centered modal-lg",attrs:{role:"document"}},[s("div",{staticClass:"modal-content"},[e._m(2),e._v(" "),s("div",{staticClass:"modal-body"},[s("div",{staticClass:"form-group"},[s("label",[e._v("Date")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.searchDate,expression:"searchDate"}],staticClass:"form-control",attrs:{type:"text",autocomplete:"off",minlength:"2",maxlength:"255",required:""},domProps:{value:e.searchDate},on:{input:function(t){t.target.composing||(e.searchDate=t.target.value)}}})]),e._v(" "),s("div",{staticClass:"form-group"},[s("label",[e._v("Purchase Order #")]),e._v(" "),s("textarea",{directives:[{name:"model",rawName:"v-model",value:e.searchPurchaseOrderNumber,expression:"searchPurchaseOrderNumber"}],staticClass:"form-control",attrs:{maxlength:"1000",required:""},domProps:{value:e.searchPurchaseOrderNumber},on:{input:function(t){t.target.composing||(e.searchPurchaseOrderNumber=t.target.value)}}})]),e._v(" "),s("div",{staticClass:"form-group"},[s("label",[e._v("Status")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.searchStatus,expression:"searchStatus"}],staticClass:"form-control",attrs:{type:"text",autocomplete:"off",minlength:"2",maxlength:"255",required:""},domProps:{value:e.searchStatus},on:{input:function(t){t.target.composing||(e.searchStatus=t.target.value)}}})]),e._v(" "),s("div",{staticClass:"form-group"},[s("label",[e._v("Reference #")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.searchReferenceNumber,expression:"searchReferenceNumber"}],staticClass:"form-control",attrs:{type:"text",autocomplete:"off",minlength:"2",maxlength:"255",required:""},domProps:{value:e.searchReferenceNumber},on:{input:function(t){t.target.composing||(e.searchReferenceNumber=t.target.value)}}})]),e._v(" "),s("div",{staticClass:"form-group"},[s("label",[e._v("Total")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.searchTotal,expression:"searchTotal"}],staticClass:"form-control",attrs:{type:"text",autocomplete:"off",minlength:"2",maxlength:"255",required:""},domProps:{value:e.searchTotal},on:{input:function(t){t.target.composing||(e.searchTotal=t.target.value)}}})]),e._v(" "),s("div",{staticClass:"form-group"},[s("label",[e._v("Order By")]),e._v(" "),s("select",{directives:[{name:"model",rawName:"v-model",value:e.order_by,expression:"order_by"}],staticClass:"form-control",on:{change:function(t){var s=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.order_by=t.target.multiple?s:s[0]}}},[s("option",{attrs:{value:"desc"}},[e._v("Newest")]),e._v(" "),s("option",{attrs:{value:"asc"}},[e._v("Oldest")])])])]),e._v(" "),s("div",{staticClass:"modal-footer clearfix"},[s("button",{staticClass:"btn btn-danger btn-sm",attrs:{type:"button"},on:{click:function(t){return t.preventDefault(),e.clear(t)}}},[e._v("Clear")]),e._v(" "),s("button",{staticClass:"btn btn-success btn-sm",attrs:{type:"button"},on:{click:function(t){return t.preventDefault(),e.search(t)}}},[e._v("Search")]),e._v(" "),s("button",{staticClass:"btn btn-secondary btn-sm",attrs:{type:"button","data-dismiss":"modal"}},[e._v("Close")])])])])])])])])},staticRenderFns:[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("thead",[s("tr",[s("th",{attrs:{scope:"col"}},[e._v("Bid Sheet #")]),e._v(" "),s("th",{attrs:{scope:"col"}},[e._v("Customer")]),e._v(" "),s("th",{attrs:{scope:"col"}},[e._v("Status")]),e._v(" "),s("th",{attrs:{scope:"col"}},[e._v("Date Created")]),e._v(" "),s("th",{attrs:{scope:"col"}},[e._v("Action")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"input-group-prepend"},[t("div",{staticClass:"input-group-text"},[this._v("Items per page")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"modal-header"},[t("h5",{staticClass:"modal-title"},[this._v("Search For Orders")]),this._v(" "),t("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[t("span",{attrs:{"aria-hidden":"true"}},[this._v("×")])])])}]}},rG4q:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(e,t,s,a,r,i,u,o,c){var h={page:e,per_page:t,searchDate:s,searchPurchaseOrderNumber:a,searchStatus:r,searchReferenceNumber:i,searchTotal:u,order_by:o};axios.get("/api/bid-sheets",{params:h}).then(function(e){c(null,e.data)}).catch(function(e){401==e.response.status&&location.reload(),500==e.response.status&&alert("Kindly report this issue to the devs.")})};t.default={data:function(){return{bidsheets:[],searchDate:"",searchPurchaseOrderNumber:"",searchStatus:"",searchReferenceNumber:"",searchTotal:"",order_by:"desc",meta:{current_page:null,from:null,last_page:null,path:null,per_page:10,to:null,total:null},links:{first:null,last:null,next:null,prev:null},error:null,showProgress:!1,pageNumbers:[]}},filters:{Upper:function(e){return e.toUpperCase()},DateFormat:function(e){if(e)return moment(e).format("M/DD/YYYY")}},beforeRouteEnter:function(e,t,s){null==e.query.per_page?a(e.query.page,10,e.query.searchDate,e.query.searchPurchaseOrderNumber,e.query.searchStatus,e.query.searchReferenceNumber,e.query.searchTotal,e.query.order_by,function(e,t){s(function(s){return s.setData(e,t)})}):a(e.query.page,e.query.per_page,e.query.searchDate,e.query.searchPurchaseOrderNumber,e.query.searchStatus,e.query.searchReferenceNumber,e.query.searchTotal,e.query.order_by,function(e,t){s(function(s){return s.setData(e,t)})})},beforeRouteUpdate:function(e,t,s){var r=this;a(e.query.page,this.meta.per_page,this.searchDate,this.searchPurchaseOrderNumber,this.searchStatus,this.searchReferenceNumber,this.searchTotal,this.order_by,function(e,t){r.setData(e,t),s()})},computed:{nextPage:function(){return this.meta.current_page+1},prevPage:function(){return this.meta.current_page-1},paginatonCount:function(){if(this.meta){var e=this.meta,t=e.current_page,s=e.last_page;return"".concat(t," of ").concat(s)}},pageCount:function(){return!(this.meta.last_page>10)},isPrevDisabled:function(){if(null==this.links.prev)return"disabled"},isNextDisabled:function(){if(null==this.links.next)return"disabled"}},methods:{closePO:function(e,t){var s={purchase_order_id:e};confirm("Are you sure you want to close ".concat(t))&&axios.post("/api/purchase-orders/close",s).then(function(e){console.log(JSON.stringify(e.data)),alert("Success! ".concat(t," is now closed")),location.reload()}).catch(function(e){console.log(e),alert("Error! Can't close purchase order")})},goToFirstPage:function(){this.showProgress=!0,this.$router.push({name:"purchase-orders.index",query:{page:1,per_page:this.meta.per_page,searchDate:this.searchDate,searchPurchaseOrderNumber:this.searchPurchaseOrderNumber,searchStatus:this.searchStatus,searchReferenceNumber:this.searchReferenceNumber,searchTotal:this.searchTotal,order_by:this.order_by}})},goToPage:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;this.showProgress=!0,this.$router.push({name:"purchase-orders.index",query:{page:e,per_page:this.meta.per_page,searchDate:this.searchDate,searchPurchaseOrderNumber:this.searchPurchaseOrderNumber,searchStatus:this.searchStatus,searchReferenceNumber:this.searchReferenceNumber,searchTotal:this.searchTotal,order_by:this.order_by}})},goToLastPage:function(){this.showProgress=!0,this.$router.push({name:"purchase-orders.index",query:{page:this.meta.last_page,per_page:this.meta.per_page,searchDate:this.searchDate,searchPurchaseOrderNumber:this.searchPurchaseOrderNumber,searchStatus:this.searchStatus,searchReferenceNumber:this.searchReferenceNumber,searchTotal:this.searchTotal,order_by:this.order_by}})},goToNextPage:function(){this.showProgress=!0,this.$router.push({name:"purchase-orders.index",query:{page:this.nextPage,per_page:this.meta.per_page,searchDate:this.searchDate,searchPurchaseOrderNumber:this.searchPurchaseOrderNumber,searchStatus:this.searchStatus,searchReferenceNumber:this.searchReferenceNumber,searchTotal:this.searchTotal,order_by:this.order_by}})},goToPreviousPage:function(){this.showProgress=!0,this.$router.push({name:"purchase-orders.index",query:{page:this.prevPage,per_page:this.meta.per_page,searchDate:this.searchDate,searchPurchaseOrderNumber:this.searchPurchaseOrderNumber,searchStatus:this.searchStatus,searchReferenceNumber:this.searchReferenceNumber,searchTotal:this.searchTotal,order_by:this.order_by}})},setData:function(e,t){var s=t.data,a=t.links,r=t.meta;if(this.pageNumbers=[],e)this.error=e.toString();else{var i={0:"Issued",1:"Admin Approved",2:"Admin Cancelled",3:"Customer Approved",4:"Customer Cancelled",5:"Closed"};s.map(function(e){e.status=i[e.status]}),this.bidsheets=s,this.links=a,this.meta=r}this.showProgress=!1,this.populatePages()},populatePages:function(){if(this.pageCount)for(var e=1;e<=this.meta.last_page;e++)this.pageNumbers.push(e);else if(this.meta.current_page<=6){this.pageNumbers.push(1),this.pageNumbers.push(2),this.pageNumbers.push(3),this.pageNumbers.push(4),this.pageNumbers.push(5),this.pageNumbers.push(6),this.pageNumbers.push(7),this.pageNumbers.push("..."),this.pageNumbers.push(this.meta.last_page-1),this.pageNumbers.push(this.meta.last_page)}else this.meta.current_page+6>=this.meta.last_page?(this.pageNumbers.push(1),this.pageNumbers.push(2),this.pageNumbers.push("..."),this.pageNumbers.push(this.meta.last_page-7),this.pageNumbers.push(this.meta.last_page-6),this.pageNumbers.push(this.meta.last_page-5),this.pageNumbers.push(this.meta.last_page-4),this.pageNumbers.push(this.meta.last_page-3),this.pageNumbers.push(this.meta.last_page-2),this.pageNumbers.push(this.meta.last_page-1),this.pageNumbers.push(this.meta.last_page)):(this.pageNumbers.push(1),this.pageNumbers.push(2),this.pageNumbers.push("..."),this.pageNumbers.push(this.meta.current_page-2),this.pageNumbers.push(this.meta.current_page-1),this.pageNumbers.push(this.meta.current_page),this.pageNumbers.push(this.meta.current_page+1),this.pageNumbers.push(this.meta.current_page+2),this.pageNumbers.push("..."),this.pageNumbers.push(this.meta.last_page-1),this.pageNumbers.push(this.meta.last_page))},isPageActive:function(e){if(e==this.$route.query.page||1==e&&null==this.$route.query.page)return"active"},changePerPage:function(){this.showProgress=!0,this.$router.push({name:"purchase-orders.index",query:{page:1,per_page:this.meta.per_page,searchDate:this.searchDate,searchPurchaseOrderNumber:this.searchPurchaseOrderNumber,searchStatus:this.searchStatus,searchReferenceNumber:this.searchReferenceNumber,searchTotal:this.searchTotal,order_by:this.order_by}})},search:function(){$("#searchModal").modal("hide"),this.showProgress=!0,this.$router.push({name:"purchase-orders.index",query:{page:1,per_page:this.meta.per_page,searchDate:this.searchDate,searchPurchaseOrderNumber:this.searchPurchaseOrderNumber,searchStatus:this.searchStatus,searchReferenceNumber:this.searchReferenceNumber,searchTotal:this.searchTotal,order_by:this.order_by}})},clear:function(){this.searchDate="",this.searchPurchaseOrderNumber="",this.searchStatus="",this.searchReferenceNumber="",this.searchTotal="",this.order_by="desc"},openSearchModal:function(){$("#searchModal").modal("show")}}}}});
//# sourceMappingURL=105.js.map