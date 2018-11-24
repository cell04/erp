<template>
    <div>
        <div class="content-title">
            <h4 class="module-title">STOCK RECEIVE</h4>
            <hr class="title-border">
        </div>

        <div class="p-md-4">
            <div class="card">
                <div class="card-header">
                    <a class="text-success" href="" @click.prevent="viewSRec">Stock Receives</a>
                    <a class="text-secondary"> / View Stock Receive</a>
                </div>
                <div class="card-body">
                    <div v-if="ifReady">
                        <fieldset>
                            <div class="row">
                                <div class="col-md-6 form-group">
                                    <label>Stock Transfer</label>
                                    <input type="text" class="form-control" v-model="stTransfer.number" readonly>
                                </div>

                                <div class="col-md-6 form-group">
                                    <label>Number</label>
                                    <input type="text" class="form-control" v-model="stockReceives.number" readonly>
                                </div>

                                <div class="col-md-6 form-group">
                                    <label>Received From</label>
                                    <input type="text" class="form-control" v-model="stFrom.name" readonly>
                                </div>

                                <div class="col-md-6 form-group">
                                    <label>Received To</label>
                                    <input type="text" class="form-control" v-model="stTo.name" readonly>
                                </div>

                                <!-- TODO: Replace with created by data -->
                                <div class="col-md-6 form-group">
                                    <label>Created By</label>
                                    <input type="text" class="form-control" readonly>
                                </div>

                                <!-- TODO: Replace with approved by -->
                                <div class="col-md-6 form-group">
                                    <label>Approved By</label>
                                    <input type="text" class="form-control" readonly>
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
                                </tr>
                            </thead>
                            <tbody>
                                <tr :key="item.id" v-for="(item) in stockReceiveItems">
                                    <td>{{ item.item.name }}</td>
                                    <td>{{ item.item.description }}</td>
                                    <td>{{ item.quantity }}</td>
                                    <td>{{ item.unit_of_measurement.name }}</td>
                                </tr>
                            </tbody>
                        </table>
                        <br>
                        <button type="button" class="btn btn-outline-success btn-sm" @click.prevent="viewSRec"><i class="fas fa-chevron-left"></i> Back</button>
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
    </div>
</template>

<script>
export default {
  data() {
    return {
      ifReady: false,
      stockReceives: [],
      stFrom: [],
      stTo: [],
      stUser: [],
      stTransfer: [],
      stockReceiveItems: []
    };
  },

  mounted() {
    this.getItem();
  },

  methods: {
    getItem() {
      new Promise((resolve, reject) => {
        axios.get("/api/stock-receives/" + this.$route.params.id).then(res => {
            const {stockReceive} = res.data
          console.log('SR: ' + console.log(JSON.parse(JSON.stringify(stockReceive))));
          this.ifReady = true;
          this.stockReceives = res.data.stockReceive;
          this.stTransfer = res.data.stockReceive.stock_transfer;
          this.stFrom = res.data.stockReceive.stock_receivable_from;
          this.stTo = res.data.stockReceive.stock_receivable_to;
          this.stUser = res.data.stockReceive.user;
          this.stockReceiveItems = res.data.stockReceive.stock_receive_items;
          if (!res.data.response) {
            return;
          }
          resolve();
        });
      });
    },
    viewSRec() {
      this.$router.push({
        name: "stock-receives.index"
      });
    }
  }

};
</script>
