<template>
  <b-form
    style="position: relative;"
    @submit.stop.prevent="onUpdate"
  >
    <b-form-group label="Name">
      <b-form-input
        v-model.trim="$v.form.name.$model"
        :state="validateState('name')"
        class="better-input"
        @input="onUpdate"
      />
      <validation-errors v-bind="{ id: 'name-input-feedback', validations: $v.form.name }" />
    </b-form-group>
    <b-form-group label="Address">
      <b-form-input
        v-model.trim="$v.form.address.$model"
        :state="validateState('address')"
        class="better-input"
        @input="onUpdate"
      />
      <validation-errors v-bind="{ id: 'address-input-feedback', validations: $v.form.address }" />
    </b-form-group>
    <b-form-row>
      <b-form-group label="City" class="mr-2">
        <b-form-input
          v-model="$v.form.city.$model"
          :state="validateState('city')"
          class="better-input"
          @input="onUpdate"
        />
        <validation-errors v-bind="{ id: 'city-input-feedback', validations: $v.form.city }" />
      </b-form-group>
      <b-form-group label="State" class="mr-2">
        <b-form-select
          v-model="$v.form.state.$model"
          :options="states"
          :state="validateState('state')"
          class="better-input"
          @input="onUpdate"
        />
      </b-form-group>
      <b-form-group label="Zip Code">
        <b-form-input
          v-model="$v.form.zip.$model"
          :state="validateState('zip')"
          type="number"
          class="better-input"
          @input="onUpdate"
        />
        <validation-errors v-bind="{ id: 'zip-feedback', validations: $v.form.zip }" />
      </b-form-group>
    </b-form-row>
    <b-form-row>
      <b-form-group label="Timezone" class="mr-2">
        <b-form-select
          v-model="form.timezone"
          :options="timezones"
          class="better-input"
          @input="onUpdate"
        />
      </b-form-group>
      <b-form-group label="Call Tracking" class="mr-2">
        <b-form-select
          v-model="form.callTracking"
          :options="callTrackings"
          class="better-input"
          @input="onUpdate"
        />
      </b-form-group>
      <b-form-group label="DA Approved Budget" class="mr-5">
        <b-input-group prepend="$">
          <b-form-input
            v-model="$v.form.budget.$model"
            :state="validateState('budget')"
            type="number"
            class="better-input"
            @input="onUpdate"
          />
          <validation-errors v-bind="{ id: 'budget-feedback', validations: $v.form.budget }" />
        </b-input-group>
      </b-form-group>
      <b-btn
        :id="`drop-${i}-btn`"
        variant="outline-tertiary"
        class="align-self-center"
        size="sm"
        @click="onDrop"
      >
        <b-icon-trash />
        Remove Location
      </b-btn>
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
      return {
        name: this.location.Name,
        address: this.location.Address__c,
        city: this.location.City__c,
        state: this.location.State_Province__c,
        zip: this.location.Zip_Postal_Code__c,
        budget: this.location.Digital_Advertising_Budget__c,
        timezone: this.location.timezone,
        callTracking: this.location.callTracking
      }
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
        minLength: minLength(5),
        maxLength: maxLength(255)
      },
      city: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(255)
      },
      state: {
        required
      },
      zip: {
        required,
        numeric,
        minLength: minLength(5)
      },
      budget: {
        required,
        minValue: minValue(0)
      }
    }
  },
  mounted() {
    this.$v.$touch()
    if (this.$v.form.$anyError) {
      this.onUpdate()
    }
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name]
      return $dirty ? !$error : null
    },
    onUpdate() {
      this.$emit('update-location', {
        i: this.i,
        location: this.form,
        isError: this.$v.form.$anyError
      })
    },
    onDrop() {
      this.$emit('drop-location', {
        i: this.i
      })
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
