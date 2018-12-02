<template>
    <div>
        <div class="card">
            <div class="card-header">
                Bill Payments / View Bill Payment
            </div>
            <div class="card-body">
                <div v-if="ifReady">
                    <fieldset disabled>
                        <div class="form-group">
                            <label for="name">Bill Reference #</label>
                            <input type="text" class="form-control" v-model="invoiceId.reference_number" autocomplete="off" minlength="2" maxlength="255" required>
                        </div>

                        <div class="form-group">
                            <label for="name">Amount</label>
                            <input type="text" class="form-control" v-model="invoicePayment.amount" autocomplete="off" minlength="2" maxlength="255" required>
                        </div>
                    </fieldset>

                    <button type="button" class="btn btn-outline-secondary btn-sm" @click.prevent.default="viewBill">Back</button>
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
                        <h5 class="modal-title" id="exampleModalLongTitle">You're about to delete this Item Classification?</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Are you sure you want to delete this Item Classification?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger btn-sm" @click.prevent.default="deleteItemClassification">Confirm Delete</button>
                        <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div> -->

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
                axios.get("/api/bill-payments/" + this.$route.params.id).then(res => {
                    this.invoicePayment = res.data.billPayment;
                    this.invoiceId = res.data.billPayment.bill;
                    // console.log('IP: ' + JSON.stringify(res.data));
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
                    name: 'bill-payment.index'
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
