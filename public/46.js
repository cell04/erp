webpackJsonp([46],{"KF/x":function(e,t,s){var a=s("VU/8")(s("ewYH"),s("wVPc"),!1,null,null,null);e.exports=a.exports},ewYH:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(e,t,s,a,r,i){var n={page:e,per_page:t,searchColumnName:s,searchColumnDescription:a,order_by:r};axios.get("/api/item-types",{params:n}).then(function(e){i(null,e.data)}).catch(function(e){i(e,e.res.data)})};t.default={data:function(){return{componentVal:"Contact",itemTypes:null,searchColumnName:null,searchColumnDescription:null,order_by:"desc",meta:{current_page:null,from:null,last_page:null,path:null,per_page:10,to:null,total:null},links:{first:null,last:null,next:null,prev:null},error:null,showProgress:!1,pageNumbers:[]}},beforeRouteEnter:function(e,t,s){null==e.query.per_page?a(e.query.page,10,e.query.searchColumnName,e.query.searchColumnDescription,e.query.order_by,function(e,t){s(function(s){return s.setData(e,t)})}):a(e.query.page,e.query.per_page,e.query.searchColumnName,e.query.searchColumnDescription,e.query.order_by,function(e,t){s(function(s){return s.setData(e,t)})})},beforeRouteUpdate:function(e,t,s){var r=this;a(e.query.page,this.meta.per_page,e.query.searchColumnName,e.query.searchColumnDescription,e.query.order_by,function(e,t){r.setData(e,t),s()})},computed:{nextPage:function(){return this.meta.current_page+1},prevPage:function(){return this.meta.current_page-1},paginatonCount:function(){if(this.meta){var e=this.meta;return e.current_page+" of "+e.last_page}},pageCount:function(){return!(this.meta.last_page>10)},isPrevDisabled:function(){if(null==this.links.prev)return"disabled"},isNextDisabled:function(){if(null==this.links.next)return"disabled"}},methods:{goToFirstPage:function(){this.showProgress=!0,this.$router.push({name:"item-types.index",query:{page:1,per_page:this.meta.per_page}})},goToPage:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;this.showProgress=!0,this.$router.push({name:"item-types.index",query:{page:e,per_page:this.meta.per_page}})},goToLastPage:function(){this.showProgress=!0,this.$router.push({name:"item-types.index",query:{page:this.meta.last_page,per_page:this.meta.per_page}})},goToNextPage:function(){this.showProgress=!0,this.$router.push({name:"item-types.index",query:{page:this.nextPage,per_page:this.meta.per_page}})},goToPreviousPage:function(){this.showProgress=!0,this.$router.push({name:"item-types.index",query:{page:this.prevPage,per_page:this.meta.per_page}})},setData:function(e,t){var s=t.data,a=t.links,r=t.meta;this.pageNumbers=[],e?this.error=e.toString():(this.itemTypes=s,this.links=a,this.meta=r),this.showProgress=!1,this.populatePages()},populatePages:function(){if(this.pageCount)for(var e=1;e<=this.meta.last_page;e++)this.pageNumbers.push(e);else if(this.meta.current_page<=6){this.pageNumbers.push(1),this.pageNumbers.push(2),this.pageNumbers.push(3),this.pageNumbers.push(4),this.pageNumbers.push(5),this.pageNumbers.push(6),this.pageNumbers.push(7),this.pageNumbers.push("..."),this.pageNumbers.push(this.meta.last_page-1),this.pageNumbers.push(this.meta.last_page)}else this.meta.current_page+6>=this.meta.last_page?(this.pageNumbers.push(1),this.pageNumbers.push(2),this.pageNumbers.push("..."),this.pageNumbers.push(this.meta.last_page-7),this.pageNumbers.push(this.meta.last_page-6),this.pageNumbers.push(this.meta.last_page-5),this.pageNumbers.push(this.meta.last_page-4),this.pageNumbers.push(this.meta.last_page-3),this.pageNumbers.push(this.meta.last_page-2),this.pageNumbers.push(this.meta.last_page-1),this.pageNumbers.push(this.meta.last_page)):(this.pageNumbers.push(1),this.pageNumbers.push(2),this.pageNumbers.push("..."),this.pageNumbers.push(this.meta.current_page-2),this.pageNumbers.push(this.meta.current_page-1),this.pageNumbers.push(this.meta.current_page),this.pageNumbers.push(this.meta.current_page+1),this.pageNumbers.push(this.meta.current_page+2),this.pageNumbers.push("..."),this.pageNumbers.push(this.meta.last_page-1),this.pageNumbers.push(this.meta.last_page))},isPageActive:function(e){if(e==this.$route.query.page||1==e&&null==this.$route.query.page)return"active"},changePerPage:function(){this.showProgress=!0,this.$router.push({name:"item-types.index",query:{page:1,per_page:this.meta.per_page}})},search:function(){$("#searchModal").modal("hide"),this.showProgress=!0,this.$router.push({name:"item-types.index",query:{page:1,per_page:this.meta.per_page,searchColumnName:this.searchColumnName,searchColumnDescription:this.searchColumnDescription,order_by:this.order_by}})},clear:function(){this.searchColumnName="",this.searchColumnDescription="",this.order_by="desc"},openSearchModal:function(){$("#searchModal").modal("show")}}}},wVPc:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("div",{staticClass:"card"},[s("div",{staticClass:"card-header clearfix"},[e._v("\n            Item Types / View Item Types\n        ")]),e._v(" "),s("div",{staticClass:"card-body"},[s("table",{staticClass:"table table-hover table-sm"},[s("caption",[s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-9"},[e._v("\n                            List of Item Types - Total Items "+e._s(this.meta.total)+"\n                        ")]),e._v(" "),s("div",{staticClass:"col-md-3"},[e.showProgress?s("div",{staticClass:"progress",attrs:{height:"30px;"}},[s("div",{staticClass:"progress-bar progress-bar-striped progress-bar-animated",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})]):e._e()])])]),e._v(" "),e._m(0),e._v(" "),e.itemTypes?s("tbody",e._l(e.itemTypes,function(t){var a=t.id,r=t.name,i=t.display_name,n=t.description;return s("tr",{key:a},[s("td",[e._v(e._s(r))]),e._v(" "),s("td",[e._v(e._s(i))]),e._v(" "),s("td",[e._v(e._s(n))]),e._v(" "),s("td",[s("router-link",{staticClass:"text-info",attrs:{to:{name:"item-types.view",params:{id:a}}}},[e._v("\n                                View\n                            ")]),e._v("\n                            |\n                            "),s("router-link",{staticClass:"text-info",attrs:{to:{name:"item-types.edit",params:{id:a}}}},[e._v("\n                                Edit\n                            ")])],1)])})):e._e()])])]),e._v(" "),s("br"),e._v(" "),s("div",{staticClass:"clearfix"},[(e.pageCount,s("div",[s("nav",{staticClass:"float-left"},[s("ul",{staticClass:"pagination"},[s("li",{staticClass:"page-item",class:e.isPrevDisabled},[s("a",{staticClass:"page-link",attrs:{href:"#",disabled:""},on:{click:function(t){return t.preventDefault(),e.goToPreviousPage(t)}}},[e._v("Previous")])]),e._v(" "),s("li",{staticClass:"page-item"},[s("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(t){return t.preventDefault(),e.goToFirstPage(t)}}},[e._v("First")])]),e._v(" "),e._l(e.pageNumbers,function(t){return s("li",{key:t,staticClass:"page-item",class:e.isPageActive(t)},[s("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(s){s.preventDefault(),e.goToPage(t)}}},[e._v(e._s(t))])])}),e._v(" "),s("li",{staticClass:"page-item",class:e.isNextDisabled},[s("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(t){return t.preventDefault(),e.goToLastPage(t)}}},[e._v("Last")])]),e._v(" "),s("li",{staticClass:"page-item",class:e.isNextDisabled},[s("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(t){return t.preventDefault(),e.goToNextPage(t)}}},[e._v("Next")])])],2)])])),e._v(" "),s("div",{staticClass:"float-right"},[s("form",{staticClass:"form-inline"},[s("button",{staticClass:"btn btn-primary mr-2",attrs:{type:"button"},on:{click:function(t){return t.preventDefault(),e.openSearchModal(t)}}},[e._v("Search Item Types")]),e._v(" "),s("div",{staticClass:"input-group"},[e._m(1),e._v(" "),s("select",{directives:[{name:"model",rawName:"v-model",value:e.meta.per_page,expression:"meta.per_page"}],staticClass:"custom-select",attrs:{id:"number_of_items"},on:{change:[function(t){var s=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.$set(e.meta,"per_page",t.target.multiple?s:s[0])},e.changePerPage]}},[s("option",{attrs:{value:"10"}},[e._v("10")]),e._v(" "),s("option",{attrs:{value:"15"}},[e._v("15")]),e._v(" "),s("option",{attrs:{value:"20"}},[e._v("20")]),e._v(" "),s("option",{attrs:{value:"25"}},[e._v("25")])])])])])]),e._v(" "),s("div",{staticClass:"modal fade",attrs:{id:"searchModal",tabindex:"-1",role:"dialog","aria-labelledby":"searchArticles","aria-hidden":"true"}},[s("div",{staticClass:"modal-dialog modal-dialog-centered modal-lg",attrs:{role:"document"}},[s("div",{staticClass:"modal-content"},[e._m(2),e._v(" "),s("div",{staticClass:"modal-body"},[s("div",{staticClass:"form-group"},[s("label",[e._v("Name")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.searchColumnName,expression:"searchColumnName"}],staticClass:"form-control",attrs:{type:"text",autocomplete:"off",minlength:"2",maxlength:"255",required:""},domProps:{value:e.searchColumnName},on:{input:function(t){t.target.composing||(e.searchColumnName=t.target.value)}}})]),e._v(" "),s("div",{staticClass:"form-group"},[s("label",[e._v("Description")]),e._v(" "),s("textarea",{directives:[{name:"model",rawName:"v-model",value:e.searchColumnDescription,expression:"searchColumnDescription"}],staticClass:"form-control",attrs:{maxlength:"1000",required:""},domProps:{value:e.searchColumnDescription},on:{input:function(t){t.target.composing||(e.searchColumnDescription=t.target.value)}}})]),e._v(" "),s("div",{staticClass:"form-group"},[s("label",[e._v("Order By")]),e._v(" "),s("select",{directives:[{name:"model",rawName:"v-model",value:e.order_by,expression:"order_by"}],staticClass:"form-control",on:{change:function(t){var s=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.order_by=t.target.multiple?s:s[0]}}},[s("option",{attrs:{value:"desc"}},[e._v("Newest")]),e._v(" "),s("option",{attrs:{value:"asc"}},[e._v("Oldest")])])])]),e._v(" "),s("div",{staticClass:"modal-footer clearfix"},[s("button",{staticClass:"btn btn-danger btn-sm",attrs:{type:"button"},on:{click:function(t){return t.preventDefault(),e.clear(t)}}},[e._v("Clear")]),e._v(" "),s("button",{staticClass:"btn btn-success btn-sm",attrs:{type:"button"},on:{click:function(t){return t.preventDefault(),e.search(t)}}},[e._v("Search")]),e._v(" "),s("button",{staticClass:"btn btn-secondary btn-sm",attrs:{type:"button","data-dismiss":"modal"}},[e._v("Close")])])])])])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("thead",[t("tr",[t("th",{attrs:{scope:"col"}},[this._v("Name")]),this._v(" "),t("th",{attrs:{scope:"col"}},[this._v("Display Name")]),this._v(" "),t("th",{attrs:{scope:"col"}},[this._v("Description")]),this._v(" "),t("th",{attrs:{scope:"col"}},[this._v("Action")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"input-group-prepend"},[t("div",{staticClass:"input-group-text"},[this._v("Items per page")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"modal-header"},[t("h5",{staticClass:"modal-title"},[this._v("Search Item Types")]),this._v(" "),t("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[t("span",{attrs:{"aria-hidden":"true"}},[this._v("×")])])])}]}}});
//# sourceMappingURL=46.js.map