<template>
  <div class="centered">
    <home-button />
    <b-card
      bg-variant="primary"
      class="location-card"
      header="Let's Add Some Locations!"
      header-text-variant="white"
      header-tag="h1"
      header-class="font-weight-bold border-0"
    >
      <csv-file-upload />
    </b-card>
  </div>
</template>

<script>
import HomeButton from '~/components/home-button'
import CsvFileUpload from '~/components/csv-upload'
export default {
  components: {
    HomeButton,
    CsvFileUpload
  },
  async asyncData({ params, $axios }) {
    return {
      clients: await $axios.$get()
    }
  },
  data() {
    return {
      client: null
    }
  }
}
</script>

<style lang="scss">
.location-card {
  box-shadow: -0.75em -0.75em 0.75em 0.25em rgba(254, 184, 0, 0.5),
              0.75em 0.75em 0.75em 0.25em rgba(251, 0, 30, 0.5);
}
</style>
