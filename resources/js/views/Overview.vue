<template>
  <div>
    <div v-bind:class="this.$store.state.showSidebar? 'content-title':'spacer content-title' ">
      <h4 class="module-title" >DASHBOARD</h4>
    </div>
    <div class="mx-md-4 px-0">
      <div class="row">
        <div class="col-md-8 col-sm-6 pr-0">
          <!-- Main Content Grid -->
          <div class="grid">
            <div class="row mt-3">
              <!-- Quotations for Approval -->
              <div class="col-6 pr-0">
                <div class="card">
                  <div class="card-header">
                    <span class="subcontent-header">
                      <strong>Quotations for Approval</strong>
                    </span>
                  </div>
                  <span v-if="this.quotationsForApproval && this.quotationsForApproval.length > 0">
                    <ul
                      class="list-group list-group-flush"
                      :key="quote.id"
                      v-for="quote in this.quotationsForApproval"
                    >
                      <li class="list-group-item">
                        {{quote.number}}
                        <router-link
                          tag="button"
                          :to="{ name: 'quotations.view', params: { id: quote.id } }"
                          type="button"
                          class="btn float-right btn-sm btn-secondary"
                        >View</router-link>
                      </li>
                    </ul>
                  </span>
                  <span v-else>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item">No Pending Quotation</li>
                    </ul>
                  </span>
                </div>
              </div>

              <!-- Stock Request for Approval -->
              <div class="col-6">
                <div class="card">
                  <div class="card-header">
                    <span class="subcontent-header">
                      <strong>Stock Requests for Approval</strong>
                    </span>
                  </div>
                  <span v-if="this.stockRequests && this.stockRequests.length > 0">
                    <ul
                      class="list-group list-group-flush"
                      :key="stock.id"
                      v-for="stock in this.stockRequests"
                    >
                      <li class="list-group-item">
                        {{stock.number}}
                        <router-link
                          :to="{ name: 'stock-requests.view', params: { id: stock.id } }"
                          tag="button"
                          class="btn float-right btn-sm btn-secondary"
                        >View</router-link>
                      </li>
                    </ul>
                  </span>
                  <span v-else>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item">No Pending Stock Request</li>
                    </ul>
                  </span>
                </div>
              </div>

              <!-- Sales Report -->
              <div class="col-6 mt-2 pr-0">
                <div class="card">
                  <div class="card-header">
                    <span class="subcontent-header">
                      <strong>Stock Transfers for Approval</strong>
                    </span>
                  </div>
                  <span v-if="this.stockTransfers && this.stockTransfers.length > 0">
                    <ul
                      class="list-group list-group-flush"
                      :key="stock.id"
                      v-for="stock in this.stockTransfers"
                    >
                      <li class="list-group-item">
                        {{stock.number}}
                        <router-link
                          tag="button"
                          class="btn float-right btn-secondary btn-sm"
                          :to="{ name: 'stock-transfers.view', params: { id: stock.id } }"
                        >View</router-link>
                      </li>
                    </ul>
                  </span>
                  <span v-else>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item">No Pendting Stock Transfer</li>
                    </ul>
                  </span>
                </div>
              </div>

              <!-- Purchase Orders -->
              <div class="col-6 mt-2">
                <div class="card">
                  <div class="card-header">
                    <span class="subcontent-header">
                      <strong>Purchase Orders for Approval</strong>
                    </span>
                  </div>
                  <span v-if="this.purchaseOrders && this.purchaseOrders.length > 0">
                    <ul
                      class="list-group list-group-flush"
                      :key="po.id"
                      v-for="po in this.purchaseOrders"
                    >
                      <li class="list-group-item">
                        {{po.reference_number}}
                        <router-link
                          tag="button"
                          class="btn float-right btn-secondary btn-sm"
                          :to="{ name: 'purchase-orders.view', params: { id: po.id } }"
                        >View</router-link>
                      </li>
                    </ul>
                  </span>
                  <span v-else>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item">No Pending Order</li>
                    </ul>
                  </span>
                </div>
              </div>
            </div>

            <!-- PO, RO, Profit -->
            <div class="row mt-3">
              <div class="col-12">
                <div class="row">
                  <!-- Daily PO -->
                  <div class="col-md-4 col-sm-12">
                    <div class="card card-min">
                      <div class="card-body row">
                        <div class="col-md-12 col-sm-12 text-center center">
                          <span class="display-4">{{todaysPurchaseOrders.length}}</span>
                        </div>
                      </div>
                      <div class="card-footer text-center">
                        <strong>Today's Issued Purchase Order</strong>
                      </div>
                    </div>
                  </div>

                  <!-- Daily RO -->
                  <div class="col-md-4 col-sm-12">
                    <div class="card card-min">
                      <div class="card-body row">
                        <div class="col-md-12 col-sm-12 text-center center">
                          <span class="display-4">{{todaysReceiveOrders.length}}</span>
                        </div>
                      </div>
                      <div class="card-footer text-center">
                        <strong>Today's Issued Received Order</strong>
                      </div>
                    </div>
                  </div>

                  <!-- Daily Income -->
                  <div class="col-md-4 col-sm-12">
                    <div class="card card-min">
                      <div class="card-body row">
                        <div class="col-md-12 col-sm-12 text-center center">
                          <span class="display-4">{{this.kFormatter(totalProfit)}}</span>
                        </div>
                      </div>
                      <div class="card-footer text-center">
                        <strong>Today's Profit</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Sales Chart, Purchase Order Comparison  -->
            <div class="row mt-3">
            </div>
          </div>
        </div>

        <!-- SubContent -->
        <div class="col-md-4 col-sm-6">
          <div class="row mt-3">
            <!-- Display Top 5 Latest P.O -->
            <div class="col-12">
              <div class="card">
                <div class="card-header">
                  <span class="subcontent-header">
                    <strong>Latest Purchase Orders</strong>
                  </span>
                </div>
                <span v-if="this.todaysPurchaseOrders && this.todaysPurchaseOrders.length > 0">
                  <ul
                    class="list-group list-group-flush"
                    :key="po.id"
                    v-for="po in this.todaysPurchaseOrders"
                  >
                    <li class="list-group-item">
                      {{po.reference_number}}
                      <router-link
                        tag="button"
                        :to="{ name: 'purchase-orders.view', params: { id: po.id } }"
                        type="button"
                        class="btn float-right btn-sm btn-secondary"
                      >View</router-link>
                    </li>
                  </ul>
                </span>
                <span v-else>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">No Purchase Order Available</li>
                  </ul>
                </span>
              </div>
            </div>
          </div>

          <div class="row mt-2">
            <!-- Display Top 5 Latest P.O -->
            <div class="col-12">
              <div class="card">
                <div class="card-header">
                  <span class="subcontent-header">
                    <strong>Latest Quotations</strong>
                  </span>
                </div>
                <span v-if="this.quotations && this.quotations.length > 0">
                  <ul
                    class="list-group list-group-flush"
                    :key="quote.id"
                    v-for="quote in this.quotations"
                  >
                    <li class="list-group-item">
                      {{quote.number}}
                      <router-link
                        tag="button"
                        :to="{ name: 'quotations.view', params: { id: quote.id } }"
                        type="button"
                        class="btn float-right btn-sm btn-secondary"
                      >View</router-link>
                    </li>
                  </ul>
                </span>
                <span v-else>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">No Quotations Available</li>
                  </ul>
                </span>
              </div>
            </div>
          </div>

          <div class="row mt-2">
            <!-- Display Top 5 Latest Stocks -->
            <div class="col-12">
              <div class="card">
                <div class="card-header">
                  <span class="subcontent-header">
                    <strong>Shelf Days Per Item</strong>
                  </span>
                </div>
                <span v-if="this.stocks && this.stocks.length > 0">
                  <ul
                    class="list-group list-group-flush"
                    :key="stock.id"
                    v-for="stock in this.stocks"
                  >
                    <li class="list-group-item">
                      {{stock.item.name}}
                      <router-link
                        tag="button"
                        :to="{ name: 'items.view', params: { id: stock.id } }"
                        type="button"
                        class="btn float-right btn-sm btn-secondary"
                      >View</router-link>
                    </li>
                  </ul>
                </span>
                <span v-else>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">No Stock Available</li>
                  </ul>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const createBasicConfig = (type, labels, datasets, options) => {
  return {
    type: type,
    data: {
      labels: labels,
      datasets: datasets
    },
    options: options
  };
};

