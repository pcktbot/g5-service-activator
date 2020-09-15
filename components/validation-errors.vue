<template>
  <b-form-invalid-feedback :id="id" class="better-invalid mt-3">
    <div
      v-for="rule in rules"
      :key="rule"
    >
      {{ validations[rule] }}
    </div>
  </b-form-invalid-feedback>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: 'input-name'
    },
    validations: {
      type: Object,
      default() {
        return {
          $model: '',
          required: true,
          numeric: false
        }
      }
    }
  },
  computed: {
    rules() {
      return Object.keys(this.validations.$params)
    }
  },
  methods: {
    traverseValidations(rule) {
      switch (rule) {
        case 'required':
          return 'This field cannot be left blank.'
        case 'minLength':
          return 'This field value is too short.'
        case 'minValue':
          return 'This field value cannot be a negative value.'
        case 'maxLength':
          return 'This field value is too long.'
        case 'maxValue':
          return 'This field value is too large.'
        case 'numeric':
          return 'This field value must be a number.'
        default:
          return ''
      }
    }
  }
}
</script>

<style>
.better-invalid {
  font-size: 90%;
  font-weight: 700;
  color: #e00033;
  text-align: right;
}
</style>
