<template>
    <div>
        <div class="card">
            <div class="card-header">
                Invoices / View Invoice
            </div>
            <div class="card-body">
                <div v-if="ifReady">
                    <fieldset>
                        <div class="row">
                            <div class="col-md-6 form-group">
                                <label>Quotation</label>
                                <input type="text" class="form-control" v-model="roRefNum.amount" readonly>
                            </div>

                            <div class="col-md-6 form-group">
                                <label>Contact</label>
                                <input type="text" class="form-control" v-model="contacts.person" readonly>
                            </div>

                            <div class="col-md-6 form-group">
                                <label>Reference #</label>
                                <input type="text" class="form-control" v-model="bills.reference_number" readonly>
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

                    <br />

                    <table class="table table-hover table-sm">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Description</th>
                                <th scope="col">Received Qty</th>
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
                                <td>{{ item.price }}</td>
                                <td>{{ subtotalRow[index] }}</td>
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
                    </table>
                    <button type="button" class="btn btn-info btn-sm" @click.prevent="viewBills">Back</button>
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

        mounted() {
            this.getItem();
        },

        methods: {
            getItem() {
                new Promise((resolve, reject) => {
                    axios.get("/api/bills/" + this.$route.params.id).then(res => {
                        this.ifReady = true;
                        this.bills = res.data.bill;
                        this.contacts = res.data.bill.contact;
                        this.billsItems = res.data.bill.bill_items;
                        this.roRefNum = res.data.bill.quotation;
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
                    return Number(item.quantity * item.price)
                });
            },
            total() {
                return this.billsItems.reduce((total, item) => {
                    return total + item.quantity * item.price;
                }, 0);
            }
        }

    };
</script>
