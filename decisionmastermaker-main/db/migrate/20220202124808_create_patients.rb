class CreatePatients < ActiveRecord::Migration[7.0]
  def change
    create_table :patients do |t|
      t.string :title, null: false
      t.integer :status, default: 0

      t.timestamps
    end
  end
end
