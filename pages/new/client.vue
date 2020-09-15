<template>
  <div class="centered">
    <home-button />
    <b-card
      bg-variant="primary"
      text-variant="white"
      header-tag="h1"
      header-class="font-weight-bold border-0"
      class="better-card"
      style="min-width: 500px;"
    >
      <template v-slot:header>
        Let's Get That Client Created!
      </template>
      <b-form
        name="new-client"
        @submit.stop.prevent="onSubmit"
        @reset="onReset"
      >
        <b-form-group v-bind="formGroup" label="Client Name">
          <b-form-input
            v-model="$v.form.name.$model"
            :state="validateState('name')"
            placeholder="Enter Client's Name"
            aria-describedby="client-name-feedback"
            autofocus
            class="better-input"
          />
          <b-form-invalid-feedback id="client-name-feedback" class="better-invalid mt-3">
            Client Name must be at least 5 characters.
          </b-form-invalid-feedback>
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
          <b-form-invalid-feedback id="contract-date-feedback" class="better-invalid mt-3">
            This cannot be left blank.
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group v-bind="formGroup" label="Size (Premier)">
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
          <b-form-invalid-feedback id="locations-available-feedback" class="better-invalid mt-3">
            This cannot be left blank or less than zero.
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group v-bind="formGroup" label="Contract Type">
          <b-form-select
            v-model="$v.form.contractType.$model"
            :options="contractTypes"
            :state="validateState('contractType')"
            class="better-input"
          />
          <b-form-invalid-feedback id="contract-type-feedback" class="better-invalid mt-3">
            This cannot be left blank.
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group v-bind="formGroup" label="DA Assignment">
          <b-form-select
            v-model="$v.form.daAssignment.$model"
            :options="daAssignments"
            :state="validateState('daAssignment')"
            class="better-input"
          />
          <b-form-invalid-feedback id="da-assignment-feedback" class="better-invalid mt-3">
            This cannot be left blank.
          </b-form-invalid-feedback>
        </b-form-group>

        <b-btn class="better-btn" @click="onSubmit">
          Save
          <b-icon-arrow-clockwise :animation="isBusy ? 'spin' : ''" />
        </b-btn>
        <b-btn
          v-if="isBusy"
          to="/new/locations"
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
  minLength,
  minValue,
  numeric
} from 'vuelidate/lib/validators'
import HomeButton from '~/components/home-button'
export default {
  components: { HomeButton },
  mixins: [validationMixin],
  data() {
    return {
      isBusy: true,
      formGroup: {
        labelClass: [
          // 'badge',
          // 'badge-primary-1',
          // 'w-50',
          // 'text-left',
          'text-white'
          // 'py-1',
          // 'pl-2',
          // 'ml-3'
        ]
      },
      verticals: [
        'Multifamily',
        'Self Storage',
        'Senior Living'
      ],
      sizes: [
        'Standard',
        'SMB'
      ],
      contractTypes: [
        { text: 'Select a Contract Type', value: null },
        'Annual',
        'Month to Month',
        'Other'
      ],
      daAssignments: [
        { text: 'Select Someone', value: null },
        { text: 'Adam Gorecki', value: 13959 }
      ],
      form: {
        name: null,
        brandedName: null,
        vertical: 'Multifamily',
        contractSignedDate: null,
        size: 'Standard',
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
        minLength: minLength(5)
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
          branded_name: this.form.brandedName ? this.form.brandedName : this.form.name,
          industry_id: 6,
          contract_signed_date: this.form.contractSignedDate,
          locations_available: this.form.locationsAvailable,
          general_risk_status: 'Green',
          contract_type: this.form.contractType,
          strategic_class: this.form.size,
          search_analyst_id: 13959
          // fields
        })
        .finally(() => {
          this.isBusy = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.better-invalid {
  font-size: 90%;
  font-weight: 700;
  color: #e00033;
  text-align: right;
}
</style>
