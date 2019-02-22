webpackJsonp([37],{"8oU2":function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticClass:"card my-4"},[s("ul",{staticClass:"nav nav-pills nav-justified"},[s("li",{staticClass:"nav-item bg-white"},[s("router-link",{staticClass:"nav-link p-3",attrs:{to:{name:"settings.index"}}},[t._v("\n                    System\n                ")])],1),t._v(" "),s("li",{staticClass:"nav-item bg-white"},[s("router-link",{staticClass:"nav-link p-3",attrs:{to:{name:"settings.users"}}},[t._v("\n                    Users\n                ")])],1),t._v(" "),s("li",{staticClass:"nav-item bg-white"},[s("router-link",{staticClass:"nav-link active p-3",attrs:{to:{name:"settings.units.index"}}},[t._v("\n                    Unit of Measurements\n                ")])],1),t._v(" "),s("li",{staticClass:"nav-item bg-white"},[s("router-link",{staticClass:"nav-link p-3",attrs:{to:{name:"settings.conversions"}}},[t._v("\n                    Conversions\n                ")])],1),t._v(" "),s("li",{staticClass:"nav-item bg-white"},[s("router-link",{staticClass:"nav-link p-3 ",attrs:{to:{name:"settings.paymentTerms"}}},[t._v("\n                    Payment Terms\n                ")])],1)])]),t._v(" "),s("div",{staticClass:"card"},[s("div",{staticClass:"card-header clearfix"},[t._v("\n            "+t._s(t.componentVal)+" / View "+t._s(t.componentVal)+"\n            "),s("router-link",{attrs:{to:{name:"settings.units.create"}}},[s("button",{staticClass:"btn btn-primary float-right",attrs:{type:"button"}},[t._v("Create New UOM")])])],1),t._v(" "),s("div",{staticClass:"card-body"},[s("table",{staticClass:"table table-hover table-sm"},[s("caption",[s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-9"},[t._v("\n                            List of Units - Total Units "+t._s(this.meta.total)+"\n                        ")]),t._v(" "),s("div",{staticClass:"col-md-3"},[t.showProgress?s("div",{staticClass:"progress",attrs:{height:"30px;"}},[s("div",{staticClass:"progress-bar progress-bar-striped progress-bar-animated",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})]):t._e()])])]),t._v(" "),t._m(0),t._v(" "),t.units?s("tbody",t._l(t.units,function(e){var a=e.id,i=e.name,r=e.abbreviation;return s("tr",{key:a},[s("td",[t._v(t._s(i))]),t._v(" "),s("td",[t._v(t._s(r))]),t._v(" "),s("td",[s("router-link",{staticClass:"text-info",attrs:{to:{name:"settings.units.view",params:{id:a}}}},[t._v("View")])],1)])}),0):t._e()])])]),t._v(" "),s("br"),t._v(" "),s("div",{staticClass:"clearfix"},[(t.pageCount,s("div",[s("nav",{staticClass:"float-left"},[s("ul",{staticClass:"pagination"},[s("li",{staticClass:"page-item",class:t.isPrevDisabled},[s("a",{staticClass:"page-link",attrs:{href:"#",disabled:""},on:{click:function(e){return e.preventDefault(),t.goToPreviousPage(e)}}},[t._v("Previous")])]),t._v(" "),s("li",{staticClass:"page-item"},[s("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.goToFirstPage(e)}}},[t._v("First")])]),t._v(" "),t._l(t.pageNumbers,function(e){return s("li",{key:e,staticClass:"page-item",class:t.isPageActive(e)},[s("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(s){s.preventDefault(),t.goToPage(e)}}},[t._v(t._s(e))])])}),t._v(" "),s("li",{staticClass:"page-item",class:t.isNextDisabled},[s("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.goToLastPage(e)}}},[t._v("Last")])]),t._v(" "),s("li",{staticClass:"page-item",class:t.isNextDisabled},[s("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.goToNextPage(e)}}},[t._v("Next")])])],2)])])),t._v(" "),s("div",{staticClass:"float-right"},[s("form",{staticClass:"form-inline"},[s("button",{staticClass:"btn btn-primary mr-2",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.openSearchModal(e)}}},[t._v("Search Units")]),t._v(" "),s("div",{staticClass:"input-group"},[t._m(1),t._v(" "),s("select",{directives:[{name:"model",rawName:"v-model",value:t.meta.per_page,expression:"meta.per_page"}],staticClass:"custom-select",attrs:{id:"number_of_items"},on:{change:[function(e){var s=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.$set(t.meta,"per_page",e.target.multiple?s:s[0])},t.changePerPage]}},[s("option",{attrs:{value:"10"}},[t._v("10")]),t._v(" "),s("option",{attrs:{value:"15"}},[t._v("15")]),t._v(" "),s("option",{attrs:{value:"20"}},[t._v("20")]),t._v(" "),s("option",{attrs:{value:"25"}},[t._v("25")])])])])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("thead",[e("tr",[e("th",{attrs:{scope:"col"}},[this._v("Name")]),this._v(" "),e("th",{attrs:{scope:"col"}},[this._v("Abbreviation")]),this._v(" "),e("th",{attrs:{scope:"col"}},[this._v("Action")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"input-group-prepend"},[e("div",{staticClass:"input-group-text"},[this._v("Items per page")])])}]}},HC74:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=function(t,e,s){var a={page:t,per_page:e};axios.defaults.headers.common["CORPORATION-ID"]=JSON.parse(localStorage.getItem("selectedCorporation")).id,axios.get("/api/unit-of-measurements",{params:a}).then(function(t){s(null,t.data)}).catch(function(t){s(t,t.res.data)})};e.default={data:function(){return{componentVal:"Unit of Measurements",units:null,meta:{current_page:null,from:null,last_page:null,path:null,per_page:10,to:null,total:null},links:{first:null,last:null,next:null,prev:null},error:null,showProgress:!1,pageNumbers:[],modal:{id:"",name:"",abbreviation:"",type:""}}},beforeRouteEnter:function(t,e,s){null==t.query.per_page?a(t.query.page,10,function(t,e){s(function(s){return s.setData(t,e)})}):a(t.query.page,t.query.per_page,function(t,e){s(function(s){return s.setData(t,e)})})},beforeRouteUpdate:function(t,e,s){var i=this;a(t.query.page,this.meta.per_page,function(t,e){i.setData(t,e),s()})},computed:{nextPage:function(){return this.meta.current_page+1},prevPage:function(){return this.meta.current_page-1},paginatonCount:function(){if(this.meta){var t=this.meta,e=t.current_page,s=t.last_page;return"".concat(e," of ").concat(s)}},pageCount:function(){return!(this.meta.last_page>10)},isPrevDisabled:function(){if(null==this.links.prev)return"disabled"},isNextDisabled:function(){if(null==this.links.next)return"disabled"}},methods:{goToFirstPage:function(){this.showProgress=!0,this.$router.push({name:"settings.units",query:{page:1,per_page:this.meta.per_page}})},goToPage:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;this.showProgress=!0,this.$router.push({name:"settings.units",query:{page:t,per_page:this.meta.per_page}})},goToLastPage:function(){this.showProgress=!0,this.$router.push({name:"settings.units",query:{page:this.meta.last_page,per_page:this.meta.per_page}})},goToNextPage:function(){this.showProgress=!0,this.$router.push({name:"settings.units",query:{page:this.nextPage,per_page:this.meta.per_page}})},goToPreviousPage:function(){this.showProgress=!0,this.$router.push({name:"settings.units",query:{page:this.prevPage,per_page:this.meta.per_page}})},setData:function(t,e){var s=e.data,a=e.links,i=e.meta;this.pageNumbers=[],t?this.error=t.toString():(this.units=s,this.links=a,this.meta=i),this.showProgress=!1,this.populatePages()},populatePages:function(){if(this.pageCount)for(var t=1;t<=this.meta.last_page;t++)this.pageNumbers.push(t);else if(this.meta.current_page<=6){this.pageNumbers.push(1),this.pageNumbers.push(2),this.pageNumbers.push(3),this.pageNumbers.push(4),this.pageNumbers.push(5),this.pageNumbers.push(6),this.pageNumbers.push(7),this.pageNumbers.push("..."),this.pageNumbers.push(this.meta.last_page-1),this.pageNumbers.push(this.meta.last_page)}else this.meta.current_page+6>=this.meta.last_page?(this.pageNumbers.push(1),this.pageNumbers.push(2),this.pageNumbers.push("..."),this.pageNumbers.push(this.meta.last_page-7),this.pageNumbers.push(this.meta.last_page-6),this.pageNumbers.push(this.meta.last_page-5),this.pageNumbers.push(this.meta.last_page-4),this.pageNumbers.push(this.meta.last_page-3),this.pageNumbers.push(this.meta.last_page-2),this.pageNumbers.push(this.meta.last_page-1),this.pageNumbers.push(this.meta.last_page)):(this.pageNumbers.push(1),this.pageNumbers.push(2),this.pageNumbers.push("..."),this.pageNumbers.push(this.meta.current_page-2),this.pageNumbers.push(this.meta.current_page-1),this.pageNumbers.push(this.meta.current_page),this.pageNumbers.push(this.meta.current_page+1),this.pageNumbers.push(this.meta.current_page+2),this.pageNumbers.push("..."),this.pageNumbers.push(this.meta.last_page-1),this.pageNumbers.push(this.meta.last_page))},isPageActive:function(t){if(t==this.$route.query.page||1==t&&null==this.$route.query.page)return"active"},changePerPage:function(){this.showProgress=!0,this.$router.push({name:"settings.units",query:{page:1,per_page:this.meta.per_page}})}}}},JTPs:function(t,e,s){var a=s("VU/8")(s("HC74"),s("8oU2"),!1,null,null,null);t.exports=a.exports}});
//# sourceMappingURL=37.js.map