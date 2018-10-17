<template>
    <div>
        <div class="card">
            <div class="card-header">
                Purchase Orders / Receivings / New
            </div>
            <div class="card-body">
                <div v-if="ifReady">
                    <form v-on:submit.prevent="createNewReceiving">         

                        <div class="row">
                            <div class="col-md-6 form-group">
                                <label>Date</label>
                                <input type="date" class="form-control" v-model="receive_date" required>
                            </div>

                            <div class="col-md-6 form-group">
                                <label>Contact</label>
                                <input type="text" class="form-control" disabled="disabled" :value="purchaseOrder.contact.company">
                            </div>

                            <div class="col-md-6 form-group">
                                <label>Warehouse</label>
                                <input type="text" class="form-control" disabled="disabled" :value="purchaseOrder.sub_department.name">
                            </div>

                            <div class="col-md-6 form-group">
                                <label>Reference #</label>
                                <input type="text" class="form-control" v-model="reference_number" required>
                            </div>
                        </div>
                        <br />
                        <table class="table table-hover table-sm">
                            <caption>
                                <div class="row">
                                    <div class="col-md-3">
                                    </div>
                                </div>
                            </caption>
                            <thead>
                                <tr>
                                    <th scope="col">SKU</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Ordered Qty</th>
                                    <th scope="col">Qty Received</th>
                                    <th scope="col">UOM</th>
                                    <th scope="col">Unit Price</th>
                                    <th scope="col">Tracking #</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, key, index) in items"  :key="item.item.id">
                                    <td>{{ item.item.SKU }}</td>
                                    <td>
                                       {{ item.item.name }}
                                    </td>
                                    <td>{{ item.quantity }} </td>
                                    <td>
                                        <input class="form-control" v-model.number="item.qty_received">
                                    </td>

                                    <td>{{ item.unit.name }}</td>
                                    
                                    <td>{{ item.item.unit_price }} </td>
            
                                    <td>
                                        <input class="form-control" placeholder="Tracking #" type="text" v-model="item.tracking_number">
                                    </td>
                                    <td>{{subtotalRow[key]}}</td>
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

                        <button type="submit" class="btn btn-success btn-sm">Receive</button>
                    </form>
                </div>

                <div v-else>
                    <div class="progress">
                        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;"></div>
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
      ifReady: true,
      purchaseOrderId : null,
      purchaseOrder : null,
      items: [{
            tracking_number: null,
            purchase_item_id: null
      }],
      contacts: "",
      sub_departments: "",
      itemsList: "",
      reference_number: "",
      contact_id: "",
      receive_date: "",
      sub_department_id: "",
      items: [],
      amount: ""
    };
  },

  mounted() {
    
    this.purchaseOrderId = this.$route.params.po_id
    let promise = new Promise((resolve, reject) => {
        axios.get("/api/contacts/retrieve-all-contacts/").then(res => {
            console.log(res);
            this.contacts = res.data.contacts;
            if (!res.data.response) {
            return;
            }
            resolve();
        });
    });

    let promise2 = new Promise((resolve, reject) => {
        axios.get("/api/sub-departments/retrieve-all-sub-departments/").then(res2 => {
            // console.log(res2);
            this.sub_departments = res2.body.sub_departments;
            if (!res2.data.response) {
            return;
            }
            resolve();
        });
    });

    let promise3 = new Promise((resolve, reject) => {
        axios.get("/api/purchase-orders/"+ this.purchaseOrderId +"/receive").then(res4 => {
            // console.log("results : " + JSON.stringify(res4.data));
            this.purchaseOrder = res4.data.purchase_order
            this.items = res4.data.purchase_order.purchase_items;
            console.log("items:" + items);
            if (!res4.data) {
                return;
            }
            resolve();
        });
    });

  },

  computed: {
    subtotalRow() {
        return this.items.map((item) => {
        return Number(item.quantity * item.unit_price)
        });
    },
    total() {
        return this.items.reduce((total, item) => {
        return total + item.quantity * item.unit_price;
        }, 0);
    }
  },

  methods: {
    onSelectItem(id, index) {
      const Index = index
      const selectedItem = this.itemsList.find(y => y.id === id);
      console.log(selectedItem)
      this.items[Index].sku = selectedItem.SKU,
      this.items[Index].item_id = selectedItem.id,
      this.items[Index].unit_id = selectedItem.purchase_unit_id,
      this.items[Index].unit_name = selectedItem.purchase_uom.name,
      this.items[Index].unit_price = selectedItem.purchase_price
    },
    
    createNewReceiving() {
      console.log("purchase order: " + JSON.stringify(this.purchaseOrder));
      const newItems = [];
      this.$data.items.forEach(element => {
          newItems.push({
            tracking_number: element.tracking_number,
            item_id: element.item_id,
            quantity: element.quantity,
            unit_id: element.unit_id,
            purchase_item_id: element.id,
            unit_price: element.unit_price
          })
      });
      const formData = {
          purchase_order_id: this.purchaseOrderId,
          contact_id: this.purchaseOrder.contact_id,
          sub_department_id: this.purchaseOrder.sub_department_id,
          reference_number: this.$data.reference_number,
          receive_date: this.$data.receive_date,
          amount: this.total,
          items: newItems
      }
      console.log(formData);
      axios
        .post("/api/receive-orders", formData)
        .then(res => {
          console.log(JSON.stringify(res.data));
          alert("Purchase order has been received!")
          this.$router.push({ name: "receive-orders.index" });
        })
        .catch(err => {
          console.log(err);
          alert(`Error! Can't receive order`);
        });
    }
  }
};
</script>
