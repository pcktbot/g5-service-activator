<template>
  <div class="centered" style="min-width: 85vw;">
    <home-button />
    <b-card
      bg-variant="primary"
      class="better-card"
      header-text-variant="white"
    >
      <template v-slot:header>
        <h2 class="text-center font-weight-bold border-0">
          Let's Upload Some Locations!
        </h2>
        <b-input-group
          prepend="Select a Client"
          class="flex-nowrap bg-primary text-white"
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
        <div class="scroll-container border border-secondary">
          <b-list-group v-if="locations.length > 0" flush>
            <b-list-group-item
              v-for="(location, i) in locations"
              :key="`location-${i}`"
              :class="location.isError ? 'tertiary' : i % 2 === 0 ? 'bg-primary-2' : 'bg-primary'"
              class="text-white border-bottom border-secondary"
            >
              <location-editor
                v-bind="{ location, i }"
                @drop-location="onDrop"
                @update-location="onUpdate"
              />
              {{ location.isError }}
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
      this.locations = res.data.map(r => ({ ...r, isError: false }))
      this.showUpload = false
    },
    onUpdate(evt) {
      // update this.locations
      this.$emit('received-update', evt)
      this.locations[evt.i] = evt.location
    },
    onDrop(evt) {
      this.$emit('received-drop', evt)
      this.locations.splice(evt.i, 1)
    },
    onSubmit() {
      this.isBusy = true
      const anyError = this.locations.filter(l => !l.isError)
      if (anyError.length > 0) {
        this.isBusy = false
        return
      }
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
  border-radius: 0.75em;
}
.multiselect__tags {
  border: 2px solid #339698;
}
</style>
