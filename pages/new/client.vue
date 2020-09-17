<template>
  <div class="centered">
    <home-button />
    <b-card
      bg-variant="primary"
      text-variant="white"
      header-tag="h1"
      header-class="font-weight-bold border-0 text-center"
      class="better-card"
      style="min-width: 500px;"
    >
      <template v-slot:header>
        Let's Get That Client Created!
      </template>
      <b-form
        name="new-client"
        class="px-1"
        style="overflow-y: scroll;"
        @submit.stop.prevent="onSubmit"
      >
        <b-form-group v-bind="formGroup" label="Client Name">
          <b-form-input
            v-model="$v.form.name.$model"
            :state="validateState('name')"
            placeholder="Enter Client's Name"
            aria-describedby="client-name-feedback"
            class="better-input"
          />
          <validation-feedback
            :id="`client-name-feedback`"
            :validations="$v.form.name"
          />
        </b-form-group>
        <b-form-group v-bind="formGroup" label="Vertical">
          <b-form-select
            v-model="$v.form.vertical.$model"
            :options="verticals"
            class="better-input"
          />
        </b-form-group>
        <b-form-group v-bind="formGroup" label="Contact Signed Date">
          <b-form-datepicker
            v-model="$v.form.contractSignedDate.$model"
            :state="validateState('contractSignedDate')"
            today-button
            class="better-input"
            aria-describedby="contract-date-feedback"
          />
          <validation-feedback
            :id="`contract-date-feedback`"
            :validations="$v.form.contractSignedDate"
          />
        </b-form-group>
        <b-form-group v-bind="formGroup" label="Size">
          <b-form-select
            v-model="form.size"
            :options="sizes"
            class="better-input"
          />
        </b-form-group>
        <b-form-group v-bind="formGroup" label="Locations Available">
          <b-form-input
            v-model="$v.form.locationsAvailable.$model"
            :state="validateState('locationsAvailable')"
            :min="0"
            type="number"
            class="better-input"
          />
          <validation-feedback
            :id="`locations-available-feedback`"
            :validations="$v.form.locationsAvailable"
          />
        </b-form-group>
        <b-form-group v-bind="formGroup" label="Contract Type">
          <b-form-select
            v-model="$v.form.contractType.$model"
            :options="contractTypes"
            :state="validateState('contractType')"
            class="better-input"
          />
          <validation-feedback
            :id="`contract-type-feedback`"
            :validations="$v.form.contractType"
          />
        </b-form-group>
        <b-form-group v-bind="formGroup" label="DA Assignment">
          <b-form-select
            v-model="$v.form.daAssignment.$model"
            :options="daAssignments"
            :state="validateState('daAssignment')"
            class="better-input"
          />
          <validation-feedback
            :id="`da-assignment-feedback`"
            :validations="$v.form.daAssignment"
          />
        </b-form-group>
        <b-btn
          :disabled="$v.form.$anyError"
          class="better-btn"
          @click="onSubmit"
        >
          Save
          <b-icon-check-circle v-if="clientId" />
          <b-icon-arrow-clockwise v-else :animation="isBusy ? 'spin' : ''" />
        </b-btn>
        <b-btn
          v-if="clientId"
          :to="`/new/locations?clientId=${clientId}`"
          variant="outline-tertiary"
        >
          Add Some Locations
          <b-icon-arrow-right />
        </b-btn>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import {
  required,
  maxLength,
  minValue,
  numeric
} from 'vuelidate/lib/validators'
import HomeButton from '~/components/home-button'
import ValidationFeedback from '~/components/validation-errors'
export default {
  components: { HomeButton, ValidationFeedback },
  mixins: [validationMixin],
  async asyncData({ $axios }) {
    return {
      daAssignments: [
        { text: 'Select Someone', value: null },
        ...await $axios
          .$get('api/v1/users/da')
          .then(res => res.map(r => ({ text: r.name, value: r.id })))
          .catch(() => ({ text: 'There was an error.', value: 0 }))
      ]
    }
  },
  data() {
    return {
      isBusy: false,
      clientId: null,
      formGroup: {
        labelClass: ['text-white']
      },
      verticals: [
        { text: 'Select Vertical', value: null },
        { text: 'Multifamily', value: 6 },
        { text: 'Self Storage', value: 1 },
        { text: 'Senior Living', value: 5 },
        { text: 'Other', value: 0 }
      ],
      sizes: [
        { text: 'Select Size', value: null },
        'Standard',
        { text: 'SMB', value: 'NSO' }
      ],
      contractTypes: [
        { text: 'Select a Contract Type', value: null },
        'Annual',
        'Month to Month',
        'Other'
      ],
      form: {
        name: null,
        vertical: null,
        contractSignedDate: null,
        size: null,
        locationsAvailable: 0,
        contractType: null,
        daAssignment: null,
        riskLevel: 'Green'
      }
    }
  },
  validations: {
    form: {
      name: {
        required,
        maxLength: maxLength(255)
      },
      vertical: {
        required
      },
      contractSignedDate: {
        required
      },
      locationsAvailable: {
        required,
        numeric,
        minValue: minValue(0)
      },
      contractType: {
        required
      },
      daAssignment: {
        required
      }
    }
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name]
      return $dirty ? !$error : null
    },
    onReset() {
      this.name = null
      this.vertical = null
      this.contractSignedDate = null
      this.size = null
      this.locationsAvailable = 0
      this.contractType = null
      this.daAssignment = null
      this.$$nextTick(() => {
        this.$v.reset()
      })
    },
    onSubmit() {
      this.isBusy = true
      this.$v.form.$touch()
      if (this.$v.form.$anyError) {
        this.isBusy = false
        return
      }

      this.$axios
        .$post('/api/v1/clients', {
          client_name: this.form.name,
          branded_name: this.form.name,
          industry_id: this.form.vertical,
          contract_signed_date: this.form.contractSignedDate,
          locations_available: this.form.locationsAvailable,
          general_risk_status: this.form.riskLevel,
          contract_type: this.form.contractType,
          strategic_class: this.form.size,
          search_analyst_id: this.form.daAssignment
        })
        .then((res) => {
          this.clientId = res.id
        })
        .finally(() => {
          this.onReset()
          this.isBusy = false
        })
    }
  }
}
</script>
