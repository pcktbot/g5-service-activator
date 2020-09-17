<template>
  <b-form-file
    v-model="file"
    accept="text/csv"
    @input="parseCsv(file)"
  >
    <template v-slot:file-name="{ names }">
      <b-badge variant="secondary" style="position: absolute;">
        {{ names[0] }}
      </b-badge>
    </template>
  </b-form-file>
</template>

<script>
import ParseValidate from '~/mixins/parseValidate'
export default {
  mixins: [ParseValidate],
  data() {
    return {
      file: null
    }
  }
}
</script>

<style lang="scss">
.custom-file-label {
  border: 3px solid #82c9c9;
  &::after {
    border: 3px solid #339698;
    background-color: #339698;
    color: white;
    height: calc(100% + 6px);
    transform: translate(3px, -3px);
  }
}
</style>
