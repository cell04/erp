<template>
    <div>
        <div class="card">
            <div class="card-header">
                {{componentVal}}s / View {{componentVal}}
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
                    <button type="button" class="btn btn-primary btn-sm" @click.prevent.default="editStockRequest">Edit {{componentVal}}</button>
                    <button type="button" class="btn btn-danger btn-sm" @click.prevent.default="openDeleteStockRequestModal">Delete {{componentVal}}</button>
                    
                    <button class="btn btn-success btn-sm" v-if="stock_request.status !== 'Issued'" @click.prevent.default="openApproveStockRequestModal">Approve {{componentVal}}</button>
                    <button class="btn btn-danger btn-sm" v-if="stock_request.status !== 'Issued'" @click.prevent.default="openCancelStockRequestModal">Cancel {{componentVal}}</button>
                </div>
                <div v-else>
                    <div class="progress">
                        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Delete Modal -->
        <div class="modal fade" id="deleteStockRequestModal" tabindex="-1" role="dialog" aria-labelledby="deleteStockRequestTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">You're about to delete this {{componentVal}}?</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Are you sure you want to delete this {{componentVal}}? <br><br>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger btn-sm" @click.prevent.default="deleteStockRequest">Confirm Delete</button>
                        <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Approve Modal -->
        <div class="modal fade" id="approveStockRequestModal" tabindex="-1" role="dialog" aria-labelledby="approveStockRequestTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">You're about to approve this {{componentVal}}?</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Are you sure you want to approve this {{componentVal}}? <br><br>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success btn-sm" @click.prevent.default="approveStockRequest">Confirm Approve</button>
                        <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Cancel Modal -->
        <div class="modal fade" id="cancelStockRequestModal" tabindex="-1" role="dialog" aria-labelledby="cancelStockRequestTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">You're about to cancel this {{componentVal}}?</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Are you sure you want to cancel this {{componentVal}}? <br><br>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger btn-sm" @click.prevent.default="cancelStockRequest">Confirm Cancel</button>
                        <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
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
    },
    editStockRequest() {
        this.$router.push({
            name: 'stock-requests.edit',
            params: { id: this.stock_request.id }
        });
    },
    openDeleteStockRequestModal() {
        $('#deleteStockRequestModal').modal('show');
    },
    deleteStockRequest() {
        $('#deleteStockRequestModal').modal('hide');

        axios.delete('/api/stock-requests/' + this.$route.params.id).then(res => {
            this.$router.push({ name: 'stock-requests.index' });
        }).catch(err => {
            alert("Error!");
            console.log(err);
        });
    },
    openApproveStockRequestModal() {
        $('#approveStockRequestModal').modal('show');
    },
    approveStockRequest() {
        const formData = {
            status: 1
        };
        console.log(formData);
        $('#approveStockRequestModal').modal('hide');

        axios.patch("/api/stock-requests/" + this.$route.params.id, formData).then(res => {
            console.log(JSON.stringify(res.data));
            location.reload();
        })
        .catch(err => {
            console.log(err);
            alert(`Error! Can't can't approve stock request`);
        });
    },
    openCancelStockRequestModal() {
        $('#cancelStockRequestModal').modal('show');
    },
    cancelStockRequest() {
        const formData = {
            status: 2
        };
        console.log(formData);
        $('#cancelStockRequestModal').modal('hide');

        axios.patch("/api/stock-requests/" + this.$route.params.id, formData).then(res => {
            console.log(JSON.stringify(res.data));
            location.reload();
        })
        .catch(err => {
            console.log(err);
            alert(`Error! Can't can't cancel stock request`);
        });
    }
  }
};
</script>