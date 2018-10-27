webpackJsonp([29],{"/IMl":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=function(t,e,s){var a={page:t,per_page:e};axios.defaults.headers.common["CORPORATION-ID"]=JSON.parse(localStorage.getItem("selectedCorporation")).id,axios.get("/api/conversions",{params:a}).then(function(t){s(null,t.data)}).catch(function(t){s(t,t.res.data)})};e.default={data:function(){return{componentVal:"Conversions",conversions:null,meta:{current_page:null,from:null,last_page:null,path:null,per_page:10,to:null,total:null},links:{first:null,last:null,next:null,prev:null},error:null,showProgress:!1,pageNumbers:[],units:[],modal:{id:"",type:"",unit_of_measurement_from_id:"",from_value:"",unit_of_measurement_to_id:"",to_value:""}}},beforeRouteEnter:function(t,e,s){null==t.query.per_page?a(t.query.page,10,function(t,e){s(function(s){return s.setData(t,e)})}):a(t.query.page,t.query.per_page,function(t,e){s(function(s){return s.setData(t,e)})})},beforeRouteUpdate:function(t,e,s){var i=this;a(t.query.page,this.meta.per_page,function(t,e){i.setData(t,e),s()})},computed:{nextPage:function(){return this.meta.current_page+1},prevPage:function(){return this.meta.current_page-1},paginatonCount:function(){if(this.meta){var t=this.meta;return t.current_page+" of "+t.last_page}},pageCount:function(){return!(this.meta.last_page>10)},isPrevDisabled:function(){if(null==this.links.prev)return"disabled"},isNextDisabled:function(){if(null==this.links.next)return"disabled"}},mounted:function(){var t=this;new Promise(function(e,s){axios.get("/api/unit-of-measurements/get-all-unit-of-measurements/").then(function(s){console.log(s),t.units=s.data.unit_of_measurements,s.data.response&&e()})})},methods:{toggleModal:function(t){$("#modal").modal(t)},setConversion:function(t,e,s,a,i,n){this.modal.id=t,this.modal.unit_of_measurement_from_id=e,this.modal.from_value=s,this.modal.unit_of_measurement_to_id=a,this.modal.to_value=i,this.modal.type=n,this.toggleModal("show")},createNewConversion:function(){var t=this;switch(console.log(this.modal),this.modal.type){case"update":axios.put("/api/conversions/"+this.modal.id,this.modal).then(function(e){t.toggleModal("hide"),t.refresh()}).catch(function(t){console.log(t),alert("Can't update unit")});break;case"create":axios.post("/api/conversions",this.modal).then(function(e){t.toggleModal("hide"),t.refresh()}).catch(function(t){console.log(t),alert("Can't create unit")})}},refresh:function(){this.showProgress=!0,this.$router.go({name:"settings.conversions",query:{page:this.meta.current_page,per_page:this.meta.per_page}})},goToFirstPage:function(){this.showProgress=!0,this.$router.push({name:"settings.conversions",query:{page:1,per_page:this.meta.per_page}})},goToPage:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;this.showProgress=!0,this.$router.push({name:"settings.conversions",query:{page:t,per_page:this.meta.per_page}})},goToLastPage:function(){this.showProgress=!0,this.$router.push({name:"settings.conversions",query:{page:this.meta.last_page,per_page:this.meta.per_page}})},goToNextPage:function(){this.showProgress=!0,this.$router.push({name:"settings.conversions",query:{page:this.nextPage,per_page:this.meta.per_page}})},goToPreviousPage:function(){this.showProgress=!0,this.$router.push({name:"settings.conversions",query:{page:this.prevPage,per_page:this.meta.per_page}})},setData:function(t,e){var s=e.data,a=e.links,i=e.meta;this.pageNumbers=[],t?this.error=t.toString():(console.log(s),this.conversions=s,this.links=a,this.meta=i),this.showProgress=!1,this.populatePages()},populatePages:function(){if(this.pageCount)for(var t=1;t<=this.meta.last_page;t++)this.pageNumbers.push(t);else if(this.meta.current_page<=6){this.pageNumbers.push(1),this.pageNumbers.push(2),this.pageNumbers.push(3),this.pageNumbers.push(4),this.pageNumbers.push(5),this.pageNumbers.push(6),this.pageNumbers.push(7),this.pageNumbers.push("..."),this.pageNumbers.push(this.meta.last_page-1),this.pageNumbers.push(this.meta.last_page)}else this.meta.current_page+6>=this.meta.last_page?(this.pageNumbers.push(1),this.pageNumbers.push(2),this.pageNumbers.push("..."),this.pageNumbers.push(this.meta.last_page-7),this.pageNumbers.push(this.meta.last_page-6),this.pageNumbers.push(this.meta.last_page-5),this.pageNumbers.push(this.meta.last_page-4),this.pageNumbers.push(this.meta.last_page-3),this.pageNumbers.push(this.meta.last_page-2),this.pageNumbers.push(this.meta.last_page-1),this.pageNumbers.push(this.meta.last_page)):(this.pageNumbers.push(1),this.pageNumbers.push(2),this.pageNumbers.push("..."),this.pageNumbers.push(this.meta.current_page-2),this.pageNumbers.push(this.meta.current_page-1),this.pageNumbers.push(this.meta.current_page),this.pageNumbers.push(this.meta.current_page+1),this.pageNumbers.push(this.meta.current_page+2),this.pageNumbers.push("..."),this.pageNumbers.push(this.meta.last_page-1),this.pageNumbers.push(this.meta.last_page))},isPageActive:function(t){if(t==this.$route.query.page||1==t&&null==this.$route.query.page)return"active"},changePerPage:function(){this.showProgress=!0,this.$router.push({name:"settings.conversions",query:{page:1,per_page:this.meta.per_page}})}}}},"8SQ6":function(t,e,s){var a=s("VU/8")(s("/IMl"),s("HrJx"),!1,null,null,null);t.exports=a.exports},HrJx:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticClass:"card my-4"},[s("ul",{staticClass:"nav nav-pills nav-justified"},[s("li",{staticClass:"nav-item bg-white"},[s("router-link",{staticClass:"nav-link p-3",attrs:{to:{name:"settings.index"}}},[t._v("\n                    System\n                ")])],1),t._v(" "),s("li",{staticClass:"nav-item bg-white"},[s("router-link",{staticClass:"nav-link p-3",attrs:{to:{name:"settings.users"}}},[t._v("\n                    Users\n                ")])],1),t._v(" "),s("li",{staticClass:"nav-item bg-white"},[s("router-link",{staticClass:"nav-link p-3",attrs:{to:{name:"settings.units.index"}}},[t._v("\n                    Unit of Measurements\n                ")])],1),t._v(" "),s("li",{staticClass:"nav-item bg-white"},[s("router-link",{staticClass:"nav-link active p-3",attrs:{to:{name:"settings.conversions"}}},[t._v("\n                    Conversions\n                ")])],1),t._v(" "),s("li",{staticClass:"nav-item bg-white"},[s("router-link",{staticClass:"nav-link p-3 ",attrs:{to:{name:"settings.paymentTerms"}}},[t._v("\n                    Payment Terms\n                ")])],1)])]),t._v(" "),s("div",{staticClass:"card"},[s("div",{staticClass:"card-header clearfix"},[t._v("\n            Conversions / View Conversion\n            "),s("button",{staticClass:"btn btn-primary float-right",attrs:{type:"button"},on:{click:function(e){e.preventDefault(),t.setConversion("","","","","","create")}}},[t._v("+ New Conversion")])]),t._v(" "),s("div",{staticClass:"card-body"},[s("table",{staticClass:"table table-hover table-sm"},[s("caption",[s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-9"},[t._v("\n                            List of Conversions - Total Conversions "+t._s(this.meta.total)+"\n                        ")]),t._v(" "),s("div",{staticClass:"col-md-3"},[t.showProgress?s("div",{staticClass:"progress",attrs:{height:"30px;"}},[s("div",{staticClass:"progress-bar progress-bar-striped progress-bar-animated",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})]):t._e()])])]),t._v(" "),t._m(0),t._v(" "),t.conversions?s("tbody",t._l(t.conversions,function(e){var a=e.id,i=e.unit_of_measurement_from_id,n=e.from_value,r=e.unit_of_measurement_to_id,o=e.to_value;return s("tr",{key:a},[s("td",[t._v(t._s(n))]),t._v(" "),s("td",[t._v(t._s(o))]),t._v(" "),s("td",[s("button",{staticClass:"btn btn-danger",on:{click:function(e){e.preventDefault(),t.setConversion(a,i,n,r,o,"update")}}},[t._v("Edit")])])])})):t._e()])])]),t._v(" "),s("br"),t._v(" "),s("div",{staticClass:"clearfix"},[(t.pageCount,s("div",[s("nav",{staticClass:"float-left"},[s("ul",{staticClass:"pagination"},[s("li",{staticClass:"page-item",class:t.isPrevDisabled},[s("a",{staticClass:"page-link",attrs:{href:"#",disabled:""},on:{click:function(e){return e.preventDefault(),t.goToPreviousPage(e)}}},[t._v("Previous")])]),t._v(" "),s("li",{staticClass:"page-item"},[s("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.goToFirstPage(e)}}},[t._v("First")])]),t._v(" "),t._l(t.pageNumbers,function(e){return s("li",{key:e,staticClass:"page-item",class:t.isPageActive(e)},[s("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(s){s.preventDefault(),t.goToPage(e)}}},[t._v(t._s(e))])])}),t._v(" "),s("li",{staticClass:"page-item",class:t.isNextDisabled},[s("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.goToLastPage(e)}}},[t._v("Last")])]),t._v(" "),s("li",{staticClass:"page-item",class:t.isNextDisabled},[s("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.goToNextPage(e)}}},[t._v("Next")])])],2)])])),t._v(" "),s("div",{staticClass:"float-right"},[s("form",{staticClass:"form-inline"},[s("button",{staticClass:"btn btn-primary mr-2",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.openSearchModal(e)}}},[t._v("Search Conversion")]),t._v(" "),s("div",{staticClass:"input-group"},[t._m(1),t._v(" "),s("select",{directives:[{name:"model",rawName:"v-model",value:t.meta.per_page,expression:"meta.per_page"}],staticClass:"custom-select",attrs:{id:"number_of_items"},on:{change:[function(e){var s=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.$set(t.meta,"per_page",e.target.multiple?s:s[0])},t.changePerPage]}},[s("option",{attrs:{value:"10"}},[t._v("10")]),t._v(" "),s("option",{attrs:{value:"15"}},[t._v("15")]),t._v(" "),s("option",{attrs:{value:"20"}},[t._v("20")]),t._v(" "),s("option",{attrs:{value:"25"}},[t._v("25")])])])])]),t._v(" "),s("div",{staticClass:"modal fade",attrs:{id:"modal",tabindex:"-1",role:"dialog","aria-hidden":"true"}},[s("div",{staticClass:"modal-dialog",attrs:{role:"document"}},[s("div",{staticClass:"modal-content"},[t._m(2),t._v(" "),s("form",{on:{submit:function(e){return e.preventDefault(),t.createNewConversion(e)}}},[s("div",{staticClass:"modal-body"},[s("div",{staticClass:"form-group"},[s("label",[t._v("From")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.modal.from_value,expression:"modal.from_value"}],staticClass:"form-control",attrs:{type:"number",placeholder:"0",readonly:"view"===t.modal.type},domProps:{value:t.modal.from_value},on:{input:function(e){e.target.composing||t.$set(t.modal,"from_value",e.target.value)}}})]),t._v(" "),s("div",{staticClass:"form-group"},[s("select",{directives:[{name:"model",rawName:"v-model",value:t.modal.unit_of_measurement_from_id,expression:"modal.unit_of_measurement_from_id"}],staticClass:"form-control",attrs:{readonly:"view"===t.modal.type},on:{change:function(e){var s=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.$set(t.modal,"unit_of_measurement_from_id",e.target.multiple?s:s[0])}}},[s("option",{attrs:{value:"",disabled:"",hidden:""}},[t._v("Select Unit")]),t._v(" "),t._l(t.units,function(e){return s("option",{domProps:{value:e.id}},[t._v(t._s(e.name))])})],2)]),t._v(" "),s("div",{staticClass:"form-group"},[s("label",[t._v("To")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.modal.to_value,expression:"modal.to_value"}],staticClass:"form-control",attrs:{type:"number",placeholder:"0",readonly:"view"===t.modal.type},domProps:{value:t.modal.to_value},on:{input:function(e){e.target.composing||t.$set(t.modal,"to_value",e.target.value)}}})]),t._v(" "),s("div",{staticClass:"form-group"},[s("select",{directives:[{name:"model",rawName:"v-model",value:t.modal.unit_of_measurement_to_id,expression:"modal.unit_of_measurement_to_id"}],staticClass:"form-control",attrs:{readonly:"view"===t.modal.type},on:{change:function(e){var s=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.$set(t.modal,"unit_of_measurement_to_id",e.target.multiple?s:s[0])}}},[s("option",{attrs:{value:"",disabled:"",hidden:""}},[t._v("Select Unit")]),t._v(" "),t._l(t.units,function(e){return s("option",{domProps:{value:e.id}},[t._v(t._s(e.name))])})],2)])]),t._v(" "),s("div",{staticClass:"modal-footer"},[s("button",{staticClass:"btn btn-secondary",attrs:{type:"button","data-dismiss":"modal"}},[t._v("Close")]),t._v(" "),"create"===t.modal.type?s("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[t._v("Save Conversion")]):t._e(),t._v(" "),"update"===t.modal.type?s("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[t._v("Update Conversion")]):t._e()])])])])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("thead",[e("tr",[e("th",{attrs:{scope:"col"}},[this._v("From")]),this._v(" "),e("th",{attrs:{scope:"col"}},[this._v("To")]),this._v(" "),e("th",{attrs:{scope:"col"}},[this._v("Action")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"input-group-prepend"},[e("div",{staticClass:"input-group-text"},[this._v("Items per page")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"modal-header"},[e("h5",{staticClass:"modal-title"},[this._v("Conversion")]),this._v(" "),e("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[e("span",{attrs:{"aria-hidden":"true"}},[this._v("×")])])])}]}}});
//# sourceMappingURL=29.js.map