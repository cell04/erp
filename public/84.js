webpackJsonp([84],{BUud:function(e,a,t){var s=t("VU/8")(t("j68L"),t("r/aw"),!1,null,null,null);e.exports=s.exports},j68L:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=function(e,a,t,s,r,o,i,n){var l={page:e,per_page:a,searchColumnFromValue:t,searchColumnFromName:s,searchColumnToValue:r,searchColumnToName:o,order_by:i};axios.defaults.headers.common["CORPORATION-ID"]=JSON.parse(localStorage.getItem("selectedCorporation")).id,axios.get("/api/conversions",{params:l}).then(function(e){console.log(e),n(null,e.data)}).catch(function(e){401==e.response.status&&location.reload(),500==e.response.status&&alert("Kindly report this issue to the devs.")})};a.default={data:function(){return{componentVal:"Conversion",conversions:null,searchColumnFromValue:"",searchColumnFromName:"",searchColumnToValue:"",searchColumnToName:"",order_by:"desc",meta:{current_page:null,from:null,last_page:null,path:null,per_page:10,to:null,total:null},links:{first:null,last:null,next:null,prev:null},error:null,showProgress:!1,pageNumbers:[]}},beforeRouteEnter:function(e,a,t){null==e.query.per_page?s(e.query.page,10,e.query.searchColumnFromValue,e.query.searchColumnFromName,e.query.searchColumnToValue,e.query.searchColumnToName,e.query.order_by,function(e,a){t(function(t){return t.setData(e,a)})}):s(e.query.page,e.query.per_page,e.query.searchColumnFromValue,e.query.searchColumnFromName,e.query.searchColumnToValue,e.query.searchColumnToName,e.query.order_by,function(e,a){t(function(t){return t.setData(e,a)})})},beforeRouteUpdate:function(e,a,t){var r=this;s(e.query.page,this.meta.per_page,this.searchColumnFromValue,this.searchColumnFromName,this.searchColumnToValue,this.searchColumnToName,this.order_by,function(e,a){r.setData(e,a),t()})},computed:{nextPage:function(){return this.meta.current_page+1},prevPage:function(){return this.meta.current_page-1},paginatonCount:function(){if(this.meta){var e=this.meta,a=e.current_page,t=e.last_page;return"".concat(a," of ").concat(t)}},pageCount:function(){return!(this.meta.last_page>10)},isPrevDisabled:function(){if(null==this.links.prev)return"disabled"},isNextDisabled:function(){if(null==this.links.next)return"disabled"}},methods:{goToFirstPage:function(){this.showProgress=!0,this.$router.push({name:"conversions.index",query:{page:1,per_page:this.meta.per_page,searchColumnFromValue:this.searchColumnFromValue,searchColumnFromName:this.searchColumnFromName,searchColumnToValue:this.searchColumnToValue,searchColumnToName:this.searchColumnToName,order_by:this.order_by}})},goToPage:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;this.showProgress=!0,this.$router.push({name:"conversions.index",query:{page:e,per_page:this.meta.per_page,searchColumnFromValue:this.searchColumnFromValue,searchColumnFromName:this.searchColumnFromName,searchColumnToValue:this.searchColumnToValue,searchColumnToName:this.searchColumnToName,order_by:this.order_by}})},goToLastPage:function(){this.showProgress=!0,this.$router.push({name:"conversions.index",query:{page:this.meta.last_page,per_page:this.meta.per_page,searchColumnFromValue:this.searchColumnFromValue,searchColumnFromName:this.searchColumnFromName,searchColumnToValue:this.searchColumnToValue,searchColumnToName:this.searchColumnToName,order_by:this.order_by}})},goToNextPage:function(){this.showProgress=!0,this.$router.push({name:"conversions.index",query:{page:this.nextPage,per_page:this.meta.per_page,searchColumnFromValue:this.searchColumnFromValue,searchColumnFromName:this.searchColumnFromName,searchColumnToValue:this.searchColumnToValue,searchColumnToName:this.searchColumnToName,order_by:this.order_by}})},goToPreviousPage:function(){this.showProgress=!0,this.$router.push({name:"conversions.index",query:{page:this.prevPage,per_page:this.meta.per_page,searchColumnFromValue:this.searchColumnFromValue,searchColumnFromName:this.searchColumnFromName,searchColumnToValue:this.searchColumnToValue,searchColumnToName:this.searchColumnToName,order_by:this.order_by}})},setData:function(e,a){var t=a.data,s=a.links,r=a.meta;this.pageNumbers=[],e?this.error=e.toString():(this.conversions=t,this.links=s,this.meta=r),this.showProgress=!1,this.populatePages()},populatePages:function(){if(this.pageCount)for(var e=1;e<=this.meta.last_page;e++)this.pageNumbers.push(e);else if(this.meta.current_page<=6){this.pageNumbers.push(1),this.pageNumbers.push(2),this.pageNumbers.push(3),this.pageNumbers.push(4),this.pageNumbers.push(5),this.pageNumbers.push(6),this.pageNumbers.push(7),this.pageNumbers.push("..."),this.pageNumbers.push(this.meta.last_page-1),this.pageNumbers.push(this.meta.last_page)}else this.meta.current_page+6>=this.meta.last_page?(this.pageNumbers.push(1),this.pageNumbers.push(2),this.pageNumbers.push("..."),this.pageNumbers.push(this.meta.last_page-7),this.pageNumbers.push(this.meta.last_page-6),this.pageNumbers.push(this.meta.last_page-5),this.pageNumbers.push(this.meta.last_page-4),this.pageNumbers.push(this.meta.last_page-3),this.pageNumbers.push(this.meta.last_page-2),this.pageNumbers.push(this.meta.last_page-1),this.pageNumbers.push(this.meta.last_page)):(this.pageNumbers.push(1),this.pageNumbers.push(2),this.pageNumbers.push("..."),this.pageNumbers.push(this.meta.current_page-2),this.pageNumbers.push(this.meta.current_page-1),this.pageNumbers.push(this.meta.current_page),this.pageNumbers.push(this.meta.current_page+1),this.pageNumbers.push(this.meta.current_page+2),this.pageNumbers.push("..."),this.pageNumbers.push(this.meta.last_page-1),this.pageNumbers.push(this.meta.last_page))},isPageActive:function(e){if(e==this.$route.query.page||1==e&&null==this.$route.query.page)return"active"},changePerPage:function(){this.showProgress=!0,this.$router.push({name:"conversions.index",query:{page:1,per_page:this.meta.per_page,searchColumnFromValue:this.searchColumnFromValue,searchColumnFromName:this.searchColumnFromName,searchColumnToValue:this.searchColumnToValue,searchColumnToName:this.searchColumnToName,order_by:this.order_by}})},search:function(){$("#searchModal").modal("hide"),this.showProgress=!0,this.$router.push({name:"conversions.index",query:{page:1,per_page:this.meta.per_page,searchColumnFromValue:this.searchColumnFromValue,searchColumnFromName:this.searchColumnFromName,searchColumnToValue:this.searchColumnToValue,searchColumnToName:this.searchColumnToName,order_by:this.order_by}})},clear:function(){this.searchColumnFromValue="",this.searchColumnFromName="",this.searchColumnToValue="",this.searchColumnToName="",this.order_by="desc"},openSearchModal:function(){$("#searchModal").modal("show")}}}},"r/aw":function(e,a){e.exports={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",[t("div",{staticClass:"card"},[t("div",{staticClass:"card-header clearfix"},[t("div",{staticClass:"float-left"},[e._v("\n                "+e._s(e.componentVal)+"s / View "+e._s(e.componentVal)+"s\n            ")]),e._v(" "),t("div",{staticClass:"float-right"},[t("router-link",{staticClass:"btn-success btn-sm",attrs:{to:{name:"conversions.create"}}},[e._v("Create New Conversion")])],1)]),e._v(" "),t("div",{staticClass:"card-body"},[t("table",{staticClass:"table table-hover table-sm"},[t("caption",[t("div",{staticClass:"row"},[t("div",{staticClass:"col-md-9"},[e._v("\n                            List of "+e._s(e.componentVal)+"s - Total Items "+e._s(this.meta.total)+"\n                        ")]),e._v(" "),t("div",{staticClass:"col-md-3"},[e.showProgress?t("div",{staticClass:"progress",attrs:{height:"30px;"}},[t("div",{staticClass:"progress-bar progress-bar-striped progress-bar-animated",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})]):e._e()])])]),e._v(" "),e._m(0),e._v(" "),e.conversions?t("tbody",e._l(e.conversions,function(a){var s=a.id,r=a.from_value,o=a.convert_from,i=a.to_value,n=a.convert_to;return t("tr",[t("td",[e._v(e._s(s))]),e._v(" "),t("td",[e._v(e._s(r)+" "+e._s(o.name))]),e._v(" "),t("td",[e._v(e._s(i)+" "+e._s(n.name))]),e._v(" "),t("td",[t("router-link",{staticClass:"text-info",attrs:{to:{name:"conversions.view",params:{id:s}}}},[e._v("View")])],1)])}),0):e._e()])])]),e._v(" "),t("br"),e._v(" "),t("div",{staticClass:"clearfix"},[(e.pageCount,t("div",[t("nav",{staticClass:"float-left"},[t("ul",{staticClass:"pagination"},[t("li",{staticClass:"page-item",class:e.isPrevDisabled},[t("a",{staticClass:"page-link",attrs:{href:"#",disabled:""},on:{click:function(a){return a.preventDefault(),e.goToPreviousPage(a)}}},[e._v("Previous")])]),e._v(" "),t("li",{staticClass:"page-item"},[t("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(a){return a.preventDefault(),e.goToFirstPage(a)}}},[e._v("First")])]),e._v(" "),e._l(e.pageNumbers,function(a){return t("li",{staticClass:"page-item",class:e.isPageActive(a)},[t("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(t){t.preventDefault(),e.goToPage(a)}}},[e._v(e._s(a))])])}),e._v(" "),t("li",{staticClass:"page-item",class:e.isNextDisabled},[t("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(a){return a.preventDefault(),e.goToLastPage(a)}}},[e._v("Last")])]),e._v(" "),t("li",{staticClass:"page-item",class:e.isNextDisabled},[t("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(a){return a.preventDefault(),e.goToNextPage(a)}}},[e._v("Next")])])],2)])])),e._v(" "),t("div",{staticClass:"float-right"},[t("form",{staticClass:"form-inline"},[t("div",{staticClass:"input-group"},[e._m(1),e._v(" "),t("select",{directives:[{name:"model",rawName:"v-model",value:e.meta.per_page,expression:"meta.per_page"}],staticClass:"custom-select",attrs:{id:"number_of_items"},on:{change:[function(a){var t=Array.prototype.filter.call(a.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.$set(e.meta,"per_page",a.target.multiple?t:t[0])},e.changePerPage]}},[t("option",{attrs:{value:"10"}},[e._v("10")]),e._v(" "),t("option",{attrs:{value:"15"}},[e._v("15")]),e._v(" "),t("option",{attrs:{value:"20"}},[e._v("20")]),e._v(" "),t("option",{attrs:{value:"25"}},[e._v("25")])])])])]),e._v(" "),t("div",{staticClass:"modal fade",attrs:{id:"searchModal",tabindex:"-1",role:"dialog","aria-labelledby":"searchArticles","aria-hidden":"true"}},[t("div",{staticClass:"modal-dialog modal-dialog-centered modal-lg",attrs:{role:"document"}},[t("div",{staticClass:"modal-content"},[t("div",{staticClass:"modal-header"},[t("h5",{staticClass:"modal-title"},[e._v("Search "+e._s(e.componentVal))]),e._v(" "),e._m(2)]),e._v(" "),t("div",{staticClass:"modal-body"},[t("div",{staticClass:"form-group"},[t("label",[e._v("From")]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.searchColumnFromValue,expression:"searchColumnFromValue"}],staticClass:"form-control",attrs:{type:"text",autocomplete:"off",minlength:"2",maxlength:"255",required:""},domProps:{value:e.searchColumnFromValue},on:{input:function(a){a.target.composing||(e.searchColumnFromValue=a.target.value)}}})]),e._v(" "),t("div",{staticClass:"form-group"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.searchColumnFromName,expression:"searchColumnFromName"}],staticClass:"form-control",attrs:{type:"text",autocomplete:"off",minlength:"2",maxlength:"255",required:""},domProps:{value:e.searchColumnFromName},on:{input:function(a){a.target.composing||(e.searchColumnFromName=a.target.value)}}})]),e._v(" "),t("div",{staticClass:"form-group"},[t("label",[e._v("To")]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.searchColumnToValue,expression:"searchColumnToValue"}],staticClass:"form-control",attrs:{type:"text",autocomplete:"off",minlength:"2",maxlength:"255",required:""},domProps:{value:e.searchColumnToValue},on:{input:function(a){a.target.composing||(e.searchColumnToValue=a.target.value)}}})]),e._v(" "),t("div",{staticClass:"form-group"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.searchColumnToName,expression:"searchColumnToName"}],staticClass:"form-control",attrs:{type:"text",autocomplete:"off",minlength:"2",maxlength:"255",required:""},domProps:{value:e.searchColumnToName},on:{input:function(a){a.target.composing||(e.searchColumnToName=a.target.value)}}})]),e._v(" "),t("div",{staticClass:"form-group"},[t("label",[e._v("Order By")]),e._v(" "),t("select",{directives:[{name:"model",rawName:"v-model",value:e.order_by,expression:"order_by"}],staticClass:"form-control",on:{change:function(a){var t=Array.prototype.filter.call(a.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.order_by=a.target.multiple?t:t[0]}}},[t("option",{attrs:{value:"desc"}},[e._v("Newest")]),e._v(" "),t("option",{attrs:{value:"asc"}},[e._v("Oldest")])])])]),e._v(" "),t("div",{staticClass:"modal-footer clearfix"},[t("button",{staticClass:"btn btn-danger btn-sm",attrs:{type:"button"},on:{click:function(a){return"button"in a||!e._k(a.keyCode,"default",void 0,a.key,void 0)?(a.preventDefault(),e.clear(a)):null}}},[e._v("Clear")]),e._v(" "),t("button",{staticClass:"btn btn-success btn-sm",attrs:{type:"button"},on:{click:function(a){return"button"in a||!e._k(a.keyCode,"default",void 0,a.key,void 0)?(a.preventDefault(),e.search(a)):null}}},[e._v("Search")]),e._v(" "),t("button",{staticClass:"btn btn-secondary btn-sm",attrs:{type:"button","data-dismiss":"modal"}},[e._v("Close")])])])])])])])},staticRenderFns:[function(){var e=this.$createElement,a=this._self._c||e;return a("thead",[a("tr",[a("th",{attrs:{scope:"col"}},[this._v("Id")]),this._v(" "),a("th",{attrs:{scope:"col"}},[this._v("From")]),this._v(" "),a("th",{attrs:{scope:"col"}},[this._v("To")]),this._v(" "),a("th",{attrs:{scope:"col"}},[this._v("Options")])])])},function(){var e=this.$createElement,a=this._self._c||e;return a("div",{staticClass:"input-group-prepend"},[a("div",{staticClass:"input-group-text"},[this._v("Items per page")])])},function(){var e=this.$createElement,a=this._self._c||e;return a("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[a("span",{attrs:{"aria-hidden":"true"}},[this._v("×")])])}]}}});
//# sourceMappingURL=84.js.map