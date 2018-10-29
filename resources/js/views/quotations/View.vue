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
                        <span class="badge badge-info">Issued</span>
                    </h5>
                </div>
                <div v-else-if="quotations.status === 1">
                    <h5>
                        Quotation
                        <span class="badge badge-primary">Admin Approved</span>
                    </h5>
                </div>
                <div v-else>
                    <h5>
                        Quotation
                        <span class="badge badge-success">Customer Approved</span>
                    </h5>
                </div>
                <fieldset>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Number</label>
                                <input type="text" class="form-control" v-model="quotations.number" readonly>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Origin</label>
                                <input type="text" class="form-control" v-model="quotations.quotable.name" readonly>
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
                            <td>{{ quotation_item.price }}</td>
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
                <button class="btn btn-success btn-sm" v-if="quotations.status == 0" @click.prevent="approveQuotation">Approve Quotation</button>
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
                    this.quotations = res.data.quotation;
                    this.quotations.quotation_items.map(quotation_item => {
                        quotation_item.subTotal = quotation_item.quantity * quotation_item.price;
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
        },

        methods: {
            viewQuotations() {
                this.$router.push({ name: 'quotations.index' });
            },
            approveQuotation() {
                this.ifReady = false;

                let params = {
                    status: 1
                };

                axios.patch('/api/quotations/' + this.$route.params.id, params).then(res => {
                    this.quotations.status = 1;
                    this.ifReady = true;
                }).catch(err => {
                    alert('Please report to the devs');
                    this.ifReady = true;
                    console.log(err);
                });
            }
        }
    };
</script>
