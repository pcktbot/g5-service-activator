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
    checkColRules(rules, row, key) {
      return rules.every(rule => validator[rule.rule](row.data[key], rule.options) === rule.expected)
    },
    checkRowRules(keys, row) {
      return keys.every(key => this.rules[key] ? this.checkColRules(this.rules[key], row, key) : true)
    },
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
          if (!this.keysLength) {
            this.keysLength = keys.length
          }
          if (this.keysLength === keys.length) {
            this.checkRowRules(keys, row) ? this.keep.push(row.data) : this.review.push(row.data)
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
