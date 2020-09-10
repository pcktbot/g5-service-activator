const { INTEGER, STRING, JSONB, BOOLEAN, DATEONLY, TEXT, DECIMAL, DATE } = require('sequelize')

module.exports = (sequelize) => sequelize.define('client', {
    id: {
      type: INTEGER(11),
      primaryKey: true
    },
    industry_id: {
      type: INTEGER
    },
    branded_name: {
      type: STRING(80)
    },
    status_code: {
      type: INTEGER(11)
    },
    logo_file_name: {
      type: STRING(100)
    },
    advertising_start_date: {
      type: DATEONLY
    },
    advertising_end_date: {
      type: DATEONLY
    },
    street: {
      type: STRING
    },
    city: {
      type: STRING(100)
    },
    state: {
      type: STRING(2)
    },
    zip: {
      type: STRING(10)
    },
    url : {
      type: STRING
    },
    alt_url: {
      type: STRING
    },
    indextools_id: {
      type: STRING(100)
    },
    created_on: {
      type: DATE
    },
    updated_on: {
      type: DATE
    },
    fax_number: {
      type: STRING(20)
    },
    development_url: {
      type: STRING(100)
    },
    photo_width: {
      type: INTEGER(11)
    },
    photo_height: {
      type: INTEGER(11)
    },
    platform_version: {
      type: STRING(20)
    },
    google_analytics_id: {
      type: STRING(100)
    },
    google_conversion_id : {
      type: STRING(100)
    },
    website_golive : {
      type: DATEONLY
    },
    google_verification_id : {
      type: STRING(100)
    },
    contact_email : {
      type: STRING
    },
    client_name : {
      type: STRING(80)
    },
    zip_search_radius : {
      type: INTEGER(11)
    },
    display_store_branded_name : {
      type: BOOLEAN
    },
    preferences : {
      type: INTEGER(11)
    },
    marketing_analyst_id : {
      type: INTEGER(11)
    },
    search_analyst_id : {
      type: INTEGER(11)
    },
    logo_content_type : {
      type: STRING
    },
    custom_css : {
      type: STRING
    },
    seo_specialist_id : {
      type: INTEGER(11)
    },
    google_cse_id : {
      type: STRING
    },
    organization_id : {
      type: INTEGER(11)
    },
    default_call_plan_id : {
      type: INTEGER(11)
    },
    mobile_plan : {
      type: STRING
    },
    contract_signed_date : {
      type: DATEONLY
    },
    kickoff_date : {
      type: DATEONLY
    },
    project_manager_user_id : {
      type: INTEGER(11)
    },
    page_builder_user_id : {
      type: INTEGER(11)
    },
    data_coordinator_user_id : {
      type: INTEGER(11)
    },
    quality_assurance_user_id : {
      type: INTEGER(11)
    },
    web_developer_user_id : {
      type: INTEGER(11)
    },
    basecamp_project_id : {
      type: INTEGER(11)
    },
    project_name : {
      type: STRING
    },
    project_type : {
      type: STRING
    },
    industry_sub_type : {
      type: STRING
    },
    pre_basecamp : {
      type: BOOLEAN
    },
    mobile_logo_file_name : {
      type: STRING
    },
    mobile_logo_content_type : {
      type: STRING
    },
    mobile_logo_updated_at : {
      type: DATE
    },
    mobile_logo_file_size : {
      type: INTEGER(11)
    },
    executive_sponsor_user_id : {
      type: INTEGER(11)
    },
    general_risk_status : {
      type: STRING
    },
    strategic_class : {
      type: STRING
    },
    contract_type : {
      type: STRING
    },
    contract_start_date : {
      type: DATEONLY
    },
    locations_available : {
      type: INTEGER(11)
    },
    settings : {
      type: TEXT
    },
    netsuite_id : {
      type: INTEGER(11)
    },
    bing_conversion_id : {
      type: STRING
    },
    bing_lead_conversion_id : {
      type: STRING
    },
    bing_reservation_conversion_id : {
      type: STRING
    },
    fb_pixel : {
      type: STRING
    },
    urn : {
      type: STRING
    },
    corporate_location_urn : {
      type: STRING
    },
    replyto_email : {
      type: STRING
    },
    hub_corporate_status : {
      type: STRING
    }
  }, { timestamps: false })
