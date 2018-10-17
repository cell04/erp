<template>
    <div>
        <div class="card">
            <div class="card-header">
                {{componentVal}} / View {{componentVal}}
            </div>
            <div class="card-body">
                <div v-if="ifReady">
                    <fieldset>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Received Date</label>
                                    <input type="text" class="form-control" v-model="order.receive_date" id="name" readonly>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Receive Order #</label>
                                    <input type="text" class="form-control" v-model="order.receive_order_number" id="name" readonly>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Status</label>
                                    <input type="text" class="form-control" v-model="order.status" id="name" readonly>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Reference #</label>
                                    <input type="text" class="form-control" v-model="order.reference_number" id="name" readonly>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Contact</label>
                                    <input type="text" class="form-control" v-model="order.contact.company" id="name" readonly>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Warehouse</label>
                                    <input type="text" class="form-control" v-model="order.sub_department.name" id="name" readonly>
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
                                <th scope="col">Description</th>
                                <th scope="col">Received Qty</th>
                                <th scope="col">UOM</th>
                                <th scope="col">Unit Price</th>
                                <th scope="col">Tracking #</th>
                                <th scope="col">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr :key="item.id" v-for="item in received_items">
                                <td>{{ item.item.SKU }}</td>
                                <td>{{ item.item.name }}</td>
                                <td>{{ item.item.description }}</td>
                                <td>{{ item.quantity }}</td>
                                <td>{{ item.unit.name }}</td>
                                <td>{{ item.unit_price }}</td>
                                <td>{{ item.tracking_number }}</td>
                                <td>{{ subtotalRow }}</td>
                            </tr>
                            <tr>
                                    <td></td>
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
                    <button type="button" class="btn btn-info btn-sm" @click.prevent="viewReceivedOrders">Back</button>

                    <router-link v-if="order.status === 'Issued'" :to="{ name: 'receive-orders.create', params: { po_id: order.id }}">
                        <button class="btn btn-success btn-sm">Receive PO</button>
                    </router-link>
                    
                    <button class="btn btn-danger btn-sm" v-if="order.status === 'Issued'" @click="closePO(order.id, order.purchase_order_number)">Close PO</button>
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
      componentVal: "Received Orders",
      ifReady: false,
      order: [],
      received_items: []
    };
  },

  mounted() {
    this.getReceivedOrder();
  },

  methods: {
    getReceivedOrder() {
      new Promise((resolve, reject) => {
        axios.get("/api/receive-orders/" + this.$route.params.id).then(res => {
          console.log(res);
          this.ifReady = true;
          this.order = res.data.purchase_order;
          this.received_items = res.data.purchase_order.receive_items
          if (!res.data.response) {
            return;
          }
          resolve();
        });
      });
    },
    viewReceivedOrders() {
      this.$router.push({
        name: "receive-orders.index"
      });
    }
  },

  computed: {
    subtotalRow() {
        return this.received_items.map((item) => {
        return Number(item.quantity * item.unit_price)
        });
    },
    total() {
        return this.received_items.reduce((total, item) => {
        return total + item.quantity * item.unit_price;
        }, 0);
    }
}
};
</script>