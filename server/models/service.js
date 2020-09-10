const { INTEGER, STRING, DATEONLY, DECIMAL } = require('sequelize')

module.exports = (sequelize) => sequelize.define('service', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    store_id: {
      type: INTEGER
    },
    status_code: {
      type: INTEGER
    },
    type: {
      type: STRING
    },
    start_date: {
      type: DATEONLY
    },
    end_date: {
      type: DATEONLY
    },
    tracking_number: {
      type: STRING
    },
    yp_pub_date: {
      type: DATEONLY
    },
    book_name: {
      type: STRING(80)
    },
    tracking_purpose: {
      type: STRING(20)
    },
    budget: {
      type: DECIMAL(8, 2)
    },
    number_type : {
      type: STRING(40)
    },
    search_engine_id: {
      type: INTEGER(11)
    },
    old_billing_key_id: {
      type: INTEGER(11)
    },
    bill_method: {
      type: STRING(40)
    },
    parent_id: {
      type: INTEGER(11)
    },
    media_type_id: {
      type: INTEGER(12) 
    },
    name: {
      type: STRING
    },
    ad_info: {
      type: STRING
    },
    locale: {
      type: STRING
    },
    minutes: {
      type: INTEGER(11)
    },
    billing_key_id: {
      type: INTEGER(11)
    },
    comments_count : {
      type: INTEGER(11)
    },
    client_id : {
      type: INTEGER(11)
    },
    cached_channel : {
      type: STRING(80)
    },
    status_change : {
      type: STRING
    }
  })
