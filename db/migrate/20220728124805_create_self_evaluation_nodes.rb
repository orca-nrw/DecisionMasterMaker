class CreateSelfEvaluationNodes < ActiveRecord::Migration[7.0]
  def change
    create_table :self_evaluation_nodes do |t|
      t.references :step, null: false, foreign_key: true
      t.integer :score

      t.timestamps
    end
  end
end
