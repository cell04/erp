<template>
    <div class="card">
        <div class="card-header">
            Receive Orders / Create New Receive Order
        </div>
        <div class="card-body">
            <div v-if="ifReady">
                <form v-on:submit.prevent="createNewReceiveOrder">
                    <div class="row">
                        <!-- <div class="col-md-12 form-group">
                            <label>Purchase Order</label>
                            <vue-select v-model="purchaseOrderId" @input="selectPo()" label="reference_number" :options="purchaseOrder"></vue-select>
                        </div> -->

                        <div class="col-md-12 form-group">
                            <label>Purchase Order</label>
                            <input type="text" class="form-control" v-model="purchaseOrderId" readonly>
                        </div>

                        <div class="col-md-6 form-group">
                            <label>Reference #</label>
                            <input type="text" class="form-control" v-model="reference_number" required>
                        </div>
                        <div class="col-md-6 form-group">
                            <label>Warehouse</label>
                            <vue-select v-model="warehouse" @input="selectWarehouse()" label="name" :options="warehouses"></vue-select>
                        </div>
                        <div class="col-md-6 form-group">
                            <label>Contact</label>
                            <vue-select v-model="contact" @input="selectContact()" label="person" :options="contacts"></vue-select>
                        </div>
                    </div>

                    <br>

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
                                <td colspan="4"></td>
                                <td>
                                    <b>Total</b>
                                </td>
                                <td>{{ isNaN(amount)  ? '0.00': amount }}</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="pt-3">
                        <button type="submit" class="btn btn-success btn-sm" :disabled="isDisabled">Create New Receive Order</button>
                        <button type="button" class="btn btn-primary btn-sm" @click="addNewItem">Add New Item</button>
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
                contacts: [],
                contact: null,
                contact_id: "",
                warehouses: [],
                warehouse: null,
                warehouse_id: "",
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
                isDisabled: true
            };
        },

        mounted() {
            // this.receive_order_items.expiration_date = moment(new Date(), 'DDMMMYYYY').endOf('month').format('YYYY-MM-DD');
            // console.log('EXP Date: ' + this.this.date);

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

            let getPo = '';
            // let getPo = new Promise((resolve, reject) => {
            //     axios.get("/api/purchase-orders/" + this.$route.params.id).then(res => {
            //         // this.purchaseOrder = res.data.purchase_orders;
            //         console.log('PO: ' + JSON.stringify(res.data));
            //         resolve();
            //     }).catch(err => {
            //         console.log(err);
            //         reject();
            //     });
            // });

            Promise.all([getAllContacts, getAllWarehouses, getAllItems, getAllPo, getPo]).then(() => {
                this.ifReady = true;
            });

            this.purchaseOrderId = this.$route.params.id;
            this.purchase_order_id = this.purchaseOrderId;
            console.log('Params: ' + this.$route.params.id);
        },

        computed: {
            subTotalRow() {
                return this.receive_order_items.map((receive_order_item) => {
                    return (receive_order_item.quantity * receive_order_item.unit_price);
                });
            },
            total() {
                return this.receive_order_items.reduce((total, receive_order_item) => {
                    return total + (receive_order_item.quantity * receive_order_item.unit_price);
                }, 0);
            }
        },

        methods: {
            selectContact() {
                this.contact_id = this.contact.id;
            },
            selectWarehouse() {
                this.warehouse_id = this.warehouse.id;
            },
            // selectPo() {
            //     this.purchase_order_id = this.purchaseOrderId.id;
            // },
            selectItem(index) {
                this.receive_order_items[index].item_id = this.receive_order_items[index].item.id;
                this.receive_order_items[index].unitOfMeasurement = this.receive_order_items[index].item.default_unit_of_measurement.name;
                this.receive_order_items[index].unit_of_measurement_id = this.receive_order_items[index].item.default_unit_of_measurement.id;

                let promise = new Promise((resolve, reject) => {
                    axios.get("/api/item-pricelists/get-item-pricelists/" + this.receive_order_items[index].item_id).then(res => {
                        this.receive_order_items[index].itemPricelists = res.data.item_pricelists;
                        resolve();
                    }).catch(err => {
                        console.log(err);
                        reject();
                    });
                });
            },
            selectItemPricelist(index) {
                this.receive_order_items[index].item_pricelist_id = this.receive_order_items[index].itemPricelist.id;
                this.receive_order_items[index].subTotal = (parseFloat(this.receive_order_items[index].quantity) * parseFloat(this.receive_order_items[index].itemPricelist.price));
                this.updateTotalAmount();
            },
            updateTotalAmount() {
                let total = 0;

                this.receive_order_items.forEach(receive_order_item => {
                    total += receive_order_item.subTotal;
                });

                this.amount = total;

                if (this.amount > 0) {
                    this.isDisabled = false;
                } else {
                    this.isDisabled = true;
                }
            },
            addNewItem() {
                this.receive_order_items.push({
                    item: '',
                    item_id: '',
                    quantity: '',
                    unitOfMeasurements: [],
                    unitOfMeasurement: '',
                    unit_of_measurement_id: '',
                    itemPricelists: [],
                    itemPricelist: '',
                    item_pricelist_id: '',
                    tracking_number: '',
                    expiration_date: '',
                    subTotal: 0
                });

                this.updateTotalAmount();
            },
            deleteRow(index) {
                this.receive_order_items.splice(index, 1);
                this.updateTotalAmount();
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
                        tracking_number: receive_order_item.tracking_number,
                        expiration_date: receive_order_item.expiration_date
                    });
                });

                let formData = {
                    reference_number: this.$data.reference_number,
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
