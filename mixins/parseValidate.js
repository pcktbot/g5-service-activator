import Papa from 'papaparse'
import validator from 'validator'

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
      }
    }
  },
  methods: {
    checkColRules(rules, row, key) {
      return rules.every(rule => validator[rule.rule](row.data[key], rule.options) === rule.expected)
    },
    checkRowRules(keys, row) {
      return keys.every(key => this.rules[key] ? this.checkColRules(this.rules[key], row, key) : true)
    },
    parseCsv(file) {
      Papa.parse(file, {
        header: true,
        worker: true,
        step: (row) => {
          const keys = Object.keys(row.data)
          if (!this.keysLength) {
            this.keysLength = keys.length
          }
          if (this.keysLength === keys.length) {
            this.checkRowRules(keys, row) ? this.keep.push(row.data) : this.review.push(row.data)
          }
        }
      })
    }
  }
}
