<template>
    <div>
        <div v-bind:class="this.$store.state.showSidebar? 'content-title':'spacer content-title' ">
            <h4 class="module-title">PURCHASE INVOICE</h4>
            <hr class="title-border">
        </div>

        <div class="p-md-4">
            <div class="container p-md-0">
                <div class="card">
                    <div class="card-header">
                        <a class="text-success" href="" @click.prevent="viewBills">Purchase Invoices</a>
                        <a class="text-secondary"> / View Purchase Invoice</a>
                        <span class="float-right"> <strong>Purchase Invoice #:</strong> {{bills.reference_number}}</span>
                    </div>
                    <div class="card-body">
                        <div v-if="ifReady">
                            <div class="row mb-4">
                                <div class="col-sm-6">
                                    <h6 class="mb-3">To:</h6>
                                    <div>
                                        <strong>{{contacts.person}}</strong>
                                    </div>
                                    <div>Company: {{contacts.company}}</div>
                                    <div>{{contacts.company_address}}</div>
                                    <div>Email: {{contacts.email}}</div>
                                    <div>Phone: {{contacts.mobile_number}}</div>
                                </div>
                                <div class="col-sm-6">
                                    <h6 class="mb-3"></h6>
                                    <br />
                                    <div><strong>Received Order #:</strong> {{bills.receive_order.reference_number}}</div>
                                    <div><span> <strong>Due Date:</strong> {{bills.due_date}}</span></div>
                                </div>
                            </div>
                            

                            <div class="table-responsive-sm">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">SKU</th>
                                            <th scope="col">Item Name</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Qty</th>
                                            <th scope="col">UOM</th>
                                            <th class="text-right">Unit Price</th>
                                            <th class="text-right">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr :key="item.id" v-for="(item, index) in billsItems">
                                        <td>{{ item.item.stock_keeping_unit }}</td>
                                        <td>{{ item.item.name }}</td>
                                        <td>{{ item.item.description }}</td>
                                        <td>{{ item.quantity }}</td>
                                        <td>{{ item.unit_of_measurement.name }}</td>
                                        <td align="right">{{ item.item_pricelist.price }}</td>
                                        <td align="right">{{ subtotalRow[index] | Decimal}}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-lg-4 col-sm-5"></div>
                                <div class="col-lg-4 col-sm-5 ml-auto">
                                    <table class="table table-clear">
                                        <tbody>
                                            <tr>
                                                <td align="left">
                                                <strong>Subtotal</strong>
                                                </td>
                                                <td align="right">{{ +(this.bills.amount) | Decimal }}</td>
                                            </tr>
                                            <tr>
                                                <td align="left">
                                                <strong>Tax</strong>
                                                </td>
                                                <td align="right">{{ this.bills.tax ? ((+this.bills.tax).toFixed(2)) : 0 }}</td>
                                            </tr>
                                            <tr>
                                                <td align="left">
                                                <strong>Total</strong>
                                                </td>
                                                <td align="right">
                                                <strong>{{ +(this.bills.amount - this.bills.tax) | Decimal }}</strong>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </div>
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
            </div>
        </div>
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
                billsItems: [],
                Yes: 'Yes',
                No: 'No'
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
                        console.log(res.data);
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
            }
        }

    };
</script>