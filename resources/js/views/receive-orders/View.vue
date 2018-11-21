<template>
    <div>
        <div class="card">
            <div class="card-header">
                <b>{{componentVal}} / View {{componentVal}}</b>
            </div>
            <div class="card-body">
                <div v-if="ifReady">
                    <fieldset>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Received Date</label>
                                    <input type="text" class="form-control" v-model="order.created_at" id="name" readonly>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Received Order #</label>
                                    <input type="text" class="form-control" v-model="order.reference_number" id="name" readonly>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Supplier</label>
                                    <input type="text" class="form-control" v-model="contacts.person" id="name" readonly>
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
                                <th scope="col">Qty</th>
                                <th scope="col">UOM</th>
                                <th scope="col">Unit Price</th>
                                <th scope="col">Tracking #</th>
                                <th scope="col">Expiration</th>
                                <th class="text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr :key="item.id" v-for="(item, index) in received_items">
                                <td>{{ item.item.stock_keeping_unit }}</td>
                                <td>{{ item.item.name }}</td>
                                <td>{{ item.item.description }}</td>
                                <td>{{ item.quantity }}</td>
                                <td>{{ item.unit_of_measurement.name }}</td>
                                <td>{{ item.item_pricelist.price }}</td>
                                <td>{{ item.tracking_number }}</td>
                                <td>{{ item.expiration_date | DateFormat}}</td>
                                <td align="right">{{ subtotalRow[index] | Decimal}}</td>
                            </tr>
                            <tr>
                                <td colspan="7"></td>
                                <td>
                                    <b>Total</b>
                                </td>
                                <td align="right">{{total | Decimal}}</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    <br>
                    <button type="button" class="btn btn-outline-success btn-sm" @click.prevent="viewReceivedOrders"><i class="fas fa-chevron-left"></i> Back</button>

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
      received_items: [],
      contacts: []
    };
  },

    filters: {
        Decimal: function (value) {
            if (value) {
                return value.toFixed(2);
            }
        },
        DateFormat: function (value) {
            if (value) {
                return moment(value).format('M/DD/YYYY');
            }
        }
    },

  mounted() {
    this.getReceivedOrder();
  },

  methods: {
    getReceivedOrder() {
      new Promise((resolve, reject) => {
        axios.get("/api/receive-orders/" + this.$route.params.id).then(res => {
          console.log('RO: ' + JSON.stringify(res.data));
          this.ifReady = true;
          this.order = res.data.receiveOrder;
          this.contacts = res.data.receiveOrder.contact;
          this.received_items = res.data.receiveOrder.receive_order_items;
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
        return Number(item.quantity * item.item_pricelist.price)
        });
    },
    total() {
        return this.received_items.reduce((total, item) => {
        return total + item.quantity * item.item_pricelist.price;
        }, 0);
    }
}
};
</script>