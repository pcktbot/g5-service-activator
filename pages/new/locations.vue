<template>
  <div class="centered" style="min-width: 85vw;">
    <home-button />
    <b-card
      bg-variant="primary"
      class="better-card"
      header-text-variant="white"
      no-body
      header-class="mb-0"
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
            track-by="id"
            placeholder="Search"
          />
        </b-input-group>
      </template>
      <b-card-body class="py-0 px-4" style="overflow: hidden;">
        <csv-file-upload v-if="showUpload" @on-parsed="onParsed" />
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
              class="text-white border-bottom border-secondary"
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
          <b-icon-check-circle v-if="isComplete" />
          <b-icon-arrow-clockwise v-else :animation="isBusy ? 'spin' : ''" />
        </b-btn>
      </template>
    </b-card>
  </div>
</template>

<script>
import VueMultiselect from 'vue-multiselect'
import StateLookup from '~/mixins/stateAbbr'
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
  mixins: [StateLookup],
  async asyncData({ query, $axios }) {
    const clients = await $axios.$get('api/v1/clients').catch(() => [])
    const client = query
      ? clients.find(c => c.id === Number(query.clientId))
      : null
    return {
      clients,
      client
    }
  },
  data() {
    return {
      locations: [],
      showUpload: true,
      isBusy: false,
      isComplete: false
    }
  },
  methods: {
    onParsed(res) {
      this.locations = res
      this.showUpload = false
    },
    onUpdate(evt) {
      this.locations.keep.push(evt.location)
      this.onDrop(evt)
    },
    onDrop(evt) {
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
        .$post(`/api/v1/clients/${this.client.id}/stores`, this.locations.keep.map(l => ({
          name: l.Name,
          client_approved_budget: l.Digital_Advertizing_Budget__c,
          client_approved_budget_effective_date: new Date(),
          street: l.Address__c,
          city: l.City__c,
          state: this.abbreviateState(l.State_Province__c),
          zip: l.Zip_Postal_Code__c,
          location_label: l.City__c,
          time_zone: l.timezone,
          call_plan_id: l.callTracking
        })))
        .then(() => {
          this.isComplete = true
        })
        .finally(() => {
          this.isBusy = false
        })
    }
  }
}
</script>

<style lang="scss">
$green: #339698;
$blue: #314e8b;
.scroll-container {
  max-height: 60vh;
  overflow-y: scroll;
  border-radius: 0.75em;
}
.multiselect__tags {
  border: 2px solid $green;
}
.multiselect__spinner:after,
.multiselect__spinner:before {
  border-top-color: $green;
}
.multiselect__tag,
.multiselect__option--highlight,
.multiselect__option--highlight:after {
  background: $green;
}
.multiselect__tag-icon:hover {
  background: $blue;
}
.multiselect__tag-icon:after {
  color:#b1c4d2;
}
.multiselect__option--selected.multiselect__option--highlight,
.multiselect__option--selected.multiselect__option--highlight:after,
.multiselect__option--group-selected.multiselect__option--highlight,
.multiselect__option--group-selected.multiselect__option--highlight:after {
  background: $blue;
}
</style>
