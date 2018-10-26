<template>
    <div>
        <div class="card">
            <div class="card-header">
                Invoices / View Invoice
            </div>
            <div class="card-body">
                <div v-if="ifReady">
                    <fieldset>
                        <div class="row">
                            <!-- <div class="col-md-12 form-group">
                                <label>Receive Order</label>
                                <vue-select v-model="receiveOrderId" @input="selectRo()" label="reference_number" :options="receiveOrder"></vue-select>
                            </div>

                            <div class="col-md-6 form-group">
                                <label>Contact</label>
                                <vue-select v-model="contact" @input="selectContact()" label="person" :options="contacts"></vue-select>
                            </div> -->

                            <div class="col-md-6 form-group">
                                <label>Reference #</label>
                                <input type="text" class="form-control" v-model="invoices.reference_number" required>
                            </div>

                            <div class="col-md-6 form-group">
                                <label>Amount</label>
                                <input type="number" class="form-control" v-model="invoices.amount">
                            </div>

                            <div class="col-md-6 form-group">
                                <label>Amount Paid</label>
                                <input type="number" class="form-control" v-model="invoices.amount_paid">
                            </div>

                            <div class="col-md-6 form-group">
                                <label>Due Date</label>
                                <input type="date" class="form-control" v-model="invoices.due_date">
                            </div>
                        </div>
                    </fieldset>
                    <button type="button" class="btn btn-info btn-sm" @click.prevent="viewItems">Back</button>
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
      invoices: []
    };
  },

  mounted() {
    this.getItem();
  },

  methods: {
    getItem() {
      new Promise((resolve, reject) => {
        axios.get("/api/invoices/" + this.$route.params.id).then(res => {
          console.log('Invoices: ' + JSON.stringify(res.data));
          this.ifReady = true;
          this.invoices = res.data.invoice;
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
    // Add ES6 methods here that needs caching
  }
};
</script>
