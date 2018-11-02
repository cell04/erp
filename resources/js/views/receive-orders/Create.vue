<template>
    <div class="card">
        <div class="card-header">
            <b>Receive Orders / Create New Receive Order</b>
        </div>
        <div class="card-body">
            <div v-if="ifReady">
                <form v-on:submit.prevent="createNewReceiveOrder">
                    <div class="row">
                        <div class="col-md-6 form-group">
                            <label>Purchase Order</label>
                            <vue-select v-model="purchaseOrder" @input="selectPurchaseOrder()" label="reference_number" :options="purchaseOrders"></vue-select>
                        </div>
                        <div class="col-md-6 form-group">
                            <label>Supplier</label>
                            <input type="text" class="form-control" v-model="contact" readonly>
                        </div>
                        <div class="col-md-6 form-group">
                            <label>Receive Order #</label>
                            <input type="text" class="form-control" v-model="ro_number" required>
                        </div>
                    </div>

                    <br>
                    <h6>
                        <b><u>Receive Order Items</u></b>
                    </h6>
                    <br>

                    <!-- <table class="table table-hover table-sm">
                        <caption>
                            <div class="row">
                                <div class="col-md-3">
                                </div>
                            </div>
                        </caption>
                        <thead>
                            <tr>
                                <th scope="col">SKU</th>
                                <th scope="col">Item</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Unit of Measurement</th>
                                <th scope="col">Price</th>
                                <th scope="col">Tracking #</th>
                                <th scope="col">Sub Total</th>
                                <th scope="col">Expiration</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(receive_order_item, index) in receive_order_items" :key="index">
                                <td>{{ receive_order_item.item.stock_keeping_unit }}</td>
                                <td>
                                    <vue-select v-model="receive_order_item.item" @input="selectItem(index)" label="name" :options="items"></vue-select>
                                </td>
                                <td>
                                    <input class="form-control" v-model.number="receive_order_item.quantity" required>
                                </td>
                                <td>
                                    {{ receive_order_item.unitOfMeasurement }}
                                </td>
                                <td>
                                    <vue-select v-model="receive_order_item.itemPricelist" @input="selectItemPricelist(index)" label="price" :options="receive_order_item.itemPricelists"></vue-select>
                                </td>
                                <td><input type="text" class="form-control" v-model.number="receive_order_item.tracking_number" required></td>
                                <td>{{ isNaN(receive_order_item.subTotal) ? '0.00' : receive_order_item.subTotal }}</td>
                                <td><input type="date" class="form-control" v-model="receive_order_item.expiration_date"></td>
                                <td>
                                    <button type="button" class="btn btn-danger btn-sm" @click="deleteRow(index)">Remove</button>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="5"></td>
                                <td>
                                    <b>Total</b>
                                </td>
                                <td>{{ isNaN(amount)  ? '0.00': amount }}</td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table> -->

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
                                <td>{{ subtotalRow[index] }}</td>
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

                    <div class="pt-3">
                        <button type="button" class="btn btn-outline-success btn-sm" @click.prevent="viewROs"><i class="fas fa-chevron-left"></i> Back</button>
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
                received_items: [],
                purchaseOrderData: [],
                purchaseOrders: [],
                purchaseOrder: null,
                purchaseOrderId: null,
                contacts: [],
                contact: null,
                contact_id: "",
                warehouses: [],
                warehouse: null,
                warehouse_id: "",
                items: [],
                ro_number: "",
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
                isDisabled: false
            };
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

            let getAllPurchaseOrders = new Promise((resolve, reject) => {
                axios.get("/api/purchase-orders/get-all-purchase-orders/").then(res => {
                    this.purchaseOrders = res.data.purchase_orders;
                    resolve();
                }).catch(err => {
                    console.log(err);
                    reject();
                });
            });

            Promise.all([getAllContacts, getAllWarehouses, getAllItems, getAllPurchaseOrders]).then(() => {
                this.ifReady = true;
            });
        },

        // computed: {
        //     subTotalRow() {
        //         return this.receive_order_items.map((receive_order_item) => {
        //             return (receive_order_item.quantity * receive_order_item.unit_price);
        //         });
        //     },
        //     total() {
        //         return this.receive_order_items.reduce((total, receive_order_item) => {
        //             return total + (receive_order_item.quantity * receive_order_item.unit_price);
        //         }, 0);
        //     }
        // },

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
        },

        methods: {
            viewROs() {
                this.$router.push({ name: 'receive-orders.index' });
            },

            getPoDetails(id) {
                axios.get("/api/purchase-orders/" + id).then(res => {
                    this.purchaseOrderData = res.data;
                    // console.log('RO: ' + JSON.stringify(res.data.purchaseOrder));
                    this.contact = res.data.purchaseOrder.contact.person;
                    this.contact_id = res.data.purchaseOrder.contact_id;
                    this.received_items = res.data.purchaseOrder.purchase_order_items;
                    resolve();
                }).catch(err => {
                    console.log(err);
                    reject();
                });
            },

            // selectContact() {
            //     this.contact_id = this.contact.id;
            // },
            // selectWarehouse() {
            //     this.warehouse_id = this.warehouse.id;
            // },
            selectPurchaseOrder() {
                this.purchase_order_id = this.purchaseOrder.id;
                this.reference_number = this.purchaseOrder.reference_number;
                this.getPoDetails(this.purchaseOrder.id)
            },
            // selectItem(index) {
            //     if (this.receive_order_items[index].item instanceof Object) {
            //         this.receive_order_items[index].item_id = this.receive_order_items[index].item.id;
            //         this.receive_order_items[index].unitOfMeasurement = this.receive_order_items[index].item.default_unit_of_measurement.name;
            //         this.receive_order_items[index].unit_of_measurement_id = this.receive_order_items[index].item.default_unit_of_measurement.id;

            //         let promise = new Promise((resolve, reject) => {
            //             axios.get("/api/item-pricelists/get-item-pricelists/" + this.receive_order_items[index].item_id).then(res => {
            //                 this.receive_order_items[index].itemPricelists = res.data.item_pricelists;
            //                 resolve();
            //             }).catch(err => {
            //                 console.log(err);
            //                 reject();
            //             });
            //         });
            //     }
            // },
            // selectItemPricelist(index) {
            //     this.receive_order_items[index].item_pricelist_id = this.receive_order_items[index].itemPricelist.id;
            //     this.receive_order_items[index].subTotal = (parseFloat(this.receive_order_items[index].quantity) * parseFloat(this.receive_order_items[index].itemPricelist.price));
            //     this.updateTotalAmount();
            // },
            // updateTotalAmount() {
            //     let total = 0;

            //     this.receive_order_items.forEach(receive_order_item => {
            //         total += receive_order_item.subTotal;
            //     });

            //     this.amount = total;

            //     if (this.amount > 0) {
            //         this.isDisabled = false;
            //     } else {
            //         this.isDisabled = true;
            //     }
            // },
            // addNewItem() {
            //     this.receive_order_items.push({
            //         item: '',
            //         item_id: '',
            //         quantity: '',
            //         unitOfMeasurements: [],
            //         unitOfMeasurement: '',
            //         unit_of_measurement_id: '',
            //         itemPricelists: [],
            //         itemPricelist: '',
            //         item_pricelist_id: '',
            //         tracking_number: '',
            //         expiration_date: '',
            //         subTotal: 0
            //     });

            //     this.updateTotalAmount();
            // },
            // deleteRow(index) {
            //     this.receive_order_items.splice(index, 1);
            //     this.updateTotalAmount();
            // },
            createNewReceiveOrder() {
                this.ifReady = false;

                let receiveOrderItems = [];

                this.$data.received_items.forEach(receive_order_item => {
                    receiveOrderItems.push({
                        item_id: receive_order_item.item_id,
                        quantity: receive_order_item.quantity,
                        unit_of_measurement_id: receive_order_item.unit_of_measurement_id,
                        item_pricelist_id: receive_order_item.item_pricelist_id,
                        tracking_number: this.$data.ro_number,
                        expiration_date: receive_order_item.expiration_date
                    });
                });

                let formData = {
                    reference_number: this.$data.ro_number,
                    contact_id: this.$data.contact_id,
                    receive_order_items: receiveOrderItems,
                    purchase_order_id: this.purchase_order_id
                };

                axios.post("/api/receive-orders", formData).then(res => {
                    console.log(res.data);
                    this.$router.push({ name: "receive-orders.index" });
                }).catch(err => {
                    console.log(err);
                    alert(`Error! Can't create receive order`);
                    this.ifReady = true;
                });
            }
        }
    };
</script>
