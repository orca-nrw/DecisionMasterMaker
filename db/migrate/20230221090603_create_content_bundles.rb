class CreateContentBundles < ActiveRecord::Migration[7.0]
  def change
    create_table :content_bundles do |t|
      t.string :title, null: false
      t.string :contact, null: false

      t.timestamps
    end

    create_table :content_bundles_patients, id: false do |t|
      t.belongs_to :content_bundle
      t.belongs_to :patient
    end
  end
end
