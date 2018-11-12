<template>
    <div>
        <div class="card">
            <div class="card-header">
                <b>Bills / View Bill</b>
            </div>
            <div class="card-body">
                <div v-if="ifReady">
                    <div v-if="bills.amount_paid == 0.00">
                        <h5>
                            Bill Details
                            <span class="badge badge-info">Issued</span>
                        </h5>
                    </div>
                    <div v-else-if="bills.amount_paid < bills.amount">
                        <h5>
                            Bill Details
                            <span class="badge badge-primary">Partially Paid</span>
                        </h5>
                    </div>
                    <div v-else>
                        <h5>
                            Bill Details
                            <span class="badge badge-success">Fully Paid</span>
                        </h5>
                    </div>
                    <fieldset>
                        <div class="row">
                            <div class="col-md-6 form-group">
                                <label>Bill #</label>
                                <input type="text" class="form-control" v-model="bills.reference_number" readonly>
                            </div>

                            <div class="col-md-6 form-group">
                                <label>Contact</label>
                                <input type="text" class="form-control" v-model="contacts.person" readonly>
                            </div>

                            <div class="col-md-6 form-group">
                                <label>Amount</label>
                                <input type="number" class="form-control" v-model="bills.amount" readonly>
                            </div>

                            <div class="col-md-6 form-group">
                                <label>Amount Paid</label>
                                <input type="number" class="form-control" v-model="bills.amount_paid" readonly>
                            </div>

                            <div class="col-md-6 form-group">
                                <label>Due Date</label>
                                <input type="date" class="form-control" v-model="bills.due_date" readonly>
                            </div>
                        </div>
                    </fieldset>

                    <br>
                    <h5>
                        Invoice Item Details
                    </h5>
                    <br>

                    <table class="table table-hover table-sm">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Description</th>
                                <th scope="col">Qty</th>
                                <th scope="col">UOM</th>
                                <th scope="col">Unit Price</th>
                                <th scope="col">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr :key="item.id" v-for="(item, index) in billsItems">
                                <td>{{ item.item.name }}</td>
                                <td>{{ item.item.description }}</td>
                                <td>{{ item.quantity }}</td>
                                <td>{{ item.unit_of_measurement.name }}</td>
                                <td>{{ item.item_pricelist.price }}</td>
                                <td>{{ subtotalRow[index] | Decimal}}</td>
                            </tr>
                            <tr>
                                <td colspan="4"></td>
                                <td>
                                    <b>Total</b>
                                </td>
                                <td>{{total | Decimal}}</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    <br>
                    <button type="button" class="btn btn-outline-success btn-sm" @click.prevent="viewBills"><i class="fas fa-chevron-left"></i> Back</button>
                </div>

                <div v-else>
                    <div class="progress">
                        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;"></div>
                    </div>
                </div>
            </div>
        </div>
        <br>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                ifReady: false,
                bills: [],
                contacts: [],
                roRefNum: [],
                billsItems: []
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
            this.getItem();
        },

        methods: {
            getItem() {
                new Promise((resolve, reject) => {
                    axios.get("/api/bills/" + this.$route.params.id).then(res => {
                        // console.log('Bills: ' + JSON.stringify(res.data));
                        this.ifReady = true;
                        this.bills = res.data.bill;
                        this.contacts = res.data.bill.contact;
                        this.billsItems = res.data.bill.bill_items;
                        this.roRefNum = res.data.bill.receive_order;
                        if (!res.data.response) {
                            return;
                        }
                        resolve();
                    });
                });
            },
            viewBills() {
                this.$router.push({
                    name: "bills.index"
                });
            }
        },

        computed: {
            subtotalRow() {
                return this.billsItems.map((item) => {
                    return Number(item.quantity * item.item_pricelist.price)
                });
            },
            total() {
                return this.billsItems.reduce((total, item) => {
                    return total + item.quantity * item.item_pricelist.price;
                }, 0);
            }
        }

    };
</script>
