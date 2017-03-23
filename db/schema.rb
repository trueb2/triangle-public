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

ActiveRecord::Schema.define(version: 20170112154740) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "brothers", force: :cascade do |t|
    t.string   "first"
    t.string   "middle"
    t.string   "last"
    t.string   "major"
    t.string   "pledge_class"
    t.string   "city"
    t.string   "state"
    t.string   "phone"
    t.string   "email"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.integer  "user_id"
    t.index ["user_id"], name: "index_brothers_on_user_id", using: :btree
  end

  create_table "brothers_semesters", force: :cascade do |t|
    t.integer "brother_id"
    t.integer "semester_id"
    t.index ["brother_id"], name: "index_brothers_semesters_on_brother_id", using: :btree
    t.index ["semester_id"], name: "index_brothers_semesters_on_semester_id", using: :btree
  end

  create_table "events", force: :cascade do |t|
    t.string   "short"
    t.string   "long"
    t.integer  "event_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "start"
  end

  create_table "events_semesters", force: :cascade do |t|
    t.integer "event_id"
    t.integer "semester_id"
    t.index ["event_id"], name: "index_events_semesters_on_event_id", using: :btree
    t.index ["semester_id"], name: "index_events_semesters_on_semester_id", using: :btree
  end

  create_table "images", force: :cascade do |t|
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
    t.string   "picture_file_name"
    t.string   "picture_content_type"
    t.integer  "picture_file_size"
    t.datetime "picture_updated_at"
    t.integer  "event_id"
    t.integer  "brother_id"
    t.integer  "image_purpose"
    t.index ["brother_id"], name: "index_images_on_brother_id", using: :btree
    t.index ["event_id"], name: "index_images_on_event_id", using: :btree
  end

  create_table "jobs", force: :cascade do |t|
    t.integer  "brother_id"
    t.integer  "semester_id"
    t.string   "title"
    t.string   "email"
    t.integer  "execb"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["brother_id"], name: "index_jobs_on_brother_id", using: :btree
    t.index ["semester_id"], name: "index_jobs_on_semester_id", using: :btree
  end

  create_table "roles", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "semesters", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                             default: "",    null: false
    t.string   "encrypted_password",                default: "",    null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",                     default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                                        null: false
    t.datetime "updated_at",                                        null: false
    t.string   "authentication_token",   limit: 30
    t.boolean  "approved",                          default: false, null: false
    t.integer  "role_id"
    t.index ["approved"], name: "index_users_on_approved", using: :btree
    t.index ["authentication_token"], name: "index_users_on_authentication_token", unique: true, using: :btree
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
    t.index ["role_id"], name: "index_users_on_role_id", using: :btree
  end

  add_foreign_key "brothers", "users"
  add_foreign_key "brothers_semesters", "brothers"
  add_foreign_key "brothers_semesters", "semesters"
  add_foreign_key "events_semesters", "events"
  add_foreign_key "events_semesters", "semesters"
  add_foreign_key "images", "brothers"
  add_foreign_key "images", "events"
  add_foreign_key "jobs", "brothers"
  add_foreign_key "jobs", "semesters"
  add_foreign_key "users", "roles"
end
