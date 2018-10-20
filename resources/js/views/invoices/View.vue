<template>
    <div>
        <div class="card">
            <div class="card-header">
                {{componentVal}} / View {{componentVal}}
            </div>
            <div class="card-body">
                <div v-if="ifReady">
                    <fieldset>
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" class="form-control" v-model="bill.name" id="name" readonly>
                        </div>
                        <div class="form-group">
                            <label for="description">Description</label>
                            <textarea class="form-control" v-model="bill.description" id="description" readonly></textarea>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>bill Type</label>
                                    <input type="text" class="form-control" v-model="bill.name" id="name" readonly>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>bill Classification</label>
                                    <input type="text" class="form-control" v-model="bill.classification_type.name" id="name" readonly>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="card-body">
                            <table class="table table-hover table-sm">
                                <thead>
                                    <tr>
                                        <th scope="col">Conversions</th>
                                    </tr>
                                </thead>
                                <tbody v-if="bills">
                                    <tr :key="id" v-for="{ id, name } in bills">
                                        <td>{{ id }}</td>
                                        <td>{{ name }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div> -->
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Purchase Unit</label>
                                    <input type="text" class="form-control" v-model="bill.purchase_uom.name" id="name" readonly>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Default Unit</label>
                                    <input type="text" class="form-control" v-model="bill.default_uom.name" id="name" readonly>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Purchase Price</label>
                                    <input type="text" class="form-control" v-model="bill.purchase_price" id="name" readonly>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Asset Account</label>
                                    <input type="text" class="form-control" v-model="bill.asset_account.name" id="name" readonly>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Cost of Goods Sold Account</label>
                                    <input type="text" class="form-control" v-model="bill.cogs_account.name" id="name" readonly>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Expense Account</label>
                                    <input type="text" class="form-control" v-model="bill.expense_account.name" id="name" readonly>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Sales Account</label>
                                    <input type="text" class="form-control" v-model="bill.sales_account.name" id="name" readonly>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <button type="button" class="btn btn-info btn-sm" @click.prevent="viewItems">Back</button>
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
      componentVal: "bill",
      ifReady: false,
      accountType: "",
      bill: [],
      classificationType: {}
    };
  },

  mounted() {
    this.getItem();
  },

  methods: {
    getItem() {
      new Promise((resolve, reject) => {
        axios.get("/api/bills/" + this.$route.params.id).then(res => {
          console.log(res);
          this.ifReady = true;
          this.bill = res.data.bill;
          if (!res.data.response) {
            return;
          }
          resolve();
        });
      });
    },
    viewItems() {
      this.$router.push({
        name: "bills.index"
      });
    }
  },

  computed: {
    // Add ES6 methods here that needs caching
  }
};
</script>
