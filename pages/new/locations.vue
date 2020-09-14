<template>
  <div class="centered" style="min-width: 85vw;">
    <home-button />
    <b-card
      bg-variant="primary"
      class="location-card"
      header-text-variant="white"
      header-class="font-weight-bold border-0"
    >
      <template v-slot:header>
        <h2 class="text-center">
          Let's Add Some Locations!
        </h2>
        <b-input-group
          prepend="Select a Client"
          class="flex-nowrap"
          prepend-class="bg-primary text-white"
        >
          <vue-multiselect
            v-model="client"
            :options="clients"
            :custom-label="c => c.branded_name ? c.branded_name : c.name"
            placeholder="Select Option"
          />
        </b-input-group>
      </template>
      <b-card-body class="py-0 px-2" style="overflow: hidden;">
        <csv-file-upload v-show="showUpload" @on-parsed="onParsed" />
        <div class="scroll-container">
          <b-list-group v-if="locations.length > 0" flush>
            <b-list-group-item
              v-for="(location, i) in locations"
              :key="`location-${i}`"
              :class="i % 2 === 0 ? 'bg-primary' : 'bg-primary-1'"
              class="text-white"
            >
              <location-editor :location="location" />
            </b-list-group-item>
          </b-list-group>
        </div>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import VueMultiselect from 'vue-multiselect'
import HomeButton from '~/components/home-button'
import CsvFileUpload from '~/components/csv-upload'
import LocationEditor from '~/components/location-editor'
export default {
  components: {
    LocationEditor,
    VueMultiselect,
    HomeButton,
    CsvFileUpload
  },
  async asyncData({ $axios }) {
    return {
      clients: await $axios.$get('api/v1/clients')
    }
  },
  data() {
    return {
      client: null,
      locations: [],
      showUpload: true,
      isBusy: false
    }
  },
  methods: {
    onParsed(res) {
      this.locations = res.data
      this.showUpload = false
    },
    onUpdate(evt) {
      // update this.locations
    },
    onSubmit() {
      this.isBusy = true
      // this.locations is an Array of locations
      this.$axios
        .$post('', { ...this.locations })
        .finally(() => {
          this.isBusy = false
        })
    }
  }
}
</script>

<style lang="scss">
.scroll-container {
  max-height: 60vh;
  overflow-y: scroll;
}
.location-card {
  box-shadow: -0.75em -0.75em 0.75em 0.25em rgba(254, 184, 0, 0.5),
              0.75em 0.75em 0.75em 0.25em rgba(251, 0, 30, 0.5);
}
</style>
