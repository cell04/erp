<template>
    <div>
        <div class="content-title">
            <h4 class="module-title">SALES INVOICE</h4>
            <hr class="title-border">
        </div>

        <div class="p-md-4">
            <div class="container p-md-0">          
                <div class="card">
                    <div class="card-header">
                        <a class="text-success" href="" @click.prevent="viewItems">Sales Invoices</a>
                        <a class="text-secondary"> / View Sales Invoice</a>
                        <span class="float-right"> <strong>Sales Invoice #:</strong> {{invoices.reference_number}}</span>
                    </div>
                    <div class="card-body">
                        <div v-if="ifReady">
                            <div class="row mb-4">
                                <div class="col-sm-6">
                                    <h6 class="mb-3">To:</h6>
                                    <div>
                                        <strong>{{contacts.person}}</strong>
                                    </div>
                                    <div>Company: {{contacts.company}}</div>
                                    <div>{{contacts.company_address}}</div>
                                    <div>Email: {{contacts.email}}</div>
                                    <div>Phone: {{contacts.mobile_number}}</div>
                                </div>
                            </div>

                            <div class="table-responsive-sm">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th class="center">#</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">UOM</th>
                                            <th scope="col">Qty</th>
                                            <th class="text-right">Unit Price</th>
                                            <th class="text-right">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr :key="item.id" v-for="(item, index) in invoiceItems">
                                            <td>{{ index + 1 }}</td>
                                            <td>{{ item.item.name }}</td>
                                            <td>{{ item.item.description }}</td>
                                            <td>{{ item.unit_of_measurement.name }}</td>
                                            <td>{{ item.quantity }}</td>
                                            <td align="right">{{ item.price }}</td>
                                            <td align="right">{{ subtotalRow[index] | Decimal }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-lg-4 col-sm-5"></div>
                                <div class="col-lg-4 col-sm-5 ml-auto">
                                    <table class="table table-clear">
                                        <tbody>
                                            <tr>
                                                <td align="left">
                                                <strong>Subtotal</strong>
                                                </td>
                                                <td align="right">{{total - (total * taxPercent) | Decimal }}</td>
                                            </tr>
                                            <tr>
                                                <td align="left">
                                                <strong>VAT ({{tax}})</strong>
                                                </td>
                                                <td align="right">{{(total * taxPercent) | Decimal}}</td>
                                            </tr>
                                            <tr>
                                                <td align="left">
                                                <strong>Total</strong>
                                                </td>
                                                <td align="right">
                                                <strong>{{total  | Decimal }}</strong>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                            <br>
                            <button type="button" class="btn btn-outline-success btn-sm" @click.prevent="viewItems"><i class="fas fa-chevron-left"></i> Back</button>
                        </div>
                        <div v-else>
                            <div class="progress">
                                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      ifReady: false,
      invoices: [],
      contacts: [],
      roRefNum: [],
      invoiceItems: [],
      corpData: [],
      tax: "",
      taxPercent: "",
    };
  },

    filters: {
        Decimal: function (value) {
            if (value != 0) {
                return value.toFixed(2);
            }
            else {
                return '0.00'
            }
        }
    },

  mounted() {
    this.getItem();
  },

  methods: {
    getItem() {
      new Promise((resolve, reject) => {
        axios.get("/api/invoices/" + this.$route.params.id).then(res => {
        //   console.log("Invoices: " + JSON.stringify(res.data.invoice));
          this.ifReady = true;
          this.invoices = res.data.invoice;
          this.contacts = res.data.invoice.contact;
          this.invoiceItems = res.data.invoice.invoice_items;
          this.roRefNum = res.data.invoice.quotation;
          this.tax = res.data.invoice.quotation.tax;
          this.taxPercent = this.tax / 100;

          if (!res.data.response) {
            return;
          }
          resolve();
        });
      });
    },
    viewItems() {
      this.$router.push({
        name: "invoices.index"
      });
    }
  },

  computed: {
    subtotalRow() {
      return this.invoiceItems.map(item => {
        return Number(item.quantity * item.price);
      });
    },
    total() {
      return this.invoiceItems.reduce((total, item) => {
        return total + item.quantity * item.price;
      }, 0);
    }
  }
};
</script>

