<template>
    <div class="card">
        <div class="card-header">
            Quotations / View Quotation
        </div>
        <div class="card-body">
            <div v-if="ifReady">
                <div v-if="quotations.status === 0">
                    <h5>
                        Quotation
                        <span class="badge badge-secondary badge-info">Issued</span>
                    </h5>
                </div>
                <div v-else-if="quotations.status === 1">
                    <h5>
                        Quotation
                        <span class="badge badge-secondary badge-success">Payed</span>
                    </h5>
                </div>
                <div v-else>
                    <h5>
                        Quotation
                        <span class="badge badge-secondary badge-danger">Cancelled</span>
                    </h5>
                </div>
                <fieldset>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Date</label>
                                <input type="text" class="form-control" v-model="quotations.created_at" readonly>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Origin</label>
                                <input type="text" class="form-control" v-model="quotations.quotable_type" readonly>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Company</label>
                                <input type="text" class="form-control" v-model="quotations.contact.company" readonly>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Contact</label>
                                <input type="text" class="form-control" v-model="quotations.contact.person" readonly>
                            </div>
                        </div>
                    </div>
                </fieldset>

                <br />

                <legend>Quotation Items</legend>
                <table class="table table-hover table-sm">
                    <thead>
                        <tr>
                            <th scope="col">Skock Keeping Unit</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">UoM</th>
                            <th scope="col">Price</th>
                            <th scope="col">Sub Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr :key="index" v-for="(quotation_item, index) in quotations.quotation_items">
                            <td>{{ quotation_item.item.stock_keeping_unit }}</td>
                            <td>{{ quotation_item.item.name }}</td>
                            <td>{{ quotation_item.item.description }}</td>
                            <td>{{ quotation_item.quantity }}</td>
                            <td>{{ quotation_item.unit_of_measurement.name }}</td>
                            <td>{{ quotation_item.item_pricelist.price }}</td>
                            <td>{{ quotation_item.subTotal }}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td><b>Total</b></td>
                            <td><b>{{ total }}</b></td>
                        </tr>
                    </tbody>
                </table>

                <button type="button" class="btn btn-outline-secondary btn-sm" @click.prevent="viewQuotations">Back</button>
                <!-- <button class="btn btn-danger btn-sm" v-if="quotations.status == 0" @click="closeQuotation(quotations.id, quotations.purchase_order_number)">Approve Quotation</button> -->
                <!-- <button class="btn btn-danger btn-sm" v-if="quotations.status == 0" @click="closeQuotation(quotations.id, quotations.purchase_order_number)">Close Quotation</button> -->
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
                quotations: [],
                total: 0
            };
        },

        mounted() {
            let promise = new Promise((resolve, reject) => {
                axios.get("/api/quotations/" + this.$route.params.id).then(res => {
                    // console.log('Quote 4: ' + JSON.stringify(res.data));
                    this.quotations = res.data.quotation;

                    this.quotations.quotation_items.map(quotation_item => {
                        quotation_item.subTotal = quotation_item.quantity * quotation_item.item_pricelist.price;
                        this.total += quotation_item.subTotal;
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

            
        
            // let promise2 = new Promise((resolve, reject) => {
            //     axios.get('/api/quotations/4').then(res => {
            //         console.log('Quote 4: ' + JSON.stringify(res.data));
            //         resolve();
            //     });
            // });
        },

        methods: {
            viewQuotations() {
                this.$router.push({ name: 'quotations.index' });
            }
            // closeQuotation(id, quotationsId) {
            //     const formData = { id: id };

            //     if (confirm(`Are you sure you want to close ${quotationsId}`)) {
            //         axios.post("/api/purchase-orders/close", formData).then(res => {
            //             alert(`Success! ${quotationsId} is now closed`);
            //             location.reload();
            //         }).catch(err => {
            //             console.log(err);
            //             alert(`Error! Can't close purchase order`);
            //         });
            //     }
            // }
        }
    };
</script>
