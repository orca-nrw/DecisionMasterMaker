class CreateNklmLinks < ActiveRecord::Migration[7.0]
  def change
    create_table :nklm_links do |t|
      t.string :title
      t.string :nklm_url
      t.references :step, null: false, foreign_key: true

      t.timestamps
    end
  end
end
