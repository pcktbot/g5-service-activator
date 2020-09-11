<template>
  <div class="centered">
    Content
  </div>
</template>

<script>
import Papa from 'papaparse'
export default {
  data() {
    return {
      clientId: this.$route.query.clientId
    }
  },
  methods: {
    unparse() {
      Papa.unparse()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
