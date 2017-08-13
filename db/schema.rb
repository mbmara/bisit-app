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

ActiveRecord::Schema.define(version: 20170813083446) do

  create_table "companies", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "name"
    t.string "floor"
    t.string "unit_number"
    t.string "website"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "identifications", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "code"
    t.boolean "in_use", default: false
    t.boolean "status", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "profiles", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.bigint "user_id"
    t.bigint "staff_id"
    t.bigint "visitor_id"
    t.string "fname"
    t.string "lname"
    t.string "mname"
    t.string "mobile"
    t.boolean "block", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["staff_id"], name: "index_profiles_on_staff_id"
    t.index ["user_id"], name: "index_profiles_on_user_id"
    t.index ["visitor_id"], name: "index_profiles_on_visitor_id"
  end

  create_table "staffs", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.bigint "company_id"
    t.string "position"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["company_id"], name: "index_staffs_on_company_id"
  end

  create_table "tags", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.bigint "company_id"
    t.bigint "user_id"
    t.string "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["company_id"], name: "index_tags_on_company_id"
    t.index ["user_id"], name: "index_tags_on_user_id"
  end

  create_table "users", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "email"
    t.string "password"
    t.integer "user_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "visit_logs", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.bigint "company_id"
    t.bigint "staff_id"
    t.bigint "user_id"
    t.bigint "visitor_id"
    t.bigint "identification_id"
    t.datetime "time_in"
    t.datetime "time_out"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["company_id"], name: "index_visit_logs_on_company_id"
    t.index ["identification_id"], name: "index_visit_logs_on_identification_id"
    t.index ["staff_id"], name: "index_visit_logs_on_staff_id"
    t.index ["user_id"], name: "index_visit_logs_on_user_id"
    t.index ["visitor_id"], name: "index_visit_logs_on_visitor_id"
  end

  create_table "visitors", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.boolean "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["status"], name: "index_visitors_on_status"
  end

end
