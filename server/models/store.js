const { INTEGER, STRING, JSONB, BOOLEAN, DATEONLY, TEXT, DECIMAL, DATE } = require('sequelize')

module.exports = (sequelize) => {
  const annotation = sequelize.define('store', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    client_id: {
      type: INTEGER
    },
    position: {
      type: INTEGER
    },
    type: {
      type: STRING
    },
    name: {
      type: STRING(80)
    },
    branded_name: {
      type: STRING(80)
    },
    advertising_start_date: {
      type: DATEONLY
    },
    advertising_end_date: {
      type: DATEONLY
    },
    logo_file_name: {
      type: STRING(100)
    },
    email: {
      type: TEXT
    },
    street: {
      type: STRING
    },
    city : {
      type: STRING(100)
    },
    state: {
      type: STRING(2)
    },
    zip: {
      type: STRING
    },
    telephone_number: {
      type: STRING(20)
    },
    marketing_number: {
      type: STRING(20)
    },
    latitude: {
      type: DECIMAL(12, 8) 
    },
    longitude: {
      type: DECIMAL(12, 8) 
    },
    magnification: {
      type: INTEGER(11)
    },
    created_on: {
      type: DATE
    },
    updated_on: {
      type: DATE
    },
    formerly_name: {
      type: STRING
    },
    remote_store_url : {
      type: STRING
    },
    legacy_url : {
      type: STRING
    },
    website_golive : {
      type: DATE
    },
    priority : {
      type: INTEGER(11)
    },
    special_id : {
      type: INTEGER(11)
    },
    secondary_email : {
      type: TEXT
    },
    fax_number : {
      type: STRING(20)
    },
    parent_client_id : {
      type: INTEGER(11)
    },
    report_area_id : {
      type: INTEGER(11)
    },
    report_region_id : {
      type: INTEGER(11)
    },
    show_on_website : {
      type: BOOLEAN
    },
    active_ppc_service : {
      type: BOOLEAN
    },
    active_seo_service : {
      type: BOOLEAN
    },
    location_label : {
      type: STRING(100)
    },
    logo_content_type : {
      type: STRING
    },
    slug : {
      type: STRING
    },
    time_zone : {
      type: STRING(80)
    },
    logo_updated_at : {
      type: DATE
    },
    logo_file_size : {
      type: INTEGER(11)
    },
    facility_page_link : {
      type: STRING
    },
    thumbnail_link : {
      type: STRING
    },
    keyword_text : {
      type: STRING(40)
    },
    store_type_text : {
      type: STRING(40)
    },
    client_site_id : {
      type: STRING(255)
    },
    comments_count : {
      type: INTEGER(11)
    },
    created_at : {
      type: DATE
    },
    updated_at : {
      type: DATE
    },
    seo_verified : {
      type: BOOLEAN
    },
    call_plan_id : {
      type: INTEGER(11)
    },
    mobile_special_id : {
      type: INTEGER(11)
    },
    google_conversion_label : {
      type: STRING
    },
    verified_address : {
      type: INTEGER(11)
    },
    google_plus_id : {
      type: STRING
    },
    location_phone_number : {
      type: STRING(20)
    },
    location_uid : {
      type: STRING
    },
    location_urn : {
      type: STRING
    },
    hub_status : {
      type: STRING
    }
  })
  return annotation
}