const generateChart = (chartElement, chartOptions) =>
  chartElement && chartOptions
    ? new Chart(chartElement, chartOptions)
    : new Chart();
const convertToDate = strDate => new Date(strDate).toDateString();

export default {
  data() {
    return {
      selectedBranchWeek: "",
      selectedTypeWeek: "",
      ifReady: false,
      chart: "",
      salesReportChart: "",
      todaysPurchaseOrderChart: "",
      todaysReceivedOrderChart: "",
      todaysProfitChart: "",
      salesComparisonChart: "",
      purchaseComparisonChart: "",
      dateToday: new Date(),
      stocks: [],
      quotations: [],
      quotationsForApproval: [],
      todaysQuotations: [],
      invoices: [],
      purchaseOrders: [],
      todaysPurchaseOrders: [],
      bills: [],
      todaysReceiveOrders: [],
      receiveOrder: [],
      todaysStockRequests: [],
      stockRequests: [],
      invoicePayment: "",
      stockRequest: [],
      stockTransfers: [],
      options: [],
      totalProfit: 0,
      chartLabels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      salesTypeTableData: [],
      salesTypeChartData: [
        {
          label: "Foods",
          data: [
            {
              val: 1
            },
            {
              val: 2
            },
            {
              val: 3
            },
            {
              val: 4
            }
          ]
        },
        {
          label: "Oats",
          data: [
            {
              val: 5
            },
            {
              val: 10
            },
            {
              val: 30
            },
            {
              val: 40
            }
          ]
        }
      ]
    };
  },

  methods: {
    changeBranchWeek() {
      //console.log(this.selectedBranchWeek)
    },
    changeTypeWeek() {
      //   console.log(this.selectedTypeWeek);
      this.salesTypeChartData.map((data, i) => {
        if (data.label === this.selectedTypeWeek) {
          this.salesTypeTableData = this.salesTypeChartData[i].data;
        }
      });
    },
    kFormatter(num) {
      return num > 999 ? (num / 1000).toFixed(1) + "K" : num;
    }
  },
  mounted() {
    const weeks = [
      {
        label: "Drinks",
        data: [
          {
            val: 1
          },
          {
            val: 2
          },
          {
            val: 3
          },
          {
            val: 4
          }
        ]
      }
    ];
    const createWeekData = weekArray => {
      return weekArray.map((week, i) => {
        return {
          label: week.label,
          data: week.data.map(data => data.val),
          backgroundColor: `rgba(54, 162, 235, ${week.shade})`,
          borderColor: "rgba(54, 162, 235, 1)"
        };
      });
    };

    const createTypeChartData = weekdata => {
      return weekdata.map(arr => {
        return {
          label: arr.label,
          data: arr.data,
          backgroundColor: `rgba(54, 162, 235, ${arr.percent})`,
          borderColor: "rgba(54, 162, 235, 1)"
        };
      });
    };

    const createOptions = weekArray => {
      return weekArray.map(data => data.label);
    };

    this.salesTypeTableData = this.salesTypeChartData[0].data;
    // console.log(this.salesTypeTableData);
    this.options = createOptions(this.salesTypeChartData);

    //console.clear();
    const getAllQuotations = () => {
      axios
        .get("/api/quotations/get-all-quotations")
        .then(res => {
          const allQuotations = res.data.quotations;
          //   // console.groupCollapsed("Quotation Request");

          const log = JSON.stringify(allQuotations);
          //console.log('All Quotation', JSON.parse(log));

          this.quotations = allQuotations
            ? allQuotations.sort(
                (a, b) => new Date(a.created_at) - new Date(b.created_at)
              )
            : [];

          const issuedQuotations = (this.quotationsForApproval = allQuotations.filter(
            quo => quo.status === 0
          ));

          this.todaysQuotations = allQuotations.filter(
            quo =>
              quo.status === 0 &&
              new Date(quo.created_at).getDate() === this.dateToday.getDate()
          );

          //console.log('Issued Quotations',issuedQuotations)
          //   // console.groupEnd();
        })
        .catch(error => console.error(error));
    };

    const getAllInvoices = () => {
      axios
        .get("/api/invoices/get-all-invoices")
        .then(res => {
          //   // console.groupCollapsed("Invoice Request");
          const allInvoices = res.data.invoices.sort(
            (a, b) => new Date(a.created_at) - new Date(b.created_at)
          );
          //console.log('All Invoices ->',allInvoices)
          //   // console.groupEnd();
        })
        .catch(error => console.error(error));
    };

    const getTotalProfit = array => {
      let tempAmount = 0;
      const finalAmount = 0;
      if (typeof array === "array") {
        if (array.reduce) {
          finalAmount = array.reduce((prev, curr) => {
            let prevAmount = prev.amount ? prev.amount : 0;
            let currAmount = curr.amount ? curr.amount : 0;
            return parseInt(prevAmount) + parseInt(currAmount);
          });
        }
      }
      return finalAmount ? finalAmount : 0;
    };

    const getAllInvoicePayments = () => {
      axios
        .get("/api/invoice-payments/get-all-invoice-payments")
        .then(res => {
          //   // console.groupCollapsed("Invoice Payments");
          const allInvoices = res.data.invoice_payments;
          this.invoices = allInvoices
            ? allInvoices.sort(
                (a, b) => new Date(a.created_at) - new Date(b.created_at)
              )
            : [];
          //console.log('All Invoices ->',JSON.parse(JSON.stringify({res:allInvoices})))

          const testData = JSON.parse(JSON.stringify({ res: allInvoices }));

          this.totalProfit = getTotalProfit(this.invoices);
          //console.log('Total Profit ->', this.totalProfit)
          this.total;

          // Separate by Month
          const monthData = testData.res.filter(
            data =>
              new Date(data.created_at).getMonth() === new Date().getMonth()
          );
          //console.log('Month Data ->', monthData)

          //Sort Month by first to last
          const sortedMonthData = monthData.sort(
            (a, b) => new Date(a.created_at) - new Date(b.created_at)
          );

          Date.prototype.getWeekNumber = function() {
            var d = new Date(
              Date.UTC(this.getFullYear(), this.getMonth(), this.getDate())
            );
            var dayNum = d.getUTCDay() || 7;
            d.setUTCDate(d.getUTCDate() + 4 - dayNum);
            var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
            return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
          };

          // Separate Month Data to Week Data
          let weekData = [[], [], [], []];
          let tempData = [];

          function weekOfMonth(m) {
            return (
              m.week() -
              moment(m)
                .startOf("month")
                .week() +
              1
            );
          }

          sortedMonthData.map(data => {
            const weeknumber = weekOfMonth(moment(data.created_at));
            weekData[weeknumber - 1].push(data);
          });

          //console.log('Week Data ->', weekData)

          //   // console.groupEnd();
        })
        .catch(error => console.error(error));
    };

    const getAllPurchaseOrders = () => {
      axios
        .get("/api/purchase-orders/get-all-purchase-orders")
        .then(res => {
          //   // console.groupCollapsed("Purchase Orders");
          const allPurchaseOrders = res.data.purchase_orders;
          //console.log('All Purchase Orders ->',JSON.parse(JSON.stringify({res:res.data.purchase_orders})))
          const issuedReceiveOrders = allPurchaseOrders.filter(
            data => data.status === 0
          );
          //console.log('Issued Purchase Orders ->', allPurchaseOrders)
          this.todaysPurchaseOrders = allPurchaseOrders.sort(
            (a, b) => new Date(a.created_at) - new Date(b.created_at)
          );
          this.purchaseOrders = this.todaysPurchaseOrders.filter(
            (val, i) => i < 10
          );
          //   // console.groupEnd();
        })
        .catch(error => console.error(error));
    };

    const getAllReceiveOrder = () => {
      axios
        .get("/api/receive-orders/get-all-receive-orders")
        .then(res => {
          // console.groupCollapsed("Receive Orders");
          const allReceiveOrders = res.data.receive_orders;
          //console.log('All receive Orders ->', allReceiveOrders)
          this.todaysReceiveOrders = allReceiveOrders
            ? allReceiveOrders.sort(
                (a, b) => new Date(a.created_at) - new Date(b.created_at)
              )
            : [];
          this.todaysReceiveOrders = this.todaysReceiveOrders.filter(
            (val, i) => i < 10
          );
          // console.groupEnd();
        })
        .catch(error => console.error(error));
    };

    const getAllStockTransfer = () => {
      axios
        .get("/api/stock-transfers/get-all-stock-transfers")
        .then(res => {
          //// console.group('Stock Transfer')
          const allStockTransfer = res.data.stock_transfers;
          //console.log('All Stock Transfers ->',JSON.parse(JSON.stringify({res:allStockTransfer})))
          const stockTransferApproval = allStockTransfer.filter(
            data => data.status === 0
          );
          this.stockTransfers = stockTransferApproval
            ? stockTransferApproval.sort(
                (a, b) => new Date(a.created_at) - new Date(b.created_at)
              )
            : [];
          // console.groupEnd();
        })
        .catch(error => console.error(error));
    };

    const getAllStockRequest = () => {
      axios
        .get("/api/stock-requests/get-all-unapproved-stock-requests")
        .then(res => {
          // console.groupCollapsed("Stock Requests");
          const allStockRequests = res.data.stock_requests;
          const log = JSON.stringify({ stock_request: allStockRequests });
          //console.log('All Stock Requests ->',JSON.parse(log))
          this.stockRequests = allStockRequests
            ? allStockRequests.sort(
                (a, b) => new Date(a.created_at) - new Date(b.created_at)
              )
            : [];
          // console.groupEnd();
        })
        .catch(error => console.error(error));
    };

    const getAllBills = () => {
      axios
        .get("/api/bill-payments/get-all-bill-payments")
        .then(res => {
          // console.groupCollapsed("Bills Payment");
          const allBills = { bills: res.data.bills_payments };
          const log = JSON.stringify(allBills);
          //console.log('All Bills ->',JSON.parse(log))
          // this.bills = allBills.sort((a,b)=>new Date(a.created_at)-new Date(b.created_at));
          // console.groupEnd();
        })
        .catch(error => console.error(error));
    };

    const getData = async () => {
      const res = await axios.get("/api/dashboard");
      console.groupCollapsed("Dashboard Request");
      console.log("[Dashboard]", res.data);
      console.groupEnd();
      const {
        pending_quotations,
        pending_stock_requests,
        pending_stock_transfers,
        today_purchase_orders,
        today_quotations,
        shelf_days_per_item,
        pending_purchase_orders
      } = res.data.dashboard_payload;

      // limiter
      if (typeof shelf_days_per_item === "array") {
        shelf_days_per_item = shelf_days_per_item.map((value, i) => {
          if (i <= 10) {
            return value;
          }
        });
      }

      this.quotationsForApproval = pending_quotations;
      this.stockRequests = pending_stock_requests;
      this.stockTransfers = pending_stock_transfers;
      this.purchaseOrders = pending_purchase_orders;
      this.quotations = pending_quotations;
      this.stocks = shelf_days_per_item;
      this.todaysQuotations = today_quotations;
      this.todaysPurchaseOrders = today_purchase_orders;
    //   [{id:12312,number:12312}]
    };

    getData();
    // getAllQuotations();
    getAllInvoices();
    getAllBills();
    getAllReceiveOrder();
    getAllInvoicePayments();
  }
};
</script>

<style>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.card-min {
  min-height: 200px;
}
.card-mod {
  padding-top: 10px;
}
</style>
