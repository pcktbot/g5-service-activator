<template>
  <div>
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
  </div>
</template>

<script>
// import Papa from 'papaparse'
import zipcodes from '~/static/zipcodes.json'
import ParseValidate from '~/mixins/parseValidate.js'
export default {
  mixins: [ParseValidate],
  data() {
    return {
      file: null,
      timezoneMap: Object.freeze({
        0: 'Eastern Time (US & Canada)',
        1: 'Central Time (US & Canada)',
        2: 'Mountain Time (US & Canada)',
        3: 'Pacific Time (US & Canada)',
        4: 'Central Time (US & Canada)',
        5: 'Central Time (US & Canada)',
        6: 'Central Time (US & Canada)',
        7: 'Mountain Time (US & Canada)',
        8: 'Mountain Time (US & Canada)',
        9: 'Alaska',
        10: 'Hawaii',
        11: 'Central Time (US & Canada)',
        12: 'Central Time (US & Canada)',
        13: 'Central Time (US & Canada)',
        14: 'Central Time (US & Canada)',
        15: 'Central Time (US & Canada)',
        16: 'Central Time (US & Canada)',
        17: 'Central Time (US & Canada)',
        18: 'America/Menominee',
        19: 'America/Shiprock',
        20: 'Alaska',
        21: 'Alaska',
        22: 'Central Time (US & Canada)',
        23: 'Central Time (US & Canada)',
        24: 'America/Yakutat'
      })
    }
  },
  methods: {
    lookup(zipcode) {
      if (Object.prototype.hasOwnProperty.call(zipcodes, zipcode)) {
        const timezoneIndex = zipcodes[zipcode]
        if (Object.prototype.hasOwnProperty.call(this.timezoneMap, timezoneIndex)) {
          return this.timezoneMap[timezoneIndex]
        }
      }
      return null
    }
  //   parseCsv() {
  //     Papa.parse(this.file, {
  //       header: true,
  //       dynamicTyping: true,
  //       worker: true,
  //       complete: (res) => {
  //         const parsed = res.data.map((row) => {
  //           return {
  //             name: row.Name,
  //             budget: row.Digital_Advertising_Budget__c,
  //             address: row.Address__c,
  //             city: row.City__c,
  //             state: row.State_Province__c,
  //             zip: row.Zip_Postal_Code__c,
  //             timezone: this.lookup(row.Zip_Postal_Code__c),
  //             callTracking: null,
  //             isError: false
  //           }
  //         })
  //         this.$emit('on-parsed', parsed)
  //       }
  //     })
  //   }
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
