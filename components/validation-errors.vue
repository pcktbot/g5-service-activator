<template>
  <b-form-invalid-feedback :id="id" class="better-invalid mt-3">
    {{ validations }}
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
    traverseValidations() {
      return 'Looks good'
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
