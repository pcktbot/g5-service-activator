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
            v-model="$v.form.client.$model"
            :options="clients"
            :state="validateState('client')"
            :custom-label="c => c.branded_name ? c.branded_name : c.name"
            placeholder="Search"
          />
        </b-input-group>
      </template>
      <b-card-body class="py-0 px-2" style="overflow: hidden;">
        <csv-file-upload @on-parsed="onParsed" />
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
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import HomeButton from '~/components/home-button'
import CsvFileUpload from '~/components/csv-upload'
// import LocationEditor from '~/components/location-editor'
export default {
  components: {
    // LocationEditor,
    VueMultiselect,
    HomeButton,
    CsvFileUpload
  },
  mixins: [validationMixin],
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
  validations: {
    form: {
      client: {
        required
      }
    }
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name]
      return $dirty ? !$error : null
    },
    onParsed(res) {
      this.locations = res
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
