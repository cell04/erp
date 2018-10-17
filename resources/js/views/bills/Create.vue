<template>
    <div>
        <div class="card">
            <div class="card-header">
                Bills / Create New Bill
            </div>
            <div class="card-body">
                <div v-if="ifReady">
                    <form v-on:submit.prevent="createNewPurchaseOrder">
                        <div class="row">
                            <div class="col-md-12 form-group">
                                <label>Received Orders</label>
                                <vue-select v-model="receivedOrder" @input="selectReceivedOrder()" label="reference_number" :options="receivedOrders" required></vue-select>
                            </div>

                            <div class="col-md-6 form-group">
                                <label>Date</label>
                                <input type="date" class="form-control" v-model="order_date" required>
                            </div>

                            <div class="col-md-6 form-group">
                                <label>Contact</label>
                                <select class="form-control" v-model="contact_id" required>
                                    <option value="" disabled hidden>Select Contact</option>
                                    <option v-for="contact in contacts" v-bind:value="contact.id">{{ contact.person }}</option>
                                </select>
                            </div>

                            <div class="col-md-6 form-group">
                                <label>Warehouse</label>
                                <select class="form-control" v-model="sub_department_id" required>
                                    <option value="" disabled hidden>Select Warehouse</option>
                                    <option v-for="department in sub_departments" v-bind:value="department.id">{{ department.name }}</option>
                                </select>
                            </div>

                            <div class="col-md-6 form-group">
                                <label>Payment Term</label>
                                <select class="form-control" v-model="paymentTerm_id" required>
                                    <option value="" disabled hidden>Select Payment Term</option>
                                    <option v-for="payment in paymentTerm" v-bind:value="payment.id">{{ payment.name }}</option>
                                </select>
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
                                    <th scope="col">Quantity</th>
                                    <th scope="col">UOM</th>
                                    <th scope="col">Unit Price</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item) in items">
                                    <td>{{ item.item.sku }}</td>
                                    <td>
                                        <select class="form-control" v-model="item.item.item_id" required v-on:change="onSelectItem(item.item.item_id, key)">
                                            <option value="" disabled hidden>Select Item</option>
                                            <option v-for="item in itemsList" v-bind:value="item.item.id">{{ item.item.name }}</option>
                                        </select>
                                    </td>
                                    <td><input class="form-control" v-model.number="item.item.quantity" required></td>
                                    <td>{{ item.item.unit_name }}</td>
                                    <td><input class="form-control" v-model.number="item.item.unit_price"></td>
                                    <td>{{subtotalRow[key]}}</td>
                                    <td>
                                        <button type="button" class="btn btn-danger btn-sm" @click="deleteRow">Remove</button>
                                    </td>
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
                            <button type="button" class="btn btn-primary btn-sm" @click="addRow">Add Row</button>
                        </table>

                        <button type="submit" class="btn btn-success btn-sm">Create New Bill</button>
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
                receivedOrders: [],
                receivedOrder: null,
                received_order_id: "",
                contacts: "",
                sub_departments: "",
                itemsList: "",
                reference_number: "",
                contact_id: "",
                order_date: "",
                sub_department_id: "",
                items: [],
                amount: "",
                paymentTerm: [],
                paymentTerm_id:"",
                receivedOrderItems: []
            };
        },

        mounted() {
            new Promise((resolve, reject) => {
                axios.get("/api/receive-orders/retrieve-all-receive-orders").then(res => {
                    console.log(res.data.receive_orders);
                    this.receivedOrders = res.data.receive_orders;
                    if (!res.data.response) {
                        return;
                    }
                    resolve();
                });
            });

            new Promise((resolve, reject) => {
                axios.get("/api/contacts/retrieve-all-contacts").then(res => {
                    this.contacts = res.data.contacts;
                    if (!res.data.response) {
                        return;
                    }
                    resolve();
                });
            });

            new Promise((resolve, reject) => {
                axios.get("/api/sub-departments/retrieve-all-sub-departments/").then(res2 => {
                    this.sub_departments = res2.data.sub_departments;
                    if (!res2.data.response) {
                        return;
                    }
                    resolve();
                });
            });

            new Promise((resolve, reject) => {
                axios.get("/api/payment-terms/retrieve-all-payment-terms").then(res4 => {
                    this.paymentTerm = res4.data.payment_terms;
                    if (!res4.data.response) {
                        return;
                    }
                    resolve();
                });
            });

            this.addRow();
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
            selectReceivedOrder() {
                this.received_order_id = this.receivedOrder.id;
                axios.get("/api/receive-orders/" + this.receivedOrder.id).then(res => {
                    this.items = res.data.purchase_order.receive_items;
                    if (! res.data.response) { return; }
                    resolve();
                });
            },
            onSelectItem(id, index) {
                const Index = index
                const selectedItem = this.itemsList.find(y => y.id === id);
                this.items[Index].sku = selectedItem.SKU,
                this.items[Index].item_id = selectedItem.id,
                this.items[Index].unit_id = selectedItem.purchase_unit_id,
                this.items[Index].unit_name = selectedItem.purchase_uom.name,
                this.items[Index].unit_price = selectedItem.purchase_price
            },
            addRow() {
                this.items.push({
                    sku: '',
                    item_id: '',
                    quantity: '',
                    unit_id: '',
                    unit_name: '',
                    unit_price: ''
                })
            },
            deleteRow(index) {
                this.items.splice(index,1)
            },
            createNewPurchaseOrder() {
                const newItems = [];

                this.$data.items.forEach(element => {
                    newItems.push({
                        item_id: element.item_id,
                        quantity: element.quantity,
                        unit_id: element.unit_id,
                        unit_price: element.unit_price,
                        receive_order_id: this.$data.received_order_id
                    });
                });

                const formData = {
                    reference_number: this.$data.reference_number,
                    contact_id: this.$data.contact_id,
                    order_date: this.$data.order_date,
                    sub_department_id: this.$data.sub_department_id,
                    payment_term_id: this.$data.paymentTerm_id,
                    amount: this.total,
                    items: newItems,
                    receive_order_id: this.$data.received_order_id
                }

                axios.post("/api/bills", formData).then(res => {
                    this.$router.push({ name: "bills.index" });
                }).catch(err => {
                    console.log(err);
                    alert(`Error! Can't create Bill`);
                });
            }
        }
    };
</script>
