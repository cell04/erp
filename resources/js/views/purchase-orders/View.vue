<template>
    <div class="card">
        <div class="card-header">
            Purchase Orders / View Purchase Order
        </div>
        <div class="card-body">
            <div v-if="ifReady">
                <div v-if="purchaseOrder.status === 0">
                    <h5>
                        Purchase Order
                        <span class="badge badge-secondary badge-info">Issued</span>
                    </h5>
                </div>
                <div v-else-if="purchaseOrder.status === 1">
                    <h5>
                        Purchase Order
                        <span class="badge badge-secondary badge-success">Payed</span>
                    </h5>
                </div>
                <div v-else>
                    <h5>
                        Purchase Order
                        <span class="badge badge-secondary badge-danger">Cancelled</span>
                    </h5>
                </div>
                <fieldset>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Purchase Order #</label>
                                <input type="text" class="form-control" v-model="purchaseOrder.reference_number" readonly>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Contact</label>
                                <input type="text" class="form-control" v-model="purchaseOrder.contact.person"readonly>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Warehouse</label>
                                <input type="text" class="form-control" v-model="purchaseOrder.warehouse.name" readonly>
                            </div>
                        </div>
                    </div>
                </fieldset>

                <br />

                <legend>Purchase Order Items</legend>
                <table class="table table-hover table-sm">
                    <thead>
                        <tr>
                            <th scope="col">SKU</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Qty</th>
                            <th scope="col">Received Qty</th>
                            <th scope="col">Remaining Qty</th>
                            <th scope="col">UoM</th>
                            <th scope="col">Price</th>
                            <th class="text-right">Sub Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr :key="index" v-for="(purchase_order_item, index) in purchaseOrder.purchase_order_items">
                            <td>{{ purchase_order_item.item.stock_keeping_unit }}</td>
                            <td>{{ purchase_order_item.item.name }}</td>
                            <td>{{ purchase_order_item.item.description }}</td>
                            <td>{{ purchase_order_item.quantity}}</td>
                            <td>{{ purchase_order_item.receive_quantity }}</td>
                            <td>{{ (purchase_order_item.quantity - purchase_order_item.receive_quantity) }}</td>
                            <td>{{ purchase_order_item.unit_of_measurement.name }}</td>
                            <td>{{ purchase_order_item.item_pricelist.price }}</td>
                            <td align="right">{{ purchase_order_item.subTotal | Decimal }}</td>
                        </tr>
                        <tr>
                            <td colspan="7"></td>
                            <td><b>Total</b></td>
                            <td align="right"><b>{{ total | Decimal }}</b></td>
                        </tr>
                    </tbody>
                </table>

                <br>
                <button type="button" class="btn btn-outline-success btn-sm" @click.prevent="viewPurchaseOrders"><i class="fas fa-chevron-left"></i> Back</button>
                <router-link v-if="purchaseOrder.status == 0" :to="{ name: 'receive-orders.receive', params: { po_id: purchaseOrder.id }}">
                    <button class="btn btn-success btn-sm"><i class="fas fa-plus"></i> Receive PO</button>
                </router-link>
                <!-- <button class="btn btn-danger btn-sm" v-if="purchaseOrder.status == 0" @click="closePurchaseOrder(purchaseOrder.id, purchaseOrder.purchase_order_number)"> <i class="fas fa-times"></i> Close PO</button> -->
            
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
                purchaseOrder: null,
                total: 0
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
            let promise = new Promise((resolve, reject) => {
                axios.get("/api/purchase-orders/" + this.$route.params.id).then(res => {
                    console.log(res.data);
                    this.purchaseOrder = res.data.purchaseOrder;

                    this.purchaseOrder.purchase_order_items.map(purchase_order_item => {
                        purchase_order_item.subTotal = purchase_order_item.quantity * purchase_order_item.item_pricelist.price;
                        this.total += purchase_order_item.subTotal;
                    });

                    resolve();
                }).catch(err => {
                    console.log(err);
                    reject();
                });
            });

            promise.then(() => {
                this.ifReady = true;
            });
        },

        methods: {
            viewPurchaseOrders() {
                this.$router.push({ name: 'purchase-orders.index' });
            },
            closePurchaseOrder(id, purchaseOrderId) {
                const formData = { id: id };

                if (confirm(`Are you sure you want to close ${purchaseOrderId}`)) {
                    axios.post("/api/purchase-orders/close", formData).then(res => {
                        alert(`Success! ${purchaseOrderId} is now closed`);
                        location.reload();
                    }).catch(err => {
                        console.log(err);
                        alert(`Error! Can't close purchase order`);
                    });
                }
            }
        }
    };
</script>
