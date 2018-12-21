<template>
    <div>
        <div v-bind:class="this.$store.state.showSidebar? 'content-title':'spacer content-title' ">
            <h4 class="module-title">QUOTATIONS</h4>
            <hr class="title-border">
        </div>

        <div class="p-md-4">
            <div class="card">
                <div class="card-header">
                    <a class="text-success" href="" @click.prevent="viewQuotations">Quotations</a>
                    <a class="text-secondary"> / View Quotation</a>
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
                        <div v-else-if="quotations.status === 2">
                            <h5>
                                Quotation
                                <span class="badge badge-danger">Admin Cancelled</span>
                            </h5>
                        </div>
                        <div v-else-if="quotations.status === 3">
                            <h5>
                                Quotation
                                <span class="badge badge-danger">Customer Approved</span>
                            </h5>
                        </div>
                        <div v-else>
                            <h5>
                                Quotation
                                <span class="badge badge-success">Customer Cancelled</span>
                            </h5>
                        </div>
                        <fieldset>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Quotation #</label>
                                        <input type="text" class="form-control" v-model="quotations.number" readonly>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Stock Origin</label>
                                        <input type="text" class="form-control" v-model="quotations.quotable.name" readonly>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Customer Name</label>
                                        <input type="text" class="form-control" v-model="quotations.contact.person" readonly>
                                    </div>
                                </div>

                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label>Tax</label>
                                        <input type="text" class="form-control" v-model="quotations.tax" readonly>
                                    </div>
                                </div>

                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label>Validity Date</label>
                                        <input type="text" class="form-control" v-model="quotations.validity_date" readonly>
                                    </div>
                                </div>

                                <div class="col-md-12 form-group">
                                    <hr>
                                    <h5><u>Customer Information:</u></h5>
                                    <div><label for="name"><strong>Customer</strong></label>: {{contactData.person}}</div>
                                    <div><label for="name"><strong>Company</strong></label>: {{contactData.company}}</div>
                                    <div><label for="name"><strong>Address</strong></label>: {{contactData.company_address}}</div>
                                    <div><label for="name"><strong>Email</strong></label>: {{contactData.email}}</div>
                                    <div><label for="name"><strong>Phone</strong></label>: {{contactData.mobile_number}}</div>
                                    <hr>
                                </div>

                            </div>
                        </fieldset>

                        <br />

                        <legend>Quotation Items</legend>
                        <table class="table table-hover table-sm">
                            <thead>
                                <tr>
                                    <th scope="col">SKU</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Desc</th>
                                    <th scope="col">Qty</th>
                                    <th scope="col">UoM</th>
                                    <th scope="col">Price</th>
                                    <th class="text-right">Sub Total</th>
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
                                    <td align="right">{{ quotation_item.subTotal | Decimal }}</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td><b>Total</b></td>
                                    <td align="right"><b>{{ total | Decimal }}</b></td>
                                </tr>
                            </tbody>
                        </table>
                        
                        <br><br>

                        <div class="clearfix">
                            <div class="float-left">
                                <button type="button" class="btn btn-outline-success btn-sm" @click.prevent="viewQuotations"><i class="fas fa-chevron-left"></i> Back</button>
                                <button type="button" class="btn btn-danger btn-sm" v-if="quotations.status === 0" @click.prevent.default="openDeleteQuotationModal"><i class="fas fa-trash-alt"></i> Delete</button>
                            </div>
                            <div class="float-right">
                                <button class="btn btn-success btn-sm" v-if="quotations.status == 0" @click.prevent="openApproveQuotationModal"><i class="fas fa-thumbs-up"></i> Approve Quotation</button>
                                <button class="btn btn-danger btn-sm" v-if="quotations.status === 0" @click.prevent.default="openCancelQuotationModal"><i class="fas fa-thumbs-down"></i> Cancel</button>
                            </div>
                        </div>

                    </div>
                    <div v-else>
                        <div class="progress">
                            <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;"></div>
                        </div>
                    </div>
                </div>

                <!-- Delete Modal -->
                <div class="modal fade" id="deleteQuotationModal" tabindex="-1" role="dialog" aria-labelledby="deleteQuotationTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLongTitle">You're about to delete this Quotation?</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                Are you sure you want to delete this {{quotations.number}}? <br><br>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-danger btn-sm" @click.prevent.default="deleteQuotation">Confirm Delete</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Approve Modal -->
                <div class="modal fade" id="approveQuotationModal" tabindex="-1" role="dialog" aria-labelledby="approveQuotationTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLongTitle">You're about to approve this Quotation?</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                Are you sure you want to approve this {{quotations.number}}? <br><br>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-success btn-sm" @click.prevent.default="openApproveQuotation">Confirm Approve</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Cancel Modal -->
                <div class="modal fade" id="cancelQuotationModal" tabindex="-1" role="dialog" aria-labelledby="cancelQuotationTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLongTitle">You're about to cancel this Quotation?</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                Are you sure you want to cancel this {{quotations.number}}? <br><br>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-danger btn-sm" @click.prevent.default="openCancelQuotation">Confirm Cancel</button>
                            </div>
                        </div>
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
                ifReady: false,
                quotations: [],
                contactData: [],
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
                axios.get("/api/quotations/" + this.$route.params.id).then(res => {
                    this.quotations = res.data.quotation;
                    this.contactData = res.data.quotation.contact;
                    // console.log("Quotations" + JSON.stringify(res.data.quotation));
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

            openDeleteQuotationModal() {
                $('#deleteQuotationModal').modal('show');
            },
            deleteQuotation() {
                $('#deleteQuotationModal').modal('hide');

                axios.delete('/api/quotations/' + this.$route.params.id).then(res => {
                    this.$router.push({ name: 'quotations.index' });
                }).catch(err => {
                    alert("Error!");
                    console.log(err);
                });
            },

            openCancelQuotationModal() {
                $('#cancelQuotationModal').modal('show');
            },

            openCancelQuotation() {
                this.ifReady = false;

                $('#cancelQuotationModal').modal('hide');

                let params = {
                    status: 2
                };
                axios.patch('/api/quotations/' + this.$route.params.id, params).then(res => {
                    this.quotations.status = 2;
                    this.ifReady = true;
                }).catch(err => {
                    alert('Please report to the devs');
                    this.ifReady = true;
                    console.log(err);
                });
            },

            openApproveQuotationModal() {
                $('#approveQuotationModal').modal('show');
            },

            openApproveQuotation() {
                this.ifReady = false;

                $('#approveQuotationModal').modal('hide');

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
