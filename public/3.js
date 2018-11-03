webpackJsonp([3],{"3ShG":function(t,e,s){var a=s("8Evm");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);s("rjj0")("09dc568c",a,!0,{})},"8Evm":function(t,e,s){(t.exports=s("FZ+f")(!1)).push([t.i,".center{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.card-min{min-height:200px}.card-mod{padding-top:10px}",""])},Dztk:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=function(t,e,s,a){return{type:t,data:{labels:e,datasets:s},options:a}},r=function(t,e){return t&&e?new Chart(t,e):new Chart};e.default={data:function(){return{selectedBranchWeek:"",selectedTypeWeek:"",ifReady:!1,chart:"",salesReportChart:"",todaysPurchaseOrderChart:"",todaysReceivedOrderChart:"",todaysProfitChart:"",salesComparisonChart:"",purchaseComparisonChart:"",dateToday:new Date,quotations:[],quotationsForApproval:[],todaysQuotations:[],invoices:[],purchaseOrders:[],todaysPurchaseOrders:[],bills:[],todaysReceiveOrders:[],receiveOrder:[],todaysStockRequests:[],stockRequests:[],invoicePayment:"",stockRequest:[],stockTransfers:[],options:[],totalProfit:0,chartLabels:["Week 1","Week 2","Week 3","Week 4"],salesTypeTableData:[],salesTypeChartData:[{label:"Foods",data:[{val:1},{val:2},{val:3},{val:4}]},{label:"Oats",data:[{val:5},{val:10},{val:30},{val:40}]}]}},methods:{changeBranchWeek:function(){},changeTypeWeek:function(){var t=this;console.log(this.selectedTypeWeek),this.salesTypeChartData.map(function(e,s){e.label===t.selectedTypeWeek&&(t.salesTypeTableData=t.salesTypeChartData[s].data)})},kFormatter:function(t){return t>999?(t/1e3).toFixed(1)+"K":t}},mounted:function(){var t=this,e=function(t){return t.map(function(t,e){return{label:t.label,data:t.data.map(function(t){return t.val}),backgroundColor:"rgba(54, 162, 235, "+t.shade+")",borderColor:"rgba(54, 162, 235, 1)"}})};this.salesTypeTableData=this.salesTypeChartData[0].data,console.log(this.salesTypeTableData),this.options=this.salesTypeChartData.map(function(t){return t.label});axios.get("/api/quotations/get-all-quotations").then(function(e){var s=e.data.quotations;console.groupCollapsed("Quotation Request"),JSON.stringify(s),t.quotations=s?s.sort(function(t,e){return new Date(t.created_at)-new Date(e.created_at)}):[],t.quotationsForApproval=s.filter(function(t){return 0===t.status}),t.todaysQuotations=s.filter(function(e){return 0===e.status&&new Date(e.created_at).getDate()===t.dateToday.getDate()}),console.groupEnd()}).catch(function(t){return console.error(t)}),axios.get("/api/invoices/get-all-invoices").then(function(t){console.groupCollapsed("Invoice Request"),t.data.invoices.sort(function(t,e){return new Date(t.created_at)-new Date(e.created_at)}),console.groupEnd()}).catch(function(t){return console.error(t)}),axios.get("/api/purchase-orders/get-all-purchase-orders").then(function(e){console.groupCollapsed("Purchase Orders");var s=e.data.purchase_orders;s.filter(function(t){return 0===t.status}),t.todaysPurchaseOrders=s.sort(function(t,e){return new Date(t.created_at)-new Date(e.created_at)}),t.purchaseOrders=t.todaysPurchaseOrders.filter(function(t,e){return e<10}),console.groupEnd()}).catch(function(t){return console.error(t)}),axios.get("/api/bill-payments/get-all-bill-payments").then(function(t){console.groupCollapsed("Bills Payment");var e={bills:t.data.bills_payments};JSON.stringify(e),console.groupEnd()}).catch(function(t){return console.error(t)}),axios.get("/api/receive-orders/get-all-receive-orders").then(function(e){console.groupCollapsed("Receive Orders");var s=e.data.receive_orders;t.todaysReceiveOrders=s?s.sort(function(t,e){return new Date(t.created_at)-new Date(e.created_at)}):[],t.purchaseOrders=t.todaysPurchaseOrders.filter(function(t,e){return e<10}),console.groupEnd()}).catch(function(t){return console.error(t)}),axios.get("/api/invoice-payments/get-all-invoice-payments").then(function(e){console.groupCollapsed("Invoice Payments");var s=e.data.invoice_payments;t.invoices=s?s.sort(function(t,e){return new Date(t.created_at)-new Date(e.created_at)}):[];var a,r=JSON.parse(JSON.stringify({res:s}));t.totalProfit=((a=t.invoices).reduce&&a.reduce(function(t,e){var s=t.amount?t.amount:0,a=e.amount?e.amount:0;return parseInt(s)+parseInt(a)}),finalAmount||0),t.total;var i=r.res.filter(function(t){return new Date(t.created_at).getMonth()===(new Date).getMonth()}).sort(function(t,e){return new Date(t.created_at)-new Date(e.created_at)});Date.prototype.getWeekNumber=function(){var t=new Date(Date.UTC(this.getFullYear(),this.getMonth(),this.getDate())),e=t.getUTCDay()||7;t.setUTCDate(t.getUTCDate()+4-e);var s=new Date(Date.UTC(t.getUTCFullYear(),0,1));return Math.ceil(((t-s)/864e5+1)/7)};var o=[[],[],[],[]];i.map(function(t){var e,s=(e=moment(t.created_at)).week()-moment(e).startOf("month").week()+1;o[s-1].push(t)}),console.groupEnd()}).catch(function(t){return console.error(t)}),axios.get("/api/stock-requests/get-all-unapproved-stock-requests").then(function(e){console.groupCollapsed("Stock Requests");var s=e.data.stock_requests;JSON.stringify({stock_request:s}),t.stockRequests=s?s.sort(function(t,e){return new Date(t.created_at)-new Date(e.created_at)}):[],console.groupEnd()}).catch(function(t){return console.error(t)}),axios.get("/api/stock-transfers/get-all-stock-transfers").then(function(e){var s=e.data.stock_transfers.filter(function(t){return 0===t.status});t.stockTransfers=s?s.sort(function(t,e){return new Date(t.created_at)-new Date(e.created_at)}):[],console.groupEnd()}).catch(function(t){return console.error(t)}),null==this.$store.state.corporation_id&&this.$router.push({name:"corporations.select"});var s=a("bar",this.chartLabels,e([{label:"Drinks",data:[{val:1},{val:2},{val:3},{val:4}]}]),{scales:{yAxes:[{ticks:{beginAtZero:!0}}]}}),i=a("bar",this.chartLabels,e(this.salesTypeChartData),{scales:{yAxes:[{ticks:{beginAtZero:!0}}]}});r("sales-report-branch",s),r("sales-report-type",i),new Promise(function(t,e){axios.get("/api/statistics/test-payload").then(function(e){var s=e.data.payload,r=s.map(function(t){return e=t.date,new Date(e).toDateString();var e}),i=s.map(function(t){return t.data});a("bar",r,[{label:"Sales",data:i,backgroundColor:"rgba(54, 162, 235, 0.6)",borderColor:"rgba(54, 162, 235, 1)",borderWidth:2,pointRadius:0,lineTension:0}],{scales:{yAxes:[{ticks:{beginAtZero:!0}}]}}),a("line",r,[{data:i,backgroundColor:"rgba(54, 162, 235, 0.6)",borderColor:"rgba(54, 162, 235, 1)",borderWidth:2,pointRadius:0,lineTension:0,fill:!1}],{legend:{display:!1},scales:{yAxes:[{display:!1,gridLines:{display:!1},ticks:{beginAtZero:!0}}],xAxes:[{display:!1}]}}),a("bar",["Week 1","Week 2","Week 3","Week 4"],[{label:"Type 1",data:[3,7,4,6],backgroundColor:"rgba(54, 162, 235, 0.3)",borderColor:"rgba(54, 162, 235, 1)"},{label:"Type 2",data:[4,3,5,7],backgroundColor:"rgba(54, 162, 235, 0.5)",borderColor:"rgba(54, 162, 235, 1)"},{label:"Type 3",data:[7,2,6,9],backgroundColor:"rgba(54, 162, 235, 0.9)",borderColor:"rgba(54, 162, 235, 1)"}],{scales:{yAxes:[{ticks:{beginAtZero:!0}}]}});t()})}).then(function(){t.ifReady=!0})}}},PXrU:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"mx-md-4 px-0"},[t._m(0),t._v(" "),s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-8 col-sm-6 pr-0"},[s("div",{staticClass:"grid"},[s("div",{staticClass:"row mt-3"},[s("div",{staticClass:"col-6 pr-0"},[s("div",{staticClass:"card"},[t._m(1),t._v(" "),this.quotationsForApproval&&this.quotationsForApproval.length>0?s("span",t._l(this.quotationsForApproval,function(e){return s("ul",{key:e.id,staticClass:"list-group list-group-flush"},[s("li",{staticClass:"list-group-item"},[s("router-link",{attrs:{to:{name:"quotations.view",params:{id:e.id}}}},[t._v(t._s(e.number))])],1)])})):s("span",[t._m(2)])])]),t._v(" "),s("div",{staticClass:"col-6"},[s("div",{staticClass:"card"},[t._m(3),t._v(" "),this.stockRequests&&this.stockRequests.length>0?s("span",t._l(this.stockRequests,function(e){return s("ul",{key:e.id,staticClass:"list-group list-group-flush"},[s("li",{staticClass:"list-group-item"},[s("router-link",{attrs:{to:{name:"stock-requests.view",params:{id:e.id}}}},[t._v(t._s(e.number))])],1)])})):s("span",[t._m(4)])])]),t._v(" "),s("div",{staticClass:"col-6 mt-2 pr-0"},[s("div",{staticClass:"card"},[t._m(5),t._v(" "),this.stockTransfers&&this.stockTransfers.length>0?s("span",t._l(this.stockTransfers,function(e){return s("ul",{key:e.id,staticClass:"list-group list-group-flush"},[s("li",{staticClass:"list-group-item"},[s("router-link",{attrs:{to:{name:"stock-transfers.view",params:{id:e.id}}}},[t._v(t._s(e.number))])],1)])})):s("span",[t._m(6)])])]),t._v(" "),s("div",{staticClass:"col-6 mt-2"},[s("div",{staticClass:"card"},[t._m(7),t._v(" "),this.purchaseOrders&&this.purchaseOrders.length>0?s("span",t._l(this.purchaseOrders,function(e){return s("ul",{key:e.id,staticClass:"list-group list-group-flush"},[s("li",{staticClass:"list-group-item"},[s("router-link",{attrs:{to:{name:"purchase-orders.view",params:{id:e.id}}}},[t._v(t._s(e.reference_number))])],1)])})):s("span",[t._m(8)])])])]),t._v(" "),s("div",{staticClass:"row mt-3"},[s("div",{staticClass:"col-12"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-4 col-sm-12"},[s("div",{staticClass:"card card-min"},[s("div",{staticClass:"card-body row"},[s("div",{staticClass:"col-md-12 col-sm-12 text-center  center"},[s("span",{staticClass:"display-4"},[t._v(t._s(t.todaysPurchaseOrders.length))])])]),t._v(" "),t._m(9)])]),t._v(" "),s("div",{staticClass:"col-md-4 col-sm-12"},[s("div",{staticClass:"card card-min"},[s("div",{staticClass:"card-body row"},[s("div",{staticClass:"col-md-12 col-sm-12 text-center  center"},[s("span",{staticClass:"display-4"},[t._v(t._s(t.todaysReceiveOrders.length))])])]),t._v(" "),t._m(10)])]),t._v(" "),s("div",{staticClass:"col-md-4 col-sm-12"},[s("div",{staticClass:"card card-min"},[s("div",{staticClass:"card-body row"},[s("div",{staticClass:"col-md-12 col-sm-12 text-center  center"},[s("span",{staticClass:"display-4"},[t._v(t._s(this.kFormatter(t.totalProfit)))])])]),t._v(" "),t._m(11)])])])])]),t._v(" "),s("div",{staticClass:"row mt-3"})])]),t._v(" "),s("div",{staticClass:"col-md-4 col-sm-6"},[s("div",{staticClass:"row mt-3"},[s("div",{staticClass:"col-12"},[s("div",{staticClass:"card"},[t._m(12),t._v(" "),this.purchaseOrders&&this.purchaseOrders.length>0?s("span",t._l(this.purchaseOrders,function(e){return s("ul",{key:e.id,staticClass:"list-group list-group-flush"},[s("li",{staticClass:"list-group-item"},[s("router-link",{attrs:{to:{name:"purchase-orders.view",params:{id:e.id}}}},[t._v(t._s(e.reference_number))])],1)])})):s("span",[t._m(13)])])])]),t._v(" "),s("div",{staticClass:"row mt-2"},[s("div",{staticClass:"col-12"},[s("div",{staticClass:"card"},[t._m(14),t._v(" "),this.quotations&&this.quotations.length>0?s("span",t._l(this.quotations,function(e){return s("ul",{key:e.id,staticClass:"list-group list-group-flush"},[s("li",{staticClass:"list-group-item"},[s("router-link",{attrs:{to:{name:"quotations.view",params:{id:e.id}}}},[t._v(t._s(e.number))])],1)])})):s("span",[t._m(15)])])])])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"row"},[e("div",{staticClass:"col-12 my-3"},[e("span",{staticClass:"h3"},[this._v("Dashboard")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"card-header"},[e("span",{staticClass:"subcontent-header"},[e("strong",[this._v("Quotations for Approval")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("ul",{staticClass:"list-group list-group-flush"},[e("li",{staticClass:"list-group-item"},[this._v("No Pending Quotation")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"card-header"},[e("span",{staticClass:"subcontent-header"},[e("strong",[this._v("Stock Requests for Approval")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("ul",{staticClass:"list-group list-group-flush"},[e("li",{staticClass:"list-group-item"},[this._v("No Pending Stock Request")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"card-header"},[e("span",{staticClass:"subcontent-header"},[e("strong",[this._v("Stock Transfers for Approval")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("ul",{staticClass:"list-group list-group-flush"},[e("li",{staticClass:"list-group-item"},[this._v("No Pendting Stock Transfer")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"card-header"},[e("span",{staticClass:"subcontent-header"},[e("strong",[this._v("Purchase Orders for Approval")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("ul",{staticClass:"list-group list-group-flush"},[e("li",{staticClass:"list-group-item"},[this._v("No Pending Order")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"card-footer text-center"},[e("strong",[this._v("\n                                                Today's Issued Purchase Order\n                                            ")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"card-footer text-center"},[e("strong",[this._v("\n                                            Today's Issued Received Order\n                                            ")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"card-footer text-center"},[e("strong",[this._v("\n                                            Today's Profit\n                                            ")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"card-header"},[e("span",{staticClass:"subcontent-header"},[e("strong",[this._v(" Latest Purchase Orders ")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("ul",{staticClass:"list-group list-group-flush"},[e("li",{staticClass:"list-group-item"},[this._v("No Purchase Order Available")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"card-header"},[e("span",{staticClass:"subcontent-header"},[e("strong",[this._v("Latest Quotations")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("ul",{staticClass:"list-group list-group-flush"},[e("li",{staticClass:"list-group-item"},[this._v("No Quotations Available")])])}]}},Yxqj:function(t,e,s){var a=s("VU/8")(s("Dztk"),s("PXrU"),!1,function(t){s("3ShG")},null,null);t.exports=a.exports}});
//# sourceMappingURL=3.js.map