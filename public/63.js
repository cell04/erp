webpackJsonp([63],{"/o/O":function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("div",{staticClass:"card"},[s("div",{staticClass:"card-header clearfix"},[e._v("\n            Branches / View Branches\n        ")]),e._v(" "),s("div",{staticClass:"card-body"},[s("table",{staticClass:"table table-hover table-sm"},[s("caption",[s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-9"},[e._v("\n                            List of Branches - Total Items "+e._s(this.meta.total)+"\n                        ")]),e._v(" "),s("div",{staticClass:"col-md-3"},[e.showProgress?s("div",{staticClass:"progress",attrs:{height:"30px;"}},[s("div",{staticClass:"progress-bar progress-bar-striped progress-bar-animated",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})]):e._e()])])]),e._v(" "),e._m(0),e._v(" "),e.branches?s("tbody",e._l(e.branches,function(t){var a=t.id,r=t.name,i=t.city,n=t.country,u=t.zip_code,p=t.telephone_number;return s("tr",[s("td",[e._v(e._s(a))]),e._v(" "),s("td",[e._v(e._s(r))]),e._v(" "),s("td",[e._v(e._s(i))]),e._v(" "),s("td",[e._v(e._s(n))]),e._v(" "),s("td",[e._v(e._s(u))]),e._v(" "),s("td",[e._v(e._s(p))]),e._v(" "),s("td",[s("router-link",{staticClass:"text-info",attrs:{to:{name:"branches.view",params:{id:a}}}},[e._v("View")])],1)])})):e._e()])])]),e._v(" "),s("br"),e._v(" "),s("div",{staticClass:"clearfix"},[(e.pageCount,s("div",[s("nav",{staticClass:"float-left"},[s("ul",{staticClass:"pagination"},[s("li",{staticClass:"page-item",class:e.isPrevDisabled},[s("a",{staticClass:"page-link",attrs:{href:"#",disabled:""},on:{click:function(t){return t.preventDefault(),e.goToPreviousPage(t)}}},[e._v("Previous")])]),e._v(" "),s("li",{staticClass:"page-item"},[s("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(t){return t.preventDefault(),e.goToFirstPage(t)}}},[e._v("First")])]),e._v(" "),e._l(e.pageNumbers,function(t){return s("li",{staticClass:"page-item",class:e.isPageActive(t)},[s("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(s){s.preventDefault(),e.goToPage(t)}}},[e._v(e._s(t))])])}),e._v(" "),s("li",{staticClass:"page-item",class:e.isNextDisabled},[s("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(t){return t.preventDefault(),e.goToLastPage(t)}}},[e._v("Last")])]),e._v(" "),s("li",{staticClass:"page-item",class:e.isNextDisabled},[s("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(t){return t.preventDefault(),e.goToNextPage(t)}}},[e._v("Next")])])],2)])])),e._v(" "),s("div",{staticClass:"float-right"},[s("form",{staticClass:"form-inline"},[s("label",{staticClass:"sr-only",attrs:{for:"Number of Items"}},[e._v("Number of Items")]),e._v(" "),s("div",{staticClass:"input-group mb-2"},[e._m(1),e._v(" "),s("select",{directives:[{name:"model",rawName:"v-model",value:e.meta.per_page,expression:"meta.per_page"}],staticClass:"custom-select",attrs:{id:"number_of_items"},on:{change:[function(t){var s=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.$set(e.meta,"per_page",t.target.multiple?s:s[0])},e.changePerPage]}},[s("option",{attrs:{value:"10"}},[e._v("10")]),e._v(" "),s("option",{attrs:{value:"15"}},[e._v("15")]),e._v(" "),s("option",{attrs:{value:"20"}},[e._v("20")]),e._v(" "),s("option",{attrs:{value:"25"}},[e._v("25")])])])])])])])},staticRenderFns:[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("thead",[s("tr",[s("th",{attrs:{scope:"col"}},[e._v("Id")]),e._v(" "),s("th",{attrs:{scope:"col"}},[e._v("Name")]),e._v(" "),s("th",{attrs:{scope:"col"}},[e._v("City")]),e._v(" "),s("th",{attrs:{scope:"col"}},[e._v("Country")]),e._v(" "),s("th",{attrs:{scope:"col"}},[e._v("Zip Code")]),e._v(" "),s("th",{attrs:{scope:"col"}},[e._v("Telephone Number")]),e._v(" "),s("th",{attrs:{scope:"col"}},[e._v("Options")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"input-group-prepend"},[t("div",{staticClass:"input-group-text"},[this._v("Items per page")])])}]}},BYUh:function(e,t,s){var a=s("VU/8")(s("IyBC"),s("/o/O"),!1,null,null,null);e.exports=a.exports},IyBC:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(e,t,s){var a={page:e,per_page:t};axios.get("/api/branches",{params:a}).then(function(e){s(null,e.data)}).catch(function(e){401==e.response.status&&location.reload(),500==e.response.status&&alert("Kindly report this issue to the devs.")})};t.default={data:function(){return{branches:null,meta:{current_page:null,from:null,last_page:null,path:null,per_page:10,to:null,total:null},links:{first:null,last:null,next:null,prev:null},error:null,showProgress:!1,pageNumbers:[]}},beforeRouteEnter:function(e,t,s){null==e.query.per_page?a(e.query.page,10,function(e,t){s(function(s){return s.setData(e,t)})}):a(e.query.page,e.query.per_page,function(e,t){s(function(s){return s.setData(e,t)})})},beforeRouteUpdate:function(e,t,s){var r=this;a(e.query.page,this.meta.per_page,function(e,t){r.setData(e,t),s()})},computed:{nextPage:function(){return this.meta.current_page+1},prevPage:function(){return this.meta.current_page-1},paginatonCount:function(){if(this.meta){var e=this.meta;return e.current_page+" of "+e.last_page}},pageCount:function(){return!(this.meta.last_page>10)},isPrevDisabled:function(){if(null==this.links.prev)return"disabled"},isNextDisabled:function(){if(null==this.links.next)return"disabled"}},methods:{goToFirstPage:function(){this.showProgress=!0,this.$router.push({name:"branches.index",query:{page:1,per_page:this.meta.per_page}})},goToPage:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;this.showProgress=!0,this.$router.push({name:"branches.index",query:{page:e,per_page:this.meta.per_page}})},goToLastPage:function(){this.showProgress=!0,this.$router.push({name:"branches.index",query:{page:this.meta.last_page,per_page:this.meta.per_page}})},goToNextPage:function(){this.showProgress=!0,this.$router.push({name:"branches.index",query:{page:this.nextPage,per_page:this.meta.per_page}})},goToPreviousPage:function(){this.showProgress=!0,this.$router.push({name:"branches.index",query:{page:this.prevPage,per_page:this.meta.per_page}})},setData:function(e,t){var s=t.data,a=t.links,r=t.meta;this.pageNumbers=[],e?this.error=e.toString():(this.branches=s,this.links=a,this.meta=r),this.showProgress=!1,this.populatePages()},populatePages:function(){if(this.pageCount)for(var e=1;e<=this.meta.last_page;e++)this.pageNumbers.push(e);else if(this.meta.current_page<=6){this.pageNumbers.push(1),this.pageNumbers.push(2),this.pageNumbers.push(3),this.pageNumbers.push(4),this.pageNumbers.push(5),this.pageNumbers.push(6),this.pageNumbers.push(7),this.pageNumbers.push("..."),this.pageNumbers.push(this.meta.last_page-1),this.pageNumbers.push(this.meta.last_page)}else this.meta.current_page+6>=this.meta.last_page?(this.pageNumbers.push(1),this.pageNumbers.push(2),this.pageNumbers.push("..."),this.pageNumbers.push(this.meta.last_page-7),this.pageNumbers.push(this.meta.last_page-6),this.pageNumbers.push(this.meta.last_page-5),this.pageNumbers.push(this.meta.last_page-4),this.pageNumbers.push(this.meta.last_page-3),this.pageNumbers.push(this.meta.last_page-2),this.pageNumbers.push(this.meta.last_page-1),this.pageNumbers.push(this.meta.last_page)):(this.pageNumbers.push(1),this.pageNumbers.push(2),this.pageNumbers.push("..."),this.pageNumbers.push(this.meta.current_page-2),this.pageNumbers.push(this.meta.current_page-1),this.pageNumbers.push(this.meta.current_page),this.pageNumbers.push(this.meta.current_page+1),this.pageNumbers.push(this.meta.current_page+2),this.pageNumbers.push("..."),this.pageNumbers.push(this.meta.last_page-1),this.pageNumbers.push(this.meta.last_page))},isPageActive:function(e){if(e==this.$route.query.page||1==e&&null==this.$route.query.page)return"active"},changePerPage:function(){this.showProgress=!0,this.$router.push({name:"branches.index",query:{page:1,per_page:this.meta.per_page}})}}}}});
//# sourceMappingURL=63.js.map