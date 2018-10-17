<template>
    <div>
        Overview
    </div>
</template>

<script>
    export default {
        mounted () {
            if (this.$store.state.corporation_id == null || undefined ) {
                this.$router.push({ name: 'corporations.select' })
            }
        }
     }
</script>
