class CreateDiagnosticTypes < ActiveRecord::Migration[7.0]
  def change
    create_table :diagnostic_types do |t|
      t.string :title, null: false
      t.references :stepwise_diagnostic_node, null: false, foreign_key: true
      t.integer :points, array: true

      t.timestamps
    end
    add_index  :diagnostic_types, :points, using: 'gin'
  end
end
