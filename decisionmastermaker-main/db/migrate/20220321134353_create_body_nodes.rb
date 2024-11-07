class CreateBodyNodes < ActiveRecord::Migration[7.0]
  def change
    create_table :body_nodes do |t|
      t.references :step, null: false, foreign_key: true

      t.timestamps
    end

    create_table :body_examinations do |t|
      t.references :body_node, null: false, foreign_key: true
      t.integer :location
      t.string :location_details
      t.integer :examination_type
      t.string :examination_type_details
      t.integer :points

      t.timestamps
    end
  end
end
