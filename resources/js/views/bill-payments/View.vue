<template>
    <div>
        <div class="content-title">
            <h4 class="module-title">PURCHASE INVOICE PAYMENT</h4>
            <hr class="title-border">
        </div>

        <div class="p-md-4">
            <div class="card">
                <div class="card-header">
                    <a class="text-success" href="" @click.prevent="viewBill">Purchase Invoice Payments</a>
                    <a class="text-secondary"> / View Purchase Invoice Payment</a>
                </div>
                <div class="card-body">
                    <div v-if="ifReady">
                        <fieldset disabled>
                            <div class="row">
                                <div class="col-md-6 form-group">
                                    <label for="name">Purchase Invoice #</label>
                                    <input type="text" class="form-control" v-model="billId.reference_number" autocomplete="off" minlength="2" maxlength="255" required>
                                </div>

                                <div class="col-md-6 form-group">
                                    <label for="name">Purchase Invoice Payment #</label>
                                    <input type="text" class="form-control" v-model="billPayment.bills_payment_number" autocomplete="off" minlength="2" maxlength="255" required>
                                </div>

                                <div class="col-md-6 form-group">
                                    <label for="name">Purchase Invoice Payment Date</label>
                                    <input type="text" class="form-control" v-model="billPayment.bills_payment_date" required>
                                </div>

                                <div class="col-md-6 form-group">
                                    <label for="name">Amount</label>
                                    <input type="text" class="form-control" v-model="billPayment.amount" autocomplete="off" minlength="2" maxlength="255" required>
                                </div>

                                <div class="col-md-6 form-group">
                                    <label for="name">Remaining Balance</label>
                                    <input type="text" class="form-control" v-model="remaining_balance" autocomplete="off" minlength="2" maxlength="255" required>
                                </div>

                                <div class="col-md-6 form-group">
                                    <label for="name">Mode of Payment</label>
                                    <input type="text" class="form-control" v-model="billPayment.mode_of_payment.name" autocomplete="off" minlength="2" maxlength="255" required>
                                </div>

                                <div class="col-md-6 form-group">
                                    <label for="name">CR #</label>
                                    <input type="text" class="form-control" v-model="billPayment.cr_number" autocomplete="off" minlength="2" maxlength="255" required>
                                </div>

                                <div class="col-md-6 form-group" v-if="billPayment.mode_of_payment_id == 2">
                                    <label for="name">Bank Name</label>
                                    <input type="text" class="form-control" v-model="billPayment.bank_name" autocomplete="off" minlength="2" maxlength="255" required>
                                </div>

                                <div class="col-md-6 form-group" v-if="billPayment.mode_of_payment_id == 2">
                                    <label for="name">Check #</label>
                                    <input type="text" class="form-control" v-model="billPayment.check" autocomplete="off" minlength="2" maxlength="255" required>
                                </div>

                                <div class="col-sm-6 form-group"></div>

                                <div class="col-sm-6 form-group">
                                    <div><label for="name"><strong>Supplier</strong></label>: {{contacts.company}}</div>
                                    <div><label for="name"><strong>Address</strong></label>: {{contacts.company_address}}</div>
                                    <div><label for="name"><strong>Email</strong></label>: {{contacts.email}}</div>
                                    <div><label for="name"><strong>Phone</strong></label>: {{contacts.mobile_number}}</div>
                                </div>
                            </div>
                            

                        </fieldset>

                        <button type="button" class="btn btn-outline-success btn-sm" @click.prevent.default="viewBill"><i class="fas fa-chevron-left"></i> Back</button>
                        <!-- <button type="button" class="btn btn-primary btn-sm" @click.prevent.default="editItemClassification">Edit Item Class</button>
                        <button type="button" class="btn btn-danger btn-sm" @click.prevent.default="openDeleteItemClassificationModal">Delete Item Class</button> -->
                    </div>
                    <div v-else>
                        <div class="progress">
                            <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Modal -->
            <!-- <div class="modal fade" id="deleteItemClassificationModal" tabindex="-1" role="dialog" aria-labelledby="deleteItemClassificationTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">You're about to delete this  Item Subtype?</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            Are you sure you want to delete this  Item Subtype?
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger btn-sm" @click.prevent.default="deleteItemClassification">Confirm Delete</button>
                            <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                ifReady: false,
                billId: '',
                billPayment: [],
                remaining_balance: null,
                contacts: []
            };
        },

        mounted() {
            new Promise((resolve, reject) => {
                axios.get("/api/bill-payments/" + this.$route.params.id).then(res => {
                    this.billPayment = res.data.billPayment;
                    this.billId = res.data.billPayment.bill;
                    this.contacts = res.data.billPayment.bill.contact;
                    this.remaining_balance = (+res.data.billPayment.bill.amount) - (+res.data.billPayment.bill.amount_paid)
                    console.log((res.data));
                    this.ifReady = true;
                if (!res.data.response) {
                    return;
                }
                resolve();
                });
            });
        },

        methods: {
            viewBill() {
                this.$router.push({
                    name: 'bill-payments.index'
                });
            },
            // editItemClassification() {
            //     this.$router.push({
            //         name: 'item-classifications.edit',
            //         params: { id: this.itemClass.id }
            //     });
            // },
            // openDeleteItemClassificationModal() {
            //     $('#deleteItemClassificationModal').modal('show');
            // },
            // deleteItemClassification() {
            //     $('#deleteItemClassificationModal').modal('hide');
            //     axios.delete('/api/item-classifications/' + this.$route.params.id).then(res => {
            //         this.$router.push({ name: 'item-classifications.index' });
            //     }).catch(err => {
            //         console.log(err);
            //     });
            // }
        }
    }
</script>
