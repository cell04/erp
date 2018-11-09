<template>
    <div class="card">
        <div class="card-header">
            <b>Receive Orders / Create New Receive Order</b>
        </div>
        <div class="card-body">
            <div v-if="ifReady">
                <form v-on:submit.prevent="createNewReceiveOrder">
                    <h6><u>From <b>PO #</b> {{purchaseOrderId}}</u></h6>
                    <br>
                    <div class="row">
                        <div class="col-md-6 form-group">
                            <label>Purchase Order #</label>
                            <input type="text" class="form-control" v-model="purchaseOrderId" readonly>
                        </div>
                        <div class="col-md-6 form-group">
                            <label>Supplier</label>
                            <input type="text" class="form-control" v-model="contactData.person" readonly>
                        </div>
                        <div class="col-md-6 form-group">
                            <label>Receive Order #</label>
                            <input type="text" class="form-control" v-model="reference_number" required>
                        </div>
                    </div>

                    <br>

                    <table class="table table-hover table-sm">
                        <thead>
                            <tr>
                                <th scope="col">SKU</th>
                                <th scope="col">Name</th>
                                <th scope="col">Description</th>
                                <th scope="col">Qty</th>
                                <th scope="col">UOM</th>
                                <th scope="col">Unit Price</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Expiration</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr :key="item.id" v-for="(item, index) in receive_order_items">
                                <td>{{ item.item.stock_keeping_unit }}</td>
                                <td>{{ item.item.name }}</td>
                                <td>{{ item.item.description }}</td>
                                <td><input type="text" class="form-control" v-model="item.quantity" required></td>
                                <td>{{ item.unit_of_measurement.name }}</td>
                                <td>{{ item.item_pricelist.price }}</td>
                                <td><input type="date" class="form-control" v-model="item.expiration_date" required></td>
                                <td>{{ subtotalRow[index] | Decimal }}</td>
                                <td>
                                    <button type="button" class="btn btn-danger btn-sm" @click="deleteRow(index)"><i class="far fa-times-circle"></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="6"></td>
                                <td>
                                    <b>Total</b>
                                </td>
                                <td>{{total | Decimal}}</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="pt-3">
                        <button type="button" class="btn btn-outline-success btn-sm" @click.prevent="viewPOs"><i class="fas fa-chevron-left"></i> Back</button>
                        <button type="submit" class="btn btn-success btn-sm" :disabled="isDisabled"><i class="fas fa-plus"></i> Create New Receive Order</button>
                        <!-- <button type="button" class="btn btn-primary btn-sm" @click="addNewItem">Add New Item</button> -->
                    </div>
                </form>
            </div>

            <div v-else>
                <div class="progress">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;"></div>
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
                purchaseOrder: [],
                purchaseOrderId: null,
                purchaseOrderData: [],
                purchaseOrderContact: null,
                contacts: [],
                contact: null,
                contactData: "",
                warehouse_id: "",
                warehouses: [],
                warehouse: null,
                warehouseData: "",
                items: [],
                reference_number: "",
                purchase_order_id: "",
                receive_order_items: [
                    {
                        item: '',
                        item_id: '',
                        quantity: 0,
                        unitOfMeasurements: [],
                        unitOfMeasurement: '',
                        unit_of_measurement_id: '',
                        itemPricelists: [],
                        itemPricelist: 0,
                        item_pricelist_id: '',
                        tracking_number: '',
                        expiration_date: '',
                        subTotal: 0
                    }
                ],
                amount: "",
                isDisabled: false,
                poQuantity: []
            };
        },

        filters: {
            Decimal: function (value) {
                if (value) {
                    return value.toFixed(2);
                }
            }
        },

        mounted() {

            let getAllContacts = new Promise((resolve, reject) => {
                axios.get("/api/contacts/get-all-contacts/").then(res => {
                    this.contacts = res.data.contacts;
                    resolve();
                }).catch(err => {
                    console.log(err);
                    reject();
                });
            });

            let getAllWarehouses = new Promise((resolve, reject) => {
                axios.get("/api/warehouses/get-all-warehouses").then(res => {
                    this.warehouses = res.data.warehouses;
                    resolve();
                }).catch(err => {
                    console.log(err);
                    reject();
                });
            });

            let getAllItems = new Promise((resolve, reject) => {
                axios.get("/api/items/get-all-items/").then(res => {
                    this.items = res.data.items;
                    resolve();
                }).catch(err => {
                    console.log(err);
                    reject();
                });
            });

            let getAllPo = new Promise((resolve, reject) => {
                axios.get("/api/purchase-orders/get-all-purchase-orders/").then(res => {
                    this.purchaseOrder = res.data.purchase_orders;
                    // console.log('PO: ' + JSON.stringify(res.data.purchase_orders));
                    resolve();
                }).catch(err => {
                    console.log(err);
                    reject();
                });
            });

            let getPo = new Promise((resolve, reject) => {
                axios.get("/api/purchase-orders/" + this.$route.params.id).then(res => {
                    this.purchaseOrderData = res.data.purchaseOrder;
                    this.purchaseOrderId = res.data.purchaseOrder.reference_number;
                    this.contactData = res.data.purchaseOrder.contact;
                    this.purchase_order_id = res.data.purchaseOrder.id;
                    this.receive_order_items = res.data.purchaseOrder.purchase_order_items;
                    this.warehouse_id = res.data.purchaseOrder.warehouse.id;
                    // console.log('PO: ' + JSON.stringify(res.data.purchaseOrder));

                    // Original data of Purchase Order Items
                    this.receive_order_items.forEach(purchase_order_item => {
                        this.poQuantity.push({
                            quantity: purchase_order_item.quantity,
                        });
                    });
                    // console.log('QTY: ' + JSON.stringify(this.poQuantity));

                    resolve();
                }).catch(err => {
                    console.log(err);
                    reject();
                });
            });

            Promise.all([getAllContacts, getAllWarehouses, getAllItems, getAllPo, getPo]).then(() => {
                this.ifReady = true;
            });
            console.log('Params: ' + this.$route.params.id);
        },

        computed: {
            subtotalRow() {
                return this.receive_order_items.map((item) => {
                return Number(item.quantity * item.item_pricelist.price)
                });
            },
            total() {
                return this.receive_order_items.reduce((total, item) => {
                return total + item.quantity * item.item_pricelist.price;
                }, 0);
            }
        },

        methods: {
            viewPOs() {
                this.$router.push({ name: 'purchase-orders.index' });
            },

            updateTotalAmount() {
                let total = 0;

                this.receive_order_items.forEach(receive_order_item => {
                    total += receive_order_item.subTotal;
                });
            },
           
            deleteRow(index) {
                this.receive_order_items.splice(index, 1);
                this.updateTotalAmount();
                this.poQuantity.splice(index, 1);
            },
            createNewReceiveOrder() {
                this.ifReady = false;

                let receiveOrderItems = [];

                this.$data.receive_order_items.forEach(receive_order_item => {
                    receiveOrderItems.push({
                        item_id: receive_order_item.item_id,
                        quantity: receive_order_item.quantity,
                        unit_of_measurement_id: receive_order_item.unit_of_measurement_id,
                        item_pricelist_id: receive_order_item.item_pricelist_id,
                        tracking_number: this.reference_number,
                        expiration_date: receive_order_item.expiration_date
                    });
                });

                // Purchase Order Items
                let purchaseOrderItems = [];
                let allQty = this.poQuantity[0];
                this.$data.receive_order_items.forEach(purchase_order_item => {
                        purchaseOrderItems.push({
                        item_id: purchase_order_item.item_id,
                        quantity: allQty.quantity - purchase_order_item.quantity,
                        unit_of_measurement_id: purchase_order_item.unit_of_measurement_id,
                        item_pricelist_id: purchase_order_item.item_pricelist_id
                    });
                });

                let formData = {
                    reference_number: this.$data.reference_number,
                    contact_id: this.$data.contactData.id,
                    receive_order_items: receiveOrderItems,
                    purchase_order_id: this.purchase_order_id
                };

                let formDataPO = {
                    warehouse_id: this.warehouse_id,
                    contact_id: this.purchaseOrderData.contact_id,
                    reference_number: this.purchaseOrderData.reference_number,
                    amount: this.purchaseOrderData.amount,
                    purchase_order_items: purchaseOrderItems
                };

                axios.post("/api/receive-orders", formData).then(res => {
                    console.log(res.data);

                    axios.patch("/api/purchase-orders/" + this.purchase_order_id, formDataPO).then(res => {
                        console.log(res.data);
                        this.$router.push({ name: "receive-orders.index" });
                    }).catch(err => {
                        console.log(err);
                        alert(`Error! Can't Update purchase order`);
                        this.ifReady = true;
                    });
                    
                    // this.$router.push({ name: "receive-orders.index" });
                }).catch(err => {
                    console.log(err);
                    alert(`Error! Can't create receive order`);
                    this.ifReady = true;
                });
            }
        }
    };
</script>
