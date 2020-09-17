<template>
  <div class="centered" style="min-width: 85vw;">
    <home-button />
    <b-card
      bg-variant="primary"
      class="better-card"
      header-text-variant="white"
      footer-class="border-0"
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
            placeholder="Search"
          />
        </b-input-group>
      </template>
      <b-card-body class="py-0 px-2" style="overflow: hidden;">
        <csv-file-upload @on-parsed="onParsed" />
        <b-card
          v-if="locations.keep"
          :bg-variant="locations.review.length > 0 ? 'tertiary' : 'secondary'"
          class="mt-2 font-weight-bold"
        >
          <b-icon-exclamation-triangle />
          You have {{ locations.keep.length }} locations ready to upload and {{ locations.review.length }} locations you need to review.
        </b-card>
        <div v-if="locations.review" class="mt-2 scroll-container border border-secondary">
          <b-list-group>
            <b-list-group-item
              v-for="(location, i) in locations.review"
              :key="`location-${i}`"
              :class="i % 2 === 0 ? 'bg-primary' : 'bg-primary-1'"
              class="text-white"
            >
              <location-editor
                v-bind="{ i, location }"
                v-on="{ 'drop-location': onDrop, 'finish-location': onUpdate }"
              />
            </b-list-group-item>
          </b-list-group>
        </div>
      </b-card-body>
      <template v-slot:footer>
        <b-btn
          :disabled="showUpload"
          class="better-btn"
          @click="onSubmit"
        >
          Save
          <b-icon-arrow-clockwise :animation="isBusy ? 'spin' : ''" />
        </b-btn>
        <b-btn variant="outline-tertiary">
          Add Services
          <b-icon-arrow-right />
        </b-btn>
      </template>
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
      this.locations = res
      this.showUpload = false
    },
    onUpdate(evt) {
      this.$emit('received-update', evt)
      this.locations.keep.push(evt.location)
      this.onDrop(evt)
    },
    onDrop(evt) {
      this.$emit('received-drop', evt)
      this.locations.review.splice(evt.i, 1)
    },
    onSubmit() {
      this.isBusy = true
      if (this.locations.review.length > 0) {
        this.isBusy = false
        return
      }
      if (!this.client) {
        this.isBusy = false
        return
      }
      this.$axios
        .$post(`/api/v1/clients/${this.client.id}/stores`, this.locations)
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
