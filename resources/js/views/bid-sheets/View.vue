<template>
    <div>
        <div v-bind:class="this.$store.state.showSidebar? 'content-title':'spacer content-title' ">
            <h4 class="module-title">BID SHEET</h4>
            <hr class="title-border">
        </div>

        <div class="p-md-4">
            <div class="card">
                <div class="card-header">
                    <a class="text-success" href="" @click.prevent="viewBidSheets">Bid Sheets</a>
                    <a class="text-secondary"> / View Bid Sheet</a>
                </div>
                <div class="card-body">
                    <div v-if="ifReady">
                        <div v-if="bidsheet.status === 0">
                            <h5>
                                Bid Sheet
                                <span class="badge badge-info">Issued</span>
                            </h5>
                        </div>
                        <div v-else-if="bidsheet.status === 1">
                            <h5>
                                Bid Sheet
                                <span class="badge badge-primary">Admin Approved</span>
                            </h5>
                        </div>
                        <div v-else-if="bidsheet.status === 2">
                            <h5>
                                Bid Sheet
                                <span class="badge badge-danger">Admin Cancelled</span>
                            </h5>
                        </div>
                        <div v-else>
                            <h5>
                                Bid Sheet
                                <span class="badge badge-success">Customer Approved</span>
                            </h5>
                        </div>
                        <fieldset>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Bid Sheet #</label>
                                        <input type="text" class="form-control" v-model="bidsheet.bid_sheet_number" readonly>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Location</label>
                                        <input type="text" class="form-control" v-model="bidsheet.location.name" readonly>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Customer Name</label>
                                        <input type="text" class="form-control" v-model="bidsheet.contact.person" readonly>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Project Title</label>
                                        <input type="text" class="form-control" v-model="bidsheet.project_title" readonly>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Description</label>
                                        <input type="text" class="form-control" v-model="bidsheet.description" readonly>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Amount</label>
                                        <input type="text" class="form-control" v-model="bidsheet.amount" readonly>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Bid Sheet Date</label>
                                        <input type="text" class="form-control" v-model="bidsheet.bid_sheet_date" readonly>
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

                        <br><br>

                        <div class="clearfix">
                            <div class="float-left">
                                <button type="button" class="btn btn-outline-success btn-sm" @click.prevent="viewBidSheets"><i class="fas fa-chevron-left"></i> Back</button>
                                <button type="button" class="btn btn-danger btn-sm" v-if="bidsheet.status === 0" @click.prevent.default="openDeleteBidSheetModal"><i class="fas fa-trash-alt"></i> Delete</button>
                            </div>
                            <div class="float-right">
                                <button class="btn btn-success btn-sm" v-if="bidsheet.status == 0" @click.prevent="openApproveBidSheetModal"><i class="fas fa-thumbs-up"></i> Approve Quotation</button>
                                <button class="btn btn-danger btn-sm" v-if="bidsheet.status === 0" @click.prevent.default="openCancleBidSheetModal"><i class="fas fa-thumbs-down"></i> Cancel</button>
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
                <div class="modal fade" id="deleteBidSheetModal" tabindex="-1" role="dialog" aria-labelledby="deleteBidSheetTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLongTitle">You're about to delete this Bid Sheet?</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                Are you sure you want to delete this {{bidsheet.bid_sheet_number}}? <br><br>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-danger btn-sm" @click.prevent.default="deleteBidSheet">Confirm Delete</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Approve Modal -->
                <div class="modal fade" id="approveBidSheetModal" tabindex="-1" role="dialog" aria-labelledby="approveBidSheetTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLongTitle">You're about to approve this Bid Sheet?</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                Are you sure you want to approve this {{bidsheet.bid_sheet_number}}? <br><br>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-success btn-sm" @click.prevent.default="openApproveBidSheet">Confirm Approve</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Cancel Modal -->
                <div class="modal fade" id="cancelBidSheetModal" tabindex="-1" role="dialog" aria-labelledby="cancelBidSheetTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLongTitle">You're about to cancel this Bid Sheet?</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                Are you sure you want to cancel this {{bidsheet.bid_sheet_number}}? <br><br>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-danger btn-sm" @click.prevent.default="openCancelBidSheet">Confirm Cancel</button>
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
                bidsheet: [],
                contactData: []
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
                axios.get("/api/bid-sheets/" + this.$route.params.id).then(res => {
                    this.bidsheet = res.data.bidSheet;
                    this.contactData = res.data.bidSheet.contact;
                    // console.log("Quotations" + JSON.stringify(res.data.bidSheet));
                    resolve();
                }).catch(err => {
                    console.log(err);
                    reject();
                });
            });

            promise.then(() => {
                this.ifReady = true;
            });
            // console.log("Approved By: " + JSON.parse(localStorage.getItem('user')));
        },

        methods: {
            viewBidSheets() {
                this.$router.push({ name: 'bid-sheets.index' });
            },

            openDeleteBidSheetModal() {
                $('#deleteBidSheetModal').modal('show');
            },
            deleteBidSheet() {
                $('#deleteBidSheetModal').modal('hide');

                axios.delete('/api/bid-sheets/' + this.$route.params.id).then(res => {
                    this.$router.push({ name: 'bid-sheets.index' });
                }).catch(err => {
                    alert("Error!");
                    console.log(err);
                });
            },

            openCancleBidSheetModal() {
                $('#cancelBidSheetModal').modal('show');
            },

            openCancelBidSheet() {
                this.ifReady = false;

                $('#cancelBidSheetModal').modal('hide');

                let params = {
                    status: 2
                };
                axios.patch('/api/bid-sheets/' + this.$route.params.id, params).then(res => {
                    this.bidsheet.status = 2;
                    this.ifReady = true;
                }).catch(err => {
                    alert('Please report to the devs');
                    this.ifReady = true;
                    console.log(err);
                });
            },

            openApproveBidSheetModal() {
                $('#approveBidSheetModal').modal('show');
            },

            openApproveBidSheet() {
                this.ifReady = false;

                $('#approveBidSheetModal').modal('hide');

                let params = {
                    status: 1,
                    approved_bid_sheet_date: moment(new Date()).format('YYYY-MM-DD')
                };
                axios.patch('/api/bid-sheets/' + this.$route.params.id, params).then(res => {
                    this.bidsheet.status = 1;
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
