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
    parseCsv(file) {
      Papa.parse(file, {
        header: true,
        worker: true,
        step: (row) => {
          const keys = Object.keys(row.data)
          if (this.keysLength === null) {
            this.keysLength = keys.length
          }
          if (this.keysLength === keys.length) {
            for (let i = 0; i < keys.length; i++) {
              let result = true
              const key = keys[i]
              this.$emit('key', { key, rules: this.rules[key] })
              if (this.rules[key]) {
                result = this.rules[key].every((rule) => {
                  const test = validator[rule.rule](row.data[key], rule.options)
                  this.$emit('every', { rule, test, row: row.data })
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
        }
      })
    }
  }
}
