<template>
    <div>
        <div class="card">
            <div class="card-header">
                {{componentVal}}s / Edit {{componentVal}}
            </div>
            <div class="card-body">
                <div v-if="ifReady">
                    <fieldset>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Requested From</label>
                                    <input type="text" class="form-control" v-model="stock_request.stock_requestable_from.name" readonly>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Requested To</label>
                                    <input type="text" class="form-control" v-model="stock_request.stock_requestable_to.name" readonly>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Status</label>
                                    <input type="text" class="form-control" v-model="stock_request.status === 0 ? 'pending' 
                                        : stock_request.status === 1 ? 'approved' : 'cancelled'" id="name" readonly>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Created By</label>
                                    <input type="text" class="form-control" v-model="stock_request.user.name" id="name" readonly>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <br />
                    <table class="table table-hover table-sm">
                        <thead>
                            <tr>
                                <th scope="col">SKU</th>
                                <th scope="col">Name</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">UOM</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr :key="item.id" v-for="item in stock_request_items">
                                <td>{{ item.item.stock_keeping_unit }}</td>
                                <td>{{ item.item.name }}</td>
                                <td>{{ item.quantity }}</td>
                                <td>{{ item.item.default_unit_of_measurement.name }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    <br />
                    <button type="button" class="btn btn-info btn-sm" @click.prevent="viewStockRequests">Back</button>
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
      componentVal: "Stock Request",
      ifReady: false,
      stock_request: '',
      stock_request_items: []
    };
  },

  mounted() {
    this.getStockRequest();
  },

  methods: {
    getStockRequest() {
      new Promise((resolve, reject) => {
        axios.get("/api/stock-requests/" + this.$route.params.id).then(res => {
          console.log(res);
          this.ifReady = true;
          this.stock_request = res.data.stockRequest;
          this.stock_request_items = res.data.stockRequest.stock_request_items;
          if (!res.data.response) {
            return;
          }
          resolve();
        });
      });
    },
    viewStockRequests() {
        this.$router.push({
        name: "stock-requests.index"
        });
    }
  }
};
</script>