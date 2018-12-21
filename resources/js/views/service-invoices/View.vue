<template>
    <div>
        <div v-bind:class="this.$store.state.showSidebar? 'content-title':'spacer content-title' ">
            <h4 class="module-title">SERVICE INVOICE</h4>
            <hr class="title-border">
        </div>

        <div class="p-md-4">
            <div class="container p-md-0">
                <div class="card">
                    <div class="card-header">
                        <a class="text-success" href="" @click.prevent="viewItems">Service Invoices</a>
                        <a class="text-secondary"> / View Service Invoice</a>
                        <span class="float-right"> <strong>Service Invoice #:</strong> {{serviceInvoices.reference_number}}</span>
                    </div>
                    <div class="card-body">
                        <div v-if="ifReady">
                            <div class="row mb-4">
                                <div class="col-sm-6">
                                    <h5 class="mb-3">To:</h5>
                                    <div>
                                        <strong>{{contacts.person}}</strong>
                                    </div>
                                    <div>Company: {{contacts.company}}</div>
                                    <div>{{contacts.company_address}}</div>
                                    <div>Email: {{contacts.email}}</div>
                                    <div>Phone: {{contacts.mobile_number}}</div>
                                </div>
                            </div>

                            <div class="row mb-4">
                                <div class="col-sm-6">
                                    <h5 class="mb-3">Service Invoice Details</h5>
                                    <div><b>Amount:</b> {{serviceInvoices.amount}}</div>
                                    <div><b>Amount Paid:</b> {{serviceInvoices.amount_paid}}</div>
                                    <div><b>Due Date:</b> {{serviceInvoices.due_date}}</div>
                                </div>
                            </div>

                            <br>
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
      serviceInvoices: [],
      contacts: []
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
        axios.get("/api/service-invoices/" + this.$route.params.id).then(res => {
        //   console.log("Service Invoices: " + JSON.stringify(res.data));
          this.ifReady = true;
          this.serviceInvoices = res.data.serviceInvoice;
          this.contacts = res.data.serviceInvoice.contact;

          if (!res.data.response) {
            return;
          }
          resolve();
        });
      });
    },
    viewItems() {
      this.$router.push({
        name: "service-invoices.index"
      });
    }
  },

  computed: {
  }
};
</script>

