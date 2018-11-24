<template>
    <div>
        <div class="content-title">
            <h4 class="module-title">INVOICE PAYMENT</h4>
            <hr class="title-border">
        </div>

        <div class="p-md-4">
            <div class="card">
                <div class="card-header">
                    <a class="text-success" href="" @click.prevent="viewInvoice">Invoice Payments</a>
                    <a class="text-secondary"> / View Invoice Payment</a>
                </div>
                <div class="card-body">
                    <div v-if="ifReady">
                        <fieldset disabled>
                            <div class="row">
                                <div class="col-md-6 form-group">
                                    <label for="name">Invoice #</label>
                                    <input type="text" class="form-control" v-model="invoiceId.reference_number" autocomplete="off" minlength="2" maxlength="255" required>
                                </div>

                                <div class="col-md-6 form-group">
                                    <label for="name">Amount</label>
                                    <input type="text" class="form-control" v-model="invoicePayment.amount" autocomplete="off" minlength="2" maxlength="255" required>
                                </div>

                                <div class="col-md-6 form-group">
                                    <label for="name">Mode of Payment</label>
                                    <input type="text" class="form-control" v-model="invoicePayment.mode_of_payment.name" autocomplete="off" minlength="2" maxlength="255" required>
                                </div>

                                <div class="col-md-6 form-group">
                                    <label for="name">CR #</label>
                                    <input type="text" class="form-control" v-model="invoicePayment.cr_number" autocomplete="off" minlength="2" maxlength="255" required>
                                </div>

                                <div class="col-md-6 form-group" v-if="invoicePayment.mode_of_payment_id == 2">
                                    <label for="name">Bank Name</label>
                                    <input type="text" class="form-control" v-model="invoicePayment.bank_name" autocomplete="off" minlength="2" maxlength="255" required>
                                </div>

                                <div class="col-md-6 form-group" v-if="invoicePayment.mode_of_payment_id == 2">
                                    <label for="name">Check #</label>
                                    <input type="text" class="form-control" v-model="invoicePayment.check" autocomplete="off" minlength="2" maxlength="255" required>
                                </div>
                                
                                
                            </div>

                        </fieldset>
                        <br>

                        <button type="button" class="btn btn-outline-success btn-sm" @click.prevent.default="viewInvoice"><i class="fas fa-chevron-left"></i> Back</button>
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
                invoiceId: '',
                invoicePayment: []
            };
        },

        mounted() {
            new Promise((resolve, reject) => {
                axios.get("/api/invoice-payments/" + this.$route.params.id).then(res => {
                    this.invoicePayment = res.data.invoicePayment;
                    this.invoiceId = res.data.invoicePayment.invoice;
                    console.log('IP: ' + JSON.stringify(res.data));
                    this.ifReady = true;
                if (!res.data.response) {
                    return;
                }
                resolve();
                });
            });
        },

        methods: {
            viewInvoice() {
                this.$router.push({
                    name: 'invoice-payments.index'
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
