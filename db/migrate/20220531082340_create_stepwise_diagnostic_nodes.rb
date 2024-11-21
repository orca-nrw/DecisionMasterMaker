class CreateStepwiseDiagnosticNodes < ActiveRecord::Migration[7.0]
  def change
    create_table :stepwise_diagnostic_nodes do |t|
      t.references :step, null: false, foreign_key: true
      t.string :prompt 
      t.string :button_prompt 
      t.integer :step_count

      t.timestamps
    end
  end
end
