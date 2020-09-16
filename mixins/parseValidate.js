import Papa from 'papaparse'
import validator from 'validator'
import zipcodes from '~/static/zipcodes.json'

export default {
  data() {
    return {
      keep: [],
      review: [],
      keysLength: null,
      rules: {
        Name: [
          {
            rule: 'isEmpty',
            expected: false,
            options: { ignore_whitespace: false }
          }
        ],
        Zip_Postal_Code__c: [
          {
            rule: 'isEmpty',
            expected: false,
            options: { ignore_whitespace: false }
          },
          {
            rule: 'isLength',
            expected: true,
            options: { min: 5, max: 5 }
          }
        ]
      },
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
    },
    parseCsv(file) {
      Papa.parse(file, {
        header: true,
        worker: true,
        step: (row) => {
          row.data.timezone = this.lookup(row.data.Zip_Postal_Code__c)
          row.data.callTracking = null
          const keys = Object.keys(row.data)
          if (this.keysLength === null) {
            this.keysLength = keys.length
          }
          if (this.keysLength === keys.length) {
            for (let i = 0; i < keys.length; i++) {
              let result = true
              const key = keys[i]
              if (this.rules[key]) {
                result = this.rules[key].every((rule) => {
                  const test = validator[rule.rule](row.data[key], rule.options)
                  return test === rule.expected
                })
                if (!result) {
                  this.review.push(row.data)
                  break
                }
              }
              if (result) {
                this.keep.push(row.data)
              }
            }
          }
        },
        complete: () => {
          this.$emit('on-parsed', {
            keep: this.keep,
            review: this.review
          })
        }
      })
    }
  }
}
