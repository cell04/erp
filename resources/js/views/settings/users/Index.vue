<template>
    <div class="contianer">
        <div class="card my-4">
            <ul class="nav nav-pills nav-justified">
                <li class="nav-item bg-white">
                    <router-link class="nav-link p-3" :to="{ name: 'settings.index' }">
                        System
                    </router-link>
                </li>
                <li class="nav-item bg-white">
                    <router-link class="nav-link active p-3 " :to="{ name: 'settings.users' }">
                        Users
                    </router-link>
                </li>
                <li class="nav-item bg-white">
                    <router-link class="nav-link p-3" :to="{ name: 'settings.units.index' }">
                        Unit of Measurements
                    </router-link>
                </li>
                <li class="nav-item bg-white">
                    <router-link class="nav-link p-3" :to="{ name: 'settings.conversions' }">
                        Conversions
                    </router-link>
                </li>
                <li class="nav-item bg-white">
                    <router-link class="nav-link p-3 " :to="{ name: 'settings.paymentTerms' }">
                        Payment Terms
                    </router-link>
                </li>
            </ul>
        </div>


        <div class="card">
            <div class="card-header">
                List of Users
                <button type="button" class="btn btn-primary float-right" data-toggle="modal" data-target="#modal">+ New User</button>
            </div>
            <div class="card-body">
                Test
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">New User</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                   <form>
                        <div class="form-group">
                            <label>Email address</label>
                            <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="Enter email">
                            <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                        </div>
                        <div class="form-group">
                            <label>Name</label>
                            <input type="name" class="form-control" placeholder="Password">
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input type="password" class="form-control" placeholder="Password">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save User</button>
                </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
   methods: {
    showCreateModal () {

      this.$refs.sample.dialogFormVisible = true
    }
  }
}
</script>
