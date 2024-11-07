class AddCasefileToggleToSteps < ActiveRecord::Migration[7.0]
  def change
    add_column :steps, :casefile, :boolean, default: false
  end
end
