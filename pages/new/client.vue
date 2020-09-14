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
import { required, minLength, minValue, numeric } from 'vuelidate/lib/validators'
import HomeButton from '~/components/home-button'
export default {
  components: { HomeButton },
  mixins: [validationMixin],
  data() {
    return {
      isBusy: true,
      formGroup: {
        labelClass: [
          'badge',
          'badge-primary-1',
          'w-50',
          'text-left',
          'text-white',
          'py-1',
          'pl-2',
          'ml-3'
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
      this.isBusy = !this.isBusy
      this.$axios
        .$post('', {
          // fields
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.better-card {
  border-radius: 0.5em;
  box-shadow: 0 0 2em rgba(12, 34, 60, 1.00),
              0 0.5em 5em rgba(30, 83, 83, 1.00);
}
.better-input {
  border: 2px solid #82c9c9;
  border-radius: 0.75em;
  background-color: #dee7ed;
  transition: all 200ms linear;
  &.is-invalid {
    border-color: #de0333;
  }
  &:focus {
    box-shadow: 0 0 0 2px #82c9c9,
                0 0.625em 0 0 #1e5353;
    border-color: #339698;
    background-color: #fff;
    transform: scale(1.05);
  }
}

.better-invalid {
  font-size: 90%;
  font-weight: 700;
  color: #e00033;
  text-align: right;
}
</style>
