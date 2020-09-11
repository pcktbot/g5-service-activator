<template>
  <div>
    <b-form-file
      v-model="file"
      accept="text/csv"
      @input="parseCsv"
    >
      <template v-slot:file-name="{ names }">
        <b-badge variant="secondary">
          {{ names[0] }}
        </b-badge>
      </template>
    </b-form-file>
  </div>
</template>

<script>
import Papa from 'papaparse'
export default {
  data() {
    return {
      file: null
    }
  },
  methods: {
    parseCsv() {
      Papa.parse(this.file, {
        header: true,
        complete(res) {
          // const i = this.parsed.length
          // const headers = res.meta.fields
          // const locations = res.data.map()
          // send away
          this.$emit('parsed-locations', res)
        }
      })
    }
  }
}
</script>

<style lang="scss">
.custom-file-label {
  border: 3px dashed #82c9c9;
  &::after {
    border: 3px solid #339698;
    background-color: #339698;
    color: white;
    height: calc(100% + 6px);
    transform: translate(3px, -3px);
  }
}
</style>
