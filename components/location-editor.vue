<template>
  <b-form
    style="position: relative;"
    @submit.stop.prevent="onUpdate"
  >
    <b-form-group label="Name">
      <b-form-input
        v-model.trim="$v.form.Name.$model"
        :state="validateState('Name')"
        class="better-input"
      />
      <validation-errors v-bind="{ id: 'name-input-feedback', validations: $v.form.Name }" />
    </b-form-group>
    <b-form-group label="Address">
      <b-form-input
        v-model.trim="$v.form.Address__c.$model"
        :state="validateState('Address__c')"
        class="better-input"
      />
      <validation-errors v-bind="{ id: 'address-input-feedback', validations: $v.form.Address__c }" />
    </b-form-group>
    <b-form-row>
      <b-form-group label="City" class="mr-2">
        <b-form-input
          v-model="$v.form.City__c.$model"
          :state="validateState('City__c')"
          class="better-input"
        />
        <validation-errors v-bind="{ id: 'city-input-feedback', validations: $v.form.City__c }" />
      </b-form-group>
      <b-form-group label="State" class="mr-2">
        <b-form-select
          v-model="$v.form.State_Province__c.$model"
          :options="states"
          :state="validateState('State_Province__c')"
          class="better-input"
        />
      </b-form-group>
      <b-form-group label="Zip Code">
        <b-form-input
          v-model="$v.form.Zip_Postal_Code__c.$model"
          :state="validateState('Zip_Postal_Code__c')"
          type="number"
          class="better-input"
        />
        <validation-errors v-bind="{ id: 'zip-feedback', validations: $v.form.Zip_Postal_Code__c }" />
      </b-form-group>
    </b-form-row>
    <b-form-row>
      <b-form-group label="Timezone" class="mr-2">
        <b-form-select
          v-model="$v.form.timezone.$model"
          :options="timezones"
          :state="validateState('timezone')"
          class="better-input"
        />
        <b-form-invalid-feedback id="timezone-feedback">
          Please select a timezone.
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group label="Call Tracking" class="mr-2">
        <b-form-select
          v-model="$v.form.callTracking.$model"
          :options="callTrackings"
          :state="validateState('callTracking')"
          class="better-input"
        />
        <b-form-invalid-feedback id="call-tracking-feedback">
          Please select a call tracking package.
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group label="DA Approved Budget" class="mr-5">
        <b-input-group prepend="$">
          <b-form-input
            v-model="$v.form.Digital_Advertising_Budget__c.$model"
            :state="validateState('Digital_Advertising_Budget__c')"
            type="number"
            class="better-input"
          />
          <validation-errors v-bind="{ id: 'budget-feedback', validations: $v.form.Digital_Advertising_Budget__c }" />
        </b-input-group>
      </b-form-group>
      <b-btn-group size="sm" class="align-self-center">
        <b-btn
          :id="`approve-${i}-btn`"
          :disabled="$v.form.$anyError"
          variant="secondary"
          class="px-5"
          @click="onFinish"
        >
          <b-icon-check />
          Ready
        </b-btn>
        <b-btn
          :id="`drop-${i}-btn`"
          variant="outline-tertiary"
          @click="onDrop"
        >
          <b-icon-trash />
        </b-btn>
      </b-btn-group>
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
    i: {
      type: Number,
      default: 0
    },
    location: {
      type: Object,
      default() {
        return {
          Name: null,
          Digital_Advertising_Budget__c: null,
          Address__c: null,
          City__c: null,
          State_Province__c: null,
          Zip_Postal_Code__c: null,
          timezone: null,
          callTracking: null
        }
      }
    }
  },
  data() {
    return {
      callTrackings: [
        { text: 'Select an option', value: null },
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
      states: [
        { text: 'Select a state', value: null },
        'Alabama',
        'Alaska',
        'American Samoa',
        'Arizona',
        'Arkansas',
        'California',
        'Colorado',
        'Connecticut',
        'Delaware',
        'District of Columbia',
        'Federated States of Micronesia',
        'Florida',
        'Georgia',
        'Guam',
        'Hawaii',
        'Idaho',
        'Illinois',
        'Indiana',
        'Iowa',
        'Kansas',
        'Kentucky',
        'Louisiana',
        'Maine',
        'Marshall Islands',
        'Maryland',
        'Massachusetts',
        'Michigan',
        'Minnesota',
        'Mississippi',
        'Missouri',
        'Montana',
        'Nebraska',
        'Nevada',
        'New Hampshire',
        'New Jersey',
        'New Mexico',
        'New York',
        'North Carolina',
        'North Dakota',
        'Northern Mariana Islands',
        'Ohio',
        'Oklahoma',
        'Oregon',
        'Palau',
        'Pennsylvania',
        'Puerto Rico',
        'Rhode Island',
        'South Carolina',
        'South Dakota',
        'Tennessee',
        'Texas',
        'Utah',
        'Vermont',
        'Virgin Island',
        'Virginia',
        'Washington',
        'West Virginia',
        'Wisconsin',
        'Wyoming'
      ],
      timezones: [
        {
          text: 'Select a timezone',
          value: null
        },
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
      Name: {
        required,
        maxLength: maxLength(255)
      },
      Address__c: {
        required,
        maxLength: maxLength(255)
      },
      City__c: {
        required,
        maxLength: maxLength(255)
      },
      State_Province__c: {
        required
      },
      Zip_Postal_Code__c: {
        required,
        numeric,
        minLength: minLength(5),
        maxLength: maxLength(5)
      },
      Digital_Advertising_Budget__c: {
        required,
        minValue: minValue(0)
      },
      timezone: {
        required
      },
      callTracking: {
        required
      }
    }
  },
  mounted() {
    this.$v.$touch()
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name]
      return $dirty ? !$error : null
    },
    onFinish() {
      this.$emit('finish-location', {
        i: this.i,
        location: this.form
      })
    },
    onDrop() {
      this.$emit('drop-location', { i: this.i })
    }
  }
}
</script>

<style lang="scss">
.input-group-text {
  border-color: #339698;
  background-color: #82c9c9;
  color: #0c223c;
  border-radius: 0.75em;
}
.input-group > .form-control:not(:last-child) {
  border-top-right-radius: 0.75em;
  border-bottom-right-radius: 0.75em;
}
</style>
