# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2023_04_21_072611) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "action_text_rich_texts", force: :cascade do |t|
    t.string "name", null: false
    t.text "body"
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["record_type", "record_id", "name"], name: "index_action_text_rich_texts_uniqueness", unique: true
  end

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", precision: 6, null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "anamnesis_questions", force: :cascade do |t|
    t.string "question"
    t.text "answer"
    t.text "reasoning"
    t.string "tags"
    t.bigint "fuse_node_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "points", default: 0
    t.index ["fuse_node_id"], name: "index_anamnesis_questions_on_fuse_node_id"
  end

  create_table "attachments", force: :cascade do |t|
    t.string "title"
    t.string "attachable_type"
    t.bigint "attachable_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["attachable_type", "attachable_id"], name: "index_attachments_on_attachable"
  end

  create_table "body_examinations", force: :cascade do |t|
    t.bigint "body_node_id", null: false
    t.integer "location"
    t.string "location_details"
    t.integer "examination_type"
    t.string "examination_type_details"
    t.integer "points"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["body_node_id"], name: "index_body_examinations_on_body_node_id"
  end

  create_table "body_nodes", force: :cascade do |t|
    t.bigint "step_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "tries", default: 5
    t.index ["step_id"], name: "index_body_nodes_on_step_id"
  end

  create_table "content_bundles", force: :cascade do |t|
    t.string "title", null: false
    t.string "contact", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "tutorial_id"
  end

  create_table "content_bundles_patients", id: false, force: :cascade do |t|
    t.bigint "content_bundle_id"
    t.bigint "patient_id"
    t.index ["content_bundle_id"], name: "index_content_bundles_patients_on_content_bundle_id"
    t.index ["patient_id"], name: "index_content_bundles_patients_on_patient_id"
  end

  create_table "diagnostic_types", force: :cascade do |t|
    t.string "title", null: false
    t.bigint "stepwise_diagnostic_node_id", null: false
    t.integer "points", array: true
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["points"], name: "index_diagnostic_types_on_points", using: :gin
    t.index ["stepwise_diagnostic_node_id"], name: "index_diagnostic_types_on_stepwise_diagnostic_node_id"
  end

  create_table "fuse_nodes", force: :cascade do |t|
    t.bigint "step_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "tries", default: 5
    t.string "question"
    t.index ["step_id"], name: "index_fuse_nodes_on_step_id"
  end

  create_table "nklm_links", force: :cascade do |t|
    t.string "title"
    t.string "nklm_url"
    t.bigint "step_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["step_id"], name: "index_nklm_links_on_step_id"
  end

  create_table "patients", force: :cascade do |t|
    t.string "title", null: false
    t.integer "status", default: 0
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "max_score", default: 0
    t.boolean "skip", default: false
    t.integer "gender", default: 0
  end

  create_table "quiz_answers", force: :cascade do |t|
    t.bigint "quiz_node_id", null: false
    t.string "text"
    t.integer "points"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["quiz_node_id"], name: "index_quiz_answers_on_quiz_node_id"
  end

  create_table "quiz_nodes", force: :cascade do |t|
    t.bigint "step_id", null: false
    t.boolean "multiple_choice"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["step_id"], name: "index_quiz_nodes_on_step_id"
  end

  create_table "self_evaluation_nodes", force: :cascade do |t|
    t.bigint "step_id", null: false
    t.integer "score"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["step_id"], name: "index_self_evaluation_nodes_on_step_id"
  end

  create_table "steps", force: :cascade do |t|
    t.integer "position"
    t.integer "status", default: 0
    t.string "problem"
    t.text "objective"
    t.text "setting"
    t.text "actors"
    t.bigint "patient_id", null: false
    t.string "interactable_type"
    t.bigint "interactable_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "casefile", default: false
    t.index ["interactable_type", "interactable_id"], name: "index_steps_on_interactable"
    t.index ["patient_id"], name: "index_steps_on_patient_id"
  end

  create_table "stepwise_diagnostic_nodes", force: :cascade do |t|
    t.bigint "step_id", null: false
    t.string "prompt"
    t.string "button_prompt"
    t.integer "step_count"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["step_id"], name: "index_stepwise_diagnostic_nodes_on_step_id"
  end

  create_table "text_video_nodes", force: :cascade do |t|
    t.bigint "step_id", null: false
    t.string "video"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["step_id"], name: "index_text_video_nodes_on_step_id"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "anamnesis_questions", "fuse_nodes"
  add_foreign_key "body_examinations", "body_nodes"
  add_foreign_key "body_nodes", "steps"
  add_foreign_key "diagnostic_types", "stepwise_diagnostic_nodes"
  add_foreign_key "fuse_nodes", "steps"
  add_foreign_key "nklm_links", "steps"
  add_foreign_key "quiz_answers", "quiz_nodes"
  add_foreign_key "quiz_nodes", "steps"
  add_foreign_key "self_evaluation_nodes", "steps"
  add_foreign_key "steps", "patients"
  add_foreign_key "stepwise_diagnostic_nodes", "steps"
  add_foreign_key "text_video_nodes", "steps"
end
