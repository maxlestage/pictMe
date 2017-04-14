# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170414121237) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "hstore"
  enable_extension "unaccent"
  enable_extension "uuid-ossp"

  create_table "races", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.string   "name"
    t.string   "email_sender"
    t.string   "email_name"
    t.date     "date"
    t.string   "hashtag"
    t.string   "results_url"
    t.string   "sms_message"
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
    t.string   "raw_results_file_name"
    t.string   "raw_results_content_type"
    t.integer  "raw_results_file_size"
    t.datetime "raw_results_updated_at"
    t.string   "background_image_file_name"
    t.string   "background_image_content_type"
    t.integer  "background_image_file_size"
    t.datetime "background_image_updated_at"
    t.string   "template"
    t.datetime "widget_generated_at"
  end

  create_table "results", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.uuid     "race_id"
    t.string   "phone"
    t.string   "mail"
    t.integer  "rank"
    t.string   "name"
    t.string   "country"
    t.string   "bib"
    t.integer  "categ_rank"
    t.string   "categ"
    t.integer  "sex_rank"
    t.string   "sex"
    t.string   "time"
    t.string   "speed"
    t.string   "message"
    t.string   "race_detail"
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
    t.datetime "uploaded_at"
    t.datetime "diploma_generated_at"
    t.datetime "email_sent_at"
    t.datetime "sms_sent_at"
    t.index ["race_id"], name: "index_results_on_race_id", using: :btree
  end

  add_foreign_key "results", "races"
end
