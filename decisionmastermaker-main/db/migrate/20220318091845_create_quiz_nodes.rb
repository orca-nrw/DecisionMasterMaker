class CreateQuizNodes < ActiveRecord::Migration[7.0]
  def change
    create_table :quiz_nodes do |t|
      t.references :step, null: false, foreign_key: true
      t.boolean :multiple_choice

      t.timestamps
    end
    create_table :quiz_answers do |t|
      t.references :quiz_node, null: false, foreign_key: true
      t.string :text
      t.integer :points

      t.timestamps
    end
  end
end
