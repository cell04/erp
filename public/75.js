webpackJsonp([75],{AGAk:function(t,e,a){var s=a("VU/8")(a("x9Zg"),a("jwqe"),!1,null,null,null);t.exports=s.exports},jwqe:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"card"},[a("div",{staticClass:"card-header clearfix"},[a("div",{staticClass:"float-left"},[t._v("\n                Default Accounts / View Default Account\n            ")]),t._v(" "),a("div",{staticClass:"float-right"},[a("router-link",{staticClass:"btn-primary btn-sm",attrs:{to:{name:"default-accounts.create"}}},[a("i",{staticClass:"fas fa-plus"}),t._v(" Create Default Account")])],1)]),t._v(" "),a("div",{staticClass:"card-body"},[a("table",{staticClass:"table table-hover table-sm"},[a("caption",[a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-9"},[t._v("\n                            List of Default Account - Total Items "+t._s(this.meta.total)+"\n                        ")]),t._v(" "),a("div",{staticClass:"col-md-3"},[t.showProgress?a("div",{staticClass:"progress",attrs:{height:"30px;"}},[a("div",{staticClass:"progress-bar progress-bar-striped progress-bar-animated",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})]):t._e()])])]),t._v(" "),t._m(0),t._v(" "),t.itemTypes?a("tbody",t._l(t.itemTypes,function(e){var s=e.id,r=e.name,i=e.display_name,n=e.description;return a("tr",{key:s},[a("td",[t._v(t._s(r))]),t._v(" "),a("td",[t._v(t._s(i))]),t._v(" "),a("td",[t._v(t._s(n))]),t._v(" "),a("td",[a("router-link",{staticClass:"text-secondary",attrs:{to:{name:"default-accounts.view",params:{id:s}}}},[a("i",{staticClass:"fas fa-envelope-open-text"}),t._v(" View\n                            ")]),t._v("\n                            |\n                            "),a("router-link",{staticClass:"text-secondary",attrs:{to:{name:"default-accounts.edit",params:{id:s}}}},[a("i",{staticClass:"fas fa-edit"}),t._v(" Edit\n                            ")])],1)])})):t._e()])])]),t._v(" "),a("br"),t._v(" "),a("div",{staticClass:"clearfix"},[(t.pageCount,a("div",[a("nav",{staticClass:"float-left"},[a("ul",{staticClass:"pagination"},[a("li",{staticClass:"page-item",class:t.isPrevDisabled},[a("a",{staticClass:"page-link",attrs:{href:"#",disabled:""},on:{click:function(e){return e.preventDefault(),t.goToPreviousPage(e)}}},[t._v("Previous")])]),t._v(" "),a("li",{staticClass:"page-item"},[a("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.goToFirstPage(e)}}},[t._v("First")])]),t._v(" "),t._l(t.pageNumbers,function(e){return a("li",{key:e,staticClass:"page-item",class:t.isPageActive(e)},[a("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(a){a.preventDefault(),t.goToPage(e)}}},[t._v(t._s(e))])])}),t._v(" "),a("li",{staticClass:"page-item",class:t.isNextDisabled},[a("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.goToLastPage(e)}}},[t._v("Last")])]),t._v(" "),a("li",{staticClass:"page-item",class:t.isNextDisabled},[a("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.goToNextPage(e)}}},[t._v("Next")])])],2)])])),t._v(" "),a("div",{staticClass:"float-right"},[a("form",{staticClass:"form-inline"},[a("button",{staticClass:"btn btn-primary mr-2",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.openSearchModal(e)}}},[t._v("Search Default Accounts")]),t._v(" "),a("div",{staticClass:"input-group"},[t._m(1),t._v(" "),a("select",{directives:[{name:"model",rawName:"v-model",value:t.meta.per_page,expression:"meta.per_page"}],staticClass:"custom-select",attrs:{id:"number_of_items"},on:{change:[function(e){var a=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.$set(t.meta,"per_page",e.target.multiple?a:a[0])},t.changePerPage]}},[a("option",{attrs:{value:"10"}},[t._v("10")]),t._v(" "),a("option",{attrs:{value:"15"}},[t._v("15")]),t._v(" "),a("option",{attrs:{value:"20"}},[t._v("20")]),t._v(" "),a("option",{attrs:{value:"25"}},[t._v("25")])])])])])]),t._v(" "),a("div",{staticClass:"modal fade",attrs:{id:"searchModal",tabindex:"-1",role:"dialog","aria-labelledby":"searchArticles","aria-hidden":"true"}},[a("div",{staticClass:"modal-dialog modal-dialog-centered modal-lg",attrs:{role:"document"}},[a("div",{staticClass:"modal-content"},[t._m(2),t._v(" "),a("div",{staticClass:"modal-body"},[a("div",{staticClass:"form-group"},[a("label",[t._v("Name")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.searchColumnName,expression:"searchColumnName"}],staticClass:"form-control",attrs:{type:"text",autocomplete:"off",minlength:"2",maxlength:"255",required:""},domProps:{value:t.searchColumnName},on:{input:function(e){e.target.composing||(t.searchColumnName=e.target.value)}}})]),t._v(" "),a("div",{staticClass:"form-group"},[a("label",[t._v("Description")]),t._v(" "),a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.searchColumnDescription,expression:"searchColumnDescription"}],staticClass:"form-control",attrs:{maxlength:"1000",required:""},domProps:{value:t.searchColumnDescription},on:{input:function(e){e.target.composing||(t.searchColumnDescription=e.target.value)}}})]),t._v(" "),a("div",{staticClass:"form-group"},[a("label",[t._v("Order By")]),t._v(" "),a("select",{directives:[{name:"model",rawName:"v-model",value:t.order_by,expression:"order_by"}],staticClass:"form-control",on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.order_by=e.target.multiple?a:a[0]}}},[a("option",{attrs:{value:"desc"}},[t._v("Newest")]),t._v(" "),a("option",{attrs:{value:"asc"}},[t._v("Oldest")])])])]),t._v(" "),a("div",{staticClass:"modal-footer clearfix"},[a("button",{staticClass:"btn btn-danger btn-sm",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.clear(e)}}},[t._v("Clear")]),t._v(" "),a("button",{staticClass:"btn btn-success btn-sm",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.search(e)}}},[t._v("Search")]),t._v(" "),a("button",{staticClass:"btn btn-secondary btn-sm",attrs:{type:"button","data-dismiss":"modal"}},[t._v("Close")])])])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("thead",[e("tr",[e("th",{attrs:{scope:"col"}},[this._v("Name")]),this._v(" "),e("th",{attrs:{scope:"col"}},[this._v("Display Name")]),this._v(" "),e("th",{attrs:{scope:"col"}},[this._v("Description")]),this._v(" "),e("th",{attrs:{scope:"col"}},[this._v("Action")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"input-group-prepend"},[e("div",{staticClass:"input-group-text"},[this._v("Items per page")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"modal-header"},[e("h5",{staticClass:"modal-title"},[this._v("Search Item Types")]),this._v(" "),e("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[e("span",{attrs:{"aria-hidden":"true"}},[this._v("×")])])])}]}},x9Zg:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=function(t,e,a,s,r,i){var n={page:t,per_page:e,searchColumnName:a,searchColumnDescription:s,order_by:r};axios.get("/api/item-types",{params:n}).then(function(t){i(null,t.data)}).catch(function(t){i(t,t.res.data)})};e.default={data:function(){return{componentVal:"Contact",itemTypes:null,searchColumnName:null,searchColumnDescription:null,order_by:"desc",meta:{current_page:null,from:null,last_page:null,path:null,per_page:10,to:null,total:null},links:{first:null,last:null,next:null,prev:null},error:null,showProgress:!1,pageNumbers:[]}},beforeRouteEnter:function(t,e,a){null==t.query.per_page?s(t.query.page,10,t.query.searchColumnName,t.query.searchColumnDescription,t.query.order_by,function(t,e){a(function(a){return a.setData(t,e)})}):s(t.query.page,t.query.per_page,t.query.searchColumnName,t.query.searchColumnDescription,t.query.order_by,function(t,e){a(function(a){return a.setData(t,e)})})},beforeRouteUpdate:function(t,e,a){var r=this;s(t.query.page,this.meta.per_page,t.query.searchColumnName,t.query.searchColumnDescription,t.query.order_by,function(t,e){r.setData(t,e),a()})},computed:{nextPage:function(){return this.meta.current_page+1},prevPage:function(){return this.meta.current_page-1},paginatonCount:function(){if(this.meta){var t=this.meta,e=t.current_page,a=t.last_page;return"".concat(e," of ").concat(a)}},pageCount:function(){return!(this.meta.last_page>10)},isPrevDisabled:function(){if(null==this.links.prev)return"disabled"},isNextDisabled:function(){if(null==this.links.next)return"disabled"}},methods:{goToFirstPage:function(){this.showProgress=!0,this.$router.push({name:"default-accounts.index",query:{page:1,per_page:this.meta.per_page}})},goToPage:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;this.showProgress=!0,this.$router.push({name:"default-accounts.index",query:{page:t,per_page:this.meta.per_page}})},goToLastPage:function(){this.showProgress=!0,this.$router.push({name:"default-accounts.index",query:{page:this.meta.last_page,per_page:this.meta.per_page}})},goToNextPage:function(){this.showProgress=!0,this.$router.push({name:"default-accounts.index",query:{page:this.nextPage,per_page:this.meta.per_page}})},goToPreviousPage:function(){this.showProgress=!0,this.$router.push({name:"default-accounts.index",query:{page:this.prevPage,per_page:this.meta.per_page}})},setData:function(t,e){var a=e.data,s=e.links,r=e.meta;this.pageNumbers=[],t?this.error=t.toString():(this.itemTypes=a,this.links=s,this.meta=r),this.showProgress=!1,this.populatePages()},populatePages:function(){if(this.pageCount)for(var t=1;t<=this.meta.last_page;t++)this.pageNumbers.push(t);else if(this.meta.current_page<=6){this.pageNumbers.push(1),this.pageNumbers.push(2),this.pageNumbers.push(3),this.pageNumbers.push(4),this.pageNumbers.push(5),this.pageNumbers.push(6),this.pageNumbers.push(7),this.pageNumbers.push("..."),this.pageNumbers.push(this.meta.last_page-1),this.pageNumbers.push(this.meta.last_page)}else this.meta.current_page+6>=this.meta.last_page?(this.pageNumbers.push(1),this.pageNumbers.push(2),this.pageNumbers.push("..."),this.pageNumbers.push(this.meta.last_page-7),this.pageNumbers.push(this.meta.last_page-6),this.pageNumbers.push(this.meta.last_page-5),this.pageNumbers.push(this.meta.last_page-4),this.pageNumbers.push(this.meta.last_page-3),this.pageNumbers.push(this.meta.last_page-2),this.pageNumbers.push(this.meta.last_page-1),this.pageNumbers.push(this.meta.last_page)):(this.pageNumbers.push(1),this.pageNumbers.push(2),this.pageNumbers.push("..."),this.pageNumbers.push(this.meta.current_page-2),this.pageNumbers.push(this.meta.current_page-1),this.pageNumbers.push(this.meta.current_page),this.pageNumbers.push(this.meta.current_page+1),this.pageNumbers.push(this.meta.current_page+2),this.pageNumbers.push("..."),this.pageNumbers.push(this.meta.last_page-1),this.pageNumbers.push(this.meta.last_page))},isPageActive:function(t){if(t==this.$route.query.page||1==t&&null==this.$route.query.page)return"active"},changePerPage:function(){this.showProgress=!0,this.$router.push({name:"default-accounts.index",query:{page:1,per_page:this.meta.per_page}})},search:function(){$("#searchModal").modal("hide"),this.showProgress=!0,this.$router.push({name:"default-accounts.index",query:{page:1,per_page:this.meta.per_page,searchColumnName:this.searchColumnName,searchColumnDescription:this.searchColumnDescription,order_by:this.order_by}})},clear:function(){this.searchColumnName="",this.searchColumnDescription="",this.order_by="desc"},openSearchModal:function(){$("#searchModal").modal("show")}}}}});
//# sourceMappingURL=75.js.map