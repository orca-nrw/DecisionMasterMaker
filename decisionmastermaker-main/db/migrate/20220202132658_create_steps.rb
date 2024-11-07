class CreateSteps < ActiveRecord::Migration[7.0]
  def change
    create_table :steps do |t|
      t.integer :position
      t.integer :status, default: 0
      t.string :problem
      t.text :objective
      t.text :setting
      t.text :actors
      t.references :patient, null: false, foreign_key: true
      t.references :interactable, polymorphic: true

      t.timestamps
    end
  end
end
