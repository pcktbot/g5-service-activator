<template>
  <b-form @submit.stop.prevent="onUpdate">
    <b-form-group label="Name">
      <b-form-input
        v-model.trim="$v.form.name.$model"
        :state="validateState('name')"
      />
      <validation-errors v-bind="{ id: 'name-input-feedback', validations: $v.form.name }" />
    </b-form-group>
    <b-form-group label="Address">
      <b-form-input
        v-model.trim="$v.form.address.$model"
        :state="validateState('address')"
      />
      <validation-errors v-bind="{ id: 'address-input-feedback', validations: $v.form.address }" />
    </b-form-group>
    <b-form-row>
      <b-form-group label="City">
        <b-form-input
          v-model="$v.form.city.$model"
          :state="validateState('city')"
        />
        <validation-errors v-bind="{ id: 'city-input-feedback', validations: $v.form.city }" />
      </b-form-group>
      <b-form-group label="State">
        <b-form-select v-model="form.state" :options="states" />
      </b-form-group>
      <b-form-group label="Zip Code">
        <b-form-input
          v-model="$v.form.zip.$model"
          :state="validateState('zip')"
          type="number"
        />
        <validation-errors v-bind="{ id: 'zip-feedback', validations: $v.form.zip }" />
      </b-form-group>
    </b-form-row>
    <b-form-row>
      <b-form-group label="Timezone">
        <b-form-select v-model="form.timezone" :options="timezones" />
      </b-form-group>
      <b-form-group label="Call Tracking">
        <b-form-select v-model="form.callTracking" :options="callTrackings" />
      </b-form-group>
      <b-form-group label="DA Approved Budget">
        <b-input-group prepend="$">
          <b-form-input
            v-model="$v.form.budget.$model"
            :state="validateState('budget')"
            type="number"
          />
          <validation-errors v-bind="{ id: 'budget-feedback', validations: $v.form.budget }" />
        </b-input-group>
      </b-form-group>
    </b-form-row>
  </b-form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import {
  required,
  numeric,
  minLength,
  maxLength,
  minValue
} from 'vuelidate/lib/validators'
import ValidationErrors from '~/components/validation-errors'
export default {
  components: { ValidationErrors },
  mixins: [validationMixin],
  props: {
    location: {
      type: Object,
      default() {
        return {
          name: null,
          budget: null,
          address: null,
          city: null,
          state: null,
          zip: null,
          timezone: null,
          callTracking: null
        }
      }
    }
  },
  data() {
    return {
      callTrackings: [
        { text: 'None', value: 1 },
        { text: '1 Number/Location', value: 2 },
        { text: '5 Numbers/Location', value: 3 },
        { text: 'Unlimited', value: 4 },
        { text: 'Unlimited 200', value: 6 },
        { text: 'Unlimited 2500', value: 8 },
        { text: 'Default 200', value: 9 },
        { text: 'Default 2500', value: 11 },
        { text: 'Default 0', value: 12 }
      ],
      states: ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'],
      timezones: [
        {
          text: 'Alaska Standard Time',
          value: 'Alaska'
        },
        {
          text: 'Central Standard Time (US & Canada)',
          value: 'Central Time (US & Canada)'
        },
        {
          text: 'Eastern Standard Time (US & Canada)',
          value: 'Eastern Time (US & Canada)'
        },
        {
          text: 'Hawaii-Aleutian Standard Time',
          value: 'Hawaii'
        },
        {
          text: 'Mountain Standard Time (US & Canada)',
          value: 'Mountain Time (US & Canada)'
        },
        {
          text: 'Pacific Standard Time (US & Canada)',
          value: 'Pacific Time (US & Canada)'
        }
      ]
    }
  },
  computed: {
    form() {
      return this.location
    }
  },
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(255)
      },
      address: {
        required,
        minLength: minLength(5)
      },
      city: {
        required,
        minLength: minLength(3)
      },
      zip: {
        required,
        numeric,
        minValue: minValue(0),
        minLength: minLength(5),
        maxLength: maxLength(5)
      },
      budget: {
        required,
        numeric,
        minValue: minValue(0)
      }
    }
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name]
      return $dirty ? !$error : null
    },
    onUpdate() {}
  }
}
</script>

<style>

</style>
