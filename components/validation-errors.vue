<template>
  <b-form-invalid-feedback :id="id" class="better-invalid mt-3">
    <div
      v-for="rule in rules"
      :key="rule"
    >
      {{ validations[rule] ? '' : text(rule) }}
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
    text(rule) {
      if (rule === 'required') {
        return 'This field cannot be left blank.'
      } else if (rule === 'minLength') {
        return 'This field too short.'
      } else if (rule === 'minValue') {
        return 'This field value cannot be a negative value.'
      } else if (rule === 'maxLength') {
        return 'This field value is too long.'
      } else if (rule === 'maxValue') {
        return 'This field value is too large.'
      } else if (rule === 'numeric') {
        return 'This field value must be a number.'
      } else {
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
