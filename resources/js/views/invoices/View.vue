<template>
    <div>
        <div class="card">
            <div class="card-header">
                <b>Invoices / View Invoice</b>
            </div>
            <div class="card-body">
                <div v-if="ifReady">
                    <fieldset>
                        <div class="row">
                            <div class="col-md-6 form-group">
                                <label>Receive Order #</label>
                                <input type="text" class="form-control" v-model="roRefNum.reference_number" readonly>
                            </div>

                            <div class="col-md-6 form-group">
                                <label>Customer</label>
                                <input type="text" class="form-control" v-model="contacts.person" readonly>
                            </div>

                            <div class="col-md-6 form-group">
                                <label>Invoice #</label>
                                <input type="text" class="form-control" v-model="invoices.reference_number" readonly>
                            </div>

                            <div class="col-md-6 form-group">
                                <label>Due Date</label>
                                <input type="date" class="form-control" v-model="invoices.due_date" readonly>
                            </div>
                        </div>
                    </fieldset>

                    <br />

                    <table class="table table-hover table-sm">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Description</th>
                                <th scope="col">Received Qty</th>
                                <th scope="col">UOM</th>
                                <th scope="col">Unit Price</th>
                                <th scope="col">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr :key="item.id" v-for="(item, index) in invoiceItems">
                                <td>{{ item.item.name }}</td>
                                <td>{{ item.item.description }}</td>
                                <td>{{ item.quantity }}</td>
                                <td>{{ item.unit_of_measurement.name }}</td>
                                <td>{{ item.item_pricelist.price }}</td>
                                <td>{{ subtotalRow[index] }}</td>
                            </tr>
                            <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        <b>Total</b>
                                    </td>
                                    <td>{{total}}</td>
                                    <td></td>
                                </tr>
                        </tbody>
                    </table>
                    <button type="button" class="btn btn-outline-success btn-sm" @click.prevent="viewItems"><i class="fas fa-chevron-left"></i> Back</button>
                </div>

                <div v-else>
                    <div class="progress">
                        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;"></div>
                    </div>
                </div>
            </div>
        </div>
        <br>
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
      invoiceItems: []
    };
  },

  mounted() {
    this.getItem();
  },

  methods: {
    getItem() {
      new Promise((resolve, reject) => {
        axios.get("/api/invoices/" + this.$route.params.id).then(res => {
          console.log('Invoices: ' + JSON.stringify(res.data.invoice));
          this.ifReady = true;
          this.invoices = res.data.invoice;
          this.contacts = res.data.invoice.contact;
          this.invoiceItems = res.data.invoice.invoice_items;
          this.roRefNum = res.data.invoice.receive_order;
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
        return this.invoiceItems.map((item) => {
        return Number(item.quantity * item.item_pricelist.price)
        });
    },
    total() {
        return this.invoiceItems.reduce((total, item) => {
        return total + item.quantity * item.item_pricelist.price;
        }, 0);
    }
  }

};
</script>
